using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

internal static class HeroActivities
{
    private sealed record Trail(string Input, string Output);
    private sealed record Request(string Input, string Output, string[] Modifiers, Trail[]? Trails = null);
    private static string Text(KVObject value, string key) => value[key].ToString(CultureInfo.InvariantCulture);
    private static KVObject Array(IEnumerable<KVObject> values)
    {
        var result=KVObject.Array();foreach(var value in values)result.Add(value);return result;
    }
    // Compile the equipped-item modifiers into sequence selection, leaving all
    // animation tracks, bone transforms, fetch indices, layers and weights intact.
    internal static int Bake(KVObject root, IReadOnlySet<string> modifiers, string arrayKey = "m_localS1SeqDescArray")
    {
        if(!root.TryGetValue(arrayKey,out var sequences)||!sequences.IsArray)
            throw new InvalidDataException("Hero has no embedded sequence descriptors");
        var rows=sequences.Values.ToArray();
        var promoted=new Dictionary<string,List<HashSet<string>>>();
        var selected=new HashSet<KVObject>();
        var found=new HashSet<string>();
        foreach(var sequence in rows)
        {
            var activities=sequence["m_activityArray"].Values.ToArray();
            if(!activities.Any(a=>modifiers.Contains(Text(a,"m_name"))))continue;
            found.UnionWith(activities.Select(a=>Text(a,"m_name")).Where(modifiers.Contains));
            var remaining=activities.Where(a=>!modifiers.Contains(Text(a,"m_name"))).ToArray();
            var required=remaining.Select(a=>Text(a,"m_name")).Where(n=>!n.StartsWith("ACT_",StringComparison.Ordinal)).ToHashSet();
            foreach(var activity in remaining.Where(a=>Text(a,"m_name").StartsWith("ACT_",StringComparison.Ordinal)))
            {
                var name=Text(activity,"m_name");
                if(!promoted.TryGetValue(name,out var signatures))promoted[name]=signatures=[];
                signatures.Add(required);
            }
            sequence["m_activityArray"]=Array(remaining);selected.Add(sequence);
        }
        if(!found.SetEquals(modifiers))throw new InvalidDataException("Requested hero activity modifiers were not found: "+string.Join(", ",modifiers.Except(found)));
        // Do not leave ordinary sequences in the same weighted selection pool.
        // Keep unrelated modifiers (injured, haste, other equipped cosmetics).
        foreach(var sequence in rows.Where(s=>!selected.Contains(s)))
        {
            var activities=sequence["m_activityArray"].Values.ToArray();
            var required=activities.Select(a=>Text(a,"m_name")).Where(n=>!n.StartsWith("ACT_",StringComparison.Ordinal)).ToHashSet();
            sequence["m_activityArray"]=Array(activities.Where(a=>
                !promoted.TryGetValue(Text(a,"m_name"),out var signatures)||!signatures.Any(s=>s.SetEquals(required))));
        }
        return selected.Count;
    }
    public static void Run(string manifest)
    {
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty hero activity request");
        var modifiers=request.Modifiers.ToHashSet(StringComparer.Ordinal);
        if(modifiers.Count==0||modifiers.Any(m=>m is not ("basher" or "offhand_basher")))throw new InvalidDataException("Unsupported hero activity modifier");
        var bytes=File.ReadAllBytes(request.Input);
        using var resource=new Resource{FileName=request.Input};resource.Read(request.Input);
        if(resource.DataBlock is not Model model||Text(model.Data,"m_name")!="models/heroes/antimage/antimage.vmdl")throw new InvalidDataException("Expected base Anti-Mage model");
        var block=resource.Blocks.Single(b=>b.Type.ToString()=="ASEQ");
        var root=block is KeyValuesOrNTRO kv?kv.Data:block is BinaryKV3 binary?binary.Data.Root:throw new InvalidDataException("Unsupported sequence format");
        var count=Bake(root,modifiers);
        var animation=resource.Blocks.Single(b=>b.Type.ToString()=="ANIM");
        var animRoot=animation is KeyValuesOrNTRO akv?akv.Data:animation is BinaryKV3 ab?ab.Data.Root:throw new InvalidDataException("Unsupported animation format");
        // Runtime clip descriptors duplicate the sequence activities. Update both
        // tables; keep all compressed segments, channels and frame data intact.
        var tracks=animRoot["m_segmentArray"].ToString();
        Bake(animRoot,modifiers,"m_animArray");
        if(animRoot["m_segmentArray"].ToString()!=tracks)throw new InvalidDataException("Animation segments changed");
        using(var output=File.Create(request.Output))Program.SerializePatchedResource(resource,bytes,output,false,new HashSet<object>{block,animation},preserveMetadata:true);
        using var check=new Resource{FileName=request.Output};check.Read(request.Output);
        var written=File.ReadAllBytes(request.Output);
        for(var i=0;i<resource.Blocks.Count;i++)
        {
            var before=resource.Blocks[i];var after=check.Blocks[i];
            if(before.Type!=after.Type)throw new InvalidDataException("Hero block order changed");
            if(ReferenceEquals(before,block)||ReferenceEquals(before,animation))continue;
            if(before.Size!=after.Size||!bytes.AsSpan((int)before.Offset,(int)before.Size).SequenceEqual(written.AsSpan((int)after.Offset,(int)after.Size)))throw new InvalidDataException("Hero payload changed: "+before.Type);
        }
        foreach(var trail in request.Trails??[]){
            using var particle=new Resource{FileName=trail.Input};particle.Read(trail.Input);
            if(particle.DataBlock is not ParticleSystem system)throw new InvalidDataException("Expected default blade particle");
            system.Data["m_nMaxParticles"]=new KVObject(0);
            system.Data["m_Children"]=KVObject.Array();
            system.Data["m_Emitters"]=KVObject.Array();
            using var stream=File.Create(trail.Output);
            Program.SerializePatchedResource(particle,File.ReadAllBytes(trail.Input),stream,true,preserveMetadata:true);
        }
        Console.WriteLine("[OK] Hero activity sequences enabled: "+count);
    }
}
