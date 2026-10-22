"""Upload only published renderer assets; publish manifest last. Requires boto3."""
import argparse, concurrent.futures, hashlib, json, mimetypes, os, re
from pathlib import Path
import boto3
from botocore.exceptions import ClientError

def upload(directory, client, bucket, workers=4):
    directory=Path(directory).resolve()
    manifest=directory/'manifest.json'
    data=json.loads(manifest.read_text(encoding='utf-8'))
    if data.get('version')!=1 or not data.get('catalog'):
        raise ValueError('Publish renderer assets before uploading')
    files=sorted(p for p in (directory/'assets').iterdir() if p.is_file() and re.fullmatch(r'[a-f0-9]{64}\.(json|glb|png)',p.name))
    def put(file, key, immutable):
        digest=file.name.split('.')[0] if immutable else hashlib.sha256(file.read_bytes()).hexdigest()
        try:
            current=client.head_object(Bucket=bucket,Key=key)
            if current.get('Metadata',{}).get('sha256')==digest:
                return 'cached'
        except ClientError as error:
            if str(error.response.get('Error',{}).get('Code')) not in ('404','NoSuchKey','NotFound'):
                raise
        content_type={'.json':'application/json','.glb':'model/gltf-binary','.png':'image/png'}[file.suffix]
        client.upload_file(str(file),bucket,key,ExtraArgs={'ContentType':content_type,'CacheControl':'public, max-age=31536000, immutable' if immutable else 'public, max-age=60','Metadata':{'sha256':digest}})
        return 'uploaded'
    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
        futures=[pool.submit(put,p,'assets/'+p.name,True) for p in files]
        for index,future in enumerate(concurrent.futures.as_completed(futures),1):
            result=future.result()
            if index%100==0 or index==len(files): print(f'{index}/{len(files)} assets completed',flush=True)
    # Reached only after every dependency upload succeeded.
    put(manifest,'manifest.json',False)
    print('Manifest published. Local configuration and game archives were not uploaded.')

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--directory',default=str(Path(__file__).resolve().parent.parent/'cache/static-viewer'))
    args=parser.parse_args()
    required=['R2_ACCOUNT_ID','R2_BUCKET','AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY']
    if any(not os.environ.get(key) for key in required): raise SystemExit('Set R2_ACCOUNT_ID, R2_BUCKET, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY locally')
    account=os.environ['R2_ACCOUNT_ID']
    if not re.fullmatch(r'[a-fA-F0-9]{32}',account): raise SystemExit('Invalid R2 account ID')
    client=boto3.client('s3',endpoint_url=f'https://{account}.r2.cloudflarestorage.com',region_name='auto',aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])
    upload(args.directory,client,os.environ['R2_BUCKET'])
