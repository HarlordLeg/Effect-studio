using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

// VPK body replacements do not equip the economy arcana. Keep the original
// modern skeleton/FE program and make the injured idle/run slots play their
// authored healthy counterparts, including their cloth tracks and auto-layers.
internal static class CrystalMaidenArcanaRuntime
{
    private sealed record Request(string Input,string Output);
    internal static int Bake(KVObject root,string key)
    {
        var field=key=="m_animArray"?"m_name":"m_sName";
        var rows=root[key].Values.ToArray();
        var names=rows.Select(r=>r[field].ToString(null)).ToArray();
        if(names.Distinct(StringComparer.Ordinal).Count()!=names.Length)throw new InvalidDataException("Duplicate CM animation name");
        var changed=0;
        for(var i=0;i<rows.Length;i++){
            var name=names[i];
            if(!name.EndsWith("_injured",StringComparison.Ordinal)||!name.Contains("arcana_",StringComparison.Ordinal)||(!name.Contains("idle",StringComparison.Ordinal)&&!name.Contains("run",StringComparison.Ordinal)))continue;
            var healthy=name[..^"_injured".Length]+"_anim";
            if(name=="arcana_run_injured")healthy=key=="m_animArray"?"@run_arcana_anim":"run_arcana_anim";
            if(name=="wardstaff_arcana_run_injured")healthy=key=="m_animArray"?"@wardstaff_run_arcana_anim":"wardstaff_run_arcana_anim";
            if(key=="m_animArray"&&name.Contains("agg_run",StringComparison.Ordinal))healthy="@"+healthy;
            var source=System.Array.IndexOf(names,healthy);
            if(source<0)throw new InvalidDataException("Missing authored healthy CM animation: "+healthy);
            var copy=MapWeather.Clone(rows[source]);
            copy[field]=rows[i][field];
            copy["m_activityArray"]=rows[i]["m_activityArray"];
            if(copy.TryGetValue("m_flags",out var flags)&&flags.ContainsKey("m_bHidden"))flags["m_bHidden"]=rows[i]["m_flags"]["m_bHidden"];
            rows[i]=copy;changed++;
        }
        if(changed!=8)throw new InvalidDataException("Unsupported CM arcana idle/run table: expected 8 injured slots, found "+changed);
        root[key]=KVObject.Array(rows);return changed;
    }
    public static void Run(string manifest)
    {
        var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty CM arcana request");
        var original=File.ReadAllBytes(q.Input);using var resource=new Resource{FileName=q.Input};resource.Read(q.Input);
        if(resource.DataBlock is not Model model||model.Data["m_name"].ToString(null) is not ("models/heroes/crystal_maiden/crystal_maiden_arcana.vmdl" or "models/heroes/crystal_maiden/crystal_maiden.vmdl"))throw new InvalidDataException("Expected modern Valve CM arcana body");
        var blocks=new Dictionary<object,byte[]>();var expected=new Dictionary<string,string>();
        foreach(var (type,key) in new[]{("ASEQ","m_localS1SeqDescArray"),("ANIM","m_animArray")}){
            var block=resource.Blocks.Single(b=>b.Type.ToString()==type);
            if(original[(int)block.Offset]!=5)throw new InvalidDataException("CM runtime patch requires current KV3 v5 animations");
            var binary=new BinaryKV3(block.Type){Resource=resource,Offset=block.Offset,Size=block.Size};
            using(var reader=new BinaryReader(new MemoryStream(original))){reader.BaseStream.Position=block.Offset;binary.Read(reader);}
            Bake(binary.Data.Root,key);expected[type]=binary.ToString()!;
            blocks[block]=HeroActivityRules.SerializeActivity(binary,original[(int)block.Offset]);
        }
        using(var stream=File.Create(q.Output))HeroActivityRules.WriteActivityBlocks(resource,original,stream,blocks);
        var written=File.ReadAllBytes(q.Output);using var check=new Resource{FileName=q.Output};check.Read(q.Output);
        for(var i=0;i<resource.Blocks.Count;i++){
            var before=resource.Blocks[i];var after=check.Blocks[i];
            if(before.Type!=after.Type)throw new InvalidDataException("CM block order changed");
            if(expected.TryGetValue(before.Type.ToString(),out var value)){
                var binary=new BinaryKV3(after.Type){Resource=check,Offset=after.Offset,Size=after.Size};using var reader=new BinaryReader(new MemoryStream(written));reader.BaseStream.Position=after.Offset;binary.Read(reader);
                if(binary.ToString()!=value)throw new InvalidDataException("CM animation verification failed");
            }else if(!original.AsSpan((int)before.Offset,(int)before.Size).SequenceEqual(written.AsSpan((int)after.Offset,(int)after.Size)))throw new InvalidDataException("CM geometry/physics block changed: "+before.Type);
        }
        Console.WriteLine("[OK] CM arcana: healthy idle/run slots in ANIM and ASEQ; current geometry, skeleton and physics unchanged");
    }
}
