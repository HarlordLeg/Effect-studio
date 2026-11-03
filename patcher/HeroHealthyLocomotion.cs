using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

// healthy locomotion body replacement: retain the original
// skeleton/FE program and make the injured idle/run slots play their
// authored healthy counterparts, including their cloth tracks and auto-layers.
internal static class HeroHealthyLocomotion
{
    private sealed record Request(string Input,string Output);
    internal static int Bake(KVObject root,string key)
    {
        var field=key=="m_animArray"?"m_name":"m_sName";
        var rows=root[key].Values.ToArray();
        var names=rows.Select(r=>r[field].ToString(null)).ToArray();
        if(names.Distinct(StringComparer.Ordinal).Count()!=names.Length)throw new InvalidDataException("Duplicate healthy locomotion animation name");
        var changed=0;
        for(var i=0;i<rows.Length;i++){
            var name=names[i];
            if(!name.Contains("_injured",StringComparison.Ordinal)||(!name.Contains("idle",StringComparison.Ordinal)&&!name.Contains("run",StringComparison.Ordinal)))continue;
            var healthy=name.Replace("_new_injured","").Replace("_injured","");
            var source=System.Array.IndexOf(names,healthy);
            if(source<0)throw new InvalidDataException("Missing authored healthy healthy locomotion animation: "+healthy);
            var copy=MapWeather.Clone(rows[source]);
            copy[field]=rows[i][field];
            if(rows[i].TryGetValue("m_activityArray",out var activities))copy["m_activityArray"]=activities;
            if(copy.TryGetValue("m_flags",out var flags)&&flags.ContainsKey("m_bHidden"))flags["m_bHidden"]=rows[i]["m_flags"]["m_bHidden"];
            rows[i]=copy;changed++;
        }
        if(changed==0)throw new InvalidDataException("Unsupported Healthy locomotion idle/run table");
        root[key]=KVObject.Array(rows);return changed;
    }
    internal static int BakeInvoker(KVObject root,string key){
        var field=key=="m_animArray"?"m_name":"m_sName";var rows=root[key].Values.ToArray();
        var source=rows.SingleOrDefault(r=>r[field].ToString(null)==(key=="m_animArray"?"@run_anim":"run_anim"))??throw new InvalidDataException("Invoker persona has no canonical run_anim");
        int changed=0;for(int i=0;i<rows.Length;i++){
            var name=rows[i][field].ToString(null).TrimStart('@');
            if(name!="run_versus_screen"&&name!="run_injured"&&!System.Text.RegularExpressions.Regex.IsMatch(name,"^run_anim_var[0-9]+$"))continue;
            var copy=MapWeather.Clone(source);copy[field]=rows[i][field];copy["m_activityArray"]=rows[i]["m_activityArray"];
            if(copy.TryGetValue("m_flags",out var flags)&&flags.ContainsKey("m_bHidden"))flags["m_bHidden"]=rows[i]["m_flags"]["m_bHidden"];
            rows[i]=copy;changed++;
        }if(changed==0)throw new InvalidDataException("Invoker persona run variants absent");root[key]=KVObject.Array(rows);return changed;
    }
    public static void Run(string manifest)
    {
        var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty Healthy locomotion request");
        var original=File.ReadAllBytes(q.Input);using var resource=new Resource{FileName=q.Input};resource.Read(q.Input);
        if(resource.DataBlock is not Model model||model.Data["m_name"].ToString(null) is not ("models/heroes/centaur/centaur.vmdl" or "models/heroes/death_prophet/death_prophet.vmdl" or "models/heroes/invoker_kid/invoker_kid.vmdl"))throw new InvalidDataException("Expected modern Valve Healthy locomotion body");
        var blocks=new Dictionary<object,byte[]>();var expected=new Dictionary<string,string>();
        foreach(var (type,key) in new[]{("ASEQ","m_localS1SeqDescArray"),("ANIM","m_animArray")}){
            var block=resource.Blocks.Single(b=>b.Type.ToString()==type);
            var binary=new BinaryKV3(block.Type){Resource=resource,Offset=block.Offset,Size=block.Size};
            using(var reader=new BinaryReader(new MemoryStream(original))){reader.BaseStream.Position=block.Offset;binary.Read(reader);}
            if(model.Data["m_name"].ToString(null)=="models/heroes/invoker_kid/invoker_kid.vmdl")BakeInvoker(binary.Data.Root,key);else Bake(binary.Data.Root,key);expected[type]=binary.ToString()!;
            blocks[block]=HeroActivityRules.SerializeActivity(binary,original[(int)block.Offset]);
        }
        using(var stream=File.Create(q.Output))HeroActivityRules.WriteActivityBlocks(resource,original,stream,blocks);
        var written=File.ReadAllBytes(q.Output);using var check=new Resource{FileName=q.Output};check.Read(q.Output);
        for(var i=0;i<resource.Blocks.Count;i++){
            var before=resource.Blocks[i];var after=check.Blocks[i];
            if(before.Type!=after.Type)throw new InvalidDataException("healthy locomotion block order changed");
            if(expected.TryGetValue(before.Type.ToString(),out var value)){
                var binary=new BinaryKV3(after.Type){Resource=check,Offset=after.Offset,Size=after.Size};using var reader=new BinaryReader(new MemoryStream(written));reader.BaseStream.Position=after.Offset;binary.Read(reader);
                if(binary.ToString()!=value)throw new InvalidDataException("healthy locomotion animation verification failed");
            }else if(!original.AsSpan((int)before.Offset,(int)before.Size).SequenceEqual(written.AsSpan((int)after.Offset,(int)after.Size)))throw new InvalidDataException("healthy locomotion geometry/physics block changed: "+before.Type);
        }
        Console.WriteLine("[OK] Healthy locomotion: healthy idle/run slots in ANIM and ASEQ; geometry, skeleton and physics unchanged");
    }
}
