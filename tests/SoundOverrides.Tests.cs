using ValveKeyValue;
internal static class SoundOverrideTests
{
 static void Check(bool condition,string message){if(!condition)throw new Exception(message);}
 internal static void Run()
 {
  static KVObject Sound(string name){var root=KVObject.Collection();root["vsnd_files"]=new KVObject(name);return root;}
  KVObject old=Sound("old"),gold=Sound("gold"),red=Sound("red"),root=KVObject.Collection();root["Attack"]=old;root["Attack.Gold"]=gold;root["Attack.Red"]=red;root["Unrelated"]=Sound("keep");
  var sources=root.ToDictionary(p=>p.Key,p=>p.Value);
  var count=SoundOverrides.ApplyEvents(root,sources,[new("Attack","Attack.Gold"),new("Attack.Gold","Attack.Red")]);
  Check(count==2,"Sound alias count");Check(root["Attack"]["vsnd_files"].ToString(null)=="gold","Source chain was modified");Check(root["Attack.Gold"]["vsnd_files"].ToString(null)=="red","Second alias missing");Check(root["Unrelated"]["vsnd_files"].ToString(null)=="keep","Unselected sound changed");
  try{SoundOverrides.ApplyEvents(root,sources,[new("Attack","Missing")]);throw new Exception("Missing sound accepted");}catch(InvalidDataException){}
  var parent=Sound("parent");parent["start_event"]=new KVObject("Child");var child=Sound("child");child["stop_event"]=new KVObject("Child");sources["Child"]=child;
  SoundOverrides.IncludeChildren(root,parent,sources);Check(root["Child"]["vsnd_files"].ToString(null)=="child","Child sound event missing");
  Console.WriteLine("[OK] Item sound aliases, source snapshots and unrelated events");
 }
}
