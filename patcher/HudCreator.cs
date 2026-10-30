using System.Text;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;
using ValveResourceFormat.Serialization.KeyValues;
using ValveResourceFormat.Blocks;

internal static class HudCreator
{
 private sealed record Patch(string Target,string Id,string Kind,string Style,string? Text=null,bool Added=false,string? Texture=null,string ImageFit="stretch");
 private sealed record Entry(string Input,string? Output=null,Patch[]? Patches=null,string? ImageOutput=null,string? CssAppend=null);
 private sealed record Request(Entry[] Files,string Response);
 private static string Str(KVObject n,string k)=>n.TryGetValue(k,out var v)?v.ToString(null):"";
 private static IEnumerable<KVObject> Children(KVObject n)=>n.TryGetValue("vecChildren",out var a)&&a.IsArray?a.Values:n.TryGetValue("child",out var c)?[c]:[];
 private static IEnumerable<KVObject> Walk(KVObject n){yield return n;foreach(var c in Children(n))foreach(var d in Walk(c))yield return d;}
 private static string Attr(KVObject n,string key)=>Children(n).Where(c=>Str(c,"eType")=="PANEL_ATTRIBUTE"&&Str(c,"name")==key).Select(c=>Str(c["child"],"name")).FirstOrDefault()??"";
 private static uint Crc(byte[] data){uint crc=0xffffffff;foreach(var b in data){crc^=b;for(int i=0;i<8;i++)crc=(crc>>1)^((crc&1)!=0?0xedb88320u:0u);}return ~crc;}
 private static byte[] DataWithCrc(Resource r,byte[] bytes,byte[] content){var block=r.DataBlock!;var original=bytes.AsSpan((int)block.Offset,(int)block.Size);if(original.Length<6)throw new InvalidDataException("Unsupported Panorama DATA header");if(block is not PanoramaStyle css)throw new InvalidDataException("Expected Panorama stylesheet");var prefix=original.Length-css.Data.Length;if(prefix<6)throw new InvalidDataException("Unsupported Panorama CSS framing");var data=new byte[prefix+content.Length];original[..prefix].CopyTo(data);content.CopyTo(data,prefix);BitConverter.GetBytes(Crc(content)).CopyTo(data,0);return data;}
 public static void Run(string manifest){
  var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty HUD request");var result=new List<object>();
  foreach(var f in q.Files){try{
   var bytes=File.ReadAllBytes(f.Input);using var r=new Resource{FileName=f.Input};r.Read(f.Input);
   if(f.ImageOutput is not null){if(r.DataBlock is Panorama vector){File.WriteAllBytes(f.ImageOutput,vector.Data);result.Add(new{image=true});continue;}if(r.DataBlock is not Texture t)throw new InvalidDataException("Expected texture");if(t.Width>8192||t.Height>8192)throw new InvalidDataException("HUD image too large");using var bitmap=t.GenerateBitmap();using var image=SkiaSharp.SKImage.FromBitmap(bitmap);using var png=image.Encode(SkiaSharp.SKEncodedImageFormat.Png,100);File.WriteAllBytes(f.ImageOutput,png.ToArray());result.Add(new{image=true});continue;}
   if(r.ResourceType==ResourceType.PanoramaScript&&r.DataBlock is Panorama script){result.Add(new{script=Encoding.UTF8.GetString(script.Data).TrimEnd('\0')});continue;}
   if(r.DataBlock is PanoramaStyle css){result.Add(new{css=Encoding.UTF8.GetString(css.Data).TrimEnd('\0'),references=r.ExternalReferences?.ResourceRefInfoList.Select(x=>x.Name).ToArray()??[]});if(f.Output is not null&&f.CssAppend is not null){var content=Encoding.UTF8.GetBytes(Encoding.UTF8.GetString(css.Data).TrimEnd('\0')+"\n"+f.CssAppend+(css.Data.Length>0&&css.Data[^1]==0?"\0":""));var data=DataWithCrc(r,bytes,content);using(var output=File.Create(f.Output))Program.SerializePatchedResource(r,bytes,output,false,preserveMetadata:true,rawBlocks:new Dictionary<object,byte[]>{{css,data}});using var check=new Resource{FileName=f.Input};using var checkStream=File.OpenRead(f.Output);check.Read(checkStream);if(check.DataBlock is not PanoramaStyle writtenCss||!writtenCss.Data.AsSpan().SequenceEqual(content))throw new InvalidDataException("HUD CSS roundtrip failed");}continue;}
   if(r.DataBlock is not PanoramaLayout)throw new InvalidDataException("Expected Panorama layout");
   var block=r.GetBlockByType(BlockType.LaCo) as BinaryKV3??throw new InvalidDataException("Layout has no editable LaCo AST");
   var ast=block.AsKeyValueCollection()["m_AST"]["m_pRoot"];
   var panels=Walk(ast).Where(n=>Str(n,"eType")=="PANEL").ToArray();
   string Target(KVObject n){var id=Attr(n,"id");return id!=""&&panels.Count(x=>Attr(x,"id")==id)==1?id:"@"+Array.IndexOf(panels,n);}
   object? Tree(KVObject n,int depth=0){if(depth>128)throw new InvalidDataException("HUD tree too deep");var type=Str(n,"eType");if(type=="PANEL")return new{target=Target(n),kind=Str(n,"name"),attributes=Children(n).Where(c=>Str(c,"eType")=="PANEL_ATTRIBUTE").GroupBy(c=>Str(c,"name")).ToDictionary(g=>g.Key,g=>Str(g.Last()["child"],"name")),children=Children(n).Where(c=>Str(c,"eType")!="PANEL_ATTRIBUTE").Select(c=>Tree(c,depth+1)).Where(c=>c is not null).ToArray()};return null;}
   var includes=Walk(ast).Where(n=>Str(n,"eType")=="INCLUDE").Select(n=>n.TryGetValue("child",out var c)?Str(c,"name"):"").Where(n=>n!="").ToArray();
   var snippets=Walk(ast).Where(n=>Str(n,"eType")=="SNIPPET").Select(n=>new{name=Str(n,"name"),children=Children(n).Select(c=>Tree(c)).Where(c=>c is not null).ToArray()}).ToArray();
   result.Add(new{panels=panels.Select(n=>new{id=Target(n),label=Attr(n,"id")!=""?Attr(n,"id"):Str(n,"name")+" ["+Array.IndexOf(panels,n)+"]",kind=Str(n,"name"),text=Attr(n,"text"),image=Attr(n,"src"),style=Attr(n,"style"),classes=Attr(n,"class")}).ToArray(),tree=Children(ast).Select(n=>Tree(n)).Where(n=>n is not null).ToArray(),snippets,includes,references=r.ExternalReferences?.ResourceRefInfoList.Select(x=>x.Name).ToArray()??[]});
   if(f.Output is not null)throw new InvalidDataException("HUD layout rewriting is disabled after a Dota load failure. Export stylesheets and textures only.");
  }catch(Exception e)when(f.Output is null&&f.ImageOutput is null){result.Add(new{error=e.Message});}
  }
  File.WriteAllText(q.Response,JsonSerializer.Serialize(result));Console.WriteLine("[OK] HUD Creator: "+q.Files.Length+" layouts");
 }
}
