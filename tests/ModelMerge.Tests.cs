using ValveKeyValue;
internal static class ModelMergeTests
{
 static KVObject Array(params KVObject[] values){var a=KVObject.Array();foreach(var value in values)a.Add(value);return a;}
 static KVObject Skeleton(string[] names,int[] parents){var s=KVObject.Collection();s["m_boneName"]=Array(names.Select(n=>new KVObject(n)).ToArray());s["m_nParent"]=Array(parents.Select(n=>new KVObject(n)).ToArray());foreach(var key in new[]{"m_boneSphere","m_nFlag","m_bonePosParent","m_boneRotParent","m_boneScaleParent"})s[key]=Array(names.Select(_=>new KVObject(1)).ToArray());return s;}
 static void Check(bool condition){if(!condition)throw new Exception("Model merge regression");}
 public static int Main(){
  { // Original skeletons collected from the user's installed Dota archives.
   var fixture=Path.Combine(Directory.GetCurrentDirectory(),"tests","fixtures","sven-arbiter-skeletons.json");
   if(!File.Exists(fixture))throw new Exception("Run native tests from the repository root");
   using var doc=System.Text.Json.JsonDocument.Parse(File.ReadAllText(fixture));
   KVObject ReadSkeleton(System.Text.Json.JsonElement e){
    var sk=KVObject.Collection();foreach(var field in e.EnumerateObject()){
     KVObject Convert(System.Text.Json.JsonElement v)=>v.ValueKind switch{
      System.Text.Json.JsonValueKind.Array=>Array(v.EnumerateArray().Select(Convert).ToArray()),
      System.Text.Json.JsonValueKind.String=>new KVObject(v.GetString()!),
      System.Text.Json.JsonValueKind.Number=>v.TryGetInt32(out var n)?new KVObject(n):new KVObject(v.GetSingle()),
      _=>throw new Exception("Invalid skeleton fixture")};
     sk[field.Name]=Convert(field.Value);
    }return sk;
   }
   foreach(var donor in doc.RootElement.GetProperty("donors").EnumerateObject()){
    var host=ReadSkeleton(doc.RootElement.GetProperty("host"));var originalNames=host["m_boneName"].Values.Select(v=>v.ToString(null)).ToArray();
    var source=ReadSkeleton(donor.Value);var profile=ModelRootProfiles.Attachments("models/heroes/sven/sven.vmdl_c",donor.Name+"_c");Check(profile is not null);
    var map=ModelMerge.MergeSkeleton(host,source,matchBoneCase:true,rootAttachments:profile);
    var names=source["m_boneName"].Values.Select(v=>v.ToString(null)).ToArray();var ankle=System.Array.IndexOf(names,"ankle_l");
    if(ankle>=0)Check(map[ankle]==System.Array.IndexOf(originalNames,"ankle_L"));
    foreach(var key in new[]{"m_bonePosParent","m_boneRotParent","m_boneScaleParent"})for(var i=0;i<originalNames.Length;i++)Check(host[key][i].ToString()==ReadSkeleton(doc.RootElement.GetProperty("host"))[key][i].ToString());
    Check(ModelRootProfiles.Attachments("models/heroes/axe/axe.vmdl_c",donor.Name) is null);
   }
   Check(ModelRootProfiles.Attachments("models/heroes/sven/sven.vmdl_c","models/items/sven/unrelated/unrelated.vmdl_c") is null);
  }
  {var host=Skeleton(new[]{"Root0_JNT"},new[]{-1});var weapon=Skeleton(new[]{"uprweapon0_jnt","LwrWeapon0_JNT","RtLegEnd_JNT"},new[]{-1,-1,-1});var set=Skeleton(new[]{"Root0_JNT","uprweapon0_jnt","LwrWeapon0_JNT","RtLeg3_JNT","RtLegEnd_JNT"},new[]{-1,0,0,0,3});Check(TesterWearableHost.DonorOrder(host,new[]{weapon,set}).SequenceEqual(new[]{1,0}));Check(TesterWearableHost.DonorOrder(host,new[]{set,weapon}).SequenceEqual(new[]{0,1}));Check(weapon["m_nParent"][2].ToInt32(null)==-1);}
  {Check(TesterWearableHost.IndependentCloth("models/heroes/drow/drow_base.vmdl_c","models/items/drow/ti6_immortal_cape/drow_ti6_immortal_arcana_refit.vmdl_c"));Check(!TesterWearableHost.IndependentCloth("models/heroes/test/test.vmdl_c","models/items/drow/ti6_immortal_cape/drow_ti6_immortal_arcana_refit.vmdl_c"));}
  foreach(var part in new[]{"weapon_fx_l","weapon_fx_r","weapon_feathers_fx_l","weapon_feathers_fx_r"}){
   var root=KVObject.Collection();root["m_hSnapshot"]=new KVObject("particles/models/items/beastmaster/bm_2021_immortal/bm_2021_immortal/bm_2021_immortal_"+part+".vsnap");root["m_nSnapshotControlPoint"]=new KVObject(part.Contains("feathers")?5:6);var skin=KVObject.Collection();skin["_class"]=new KVObject("C_INIT_InitSkinnedPositionFromCPSnapshot");skin["m_bRigid"]=new KVObject(true);root["m_Initializers"]=Array(skin);var rigid=KVObject.Collection();rigid["_class"]=new KVObject("C_OP_SnapshotRigidSkinToBones");root["m_Operators"]=Array(rigid);Check(NativeImmortalParticles.Patch(root)==1);Check(!skin["m_bRigid"].ToBoolean(null));Check(root["m_Initializers"][0]["m_nInputMax"].ToInt32(null)==(part.Contains("feathers")?13:39));Check(root["m_Operators"].Values.Last()["_class"].ToString(null)=="C_OP_MovementSkinnedPositionFromCPSnapshot");Check(NativeImmortalParticles.Patch(root)==0);
  }

  {var empty=KVObject.Collection();empty["m_nDefaultMeshGroupMask"]=new KVObject(0UL);Check(TesterWearableHost.MetadataOnly(false,empty));empty["m_nDefaultMeshGroupMask"]=new KVObject(1UL);Check(!TesterWearableHost.MetadataOnly(false,empty));Check(TesterWearableHost.MetadataOnly(true,empty));empty["m_nDefaultMeshGroupMask"]=new KVObject(ulong.MaxValue);Check(!TesterWearableHost.MetadataOnly(false,empty));Check(!TesterWearableHost.MetadataOnly(false,KVObject.Collection()));}

  {var segment=MorphlingFishChannels.Segment(6,3,new short[]{174},w=>{w.Write(1f);w.Write(2f);w.Write(3f);});Check(segment.Length==22&&BitConverter.ToUInt16(segment,6)==segment.Length&&BitConverter.ToInt16(segment,8)==174&&BitConverter.ToSingle(segment,10)==1f);}

  {
   var container=KVObject.Collection();container["m_Children"]=Array(new KVObject("unchanged-child"));ItemEffectScope.BindSnapshot(container,"harlord/particles/scoped.vsnap");Check(container["m_hSnapshot"].ToString(null)=="harlord/particles/scoped.vsnap");Check(container["m_nSnapshotControlPoint"].ToInt32(null)==60);Check(container["m_controlPointConfigurations"][0]["m_drivers"].Values.Any(d=>d["m_iControlPoint"].ToInt32(null)==0&&d["m_iAttachType"].ToString(null)=="PATTACH_ABSORIGIN_FOLLOW"));Check(container["m_Children"][0].ToString(null)=="unchanged-child");
   var water=KVObject.Collection();var cp10=KVObject.Collection();cp10["m_iControlPoint"]=new KVObject(10);cp10["m_vecOffset"]=Array(new KVObject(1f),new KVObject(0f),new KVObject(0f));var old=KVObject.Collection();old["m_drivers"]=Array(cp10);water["m_controlPointConfigurations"]=Array(old);MorphlingRuntime.WaterBinding(water);var drivers=water["m_controlPointConfigurations"][0]["m_drivers"].Values.ToArray();Check(drivers.Length==7&&drivers[3]["m_attachmentName"].ToString(null)=="attach_ambient_spine2"&&drivers[6]["m_iControlPoint"].ToInt32(null)==10);
  }
  {var payload=new byte[]{1,2,3,4};var resource=ModelSoftbodyParts.PhysicsResource(payload);Check(resource.Length==32&&BitConverter.ToUInt32(resource,0)==32&&BitConverter.ToUInt32(resource,12)==1&&System.Text.Encoding.ASCII.GetString(resource,16,4)=="DATA"&&BitConverter.ToUInt32(resource,20)==8&&resource.AsSpan(28).SequenceEqual(payload));}

  {
   var implicitSkin=ItemEffectScope.Skin(2,new ushort[]{3,0,0,0,7,0,0,0},null);Check(implicitSkin.Indices[0]==3&&implicitSkin.Indices[4]==7&&implicitSkin.Weights.All(w=>w==new System.Numerics.Vector4(1,0,0,0)));
   var rigid=ItemEffectScope.Skin(2,null,null,5);Check(rigid.Indices[0]==5&&rigid.Indices[4]==5);
   try{ItemEffectScope.Skin(2,null,null);throw new Exception("Ambiguous skin accepted");}catch(InvalidDataException){}
   Check(ModelRootProfiles.TesterAttachments("harlord/models/heroes/bane/bane.vmdl_c","harlord/models/items/bane/slumbering_terror/slumbering_terror.vmdl_c",Skeleton(["root"],[-1]))?["achain0_0"]=="root");
   Check(ModelRootProfiles.TesterAttachments("models/heroes/bane/bane.vmdl_c","models/heroes/bane/bane_shoulders.vmdl_c",Skeleton(["root"],[-1]))?["achain0_0"]=="root");
   Check(ModelRootProfiles.TesterAttachments("models/heroes/nyx_assassin/nyx_assassin.vmdl_c","models/items/nerubian_assassin/weapon.vmdl_c",Skeleton(["root"],[-1]))?["low_weapon"]=="root");
  }

  {
   KVObject Pose(string[] names,int[] parents){var sk=Skeleton(names,parents);sk["m_bonePosParent"]=Array(names.Select((_,i)=>Array(new KVObject((float)i),new KVObject(0f),new KVObject(0f))).ToArray());sk["m_boneRotParent"]=Array(names.Select(_=>Array(new KVObject(0f),new KVObject(0f),new KVObject(0f),new KVObject(1f))).ToArray());return sk;}
   var techiesHost=Pose(["root","root6","root2","root1","root4"],[-1,-1,-1,-1,-1]);var path="models/items/techies/techies_ti9_immortal_spleen/techies_ti9_immortal_spleen.vmdl";var profile=ModelRootProfiles.TesterAttachments("models/heroes/techies/techies.vmdl",path,techiesHost);Check(profile?["techies_ti9_immortal_spleen_root1"]=="root1");ModelMerge.MergeSkeleton(techiesHost,Pose(["techies_ti9_immortal_spleen_root1"],[-1]),rootAttachments:profile);Check(techiesHost["m_nParent"].Values.Last().ToInt32(null)==3);Check(Math.Abs(techiesHost["m_bonePosParent"].Values.Last()[0].ToSingle(null)+3)<.0001f);
   Check(ModelRootProfiles.TesterAttachments("models/heroes/techies/techies.vmdl","models/items/techies/unrelated/item.vmdl",techiesHost) is null);Check(ModelRootProfiles.TesterAttachments("models/heroes/axe/axe.vmdl",path,techiesHost) is null);
   var nyx=Pose(["root"],[-1]);var nyxProfile=ModelRootProfiles.TesterAttachments("models/heroes/nerubian_assassin/nerubian_assassin.vmdl","models/items/nerubian_assassin/nyx_dagon.vmdl",nyx);Check(nyxProfile?["armor_wbadges"]=="root");ModelMerge.MergeSkeleton(nyx,Pose(["armor_wbadges"],[-1]),rootAttachments:nyxProfile);Check(nyx["m_nParent"][1].ToInt32(null)==0);
  }

  { // Raw mesh and hero bind poses differ: names alone cannot bind a snapshot.
   var source=new System.Numerics.Vector3(2,3,4);var bones=new[]{"spear","crystal","",""};var weights=new[]{.75f,.25f,0f,0f};
   var inverse=new Dictionary<string,System.Numerics.Matrix4x4>{{"spear",System.Numerics.Matrix4x4.CreateTranslation(-2,0,0)},{"crystal",System.Numerics.Matrix4x4.CreateRotationZ(MathF.PI/2)}};
   var target=new Dictionary<string,System.Numerics.Matrix4x4>{{"spear",System.Numerics.Matrix4x4.CreateTranslation(0,0,10)},{"crystal",System.Numerics.Matrix4x4.CreateTranslation(0,0,20)}};
   var point=ItemEffectScope.RebasePoint(source,bones,weights,inverse,target);var expected=new System.Numerics.Vector3(0,3,14)*.75f+new System.Numerics.Vector3(-3,2,24)*.25f;Check(System.Numerics.Vector3.Distance(point,expected)<.0001f);Check(source==new System.Numerics.Vector3(2,3,4));
   try{ItemEffectScope.RebasePoint(source,bones,weights,new Dictionary<string,System.Numerics.Matrix4x4>(),target);throw new Exception("Missing bind accepted");}catch(InvalidDataException){}
  }

  {
   var snapshotFile=System.IO.Path.Combine(System.IO.Path.GetTempPath(),System.Guid.NewGuid()+".vsnap_c");
   try{
    var geometry=new[]{new ItemEffectScope.Point(new System.Numerics.Vector3(1,2,3),new[]{"head","","",""},new[]{1f,0f,0f,0f})};
    var authored=new[]{geometry[0],new ItemEffectScope.Point(new System.Numerics.Vector3(1,2,3),new[]{"tail","","",""},new[]{1f,0f,0f,0f})};ItemEffectScope.Snapshot(snapshotFile,authored);
    var filtered=ItemEffectScope.AuthoredSnapshot(snapshotFile,geometry);Check(filtered.Count==1&&filtered[0].Bones[0]=="head"&&filtered[0].Position==geometry[0].Position);
    var hitboxDef=KVObject.Collection();var sampler=KVObject.Collection();sampler["_class"]=new KVObject("C_INIT_CreateOnModel");hitboxDef["m_Initializers"]=Array(sampler);Check(ItemHitboxScope.Patch(hitboxDef,"harlord_fx_123")==1);Check(!sampler["m_bUseMesh"].ToBoolean(null));Check(sampler["m_HitboxSetName"].ToString(null)=="harlord_fx_123");Check(hitboxDef["m_Operators"].Values.Last()["_class"].ToString(null)=="C_OP_LockToBone");
    var hitboxMesh=KVObject.Collection();var hitboxRow=KVObject.Collection();hitboxRow["m_sBoneName"]=new KVObject("oldBone");var hitboxValue=KVObject.Collection();hitboxValue["m_HitBoxes"]=Array(hitboxRow);var hitboxSet=KVObject.Collection();hitboxSet["value"]=hitboxValue;hitboxMesh["m_hitboxsets"]=Array(hitboxSet);ModelMerge.RenameMeshBones(hitboxMesh,new Dictionary<string,string>{{"oldBone","newBone"}});Check(hitboxRow["m_sBoneName"].ToString(null)=="newBone");Check(hitboxRow["m_nBoneNameHash"].ToUInt32(null)==ValveResourceFormat.Utils.StringToken.Get("newBone"));
    var boxPoints=new[]{new ItemEffectScope.Point(new System.Numerics.Vector3(3,4,5),new[]{"weapon","body","",""},new[]{1f,0f,0f,0f})};var boxes=ItemHitboxScope.Boxes(boxPoints,new Dictionary<string,System.Numerics.Matrix4x4>{{"weapon",System.Numerics.Matrix4x4.Identity}});Check(boxes.Count==1&&boxes[0]["m_sBoneName"].ToString(null)=="weapon");
    foreach(var entry in new[]{("io","io_muerta_root"),("io","alt_root"),("furion","blender_implicit")}){var profile=ModelRootProfiles.TesterAttachments("models/heroes/"+entry.Item1+"/hero.vmdl","models/items/"+entry.Item1+"/item.vmdl",Skeleton(["root"],[-1]));Check(profile?[entry.Item2]=="root");Check(ModelRootProfiles.TesterAttachments("models/heroes/axe/axe.vmdl","models/items/"+entry.Item1+"/item.vmdl",Skeleton(["root"],[-1])) is null);}
    var definition=KVObject.Collection();var init=KVObject.Collection();init["_class"]=new KVObject("C_INIT_CreateOnModel");definition["m_Initializers"]=Array(init);var colorDriver=KVObject.Collection();colorDriver["m_iControlPoint"]=new KVObject(15);var configRow=KVObject.Collection();configRow["m_name"]=new KVObject("preview");configRow["m_drivers"]=Array(colorDriver);definition["m_controlPointConfigurations"]=Array(configRow);Check(ItemEffectScope.Patch(definition,"harlord/particles/test.vsnap")==1);Check(init["_class"].ToString(null)=="C_INIT_InitSkinnedPositionFromCPSnapshot"&&init["m_nSnapshotControlPointNumber"].ToInt32(null)==60);Check(ItemEffectScope.UsesReservedPoint(definition));Check(configRow["m_drivers"].Values.Any(v=>v["m_iControlPoint"].ToInt32(null)==15));Check(ItemEffectScope.Patch(definition,"harlord/particles/test.vsnap")==0);
   }finally{System.IO.File.Delete(snapshotFile);}
  }

  {
   foreach(var pair in new[]{("windrunner","wr_root"),("venomancer","m_snake_L_09_attach_JNT"),("nyx_assassin","body"),("io","alt_root"),("dazzle","legs_lod0"),("dazzle","arms_lod0"),("bane","achain0_0"),("batrider","batrider_base")}){
    KVObject Pose(string bone){var sk=Skeleton([bone],[-1]);sk["m_bonePosParent"]=Array(Array(new KVObject(0f),new KVObject(0f),new KVObject(0f)));sk["m_boneRotParent"]=Array(Array(new KVObject(0f),new KVObject(0f),new KVObject(0f),new KVObject(1f)));return sk;}
    var profileHost=Pose("root");var profileDonor=Pose(pair.Item2);var profileMap=ModelRootProfiles.TesterAttachments("models/heroes/"+pair.Item1+"/hero.vmdl","models/items/"+pair.Item1+"/item.vmdl",profileHost);Check(profileMap is not null);ModelMerge.MergeSkeleton(profileHost,profileDonor,rootAttachments:profileMap);Check(profileHost["m_nParent"].Values.Last().ToInt32(null)==0);
    Check(ModelRootProfiles.TesterAttachments("models/heroes/axe/axe.vmdl","models/items/"+pair.Item1+"/item.vmdl",Pose("root")) is null);
   }
  }

  {
   KVObject Pose(string name,float x){var s=Skeleton([name],[-1]);s["m_bonePosParent"]=Array(Array(new KVObject(x),new KVObject(0f),new KVObject(0f)));s["m_boneRotParent"]=Array(Array(new KVObject(0f),new KVObject(0f),new KVObject(0f),new KVObject(1f)));return s;}
   var profiles=new[]{
    ("models/heroes/kunkka/kunkka_head.vmdl","models/items/kunkka/sea_spirit_head/sea_spirit_head.vmdl","root","flexslidersnode"),
    ("models/heroes/lion/lion_head.vmdl","models/items/lion/test_head/test_head.vmdl","Root_0","spine_3"),
    ("models/items/earthshaker/earthshaker_arcana/earthshaker_arcana.vmdl","models/items/earthshaker/siege_beast_head/siege_beast_head_refit.vmdl","root","earthshaker1"),
    ("models/items/tidehunter/tidehunter_arcana/tidehunter_arcana.vmdl","models/items/tidehunter/executioner_ray_hood/executioner_ray_hood.vmdl","root1","group1"),
    ("models/heroes/spectre/spectre.vmdl","models/items/spectre/malicious_bracers_misc/malicious_bracers_misc.vmdl","root","base"),
    ("models/items/io/io_ti7/io_ti7.vmdl","models/items/io/io_calavera/io_calavera.vmdl","root_immortal","io_muerta_root"),
    ("models/heroes/legion_commander/legion_commander.vmdl","models/items/legion_commander/conquests_of_golden_sun_head/conquests_of_golden_sun_head.vmdl","Root0_JNT","SMDImport001")
   };
   foreach(var(hostName,donorName,parent,bone) in profiles){
    var attachments=ModelRootProfiles.Attachments(hostName,donorName);Check(ModelRootProfiles.Attachments("harlord/"+hostName+"_c","harlord/"+donorName+"_c")?[bone]==parent);Check(attachments is not null&&attachments[bone]==parent);
    var h=Pose(parent,2);var d=Pose(bone,10);ModelMerge.MergeSkeleton(h,d,rootAttachments:attachments);
    Check(h["m_nParent"][1].ToInt32(null)==0);Check(Math.Abs(h["m_bonePosParent"][1][0].ToSingle(null)+2-10)<0.00001);
    Check(ModelRootProfiles.Attachments("models/heroes/unrelated/body.vmdl",donorName) is null);
    try{ModelMerge.MergeSkeleton(Pose(parent,2),Pose("unknown_importer_root",10),rootAttachments:attachments);throw new Exception("Unrecognized root accepted");}catch(InvalidDataException){}
   }
   Check(ModelRootProfiles.Attachments("models/heroes/spectre/spectre.vmdl","models/items/spectre/unrelated/unrelated.vmdl") is null);
  }

  {
   var earlyRegressionHost=Skeleton(["fk_Pelvis","arm_R"],[-1,0]);
   var earlyRegressionMap=ModelMerge.MergeSkeleton(earlyRegressionHost,Skeleton(["fk_pelvis","arm_R"],[-1,0]),matchBoneCase:true);
   Check(earlyRegressionMap.SequenceEqual(new[]{0,1})&&earlyRegressionHost["m_boneName"].Count==2);
  }

  {
   KVObject Posed(string name,float x){var s=Skeleton([name],[-1]);s["m_bonePosParent"]=Array(Array(new KVObject(x),new KVObject(0f),new KVObject(0f)));s["m_boneRotParent"]=Array(Array(new KVObject(0f),new KVObject(0f),new KVObject(0f),new KVObject(1f)));return s;}
   foreach(var side in new[]{"R","L"}){
    var earlyRegressionDonor=Posed("shark_"+side+"_01_JNT",10f);
    try{ModelMerge.MergeSkeleton(Posed("root",2f),earlyRegressionDonor);throw new Exception("Shark exception enabled globally");}catch(InvalidDataException){}
    var earlyRegressionHost=Posed("root",2f);var earlyRegressionMap=ModelMerge.MergeSkeleton(earlyRegressionHost,earlyRegressionDonor,attachMorphlingSharkRoots:true);
    Check(earlyRegressionMap.SequenceEqual(new[]{1})&&earlyRegressionHost["m_nParent"][1].ToInt32(null)==0);
    Check(Math.Abs(earlyRegressionHost["m_bonePosParent"][1][0].ToSingle(null)-8f)<0.0001f);
   }
   try{ModelMerge.MergeSkeleton(Posed("root",0f),Posed("unknown_root",0f),attachMorphlingSharkRoots:true);throw new Exception("Unknown root accepted by shark exception");}catch(InvalidDataException){}
  }

  {
   var partialDonor=Skeleton(["Head_0","bicep_R","bicep_L"],[-1,-1,-1]);
   try{ModelMerge.MergeSkeleton(Skeleton(["Spine_3","Head_0"],[-1,0]),partialDonor);throw new Exception("Unverified root accepted");}catch(InvalidDataException){}
   var partialHost=Skeleton(["Spine_3","Head_0"],[-1,0]);
   ModelMerge.MergeSkeleton(partialHost,partialDonor,knownRootBones:new HashSet<string>{"Spine_3","Head_0","bicep_R","bicep_L"});
   Check(partialHost["m_nParent"][2].ToInt32(null)==-1&&partialHost["m_nParent"][3].ToInt32(null)==-1);
   Check(partialHost["m_bonePosParent"][2].ToInt32(null)==1);
   try{ModelMerge.MergeSkeleton(Skeleton(["Spine_3","Head_0"],[-1,0]),partialDonor,knownRootBones:new HashSet<string>{"Head_0"});throw new Exception("Unknown reference root accepted");}catch(InvalidDataException){}
  }

  {
   var target=KVObject.Collection();target["targetname"]=new KVObject("[PR#]default_RF");target["weather_type"]=new KVObject(-1);target["origin"]=new KVObject("terrain origin");target["inner_radius"]=new KVObject(7000);target["fog_flow_map_texture"]=new KVObject("terrain/fog.vtex");target["preview_day_or_night"]=new KVObject(1);
   var source=KVObject.Collection();source["targetname"]=new KVObject("[PR#]rain_RF");source["weather_type"]=new KVObject(2);source["origin"]=new KVObject("source origin");source["inner_radius"]=new KVObject(100);source["fog_flow_map_texture"]=new KVObject("source/fog.vtex");source["preview_day_or_night"]=new KVObject(0);source["fog_end_day"]=new KVObject(2500);source["fog_end_night"]=new KVObject(2200);source["fog_color_day"]=Array(new KVObject(153),new KVObject(161),new KVObject(176));source["lightning_sound"]=new KVObject("lightning.thunder");
   MapWeather.ApplyAtmosphere(target,target,new Dictionary<string,KVObject>{{"RF",source}});
   Check(target["fog_end_day"].ToInt32(null)==2500&&target["fog_end_night"].ToInt32(null)==2200);Check(target["weather_type"].ToInt32(null)==-1&&target["inner_radius"].ToInt32(null)==7000);Check(target["origin"].ToString(null)=="terrain origin"&&target["targetname"].ToString(null)=="[PR#]default_RF");Check(target["fog_flow_map_texture"].ToString(null)=="terrain/fog.vtex"&&target["preview_day_or_night"].ToInt32(null)==1);Check(target["lightning_sound"].ToString(null)=="lightning.thunder");
   target["fog_color_day"].Add(new KVObject(5));Check(source["fog_color_day"].Count==3);
   try{MapWeather.ApplyAtmosphere(target,target,new Dictionary<string,KVObject>());throw new Exception("Missing rain profile accepted");}catch(InvalidDataException){}
  }

  {
   var roots=new[]{"econ_snow","econ_rain","econ_moonlight","econ_weather_pestilence","econ_weather_harvest","econ_weather_sirocco","econ_weather_spring","econ_weather_ash","econ_weather_aurora"};
   for(int i=0;i<roots.Length;i++)Check(MapWeather.ProfileType("particles/rain_fx/"+roots[i]+".vpcf")==i+1);
   KVObject Entity(int type){var v=KVObject.Collection();v["classname"]=new KVObject("ent_dota_lightinfo");v["targetname"]=new KVObject("weather_RF");v["weather_type"]=new KVObject(type);v["origin"]=new KVObject("local");var kv=KVObject.Collection();kv["values"]=v;var e=KVObject.Collection();e["keyValues3Data"]=kv;return e;}
   var profile=KVObject.Collection();profile["fog_end_day"]=new KVObject(3500);profile["origin"]=new KVObject("foreign");
   var profiles=new Dictionary<string,KVObject>{{"RF",profile}};var root=KVObject.Collection();root["m_entityKeyValues"]=Array(Entity(0),Entity(1),Entity(3));long next=10;
   Check(MapWeather.PatchEntities(root,"particles/rain_fx/econ_moonlight.vpcf",true,null,ref next,profiles)==3);
   foreach(var e in root["m_entityKeyValues"].Values){var v=e["keyValues3Data"]["values"];Check(v["fog_end_day"].ToInt32(null)==3500&&v["origin"].ToString(null)=="local"&&v["weather_effect"].ToString(null)=="particles/rain_fx/econ_moonlight.vpcf");}
   root["m_entityKeyValues"]=Array(Entity(1),Entity(3));Check(MapWeather.PatchEntities(root,"particles/rain_fx/econ_snow.vpcf",false,1,ref next,profiles)==3);Check(root["m_entityKeyValues"][2]["keyValues3Data"]["values"]["weather_type"].ToInt32(null)==0);
  }

  {
   KVObject C(string name,float min=0,float max=1){var c=KVObject.Collection();c["m_szName"]=new KVObject(name);c["m_szType"]=new KVObject("default");c["min"]=new KVObject(min);c["max"]=new KVObject(max);return c;}
   KVObject M(KVObject[] cs,int index){var m=KVObject.Collection();m["m_FlexControllers"]=Array(cs);var op=KVObject.Collection();op["m_OpCode"]=new KVObject("FLEX_OP_FETCH1");op["m_Data"]=new KVObject(index);var rule=KVObject.Collection();rule["m_nFlex"]=new KVObject(7);rule["m_FlexOps"]=Array(op);m["m_FlexRules"]=Array(rule);m["m_pTextureAtlas"]=new KVObject("unchanged");return m;}
   var hostControllerMorph=M([C("jaw"),C("eye",-1,1)],0);var donorControllerMorph=M([C("eye"),C("jaw"),C("phoneme")],0);
   ModelMerge.RemapMorphControllers(donorControllerMorph,hostControllerMorph);
   Check(hostControllerMorph["m_FlexControllers"].Count==3&&hostControllerMorph["m_FlexControllers"][0]["m_szName"].ToString(null)=="jaw");
   var ops=donorControllerMorph["m_FlexRules"][0]["m_FlexOps"];
   Check(ops.Count==5&&ops[0]["m_Data"].ToInt32(null)==1);
   Check(ops[1]["m_Data"].ToSingle(null)==0.5f&&ops[2]["m_OpCode"].ToString(null)=="FLEX_OP_MUL"&&ops[3]["m_Data"].ToSingle(null)==0.5f);
   Check(donorControllerMorph["m_FlexRules"][0]["m_nFlex"].ToInt32(null)==7&&donorControllerMorph["m_pTextureAtlas"].ToString(null)=="unchanged");
   Check(hostControllerMorph["m_FlexRules"][0]["m_FlexOps"][0]["m_Data"].ToInt32(null)==0);
   var invalid=M([C("jaw")],2);try{ModelMerge.RemapMorphControllers(invalid,hostControllerMorph);throw new Exception("Invalid controller index accepted");}catch(InvalidDataException){}
   var duplicate=M([C("jaw"),C("jaw")],0);try{ModelMerge.RemapMorphControllers(duplicate,hostControllerMorph);throw new Exception("Duplicate controller accepted");}catch(InvalidDataException){}
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
