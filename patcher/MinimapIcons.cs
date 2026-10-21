using System.Text;
using System.Text.Json;
using SkiaSharp;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

internal static class MinimapIcons
{
    internal sealed record Rect(int X,int Y,int Width,int Height);
    private sealed record Operation(string Target,string Source,Rect TargetRect,Rect SourceRect,int[]? Color=null,string? InputIcon=null);
    private sealed record TextureFile(string Input,string Output,Operation[] Operations);
    private sealed record Request(TextureFile[] Files);
    private static void Bounds(Rect rect,int width,int height){if(rect.X<0||rect.Y<0||rect.Width<1||rect.Height<1||rect.X>width-rect.Width||rect.Y>height-rect.Height)throw new InvalidDataException("Minimap cell outside atlas");}
    internal static byte[] CopyCells(byte[] original,int width,int height,IEnumerable<(Rect Target,Rect Source)> operations){
        if(original.Length!=checked(width*height*4))throw new InvalidDataException("Invalid minimap pixel buffer");var result=(byte[])original.Clone();var occupied=new List<Rect>();
        foreach(var (target,source)in operations){Bounds(target,width,height);Bounds(source,width,height);if(occupied.Any(r=>r.X<target.X+target.Width&&r.X+r.Width>target.X&&r.Y<target.Y+target.Height&&r.Y+r.Height>target.Y))throw new InvalidDataException("Overlapping minimap destinations");occupied.Add(target);
            // Always read the pristine atlas: A->B plus B->C must not cascade.
            for(var y=0;y<target.Height;y++)for(var x=0;x<target.Width;x++)Buffer.BlockCopy(original,((source.Y+y*source.Height/target.Height)*width+source.X+x*source.Width/target.Width)*4,result,((target.Y+y)*width+target.X+x)*4,4);
        }return result;
    }
    // mod_textures addresses the regular material atlas. The particle sheet
    // packs sprites differently (including wider cells), but retains numeric
    // sequence names matching the original grid indices.
    internal static Rect PackedCell(Texture texture,Rect grid){
        if(texture.GetSpriteSheetData() is not {} sheet)return grid;
        if(grid.Width!=32||grid.Height!=32||grid.X%32!=0||grid.Y%32!=0||texture.Width%32!=0)throw new InvalidDataException("Unsupported minimap source grid");
        var sequence=(grid.Y/32*(texture.Width/32)+grid.X/32).ToString(System.Globalization.CultureInfo.InvariantCulture);
        var matches=sheet.Sequences.Where(s=>s.Name==sequence).ToArray();if(matches.Length!=1||matches[0].Frames.Length!=1||matches[0].Frames[0].Images.Length!=1)throw new InvalidDataException("Minimap sheet sequence missing: "+sequence);
        var image=matches[0].Frames[0].Images[0];var rect=new Rect((int)Math.Round(image.UncroppedMin.X*texture.Width-.5),(int)Math.Round(image.UncroppedMin.Y*texture.Height-.5),(int)Math.Round((image.UncroppedMax.X-image.UncroppedMin.X)*texture.Width+1),(int)Math.Round((image.UncroppedMax.Y-image.UncroppedMin.Y)*texture.Height+1));Bounds(rect,texture.Width,texture.Height);return rect;
    }
    private static int UniqueOffset(byte[] bytes,byte[] needle){var found=-1;for(var i=0;i<=bytes.Length-needle.Length;i++){if(!bytes.AsSpan(i,needle.Length).SequenceEqual(needle))continue;if(found>=0)throw new InvalidDataException("Ambiguous spritesheet image record");found=i;}if(found<0)throw new InvalidDataException("Spritesheet image record missing");return found;}
    private static byte[] Header(Texture texture,Dictionary<VTexExtraData,byte[]> extras){
        using var stream=new MemoryStream();using var writer=new BinaryWriter(stream);writer.Write(texture.Version);writer.Write((ushort)texture.Flags);writer.Write(texture.Reflectivity.X);writer.Write(texture.Reflectivity.Y);writer.Write(texture.Reflectivity.Z);writer.Write(texture.Reflectivity.W);writer.Write(texture.Width);writer.Write(texture.Height);writer.Write(texture.Depth);writer.Write((byte)texture.Format);writer.Write(texture.NumMipLevels);writer.Write(texture.Picmip0Res);writer.Write(extras.Count>0?8u:0u);writer.Write((uint)extras.Count);
        var start=40+extras.Count*12;var index=0;foreach(var (kind,data)in extras){writer.Write((uint)kind);writer.Write((uint)(start-(40+index*12+4)));writer.Write((uint)data.Length);start+=data.Length;index++;}foreach(var data in extras.Values)writer.Write(data);return stream.ToArray();
    }
    public static void Run(string manifest){
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty minimap request");
        foreach(var file in request.Files){var original=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);if(resource.DataBlock is not Texture texture||texture.Format!=VTexFormat.RGBA8888||texture.NumMipLevels!=1||texture.Depth!=1)throw new InvalidDataException("Unsupported minimap atlas encoding; expected RGBA8888, one mip, 2D");
            var offset=checked((int)(texture.Offset+texture.Size));var size=checked(texture.Width*texture.Height*4);if(original.Length-offset!=size)throw new InvalidDataException("Unexpected minimap texture payload");var operations=file.Operations.Select(o=>o with{TargetRect=PackedCell(texture,o.TargetRect),SourceRect=PackedCell(texture,o.SourceRect)}).ToArray();var pixels=CopyCells(original.AsSpan(offset,size).ToArray(),texture.Width,texture.Height,operations.Select(o=>(o.TargetRect,o.SourceRect)));
            // FALLBACK_BITS is a compressed low-resolution copy. Omitting this
            // optional cache avoids retaining outdated hero colors. Preserve all
            // other authored texture metadata, especially the runtime sheet UVs.
            var extras=texture.ExtraData.Where(p=>p.Key!=VTexExtraData.FALLBACK_BITS).ToDictionary(p=>p.Key,p=>(byte[])p.Value.Clone());
            if(extras.TryGetValue(VTexExtraData.SHEET,out var sheet)){
                var sourceSheet=texture.ExtraData[VTexExtraData.SHEET];var sequences=texture.GetSpriteSheetData()?.Sequences??throw new InvalidDataException("Minimap sheet metadata missing");
                foreach(var operation in operations){var rect=operation.TargetRect;var matched=0;
                    foreach(var image in sequences.SelectMany(s=>s.Frames).SelectMany(f=>f.Images)){
                        if(Math.Abs(image.UncroppedMin.X*texture.Width-.5-rect.X)>.01||Math.Abs(image.UncroppedMin.Y*texture.Height-.5-rect.Y)>.01||Math.Abs((image.UncroppedMax.X-image.UncroppedMin.X)*texture.Width+1-rect.Width)>.01||Math.Abs((image.UncroppedMax.Y-image.UncroppedMin.Y)*texture.Height+1-rect.Height)>.01)continue;
                        var values=new[]{image.CroppedMin.X,image.CroppedMin.Y,image.CroppedMax.X,image.CroppedMax.Y,image.UncroppedMin.X,image.UncroppedMin.Y,image.UncroppedMax.X,image.UncroppedMax.Y};var pattern=values.SelectMany(BitConverter.GetBytes).ToArray();var location=UniqueOffset(sourceSheet,pattern);
                        // The donor can have a wider silhouette. Use the full
                        // existing target cell without moving its UV rectangle.
                        var crop=new[]{image.UncroppedMin.X,image.UncroppedMin.Y,image.UncroppedMax.X,image.UncroppedMax.Y}.SelectMany(BitConverter.GetBytes).ToArray();crop.CopyTo(sheet,location);matched++;
                    }if(matched==0)throw new InvalidDataException("No spritesheet cell for "+operation.Target);
                }
            }
            foreach(var operation in operations.Where(o=>o.Color is not null)){
                if(operation.Color!.Length!=3||operation.Color.Any(v=>v<0||v>255)||operation.InputIcon is null)throw new InvalidDataException("Invalid minimap RGB request");
                using var icon=new Resource{FileName=operation.InputIcon};icon.Read(operation.InputIcon);if(icon.DataBlock is not Texture iconTexture)throw new InvalidDataException("Invalid minimap accent icon");var sourceColor=TerrorbladeArcana.TextureSourceColor(iconTexture);if(sourceColor is null)throw new InvalidDataException("No accent color in minimap icon");
                var rect=operation.TargetRect;for(var y=rect.Y;y<rect.Y+rect.Height;y++)for(var x=rect.X;x<rect.X+rect.Width;x++){var i=(y*texture.Width+x)*4;var color=TerrorbladeArcana.Accent(new SKColor(pixels[i],pixels[i+1],pixels[i+2],pixels[i+3]),operation.Color,sourceColor);pixels[i]=color.Red;pixels[i+1]=color.Green;pixels[i+2]=color.Blue;}
            }
            var data=Header(texture,extras);using(var output=File.Create(file.Output))using(var writer=new BinaryWriter(output)){writer.Write((uint)(28+data.Length));writer.Write((ushort)12);writer.Write((ushort)1);writer.Write(8u);writer.Write(1u);writer.Write(Encoding.ASCII.GetBytes("DATA"));writer.Write(8u);writer.Write((uint)data.Length);writer.Write(data);writer.Write(pixels);}
            using var check=new Resource{FileName=file.Output};check.Read(file.Output);if(check.DataBlock is not Texture result||result.Width!=texture.Width||result.Height!=texture.Height||result.ExtraData.ContainsKey(VTexExtraData.FALLBACK_BITS))throw new InvalidDataException("Minimap texture verification failed");if(extras.ContainsKey(VTexExtraData.SHEET)&&result.GetSpriteSheetData()?.Sequences.Length!=texture.GetSpriteSheetData()?.Sequences.Length)throw new InvalidDataException("Minimap spritesheet was damaged");
        }Console.WriteLine(JsonSerializer.Serialize(new {minimapTextures=request.Files.Length,minimapChanges=request.Files.FirstOrDefault()?.Operations.Length??0}));
    }
}
