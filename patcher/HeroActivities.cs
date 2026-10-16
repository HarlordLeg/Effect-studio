using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

internal static class HeroActivities
{
    private sealed record Trail(string Input, string Output);
    private sealed record Request(string Input, string Output, string[] Modifiers, Trail[]? Trails = null, string? AnimationTemplate = null);
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
    internal static void ValidateSkeleton(KVObject target,KVObject donor){
        foreach(var key in new[]{"m_boneName","m_nParent"})if(!target[key].Values.Select(v=>v.ToString(CultureInfo.InvariantCulture)).SequenceEqual(donor[key].Values.Select(v=>v.ToString(CultureInfo.InvariantCulture))))throw new InvalidDataException("Skullbasher animation skeleton mismatch: "+key);
        foreach(var key in new[]{"m_bonePosParent","m_boneRotParent","m_boneScaleParent"}){
            var a=Numbers(target[key]).ToArray();var b=Numbers(donor[key]).ToArray();
            if(a.Length!=b.Length||a.Where((v,i)=>Math.Abs(v-b[i])>.001).Any())throw new InvalidDataException("Skullbasher animation bind pose mismatch: "+key);
        }
    }
    private static IEnumerable<double> Numbers(KVObject value){if(value.IsArray){foreach(var child in value.Values)foreach(var number in Numbers(child))yield return number;}else yield return value.ToDouble(CultureInfo.InvariantCulture);}
    private static KVObject ActivityData(Block block) => block is KeyValuesOrNTRO kv ? kv.Data : block is BinaryKV3 binary ? binary.Data.Root : throw new InvalidDataException("Unsupported activity block: "+block.Type);
    // Snapshot everything except the activity labels that this operation edits.
    private static string Payload(Block block,string arrayKey)
    {
        var rows=ActivityData(block)[arrayKey].Values.ToArray();
        var labels=rows.Select(r=>r["m_activityArray"]).ToArray();
        try{foreach(var row in rows)row["m_activityArray"]=KVObject.Array();return block.ToString()!;}
        finally{for(var i=0;i<rows.Length;i++)rows[i]["m_activityArray"]=labels[i];}
    }
    private static void RunDarkclaw(Request request)
    {
        var bytes=File.ReadAllBytes(request.Input);
        using var resource=new Resource{FileName=request.Input};resource.Read(request.Input);
        if(resource.DataBlock is not Model model||Text(model.Data,"m_name")!="models/heroes/dazzle/dazzle.vmdl")throw new InvalidDataException("Expected base Dazzle model");
        var changed=new HashSet<object>();var snapshots=new Dictionary<string,string>();var expected=new Dictionary<string,string>();
        foreach(var (type,key) in new[]{("ASEQ","m_localS1SeqDescArray"),("ANIM","m_animArray")}){
            var block=resource.Blocks.Single(b=>b.Type.ToString()==type);var data=ActivityData(block);
            snapshots[type]=Payload(block,key);Bake(data,new HashSet<string>{"darkclaw"},key);changed.Add(block);expected[type]=block.ToString()!;
        }
        using(var output=File.Create(request.Output))Program.SerializePatchedResource(resource,bytes,output,false,changed,preserveMetadata:true);
        using var check=new Resource{FileName=request.Output};check.Read(request.Output);var written=File.ReadAllBytes(request.Output);
        for(var i=0;i<resource.Blocks.Count;i++){
            var before=resource.Blocks[i];var after=check.Blocks[i];var type=before.Type.ToString();
            if(before.Type!=after.Type)throw new InvalidDataException("Dazzle block order changed");
            if(snapshots.TryGetValue(type,out var snapshot)){
                var key=type=="ASEQ"?"m_localS1SeqDescArray":"m_animArray";
                if(expected[type]!=after.ToString())throw new InvalidDataException("Dazzle activity serialization mismatch: "+type);
                if(snapshot!=Payload(after,key))throw new InvalidDataException("Dazzle animation payload changed: "+type);
            }else if(before.Size!=after.Size||!bytes.AsSpan((int)before.Offset,(int)before.Size).SequenceEqual(written.AsSpan((int)after.Offset,(int)after.Size)))throw new InvalidDataException("Dazzle payload changed: "+type);
        }
        Console.WriteLine("[OK] Darkclaw activities selected; animation tracks, geometry and skeleton preserved");
    }
    public static void Run(string manifest)
    {
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty hero activity request");
        var modifiers=request.Modifiers.ToHashSet(StringComparer.Ordinal);
        if(modifiers.SetEquals(new[]{"darkclaw"})){RunDarkclaw(request);return;}
        if(modifiers.Count==0||modifiers.Any(m=>m is not ("basher" or "offhand_basher")))throw new InvalidDataException("Unsupported hero activity modifier");
        var bytes=File.ReadAllBytes(request.Input);
        using var resource=new Resource{FileName=request.Input};resource.Read(request.Input);
        if(resource.DataBlock is not Model model||Text(model.Data,"m_name")!="models/heroes/antimage/antimage.vmdl")throw new InvalidDataException("Expected base Anti-Mage model");
        if(request.AnimationTemplate is null)throw new InvalidDataException("Skullbasher animation template required");
        var donorBytes=File.ReadAllBytes(request.AnimationTemplate);
        using var donor=new Resource{FileName=request.AnimationTemplate};donor.Read(request.AnimationTemplate);
        if(donor.DataBlock is not Model donorModel)throw new InvalidDataException("Expected animation donor model");
        ValidateSkeleton(model.Data["m_modelSkeleton"],donorModel.Data["m_modelSkeleton"]);
        var rawBlocks=new Dictionary<object,byte[]>();
        foreach(var type in new[]{"ANIM","ASEQ","AGRP"}){
            var target=resource.Blocks.Single(b=>b.Type.ToString()==type);var source=donor.Blocks.Single(b=>b.Type.ToString()==type);
            rawBlocks[target]=donorBytes.AsSpan((int)source.Offset,(int)source.Size).ToArray();
        }
        // Compiled animation events can refer to donor particles by their IDs.
        // Keep base references and add only the event resources, never donor materials.
        if(resource.ExternalReferences is null||donor.ExternalReferences is null)throw new InvalidDataException("Animation model references missing");
        foreach(var reference in donor.ExternalReferences.ResourceRefInfoList.Where(r=>r.Name.EndsWith(".vpcf",StringComparison.Ordinal)||r.Name.EndsWith(".vsnd",StringComparison.Ordinal)))
            if(!resource.ExternalReferences.ResourceRefInfoList.Any(r=>r.Id==reference.Id))resource.ExternalReferences.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Id=reference.Id,Name=reference.Name});
        using(var output=File.Create(request.Output))Program.SerializePatchedResource(resource,bytes,output,false,new HashSet<object>{resource.ExternalReferences},preserveMetadata:true,rawBlocks:rawBlocks);
        using var check=new Resource{FileName=request.Output};check.Read(request.Output);
        var written=File.ReadAllBytes(request.Output);
        for(var i=0;i<resource.Blocks.Count;i++){
            var before=resource.Blocks[i];var after=check.Blocks[i];
            if(before.Type!=after.Type)throw new InvalidDataException("Hero block order changed");
            var expected=rawBlocks.TryGetValue(before,out var raw)?raw:bytes.AsSpan((int)before.Offset,(int)before.Size).ToArray();
            if(before.Type.ToString()=="RERL")continue;
            if(after.Size!=expected.Length||!expected.AsSpan().SequenceEqual(written.AsSpan((int)after.Offset,(int)after.Size)))throw new InvalidDataException("Hero payload changed: "+before.Type);
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
        Console.WriteLine("[OK] Skullbasher compiled animations copied; base geometry and materials preserved");
    }
}
