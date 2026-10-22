using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;
using System.Text.Json;
internal static class VariantTests
{
 static void Equal(int actual,int expected){if(actual!=expected)throw new Exception($"Expected {expected}, got {actual}");}
 static void Reject(Action action){try{action();}catch(InvalidDataException){return;}throw new Exception("Expected invalid material skin rejection");}
 public static int Main(string[] args){
  Equal(ModelVariant.ResolveSkin("models/test.vmdl",1,0),0);
  Equal(ModelVariant.ResolveSkin("models/test.vmdl",7,0),0);
  Equal(ModelVariant.ResolveSkin("models/test.vmdl",1,2),1);
  Equal(ModelVariant.ResolveSkin("models/items/nerubian_assassin/nyx_ti10_cavern_crawl_head/nyx_ti10_cavern_crawl_head.vmdl",2,3),2);
  Reject(()=>ModelVariant.ResolveSkin("models/test.vmdl",2,2));
  Reject(()=>ModelVariant.ResolveSkin("models/test.vmdl",1,1));
  Reject(()=>ModelVariant.ResolveSkin("models/test.vmdl",-1,0));
  foreach(var part in new[]{"back","head","misc","weapon"})Equal(ModelVariant.ResolveSkin($"models/items/nerubian_assassin/nyx_ti10_cavern_crawl_{part}/nyx_ti10_cavern_crawl_{part}.vmdl",2,2),0);
  foreach(var part in new[]{"arms","belt","head","shoulders","tail","weapon"})Equal(ModelVariant.ResolveSkin($"models/items/spirit_breaker/spirit_breaker_ti10_cavern_crawl_{part}/spirit_breaker_ti10_cavern_crawl_{part}.vmdl",2,2),0);
  Equal(ModelVariant.ResolveSkin("models/items/slark/cavern_crawl_2020_slark_arms/cavern_crawl_2020_slark_arms.vmdl",2,2),0);
  if(args.Length==2){var report=JsonDocument.Parse(File.ReadAllText(args[0]));int count=0;foreach(var item in report.RootElement.GetProperty("items").EnumerateArray()){
   var file=Path.Combine(args[1],Path.GetFileName(item.GetProperty("model").GetString()!));using var resource=new Resource{FileName=file};resource.Read(file);
   var changed=ModelVariant.Apply(resource,item.GetProperty("nativeOverrides").GetProperty("skin").GetInt32());Equal(changed.Count,0);
   var model=(Model)resource.DataBlock;if(model.Data.TryGetValue("m_materialGroups",out var groups)&&groups.Count==2){
    var expected=groups[1]["m_materials"].Values.Select(v=>v.ToString()).ToArray();
    var selected=ModelVariant.Apply(resource,1);if(selected.Count==0)throw new Exception("Existing skin 1 was not applied");
    if(!model.Data["m_materialGroups"][0]["m_materials"].Values.Select(v=>v.ToString()).SequenceEqual(expected))throw new Exception("Skin 1 material mapping mismatch");
   }count++;
  }Console.WriteLine($"Actual uploaded models: {count} skin requests accepted, no material blocks rewritten.");}
  Console.WriteLine("Material skin policy tests passed.");return 0;
 }
}
