using System.Reflection;using System.Text.Json;using ValveKeyValue;using ValveKeyValue.KeyValues3;using ValveResourceFormat;using ValveResourceFormat.ResourceTypes;using Encoding=System.Text.Encoding;
var assembly=Assembly.Load("Dota2UnusualPatcher");var global=assembly.GetType("GlobalCosmetics")!;var bind=global.GetMethod("BindCourier",BindingFlags.Static|BindingFlags.NonPublic)!;var particle=KVObject.Collection();using var json=JsonDocument.Parse("{\"attach_entity\":\"parent\",\"control_points\":{\"0\":{\"control_point_index\":\"0\",\"attachment\":\"attach_attack2\",\"attach_type\":\"point_follow\"}}}");bind.Invoke(null,new object[]{particle,json.RootElement,true});var driver=particle["m_controlPointConfigurations"][0]["m_drivers"][0];if(driver["m_entityName"].ToString(null)!="parent"||driver["m_attachmentName"].ToString(null)!="attach_attack2")throw new Exception("Weapon CP lost parent/hand attachment");
var courier=KVObject.Collection();bind.Invoke(null,new object[]{courier,json.RootElement,false});if(courier["m_controlPointConfigurations"][0]["m_drivers"][0]["m_entityName"].ToString(null)!="self")throw new Exception("Courier binding behavior regressed");
byte[] Payload(KVObject data){var block=new BinaryKV3(data,new KV3ID("generic",new Guid("7412167c-06e9-4698-aff2-e63eb59037e7"))){Resource=new Resource(),SerializationVersion=5};using var stream=new MemoryStream();block.Serialize(stream);return stream.ToArray();}
var dir=Path.Combine(Path.GetTempPath(),"des-model-runtime-"+Guid.NewGuid().ToString("N"));Directory.CreateDirectory(dir);try{var root=KVObject.Collection();const string model="models/heroes/test_persona/body.vmdl";root["m_name"]=new KVObject(model);root["m_modelInfo"]=KVObject.Collection();var anim=KVObject.Collection();anim["m_animArray"]=KVObject.Array();var data=Payload(root);var runtime=Payload(anim);string input=Path.Combine(dir,"input.vmdl_c"),output=Path.Combine(dir,"output.vmdl_c");using(var stream=File.Create(input))using(var w=new BinaryWriter(stream)){w.Write((uint)(40+data.Length+runtime.Length));w.Write((ushort)12);w.Write((ushort)1);w.Write(8u);w.Write(2u);w.Write(Encoding.ASCII.GetBytes("DATA"));w.Write(20u);w.Write((uint)data.Length);w.Write(Encoding.ASCII.GetBytes("ANIM"));w.Write((uint)(8+data.Length));w.Write((uint)runtime.Length);w.Write(data);w.Write(runtime);}var manifest=Path.Combine(dir,"request.json");File.WriteAllText(manifest,JsonSerializer.Serialize(new{paths=new Dictionary<string,string>{{model,"models/heroes/test/body.vmdl"}},files=new[]{new{input,output,preserveModelName=true}}}));assembly.GetType("ResourceRelocator")!.GetMethod("Run",BindingFlags.Public|BindingFlags.Static)!.Invoke(null,new object[]{manifest});using var result=new Resource{FileName=output};result.Read(output);if(((Model)result.DataBlock!).Data["m_name"].ToString(null)!=model)throw new Exception("Persona identity changed to ordinary hero");var encoded=result.Blocks.Single(b=>b.Type.ToString()=="ANIM");if(!File.ReadAllBytes(output).AsSpan((int)encoded.Offset,(int)encoded.Size).SequenceEqual(runtime))throw new Exception("Encoded persona animation payload changed");Console.WriteLine("Native model regressions: parent/self CP ownership, hand attachment, persona identity and untouched encoded animation blocks passed.");}finally{Directory.Delete(dir,true);}

