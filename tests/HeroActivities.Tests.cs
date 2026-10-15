using ValveKeyValue;
internal static class HeroActivitiesTests
{
 static KVObject Array(params KVObject[] values){var result=KVObject.Array();foreach(var value in values)result.Add(value);return result;}
 static KVObject Sequence(string name,params string[] activities){var row=KVObject.Collection();row["m_sName"]=new KVObject(name);row["m_fetch"]=new KVObject(123);row["m_activityArray"]=Array(activities.Select(a=>{var v=KVObject.Collection();v["m_name"]=new KVObject(a);return v;}).ToArray());return row;}
 static string[] Names(KVObject row)=>row["m_activityArray"].Values.Select(v=>v["m_name"].ToString(null)).ToArray();
 static void Check(bool condition){if(!condition)throw new Exception("Hero activity regression");}
 public static int Main(string[] args)
 {
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
  // Optional integration against the user's original compiled Anti-Mage model.
  if(args.Length==1)foreach(var modifiers in new[]{new[]{"basher"},new[]{"offhand_basher"},new[]{"basher","offhand_basher"}}){var temp=Path.GetTempFileName();var output=temp+".vmdl_c";try{
   File.WriteAllText(temp,System.Text.Json.JsonSerializer.Serialize(new{input=Path.GetFullPath(args[0]),output,modifiers}));HeroActivities.Run(temp);
  }finally{File.Delete(temp);File.Delete(output);}}
  Console.WriteLine("[OK] Hero activity selection and compiled payload preservation");return 0;
 }
}
