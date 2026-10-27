using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

internal static class EditorResources
{
 internal sealed record Edit(string Op,string[] Path,JsonElement Value,int Index=0,int To=0);
 private sealed record Entry(string Input,string? Output,Edit[]? Edits);
 private sealed record Request(Entry[] Files,string? Response=null);
 private static readonly HashSet<string> Groups=["m_Emitters","m_Initializers","m_Operators","m_Renderers","m_PreEmissionOperators","m_Children"];
 private static readonly Dictionary<string,(string Group,string Field,float Value)[]> Registry=new(){
  ["C_OP_InstantaneousEmitter"]=[("m_Emitters","m_nParticlesToEmit",10)],
  ["C_OP_ContinuousEmitter"]=[("m_Emitters","m_flEmitRate",10)],
  ["C_INIT_RandomLifeTime"]=[("m_Initializers","m_fLifetimeMin",1),("m_Initializers","m_fLifetimeMax",2)],
  ["C_INIT_RandomRadius"]=[("m_Initializers","m_flRadiusMin",1),("m_Initializers","m_flRadiusMax",3)],
  ["C_OP_Decay"]=[]};
 private static object? ScalarValue(KVObject n)=>n.ValueType switch{
  KVValueType.String or KVValueType.Int64 or KVValueType.UInt64 or KVValueType.BinaryBlob=>n.ToString(CultureInfo.InvariantCulture),
  KVValueType.Boolean=>n.ToBoolean(CultureInfo.InvariantCulture),
  KVValueType.FloatingPoint or KVValueType.FloatingPoint64=>n.ToDouble(CultureInfo.InvariantCulture),
  KVValueType.Int16 or KVValueType.Int32=>n.ToInt32(CultureInfo.InvariantCulture),
  KVValueType.UInt16 or KVValueType.UInt32=>n.ToUInt32(CultureInfo.InvariantCulture),_=>null};
 internal static object Describe(KVObject n)=>new{type=n.ValueType.ToString(),flag=n.Flag.ToString(),value=n.IsArray?n.Values.Select(Describe).ToArray():n.IsCollection?(object)n.ToDictionary(p=>p.Key,p=>Describe(p.Value)):ScalarValue(n)};
 private static KVObject At(KVObject n,IEnumerable<string> path){foreach(var key in path){if(key is "__proto__" or "prototype" or "constructor")throw new InvalidDataException("Invalid property");n=n.IsArray?n[int.Parse(key,CultureInfo.InvariantCulture)]:n[key];}return n;}
 private static KVObject Scalar(KVObject old,JsonElement value){
  if(old.IsCollection||old.IsArray)throw new InvalidDataException("Edit scalar leaves individually");
  KVObject n=old.ValueType switch{
   KVValueType.String=>new(value.GetString()??throw new InvalidDataException("Null string")),KVValueType.Boolean=>new(value.GetBoolean()),
   KVValueType.Int16=>new(value.GetInt16()),KVValueType.UInt16=>new(value.GetUInt16()),KVValueType.Int32=>new(value.GetInt32()),KVValueType.UInt32=>new(value.GetUInt32()),
   KVValueType.Int64=>new(long.Parse(value.GetString()!,CultureInfo.InvariantCulture)),KVValueType.UInt64=>new(ulong.Parse(value.GetString()!,CultureInfo.InvariantCulture)),
   KVValueType.FloatingPoint=>new(value.GetSingle()),KVValueType.FloatingPoint64=>new(value.GetDouble()),_=>throw new InvalidDataException("Read-only native type: "+old.ValueType)};
  if(n.ValueType is KVValueType.FloatingPoint or KVValueType.FloatingPoint64&&!double.IsFinite(n.ToDouble(CultureInfo.InvariantCulture)))throw new InvalidDataException("Non-finite value");n.Flag=old.Flag;return n;
 }
 private static KVObject Clone(KVObject n){if(!n.IsArray&&!n.IsCollection)return n;var copy=n.IsArray?KVObject.Array():KVObject.Collection();if(n.IsArray){foreach(var v in n.Values)copy.Add(Clone(v));}else foreach(var(k,v)in n)copy.Add(k,Clone(v));copy.Flag=n.Flag;return copy;}
 private static KVObject Replace(KVObject n,string[] path,int depth,KVObject replacement){if(depth==path.Length)return replacement;if(n.IsArray){var index=int.Parse(path[depth],CultureInfo.InvariantCulture);if(index<0||index>=n.Count)throw new InvalidDataException("Array index out of range");var copy=KVObject.Array();var i=0;foreach(var child in n.Values)copy.Add(i++==index?Replace(child,path,depth+1,replacement):child);copy.Flag=n.Flag;return copy;}var key=path[depth];n[key]=Replace(n[key],path,depth+1,replacement);return n;}
 private static void Recolor(KVObject root,JsonElement value){var rgb=value.EnumerateArray().Select(v=>v.GetInt32()).ToArray();if(rgb.Length!=3||rgb.Any(v=>v<0||v>255))throw new InvalidDataException("Expected RGB bytes");
  KVObject Component(KVObject old,int c)=>Scalar(old,old.ValueType is KVValueType.Int64 or KVValueType.UInt64?JsonSerializer.SerializeToElement(c.ToString(CultureInfo.InvariantCulture)):JsonSerializer.SerializeToElement(c));
  KVObject Color(KVObject old){if(old.IsArray){var copy=KVObject.Array();int i=0;foreach(var n in old.Values)copy.Add(i<3?Component(n,rgb[i++]):n);copy.Flag=old.Flag;return copy;}if(old.IsCollection){var copy=Clone(old);var keys=new[]{"x","y","z"};if(!copy.ContainsKey("x"))keys=new[]{"r","g","b"};for(int i=0;i<3;i++)if(copy.TryGetValue(keys[i],out var n))copy[keys[i]]=Component(n,rgb[i]);return copy;}return old;}
  void Visit(KVObject node){if(node.IsArray){foreach(var v in node.Values)Visit(v);}else if(node.IsCollection){foreach(var key in node.Keys.ToArray()){if(key is "m_ConstantColor" or "m_ColorMin" or "m_ColorMax" or "m_ColorFade")node[key]=Color(node[key]);else if(key!="m_Children")Visit(node[key]);}}}
  Visit(root);if(!root.ContainsKey("m_ConstantColor")){var color=KVObject.Array();foreach(var c in rgb)color.Add(new KVObject((float)c));root["m_ConstantColor"]=color;}
 }
 internal static void Apply(KVObject root,Edit e,bool particle){
  if(e.Path.Length<1||e.Path.Length>40)throw new InvalidDataException("Invalid edit path");var key=e.Path[^1];
  if(e.Op=="color"){if(!particle)throw new InvalidDataException("Particle color only");Recolor(root,e.Value);return;}
  if(e.Op=="set"){if(key is "_class" or "m_shaderName" or "m_name")throw new InvalidDataException("Identity is read-only");Replace(root,e.Path,0,Scalar(At(root,e.Path),e.Value));return;}
  if(!particle||e.Path.Length!=1||!Groups.Contains(key))throw new InvalidDataException("Structural edits only allowed on particle groups");var array=root.TryGetValue(key,out var a)?a:KVObject.Array();if(!array.IsArray)throw new InvalidDataException("Expected operator array");var rows=array.Values.ToList();
  if(e.Op=="add"){var name=e.Value.GetString()!;if(!Registry.TryGetValue(name,out var fields)||name=="C_OP_Decay"&&key!="m_Operators"||fields.Length>0&&fields[0].Group!=key)throw new InvalidDataException("Unsupported operator/group");var op=KVObject.Collection();op["_class"]=new KVObject(name);foreach(var f in fields){if(name is "C_OP_ContinuousEmitter" or "C_OP_InstantaneousEmitter"){var literal=KVObject.Collection();literal["m_nType"]=new KVObject("PF_TYPE_LITERAL");literal["m_flLiteralValue"]=new KVObject(f.Value);op[f.Field]=literal;}else op[f.Field]=new KVObject(f.Value);}rows.Add(op);}
  else if(e.Op=="child"){var name=e.Value.GetString()!;if(key!="m_Children"||!name.StartsWith("particles/")||!name.EndsWith(".vpcf")||name.Contains("..")||name.Contains('\\'))throw new InvalidDataException("Invalid child resource");var child=KVObject.Collection();child["m_ChildRef"]=new KVObject(name){Flag=KVFlag.Resource};rows.Add(child);}
  else{if(e.Index<0||e.Index>=rows.Count)throw new InvalidDataException("Operator index out of range");if(e.Op=="remove")rows.RemoveAt(e.Index);else if(e.Op=="duplicate")rows.Insert(e.Index+1,Clone(rows[e.Index]));else if(e.Op=="move"){if(e.To<0||e.To>=rows.Count)throw new InvalidDataException("Destination out of range");var row=rows[e.Index];rows.RemoveAt(e.Index);rows.Insert(e.To,row);}else throw new InvalidDataException("Unknown operation");}
  if(rows.Count>4096)throw new InvalidDataException("Too many operators");var result=KVObject.Array();foreach(var row in rows)result.Add(row);root[key]=result;
 }
 private static IEnumerable<string> Refs(KVObject n){if(n.ValueType==KVValueType.String&&n.Flag==KVFlag.Resource)yield return n.ToString(CultureInfo.InvariantCulture);if(n.IsArray||n.IsCollection)foreach(var v in n.Values)foreach(var name in Refs(v))yield return name;}
 private static void LegacyMaterial(Resource r,Material material,byte[] bytes,Edit[] edits){
  var ntro=r.GetBlockByType(BlockType.NTRO) as ResourceIntrospectionManifest??throw new InvalidDataException("Missing NTRO schema");var schema=ntro.ReferencedStructs.First(s=>s.Name=="MaterialResourceData_t");
  foreach(var e in edits){if(e.Op!="set"||e.Path.Length<3||!new[]{"m_value","m_pValue"}.Contains(e.Path[2])||!new[]{"m_intParams","m_floatParams","m_vectorParams","m_textureParams"}.Contains(e.Path[0]))throw new InvalidDataException("NTRO: existing numeric/vector/texture value slots only");var field=schema.FieldIntrospection.First(f=>f.FieldName==e.Path[0]);if(field.Indirections.Count!=1||field.Indirections[0]!=4)throw new InvalidDataException("Unsupported NTRO array");var type=ntro.GetStructById(field.TypeData)??throw new InvalidDataException("Missing parameter schema");var value=type.FieldIntrospection.First(f=>f.FieldName==e.Path[2]);var p=checked((int)material.Offset+field.OnDiskOffset);var count=BitConverter.ToInt32(bytes,p+4);var index=int.Parse(e.Path[1],CultureInfo.InvariantCulture);if(index<0||index>=count)throw new InvalidDataException("Invalid parameter index");var at=checked(p+BitConverter.ToInt32(bytes,p)+index*type.DiskSize+value.OnDiskOffset);
   if(e.Path[0]=="m_vectorParams"){if(e.Path.Length!=4)throw new InvalidDataException("Edit one vector component");var c=e.Path[3] switch{"x"=>0,"y"=>1,"z"=>2,"w"=>3,_=>int.Parse(e.Path[3],CultureInfo.InvariantCulture)};if(c<0||c>3)throw new InvalidDataException("Invalid component");at+=c*4;}var replacement=Scalar(At(material.Data,e.Path),e.Value);var width=e.Path[0]=="m_textureParams"?8:4;if(at<material.Offset||at+width>material.Offset+material.Size)throw new InvalidDataException("Parameter outside DATA");var payload=e.Path[0]=="m_textureParams"?BitConverter.GetBytes(Program.ComputeResourceId(replacement.ToString(CultureInfo.InvariantCulture))):e.Path[0]=="m_intParams"?BitConverter.GetBytes(replacement.ToInt32(CultureInfo.InvariantCulture)):BitConverter.GetBytes(replacement.ToSingle(CultureInfo.InvariantCulture));payload.CopyTo(bytes,at);Apply(material.Data,e,false);
  }
 }
 private static void AppendReferences(string file,IEnumerable<string> names){
  var list=names.Distinct().ToArray();if(list.Length==0)return;var bytes=File.ReadAllBytes(file);var count=BitConverter.ToUInt32(bytes,12);var directory=8+BitConverter.ToUInt32(bytes,8);var blocks=new List<(string Name,byte[] Data)>();for(var i=0;i<count;i++){var p=checked((int)directory+i*12);var at=checked(p+4+(int)BitConverter.ToUInt32(bytes,p+4));blocks.Add((System.Text.Encoding.ASCII.GetString(bytes,p,4),bytes.AsSpan(at,(int)BitConverter.ToUInt32(bytes,p+8)).ToArray()));}
  using var refs=new MemoryStream();using(var w=new BinaryWriter(refs,System.Text.Encoding.UTF8,true)){w.Write(8u);w.Write((uint)list.Length);var start=8+16*list.Length;for(var i=0;i<list.Length;i++){w.Write(Program.ComputeResourceId(list[i]));w.Write((long)(start-(16+i*16)));start+=System.Text.Encoding.UTF8.GetByteCount(list[i])+1;}foreach(var n in list){w.Write(System.Text.Encoding.UTF8.GetBytes(n));w.Write((byte)0);}}
  blocks.Add(("RERL",refs.ToArray()));using var stream=File.Create(file);using var writer=new BinaryWriter(stream);writer.Write(0u);writer.Write(BitConverter.ToUInt16(bytes,4));writer.Write(BitConverter.ToUInt16(bytes,6));writer.Write(8u);writer.Write((uint)blocks.Count);writer.Write(new byte[blocks.Count*12]);for(var i=0;i<blocks.Count;i++){writer.Write(new byte[(16-stream.Position%16)%16]);var start=stream.Position;writer.Write(blocks[i].Data);var end=stream.Position;stream.Position=16+i*12;writer.Write(System.Text.Encoding.ASCII.GetBytes(blocks[i].Name));writer.Write(checked((uint)(start-(20+i*12))));writer.Write((uint)blocks[i].Data.Length);stream.Position=end;}stream.Position=0;writer.Write((uint)stream.Length);
 }
 public static void Run(string manifest){
  var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty editor request");var output=new List<object>();foreach(var f in request.Files){var bytes=File.ReadAllBytes(f.Input);using var r=new Resource{FileName=f.Input};r.Read(f.Input);var root=r.DataBlock switch{Material m=>m.Data,ParticleSystem p=>p.Data,_=>throw new InvalidDataException("Expected material/particle")};var legacy=r.ContainsBlockType(BlockType.NTRO);var writable=!legacy||r.DataBlock is Material;
   if(f.Output is not null){if(!writable)throw new InvalidDataException("NTRO particle is read-only");if(legacy)LegacyMaterial(r,(Material)r.DataBlock!,bytes,f.Edits??[]);else foreach(var e in f.Edits??[])Apply(root,e,r.DataBlock is ParticleSystem);var refs=Refs(root).Distinct().ToArray();if(r.ExternalReferences is {} rr)foreach(var name in refs)if(!rr.ResourceRefInfoList.Any(x=>x.Name==name))rr.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Id=Program.ComputeResourceId(name),Name=name});using(var stream=File.Create(f.Output))Program.SerializePatchedResource(r,bytes,stream,!legacy,r.ExternalReferences is {} changed?new HashSet<object>{changed}:null,preserveMetadata:true);if(r.ExternalReferences is null)AppendReferences(f.Output,refs);using var check=new Resource{FileName=f.Output};check.Read(f.Output);var result=check.DataBlock switch{Material m=>m.Data,ParticleSystem p=>p.Data,_=>throw new InvalidDataException("Invalid output")};if(JsonSerializer.Serialize(Describe(root))!=JsonSerializer.Serialize(Describe(result)))throw new InvalidDataException("Native round-trip verification failed");}
   output.Add(new{kind=r.DataBlock is Material?"material":"particle",writable,legacy,tree=Describe(root),references=(r.ExternalReferences?.ResourceRefInfoList.Select(x=>x.Name)??[]).Concat(Refs(root)).Distinct().ToArray(),registry=Registry.Keys});
  }var json=JsonSerializer.Serialize(new{resources=output});if(request.Response is null)Console.WriteLine(json);else{File.WriteAllText(request.Response,json);Console.WriteLine("[OK] Editor resources validated: "+output.Count);}
 }
}
