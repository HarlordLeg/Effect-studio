using System.Text;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;
internal static class WatermarkTests{
 static void Check(bool value,string message){if(!value)throw new Exception(message);}
 static KVObject Parse(string text){using var stream=new MemoryStream(Encoding.UTF8.GetBytes(text));return KVSerializer.Create(KVSerializationFormat.KeyValues3Text).Deserialize(stream).Root;}
 public static int Main(string[] args){
  Check(ResourceWatermark.MeshName("weapon")=="weapon__harlord","Mesh name");Check(ResourceWatermark.MeshName("weapon__harlord")=="weapon__harlord","Duplicate suffix");
  const string existing="<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:vmdlkeys4:version{9f5c1002-f19f-470c-bd42-c3c26c063d33} -->\n{ particle_cfg_list = [ { name = resource:\"particles/test.vpcf\" config = \"preview\" } ] custom_flag = true }";
  var text=ResourceWatermark.StampText(existing,"models/weapon.vmdl_c","kinetic-id");var root=Parse(text);Check(root["particle_cfg_list"][0]["name"].ToString(null)=="particles/test.vpcf","Existing particle lost");Check(root["custom_flag"].ToBoolean(null),"Existing key lost");Check(root[ResourceWatermark.Marker]["generated_by"].ToString(null)=="harlord","Author missing");Check(root[ResourceWatermark.Marker]["selection"].ToString(null)=="kinetic-id","Kinetic attribution missing");
  Check(ResourceWatermark.StampText(text,"models/weapon.vmdl_c","kinetic-id")==text,"Metadata is not idempotent");Check(Parse(ResourceWatermark.StampText("","model.vmdl_c","[]")).ContainsKey(ResourceWatermark.Marker),"Empty metadata");
  foreach(var file in args){using var resource=new Resource{FileName=file};resource.Read(file);var model=(Model)resource.DataBlock!;foreach(var mesh in model.GetEmbeddedMeshes())Check(mesh.Name.EndsWith("__harlord",StringComparison.Ordinal),"Missing embedded mesh suffix: "+mesh.Name);Console.WriteLine("[OK] "+file+": "+string.Join(", ",model.GetEmbeddedMeshes().Select(m=>m.Name)));}
  Console.WriteLine("[OK] Watermark metadata, native particles and idempotence");return 0;
 }
}
