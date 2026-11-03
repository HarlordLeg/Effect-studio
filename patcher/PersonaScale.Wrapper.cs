using ValveResourceFormat;using ValveResourceFormat.Blocks;using ValveResourceFormat.ResourceTypes;using ValveKeyValue;using System.Numerics;
internal static partial class PersonaScale{
 internal static int InsertScaleRoot(KVObject skeleton,KVObject decode,float factor){
  const string name="harlord_persona_scale";var names=Values(skeleton,"m_boneName");var count=names.Length;
  if(names.Any(n=>Text(n)==name))throw new InvalidDataException("Persona scale root already exists");
  var roots=Values(skeleton,"m_nParent").Select((v,i)=>(v,i)).Where(x=>x.v.ToInt32(null)<0).Select(x=>x.i).ToArray();
  var bones=Values(decode,"m_boneArray");
  var decodeRoots=bones.Where(b=>b["m_parent"].ToInt32(null)<0).ToArray();
  if(roots.Length==0||decodeRoots.Length==0)throw new InvalidDataException("Persona skeleton has no roots");
  KVObject A(params KVObject[] v)=>KVObject.Array(v);
  var position=A(new KVObject(0f),new KVObject(0f),new KVObject(0f));var rotation=A(new KVObject(0f),new KVObject(0f),new KVObject(0f),new KVObject(1f));
  foreach(var key in new[]{"m_boneName","m_nParent","m_boneSphere","m_nFlag","m_bonePosParent","m_boneRotParent","m_boneScaleParent"}){
   var list=Values(skeleton,key).ToList();if(list.Count!=count)throw new InvalidDataException("Persona skeleton lane mismatch: "+key);
   list.Add(key switch{"m_boneName"=>new KVObject(name),"m_nParent"=>new KVObject(-1),"m_boneSphere"=>new KVObject(0f),"m_nFlag"=>list[roots[0]],"m_bonePosParent"=>position,"m_boneRotParent"=>rotation,_=>new KVObject(factor)});skeleton[key]=KVObject.Array(list);
  }
  foreach(var i in roots)skeleton["m_nParent"].AsArraySpan()[i]=new KVObject(count);
  var added=KVObject.Collection();added["m_name"]=new KVObject(name);added["m_parent"]=new KVObject(-1);added["m_pos"]=position;added["m_quat"]=rotation;added["m_scale"]=new KVObject(factor);added["m_qAlignment"]=A(new KVObject(0f),new KVObject(0f),new KVObject(0f),new KVObject(0f));added["m_flags"]=decodeRoots[0]["m_flags"];
  foreach(var bone in decodeRoots)bone["m_parent"]=new KVObject(bones.Length);
  decode["m_boneArray"]=KVObject.Array(bones.Append(added));return count;
 }
 static void RunWrapper(Resource resource,byte[] original,string output,float factor){
  var model=(Model)resource.DataBlock!;var groups=resource.Blocks.Where(b=>b.Type==BlockType.AGRP).ToArray();if(groups.Length!=1||model.GetReferencedAnimationGroupNames().Any(n=>!string.IsNullOrWhiteSpace(n)))throw new InvalidDataException("Persona wrapper requires embedded animation group");
  BinaryKV3 ReadWrapper(Block b){var kv=new BinaryKV3(b.Type){Resource=resource,Offset=b.Offset,Size=b.Size};using var reader=new BinaryReader(new MemoryStream(original));reader.BaseStream.Position=b.Offset;kv.Read(reader);return kv;}
  var data=ReadWrapper(resource.DataBlock!);var group=ReadWrapper(groups[0]);var root=InsertScaleRoot(data.Data.Root["m_modelSkeleton"],group.Data.Root["m_decodeKey"],factor);
  if(data.Data.Root.TryGetValue("m_modelInfo",out var info))foreach(var key in new[]{"m_vHullMin","m_vHullMax","m_vViewMin","m_vViewMax","m_vEyePosition"})if(info.TryGetValue(key,out var v))Vector(v,factor);
  var raw=new Dictionary<object,byte[]>{{resource.DataBlock!,HeroActivityRules.SerializeActivity(data,original[(int)resource.DataBlock!.Offset])},{groups[0],HeroActivityRules.SerializeActivity(group,original[(int)groups[0].Offset])}};
  using(var stream=File.Create(output))Program.SerializePatchedResource(resource,original,stream,false,preserveMetadata:true,rawBlocks:raw);
  var bytes=File.ReadAllBytes(output);using var check=new Resource();check.Read(output);
  for(var i=0;i<resource.Blocks.Count;i++){var b=resource.Blocks[i];if(raw.ContainsKey(b))continue;var c=check.Blocks[i];if(!original.AsSpan((int)b.Offset,(int)b.Size).SequenceEqual(bytes.AsSpan((int)c.Offset,(int)c.Size)))throw new InvalidDataException("Persona wrapper changed immutable block: "+b.Type);}
  var updated=(Model)check.DataBlock!;if(updated.Skeleton.Bones.Count()!=root+1)throw new InvalidDataException("Persona wrapper skeleton count mismatch");
  Console.WriteLine("Persona single scale root added; animation/sequence/mesh/physics blocks unchanged");
 }
}
