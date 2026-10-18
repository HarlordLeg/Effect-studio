using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

internal static class SoundOverrides
{
    private sealed record FileEntry(string Name,string Input,string? Output);
    private sealed record EventEntry(string Target,string Source);
    private sealed record Voice(string File,PersonaVoices.Profile[] Profiles,Dictionary<string,string> Events);
    private sealed record IndexRequest(FileEntry[] Files,string Output);
    private sealed record Request(FileEntry[] Files,EventEntry[] Events,Voice[] Voices);
    private static readonly JsonSerializerOptions Options=new(){PropertyNameCaseInsensitive=true};
    public static void Index(string manifest)
    {
        var request=JsonSerializer.Deserialize<IndexRequest>(File.ReadAllText(manifest),Options)??throw new InvalidDataException("Empty sound index request");
        var banks=new List<object>();
        foreach(var file in request.Files)
        {
            try{
                using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);
                if(resource.DataBlock is BinaryKV3 binary)banks.Add(new {name=file.Name,events=binary.Data.Root.Where(p=>p.Value.IsCollection).Select(p=>p.Key).ToArray()});
                else banks.Add(new {name=file.Name,events=Array.Empty<string>(),error="Unsupported sound bank format"});
            }catch(Exception error){banks.Add(new {name=file.Name,events=Array.Empty<string>(),error=error.Message});}
        }
        File.WriteAllText(request.Output,JsonSerializer.Serialize(banks));Console.WriteLine("[OK] Indexed sound banks: "+banks.Count);
    }
    internal static int ApplyEvents(KVObject root,Dictionary<string,KVObject> sources,EventEntryPublic[] events,bool pick=false)
    {
        var count=0;
        foreach(var entry in events)
        {
            if(!root.ContainsKey(entry.Target))continue;
            if(!sources.TryGetValue(entry.Source,out var source))throw new InvalidDataException("Missing source sound event: "+entry.Source);
            if(pick)PersonaVoices.ApplyPick(root,new(){{entry.Target,source}});else root[entry.Target]=source;
            count++;
        }
        return count;
    }
    internal sealed record EventEntryPublic(string Target,string Source);
    internal static void IncludeChildren(KVObject root,KVObject value,Dictionary<string,KVObject> sources,HashSet<string>? seen=null,string key="")
    {
        seen??=new();
        if(value.IsCollection){foreach(var (name,child) in value)IncludeChildren(root,child,sources,seen,name);return;}
        if(value.IsArray){foreach(var child in value.Values)IncludeChildren(root,child,sources,seen,key);return;}
        if(value.ValueType!=KVValueType.String||!(value.Flag==KVFlag.SoundEvent||key.Contains("event",StringComparison.OrdinalIgnoreCase)))return;
        var nameValue=value.ToString(null);if(!sources.TryGetValue(nameValue,out var dependency)||!seen.Add(nameValue))return;
        if(!root.ContainsKey(nameValue))root[nameValue]=dependency;
        IncludeChildren(root,root[nameValue],sources,seen);
    }
    public static void Run(string manifest)
    {
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),Options)??throw new InvalidDataException("Empty sound override request");
        var resources=new Dictionary<string,Resource>();
        try
        {
            foreach(var file in request.Files){var resource=new Resource{FileName=file.Input};resources.Add(file.Name,resource);resource.Read(file.Input);if(resource.DataBlock is not BinaryKV3)throw new InvalidDataException("Unsupported sound bank: "+file.Name);}
            KVObject Root(string name)=>((BinaryKV3)resources[name].DataBlock!).Data.Root;
            // Snapshot sources before applying overrides: A -> B and B -> C
            // must not accidentally turn both targets into C.
            var sources=new Dictionary<string,KVObject>(StringComparer.Ordinal);
            foreach(var file in request.Files.OrderBy(f=>f.Name.Contains("hero_pick")?1:0))foreach(var (key,value) in Root(file.Name))if(value.IsCollection)sources.TryAdd(key,value);
            foreach(var entry in request.Events)if(!sources.ContainsKey(entry.Source)||!sources.ContainsKey(entry.Target))throw new InvalidDataException("Sound event not found: "+entry.Target+" -> "+entry.Source);
            var changed=new HashSet<string>();var aliases=new Dictionary<string,KVObject>(StringComparer.Ordinal);var voiceCount=0;
            foreach(var voice in request.Voices)
            {
                var root=Root(voice.File);var mapped=PersonaVoices.Map(root,voice.Profiles,voice.Events);
                foreach(var (key,value) in mapped){root[key]=value;aliases[key]=value;}
                voiceCount+=mapped.Count;changed.Add(voice.File);
            }
            var eventCount=0;var events=request.Events.Select(e=>new EventEntryPublic(e.Target,e.Source)).ToArray();
            foreach(var file in request.Files)
            {
                var root=Root(file.Name);var pick=file.Name=="soundevents/game_sounds_hero_pick.vsndevts_c";
                if(pick&&PersonaVoices.ApplyPick(root,aliases)>0)changed.Add(file.Name);
                var count=ApplyEvents(root,sources,events,pick);if(count>0){eventCount+=count;changed.Add(file.Name);}
                if(changed.Contains(file.Name))foreach(var key in events.Select(e=>e.Target).Concat(aliases.Keys).Where(root.ContainsKey).Distinct().ToArray())IncludeChildren(root,root[key],sources);
            }
            foreach(var file in request.Files.Where(f=>changed.Contains(f.Name)))PersonaVoices.Write(resources[file.Name],file.Input,file.Output??throw new InvalidDataException("No sound output"));
            Console.WriteLine(JsonSerializer.Serialize(new {changedFiles=changed.Order().ToArray(),replacedEvents=eventCount,voiceEvents=voiceCount}));
        }
        finally{foreach(var resource in resources.Values)resource.Dispose();}
    }
}
