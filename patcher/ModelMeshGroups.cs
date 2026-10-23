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
    private sealed record Request(string Input,string Output,string Model,string Group);
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
        var index=Array.IndexOf(groups,q.Group);
        if(index<0||index>=64)throw new InvalidDataException("Authored mesh group not found: "+q.Group);
        var bit=1UL<<index;var masks=data["m_refMeshGroupMasks"].Values.ToArray();
        var selected=masks.Select(v=>(v.ToUInt64(CultureInfo.InvariantCulture)&bit)!=0).ToArray();
        if(!selected.Any(v=>v))throw new InvalidDataException("Authored mesh group has no geometry: "+q.Group);
        // Runtime economy bodygroup changes must not restore the other style.
        var locked=KVObject.Array();foreach(var visible in selected)locked.Add(new KVObject(visible?ulong.MaxValue:0UL));
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
        Console.WriteLine("Selected mesh group: "+q.Group);
    }
}
