using System.Globalization;
using System.Text.Json;
using System.Text.RegularExpressions;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;
internal static class GlobalCosmetics
{
    private sealed record ModelFile(string Input,string Output,string[] Particles,int Skin=0,string? Replacements=null);
    private sealed record ParticleFile(string Input,string Output,string? Original=null,string? Effect=null,int ControlPoint=1);
    private sealed record SoundFile(string Input,string Source,string Output,string Kind);
    private sealed record Request(ModelFile[]? Models=null,ParticleFile[]? Particles=null,SoundFile[]? Sounds=null);
    private static string Semantic(string name){var text=Path.GetFileName(name).Replace(".vsnd_c","").Replace(".vsnd","");foreach(var prefix in new[]{"announcer_killing_spree_announcer_","announcer_announcer_"})if(text.StartsWith(prefix,StringComparison.OrdinalIgnoreCase))return text[prefix.Length..];var match=Regex.Match(text,@"^.*?_(?:ann|announcer)_(.+)$",RegexOptions.IgnoreCase);return match.Success?match.Groups[1].Value:Regex.Replace(text,@"^announcer_","",RegexOptions.IgnoreCase);}
    private static IEnumerable<string> SoundNames(KVObject value){if(value.IsCollection){foreach(var pair in value)foreach(var s in SoundNames(pair.Value))yield return s;}else if(value.IsArray){foreach(var child in value.Values)foreach(var s in SoundNames(child))yield return s;}else if(value.ValueType==KVValueType.String){var s=value.ToString(CultureInfo.InvariantCulture);if(s.EndsWith(".vsnd")||s.EndsWith(".vsnd_c"))yield return s;}}
    internal static int MapSounds(KVObject target,KVObject source){
        var lookup=new Dictionary<string,List<KVObject>>(StringComparer.OrdinalIgnoreCase);
        foreach(var (key,value) in source){if(!value.IsCollection)continue;foreach(var name in SoundNames(value).Select(Semantic).Append(Semantic(key)).Distinct()){if(!lookup.TryGetValue(name,out var list))lookup[name]=list=new();list.Add(value);}}
        var count=0;foreach(var key in target.Keys.ToArray()){
            if(!target[key].IsCollection)continue;var names=SoundNames(target[key]).Select(Semantic).Prepend(Semantic(key)).Distinct();
            var match=names.Select(n=>lookup.GetValueOrDefault(n)).FirstOrDefault(v=>v is {Count:>0});
            if(match is null)continue;var fields=match[0].Where(p=>p.Key.StartsWith("vsnd_",StringComparison.Ordinal)).ToArray();if(fields.Length==0)continue;foreach(var old in target[key].Keys.Where(k=>k.StartsWith("vsnd_",StringComparison.Ordinal)).ToArray())target[key].Remove(old);foreach(var field in fields)target[key][field.Key]=field.Value;count++;
        }return count;
    }
    private static void Reference(Resource resource,string name){if(resource.ExternalReferences is not {} refs)return;if(!refs.ResourceRefInfoList.Any(r=>r.Name==name))refs.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Name=name,Id=Program.ComputeResourceId(name)});}
    public static void Run(string manifest){
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty cosmetics request");
        var matched=0;var unmatched=new List<string>();
        foreach(var model in request.Models??[]){var args=new List<string>{"--input",model.Input,"--output",model.Output,"--no-backup"};if(model.Particles.Length==0)args.Add("--model-only");foreach(var particle in model.Particles){args.Add("--particle");args.Add(particle);}if(model.Skin>0){args.Add("--skin");args.Add(model.Skin.ToString());}if(model.Replacements is not null){args.Add("--particle-replacements");args.Add(model.Replacements);}if(Program.Main(args.ToArray())!=0)throw new InvalidDataException("Cosmetic model patch failed: "+model.Input);}
        foreach(var file in request.Particles??[]){
            var bytes=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);if(resource.DataBlock is not ParticleSystem particle)throw new InvalidDataException("Not a particle: "+file.Input);
            if(file.Original is not null&&file.Effect is not null){
                foreach(var key in particle.Data.Keys.ToArray())particle.Data.Remove(key);resource.ExternalReferences?.ResourceRefInfoList.Clear();
                particle.Data["_class"]=new KVObject("CParticleSystemDefinition");particle.Data["m_nBehaviorVersion"]=new KVObject(12);var config=KVObject.Collection();config["m_name"]=new KVObject("preview");var configs=KVObject.Array();configs.Add(config);particle.Data["m_controlPointConfigurations"]=configs;
                var children=KVObject.Array();foreach(var name in new[]{file.Effect,file.Original}){var row=KVObject.Collection();row["m_ChildRef"]=new KVObject(name){Flag=KVFlag.Resource};children.Add(row);Reference(resource,name);}particle.Data["m_Children"]=children;
            }else if(particle.Data.TryGetValue("m_ForceGenerators",out var forces))foreach(var force in forces.Values){if(force.TryGetValue("_class",out var kind)&&kind.ToString(null)=="C_OP_AttractToControlPoint")force["m_nControlPointNumber"]=new KVObject(file.ControlPoint);}
            var changed=new HashSet<object>();if(file.Original is not null&&resource.ExternalReferences is not null)changed.Add(resource.ExternalReferences);using var output=File.Create(file.Output);Program.SerializePatchedResource(resource,bytes,output,true,changed,preserveMetadata:true);
        }
        foreach(var file in request.Sounds??[]){
            using var target=new Resource{FileName=file.Input};target.Read(file.Input);using var source=new Resource{FileName=file.Source};source.Read(file.Source);
            if(target.DataBlock is not BinaryKV3 targetBank||source.DataBlock is not BinaryKV3 sourceBank)throw new InvalidDataException("Unsupported announcer bank");
            var count=MapSounds(targetBank.Data.Root,sourceBank.Data.Root);if(count==0)throw new InvalidDataException("No matching announcer events; refusing an unchanged voice pack");matched+=count;
            foreach(var key in targetBank.Data.Root.Keys)if(!SoundNames(targetBank.Data.Root[key]).Any(n=>sourceBank.Data.Root.Values.Any(v=>SoundNames(v).Contains(n))))unmatched.Add(key);
            foreach(var (key,value) in sourceBank.Data.Root)if(!targetBank.Data.Root.ContainsKey(key))targetBank.Data.Root[key]=value;
            PersonaVoices.Write(target,file.Input,file.Output);
        }
        Console.WriteLine(JsonSerializer.Serialize(new {matchedSoundEvents=matched,unmatchedSoundEvents=unmatched}));
    }
}
