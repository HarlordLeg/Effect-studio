using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

// Retain independently compiled softbody programs; their controller hashes
// resolve against bone names, so node indices must never be concatenated.
internal static class ModelSoftbodyParts {
 private sealed record Part(string Input,string Output,string Name);
 private sealed record Request(string Input,string Output,Part[] Parts,string Report);
 internal static byte[] PhysicsResource(byte[] payload){
  using var stream=new MemoryStream();using var w=new BinaryWriter(stream);
  w.Write((uint)(28+payload.Length));w.Write((ushort)12);w.Write((ushort)0);w.Write(8u);w.Write(1u);w.Write(System.Text.Encoding.ASCII.GetBytes("DATA"));w.Write(8u);w.Write(payload.Length);w.Write(payload);return stream.ToArray();
 }
 public static void Run(string manifest){
  var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty softbody manifest");if(q.Parts.Length>16)throw new InvalidDataException("Too many softbody parts");
  using var host=new Resource{FileName=q.Input};host.Read(q.Input);var model=host.DataBlock as Model??throw new InvalidDataException("Expected model");var names=model.Skeleton.Bones.Select(b=>b.Name).ToHashSet(StringComparer.Ordinal);var reports=new List<object>();
  var refs=model.Data.TryGetValue("m_refPhysicsData",out var r)?r:KVObject.Array();var masks=model.Data.TryGetValue("m_refPhysGroupMasks",out var m)?m:KVObject.Array();var external=host.ExternalReferences??throw new InvalidDataException("Missing model reference table");
  foreach(var part in q.Parts){
   using var source=new Resource{FileName=part.Input};source.Read(part.Input);var block=source.Blocks.SingleOrDefault(b=>b.Type==BlockType.PHYS);if(block is null)continue;
   var bytes=File.ReadAllBytes(part.Input);var kv=new BinaryKV3(BlockType.PHYS){Resource=source,Offset=block.Offset,Size=block.Size};using(var reader=new BinaryReader(new MemoryStream(bytes))){reader.BaseStream.Position=block.Offset;kv.Read(reader);}
   if(!kv.Data.Root.TryGetValue("m_pFeModel",out var fe)||fe.ValueType!=KVValueType.Collection)continue;
   if(kv.Data.Root.TryGetValue("m_parts",out var rigid)&&rigid.Count>0)throw new InvalidDataException("Rigid collision parts require a separate merge profile");
   var controls=fe["m_CtrlName"].Values.Select(v=>v.ToString(null)).ToArray();var missing=controls.Where(n=>!n.StartsWith('$')&&!names.Contains(n)).ToArray();if(missing.Length>0)throw new InvalidDataException("Softbody bones missing from host: "+string.Join(", ",missing));
   File.WriteAllBytes(part.Output,PhysicsResource(bytes.AsSpan((int)block.Offset,(int)block.Size).ToArray()));
   using(var check=new Resource{FileName=part.Output}){check.Read(part.Output);if(check.DataBlock is not PhysAggregateData)throw new InvalidDataException("Softbody resource failed round trip");}
   if(!refs.Values.Any(v=>v.ToString(null)==part.Name)){refs.Add(new KVObject(part.Name){Flag=KVFlag.Resource});masks.Add(new KVObject(ulong.MaxValue));}
   if(!external.ResourceRefInfoList.Any(v=>v.Name==part.Name))external.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Name=part.Name,Id=Program.ComputeResourceId(part.Name)});
   reports.Add(new{model=part.Input,resource=part.Name,controls=controls.Length,nodes=fe["m_nNodeCount"].ToInt32(null)});
  }
  model.Data["m_refPhysicsData"]=refs;model.Data["m_refPhysGroupMasks"]=masks;
  using(var stream=File.Create(q.Output))Program.SerializePatchedResource(host,File.ReadAllBytes(q.Input),stream,true,new HashSet<object>{external},preserveMetadata:true);
  File.WriteAllText(q.Report,JsonSerializer.Serialize(new{version=1,parts=reports}));
 }
}
