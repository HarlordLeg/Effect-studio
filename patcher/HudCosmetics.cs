using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using SkiaSharp;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

internal static class HudCosmetics
{
    private sealed record TextureFile(string Input,string Output,string Name);
    private sealed record Binding(string Selector,string Texture);
    private sealed record StyleFile(string Input,string Output,Binding[] Bindings,string? Donor=null);
    private sealed record Request(TextureFile[] Textures,StyleFile[] Styles);
    internal static uint Crc(byte[] bytes){uint crc=0xffffffff;foreach(var b in bytes){crc^=b;for(var i=0;i<8;i++)crc=(crc&1)!=0?(crc>>1)^0xedb88320:crc>>1;}return ~crc;}
    internal static string Rules(string css,IEnumerable<(string Selector,string Texture)> bindings){
        var text=new StringBuilder("\n/* harlord HUD */\n");
        foreach(var (selector,texture)in bindings){
            if(!(selector=="#inventory"||Regex.IsMatch(selector,@"^#HUDSkin[A-Za-z]+$"))||!Regex.IsMatch(texture,@"^panorama/images/harlord/hud/[a-zA-Z0-9_/-]+\.vtex$")||texture.Contains(".."))throw new InvalidDataException("Unsafe HUD binding");
            if(!Regex.IsMatch(css,Regex.Escape(selector)+@"(?![A-Za-z0-9_-])"))throw new InvalidDataException("HUD panel missing in installed Dota CSS: "+selector);
            var root=selector=="#HUDSkinTopBarBG"?"DOTATopBar":"DOTAHud";
            text.Append(root).Append(' ').Append(selector).Append(selector=="#inventory"?"{background-size:100% 100%;background-repeat:no-repeat;background-image:url(\"s2r://":"{visibility:visible;background-image:url(\"s2r://").Append(texture).Append("\");}\n");
        }
        if(css.Contains(".TopBarBackground")&&text.ToString().Contains("#HUDSkinTopBarBG"))text.Append("DOTATopBar .TopBarBackground{opacity:0;}\n");
        if(css.Contains("#center_bg")&&text.ToString().Contains("#HUDSkinAbilityContainerBG"))text.Append("DOTAHud #center_bg{background-image:none;}\n");
        return text.ToString();
    }
    internal static void Texture(string input,string output){
        using var bitmap=SKBitmap.Decode(input)??throw new InvalidDataException("Cannot decode HUD PNG: "+input);
        if(bitmap.Width<1||bitmap.Height<1||bitmap.Width>8192||bitmap.Height>8192)throw new InvalidDataException("HUD texture dimensions invalid");
        using(var stream=File.Create(output))using(var writer=new BinaryWriter(stream)){
            writer.Write(68u);writer.Write((ushort)12);writer.Write((ushort)1);writer.Write(8u);writer.Write(1u);writer.Write(Encoding.ASCII.GetBytes("DATA"));writer.Write(8u);writer.Write(40u);
            writer.Write((ushort)1);writer.Write((ushort)0);for(var i=0;i<4;i++)writer.Write(0f);writer.Write((ushort)bitmap.Width);writer.Write((ushort)bitmap.Height);writer.Write((ushort)1);writer.Write((byte)4);writer.Write((byte)1);writer.Write(0u);writer.Write(0u);writer.Write(0u);
            foreach(var pixel in bitmap.Pixels){writer.Write(pixel.Red);writer.Write(pixel.Green);writer.Write(pixel.Blue);writer.Write(pixel.Alpha);}
        }
        using var verify=new Resource{FileName=output};verify.Read(output);if(verify.DataBlock is not ValveResourceFormat.ResourceTypes.Texture texture||texture.Width!=bitmap.Width||texture.Height!=bitmap.Height)throw new InvalidDataException("HUD texture verification failed");
    }
    public static void Run(string manifest){
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty HUD request");
        foreach(var file in request.Textures)Texture(file.Input,file.Output);
        foreach(var file in request.Styles){
            var bytes=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);
            if(resource.DataBlock is not PanoramaStyle style)throw new InvalidDataException("Expected compiled Panorama CSS");
            var css=Encoding.UTF8.GetString(style.Data).TrimEnd('\0');var rules=Rules(css,file.Bindings.Select(b=>(b.Selector,b.Texture)));var trailingZero=style.Data.Length>0&&style.Data[^1]==0;
            var imports="";
            if(file.Donor is not null){
                using var donor=new Resource{FileName=file.Donor};donor.Read(file.Donor);if(donor.DataBlock is not PanoramaStyle donorStyle)throw new InvalidDataException("Invalid HUD donor CSS");
                var donorCss=Encoding.UTF8.GetString(donorStyle.Data).TrimEnd('\0');
                donorCss=Regex.Replace(donorCss,@"@import\s+url\([^;]+;",m=>{imports+=m.Value+"\n";return "";});
                // The game applies this class when equipping a HUD. Make the chosen style
                // apply to existing HUD panels when replacing the default interface.
                donorCss=donorCss.Replace(".CustomHUDSkin",".Reborn");
                rules+="\n"+donorCss+"\n";
                foreach(var selector in new[]{"#HUDSkinMinimap","#HUDSkinPortrait","#HUDSkinAbilityContainerBG","#HUDSkinTopBarBG"})
                    if(css.Contains(selector)&&donorCss.Contains(selector))rules+=(selector=="#HUDSkinTopBarBG"?"DOTATopBar ":"DOTAHud ")+selector+"{visibility:visible;}\n";
            }
            var newData=Encoding.UTF8.GetBytes(imports+css+rules+(trailingZero?"\0":""));
            var originalData=bytes.AsSpan((int)style.Offset,(int)style.Size);var prefixSize=originalData.Length-style.Data.Length;
            if(prefixSize<6||!originalData[prefixSize..].SequenceEqual(style.Data))throw new InvalidDataException("Unsupported Panorama DATA framing");
            var payload=new byte[prefixSize+newData.Length];originalData[..prefixSize].CopyTo(payload);newData.CopyTo(payload,prefixSize);BitConverter.GetBytes(Crc(newData)).CopyTo(payload,0);
            // Keep imports, image-size tables and all unrelated resource blocks.
            using(var output=File.Create(file.Output))Program.SerializePatchedResource(resource,bytes,output,false,preserveMetadata:true,rawBlocks:new Dictionary<object,byte[]>{{style,payload}});
            using var verify=new Resource{FileName=file.Input};using var checkStream=File.OpenRead(file.Output);verify.Read(checkStream);if(verify.DataBlock is not PanoramaStyle written||!written.Data.AsSpan().SequenceEqual(newData))throw new InvalidDataException("HUD stylesheet verification failed");
        }
        Console.WriteLine("[OK] HUD: "+request.Textures.Length+" textures, "+request.Styles.Length+" styles");
    }
}
