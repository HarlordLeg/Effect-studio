import io,json,struct,tempfile,unittest,runpy,sys,types
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
optimizer=runpy.run_path(str(ROOT/'tools/optimize-static-glb.py'))['optimize']
class StaticTools(unittest.TestCase):
 def test_valid_empty_glb_is_preserved(self):
  with tempfile.TemporaryDirectory() as tmp:
   doc=json.dumps({'asset':{'version':'2.0'},'scenes':[{}],'nodes':[]}).encode();doc+=b' '*(-len(doc)%4)
   raw=struct.pack('<III',0x46546c67,2,20+len(doc))+struct.pack('<II',len(doc),0x4e4f534a)+doc
   source=Path(tmp)/'empty.glb';target=Path(tmp)/'out.glb';source.write_bytes(raw);optimizer(source,target);self.assertEqual(target.read_bytes(),raw)
 def test_webp_keeps_geometry_and_lossless_normal_pixels(self):
  with tempfile.TemporaryDirectory() as tmp:
   image=Image.new('RGB',(128,128),(125,126,255));out=io.BytesIO();image.save(out,format='PNG',compress_level=0);png=out.getvalue();geometry=bytes(range(128));binary=geometry+png
   doc={'asset':{'version':'2.0'},'buffers':[{'byteLength':len(binary)}],'bufferViews':[{'buffer':0,'byteOffset':0,'byteLength':128},{'buffer':0,'byteOffset':128,'byteLength':len(png)}],'accessors':[{'bufferView':0,'componentType':5121,'count':128,'type':'SCALAR'}],'images':[{'bufferView':1,'mimeType':'image/png'}],'textures':[{'source':0}],'materials':[{'normalTexture':{'index':0}}]}
   data=json.dumps(doc).encode();data+=b' '*(-len(data)%4);binary+=b'\0'*(-len(binary)%4);raw=struct.pack('<III',0x46546c67,2,28+len(data)+len(binary))+struct.pack('<II',len(data),0x4e4f534a)+data+struct.pack('<II',len(binary),0x004e4942)+binary
   source=Path(tmp)/'in.glb';target=Path(tmp)/'out.glb';source.write_bytes(raw);optimizer(source,target);result=target.read_bytes();self.assertLess(len(result),len(raw));size=struct.unpack_from('<I',result,12)[0];meta=json.loads(result[20:20+size]);buf=result[28+size:];self.assertEqual(buf[:128],geometry);self.assertEqual(meta['textures'][0]['extensions']['EXT_texture_webp']['source'],0);v=meta['bufferViews'][1];decoded=Image.open(io.BytesIO(buf[v['byteOffset']:v['byteOffset']+v['byteLength']]));self.assertEqual(decoded.tobytes(),image.tobytes())
class R2Tools(unittest.TestCase):
 def test_only_assets_uploaded_and_manifest_last(self):
  fake_boto=types.ModuleType('boto3');fake_errors=types.ModuleType('botocore.exceptions')
  class Missing(Exception):
   response={'Error':{'Code':'404'}}
  fake_errors.ClientError=Missing
  saved={key:sys.modules.get(key) for key in ['boto3','botocore','botocore.exceptions']}
  sys.modules.update({'boto3':fake_boto,'botocore':types.ModuleType('botocore'),'botocore.exceptions':fake_errors})
  try: uploader=runpy.run_path(str(ROOT/'tools/upload-static-r2.py'))['upload']
  finally:
   for key,value in saved.items():
    if value is None:sys.modules.pop(key,None)
    else:sys.modules[key]=value
  class Client:
   def __init__(self):self.keys=[]
   def head_object(self,**kw):raise Missing()
   def upload_file(self,file,bucket,key,**kw):self.keys.append(key)
  with tempfile.TemporaryDirectory() as tmp:
   folder=Path(tmp);(folder/'assets').mkdir();(folder/'assets'/('a'*64+'.json')).write_text('{}');(folder/'config.json').write_text('private');(folder/'manifest.json').write_text(json.dumps({'version':1,'catalog':'assets/'+('a'*64)+'.json'}));client=Client();uploader(folder,client,'bucket');self.assertEqual(client.keys,['assets/'+('a'*64)+'.json','manifest.json'])

if __name__=='__main__':unittest.main()
