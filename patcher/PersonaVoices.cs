using System.Globalization;
using System.Text.Json;
using System.Text.RegularExpressions;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

internal static class PersonaVoices
{
    internal sealed record Profile(string BasePrefix,string PersonaPrefix);
    private sealed record Voice(string Input,string Output,string Hero,Profile[] Profiles,Dictionary<string,string> Events);
    private sealed record Pick(string Input,string Output);
    private sealed record Request(Voice[] Voices,Pick? Pick);
    private static string Group(string suffix)=>Regex.Replace(suffix,@"\d+$","");
    internal static Dictionary<string,KVObject> Map(KVObject root,Profile[] profiles,Dictionary<string,string> exact)
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
        if(result.Count==0)throw new InvalidDataException("No base voice events could be replaced");
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
            var mapped=Map(binary.Data.Root,voice.Profiles,voice.Events);
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
