using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

// Fluid Frenzy's head has independent model-space shark roots and its own
// sequence. Geometry-only merging cannot preserve that animation.
internal static class MorphlingRuntime {
 private sealed record Request(string Input,string Output,string? Head=null,string? AnimationOutput=null,string? AnimationName=null,string? Water=null,string? WaterOutput=null,string? WaterName=null,string? SuppressedWaterOutput=null);
 static KVObject A(IEnumerable<KVObject> values)=>KVObject.Array(values);
 static KVObject Row(params (string,KVObject)[] fields){var r=KVObject.Collection();foreach(var(k,v)in fields)r[k]=v;return r;}
 static BinaryKV3 Read(Resource r,byte[] bytes,Block b){var kv=new BinaryKV3(b.Type){Resource=r,Offset=b.Offset,Size=b.Size};using var reader=new BinaryReader(new MemoryStream(bytes));reader.BaseStream.Position=b.Offset;kv.Read(reader);return kv;}
 static void Reference(Resource r,string name){var refs=r.ExternalReferences??throw new InvalidDataException("Missing references");if(!refs.ResourceRefInfoList.Any(v=>v.Name==name))refs.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Name=name,Id=Program.ComputeResourceId(name)});}
 internal static void WaterBinding(KVObject data){
  var names=new[]{"attach_base","attach_ambient_spine1","attach_ambient_spine2","attach_ambient_head","attach_ambient_head_2"};
  var drivers=new List<KVObject>{Row(("m_iControlPoint",new KVObject(0)),("m_entityName",new KVObject("self")),("m_iAttachType",new KVObject("PATTACH_ABSORIGIN_FOLLOW")))};
  for(int i=0;i<names.Length;i++)drivers.Add(Row(("m_iControlPoint",new KVObject(i+1)),("m_entityName",new KVObject("self")),("m_iAttachType",new KVObject("PATTACH_POINT_FOLLOW")),("m_attachmentName",new KVObject(names[i]))));
  if(data.TryGetValue("m_controlPointConfigurations",out var previous))foreach(var config in previous.Values)if(config.TryGetValue("m_drivers",out var old))foreach(var driver in old.Values)if(driver.TryGetValue("m_iControlPoint",out var cp)&&cp.ToInt32(null)>5&&!drivers.Any(d=>d["m_iControlPoint"].ToInt32(null)==cp.ToInt32(null)))drivers.Add(driver);
  data["m_controlPointConfigurations"]=A(new[]{Row(("m_name",new KVObject("preview")),("m_drivers",A(drivers)))});
 }
 public static void Run(string manifest){
  var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty Morphling request");
  var bytes=File.ReadAllBytes(q.Input);using var host=new Resource{FileName=q.Input};host.Read(q.Input);var model=host.DataBlock as Model??throw new InvalidDataException("Expected Morphling model");
  if(!model.Data["m_modelSkeleton"]["m_boneName"].Values.Any(v=>v.ToString(null)=="wake_front_L"))throw new InvalidDataException("Expected Morphling skeleton");
  var changed=new HashSet<object>();var raw=new Dictionary<object,byte[]>();byte[]? physics=null;BinaryKV3? hostCtrl=null;
  if(q.Head is not null){
   if(q.AnimationOutput is null||q.AnimationName is null)throw new InvalidDataException("Missing animation output");
   using var head=new Resource{FileName=q.Head};head.Read(q.Head);var original=File.ReadAllBytes(q.Head);var hm=head.DataBlock as Model??throw new InvalidDataException("Expected head model");
   var seqBlock=head.Blocks.Single(b=>b.Type==BlockType.ASEQ);var seq=Read(head,original,seqBlock);var root=seq.Data.Root;var sk=hm.Data["m_modelSkeleton"];var names=sk["m_boneName"].Values.Select(v=>v.ToString(null)).ToArray();var sharks=Enumerable.Range(0,names.Length).Where(i=>names[i].StartsWith("shark_",StringComparison.Ordinal)).ToArray();if(sharks.Length==0)throw new InvalidDataException("Head has no shark animation bones");
   root["m_localBoneNameArray"]=A(names.Select(n=>new KVObject(n)));var masks=root["m_localBoneMaskArray"].Values.ToList();var maskIndex=masks.Count;masks.Add(Row(("m_sName",new KVObject("harlord_fish_only")),("m_nLocalBoneArray",A(sharks.Select(i=>new KVObject(i)))),("m_flBoneWeightArray",A(sharks.Select(_=>new KVObject(1f)))),("m_flDefaultMorphCtrlWeight",new KVObject(0f)),("m_morphCtrlWeightArray",KVObject.Array())));root["m_localBoneMaskArray"]=A(masks);
   var idle=0;foreach(var row in root["m_localS1SeqDescArray"].Values){var active=row["m_sName"].ToString(null)=="morph_tritons_revenge_back_idle";row["m_flags"]["m_bAutoplay"]=new KVObject(active);if(active){row["m_nLocalWeightlist"]=new KVObject(maskIndex);idle++;}}if(idle!=1)throw new InvalidDataException("Missing unique Fluid Frenzy idle sequence");
   using(var stream=File.Create(q.AnimationOutput))HeroActivityRules.WriteActivityBlocks(head,original,stream,new Dictionary<object,byte[]>{{seqBlock,HeroActivityRules.SerializeActivity(seq,original[(int)seqBlock.Offset])}});
   var includes=model.Data["m_refAnimIncludeModels"].Values.Where(v=>v.ToString(null)!=q.AnimationName).ToList();includes.Add(new KVObject(q.AnimationName){Flag=KVFlag.Resource});model.Data["m_refAnimIncludeModels"]=A(includes);Reference(host,q.AnimationName);
   // Restore authored independent roots. Applying their model-space animation
   // beneath an invented root parent would add the hero root transform twice.
   var hs=model.Data["m_modelSkeleton"];var hn=hs["m_boneName"].Values.Select(v=>v.ToString(null)).ToArray();foreach(var i in sharks.Where(i=>sk["m_nParent"][i].ToInt32(null)<0)){var j=Array.IndexOf(hn,names[i]);if(j<0)throw new InvalidDataException("Missing merged shark root");foreach(var field in new[]{"m_nParent","m_bonePosParent","m_boneRotParent","m_boneScaleParent"}){var values=hs[field].Values.ToArray();values[j]=sk[field][i];hs[field]=A(values);}}
   var phys=head.Blocks.Single(b=>b.Type==BlockType.PHYS);physics=original.AsSpan((int)phys.Offset,(int)phys.Size).ToArray();var ctrlBlock=host.Blocks.Single(b=>b.Type==BlockType.CTRL);hostCtrl=Read(host,bytes,ctrlBlock);hostCtrl.Data.Root["embedded_physics"]=Row(("phys_data_block",new KVObject(host.Blocks.Count)));raw[ctrlBlock]=HeroActivityRules.SerializeActivity(hostCtrl,bytes[(int)ctrlBlock.Offset]);
   // Remove the unsuccessful detached FE programs from earlier test builds.
   var refs=model.Data["m_refPhysicsData"].Values.ToArray();var masksOld=model.Data["m_refPhysGroupMasks"].Values.ToArray();var keep=Enumerable.Range(0,refs.Length).Where(i=>!refs[i].ToString(null).StartsWith("harlord/models/morphling_softbody_",StringComparison.Ordinal)).ToArray();model.Data["m_refPhysicsData"]=A(keep.Select(i=>refs[i]));model.Data["m_refPhysGroupMasks"]=A(keep.Select(i=>masksOld[i]));
  }
  if(q.Water is not null){if(q.WaterOutput is null||q.WaterName is null)throw new InvalidDataException("Missing water output");using var water=new Resource{FileName=q.Water};water.Read(q.Water);var p=water.DataBlock as ParticleSystem??throw new InvalidDataException("Expected water particle");WaterBinding(p.Data);using(var stream=File.Create(q.WaterOutput))Program.SerializePatchedResource(water,File.ReadAllBytes(q.Water),stream,true,preserveMetadata:true);if(q.SuppressedWaterOutput is not null){p.Data["m_Children"]=KVObject.Array();p.Data["m_Emitters"]=KVObject.Array();p.Data["m_Renderers"]=KVObject.Array();using var suppressed=File.Create(q.SuppressedWaterOutput);Program.SerializePatchedResource(water,File.ReadAllBytes(q.Water),suppressed,true,preserveMetadata:true);}var info=model.Data["m_modelInfo"];info["m_keyValueText"]=new KVObject(ModelKeyText.AddParticles(info["m_keyValueText"].ToString(null),new[]{q.WaterName}));Reference(host,q.WaterName);}
  if(host.ExternalReferences is {} refsBlock)changed.Add(refsBlock);
  using var patched=new MemoryStream();Program.SerializePatchedResource(host,bytes,patched,true,changed,preserveMetadata:true,rawBlocks:raw);var output=patched.ToArray();
  if(physics is null)File.WriteAllBytes(q.Output,output);else AppendPhysics(output,physics,q.Output);
  using var check=new Resource{FileName=q.Output};check.Read(q.Output);if(physics is not null&&((Model)check.DataBlock!).GetEmbeddedPhys() is null)throw new InvalidDataException("Embedded fish physics not readable");
 }
 static void AppendPhysics(byte[] input,byte[] physics,string output){using var r=new Resource{FileName="model.vmdl_c"};r.Read(new MemoryStream(input));var chunks=r.Blocks.Select(b=>(b.Type,Bytes:input.AsSpan((int)b.Offset,(int)b.Size).ToArray())).Append((BlockType.PHYS,physics)).ToArray();using var f=File.Create(output);using var w=new BinaryWriter(f);w.Write(0u);w.Write(input.AsSpan(4,4));w.Write(8u);w.Write(chunks.Length);w.Write(new byte[chunks.Length*12]);for(int i=0;i<chunks.Length;i++){w.Write(new byte[(16-f.Position%16)%16]);var start=f.Position;w.Write(chunks[i].Item2);var end=f.Position;f.Position=16+i*12;w.Write((uint)chunks[i].Item1);w.Write((uint)(start-f.Position));w.Write(chunks[i].Item2.Length);f.Position=end;}f.Position=0;w.Write((uint)f.Length);}
}
