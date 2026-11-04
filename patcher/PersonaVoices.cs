using System.Globalization;
using System.Text.Json;
using System.Text.RegularExpressions;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

internal static class PersonaVoices
{
    internal sealed record Profile(string BasePrefix,string PersonaPrefix);
    private sealed record Voice(string Input,string Output,string Hero,Profile[] Profiles,Dictionary<string,string> Events,string? Style=null,bool Owned=false);
    private sealed record Pick(string Input,string Output);
    private sealed record Request(Voice[] Voices,Pick? Pick);
    private static string Group(string suffix)=>Regex.Replace(suffix,@"\d+$","").Replace("_","",StringComparison.Ordinal);
    internal static Dictionary<string,KVObject> Map(KVObject root,Profile[] profiles,Dictionary<string,string> exact,bool allowEmpty=false)
    {
        var result=new Dictionary<string,KVObject>(StringComparer.Ordinal);
        foreach(var profile in profiles)
        {
            var sources=root.Where(p=>p.Key.StartsWith(profile.PersonaPrefix,StringComparison.Ordinal)&&p.Value.IsCollection).ToDictionary(p=>p.Key,p=>p.Value);
            if(sources.Count==0)throw new InvalidDataException("No persona voice events for "+profile.PersonaPrefix);
            var groups=sources.GroupBy(p=>Group(p.Key[profile.PersonaPrefix.Length..])).ToDictionary(g=>g.Key,g=>g.OrderBy(p=>p.Key,StringComparer.Ordinal).ToArray());
            foreach(var (name,value) in root.ToArray())
            {
                if(!value.IsCollection||!name.StartsWith(profile.BasePrefix,StringComparison.Ordinal)||name.StartsWith(profile.PersonaPrefix,StringComparison.Ordinal))continue;
                var suffix=name[profile.BasePrefix.Length..];
                KVObject? source=null;
                if(exact.TryGetValue(name,out var eventName))sources.TryGetValue(eventName,out source);
                if(source is null)sources.TryGetValue(profile.PersonaPrefix+suffix,out source);
                // Preserve the semantic category when one voice has fewer lines.
                // Never replace an unmatched special response with a random phrase.
                if(source is null&&groups.TryGetValue(Group(suffix),out var candidates))
                {
                    var digits=Regex.Match(suffix,@"\d+$").Value;
                    var index=int.TryParse(digits,out var number)?Math.Max(0,number-1):0;
                    source=candidates[index%candidates.Length].Value;
                }
                if(source is not null)result[name]=source;
            }
        }
        if(result.Count==0&&!allowEmpty)throw new InvalidDataException("No base voice events could be replaced");
        return result;
    }
    internal static Dictionary<string,KVObject> MapGoodOldDays(KVObject root,bool owned)
    {
        const string kid="invoker_kidvoker_", adult="invoker_invo_";
        var happyPrefix=new Regex(@"^invoker_(?:kidvoker_?happy|happy_?kidvoker)_",RegexOptions.IgnoreCase);
        var sources=root.Where(p=>p.Value.IsCollection&&happyPrefix.IsMatch(p.Key)).ToArray();
        var targets=root.Where(p=>p.Value.IsCollection&&!happyPrefix.IsMatch(p.Key)&&
            (p.Key.StartsWith(kid,StringComparison.Ordinal)||(!owned&&p.Key.StartsWith(adult,StringComparison.Ordinal)))).ToArray();
        string Line(string name)
        {
            name=name.Replace('\\','/').Split('/')[^1];
            name=Regex.Replace(name,@"\.vsnd(?:_c)?$","",RegexOptions.IgnoreCase);
            name=Regex.Replace(name,@"^(?:(?:invoker|kidvoker|invo|happy)[_-]*)+","",RegexOptions.IgnoreCase);
            return name.Replace("_","",StringComparison.Ordinal).ToLowerInvariant();
        }
        IEnumerable<string> Clips(KVObject value)
        {
            if(value.IsCollection||value.IsArray)
            {
                foreach(var child in value.Values)
                    foreach(var clip in Clips(child))yield return clip;
            }
            else
            {
                var name=value.ToString(null);
                if(name.EndsWith(".vsnd",StringComparison.OrdinalIgnoreCase)||name.EndsWith(".vsnd_c",StringComparison.OrdinalIgnoreCase))
                    yield return Line(name);
            }
        }
        IEnumerable<string> Keys(string name,KVObject value)
        {
            yield return Line(name);
            if(value.TryGetValue("vsnd_files",out var files))
                foreach(var clip in Clips(files))yield return clip;
        }
        var byLine=sources.SelectMany(p=>Keys(p.Key,p.Value).Distinct().Where(k=>k.Length>0).Select(k=>(Key:k,p.Value)))
            .ToLookup(p=>p.Key,p=>p.Value,StringComparer.Ordinal);
        var result=new Dictionary<string,KVObject>(StringComparer.Ordinal);
        foreach(var (name,value) in targets)
        {
            foreach(var key in Keys(name,value))
            {
                var matches=byLine[key].Distinct().Take(2).ToArray();
                if(matches.Length!=1)continue;
                result[name]=matches[0];
                break;
            }
        }
        if(result.Count==0)
            throw new InvalidDataException($"The Good Old Days: no matching lines (alternate={sources.Length}, targets={targets.Length}); alternate examples: {string.Join(", ",sources.Take(5).Select(p=>p.Key))}; target examples: {string.Join(", ",targets.Take(5).Select(p=>p.Key))}");
        return result;
    }
    internal static void Write(Resource resource,string input,string output)
    {
        if(resource.DataBlock is not BinaryKV3 binary)throw new InvalidDataException("Voice events are not binary KV3");
        var bytes=File.ReadAllBytes(input);var version=bytes[checked((int)binary.Offset)];
        var data=HeroActivityRules.SerializeActivity(binary,version);
        using(var stream=File.Create(output))Program.SerializePatchedResource(resource,bytes,stream,false,preserveMetadata:true,rawBlocks:new(){{binary,data}});
        using var check=new Resource{FileName=output};check.Read(output);
        if(check.DataBlock is not BinaryKV3 written||written.Data.Root.Count!=binary.Data.Root.Count)throw new InvalidDataException("Voice output verification failed");
    }
    internal static int ApplyPick(KVObject root,Dictionary<string,KVObject> aliases)
    {
        var count=0;
        foreach(var (name,value) in aliases)if(root.TryGetValue(name,out var original)&&original.IsCollection)
        {
            // Preserve 2D routing, volume and all other heroes.
            foreach(var key in original.Keys.Where(k=>k.StartsWith("vsnd_",StringComparison.Ordinal)).ToArray())original.Remove(key);
            foreach(var (key,field) in value)if(key.StartsWith("vsnd_",StringComparison.Ordinal))original[key]=field;
            count++;
        }
        return count;
    }
    public static void Run(string manifest)
    {
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty persona voice request");
        var aliases=new Dictionary<string,KVObject>(StringComparer.Ordinal);var reports=new List<object>();
        foreach(var voice in request.Voices)
        {
            using var resource=new Resource{FileName=voice.Input};resource.Read(voice.Input);
            if(resource.DataBlock is not BinaryKV3 binary)throw new InvalidDataException("Unsupported voice resource: "+voice.Hero);
            var root=binary.Data.Root;
            var mapped=voice.Owned||voice.Style=="good-old-days"?new Dictionary<string,KVObject>(StringComparer.Ordinal):Map(root,voice.Profiles,voice.Events);
            if(voice.Style=="good-old-days")
            {
                var happy=MapGoodOldDays(root,voice.Owned);
                if(!voice.Owned)
                {
                    foreach(var (name,value) in happy.Where(p=>p.Key.StartsWith("invoker_kidvoker_",StringComparison.Ordinal)))
                        root[name]=value;
                    mapped=Map(root,voice.Profiles,voice.Events,allowEmpty:true);
                    var alternateClips=happy.Values.ToHashSet();
                    if(!happy.Keys.Any(name=>name.StartsWith("invoker_invo_",StringComparison.Ordinal))&&
                       !mapped.Values.Any(alternateClips.Contains))
                        throw new InvalidDataException("The Good Old Days: matched kid lines, but none could be assigned to adult Invoker events");
                }
                foreach(var (name,value) in happy)mapped[name]=value;
            }
            foreach(var (name,value) in mapped){binary.Data.Root[name]=value;if(!aliases.TryAdd(name,value))throw new InvalidDataException("Conflicting persona voice event: "+name);}
            Write(resource,voice.Input,voice.Output);reports.Add(new {hero=voice.Hero,replacedEvents=mapped.Count});
        }
        var pickCount=0;
        if(request.Pick is not null)
        {
            using var resource=new Resource{FileName=request.Pick.Input};resource.Read(request.Pick.Input);
            if(resource.DataBlock is not BinaryKV3 binary)throw new InvalidDataException("Unsupported hero pick voice resource");
            pickCount=ApplyPick(binary.Data.Root,aliases);
            Write(resource,request.Pick.Input,request.Pick.Output);
        }
        Console.WriteLine(JsonSerializer.Serialize(new {voices=reports,heroPickEvents=pickCount}));
    }
}
