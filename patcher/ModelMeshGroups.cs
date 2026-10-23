using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

// Freeze an economy-selected mesh group without touching compiled animation,
// vertex, physics or skeleton data. The base wearable has no arcana attribute
// in game, so leaving a dummy default and relying on that attribute hides it.
internal static class ModelMeshGroups
{
    private sealed record Request(string Input,string Output,string Model,string? Group=null,Dictionary<string,int>? Bodygroups=null);
    public static void Run(string manifest)
    {
        var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty mesh-group request");
        var original=File.ReadAllBytes(q.Input);
        using var resource=new Resource{FileName=q.Input};resource.Read(q.Input);
        if(resource.DataBlock is not Model model||model.Data["m_name"].ToString(CultureInfo.InvariantCulture)!=q.Model)throw new InvalidDataException("Mesh-group model identity mismatch");
        var block=resource.Blocks.Single(b=>b.Type.ToString()=="DATA");
        var binary=new BinaryKV3{Resource=resource,Offset=block.Offset,Size=block.Size};
        using(var reader=new BinaryReader(new MemoryStream(original)))binary.Read(reader);
        var data=binary.Data.Root;
        var groups=data["m_meshGroups"].Values.Select(v=>v.ToString(CultureInfo.InvariantCulture)).ToArray();
        var bit=data["m_nDefaultMeshGroupMask"].ToUInt64(CultureInfo.InvariantCulture);
        if(q.Group is not null){
            var index=Array.IndexOf(groups,q.Group);
            if(index<0||index>=64)throw new InvalidDataException("Authored mesh group not found: "+q.Group);
            bit=1UL<<index;
        }
        foreach(var (name,value) in q.Bodygroups??[]){
            if(value<0)throw new InvalidDataException("Invalid bodygroup value");
            var prefix=name+"_@";var matched=groups.Select((group,index)=>(group,index)).Where(x=>x.group.StartsWith(prefix,StringComparison.Ordinal)).ToArray();
            var selected=matched.Where(x=>x.group.StartsWith(prefix+value+"_#&",StringComparison.Ordinal)).ToArray();
            if(matched.Length==0||selected.Length!=1||matched.Any(x=>x.index>=64))throw new InvalidDataException("Authored bodygroup state not found: "+name+"="+value);
            foreach(var row in matched)bit&=~(1UL<<row.index);
            bit|=1UL<<selected[0].index;
        }
        if(q.Group is null&&!(q.Bodygroups?.Count>0))throw new InvalidDataException("No mesh group selection requested");
        var masks=data["m_refMeshGroupMasks"].Values.ToArray();
        var visible=masks.Select(v=>(v.ToUInt64(CultureInfo.InvariantCulture)&bit)!=0).ToArray();
        if(q.Group is not null&&!visible.Any(v=>v))throw new InvalidDataException("Authored mesh group has no geometry: "+q.Group);
        // Runtime economy bodygroup changes must not restore the other style.
        var locked=KVObject.Array();foreach(var show in visible)locked.Add(new KVObject(show?ulong.MaxValue:0UL));
        data["m_refMeshGroupMasks"]=locked;data["m_nDefaultMeshGroupMask"]=new KVObject(bit);
        var payload=HeroActivityRules.SerializeActivity(binary,original[(int)block.Offset]);
        using(var output=File.Create(q.Output)){
            output.Write(original);using var writer=new BinaryWriter(output,System.Text.Encoding.UTF8,true);
            var padding=(int)((16-output.Position%16)%16);writer.Write(new byte[padding]);var start=output.Position;writer.Write(payload);var end=output.Position;
            var directory=8L+BitConverter.ToUInt32(original,8);var field=directory+resource.Blocks.IndexOf(block)*12L+4;
            output.Position=field;writer.Write(checked((uint)(start-field)));writer.Write(checked((uint)payload.Length));output.Position=0;writer.Write(checked((uint)end));
        }
        using var check=new Resource{FileName=q.Output};check.Read(q.Output);var written=File.ReadAllBytes(q.Output);
        for(var i=0;i<resource.Blocks.Count;i++)if(resource.Blocks[i]!=block){var a=resource.Blocks[i];var b=check.Blocks[i];if(!original.AsSpan((int)a.Offset,(int)a.Size).SequenceEqual(written.AsSpan((int)b.Offset,(int)b.Size)))throw new InvalidDataException("Mesh-group operation changed runtime block: "+a.Type);}
        Console.WriteLine(q.Group is not null?"Selected mesh group: "+q.Group:"Selected bodygroups: "+string.Join(", ",q.Bodygroups!.Select(pair=>pair.Key+"="+pair.Value)));
    }
}
