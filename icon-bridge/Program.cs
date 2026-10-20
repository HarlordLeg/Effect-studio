using System.Text.Json;
using SkiaSharp;
using ValveResourceFormat.IO;
using ValveResourceFormat.ResourceTypes;
internal static class Program
{
 private sealed record Thumbnail(string Texture,string Output);
 private sealed record Request(string[] Archives,string[]? AssetDirectories,Thumbnail[] ThumbnailTextures,string ThumbnailReport);
 public static int Main(string[] args)
 {
  try{
   if(args.Length==1&&args[0]=="--capabilities"){Console.WriteLine("{\"version\":\"1.1.0\",\"thumbnailBatchV1\":true}");return 0;}
   if(args.Length!=1)throw new ArgumentException("Usage: DotaIconBridge request.json");
   var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(args[0]),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty thumbnail request");
   if(request.ThumbnailTextures is null||request.ThumbnailTextures.Length>256||string.IsNullOrWhiteSpace(request.ThumbnailReport))throw new InvalidDataException("Invalid thumbnail batch");
   using var loader=new GameFileLoader(null,null);
   foreach(var archive in request.Archives)loader.AddPackageToSearch(Path.GetFullPath(archive));
   foreach(var directory in request.AssetDirectories??[])loader.AddDiskPathToSearch(Path.GetFullPath(directory));
   var report=new List<object>();
   foreach(var row in request.ThumbnailTextures){
    try{
     if(!new[]{"panorama/images/econ/","panorama/images/heroes/","panorama/images/spellicons/","panorama/images/items/"}.Any(prefix=>row.Texture.StartsWith(prefix,StringComparison.Ordinal))||!row.Texture.EndsWith(".vtex_c",StringComparison.Ordinal)||row.Texture.Split('/').Any(p=>p is ".." or "." or "")||row.Texture.Contains('\\'))throw new InvalidDataException("Invalid icon texture");
     using var image=loader.LoadFile(row.Texture)??throw new FileNotFoundException("Icon texture missing: "+row.Texture);
     if(image.DataBlock is not Texture texture)throw new InvalidDataException("Icon resource is not a texture");
     using var bitmap=texture.GenerateBitmap();using var png=bitmap.Encode(SKEncodedImageFormat.Png,100);
     var target=Path.GetFullPath(row.Output);Directory.CreateDirectory(Path.GetDirectoryName(target)!);File.WriteAllBytes(target,png.ToArray());
     report.Add(new{texture=row.Texture,output=row.Output,status="ready"});
    }catch(Exception error){report.Add(new{texture=row.Texture,output=row.Output,status="error",error=error.Message});}
   }
   var output=Path.GetFullPath(request.ThumbnailReport);Directory.CreateDirectory(Path.GetDirectoryName(output)!);File.WriteAllText(output,JsonSerializer.Serialize(report));
   Console.WriteLine("[OK] Thumbnail batch: "+report.Count);return 0;
  }catch(Exception error){Console.Error.WriteLine(error.ToString());return 1;}
 }
}
