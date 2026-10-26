using System.Text;
using System.Text.Json.Nodes;
internal static class PreviewMetadataTests
{
 static int Main(){
  var file=Path.GetTempFileName();
  try {
   var json=Encoding.UTF8.GetBytes("{\"asset\":{\"version\":\"2.0\"},\"animations\":[{\"name\":\"idle\"}],\"extras\":{\"keep\":1}}");var padded=(json.Length+3)&~3;
   using(var stream=File.Create(file))using(var writer=new BinaryWriter(stream)){writer.Write(0x46546c67);writer.Write(2);writer.Write(12+8+padded+8+4);writer.Write(padded);writer.Write(0x4e4f534a);writer.Write(json);for(var i=json.Length;i<padded;i++)writer.Write((byte)32);writer.Write(4);writer.Write(0x004e4942);writer.Write(new byte[]{1,2,3,4});}
   var original=File.ReadAllBytes(file);
   PreviewMetadata.Embed(file,JsonNode.Parse("{\"version\":1,\"attachments\":{\"hand\":{\"bones\":[\"root\"]}}}")!);
   var bytes=File.ReadAllBytes(file);var length=BitConverter.ToInt32(bytes,12);var parsed=JsonNode.Parse(bytes.AsSpan(20,length))!;
   if(BitConverter.ToInt32(bytes,8)!=bytes.Length||length%4!=0)throw new Exception("Invalid chunk size");
   if(!bytes.AsSpan(20+length).SequenceEqual(original.AsSpan(20+padded)))throw new Exception("Geometry changed");
   if(parsed["animations"]![0]!["name"]!.GetValue<string>()!="idle"||parsed["extras"]!["keep"]!.GetValue<int>()!=1||parsed["extras"]!["dotaStudio"]!["version"]!.GetValue<int>()!=1)throw new Exception("Metadata lost");
   File.WriteAllBytes(file,new byte[20]);try{PreviewMetadata.Embed(file,new JsonObject());throw new Exception("Invalid GLB accepted");}catch(InvalidDataException){}
   Console.WriteLine("[OK] Viewer metadata preserves animation, extras and binary chunks");return 0;
  }finally{File.Delete(file);}
 }
}
