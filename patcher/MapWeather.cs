using System.Globalization;
using System.Text.Json;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;
using ValveKeyValue;
internal static class MapWeather
{
 private sealed record Entry(string Input,string Output);
 private sealed record Request(string Particle,Entry[] Files,int? FallbackWeatherType=null);
 internal static KVObject Clone(KVObject value){
  if(value.IsArray){var result=KVObject.Array();foreach(var child in value.Values)result.Add(Clone(child));return result;}
  if(value.IsCollection){var result=KVObject.Collection();foreach(var pair in value)result[pair.Key]=Clone(pair.Value);return result;}
  return value;
 }
 static KVObject? LightValues(KVObject entity){if(!entity.TryGetValue("keyValues3Data",out var kv)||!kv.TryGetValue("values",out var values)||!values.TryGetValue("classname",out var kind)||kind.ToString(CultureInfo.InvariantCulture)!="ent_dota_lightinfo")return null;return values;}
 static int WeatherType(KVObject values)=>values.TryGetValue("weather_type",out var type)?type.ToInt32(CultureInfo.InvariantCulture):0;
 static BinaryKV3 Read(Resource resource,byte[] bytes,ValveResourceFormat.Block block){var binary=new BinaryKV3{Resource=resource,Offset=block.Offset,Size=block.Size};using var reader=new BinaryReader(new MemoryStream(bytes));binary.Read(reader);return binary;}
 internal static int PatchEntities(KVObject root,string particle,bool baseline,int? fallbackWeatherType,ref long nextId){int count=0;
   if(root.TryGetValue("m_entityKeyValues",out var entities))foreach(var entity in entities.Values.ToArray()){
    var v=LightValues(entity);if(v is null)continue;
    if(baseline&&WeatherType(v) is -1 or 0){v["weather_effect"]=new KVObject(particle);count++;}
    else if(!baseline&&fallbackWeatherType is {} fallback&&WeatherType(v)==fallback){
     var clone=Clone(entity);var values=LightValues(clone)!;values["weather_type"]=new KVObject(0);values["weather_effect"]=new KVObject(particle);
     values["targetname"]=new KVObject("harlord_weather_"+nextId);values["hammerUniqueId"]=new KVObject((nextId++).ToString(CultureInfo.InvariantCulture));values.Remove("compile_source_id");
     // New default zones inherit the terrain's own snow lighting and bounds.
     entities.Add(clone);count++;
    }
   }
  return count;
 }
 public static void Run(string manifest){
  var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty weather request");
  var allowed=new[]{"econ_snow","econ_rain","econ_moonlight","econ_weather_pestilence","econ_weather_sirocco","econ_weather_harvest","econ_weather_ash","econ_weather_aurora","econ_weather_spring"}.Select(n=>"particles/rain_fx/"+n+".vpcf").ToHashSet();
  if(!allowed.Contains(request.Particle))throw new InvalidDataException("Unknown weather particle");int total=0;
  // Some terrains use All Always On (-1). Winter has only authored snow zones;
  // its explicit profile clones those zones rather than stealing another weather.
  bool baseline=false;long nextId=1;
  foreach(var file in request.Files){var bytes=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);var block=resource.Blocks.Single(b=>b.Type.ToString()=="DATA");var root=Read(resource,bytes,block).Data.Root;if(!root.TryGetValue("m_entityKeyValues",out var entries))continue;foreach(var entity in entries.Values){var light=LightValues(entity);if(light is not null&&WeatherType(light) is -1 or 0)baseline=true;if(entity.TryGetValue("keyValues3Data",out var kv)&&kv.TryGetValue("values",out var v)&&v.TryGetValue("hammerUniqueId",out var id)&&long.TryParse(id.ToString(CultureInfo.InvariantCulture),out var parsed))nextId=Math.Max(nextId,parsed+1);}}

  foreach(var file in request.Files){
   var original=File.ReadAllBytes(file.Input);using var r=new Resource{FileName=file.Input};r.Read(file.Input);var block=r.Blocks.Single(b=>b.Type.ToString()=="DATA");
   var binary=Read(r,original,block);var root=binary.Data.Root;int count=0;
   count=PatchEntities(root,request.Particle,baseline,request.FallbackWeatherType,ref nextId);
   if(count==0){File.WriteAllBytes(file.Output,original);continue;}
   var payload=HeroActivityRules.SerializeActivity(binary,original[(int)block.Offset]);
   using(var stream=File.Create(file.Output)){stream.Write(original);using var writer=new BinaryWriter(stream,System.Text.Encoding.UTF8,true);writer.Write(new byte[(16-stream.Position%16)%16]);var start=stream.Position;writer.Write(payload);var end=stream.Position;var field=8L+BitConverter.ToUInt32(original,8)+r.Blocks.IndexOf(block)*12L+4;stream.Position=field;writer.Write(checked((uint)(start-field)));writer.Write(checked((uint)payload.Length));stream.Position=0;writer.Write(checked((uint)end));}
   using var check=new Resource{FileName=file.Output};check.Read(file.Output);var changed=File.ReadAllBytes(file.Output);for(int i=0;i<r.Blocks.Count;i++)if(r.Blocks[i]!=block){var a=r.Blocks[i];var b=check.Blocks[i];if(!original.AsSpan((int)a.Offset,(int)a.Size).SequenceEqual(changed.AsSpan((int)b.Offset,(int)b.Size)))throw new InvalidDataException("Unrelated map block changed");}total+=count;
  }
  if(total==0)throw new InvalidDataException("В карте не найдены стандартные зоны погоды. Этот ландшафт пока не поддерживается.");Console.WriteLine("[OK] Weather zones: "+total);
 }
}
