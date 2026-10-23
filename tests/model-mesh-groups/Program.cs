using System.Reflection;using System.Text.Json;using ValveKeyValue;using ValveKeyValue.KeyValues3;using ValveResourceFormat;using ValveResourceFormat.ResourceTypes;
var type=typeof(Resource).Assembly;var patcher=Assembly.Load("Dota2UnusualPatcher").GetType("ModelMeshGroups")!;
byte[] Payload(KVObject data){var block=new BinaryKV3(data,new KV3ID("generic",new Guid("7412167c-06e9-4698-aff2-e63eb59037e7"))){Resource=new Resource(),SerializationVersion=5};using var stream=new MemoryStream();block.Serialize(stream);return stream.ToArray();}
var folder=Path.Combine(Path.GetTempPath(),"des-mesh-group-test-"+Guid.NewGuid().ToString("N"));Directory.CreateDirectory(folder);
try{
 var data=KVObject.Collection();const string model="models/test/wings.vmdl";data["m_name"]=new KVObject(model);data["m_meshGroups"]=KVObject.Array();foreach(var name in new[]{"dummy","first","second"})data["m_meshGroups"].Add(new KVObject(name));data["m_refMeshGroupMasks"]=KVObject.Array();foreach(var mask in new ulong[]{2,2,4,4,1})data["m_refMeshGroupMasks"].Add(new KVObject(mask));data["m_nDefaultMeshGroupMask"]=new KVObject(1UL);
 var animation=KVObject.Collection();animation["m_animArray"]=KVObject.Array();var runtime=Payload(animation);var encoded=Payload(data);var input=Path.Combine(folder,"input.vmdl_c");
 using(var stream=File.Create(input))using(var writer=new BinaryWriter(stream)){writer.Write((uint)(40+encoded.Length+runtime.Length));writer.Write((ushort)12);writer.Write((ushort)1);writer.Write(8u);writer.Write(2u);writer.Write(System.Text.Encoding.ASCII.GetBytes("DATA"));writer.Write(20u);writer.Write((uint)encoded.Length);writer.Write(System.Text.Encoding.ASCII.GetBytes("ANIM"));writer.Write((uint)(8+encoded.Length));writer.Write((uint)runtime.Length);writer.Write(encoded);writer.Write(runtime);}
 foreach(var style in new[]{0,1}){
  var output=Path.Combine(folder,"style-"+style+".vmdl_c");var request=Path.Combine(folder,"request.json");File.WriteAllText(request,JsonSerializer.Serialize(new{input,output,model,group=style==0?"first":"second"}));patcher.GetMethod("Run",BindingFlags.Static|BindingFlags.Public)!.Invoke(null,new object[]{request});
  using var result=new Resource{FileName=output};result.Read(output);var root=((Model)result.DataBlock!).Data;
  var masks=root["m_refMeshGroupMasks"].Values.Select(v=>v.ToUInt64(null)).ToArray();for(var i=0;i<5;i++){var visible=style==0?i<2:i>=2&&i<4;if(masks[i]!=(visible?ulong.MaxValue:0UL))throw new Exception("Incorrect active style geometry");}
  var block=result.Blocks.Single(b=>b.Type.ToString()=="ANIM");if(!File.ReadAllBytes(output).AsSpan((int)block.Offset,(int)block.Size).SequenceEqual(runtime))throw new Exception("Compiled animation changed");
 }
 var bad=Path.Combine(folder,"bad.vmdl_c");var manifest=Path.Combine(folder,"bad.json");File.WriteAllText(manifest,JsonSerializer.Serialize(new{input,output=bad,model,group="missing"}));try{patcher.GetMethod("Run")!.Invoke(null,new object[]{manifest});throw new Exception("Missing group accepted");}catch(TargetInvocationException e)when(e.InnerException is InvalidDataException){}if(File.Exists(bad))throw new Exception("Invalid selection wrote output");
 Console.WriteLine("Mesh-group tests passed: both styles, dummy hidden, animation payload preserved, invalid group rejected.");
}finally{Directory.Delete(folder,true);}
