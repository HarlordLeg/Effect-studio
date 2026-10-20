using ValveKeyValue;
internal static class ModelMergeTests
{
 static KVObject Array(params KVObject[] values){var a=KVObject.Array();foreach(var value in values)a.Add(value);return a;}
 static KVObject Skeleton(string[] names,int[] parents){var s=KVObject.Collection();s["m_boneName"]=Array(names.Select(n=>new KVObject(n)).ToArray());s["m_nParent"]=Array(parents.Select(n=>new KVObject(n)).ToArray());foreach(var key in new[]{"m_boneSphere","m_nFlag","m_bonePosParent","m_boneRotParent","m_boneScaleParent"})s[key]=Array(names.Select(_=>new KVObject(1)).ToArray());return s;}
 static void Check(bool condition){if(!condition)throw new Exception("Model merge regression");}
 public static int Main(){
  {
   var target=KVObject.Collection();target["targetname"]=new KVObject("[PR#]default_RF");target["weather_type"]=new KVObject(-1);target["origin"]=new KVObject("terrain origin");target["inner_radius"]=new KVObject(7000);target["fog_flow_map_texture"]=new KVObject("terrain/fog.vtex");target["preview_day_or_night"]=new KVObject(1);
   var source=KVObject.Collection();source["targetname"]=new KVObject("[PR#]rain_RF");source["weather_type"]=new KVObject(2);source["origin"]=new KVObject("source origin");source["inner_radius"]=new KVObject(100);source["fog_flow_map_texture"]=new KVObject("source/fog.vtex");source["preview_day_or_night"]=new KVObject(0);source["fog_end_day"]=new KVObject(2500);source["fog_end_night"]=new KVObject(2200);source["fog_color_day"]=Array(new KVObject(153),new KVObject(161),new KVObject(176));source["lightning_sound"]=new KVObject("lightning.thunder");
   MapWeather.ApplyRainAtmosphere(target,target,new Dictionary<string,KVObject>{{"RF",source}});
   Check(target["fog_end_day"].ToInt32(null)==2500&&target["fog_end_night"].ToInt32(null)==2200);Check(target["weather_type"].ToInt32(null)==-1&&target["inner_radius"].ToInt32(null)==7000);Check(target["origin"].ToString(null)=="terrain origin"&&target["targetname"].ToString(null)=="[PR#]default_RF");Check(target["fog_flow_map_texture"].ToString(null)=="terrain/fog.vtex"&&target["preview_day_or_night"].ToInt32(null)==1);Check(target["lightning_sound"].ToString(null)=="lightning.thunder");
   target["fog_color_day"].Add(new KVObject(5));Check(source["fog_color_day"].Count==3);
   try{MapWeather.ApplyRainAtmosphere(target,target,new Dictionary<string,KVObject>());throw new Exception("Missing rain profile accepted");}catch(InvalidDataException){}
  }

  {
   KVObject Controller(string name){var c=KVObject.Collection();c["m_szName"]=new KVObject(name);c["m_szType"]=new KVObject("default");c["min"]=new KVObject(0);c["max"]=new KVObject(1);return c;}
   KVObject Morph(bool extra){var m=KVObject.Collection();m["m_FlexControllers"]=extra?Array(Controller("jaw"),Controller("orig")):Array(Controller("jaw"));var fetch=KVObject.Collection();fetch["m_OpCode"]=new KVObject("FLEX_OP_FETCH1");fetch["m_Data"]=new KVObject(extra?1:0);var rule=KVObject.Collection();rule["m_nFlex"]=new KVObject(7);rule["m_FlexOps"]=Array(fetch);m["m_FlexRules"]=Array(rule);m["m_pTextureAtlas"]=new KVObject("original_atlas");return m;}
   var hostMorph=Morph(false);var donorMorph=Morph(true);ModelMerge.NormalizeOriginalMorph(donorMorph,hostMorph);
   Check(donorMorph["m_FlexControllers"].Count==1&&hostMorph["m_FlexControllers"].Count==1);Check(donorMorph["m_FlexRules"][0]["m_nFlex"].ToInt32(null)==7);Check(donorMorph["m_FlexRules"][0]["m_FlexOps"][0]["m_OpCode"].ToString(null)=="FLEX_OP_CONST");Check(donorMorph["m_FlexRules"][0]["m_FlexOps"][0]["m_Data"].ToInt32(null)==0);Check(donorMorph["m_pTextureAtlas"].ToString(null)=="original_atlas");Check(hostMorph["m_FlexRules"][0]["m_FlexOps"][0]["m_OpCode"].ToString(null)=="FLEX_OP_FETCH1");
   var unknown=Morph(true);unknown["m_FlexControllers"][1]["m_szName"]=new KVObject("unknown");try{ModelMerge.NormalizeOriginalMorph(unknown,hostMorph);throw new Exception("Unknown morph accepted");}catch(InvalidDataException){}
   var mismatch=Morph(true);mismatch["m_FlexControllers"][0]["m_szName"]=new KVObject("different");try{ModelMerge.NormalizeOriginalMorph(mismatch,hostMorph);throw new Exception("Different facial order accepted");}catch(InvalidDataException){}
  }
  {
   KVObject Entity(int type,string name){var v=KVObject.Collection();v["classname"]=new KVObject("ent_dota_lightinfo");v["weather_type"]=new KVObject(type);v["targetname"]=new KVObject(name);v["origin"]=new KVObject("1 2 3");v["night_color"]=Array(new KVObject(1),new KVObject(2));var kv=KVObject.Collection();kv["values"]=v;var e=KVObject.Collection();e["keyValues3Data"]=kv;return e;}
   var root=KVObject.Collection();var snow=Entity(1,"snow");var rain=Entity(2,"rain");root["m_entityKeyValues"]=Array(snow,rain);long next=100;
   Check(MapWeather.PatchEntities(root,"particles/rain_fx/econ_rain.vpcf",false,null,ref next)==0&&root["m_entityKeyValues"].Count==2);
   Check(MapWeather.PatchEntities(root,"particles/rain_fx/econ_rain.vpcf",false,1,ref next)==1&&root["m_entityKeyValues"].Count==3);
   var copy=root["m_entityKeyValues"][2]["keyValues3Data"]["values"];Check(copy["weather_type"].ToInt32(null)==0&&snow["keyValues3Data"]["values"]["weather_type"].ToInt32(null)==1);Check(copy["origin"].ToString(null)=="1 2 3"&&copy["night_color"][1].ToInt32(null)==2);Check(!snow["keyValues3Data"]["values"].ContainsKey("weather_effect"));
   copy["night_color"].Add(new KVObject(99));Check(snow["keyValues3Data"]["values"]["night_color"].Count==2);
   root["m_entityKeyValues"]=Array(Entity(-1,"reef"),Entity(2,"other-weather"));Check(MapWeather.PatchEntities(root,"particles/rain_fx/econ_snow.vpcf",true,null,ref next)==1);Check(root["m_entityKeyValues"][0]["keyValues3Data"]["values"]["weather_type"].ToInt32(null)==-1);Check(!root["m_entityKeyValues"][1]["keyValues3Data"]["values"].ContainsKey("weather_effect"));
  }

  {
  var arcHost=Skeleton(["root","clavicle_R","bicep_R"],[-1,0,1]);
  var caseDonor=Skeleton(["root","clavicle_r","bicep_r","cloth_tip"],[-1,0,1,2]);
  Check(ModelMerge.MergeSkeleton(arcHost,caseDonor,matchBoneCase:true).SequenceEqual(new[]{0,1,2,3}));
  Check(arcHost["m_boneName"][1].ToString(null)=="clavicle_R");
  Check(arcHost["m_nParent"][3].ToInt32(null)==2);
  var ambiguous=Skeleton(["root","Arm_R","arm_r"],[-1,0,0]);
  Check(ModelMerge.MergeSkeleton(ambiguous,Skeleton(["root","ARM_R"],[-1,0]),matchBoneCase:true).SequenceEqual(new[]{0,3}));
  var arcMesh=KVObject.Collection();var meshSkeleton=KVObject.Collection();var meshBone=KVObject.Collection();meshBone["m_boneName"]=new KVObject("clavicle_r");meshBone["m_parentName"]=new KVObject("root");meshSkeleton["m_bones"]=Array(meshBone);arcMesh["m_skeleton"]=meshSkeleton;
  var attachment=KVObject.Collection();attachment["m_influenceNames"]=Array(new KVObject("clavicle_r"));var row=KVObject.Collection();row["value"]=attachment;arcMesh["m_attachments"]=Array(row);
  ModelMerge.RenameMeshBones(arcMesh,new Dictionary<string,string>{{"clavicle_r","clavicle_R"}});
  Check(meshBone["m_boneName"].ToString(null)=="clavicle_R"&&meshBone["m_parentName"].ToString(null)=="root");Check(attachment["m_influenceNames"][0].ToString(null)=="clavicle_R");

  }
  {
   var legacy=KVObject.Collection();legacy["float"]=new KVObject(1.25f);legacy["negativeZero"]=new KVObject(-0.0f);legacy["short"]=new KVObject((short)-17);legacy["ushort"]=new KVObject((ushort)65535);legacy["string"]=new KVObject("materials/test.vmat"){Flag=KVFlag.Resource};legacy["nested"]=Array(new KVObject(0.1f));
   HeroActivityRules.PromoteLegacyNumbers(legacy);
   Check(legacy["float"].ValueType==KVValueType.FloatingPoint64&&legacy["float"].ToDouble(null)==1.25);
   Check(BitConverter.DoubleToInt64Bits(legacy["negativeZero"].ToDouble(null))==long.MinValue);
   Check(legacy["short"].ToInt64(null)==-17&&legacy["ushort"].ToUInt64(null)==65535);
   Check(legacy["nested"][0].ValueType==KVValueType.FloatingPoint64&&legacy["nested"][0].ToDouble(null)==(double)0.1f);
   Check(legacy["string"].Flag==KVFlag.Resource&&legacy["string"].ToString(null)=="materials/test.vmat");
  }
  foreach(byte version in new byte[]{2,3}){
   var root=KVObject.Collection();root["nested"]=Array(new KVObject(1.25f),new KVObject((short)-4));
   var binary=new ValveResourceFormat.ResourceTypes.BinaryKV3(root,new ValveKeyValue.KeyValues3.KV3ID("generic",new Guid("7412167c-06e9-4698-aff2-e63eb59037e7")),ValveResourceFormat.BlockType.DATA){Resource=new ValveResourceFormat.Resource()};
   var bytes=HeroActivityRules.SerializeActivity(binary,version);Check(bytes[0]==version);
   var parsed=new ValveResourceFormat.ResourceTypes.BinaryKV3(ValveResourceFormat.BlockType.DATA){Resource=new ValveResourceFormat.Resource(),Offset=0,Size=(uint)bytes.Length};
   using var reader=new BinaryReader(new MemoryStream(bytes));parsed.Read(reader);
   Check(parsed.Data.Root["nested"][0].ValueType==KVValueType.FloatingPoint64&&parsed.Data.Root["nested"][0].ToDouble(null)==1.25);
   Check(parsed.Data.Root["nested"][1].ToInt64(null)==-4);
  }
  Check(ModelMerge.MeshReference(KVObject.Null())=="");
  Check(ModelMerge.MeshReference(new KVObject(""){Flag=KVFlag.Resource})=="");
  Check(ModelMerge.MeshReference(new KVObject("models/test/head.vmesh"){Flag=KVFlag.Resource})=="models/test/head.vmesh");
  try{ModelMerge.MeshReference(new KVObject(7));throw new Exception("Invalid mesh reference accepted");}catch(InvalidDataException){}

  var host=Skeleton(["root","Head_1"],[-1,0]);var donor=Skeleton(["Head_1","hair","tip"],[-1,0,1]);
  donor["m_nFlag"]=Array(new KVObject(4),new KVObject(8),new KVObject(16));
  var map=ModelMerge.MergeSkeleton(host,donor);Check(map.SequenceEqual(new[]{1,2,3}));Check(host["m_nParent"].Values.Select(v=>v.ToInt32(null)).SequenceEqual(new[]{-1,0,1,2}));
  Check(host["m_nFlag"].Values.Select(v=>v.ToInt32(null)).SequenceEqual(new[]{1,5,8,16}));
  Check(host["m_boneName"][0].ToString(null)=="root"&&host["m_boneName"][1].ToString(null)=="Head_1");
  try{ModelMerge.MergeSkeleton(host,Skeleton(["unrelated_root"],[-1]));throw new Exception("Unattached root accepted");}catch(InvalidDataException){}
  try{ModelMerge.MergeSkeleton(Skeleton(["root"],[-1]),Skeleton(["root","root"],[-1,0]));throw new Exception("Duplicate bones accepted");}catch(InvalidDataException){}
  // Missing and empty optional fields occur in real compiled wearables.
  foreach(var emptyHost in new[]{false,true})foreach(var emptyDonor in new[]{false,true}){
   var h=Skeleton(["root","Head_1"],[-1,0]);var d=Skeleton(["Head_1","hair","tip"],[-1,0,1]);
   if(emptyHost)h["m_boneScaleParent"]=Array();else h.Remove("m_boneScaleParent");
   if(emptyDonor)d["m_boneScaleParent"]=Array();else d.Remove("m_boneScaleParent");
   h.Remove("m_boneSphere");d["m_boneSphere"]=Array();
   ModelMerge.MergeSkeleton(h,d);
   Check(h["m_boneScaleParent"].Values.Select(v=>v.ToSingle(null)).SequenceEqual(new[]{1f,1f,1f,1f}));
   Check(h["m_boneSphere"].Values.All(v=>v.ToSingle(null)==0));
  }
  var scaledHost=Skeleton(["root","Head_1"],[-1,0]);var scaledDonor=Skeleton(["Head_1","hair","tip"],[-1,0,1]);
  scaledHost["m_boneScaleParent"]=Array(new KVObject(2f),new KVObject(3f));
  scaledDonor["m_boneScaleParent"]=Array(new KVObject(9f),new KVObject(4f),new KVObject(5f));
  ModelMerge.MergeSkeleton(scaledHost,scaledDonor);
  Check(scaledHost["m_boneScaleParent"].Values.Select(v=>v.ToSingle(null)).SequenceEqual(new[]{2f,3f,4f,5f}));
  foreach(var missingHost in new[]{true,false}){
   var h=Skeleton(["root","Head_1"],[-1,0]);var d=Skeleton(["Head_1","hair"],[-1,0]);
   h["m_boneScaleParent"]=Array(new KVObject(2f),new KVObject(3f));
   d["m_boneScaleParent"]=Array(new KVObject(9f),new KVObject(4f));
   if(missingHost)h.Remove("m_boneScaleParent");else d.Remove("m_boneScaleParent");
   ModelMerge.MergeSkeleton(h,d);
   Check(h["m_boneScaleParent"].Values.Select(v=>v.ToSingle(null)).SequenceEqual(missingHost?new[]{1f,1f,4f}:new[]{2f,3f,1f}));
  }
  foreach(var field in new[]{"m_boneScaleParent","m_boneSphere","m_bonePosParent","m_boneRotParent","m_nFlag"}){
   var h=Skeleton(["root","Head_1"],[-1,0]);var d=Skeleton(["Head_1","hair"],[-1,0]);d[field]=Array(new KVObject(1f));
   try{ModelMerge.MergeSkeleton(h,d);throw new Exception("Partial skeleton array accepted: "+field);}catch(InvalidDataException){}
  }
  // Darktrench head LOD0: one real bone followed by 30 obsolete entries.
  var palette=new[]{new KVObject(0),new KVObject(0),new KVObject(1),new KVObject(29),new KVObject(0)};
  Check(ModelMerge.RemapMeshBones(palette,0,4,[17],1,"head LOD0").SequenceEqual(new[]{17}));
  Check(ModelMerge.RemapMeshBones(palette,4,5,[17],1,"head LOD1").SequenceEqual(new[]{17}));
  Check(ModelMerge.RemapMeshBones(palette,0,4,[17],0,"unskinned").Length==0);
  try{ModelMerge.RemapMeshBones(palette,0,4,[17],3,"bad active bone");throw new Exception("Invalid active palette accepted");}catch(InvalidDataException){}
  try{ModelMerge.RemapMeshBones(palette,4,5,[17],2,"short palette");throw new Exception("Short palette accepted");}catch(InvalidDataException){}
  try{ModelMerge.RemapMeshBones(palette,0,4,[17],null,"unknown mesh skeleton");throw new Exception("Invalid unknown palette accepted");}catch(InvalidDataException){}
  // Enigma root_0 is attached only by an explicit profile and keeps its
  // model-space bind pose under the unique hero root (including rotation/scale).
  KVObject Vector(params float[] values)=>Array(values.Select(v=>new KVObject(v)).ToArray());
  var rootHost=Skeleton(["root"],[-1]);rootHost["m_bonePosParent"]=Array(Vector(10,20,30));rootHost["m_boneRotParent"]=Array(Vector(0,0,0,1));rootHost["m_boneScaleParent"]=Array(new KVObject(2f));
  var rootDonor=Skeleton(["root_0","tip"],[-1,0]);rootDonor["m_bonePosParent"]=Array(Vector(14,26,38),Vector(1,0,0));rootDonor["m_boneRotParent"]=Array(Vector(0,0,0,1),Vector(0,0,0,1));
  Check(ModelMerge.MergeSkeleton(rootHost,rootDonor,true).SequenceEqual(new[]{1,2}));
  Check(rootHost["m_nParent"].Values.Select(v=>v.ToInt32(null)).SequenceEqual(new[]{-1,0,1}));
  Check(rootHost["m_bonePosParent"][1].Values.Select(v=>v.ToSingle(null)).SequenceEqual(new[]{2f,3f,4f}));
  Check(Math.Abs(rootHost["m_boneScaleParent"][1].ToSingle(null)-0.5f)<0.00001f);
  try{ModelMerge.MergeSkeleton(Skeleton(["root"],[-1]),rootDonor);throw new Exception("Root profile applied implicitly");}catch(InvalidDataException){}
  try{ModelMerge.MergeSkeleton(Skeleton(["root","cloth"],[-1,-1]),rootDonor,true);throw new Exception("Ambiguous host roots accepted");}catch(InvalidDataException){}
  var caseHost=Skeleton(["Root_0"],[-1]);caseHost["m_bonePosParent"]=Array(Vector(10,20,30));caseHost["m_boneRotParent"]=Array(Vector(0,0,0,1));caseHost["m_boneScaleParent"]=Array(new KVObject(2f));
  Check(ModelMerge.MergeSkeleton(caseHost,rootDonor).SequenceEqual(new[]{1,2}));
  Check(caseHost["m_boneName"][0].ToString(null)=="Root_0"&&caseHost["m_boneName"][1].ToString(null)=="root_0");
  Check(caseHost["m_nParent"][1].ToInt32(null)==0);
  Check(caseHost["m_bonePosParent"][1].Values.Select(v=>v.ToSingle(null)).SequenceEqual(new[]{2f,3f,4f}));
  try{ModelMerge.MergeSkeleton(Skeleton(["Root_0","cloth"],[-1,-1]),rootDonor);throw new Exception("Ambiguous case alias accepted");}catch(InvalidDataException){}
  KVObject AttachmentValue(string bone){var value=KVObject.Collection();value["m_influenceNames"]=Array(new KVObject(bone));return value;}
  KVObject Attachment(string name,string bone){var row=KVObject.Collection();row["key"]=new KVObject(name);row["value"]=AttachmentValue(bone);return row;}
  var mesh=KVObject.Collection();mesh["m_attachments"]=Array(Attachment("attach_attack1","Arm_3_R"),Attachment("attach_hitloc","Spine_1"));
  Check(ModelMerge.OverrideMeshAttachments(mesh,new Dictionary<string,KVObject>{{"attach_attack1",AttachmentValue("staff")},{"attach_weapon_bot",AttachmentValue("staff")}})==2);
  Check(mesh["m_attachments"][0]["value"]["m_influenceNames"][0].ToString(null)=="staff");
  Check(mesh["m_attachments"][1]["value"]["m_influenceNames"][0].ToString(null)=="Spine_1");
  Check(mesh["m_attachments"].Values.Count()==3);
  var header="<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:vmdlkeys4:version{9f5c1002-f19f-470c-bd42-c3c26c063d33} -->";
  var donorText=header+"\n{ particle_cfg_list = [{ name = resource:\"particles/ambient.vpcf\" config = \"authored\" controls = [1,2,3] }] death = resource:\"particles/death.vpcf\" }";
  var merged=ModelMerge.MergeParticleText("",donorText);Check(merged.Contains("authored")&&merged.Contains("controls")&&!merged.Contains("particles/death.vpcf"));
  Check(ModelMerge.MergeParticleText(merged,donorText)==merged);
  Console.WriteLine("[OK] Merge skeleton keeps host indices, maps donor parents and rejects unattached roots");return 0;
 }
}
