"""Convert embedded GLB texture images to EXT_texture_webp, keeping geometry bytes."""
import io,json,struct,sys
from pathlib import Path
from PIL import Image

def optimize(source,target):
    raw=Path(source).read_bytes()
    magic,version,size=struct.unpack_from('<III',raw)
    if magic!=0x46546c67 or version!=2 or size!=len(raw): raise ValueError('Invalid GLB')
    cursor=12;chunks={}
    while cursor<len(raw):
        length,kind=struct.unpack_from('<II',raw,cursor);cursor+=8
        chunks[kind]=raw[cursor:cursor+length];cursor+=length
    doc=json.loads(chunks[0x4e4f534a]);binary=chunks.get(0x004e4942,b'')
    if not doc.get('buffers') and not doc.get('bufferViews') and not doc.get('accessors'):
        Path(target).write_bytes(raw);return
    if len(doc.get('buffers',[]))!=1 or doc['buffers'][0].get('uri'): raise ValueError('Expected one embedded buffer')
    original_views=[dict(v) for v in doc.get('bufferViews',[])]
    colour=set();protected=set()
    for material in doc.get('materials',[]):
        pbr=material.get('pbrMetallicRoughness',{})
        for ref in [pbr.get('baseColorTexture'),material.get('emissiveTexture')]:
            if ref: colour.add(ref['index'])
        for ref in [pbr.get('metallicRoughnessTexture'),material.get('normalTexture'),material.get('occlusionTexture')]:
            if ref: protected.add(ref['index'])
    textures=doc.get('textures',[])
    colour_images={textures[t].get('source') for t in colour-protected}
    protected_images={textures[t].get('source') for t in protected}
    used_views={a.get('bufferView') for a in doc.get('accessors',[])}
    for a in doc.get('accessors',[]):
        if a.get('sparse'):
            used_views|={a['sparse']['indices']['bufferView'],a['sparse']['values']['bufferView']}
    replacements={};converted=set()
    for index,image in enumerate(doc.get('images',[])):
        view=image.get('bufferView')
        if view is None or view in used_views or image.get('mimeType') not in ('image/png','image/jpeg'): continue
        descriptor=doc['bufferViews'][view];start=descriptor.get('byteOffset',0);original=binary[start:start+descriptor['byteLength']]
        with Image.open(io.BytesIO(original)) as pixels:
            if pixels.mode not in ('RGB','RGBA','L','LA','P'): continue
            result=io.BytesIO();pixels.save(result,format='WEBP',lossless=index not in colour_images or index in protected_images,quality=90,method=4)
        replacement=result.getvalue()
        if len(replacement)>=len(original): continue
        replacements[view]=replacement;image['mimeType']='image/webp';converted.add(index)
    if not converted: Path(target).write_bytes(raw);return
    for texture in textures:
        if texture.get('source') in converted:
            texture.setdefault('extensions',{})['EXT_texture_webp']={'source':texture.pop('source')}
    doc['extensionsUsed']=list(dict.fromkeys(doc.get('extensionsUsed',[])+['EXT_texture_webp']))
    doc['extensionsRequired']=list(dict.fromkeys(doc.get('extensionsRequired',[])+['EXT_texture_webp']))
    out=bytearray()
    for index,view in enumerate(doc.get('bufferViews',[])):
        if view.get('buffer',0)!=0: raise ValueError('External buffer')
        start=view.get('byteOffset',0);data=replacements.get(index,binary[start:start+view['byteLength']])
        out.extend(b'\0'*(-len(out)%4));view['byteOffset']=len(out);view['byteLength']=len(data);out.extend(data)
    doc['buffers'][0]['byteLength']=len(out);out.extend(b'\0'*(-len(out)%4))
    encoded=json.dumps(doc,separators=(',',':')).encode();encoded+=b' '*(-len(encoded)%4)
    result=struct.pack('<III',magic,version,12+8+len(encoded)+8+len(out))+struct.pack('<II',len(encoded),0x4e4f534a)+encoded+struct.pack('<II',len(out),0x004e4942)+out
    # Overlapping image/accessor views are excluded above; verify all nonimage buffers exactly.
    for index,view in enumerate(doc.get('bufferViews',[])):
        if index in replacements: continue
        previous=original_views[index];start=previous.get('byteOffset',0)
        assert out[view['byteOffset']:view['byteOffset']+view['byteLength']]==binary[start:start+previous['byteLength']]
    Path(target).write_bytes(result if len(result)<len(raw) else raw)

if __name__=='__main__': optimize(sys.argv[1],sys.argv[2])
