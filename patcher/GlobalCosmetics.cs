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
    private sealed record ParticleFile(string Input,string Output,string? Original=null,string? Effect=null,int ControlPoint=1,string[]? AppendChildren=null,JsonElement? Binding=null,bool RespectEntity=false);
    private sealed record SoundFile(string Input,string Source,string Output,string Kind);
    private sealed record Request(ModelFile[]? Models=null,ParticleFile[]? Particles=null,SoundFile[]? Sounds=null);
    private static string Semantic(string name){
        var text=Path.GetFileName(name.Replace('\\','/')).Replace(".vsnd_c","").Replace(".vsnd","");
        // Workshop Pirate uses announcer_capn_<event>, unlike <hero>_ann_<event>.
        var pirate=text.IndexOf("announcer_capn_",StringComparison.OrdinalIgnoreCase);
        if(pirate>=0)text=text[(pirate+"announcer_capn_".Length)..];
        else {foreach(var prefix in new[]{"announcer_killing_spree_announcer_","announcer_announcer_"})if(text.StartsWith(prefix,StringComparison.OrdinalIgnoreCase)){text=text[prefix.Length..];break;}
        var match=Regex.Match(text,@"^.*?_(?:ann|announcer)_(.+)$",RegexOptions.IgnoreCase);text=match.Success?match.Groups[1].Value:Regex.Replace(text,@"^announcer_","",RegexOptions.IgnoreCase);}
        text=Regex.Replace(text,@"^ann_[^_]+_","",RegexOptions.IgnoreCase);
        return Regex.Replace(text,@"_?0*(\d+)$",m=>"_"+int.Parse(m.Groups[1].Value,CultureInfo.InvariantCulture));
    }
    internal static void AppendChildren(KVObject data,IEnumerable<string> names){
        var children=data.TryGetValue("m_Children",out var existing)?existing:KVObject.Array();
        foreach(var name in names)if(!children.Values.Any(v=>v.TryGetValue("m_ChildRef",out var value)&&value.ToString(null)==name)){var row=KVObject.Collection();row["m_ChildRef"]=new KVObject(name){Flag=KVFlag.Resource};children.Add(row);}data["m_Children"]=children;
    }
    internal static void BindCourier(KVObject data,JsonElement binding,bool respectEntity=false){
        static string Attach(string value)=>value switch {"point_follow"=>"PATTACH_POINT_FOLLOW","point"=>"PATTACH_POINT","rootbone_follow"=>"PATTACH_ROOTBONE_FOLLOW","customorigin"=>"PATTACH_ABSORIGIN_FOLLOW","absorigin"=>"PATTACH_ABSORIGIN","renderorigin_follow"=>"PATTACH_RENDERORIGIN_FOLLOW",_=>"PATTACH_ABSORIGIN_FOLLOW"};
        static string Text(JsonElement e,string key,string fallback="")=>e.TryGetProperty(key,out var v)?v.ToString():fallback;
        if(!binding.TryGetProperty("attach_type",out _)&&!binding.TryGetProperty("control_points",out _)&&data.TryGetValue("m_controlPointConfigurations",out var authored)&&authored.Values.Any()){
            foreach(var configuration in authored.Values)if(configuration.TryGetValue("m_drivers",out var nativeDrivers))foreach(var driver in nativeDrivers.Values)if(!respectEntity&&driver.TryGetValue("m_entityName",out var entity)&&entity.ToString(null)=="parent")driver["m_entityName"]=new KVObject("self");
            if(!authored.Values.Any(v=>v.TryGetValue("m_name",out var n)&&n.ToString(null)=="preview")){var previewConfig=KVObject.Collection();previewConfig["m_name"]=new KVObject("preview");if(authored.Values.First().TryGetValue("m_drivers",out var sourceDrivers))previewConfig["m_drivers"]=sourceDrivers;authored.Add(previewConfig);}return;
        }
        var drivers=KVObject.Array();
        void Driver(int index,JsonElement row){var driver=KVObject.Collection();driver["m_iControlPoint"]=new KVObject(index);driver["m_iAttachType"]=new KVObject(Attach(Text(row,"attach_type","absorigin_follow")));driver["m_entityName"]=new KVObject(respectEntity?Text(row,"attach_entity",Text(binding,"attach_entity","self")):"self");var attachment=Text(row,"attachment");if(attachment.Length>0)driver["m_attachmentName"]=new KVObject(attachment);drivers.Add(driver);}
        var points=binding.TryGetProperty("control_points",out var cp)?cp:default;
        if(points.ValueKind!=JsonValueKind.Object||!points.EnumerateObject().Any(p=>Text(p.Value,"control_point_index",p.Name)=="0"))Driver(0,binding);
        if(points.ValueKind==JsonValueKind.Object)foreach(var point in points.EnumerateObject())Driver(int.Parse(Text(point.Value,"control_point_index",point.Name),CultureInfo.InvariantCulture),point.Value);
        var configs=data.TryGetValue("m_controlPointConfigurations",out var current)?current:KVObject.Array();
        var preview=configs.Values.FirstOrDefault(v=>v.TryGetValue("m_name",out var name)&&name.ToString(null)=="preview");if(preview is null){preview=KVObject.Collection();preview["m_name"]=new KVObject("preview");configs.Add(preview);}preview["m_drivers"]=drivers;data["m_controlPointConfigurations"]=configs;
    }
    private static IEnumerable<string> SoundNames(KVObject value){if(value.IsCollection){foreach(var pair in value)foreach(var s in SoundNames(pair.Value))yield return s;}else if(value.IsArray){foreach(var child in value.Values)foreach(var s in SoundNames(child))yield return s;}else if(value.ValueType==KVValueType.String){var s=value.ToString(CultureInfo.InvariantCulture);if(s.EndsWith(".vsnd")||s.EndsWith(".vsnd_c"))yield return s;}}
    internal static int MapSounds(KVObject target,KVObject source){
        var exact=new Dictionary<string,List<KVObject>>(StringComparer.OrdinalIgnoreCase);
        var groups=new Dictionary<string,List<KVObject>>(StringComparer.OrdinalIgnoreCase);
        static string Alias(string name)=>Regex.Replace(name,@"^kill_(1stblood|ownage)(?=_|$)","$1",RegexOptions.IgnoreCase);
        static string Group(string name)=>Regex.Replace(name,@"_\d+$","");
        static void Add(Dictionary<string,List<KVObject>> index,string name,KVObject value){if(!index.TryGetValue(name,out var list))index[name]=list=new();if(!list.Contains(value))list.Add(value);}
        foreach(var (key,value) in source){if(!value.IsCollection)continue;foreach(var name in SoundNames(value).Select(Semantic).Append(Semantic(key)).Select(Alias).Distinct()){Add(exact,name,value);Add(groups,Group(name),value);}}
        var count=0;foreach(var key in target.Keys.ToArray()){
            if(!target[key].IsCollection)continue;
            var names=SoundNames(target[key]).Select(Semantic).Prepend(Semantic(key)).Select(Alias).Distinct().ToArray();
            var match=names.Select(n=>exact.GetValueOrDefault(n)).FirstOrDefault(v=>v is {Count:>0});
            // The default bank often has an unnumbered event, while DLC lines
            // append _01/_02. Match the complete event first so countdown 10
            // can never be confused with countdown 5 or another lane/team.
            match??=names.Select(n=>groups.GetValueOrDefault(n)).FirstOrDefault(v=>v is {Count:>0});
            match??=names.Select(n=>groups.GetValueOrDefault(Group(n))).FirstOrDefault(v=>v is {Count:>0});
            // GLaDOS calls her introductory lines 'prelim', not 'welcome'.
            if(match is null&&names.Any(n=>Group(n)=="welcome"))match=groups.GetValueOrDefault("prelim");
            if(match is null)continue;
            var number=Regex.Match(names.First(),@"_(\d+)$");var index=number.Success?Math.Max(0,int.Parse(number.Groups[1].Value,CultureInfo.InvariantCulture)-1):0;
            var fields=match[index%match.Count].Where(p=>p.Key.StartsWith("vsnd_",StringComparison.Ordinal)).ToArray();if(fields.Length==0)continue;
            foreach(var old in target[key].Keys.Where(k=>k.StartsWith("vsnd_",StringComparison.Ordinal)).ToArray())target[key].Remove(old);
            foreach(var field in fields)target[key][field.Key]=field.Value;count++;
        }return count;
    }
    internal static int CosmeticSkin(KVObject groups,int skin){
        if(skin<=0)return skin;var values=groups.Values.ToArray();
        for(var i=0;i<values.Length;i++)if(values[i].TryGetValue("m_name",out var name)&&name.ToString(null)==skin.ToString(CultureInfo.InvariantCulture))return i;
        if(skin<values.Length)return skin;
        // A standalone courier model can have its requested material baked into its only group.
        if(values.Length==1)return 0;
        throw new InvalidDataException("Courier material group missing: "+skin+"; available: "+values.Length);
    }
    private static void Reference(Resource resource,string name){if(resource.ExternalReferences is not {} refs)return;if(!refs.ResourceRefInfoList.Any(r=>r.Name==name))refs.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Name=name,Id=Program.ComputeResourceId(name)});}
    public static void Run(string manifest){
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty cosmetics request");
        var matched=0;var unmatched=new List<string>();var warnings=new List<string>();
        foreach(var model in request.Models??[]){var args=new List<string>{"--input",model.Input,"--output",model.Output,"--no-backup"};if(model.Particles.Length==0)args.Add("--model-only");foreach(var particle in model.Particles){args.Add("--particle");args.Add(particle);}if(model.Skin>0){using var input=new Resource{FileName=model.Input};input.Read(model.Input);if(input.DataBlock is not Model donor)throw new InvalidDataException("Expected cosmetic model");if(!donor.Data.TryGetValue("m_materialGroups",out var groups))throw new InvalidDataException("Cosmetic model has no material groups");var skin=CosmeticSkin(groups,model.Skin);if(skin==0&&groups.Count==1)warnings.Add("У модели один вариант материала: использован встроенный материал вместо skin "+model.Skin);if(skin>0){args.Add("--skin");args.Add(skin.ToString(CultureInfo.InvariantCulture));}}if(model.Replacements is not null){args.Add("--particle-replacements");args.Add(model.Replacements);}if(Program.Main(args.ToArray())!=0)throw new InvalidDataException("Cosmetic model patch failed: "+model.Input);}
        foreach(var file in request.Particles??[]){
            var bytes=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);if(resource.DataBlock is not ParticleSystem particle)throw new InvalidDataException("Not a particle: "+file.Input);
            if(file.Original is not null&&file.Effect is not null){
                foreach(var key in particle.Data.Keys.ToArray())particle.Data.Remove(key);resource.ExternalReferences?.ResourceRefInfoList.Clear();
                particle.Data["_class"]=new KVObject("CParticleSystemDefinition");particle.Data["m_nBehaviorVersion"]=new KVObject(12);var config=KVObject.Collection();config["m_name"]=new KVObject("preview");var configs=KVObject.Array();configs.Add(config);particle.Data["m_controlPointConfigurations"]=configs;
                var children=KVObject.Array();foreach(var name in new[]{file.Effect,file.Original}){var row=KVObject.Collection();row["m_ChildRef"]=new KVObject(name){Flag=KVFlag.Resource};children.Add(row);Reference(resource,name);}particle.Data["m_Children"]=children;
            }else if(particle.Data.TryGetValue("m_ForceGenerators",out var forces))foreach(var force in forces.Values){if(force.TryGetValue("_class",out var kind)&&kind.ToString(null)=="C_OP_AttractToControlPoint")force["m_nControlPointNumber"]=new KVObject(file.ControlPoint);}
            if(file.AppendChildren is not null){AppendChildren(particle.Data,file.AppendChildren);foreach(var name in file.AppendChildren)Reference(resource,name);}
            if(file.Binding is {} binding)BindCourier(particle.Data,binding,file.RespectEntity);
            var changed=new HashSet<object>();if((file.AppendChildren is not null||file.Original is not null)&&resource.ExternalReferences is not null)changed.Add(resource.ExternalReferences);if(file.Original is not null&&resource.ExternalReferences is not null)changed.Add(resource.ExternalReferences);using var output=File.Create(file.Output);Program.SerializePatchedResource(resource,bytes,output,true,changed,preserveMetadata:true);
        }
        foreach(var file in request.Sounds??[]){
            using var target=new Resource{FileName=file.Input};target.Read(file.Input);using var source=new Resource{FileName=file.Source};source.Read(file.Source);
            if(target.DataBlock is not BinaryKV3 targetBank||source.DataBlock is not BinaryKV3 sourceBank)throw new InvalidDataException("Unsupported announcer bank");
            var count=MapSounds(targetBank.Data.Root,sourceBank.Data.Root);if(count==0)throw new InvalidDataException("No matching announcer events; refusing an unchanged voice pack");matched+=count;
            var selectedSounds=sourceBank.Data.Root.Values.SelectMany(SoundNames).ToHashSet(StringComparer.OrdinalIgnoreCase);
            var remaining=targetBank.Data.Root.Where(p=>SoundNames(p.Value).Any(n=>!selectedSounds.Contains(n))).Select(p=>p.Key).ToArray();
            if(file.Kind=="mega_kills"&&remaining.Length>0)throw new InvalidDataException("Incomplete killing-spree replacement: "+string.Join(", ",remaining));
            unmatched.AddRange(remaining);
            foreach(var (key,value) in sourceBank.Data.Root)if(!targetBank.Data.Root.ContainsKey(key))targetBank.Data.Root[key]=value;
            PersonaVoices.Write(target,file.Input,file.Output);
        }
        Console.WriteLine(JsonSerializer.Serialize(new {matchedSoundEvents=matched,unmatchedSoundEvents=unmatched,warnings=warnings}));
    }
}
