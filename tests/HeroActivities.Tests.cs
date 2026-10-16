using ValveKeyValue;
internal static class HeroActivitiesTests
{
 static KVObject Array(params KVObject[] values){var result=KVObject.Array();foreach(var value in values)result.Add(value);return result;}
 static KVObject Sequence(string name,params string[] activities){var row=KVObject.Collection();row["m_sName"]=new KVObject(name);row["m_name"]=new KVObject(name);row["m_fetch"]=new KVObject(123);row["m_activityArray"]=Array(activities.Select(a=>{var v=KVObject.Collection();v["m_name"]=new KVObject(a);return v;}).ToArray());return row;}
 static string[] Names(KVObject row)=>row["m_activityArray"].Values.Select(v=>v["m_name"].ToString(null)).ToArray();
 static void Check(bool condition){if(!condition)throw new Exception("Hero activity regression");}
 public static int Main(string[] args)
 {
  foreach(byte source in new byte[]{1,2,3,4,5})Check(HeroActivityRules.WritableVersion(source)==(source<4?4:source));
  try{HeroActivityRules.WritableVersion(6);throw new Exception("Future KV3 must be rejected");}catch(System.IO.InvalidDataException){}

  foreach(var arrayKey in new[]{"m_localS1SeqDescArray","m_animArray"})
  foreach(var modifiers in new[]{new[]{"basher"},new[]{"offhand_basher"},new[]{"basher","offhand_basher"}}){
   var basic=Sequence("loadout","ACT_DOTA_LOADOUT");var offhand=Sequence("basher_loadout_anim","ACT_DOTA_LOADOUT","offhand_basher");
   var cast=Sequence("cast","ACT_DOTA_CAST_ABILITY_4");var basher=Sequence("basher_cast","ACT_DOTA_CAST_ABILITY_4","basher");
   var other=Sequence("slasher","ACT_DOTA_LOADOUT","slasher");var run=Sequence("run","ACT_DOTA_RUN");
   var root=KVObject.Collection();root[arrayKey]=Array(basic,offhand,cast,basher,other,run);
   HeroActivities.Bake(root,modifiers.ToHashSet(),arrayKey);
   Check(Names(basic).Contains("ACT_DOTA_LOADOUT")!=modifiers.Contains("offhand_basher"));
   Check(Names(cast).Contains("ACT_DOTA_CAST_ABILITY_4")!=modifiers.Contains("basher"));
   Check(Names(other).SequenceEqual(new[]{"ACT_DOTA_LOADOUT","slasher"}));Check(Names(run).Single()=="ACT_DOTA_RUN");
   Check(Names(offhand).Contains("offhand_basher")!=modifiers.Contains("offhand_basher"));
   Check(Names(basher).Contains("basher")!=modifiers.Contains("basher"));
   foreach(var s in root[arrayKey].Values)Check(s["m_fetch"].ToInt32(null)==123);
  }
  // A stance is scoped to locomotion and cannot enable the item's spell cast.
  {
   KVObject basic=Sequence("idle","ACT_DOTA_IDLE"),stance=Sequence("custom_idle","ACT_DOTA_IDLE","custom"),cast=Sequence("custom_cast","ACT_DOTA_CAST_ABILITY_1","custom"),injured=Sequence("custom_injured","ACT_DOTA_IDLE","custom","injured"),combo=Sequence("combo","ACT_DOTA_IDLE","custom","other");
   var root=KVObject.Collection();root["m_localS1SeqDescArray"]=Array(basic,stance,cast,injured,combo);
   var report=HeroActivityRules.Bake(root,"m_localS1SeqDescArray",new[]{new HeroActivityRules.Rule("ACT_DOTA_IDLE","custom")},new HashSet<string>{"custom","other"});
   Check(report.Count==2);Check(!Names(basic).Contains("ACT_DOTA_IDLE"));Check(Names(stance).SequenceEqual(new[]{"ACT_DOTA_IDLE"}));Check(Names(cast).Contains("custom"));Check(Names(injured).Contains("injured"));Check(Names(combo).Contains("other"));
  }
  // More specific two-item animation wins; the incomplete variant keeps tags.
  {
   KVObject basic=Sequence("idle","ACT_DOTA_IDLE"),one=Sequence("one","ACT_DOTA_IDLE","one"),pair=Sequence("pair","ACT_DOTA_IDLE","one","two");var root=KVObject.Collection();root["m_animArray"]=Array(basic,one,pair);
   HeroActivityRules.Bake(root,"m_animArray",new[]{new HeroActivityRules.Rule("ALL","one"),new HeroActivityRules.Rule("ALL","two")},new HashSet<string>{"one","two"});
   Check(!Names(basic).Contains("ACT_DOTA_IDLE"));Check(Names(one).Contains("one"));Check(Names(pair).SequenceEqual(new[]{"ACT_DOTA_IDLE"}));
  }
  // Source sequence restriction activates only the injured variant.
  {
   KVObject normal=Sequence("normal","ACT_DOTA_CAST_ABILITY_1","actual"),injured=Sequence("injured","ACT_DOTA_CAST_ABILITY_1","actual","injured");var root=KVObject.Collection();root["m_localS1SeqDescArray"]=Array(normal,injured);
   var report=HeroActivityRules.Bake(root,"m_localS1SeqDescArray",new[]{new HeroActivityRules.Rule("ACT_DOTA_CAST_ABILITY_1","actual",Sequence:"injured")},new HashSet<string>{"actual"});
   Check(report.Count==1);Check(Names(normal).Contains("actual"));Check(!Names(injured).Contains("actual"));Check(Names(injured).Contains("injured"));
  }
  var skeleton=KVObject.Collection();skeleton["m_boneName"]=Array(new KVObject("root"));skeleton["m_nParent"]=Array(new KVObject(-1));foreach(var key in new[]{"m_bonePosParent","m_boneRotParent","m_boneScaleParent"})skeleton[key]=Array(new KVObject(1d));HeroActivities.ValidateSkeleton(skeleton,skeleton);
  var mismatched=KVObject.Collection();mismatched["m_boneName"]=Array(new KVObject("wrong"));mismatched["m_nParent"]=Array(new KVObject(-1));var rejected=false;try{HeroActivities.ValidateSkeleton(skeleton,mismatched);}catch(InvalidDataException){rejected=true;}Check(rejected);
  // Optional integration against the user's original compiled Anti-Mage model.
  if(args.Length==2)foreach(var modifiers in new[]{new[]{"basher"},new[]{"offhand_basher"},new[]{"basher","offhand_basher"}}){var temp=Path.GetTempFileName();var output=temp+".vmdl_c";try{
   File.WriteAllText(temp,System.Text.Json.JsonSerializer.Serialize(new{input=Path.GetFullPath(args[0]),output,modifiers,animationTemplate=Path.GetFullPath(args[1])}));HeroActivities.Run(temp);
  }finally{File.Delete(temp);File.Delete(output);}}
  // Optional original Dazzle fixture; no Valve assets are committed.
  if(args.Length==1){var manifest=Path.GetTempFileName();var output=manifest+".vmdl_c";try{
   File.WriteAllText(manifest,System.Text.Json.JsonSerializer.Serialize(new{input=Path.GetFullPath(args[0]),output,modifiers=new[]{"darkclaw"}}));HeroActivities.Run(manifest);
   File.WriteAllText(manifest,System.Text.Json.JsonSerializer.Serialize(new{input=Path.GetFullPath(args[0]),output,model="models/heroes/dazzle/dazzle.vmdl_c",rules=new[]{new{asset="ALL",modifier="darkclaw"}},knownModifiers=new[]{"darkclaw"}}));HeroActivityRules.Run(manifest);
   File.Delete(output+".activities.json");
  }finally{File.Delete(manifest);File.Delete(output);}}
  Console.WriteLine("[OK] Hero activity selection and compiled payload preservation");return 0;
 }
}
