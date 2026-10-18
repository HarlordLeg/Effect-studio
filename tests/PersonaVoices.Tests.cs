using System.Text;
using ValveKeyValue;
internal static class PersonaVoiceTests
{
 static KVObject Parse(string text){using var stream=new MemoryStream(Encoding.UTF8.GetBytes("<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:generic:version{7412167c-06e9-4698-aff2-e63eb59037e7} -->\n"+text));return KVSerializer.Create(KVSerializationFormat.KeyValues3Text).Deserialize(stream).Root;}
 static void Check(bool condition,string message){if(!condition)throw new Exception(message);}
 public static int Main()
 {
  SoundOverrideTests.Run();
  var root=Parse("{ hero_old_move_01 = { vsnd_files = \"old\" } hero_old_move_03 = { vsnd_files = \"old3\" } hero_old_laugh_01 = { vsnd_files = \"laugh\" } hero_old_special_01 = { vsnd_files = \"unique\" } hero_old_new_move_01 = { vsnd_files = \"new1\" vsnd_duration = 2.0 } hero_old_new_move_02 = { vsnd_files = \"new2\" } hero_old_new_wheel_01 = { vsnd_files = \"wheel\" } other_move_01 = { vsnd_files = \"other\" } }");
  var profile=new[]{new PersonaVoices.Profile("hero_old_","hero_old_new_")};
  var mapped=PersonaVoices.Map(root,profile,new(){{"hero_old_laugh_01","hero_old_new_wheel_01"}});
  Check(mapped.Count==3,"Wrong event count");Check(mapped["hero_old_move_01"]["vsnd_files"].ToString(null)=="new1","Exact voice suffix failed");Check(mapped["hero_old_move_03"]["vsnd_files"].ToString(null)=="new1","Category rollover failed");Check(mapped["hero_old_laugh_01"]["vsnd_files"].ToString(null)=="wheel","Authored chatwheel override failed");Check(!mapped.ContainsKey("hero_old_special_01")&&!mapped.ContainsKey("other_move_01")&&!mapped.ContainsKey("hero_old_new_move_01"),"Unrelated event replaced");
  var pick=Parse("{ hero_old_move_01 = { type = \"dota_src1_2d\" volume = 0.5 vsnd_files = \"old\" vsnd_duration = 9.0 vsnd_old_field = true } other_move_01 = { vsnd_files = \"untouched\" } }");
  Check(PersonaVoices.ApplyPick(pick,mapped)==1,"Pick merge count");var selected=pick["hero_old_move_01"];Check(selected["type"].ToString(null)=="dota_src1_2d"&&selected["volume"].ToDouble(null)==0.5,"Pick routing changed");Check(selected["vsnd_files"].ToString(null)=="new1"&&!selected.ContainsKey("vsnd_old_field"),"Pick audio not replaced");Check(pick["other_move_01"]["vsnd_files"].ToString(null)=="untouched","Other hero changed");
  try{PersonaVoices.Map(root,[new("missing_","missing_persona_")],new());throw new Exception("Missing persona accepted");}catch(InvalidDataException){}
  Console.WriteLine("[OK] Persona event aliases, categories, authored overrides and isolated hero-pick merge");return 0;
 }
}
