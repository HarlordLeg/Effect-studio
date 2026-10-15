using System.Globalization;
using System.Text.Json;
using System.Numerics;
using SkiaSharp;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

internal static class TerrorbladeArcana
{
    private sealed record Entry(string Input,string Output,bool Texture=false,string? ReferenceInput=null);
    private sealed record Request(Entry[] Files,int[] Color);
    private static readonly double[] Source=Hsv(255,60,40);
    private static double[] Hsv(double r,double g,double b){r/=255;g/=255;b/=255;var max=Math.Max(r,Math.Max(g,b));var min=Math.Min(r,Math.Min(g,b));var d=max-min;var h=d==0?0:max==r?((g-b)/d)%6:max==g?(b-r)/d+2:(r-g)/d+4;return [(h*60+360)%360,max==0?0:d/max,max];}
    internal static int[] Color(int[] rgb,int[] target){var hsv=Hsv(rgb[0],rgb[1],rgb[2]);var desired=Hsv(target[0],target[1],target[2]);var h=(hsv[0]+desired[0]-Source[0]+360)%360;var s=Math.Clamp(hsv[1]*desired[1]/Source[1],0,1);var v=Math.Clamp(hsv[2]*desired[2],0,1);var c=v*s;var x=c*(1-Math.Abs(h/60%2-1));var m=v-c;double[] raw=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return raw.Select(q=>(int)Math.Round((q+m)*255,MidpointRounding.AwayFromZero)).ToArray();}
    private static void Recolor(KVObject root,int[] rgb){
        if(root.IsCollection){
            var outputField=root.TryGetValue("m_nFieldOutput",out var field)?field:root.TryGetValue("m_nOutputField",out field)?field:null;
            if(outputField is not null&&outputField.ToInt32(CultureInfo.InvariantCulture)==6){
                foreach(var key in new[]{"m_vOutputMin","m_vOutputMax"})if(root.TryGetValue(key,out var values)&&values.IsArray&&values.Count==3){var mapped=KVObject.Array();var i=0;foreach(var value in values.Values){mapped.Add(new KVObject(value.ToDouble(CultureInfo.InvariantCulture)*rgb[i]/new[]{255d,60d,40d}[i]));i++;}root[key]=mapped;}
            }
            foreach(var pair in root.Children.ToArray()){
            var value=pair.Value;
            if(pair.Key.Contains("color",StringComparison.OrdinalIgnoreCase)&&value.IsArray&&value.Count is 3 or 4&&value.Values.All(v=>!v.IsArray&&!v.IsCollection)){
                var raw=value.Values.Select(v=>v.ToDouble(CultureInfo.InvariantCulture)).ToArray();var normalized=raw.Take(3).All(v=>v>=0&&v<=1)&&raw.Take(3).Any(v=>v!=Math.Truncate(v));var old=raw.Take(3).Select(v=>(int)Math.Round(v*(normalized?255:1))).ToArray();if(old.Any(v=>v<0||v>255))continue;
                var mapped=Color(old,rgb);var array=KVObject.Array();foreach(var v in mapped)array.Add(normalized?new KVObject(v/255d):new KVObject(v));if(raw.Length==4)array.Add(value[3]);root[pair.Key]=array;
            }else Recolor(value,rgb);
        }}else if(root.IsArray)foreach(var child in root.Values)Recolor(child,rgb);
    }
    private static void ReferenceColors(KVObject value,KVObject reference){
        if(value.IsCollection&&reference.IsCollection){foreach(var pair in value.Children.ToArray())if(reference.TryGetValue(pair.Key,out var source)){
            var field=value.TryGetValue("m_nFieldOutput",out var f)?f:value.TryGetValue("m_nOutputField",out f)?f:null;
            if(pair.Key.Contains("color",StringComparison.OrdinalIgnoreCase)&&pair.Value.IsArray&&pair.Value.Count is 3 or 4||field is not null&&field.ToInt32(CultureInfo.InvariantCulture)==6&&pair.Key is "m_vOutputMin" or "m_vOutputMax")value[pair.Key]=source;
            else ReferenceColors(pair.Value,source);
        }}else if(value.IsArray&&reference.IsArray){var original=reference.Values.ToArray();var counts=new Dictionary<string,int>();foreach(var child in value.Values){if(child.IsCollection&&child.TryGetValue("_class",out var kind)){var name=kind.ToString(CultureInfo.InvariantCulture);var occurrence=counts.GetValueOrDefault(name);counts[name]=occurrence+1;var matches=original.Where(c=>c.IsCollection&&c.TryGetValue("_class",out var k)&&k.ToString(CultureInfo.InvariantCulture)==name).ToArray();if(occurrence<matches.Length)ReferenceColors(child,matches[occurrence]);}else{var index=counts.GetValueOrDefault("");counts[""]=index+1;if(index<original.Length)ReferenceColors(child,original[index]);}}}
    }
    private static int Material(byte[] bytes,Material material,int[] rgb){
        // The supplied, fixed templates use a literal float3 in a dynamic material
        // expression. Change its constants in place, preserving NTRO and all metadata.
        var original=new byte[19];original[0]=7;original[5]=7;original[10]=7;original[15]=6;original[16]=0x19;
        for(var i=0;i<3;i++)BitConverter.GetBytes(new[]{1f,60/255f,40/255f}[i]).CopyTo(original,1+i*5);
        var changed=0;var end=checked((int)(material.Offset+material.Size));
        for(var at=(int)material.Offset;at<=end-original.Length;at++)if(bytes.AsSpan(at,original.Length).SequenceEqual(original)){
            for(var i=0;i<3;i++)BitConverter.GetBytes(rgb[i]/255f).CopyTo(bytes,at+1+i*5);changed++;at+=original.Length-1;
        }
        if(changed==0&&material.Data.TryGetValue("m_dynamicParams",out var expressions))foreach(var expression in expressions.Values){
            if(!expression.TryGetValue("m_name",out var name)||!(name.ToString(CultureInfo.InvariantCulture).Contains("color",StringComparison.OrdinalIgnoreCase)||name.ToString(CultureInfo.InvariantCulture).Contains("tint",StringComparison.OrdinalIgnoreCase)))continue;
            var hex=string.Concat(expression["m_value"].ToString(CultureInfo.InvariantCulture).Split((char[]?)null,StringSplitOptions.RemoveEmptyEntries));var code=Convert.FromHexString(hex);
            var start=-1;for(var at=(int)material.Offset;at<=end-code.Length;at++)if(bytes.AsSpan(at,code.Length).SequenceEqual(code)){start=at;break;}if(start<0)throw new InvalidDataException("Material color expression not found in DATA");
            for(var at=0;at<=code.Length-18;at++)if(code[at]==7&&code[at+5]==7&&code[at+10]==7&&code[at+15]==6&&code[at+16]==0x19&&code[at+17]==0){for(var i=0;i<3;i++)BitConverter.GetBytes(rgb[i]/255f).CopyTo(bytes,start+at+1+i*5);changed++;at+=17;}
        }
        return changed;
    }
    private static void TextureFile(Texture texture,string target,int[] rgb){
        using var bitmap=texture.GenerateBitmap();var pixels=bitmap.Pixels;
        for(var i=0;i<pixels.Length;i++){var p=pixels[i];var hsv=Hsv(p.Red,p.Green,p.Blue);var distance=Math.Abs(hsv[0]-Source[0]);distance=Math.Min(distance,360-distance);if(hsv[1]<.15||distance>35)continue;var mapped=Color([p.Red,p.Green,p.Blue],rgb);pixels[i]=new SKColor((byte)mapped[0],(byte)mapped[1],(byte)mapped[2],p.Alpha);}
        // Source 2 accepts RGBA8888. A fresh texture header avoids stale DXT and
        // compressed-mip metadata; alpha, dimensions and every generated mip survive.
        var width=bitmap.Width;var height=bitmap.Height;var mipCount=1;for(var n=Math.Max(width,height);n>1;n/=2)mipCount++;
        using var stream=File.Create(target);using var writer=new BinaryWriter(stream);
        writer.Write(68u);writer.Write((ushort)12);writer.Write((ushort)1);writer.Write(8u);writer.Write(1u);writer.Write(System.Text.Encoding.ASCII.GetBytes("DATA"));writer.Write(8u);writer.Write(40u);
        writer.Write((ushort)1);writer.Write((ushort)0);for(var i=0;i<4;i++)writer.Write(0f);writer.Write((ushort)width);writer.Write((ushort)height);writer.Write((ushort)1);writer.Write((byte)4);writer.Write((byte)mipCount);writer.Write(0u);writer.Write(0u);writer.Write(0u);
        var levels=new List<(int Width,int Height,SKColor[] Pixels)>();var current=pixels;var w=width;var h=height;
        while(true){levels.Add((w,h,current));if(w==1&&h==1)break;var nw=Math.Max(1,w/2);var nh=Math.Max(1,h/2);var next=new SKColor[nw*nh];for(var y=0;y<nh;y++)for(var x=0;x<nw;x++){var colors=new List<SKColor>();for(var dy=0;dy<2;dy++)for(var dx=0;dx<2;dx++)colors.Add(current[Math.Min(h-1,y*2+dy)*w+Math.Min(w-1,x*2+dx)]);next[y*nw+x]=new SKColor((byte)colors.Average(c=>c.Red),(byte)colors.Average(c=>c.Green),(byte)colors.Average(c=>c.Blue),(byte)colors.Average(c=>c.Alpha));}current=next;w=nw;h=nh;}
        foreach(var level in levels.AsEnumerable().Reverse())foreach(var p in level.Pixels){writer.Write(p.Red);writer.Write(p.Green);writer.Write(p.Blue);writer.Write(p.Alpha);}
    }
    public static void Run(string manifest){
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty arcana manifest");if(request.Color.Length!=3||request.Color.Any(c=>c<0||c>255))throw new InvalidDataException("Invalid RGB");
        foreach(var file in request.Files){var bytes=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(file.Output))!);
            if(file.Texture){if(resource.DataBlock is not Texture texture)throw new InvalidDataException("Expected texture");TextureFile(texture,file.Output,request.Color);}
            else if(resource.DataBlock is Material material){if(Material(bytes,material,request.Color)==0)throw new InvalidDataException("Arcana tint expression missing: "+file.Input);File.WriteAllBytes(file.Output,bytes);}
            else if(resource.DataBlock is ParticleSystem particle){if(file.ReferenceInput is not null){using var reference=new Resource{FileName=file.ReferenceInput};reference.Read(file.ReferenceInput);if(reference.DataBlock is not ParticleSystem baseline)throw new InvalidDataException("Invalid arcana color reference");ReferenceColors(particle.Data,baseline.Data);}Recolor(particle.Data,request.Color);using var output=File.Create(file.Output);Program.SerializePatchedResource(resource,bytes,output,true,preserveMetadata:true);}
            else throw new InvalidDataException("Unsupported arcana resource: "+file.Input);
            using var check=new Resource{FileName=file.Output};check.Read(file.Output);
        }
        Console.WriteLine("[OK] Arcana resources recolored: "+request.Files.Length);
    }
}