// Tellurian's Full Throttle style is valid even when a part has no third
// material group. Other missing groups must still fail, and Shadowpass must
// continue selecting its actual alternate material.
var variant=assembly.GetType("ModelVariant")!.GetMethod("Apply",BindingFlags.Public|BindingFlags.Static)!;
void CheckVariant(string identity,int skin,bool reject,bool alternate=false){
 var folder=Path.Combine(Path.GetTempPath(),"des-material-"+Guid.NewGuid().ToString("N"));Directory.CreateDirectory(folder);try{
  var root=KVObject.Collection();root["m_name"]=new KVObject(identity);root["m_modelInfo"]=KVObject.Collection();var groups=KVObject.Array();foreach(var material in new[]{"materials/base.vmat","materials/alternate.vmat"}){var group=KVObject.Collection();group["m_name"]=new KVObject(groups.Count.ToString());var materials=KVObject.Array();materials.Add(new KVObject(material));group["m_materials"]=materials;groups.Add(group);}root["m_materialGroups"]=groups;
  var data=Payload(root);var file=Path.Combine(folder,"model.vmdl_c");using(var stream=File.Create(file))using(var w=new BinaryWriter(stream)){w.Write((uint)(28+data.Length));w.Write((ushort)12);w.Write((ushort)1);w.Write(8u);w.Write(1u);w.Write(Encoding.ASCII.GetBytes("DATA"));w.Write(8u);w.Write((uint)data.Length);w.Write(data);}using var resource=new Resource{FileName=file};resource.Read(file);
  try{variant.Invoke(null,new object[]{resource,skin});if(reject)throw new Exception("Missing unrelated material group was accepted");}catch(TargetInvocationException ex)when(reject&&ex.InnerException is InvalidDataException){return;}
  var selectedMaterial=((Model)resource.DataBlock!).Data["m_materialGroups"][0]["m_materials"][0].ToString(null);if(selectedMaterial!=(alternate?"materials/alternate.vmat":"materials/base.vmat"))throw new Exception("Wrong material for style");
 }finally{Directory.Delete(folder,true);}
}
foreach(var part in new[]{"arms","head","shoulder","weapon"})CheckVariant("models/items/slark/cavern_crawl_2020_slark_"+part+"/cavern_crawl_2020_slark_"+part+".vmdl",2,false);
CheckVariant("models/heroes/test/model.vmdl",2,true);CheckVariant("models/heroes/test/model.vmdl",1,false,true);
Console.WriteLine("Material variants: Tellurian Full Throttle fallback, ordinary alternate skins and invalid-group rejection passed.");

// Pudge hook: the legacy CP7 resolves to the merged hero, overriding the
// explicitly relocated hook. Unrelated renderers must retain their CP inputs.
{
 var data=KVObject.Collection();var rows=KVObject.Array();
 KVObject Renderer(string model){var r=KVObject.Collection();r["_class"]=new KVObject("C_OP_RenderModels");r["m_nModelCP"]=new KVObject(7);r["m_modelInput"]=KVObject.Collection();r["m_EconSlotName"]=new KVObject("weapon");var entry=KVObject.Collection();entry["m_model"]=new KVObject(model);r["m_ModelList"]=KVObject.Array(new[]{entry});return r;}
 const string privateModel="harlord/models/tester-wearables/hook.vmdl";
 var hook=Renderer(privateModel+"_c");var other=Renderer("models/particle/other.vmdl");rows.Add(hook);rows.Add(other);data["m_Renderers"]=rows;
 var patch=assembly.GetType("TesterWearableHost")!.GetMethod("UsePrivateModelList",BindingFlags.Static|BindingFlags.NonPublic)!;
 patch.Invoke(null,new object[]{data,new HashSet<string>{privateModel}});
 if(hook.TryGetValue("m_nModelCP",out _)||hook.TryGetValue("m_modelInput",out _)||hook["m_EconSlotName"].ToString(null)!="")throw new Exception("Private hook still selects the hero model");
 if(!other.TryGetValue("m_nModelCP",out _)||!other.TryGetValue("m_modelInput",out _)||other["m_EconSlotName"].ToString(null)!="weapon")throw new Exception("Unrelated particle model binding changed");
 patch.Invoke(null,new object[]{data,new HashSet<string>{privateModel}});
 Console.WriteLine("Private wearable model renderers ignore hero CP overrides; unrelated bindings retained.");
}

// Reported Tide chain and Huskar LOD resources stay independent. The
// native decision must not depend on a tester UI flag or broaden by hero.
{
 var preserve=assembly.GetType("TesterWearableHost")!.GetMethod("PreserveRuntimeModel",BindingFlags.Static|BindingFlags.NonPublic)!;
 bool Keep(string h,string d)=>(bool)preserve.Invoke(null,new object[]{h,d})!;
 foreach(var suffix in new[]{"","_c"}){
  if(!Keep("models/heroes/tidehunter/tidehunter.vmdl"+suffix,"models/heroes/tidehunter/tidehunter_bracer.vmdl"+suffix))throw new Exception("Tide chain runtime was not preserved");
  if(!Keep("models/heroes/huskar/huskar.vmdl"+suffix,"models/items/huskar/huskar_explosive_maniac_weapon/huskar_explosive_maniac_weapon.vmdl"+suffix))throw new Exception("Huskar weapon runtime was not preserved");
 }
 if(Keep("models/heroes/axe/axe.vmdl_c","models/heroes/tidehunter/tidehunter_bracer.vmdl_c")||Keep("models/heroes/huskar/huskar.vmdl_c","models/items/huskar/unrelated/weapon.vmdl_c"))throw new Exception("Runtime profile leaked to unrelated models");
 Console.WriteLine("Reported Tide chain and Huskar authored LOD runtime profiles passed.");
}
