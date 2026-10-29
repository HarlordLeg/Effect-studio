using System.Text;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;
using ValveResourceFormat.Serialization.KeyValues;
using ValveResourceFormat.Blocks;

internal static class HudCreator
{
 private sealed record Patch(string Target,string Id,string Kind,string Style,string? Text=null,bool Added=false,string? Texture=null);
 private sealed record Entry(string Input,string? Output=null,Patch[]? Patches=null,string? ImageOutput=null);
 private sealed record Request(Entry[] Files,string Response);
 private static string Str(KVObject n,string k)=>n.TryGetValue(k,out var v)?v.ToString(null):"";
 private static IEnumerable<KVObject> Children(KVObject n)=>n.TryGetValue("vecChildren",out var a)&&a.IsArray?a.Values:n.TryGetValue("child",out var c)?[c]:[];
 private static IEnumerable<KVObject> Walk(KVObject n){yield return n;foreach(var c in Children(n))foreach(var d in Walk(c))yield return d;}
 private static string Attr(KVObject n,string key)=>Children(n).Where(c=>Str(c,"eType")=="PANEL_ATTRIBUTE"&&Str(c,"name")==key).Select(c=>Str(c["child"],"name")).FirstOrDefault()??"";
 private static KVObject Obj(params (string,KVObject)[] pairs){var n=KVObject.Collection();foreach(var(k,v)in pairs)n[k]=v;return n;}
 private static void Add(KVObject parent,KVObject node){
  var arr=KVObject.Array();foreach(var c in Children(parent))arr.Add(c);arr.Add(node);
  // PANEL nodes in LaCo use vecChildren. Refuse the single-child AST form rather than duplicating it.
  if(parent.ContainsKey("child"))throw new InvalidDataException("Single-child panel AST is not writable");
  parent["vecChildren"]=arr;
 }
 private static void Set(KVObject node,string key,string value){
  var existing=Children(node).FirstOrDefault(c=>Str(c,"eType")=="PANEL_ATTRIBUTE"&&Str(c,"name")==key);
  if(existing is not null){existing["child"]["name"]=new KVObject(value);return;}
  Add(node,Obj(("eType",new("PANEL_ATTRIBUTE")),("name",new(key)),("child",Obj(("eType",new("PANEL_ATTRIBUTE_VALUE")),("name",new(value))))));
 }
 public static void Run(string manifest){
  var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty HUD request");var result=new List<object>();
  foreach(var f in q.Files){
   var bytes=File.ReadAllBytes(f.Input);using var r=new Resource{FileName=f.Input};r.Read(f.Input);
   if(f.ImageOutput is not null){if(r.DataBlock is not Texture t)throw new InvalidDataException("Expected texture");using var bitmap=t.GenerateBitmap();using var image=SkiaSharp.SKImage.FromBitmap(bitmap);using var png=image.Encode(SkiaSharp.SKEncodedImageFormat.Png,100);File.WriteAllBytes(f.ImageOutput,png.ToArray());result.Add(new{image=true});continue;}
   if(r.DataBlock is not PanoramaLayout)throw new InvalidDataException("Expected Panorama layout");
   var block=r.GetBlockByType(BlockType.LaCo) as BinaryKV3??throw new InvalidDataException("Layout has no editable LaCo AST");
   var ast=block.AsKeyValueCollection()["m_AST"]["m_pRoot"];
   var panels=Walk(ast).Where(n=>Str(n,"eType")=="PANEL").ToArray();
   result.Add(new{panels=panels.Select((n,i)=>new{id=Attr(n,"id")!=""&&panels.Count(x=>Attr(x,"id")==Attr(n,"id"))==1?Attr(n,"id"):"@"+i,label=Attr(n,"id")!=""?Attr(n,"id"):Str(n,"name")+" ["+i+"]",kind=Str(n,"name"),text=Attr(n,"text"),image=Attr(n,"src"),style=Attr(n,"style"),classes=Attr(n,"class")}).ToArray()});
   if(f.Output is null)continue;
   foreach(var p in f.Patches??[]){
    var matches=p.Target.StartsWith("@")&&int.TryParse(p.Target[1..],out var index)&&index>=0&&index<panels.Length?new[]{panels[index]}:panels.Where(n=>Attr(n,"id")==p.Target).ToArray();if(matches.Length!=1)throw new InvalidDataException("Missing or ambiguous HUD panel: "+p.Target);
    var node=matches[0];
    if(p.Added){if(Walk(ast).Any(n=>Str(n,"eType")=="PANEL"&&Attr(n,"id")==p.Id))throw new InvalidDataException("Duplicate HUD panel id");if(p.Kind is not("Panel" or "Label" or "Image"))throw new InvalidDataException("Unsupported HUD block");var child=Obj(("eType",new("PANEL")),("name",new(p.Kind)),("vecChildren",KVObject.Array()));Set(child,"id",p.Id);Add(node,child);node=child;}
    if(p.Texture is not null&&Str(node,"name")=="Image"){Set(node,"src",p.Texture);var a=Children(node).Single(c=>Str(c,"name")=="src");a["child"]["eType"]=new KVObject("REFERENCE_COMPILED");a["child"]["name"].Flag=KVFlag.Resource;}
    Set(node,"style",Attr(node,"style")+";"+p.Style);if(p.Text is not null)Set(node,"text",p.Text);
   }
   var refs=(f.Patches??[]).Where(p=>p.Texture is not null).Select(p=>p.Texture!).Distinct().ToArray();var changed=new HashSet<object>{block};
   if(r.ExternalReferences is {} rr){foreach(var name in refs)if(!rr.ResourceRefInfoList.Any(n=>n.Name==name))rr.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Id=Program.ComputeResourceId(name),Name=name});changed.Add(rr);}
   using(var output=File.Create(f.Output))Program.SerializePatchedResource(r,bytes,output,false,changed,preserveMetadata:true);
   if(r.ExternalReferences is null)EditorResources.AppendReferences(f.Output,refs);
   using var verify=new Resource{FileName=f.Output};verify.Read(f.Output);if(verify.GetBlockByType(BlockType.LaCo) is not BinaryKV3 written||JsonSerializer.Serialize(EditorResources.Describe(written.AsKeyValueCollection()))!=JsonSerializer.Serialize(EditorResources.Describe(block.AsKeyValueCollection())))throw new InvalidDataException("HUD layout roundtrip failed");
  }
  File.WriteAllText(q.Response,JsonSerializer.Serialize(result));Console.WriteLine("[OK] HUD Creator: "+q.Files.Length+" layouts");
 }
}
