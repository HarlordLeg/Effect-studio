using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

internal static class ResourceRelocator
{
    private sealed record FileEntry(string Input, string Output, int[]? Color = null, string? Name = null, Dictionary<string,string>? Paths = null, bool PreserveModelName = false);
    private sealed record Request(FileEntry[] Files, Dictionary<string,string> Paths, bool Watermark=false, bool RecolorParticleTextures=false);
    public static void Run(string manifest)
    {
        var request = JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest), new JsonSerializerOptions { PropertyNameCaseInsensitive=true }) ?? throw new InvalidDataException("Empty relocation request");
        if(request.Watermark){ResourceWatermark.Run(manifest);return;}
        var colorTextures=new HashSet<string>(StringComparer.Ordinal);
        if(request.RecolorParticleTextures)foreach(var source in request.Files.Where(f=>f.Color is not null)){
            using var scan=new Resource{FileName=source.Input};scan.Read(source.Input);
            if(scan.DataBlock is ParticleSystem ps)foreach(var name in ParticleRecolor.ColorTextures(ps,scan)){
                var paths=source.Paths??request.Paths;var mapped=paths.TryGetValue(name,out var target)?target:request.Paths.TryGetValue(name,out target)?target:name;colorTextures.Add(mapped+"_c");
            }
        }
        foreach(var file in request.Files)
        {
            try
            {
            var paths=new Dictionary<string,string>(request.Paths);
            if(file.Paths is not null)foreach(var pair in file.Paths)paths[pair.Key]=pair.Value;
            var bytes=File.ReadAllBytes(file.Input);
            if(file.Input.EndsWith(".vtex_c",StringComparison.OrdinalIgnoreCase)||file.Input.EndsWith(".vsnd_c",StringComparison.OrdinalIgnoreCase)) {
                if(colorTextures.Contains(file.Name??"")){using var tex=new Resource{FileName=file.Input};tex.Read(file.Input);if(tex.DataBlock is not Texture texture)throw new InvalidDataException("Invalid particle texture");if(!EditorTextures.NeutralizeColor(texture,file.Output))File.Copy(file.Input,file.Output,true);}
                else File.Copy(file.Input,file.Output,true);continue;
            }
            using var resource=new Resource { FileName=file.Input }; resource.Read(file.Input);
            var isModel=resource.DataBlock is Model;
            var originalModelName=isModel&&file.PreserveModelName&&((Model)resource.DataBlock!).Data.TryGetValue("m_name",out var originalName)?originalName:null;
            var ids=new Dictionary<ulong,ulong>();
            if(resource.ExternalReferences is not null)
                foreach(var reference in resource.ExternalReferences.ResourceRefInfoList.ToArray())
                    if(paths.TryGetValue(reference.Name,out var target))
                    {
                        var id=Program.ComputeResourceId(target);ids[reference.Id]=id;
                        // Embedded animations still refer to the original resource IDs.
                        // Keep those references and add aliases for rewritten model data.
                        if(isModel)
                        {
                            if(!resource.ExternalReferences.ResourceRefInfoList.Any(x=>x.Name==target))
                                resource.ExternalReferences.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo { Id=id,Name=target });
                        }
                        else {reference.Id=id;reference.Name=target;}
                    }
            var dataChanged=false;var changedBlocks=new HashSet<object>();
            foreach(var block in resource.Blocks)
            {
                // Preserve compiled animation, geometry and physics payloads byte-for-byte.
                // Re-serializing embedded animation KV3 can produce a model that reads
                // successfully here but crashes when the game evaluates its animations.
                if(isModel&&IsRuntimeBlock(block.Type.ToString()))continue;
                var changed=false;
                if(block is KeyValuesOrNTRO kv)
                {
                    if(resource.ContainsBlockType(ValveResourceFormat.BlockType.NTRO))
                    {
                        var start=checked((int)kv.Offset);var end=checked(start+(int)kv.Size);
                        for(var at=start;at<=end-8;at++)if(ids.TryGetValue(BitConverter.ToUInt64(bytes,at),out var mapped)) {BitConverter.GetBytes(mapped).CopyTo(bytes,at);at+=7;}
                    }
                    else Rewrite(kv.Data,paths,ids,ref changed);
                }
                else if(block is BinaryKV3 binary)Rewrite(binary.Data.Root,paths,ids,ref changed);
                if(changed){changedBlocks.Add(block);if(ReferenceEquals(block,resource.DataBlock))dataChanged=true;}
            }
            if(originalModelName is not null)((Model)resource.DataBlock!).Data["m_name"]=originalModelName;
            if(file.Color is not null)
            {
                if(file.Color.Length!=3||file.Color.Any(x=>x<0||x>255))throw new InvalidDataException("Invalid particle RGB");
                if(resource.DataBlock is not ParticleSystem particle||resource.ContainsBlockType(ValveResourceFormat.BlockType.NTRO))throw new InvalidDataException("Cannot recolor this particle format: "+file.Input);
                ForceColor(particle.Data,file.Color);dataChanged=true;
            }
            using(var stream=File.Create(file.Output)) Program.SerializePatchedResource(resource,bytes,stream,dataChanged,changedBlocks);
            using var check=new Resource { FileName=file.Output }; check.Read(file.Output);
            if(isModel)
            {
                var writtenBytes=File.ReadAllBytes(file.Output);
                foreach(var block in resource.Blocks.Where(x=>IsRuntimeBlock(x.Type.ToString())))
                {
                    var index=resource.Blocks.IndexOf(block);
                    var writtenBlock=check.Blocks[index];
                    if(writtenBlock.Type!=block.Type||writtenBlock.Size!=block.Size||
                        !bytes.AsSpan(checked((int)block.Offset),checked((int)block.Size)).SequenceEqual(
                            writtenBytes.AsSpan(checked((int)writtenBlock.Offset),checked((int)writtenBlock.Size))))
                        throw new InvalidDataException("Model runtime block changed: "+block.Type);
                }
            }
            if(file.Color is not null&&check.DataBlock is ParticleSystem written)
            {if(!written.Data.TryGetValue("m_ConstantColor",out var color)||!color.IsArray||!color.Values.Take(3).Select(v=>v.ToInt32(CultureInfo.InvariantCulture)).SequenceEqual(file.Color))throw new InvalidDataException("Particle color validation failed: "+file.Output);}
            }
            catch(Exception exception){throw new InvalidDataException("Resource relocation failed: "+(file.Name??file.Input)+": "+exception.Message,exception);}
        }
        Console.WriteLine("[OK] Relocated resources: "+request.Files.Length);
    }
    private static bool IsRuntimeBlock(string type)=>type is "ANIM" or "ASEQ" or "AGRP" or "PHYS" or "MBUF" or "VBIB";
    private static KVObject ColorValue(int[] rgb) { var a=KVObject.Array(4);foreach(var channel in rgb)a.Add(new KVObject(channel));a.Add(new KVObject(255));return a; }
    private static void ForceColor(KVObject root,int[] rgb)
    {
        ParticleRecolor.Apply(root,rgb);
    }
    private static KVObject Rewrite(KVObject value,Dictionary<string,string> paths,Dictionary<ulong,ulong> ids,ref bool changed)
    {
        if(value.ValueType==KVValueType.String) {var mapped=Map(value.ToString(CultureInfo.InvariantCulture),paths);if(mapped is not null){changed=true;return new KVObject(mapped){Flag=value.Flag};}}
        if(value.ValueType==KVValueType.UInt64&&ids.TryGetValue(value.ToUInt64(CultureInfo.InvariantCulture),out var id)) {changed=true;return new KVObject(id){Flag=value.Flag};}
        if(value.IsArray) {var array=KVObject.Array(value.Count);foreach(var child in value.Values) array.Add(Rewrite(child,paths,ids,ref changed));array.Flag=value.Flag;return array;}
        if(value.IsCollection) foreach(var pair in value.Children.ToArray()) value[pair.Key]=Rewrite(pair.Value,paths,ids,ref changed);
        return value;
    }
    private static string? Map(string value,Dictionary<string,string> paths)
    {
        if(paths.TryGetValue(value,out var target)) return target;
        // Embedded model KV3 text is a string in DATA. Replace complete quoted paths only.
        if(!value.Contains("resource:")) return null;
        var output=value;foreach(var pair in paths) output=output.Replace("\""+pair.Key+"\"","\""+pair.Value+"\"",StringComparison.Ordinal);
        return output==value?null:output;
    }
}
