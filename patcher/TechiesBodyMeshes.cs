using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

// Append only DATA: the supplied Techies animations, meshes and morph buffers
// retain their original bytes and offsets. Never regenerate this model.
internal static class TechiesBodyMeshes
{
    private sealed record Request(string Input,string Output,string[] HideHeads);
    public static void Run(string manifest)
    {
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty Techies head request");
        if(request.HideHeads.Length==0||request.HideHeads.Any(n=>n is not ("spleen" or "squee")))throw new InvalidDataException("Invalid Techies head selection");
        var original=File.ReadAllBytes(request.Input);using var resource=new Resource{FileName=request.Input};resource.Read(request.Input);
        if(resource.DataBlock is not Model model||model.Data["m_name"].ToString(CultureInfo.InvariantCulture)!="models/heroes/techies/techies.vmdl")throw new InvalidDataException("Expected corrected Techies body");
        var block=resource.Blocks.Single(b=>b.Type.ToString()=="DATA");
        var binary=new BinaryKV3{Resource=resource,Offset=block.Offset,Size=block.Size};using(var reader=new BinaryReader(new MemoryStream(original)))binary.Read(reader);
        var controlBlock=resource.Blocks.Single(b=>b.Type.ToString()=="CTRL");var control=controlBlock switch{BinaryKV3 k=>k.Data.Root,KeyValuesOrNTRO k=>k.Data,_=>throw new InvalidDataException("Techies mesh table is missing")};
        var masks=binary.Data.Root["m_refMeshGroupMasks"].Values.ToArray();var hidden=new HashSet<string>();
        foreach(var mesh in control["embedded_meshes"].Values){
            var name=mesh["m_Name"].ToString(CultureInfo.InvariantCulture);
            foreach(var head in request.HideHeads.Distinct())if(System.Text.RegularExpressions.Regex.IsMatch(name,"^"+head+"_head_lod[0-9]+$")){
                var index=checked((int)mesh["m_nMeshIndex"].ToInt64(CultureInfo.InvariantCulture));if(index<0||index>=masks.Length)throw new InvalidDataException("Techies mesh index is out of range");
                masks[index]=new KVObject(0UL);hidden.Add(head);
            }
        }
        if(request.HideHeads.Any(h=>!hidden.Contains(h)))throw new InvalidDataException("Selected Techies head mesh was not found");
        var maskArray=KVObject.Array();foreach(var mask in masks)maskArray.Add(mask);binary.Data.Root["m_refMeshGroupMasks"]=maskArray;
        var payload=HeroActivityRules.SerializeActivity(binary,original[(int)block.Offset]);
        using(var output=File.Create(request.Output)){
            output.Write(original);using var writer=new BinaryWriter(output,System.Text.Encoding.UTF8,true);
            var padding=(int)((16-output.Position%16)%16);writer.Write(new byte[padding]);var start=output.Position;writer.Write(payload);var end=output.Position;
            var directory=8L+BitConverter.ToUInt32(original,8);var field=directory+resource.Blocks.IndexOf(block)*12L+4;
            output.Position=field;writer.Write(checked((uint)(start-field)));writer.Write(checked((uint)payload.Length));output.Position=0;writer.Write(checked((uint)end));
        }
        using var check=new Resource{FileName=request.Output};check.Read(request.Output);var written=File.ReadAllBytes(request.Output);
        for(var i=0;i<resource.Blocks.Count;i++)if(resource.Blocks[i]!=block){var a=resource.Blocks[i];var b=check.Blocks[i];if(!original.AsSpan((int)a.Offset,(int)a.Size).SequenceEqual(written.AsSpan((int)b.Offset,(int)b.Size)))throw new InvalidDataException("Techies runtime block changed: "+a.Type);}
        Console.WriteLine("Techies heads hidden: "+string.Join(", ",hidden));
    }
}
