using System.Globalization;
using System.Text.Json;
using System.Numerics;
using SkiaSharp;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

internal static class TerrorbladeArcana
{
    private sealed record Entry(string Input,string Output,bool Texture=false,string? ReferenceInput=null,bool OptionalMaterial=false,int[]? SourceColor=null,string? Name=null,string[]? ExcludedChildren=null,bool InferSourceColor=false,bool RestoreOnly=false);
    private sealed record Request(Entry[] Files,int[] Color);
    private static readonly double[] Source=Hsv(255,60,40);
    private static double[] Hsv(double r,double g,double b){r/=255;g/=255;b/=255;var max=Math.Max(r,Math.Max(g,b));var min=Math.Min(r,Math.Min(g,b));var d=max-min;var h=d==0?0:max==r?((g-b)/d)%6:max==g?(b-r)/d+2:(r-g)/d+4;return [(h*60+360)%360,max==0?0:d/max,max];}
    internal static int[] Color(int[] rgb,int[] target,int[]? sourceColor=null){var source=sourceColor is null?Source:Hsv(sourceColor[0],sourceColor[1],sourceColor[2]);var hsv=Hsv(rgb[0],rgb[1],rgb[2]);var desired=Hsv(target[0],target[1],target[2]);var h=(hsv[0]+desired[0]-source[0]+360)%360;var s=Math.Clamp(hsv[1]*desired[1]/source[1],0,1);var v=Math.Clamp(hsv[2]*desired[2]/source[2],0,1);var c=v*s;var x=c*(1-Math.Abs(h/60%2-1));var m=v-c;double[] raw=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return raw.Select(q=>(int)Math.Round((q+m)*255,MidpointRounding.AwayFromZero)).ToArray();}
    internal static void Recolor(KVObject root,int[] rgb,int[]? sourceColor=null){
        if(root.IsCollection){
            var outputField=root.TryGetValue("m_nFieldOutput",out var field)?field:root.TryGetValue("m_nOutputField",out field)?field:null;
            if(outputField is not null&&outputField.ToInt32(CultureInfo.InvariantCulture)==6){
                var gemControlPoint=root.TryGetValue("m_nCPInput",out var cp)&&cp.ToInt32(CultureInfo.InvariantCulture)==15;
                if(root.TryGetValue("m_TransformInput",out var transform)&&transform.IsCollection
                    &&transform.TryGetValue("m_nType",out var transformType)&&transformType.ToString(CultureInfo.InvariantCulture)=="PT_TYPE_CONTROL_POINT"
                    &&transform.TryGetValue("m_nControlPoint",out cp)&&cp.ToInt32(CultureInfo.InvariantCulture)==15)gemControlPoint=true;
                if(gemControlPoint){
                    foreach(var key in new[]{"m_vOutputMin","m_vOutputMax"}){var mapped=KVObject.Array();for(var i=0;i<3;i++)mapped.Add(new KVObject(rgb[i]/255d));root[key]=mapped;}
                    root["m_nSetMethod"]=new KVObject("PARTICLE_SET_REPLACE_VALUE");
                    var strength=KVObject.Collection();strength["m_nType"]=new KVObject("PF_TYPE_LITERAL");strength["m_flLiteralValue"]=new KVObject(1d);root["m_flOpStrength"]=strength;
                }else foreach(var key in new[]{"m_vOutputMin","m_vOutputMax"})if(root.TryGetValue(key,out var values)&&values.IsArray&&values.Count==3){
                    var mapped=KVObject.Array();var i=0;foreach(var value in values.Values){mapped.Add(new KVObject(value.ToDouble(CultureInfo.InvariantCulture)*rgb[i]/Math.Max(1,(sourceColor??new[]{255,60,40})[i])));i++;}root[key]=mapped;
                }
            }
            foreach(var pair in root.Children.ToArray()){
            var value=pair.Value;
            if(pair.Key.Contains("color",StringComparison.OrdinalIgnoreCase)&&value.IsArray&&value.Count is 3 or 4&&value.Values.All(v=>!v.IsArray&&!v.IsCollection)){
                var raw=value.Values.Select(v=>v.ToDouble(CultureInfo.InvariantCulture)).ToArray();var normalized=raw.Take(3).All(v=>v>=0&&v<=1)&&raw.Take(3).Any(v=>v!=Math.Truncate(v));var old=raw.Take(3).Select(v=>(int)Math.Round(v*(normalized?255:1))).ToArray();if(old.Any(v=>v<0||v>255))continue;
                var mapped=Color(old,rgb,sourceColor);var array=KVObject.Array();foreach(var v in mapped)array.Add(normalized?new KVObject(v/255d):new KVObject(v));if(raw.Length==4)array.Add(value[3]);root[pair.Key]=array;
            }else Recolor(value,rgb,sourceColor);
        }}else if(root.IsArray)foreach(var child in root.Values)Recolor(child,rgb,sourceColor);
    }
    internal static int[]? ParticleSourceColor(KVObject root){
        if(root.IsCollection){
            var pairs=root.Children.OrderBy(p=>p.Key=="m_ConstantColor"?0:1);
            foreach(var pair in pairs){var value=pair.Value;if(pair.Key.Contains("color",StringComparison.OrdinalIgnoreCase)&&value.IsArray&&value.Count is 3 or 4&&value.Values.All(v=>!v.IsArray&&!v.IsCollection)){
                var raw=value.Values.Take(3).Select(v=>v.ToDouble(CultureInfo.InvariantCulture)).ToArray();var scale=raw.All(v=>v>=0&&v<=1)?255d:1d;var rgb=raw.Select(v=>(int)Math.Round(v*scale)).ToArray();
                if(rgb.All(v=>v>=0&&v<=255)){var hsv=Hsv(rgb[0],rgb[1],rgb[2]);if(hsv[1]>.2&&hsv[2]>.05)return rgb;}
            }}
            foreach(var pair in pairs){var color=ParticleSourceColor(pair.Value);if(color is not null)return color;}
        }else if(root.IsArray)foreach(var child in root.Values){var color=ParticleSourceColor(child);if(color is not null)return color;}
        return null;
    }
    private static void ReferenceColors(KVObject value,KVObject reference){
        if(value.IsCollection&&reference.IsCollection){foreach(var pair in value.Children.ToArray())if(reference.TryGetValue(pair.Key,out var source)){
            var field=value.TryGetValue("m_nFieldOutput",out var f)?f:value.TryGetValue("m_nOutputField",out f)?f:null;
            if(pair.Key.Contains("color",StringComparison.OrdinalIgnoreCase)&&pair.Value.IsArray&&pair.Value.Count is 3 or 4||field is not null&&field.ToInt32(CultureInfo.InvariantCulture)==6&&pair.Key is "m_vOutputMin" or "m_vOutputMax")value[pair.Key]=source;
            else ReferenceColors(pair.Value,source);
        }}else if(value.IsArray&&reference.IsArray){var original=reference.Values.ToArray();var counts=new Dictionary<string,int>();foreach(var child in value.Values){if(child.IsCollection&&child.TryGetValue("_class",out var kind)){var name=kind.ToString(CultureInfo.InvariantCulture);var occurrence=counts.GetValueOrDefault(name);counts[name]=occurrence+1;var matches=original.Where(c=>c.IsCollection&&c.TryGetValue("_class",out var k)&&k.ToString(CultureInfo.InvariantCulture)==name).ToArray();if(occurrence<matches.Length)ReferenceColors(child,matches[occurrence]);}else{var index=counts.GetValueOrDefault("");counts[""]=index+1;if(index<original.Length)ReferenceColors(child,original[index]);}}}
    }
    private static int Material(byte[] bytes,Material material,int[] rgb,IReadOnlySet<string>? neutral=null,bool legacy=true){
        // Freeze the whole tint expression. Replacing only its fallback literal
        // still lets the equipped gem's runtime variable override the chosen RGB.
        var changed=0;var end=checked((int)(material.Offset+material.Size));
        if(material.Data.TryGetValue("m_dynamicParams",out var expressions))foreach(var expression in expressions.Values){
            if(!expression.TryGetValue("m_name",out var rawName))continue;var name=rawName.ToString(CultureInfo.InvariantCulture);
            if(!name.StartsWith("g_v",StringComparison.Ordinal)||!name.Contains("color",StringComparison.OrdinalIgnoreCase)&&!name.Contains("tint",StringComparison.OrdinalIgnoreCase))continue;
            var hex=string.Concat(expression["m_value"].ToString(CultureInfo.InvariantCulture).Split((char[]?)null,StringSplitOptions.RemoveEmptyEntries));var code=Convert.FromHexString(hex);
            if(code.Length<19||legacy&&code.Length==20)continue;
            var start=-1;for(var at=(int)material.Offset;at<=end-code.Length;at++)if(bytes.AsSpan(at,code.Length).SequenceEqual(code)){start=at;break;}
            if(legacy&&start<0)throw new InvalidDataException("Material color expression not found in DATA");
            var replacement=Enumerable.Repeat((byte)24,legacy?code.Length:19).ToArray();replacement[^1]=0;replacement[0]=7;replacement[5]=7;replacement[10]=7;replacement[15]=6;replacement[16]=0x19;replacement[17]=0;
            if(legacy&&(code.Length-19)%2!=0){replacement[18]=6;replacement[19]=20;replacement[20]=0;}
            for(var i=0;i<3;i++)BitConverter.GetBytes(neutral?.Contains(name)==true?1f:rgb[i]/255f).CopyTo(replacement,1+i*5);
            // ABS on nonnegative RGB and paired NEGATE operations retain the value
            // and compiled blob length, avoiding changes to NTRO pointers.
            if(legacy)replacement.CopyTo(bytes,start);else expression["m_value"]=KVObject.Blob(replacement);changed++;
        }
        return changed;
    }
    private static bool IsAccent(SKColor p,int[]? sourceColor){
        var hsv=Hsv(p.Red,p.Green,p.Blue);var origin=sourceColor is null?Source:Hsv(sourceColor[0],sourceColor[1],sourceColor[2]);var distance=Math.Abs(hsv[0]-origin[0]);return hsv[1]>=.15&&Math.Min(distance,360-distance)<=35;
    }
    internal static SKColor Accent(SKColor p,int[] rgb,int[]? sourceColor=null){
        if(!IsAccent(p,sourceColor))return p;var mapped=Color([p.Red,p.Green,p.Blue],rgb,sourceColor);return new SKColor((byte)mapped[0],(byte)mapped[1],(byte)mapped[2],p.Alpha);
    }
    internal static int[]? TextureSourceColor(Texture texture){
        using var bitmap=texture.GenerateBitmap();
        var colors=bitmap.Pixels.Where(p=>p.Alpha>127).Select(p=>(Pixel:p,Hsv:Hsv(p.Red,p.Green,p.Blue))).Where(p=>p.Hsv[1]>.25&&p.Hsv[2]>.15).GroupBy(p=>(int)(p.Hsv[0]/10)).OrderByDescending(g=>g.Count()).FirstOrDefault();
        if(colors is null)return null;var pixel=colors.OrderByDescending(p=>p.Hsv[1]*p.Hsv[2]).First().Pixel;return [pixel.Red,pixel.Green,pixel.Blue];
    }
    private static void TextureFile(Texture texture,string target,int[] rgb,int[]? sourceColor=null,byte[]? originalBytes=null){
        using var bitmap=texture.GenerateBitmap();var pixels=bitmap.Pixels;
        var changed=false;for(var i=0;i<pixels.Length;i++){var mapped=Accent(pixels[i],rgb,sourceColor);changed|=mapped!=pixels[i];pixels[i]=mapped;}
        if(!changed&&originalBytes is not null){File.WriteAllBytes(target,originalBytes);return;}
        // Source 2 accepts RGBA8888. A fresh texture header avoids stale DXT and
        // compressed-mip metadata; alpha, dimensions and every generated mip survive.
        var width=bitmap.Width;var height=bitmap.Height;var mipCount=1;for(var n=Math.Max(width,height);n>1;n/=2)mipCount++;
        using var stream=File.Create(target);using var writer=new BinaryWriter(stream);
        writer.Write(68u);writer.Write((ushort)12);writer.Write((ushort)1);writer.Write(8u);writer.Write(1u);writer.Write(System.Text.Encoding.ASCII.GetBytes("DATA"));writer.Write(8u);writer.Write(40u);
        writer.Write((ushort)1);writer.Write((ushort)texture.Flags);for(var i=0;i<4;i++)writer.Write(0f);writer.Write((ushort)width);writer.Write((ushort)height);writer.Write((ushort)1);writer.Write((byte)4);writer.Write((byte)mipCount);writer.Write(0u);writer.Write(0u);writer.Write(0u);
        var levels=new List<(int Width,int Height,SKColor[] Pixels)>();var current=pixels;var w=width;var h=height;
        while(true){levels.Add((w,h,current));if(w==1&&h==1)break;var nw=Math.Max(1,w/2);var nh=Math.Max(1,h/2);var next=new SKColor[nw*nh];for(var y=0;y<nh;y++)for(var x=0;x<nw;x++){var colors=new List<SKColor>();for(var dy=0;dy<2;dy++)for(var dx=0;dx<2;dx++)colors.Add(current[Math.Min(h-1,y*2+dy)*w+Math.Min(w-1,x*2+dx)]);next[y*nw+x]=new SKColor((byte)colors.Average(c=>c.Red),(byte)colors.Average(c=>c.Green),(byte)colors.Average(c=>c.Blue),(byte)colors.Average(c=>c.Alpha));}current=next;w=nw;h=nh;}
        foreach(var level in levels.AsEnumerable().Reverse())foreach(var p in level.Pixels){writer.Write(p.Red);writer.Write(p.Green);writer.Write(p.Blue);writer.Write(p.Alpha);}
    }
    public static void Run(string manifest){
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty arcana manifest");if(request.Color.Length!=3||request.Color.Any(c=>c<0||c>255))throw new InvalidDataException("Invalid RGB");
        var colorTextures=new HashSet<string>(StringComparer.Ordinal);
        var textures=request.Files.Where(f=>f.Texture&&f.Name is not null).ToDictionary(f=>f.Name!,StringComparer.Ordinal);
        var accents=new Dictionary<string,bool>(StringComparer.Ordinal);var neutralTints=new Dictionary<string,HashSet<string>>(StringComparer.Ordinal);
        bool HasAccent(string name){if(accents.TryGetValue(name,out var cached))return cached;if(!textures.TryGetValue(name,out var textureFile))return false;using var r=new Resource{FileName=textureFile.Input};r.Read(textureFile.Input);if(r.DataBlock is not Texture texture||texture.ExtraData.ContainsKey(VTexExtraData.SHEET))return false;using var bitmap=texture.GenerateBitmap();var sourceColor=textureFile.SourceColor??(textureFile.InferSourceColor?TextureSourceColor(texture):null);return accents[name]=bitmap.Pixels.Any(p=>IsAccent(p,sourceColor));}
        foreach(var file in request.Files.Where(f=>f.Input.EndsWith(".vmat_c",StringComparison.OrdinalIgnoreCase))){
            using var materialResource=new Resource{FileName=file.Input};materialResource.Read(file.Input);
            if(materialResource.DataBlock is Material material)foreach(var pair in material.TextureParams)
                if(pair.Key is "g_tColor" or "g_tDetail" or "g_tDetail2" or "g_tSelfIllum" or "g_tEmissive" or "g_tBaseColor"){
                    var textureName=pair.Value.EndsWith("_c",StringComparison.Ordinal)?pair.Value:pair.Value+"_c";colorTextures.Add(textureName);
                    if(HasAccent(textureName)){if(!neutralTints.TryGetValue(file.Input,out var tints))neutralTints[file.Input]=tints=[];tints.Add(pair.Key switch{"g_tDetail"=>"g_vDetail1ColorTint","g_tDetail2"=>"g_vDetail2ColorTint",_=>"g_vColorTint"});}
                }
        }
        foreach(var file in request.Files){var bytes=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(file.Output))!);
            if(file.Texture){if(file.Name is not null&&!file.Name.StartsWith("panorama/",StringComparison.Ordinal)&&!colorTextures.Contains(file.Name)){File.WriteAllBytes(file.Output,bytes);continue;}if(resource.DataBlock is not Texture texture)throw new InvalidDataException("Expected texture");if(texture.ExtraData.ContainsKey(VTexExtraData.SHEET)){File.WriteAllBytes(file.Output,bytes);continue;}TextureFile(texture,file.Output,request.Color,file.SourceColor??(file.InferSourceColor?TextureSourceColor(texture):null),bytes);}
            else if(resource.DataBlock is Material material){var legacy=resource.ContainsBlockType(ValveResourceFormat.BlockType.NTRO);if(Material(bytes,material,request.Color,neutralTints.GetValueOrDefault(file.Input),legacy)==0&&!file.OptionalMaterial)throw new InvalidDataException("Arcana tint expression missing: "+file.Input);if(legacy)File.WriteAllBytes(file.Output,bytes);else{using var output=File.Create(file.Output);Program.SerializePatchedResource(resource,bytes,output,true,preserveMetadata:true);}}
            else if(resource.DataBlock is ParticleSystem particle){
                if(file.ExcludedChildren is not null&&particle.Data.TryGetValue("m_Children",out var children)){
                    var retained=KVObject.Array();foreach(var child in children.Values)if(!child.TryGetValue("m_ChildRef",out var reference)||!file.ExcludedChildren.Contains(reference.ToString(CultureInfo.InvariantCulture),StringComparer.Ordinal))retained.Add(child);particle.Data["m_Children"]=retained;
                }
                if(file.ReferenceInput is not null){using var reference=new Resource{FileName=file.ReferenceInput};reference.Read(file.ReferenceInput);if(reference.DataBlock is not ParticleSystem baseline)throw new InvalidDataException("Invalid arcana color reference");ReferenceColors(particle.Data,baseline.Data);}if(!file.RestoreOnly)Recolor(particle.Data,request.Color,file.SourceColor??(file.InferSourceColor?ParticleSourceColor(particle.Data):null));using var output=File.Create(file.Output);Program.SerializePatchedResource(resource,bytes,output,true,preserveMetadata:true);}
            else throw new InvalidDataException("Unsupported arcana resource: "+file.Input);
            using var check=new Resource{FileName=file.Output};check.Read(file.Output);
        }
        Console.WriteLine("[OK] Arcana resources recolored: "+request.Files.Length);
    }
}
