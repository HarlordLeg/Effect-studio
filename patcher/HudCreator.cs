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
 private sealed record Entry(string Input,string? Output=null,Patch[]? Patches=null,string? ImageOutput=null);
 private sealed record Request(Entry[] Files,string Response);
 private static string Str(KVObject n,string k)=>n.TryGetValue(k,out var v)?v.ToString(null):"";
 private static IEnumerable<KVObject> Children(KVObject n)=>n.TryGetValue("vecChildren",out var a)&&a.IsArray?a.Values:n.TryGetValue("child",out var c)?[c]:[];
 private static IEnumerable<KVObject> Walk(KVObject n){yield return n;foreach(var c in Children(n))foreach(var d in Walk(c))yield return d;}
 private static string Attr(KVObject n,string key)=>Children(n).Where(c=>Str(c,"eType")=="PANEL_ATTRIBUTE"&&Str(c,"name")==key).Select(c=>Str(c["child"],"name")).FirstOrDefault()??"";
 private static KVObject Obj(params (string,KVObject)[] pairs){var n=KVObject.Collection();foreach(var(k,v)in pairs)n[k]=v;return n;}
 private static void Add(KVObject parent,KVObject node){
  var arr=KVObject.Array();foreach(var c in Children(parent))arr.Add(c);arr.Add(node);
  // LaCo represents a panel with one child using child, and multiple children using vecChildren.
  // Promote the existing child without changing its attributes, events or resource flags.
  if(Str(parent,"eType")!="PANEL")throw new InvalidDataException("Only PANEL nodes accept HUD children");
  if(parent.ContainsKey("child")){if(parent.ContainsKey("vecChildren"))throw new InvalidDataException("Ambiguous HUD child representation");parent.Remove("child");}
  parent["vecChildren"]=arr;
 }
 private static void Set(KVObject node,string key,string value){
  var existing=Children(node).FirstOrDefault(c=>Str(c,"eType")=="PANEL_ATTRIBUTE"&&Str(c,"name")==key);
  if(existing is not null){existing["child"]["name"]=new KVObject(value);return;}
  Add(node,Obj(("eType",new("PANEL_ATTRIBUTE")),("name",new(key)),("child",Obj(("eType",new("PANEL_ATTRIBUTE_VALUE")),("name",new(value))))));
 }
 private static void AppendReferences(string file,IEnumerable<string> names){
  var list=names.Distinct().ToArray();if(list.Length==0)return;var bytes=File.ReadAllBytes(file);var count=BitConverter.ToUInt32(bytes,12);var directory=8+BitConverter.ToUInt32(bytes,8);var blocks=new List<(string Name,byte[] Data)>();for(var i=0;i<count;i++){var p=checked((int)directory+i*12);var at=checked(p+4+(int)BitConverter.ToUInt32(bytes,p+4));blocks.Add((System.Text.Encoding.ASCII.GetString(bytes,p,4),bytes.AsSpan(at,(int)BitConverter.ToUInt32(bytes,p+8)).ToArray()));}
  using var refs=new MemoryStream();using(var w=new BinaryWriter(refs,System.Text.Encoding.UTF8,true)){w.Write(8u);w.Write((uint)list.Length);var start=8+16*list.Length;for(var i=0;i<list.Length;i++){w.Write(Program.ComputeResourceId(list[i]));w.Write((long)(start-(16+i*16)));start+=System.Text.Encoding.UTF8.GetByteCount(list[i])+1;}foreach(var n in list){w.Write(System.Text.Encoding.UTF8.GetBytes(n));w.Write((byte)0);}}
  blocks.Add(("RERL",refs.ToArray()));using var stream=File.Create(file);using var writer=new BinaryWriter(stream);writer.Write(0u);writer.Write(BitConverter.ToUInt16(bytes,4));writer.Write(BitConverter.ToUInt16(bytes,6));writer.Write(8u);writer.Write((uint)blocks.Count);writer.Write(new byte[blocks.Count*12]);for(var i=0;i<blocks.Count;i++){writer.Write(new byte[(16-stream.Position%16)%16]);var start=stream.Position;writer.Write(blocks[i].Data);var end=stream.Position;stream.Position=16+i*12;writer.Write(System.Text.Encoding.ASCII.GetBytes(blocks[i].Name));writer.Write(checked((uint)(start-(20+i*12))));writer.Write((uint)blocks[i].Data.Length);stream.Position=end;}stream.Position=0;writer.Write((uint)stream.Length);
 }
 public static void Run(string manifest){
  var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty HUD request");var result=new List<object>();
  foreach(var f in q.Files){try{
   var bytes=File.ReadAllBytes(f.Input);using var r=new Resource{FileName=f.Input};r.Read(f.Input);
   if(f.ImageOutput is not null){if(r.DataBlock is Panorama vector){File.WriteAllBytes(f.ImageOutput,vector.Data);result.Add(new{image=true});continue;}if(r.DataBlock is not Texture t)throw new InvalidDataException("Expected texture");if(t.Width>8192||t.Height>8192)throw new InvalidDataException("HUD image too large");using var bitmap=t.GenerateBitmap();using var image=SkiaSharp.SKImage.FromBitmap(bitmap);using var png=image.Encode(SkiaSharp.SKEncodedImageFormat.Png,100);File.WriteAllBytes(f.ImageOutput,png.ToArray());result.Add(new{image=true});continue;}
   if(r.ResourceType==ResourceType.PanoramaScript&&r.DataBlock is Panorama script){result.Add(new{script=Encoding.UTF8.GetString(script.Data).TrimEnd('\0')});continue;}
   if(r.DataBlock is PanoramaStyle css){result.Add(new{css=Encoding.UTF8.GetString(css.Data).TrimEnd('\0'),references=r.ExternalReferences?.ResourceRefInfoList.Select(x=>x.Name).ToArray()??[]});continue;}
   if(r.DataBlock is not PanoramaLayout)throw new InvalidDataException("Expected Panorama layout");
   var block=r.GetBlockByType(BlockType.LaCo) as BinaryKV3??throw new InvalidDataException("Layout has no editable LaCo AST");
   var ast=block.AsKeyValueCollection()["m_AST"]["m_pRoot"];
   var panels=Walk(ast).Where(n=>Str(n,"eType")=="PANEL").ToArray();
   string Target(KVObject n){var id=Attr(n,"id");return id!=""&&panels.Count(x=>Attr(x,"id")==id)==1?id:"@"+Array.IndexOf(panels,n);}
   object? Tree(KVObject n,int depth=0){if(depth>128)throw new InvalidDataException("HUD tree too deep");var type=Str(n,"eType");if(type=="PANEL")return new{target=Target(n),kind=Str(n,"name"),attributes=Children(n).Where(c=>Str(c,"eType")=="PANEL_ATTRIBUTE").GroupBy(c=>Str(c,"name")).ToDictionary(g=>g.Key,g=>Str(g.Last()["child"],"name")),children=Children(n).Where(c=>Str(c,"eType")!="PANEL_ATTRIBUTE").Select(c=>Tree(c,depth+1)).Where(c=>c is not null).ToArray()};return null;}
   var includes=Walk(ast).Where(n=>Str(n,"eType")=="INCLUDE").Select(n=>n.TryGetValue("child",out var c)?Str(c,"name"):"").Where(n=>n!="").ToArray();
   var snippets=Walk(ast).Where(n=>Str(n,"eType")=="SNIPPET").Select(n=>new{name=Str(n,"name"),children=Children(n).Select(c=>Tree(c)).Where(c=>c is not null).ToArray()}).ToArray();
   result.Add(new{panels=panels.Select(n=>new{id=Target(n),label=Attr(n,"id")!=""?Attr(n,"id"):Str(n,"name")+" ["+Array.IndexOf(panels,n)+"]",kind=Str(n,"name"),text=Attr(n,"text"),image=Attr(n,"src"),style=Attr(n,"style"),classes=Attr(n,"class")}).ToArray(),tree=Children(ast).Select(n=>Tree(n)).Where(n=>n is not null).ToArray(),snippets,includes,references=r.ExternalReferences?.ResourceRefInfoList.Select(x=>x.Name).ToArray()??[]});
   if(f.Output is null)continue;
   foreach(var p in f.Patches??[]){
    var matches=p.Target.StartsWith("@")&&int.TryParse(p.Target[1..],out var index)&&index>=0&&index<panels.Length?new[]{panels[index]}:panels.Where(n=>Attr(n,"id")==p.Target).ToArray();if(matches.Length!=1)throw new InvalidDataException("Missing or ambiguous HUD panel: "+p.Target);
    var node=matches[0];
    if(p.Added){if(Walk(ast).Any(n=>Str(n,"eType")=="PANEL"&&Attr(n,"id")==p.Id))throw new InvalidDataException("Duplicate HUD panel id");if(p.Kind is not("Panel" or "Label" or "Image"))throw new InvalidDataException("Unsupported HUD block");var child=Obj(("eType",new("PANEL")),("name",new(p.Kind)),("vecChildren",KVObject.Array()));Set(child,"id",p.Id);Add(node,child);node=child;}
    if(p.Texture is not null&&Str(node,"name")=="Image"){Set(node,"src",p.Texture);Set(node,"scaling",p.ImageFit=="contain"?"stretch-to-fit-preserve-aspect":"stretch-to-fit");var a=Children(node).Single(c=>Str(c,"name")=="src");a["child"]["eType"]=new KVObject("REFERENCE_COMPILED");a["child"]["name"].Flag=KVFlag.Resource;}
    Set(node,"style",Attr(node,"style")+";"+p.Style);if(p.Text is not null)Set(node,"text",p.Text);
   }
   var refs=(f.Patches??[]).Where(p=>p.Texture is not null).Select(p=>p.Texture!).Distinct().ToArray();var changed=new HashSet<object>{block};
   if(r.ExternalReferences is {} rr){foreach(var name in refs)if(!rr.ResourceRefInfoList.Any(n=>n.Name==name))rr.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Id=Program.ComputeResourceId(name),Name=name});changed.Add(rr);}
   using(var output=File.Create(f.Output))Program.SerializePatchedResource(r,bytes,output,false,changed,preserveMetadata:true);
   if(r.ExternalReferences is null)AppendReferences(f.Output,refs);
   using var verify=new Resource{FileName=f.Output};verify.Read(f.Output);if(verify.GetBlockByType(BlockType.LaCo) is not BinaryKV3 written||JsonSerializer.Serialize(EditorResources.Describe(written.AsKeyValueCollection()))!=JsonSerializer.Serialize(EditorResources.Describe(block.AsKeyValueCollection())))throw new InvalidDataException("HUD layout roundtrip failed");
  }catch(Exception e)when(f.Output is null&&f.ImageOutput is null){result.Add(new{error=e.Message});}
  }
  File.WriteAllText(q.Response,JsonSerializer.Serialize(result));Console.WriteLine("[OK] HUD Creator: "+q.Files.Length+" layouts");
 }
}
