using System.Globalization;
using System.Text;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

// Attribution for generated mods, not a claim of ownership of Valve assets.
// Geometry buffers, skeletons, activities, animation tracks and physics stay intact.
internal static class ResourceWatermark
{
 internal const string Marker="harlord_asset_watermark_v1";
 private sealed record Entry(string Input,string Output,string? Name=null);
 private sealed record Request(Entry[] Files,string? Selection=null);
 private static string Text(KVObject value)=>value.ToString(CultureInfo.InvariantCulture);
 internal static string MeshName(string name)=>name.EndsWith("__harlord",StringComparison.Ordinal)?name:name+"__harlord";
 private static KVObject Array(IEnumerable<KVObject> values){var result=KVObject.Array();foreach(var value in values)result.Add(value);return result;}
 private static BinaryKV3 Read(Resource resource,byte[] bytes,Block block){var kv=new BinaryKV3(block.Type){Resource=resource,Offset=block.Offset,Size=block.Size};using var reader=new BinaryReader(new MemoryStream(bytes));reader.BaseStream.Position=block.Offset;kv.Read(reader);return kv;}
 internal static string StampText(string text,string asset,string selection){
  if(string.IsNullOrWhiteSpace(text))text="<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:vmdlkeys4:version{9f5c1002-f19f-470c-bd42-c3c26c063d33} -->\n{\n}\n";
  var serializer=KVSerializer.Create(KVSerializationFormat.KeyValues3Text);
  using var input=new MemoryStream(Encoding.UTF8.GetBytes(text));var document=serializer.Deserialize(input);
  var attribution=KVObject.Collection();attribution["generated_by"]=new KVObject("harlord");attribution["contact"]=new KVObject("https://t.me/harlord_mods");attribution["asset"]=new KVObject(asset);attribution["selection"]=new KVObject(selection);attribution["version"]=new KVObject(1);
  document.Root[Marker]=attribution;using var output=new MemoryStream();serializer.Serialize(output,document);return Encoding.UTF8.GetString(output.ToArray());
 }
 public static void Run(string manifest){
  var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty watermark request");
  foreach(var entry in request.Files)StampFile(entry.Input,entry.Output,entry.Name??Path.GetFileName(entry.Input),request.Selection??"[]");
  Console.WriteLine("[OK] harlord watermark: "+request.Files.Length+" models; runtime buffers preserved");
 }
 internal static void StampFile(string input,string output,string asset,string selection){
  var bytes=File.ReadAllBytes(input);using var resource=new Resource{FileName=input};resource.Read(input);
  if(resource.DataBlock is not Model)throw new InvalidDataException("Watermark requires a compiled model: "+asset);
  if(resource.ContainsBlockType(BlockType.NTRO))throw new InvalidDataException("NTRO model attribution requires a dedicated writer: "+asset);
  var chunks=new Dictionary<Block,byte[]>();var data=Read(resource,bytes,resource.DataBlock);var root=data.Data.Root;
  if(!root.TryGetValue("m_modelInfo",out var info))throw new InvalidDataException("Model info missing: "+asset);
  info["m_keyValueText"]=new KVObject(StampText(info.TryGetValue("m_keyValueText",out var old)?Text(old):"",asset,selection));
  chunks[resource.DataBlock]=HeroActivityRules.SerializeActivity(data,bytes[(int)resource.DataBlock.Offset]);
  foreach(var block in resource.Blocks){
   if(block.Type==BlockType.CTRL){
    var ctrl=Read(resource,bytes,block);var changed=false;
    if(ctrl.Data.Root.TryGetValue("embedded_meshes",out var meshes))foreach(var row in meshes.Values)if(row.TryGetValue("m_Name",out var name)){row["m_Name"]=new KVObject(MeshName(Text(name)));changed=true;}
    if(changed)chunks[block]=HeroActivityRules.SerializeActivity(ctrl,bytes[(int)block.Offset]);
   }
   // Do not rename mesh groups, attachment names, bones, activities, or resource paths.
  }
  Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(output))!);
  using(var stream=File.Create(output))using(var writer=new BinaryWriter(stream)){
   writer.Write(0u);writer.Write(bytes.AsSpan(4,4));writer.Write(8u);writer.Write((uint)resource.Blocks.Count);writer.Write(new byte[resource.Blocks.Count*12]);
   for(var i=0;i<resource.Blocks.Count;i++){
    var block=resource.Blocks[i];var payload=chunks.GetValueOrDefault(block)??bytes.AsSpan((int)block.Offset,(int)block.Size).ToArray();writer.Write(new byte[(int)((16-stream.Position%16)%16)]);var start=stream.Position;writer.Write(payload);var end=stream.Position;var field=16L+12*i;stream.Position=field;writer.Write((uint)block.Type);writer.Write((uint)(start-field-4));writer.Write((uint)payload.Length);stream.Position=end;
   }
   stream.Position=0;writer.Write((uint)stream.Length);
  }
  using var check=new Resource{FileName=output};check.Read(output);var written=File.ReadAllBytes(output);if(written.AsSpan().IndexOf(Encoding.UTF8.GetBytes(Marker))<0)throw new InvalidDataException("Watermark verification failed: "+asset);
  for(var i=0;i<resource.Blocks.Count;i++)if(!chunks.ContainsKey(resource.Blocks[i])){
   var before=resource.Blocks[i];var after=check.Blocks[i];if(before.Type!=after.Type||!bytes.AsSpan((int)before.Offset,(int)before.Size).SequenceEqual(written.AsSpan((int)after.Offset,(int)after.Size)))throw new InvalidDataException("Unrelated model block changed: "+before.Type);
  }
 }
}
