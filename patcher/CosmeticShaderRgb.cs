using System.Globalization;
using System.Text;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

// Change authored tint parameters only. Preserve NTRO layout and unrelated shader controls.
internal static class CosmeticShaderRgb
{
    private sealed record Entry(string Input,string Output,int[] Color);
    private sealed record Request(Entry[] Files);
    internal static bool IsTint(string name)=>name.StartsWith("g_v",StringComparison.Ordinal)&&(name.Contains("color",StringComparison.OrdinalIgnoreCase)||name.Contains("tint",StringComparison.OrdinalIgnoreCase));
    internal static float[] Tint(float[] original,int[] rgb)
    {
        if(original.Length!=4||original.Any(v=>!float.IsFinite(v)))throw new InvalidDataException("Invalid shader color vector");
        var scale=Math.Max(0,original.Take(3).Max());return [rgb[0]/255f*scale,rgb[1]/255f*scale,rgb[2]/255f*scale,original[3]];
    }
    private static KVObject Vector(float[] v){var result=KVObject.Array();for(var i=0;i<4;i++)result.Add(new KVObject(v[i]));return result;}
    private static float[] ReadVector(KVObject value)=>(value.IsCollection&&value.ContainsKey("x")?new[]{"x","y","z","w"}.Select(k=>value[k]):value.Values).Select(v=>(float)v.ToDouble(CultureInfo.InvariantCulture)).ToArray();
    internal static int Apply(KVObject data,int[] rgb)
    {
        var changed=0;if(data.TryGetValue("m_vectorParams",out var vectors))foreach(var vector in vectors.Values){if(!IsTint(vector["m_name"].ToString(CultureInfo.InvariantCulture)))continue;vector["m_value"]=Vector(Tint(ReadVector(vector["m_value"]),rgb));changed++;}
        if(data.TryGetValue("m_dynamicParams",out var dynamic))foreach(var expression in dynamic.Values){if(!IsTint(expression["m_name"].ToString(CultureInfo.InvariantCulture)))continue;expression["m_value"]=KVObject.Blob(Constant(rgb));changed++;}return changed;
    }
    private static byte[] Constant(int[] rgb){var code=new byte[19];code[0]=code[5]=code[10]=7;code[15]=6;code[16]=0x19;for(var i=0;i<3;i++)BitConverter.GetBytes(rgb[i]/255f).CopyTo(code,1+i*5);return code;}
    internal static void PatchLegacyVectors(byte[] bytes,int start,int end,int count,int stride,int nameOffset,int valueOffset,int[] rgb)
    {
        if(count<0||count>65536||stride<16||start<0||start+(long)count*stride>end||end>bytes.Length||nameOffset<0||nameOffset+4>stride||valueOffset<0||valueOffset+16>stride)throw new InvalidDataException("Invalid legacy material vector layout");
        for(var i=0;i<count;i++){var at=start+i*stride;var p=at+nameOffset;var nameAt=checked(p+BitConverter.ToInt32(bytes,p));if(nameAt<0||nameAt>=end)throw new InvalidDataException("Invalid material parameter name pointer");var terminator=Array.IndexOf(bytes,(byte)0,nameAt,end-nameAt);if(terminator<0)throw new InvalidDataException("Unterminated material parameter name");if(!IsTint(Encoding.UTF8.GetString(bytes,nameAt,terminator-nameAt)))continue;var values=Enumerable.Range(0,4).Select(j=>BitConverter.ToSingle(bytes,at+valueOffset+j*4)).ToArray();var tint=Tint(values,rgb);for(var j=0;j<4;j++)BitConverter.GetBytes(tint[j]).CopyTo(bytes,at+valueOffset+j*4);}
    }
    private static int Legacy(Resource resource,Material material,byte[] bytes,int[] rgb)
    {
        var ntro=resource.GetBlockByType(BlockType.NTRO) as ResourceIntrospectionManifest??throw new InvalidDataException("Missing material NTRO schema");
        var root=ntro.ReferencedStructs.FirstOrDefault(s=>s.Name=="MaterialResourceData_t")??throw new InvalidDataException("Unknown material root schema");var count=0;
        foreach(var arrayName in new[]{"m_vectorParams","m_dynamicParams"}){
            var field=root.FieldIntrospection.FirstOrDefault(f=>f.FieldName==arrayName);if(field is null||field.OnDiskOffset<0)continue;
            if(field.Indirections.Count!=1||field.Indirections[0]!=4)throw new InvalidDataException("Unsupported material parameter array layout");
            var type=ntro.GetStructById(field.TypeData)??throw new InvalidDataException("Missing parameter schema");var name=type.FieldIntrospection.First(f=>f.FieldName=="m_name");var value=type.FieldIntrospection.First(f=>f.FieldName=="m_value");
            var pointer=checked((int)material.Offset+field.OnDiskOffset);var first=checked(pointer+BitConverter.ToInt32(bytes,pointer));var length=BitConverter.ToInt32(bytes,pointer+4);var end=checked((int)(material.Offset+material.Size));
            if(arrayName=="m_vectorParams"){PatchLegacyVectors(bytes,first,end,length,type.DiskSize,name.OnDiskOffset,value.OnDiskOffset,rgb);if(material.Data.TryGetValue(arrayName,out var rows))count+=rows.Values.Count(v=>IsTint(v["m_name"].ToString(CultureInfo.InvariantCulture)));}
            else if(material.Data.TryGetValue(arrayName,out var rows)){
                var entries=rows.Values.ToArray();if(entries.Length!=length)throw new InvalidDataException("Material dynamic parameter count mismatch");
                for(var i=0;i<length;i++){if(!IsTint(entries[i]["m_name"].ToString(CultureInfo.InvariantCulture)))continue;var p=first+i*type.DiskSize+value.OnDiskOffset;var at=checked(p+BitConverter.ToInt32(bytes,p));var size=BitConverter.ToInt32(bytes,p+4);if(size<19||at<(int)material.Offset||at+(long)size>end)throw new InvalidDataException("Unsupported material tint expression layout");var code=Enumerable.Repeat((byte)24,size).ToArray();Constant(rgb).CopyTo(code,0);code[18]=24;code[^1]=0;if((size-19)%2!=0){if(size<21)throw new InvalidDataException("Unsupported material tint expression length");code[18]=6;code[19]=20;code[20]=0;}code.CopyTo(bytes,at);count++;}
            }
        }return count;
    }
    public static void Run(string manifest)
    {
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty shader RGB request");
        foreach(var file in request.Files){if(file.Color.Length!=3||file.Color.Any(c=>c<0||c>255))throw new InvalidDataException("Invalid shader RGB");var bytes=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);if(resource.DataBlock is not Material material)throw new InvalidDataException("Not a shader material");var legacy=resource.ContainsBlockType(BlockType.NTRO);var changed=legacy?Legacy(resource,material,bytes,file.Color):Apply(material.Data,file.Color);if(changed==0)throw new InvalidDataException("В шейдере Aghanim нет поддерживаемых параметров цвета; материал не изменён");if(legacy)File.WriteAllBytes(file.Output,bytes);else{using var output=File.Create(file.Output);Program.SerializePatchedResource(resource,bytes,output,true,preserveMetadata:true);}using var check=new Resource{FileName=file.Input};using var verify=File.OpenRead(file.Output);check.Read(verify);if(check.DataBlock is not Material)throw new InvalidDataException("Shader material verification failed");}
        Console.WriteLine("[OK] Shader RGB: "+request.Files.Length);
    }
}
