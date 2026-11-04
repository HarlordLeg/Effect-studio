using System.Buffers.Binary;
using System.Numerics;using System.Text.Json;using ValveKeyValue;using ValveKeyValue.KeyValues3;using ValveResourceFormat;using ValveResourceFormat.Blocks;using ValveResourceFormat.ResourceTypes;
// Added-effect geometry only. Never delete bones from an animated game model.
internal static class ItemEffectScope {
 private sealed record Particle(string Input,string Output);
 private sealed record Request(string Input,string Host,string Snapshot,string SnapshotName,string Report,Particle[] Particles,string[]? Snapshots=null,Dictionary<string,string>? Meshes=null);
 internal sealed record Point(Vector3 Position,string[] Bones,float[] Weights);
 static ulong Mask(KVObject v){var s=v.ToString(System.Globalization.CultureInfo.InvariantCulture);return s.StartsWith('-')?unchecked((ulong)long.Parse(s,System.Globalization.CultureInfo.InvariantCulture)):ulong.Parse(s,System.Globalization.CultureInfo.InvariantCulture);}
 static KVObject A(IEnumerable<KVObject> rows)=>KVObject.Array(rows);
 static KVObject Row(params (string,KVObject)[] fields){var r=KVObject.Collection();foreach(var(k,v)in fields)r[k]=v;return r;}
 // Mesh vertices can be authored in a bind pose different from the model/hero.
 // Snapshots have no per-mesh inverse binds: bake that difference into their points.
 static Dictionary<string,Matrix4x4> Poses(Model model,Dictionary<string,Matrix4x4>? shared=null){
  var sk=model.Data["m_modelSkeleton"];var names=sk["m_boneName"].Values.Select(v=>v.ToString(null)).ToArray();var parents=sk["m_nParent"].Values.Select(v=>v.ToInt32(null)).ToArray();var pos=sk["m_bonePosParent"].Values.ToArray();var rot=sk["m_boneRotParent"].Values.ToArray();var scales=sk.TryGetValue("m_boneScaleParent",out var a)?a.Values.ToArray():[];var result=new Dictionary<string,Matrix4x4>(StringComparer.OrdinalIgnoreCase);var visiting=new HashSet<int>();
  Matrix4x4 Pose(int i){if(result.TryGetValue(names[i],out var done))return done;if(shared is not null&&shared.TryGetValue(names[i],out done)){result[names[i]]=done;return done;}if(!visiting.Add(i))throw new InvalidDataException("Cyclic item skeleton");var p=pos[i].Values.Select(v=>v.ToSingle(null)).ToArray();var q=rot[i].Values.Select(v=>v.ToSingle(null)).ToArray();var scale=scales.Length==0?1:scales[i].ToSingle(null);var local=Matrix4x4.CreateScale(scale)*Matrix4x4.CreateFromQuaternion(new Quaternion(q[0],q[1],q[2],q[3]))*Matrix4x4.CreateTranslation(p[0],p[1],p[2]);var parent=parents[i];if(parent>=0)local*=Pose(parent);visiting.Remove(i);result.Add(names[i],local);return local;}
  for(int i=0;i<names.Length;i++)Pose(i);return result;
 }
 static Matrix4x4 MeshInverse(KVObject value){var f=value.Values.Select(v=>v.ToSingle(null)).ToArray();if(f.Length!=12||f.Any(v=>!float.IsFinite(v)))throw new InvalidDataException("Invalid mesh inverse bind pose");return new(f[0],f[4],f[8],0,f[1],f[5],f[9],0,f[2],f[6],f[10],0,f[3],f[7],f[11],1);}
 internal static Vector3 RebasePoint(Vector3 position,string[] bones,float[] weights,IReadOnlyDictionary<string,Matrix4x4> inverse,IReadOnlyDictionary<string,Matrix4x4> target){var result=Vector3.Zero;for(int i=0;i<weights.Length;i++){if(weights[i]<=0)continue;if(!inverse.TryGetValue(bones[i],out var inv)||!target.TryGetValue(bones[i],out var pose))throw new InvalidDataException("No bind pose for effect bone: "+bones[i]);result+=Vector3.Transform(position,inv*pose)*weights[i];}return result;}
 internal static (ushort[] Indices,Vector4[] Weights) Skin(int count,ushort[]? indices,Vector4[]? weights,int? rigid=null){
  if(indices is null){if(rigid is null||rigid<0||rigid>ushort.MaxValue)throw new InvalidDataException("Item has no skin stream or unambiguous rigid bone");indices=new ushort[count*4];for(int i=0;i<count;i++)indices[i*4]=(ushort)rigid.Value;}
  if(indices.Length!=count*4)throw new InvalidDataException("Unsupported item skin index layout");
  // Valve rigid vertex streams can have BLENDINDICES but no BLENDWEIGHT:
  // the first joint has full weight. Do not substitute the hero's root.
  weights??=Enumerable.Repeat(new Vector4(1,0,0,0),count).ToArray();if(weights.Length!=count)throw new InvalidDataException("Unsupported item skin weight layout");return(indices,weights);
 }
 static int? RigidBone(Model model,Mesh mesh,int index){var names=model.Skeleton.Bones.Select(b=>b.Name).ToArray();if(names.Length==1)return 0;var remap=model.GetRemapTable(index);if(remap?.Distinct().ToArray() is {Length:1} unique)return unique[0];if(mesh.Data.TryGetValue("m_skeleton",out var sk)&&sk.TryGetValue("m_bones",out var rows)){var used=rows.Values.Where(b=>b.TryGetValue("m_flSphereRadius",out var r)&&r.ToSingle(null)>0).ToArray();if(used.Length==1){var found=Array.FindIndex(names,n=>string.Equals(n,used[0]["m_boneName"].ToString(null),StringComparison.OrdinalIgnoreCase));if(found>=0)return found;}}return null;}
 // Only follow actual rendered triangle edges. Nearby disconnected pieces
 // must not create an effect bridge across empty space.
 static void SampleDrawEdges(Mesh mesh,int vertexBufferIndex,KVObject call,Point?[] vertices,List<Point> points){
  if(!call.TryGetValue("m_vertexBuffers",out var bindings)||!call.TryGetValue("m_indexBuffer",out var indexBinding)||
     !call.TryGetValue("m_nStartIndex",out var start)||!call.TryGetValue("m_nIndexCount",out var count))return;
  if(!bindings.Values.Any(b=>b["m_hBuffer"].ToInt32(null)==vertexBufferIndex&&
      (!b.TryGetValue("m_nBindOffsetBytes",out var offset)||offset.ToInt32(null)==0)))return;
  if(indexBinding.TryGetValue("m_nBindOffsetBytes",out var indexOffset)&&indexOffset.ToInt32(null)!=0)return;
  var indexBufferId=indexBinding["m_hBuffer"].ToInt32(null);
  if((uint)indexBufferId>=mesh.VBIB.IndexBuffers.Count)return;
  var index=mesh.VBIB.IndexBuffers[indexBufferId];
  int size=(int)index.ElementSizeInBytes,length=count.ToInt32(null),first=start.ToInt32(null),baseVertex=call["m_nBaseVertex"].ToInt32(null);
  if(size is not (2 or 4)||first<0||length<0||length%3!=0||(long)first+length>index.Data.Length/size)return;
  int Vertex(int i){
   var data=index.Data.AsSpan((first+i)*size,size);
   return checked(baseVertex+(size==2?BinaryPrimitives.ReadUInt16LittleEndian(data):(int)BinaryPrimitives.ReadUInt32LittleEndian(data)));
  }
  var edges=new HashSet<(int,int)>();
  void Edge(int a,int b){
   if((uint)a>=vertices.Length||(uint)b>=vertices.Length||a==b||!edges.Add(a<b?(a,b):(b,a)))return;
   if(vertices[a] is { } from&&vertices[b] is { } to)points.AddRange(SampleEdge(from,to));
  }
  for(int i=0;i<length;i+=3){int a=Vertex(i),b=Vertex(i+1),c=Vertex(i+2);Edge(a,b);Edge(b,c);Edge(c,a);}
 }
 internal static IEnumerable<Point> SampleEdge(Point a,Point b){
  var boneA=a.Bones[Array.IndexOf(a.Weights,a.Weights.Max())];
  var boneB=b.Bones[Array.IndexOf(b.Weights,b.Weights.Max())];
  if(boneA!=boneB)yield break;
  var length=Vector3.Distance(a.Position,b.Position);
  if(!float.IsFinite(length)||length<=5f)yield break;
  var segments=(int)MathF.Min(256,MathF.Ceiling(length/5f));
  for(int i=1;i<segments;i++)yield return a with {Position=Vector3.Lerp(a.Position,b.Position,(float)i/segments)};
 }
 internal static List<Point> Geometry(Model model,Model host,IReadOnlyDictionary<string,Mesh>? external=null,bool sampleEdges=false){
  var names=model.Skeleton.Bones.Select(b=>b.Name).ToArray();var canonical=host.Skeleton.Bones.GroupBy(b=>b.Name,StringComparer.OrdinalIgnoreCase).Where(g=>g.Count()==1).ToDictionary(g=>g.Key,g=>g.First().Name,StringComparer.OrdinalIgnoreCase);
  var targetPoses=Poses(model,Poses(host));var sourcePoses=Poses(model);var points=new List<Point>();var masks=model.Data["m_refMeshGroupMasks"].Values.ToArray();var selected=Mask(model.Data["m_nDefaultMeshGroupMask"]);
  var meshes=model.GetEmbeddedMeshesForLod(0).Select(v=>(Mesh:v.Item1,Index:v.Item2)).ToList();
  foreach(var(index,name,_)in model.GetReferenceMeshNamesForLod(0)){if(external is null||!external.TryGetValue(name,out var mesh))throw new InvalidDataException("Missing external item mesh: "+name);meshes.Add((mesh,index));}
  foreach(var(mesh,index)in meshes){
   if(index<masks.Length&&(Mask(masks[index])&selected)==0)continue;
   var inverse=new Dictionary<string,Matrix4x4>(StringComparer.OrdinalIgnoreCase);foreach(var(name,pose)in sourcePoses){if(!Matrix4x4.Invert(pose,out var inv))throw new InvalidDataException("Singular item bind pose");inverse[name]=inv;}if(mesh.Data.TryGetValue("m_skeleton",out var meshSkin)&&meshSkin.TryGetValue("m_bones",out var meshBones))foreach(var bone in meshBones.Values)if(bone.TryGetValue("m_invBindPose",out var inv))inverse[bone["m_boneName"].ToString(null)]=MeshInverse(inv);
   var ranges=new List<(int Start,int Count)>();var drawCalls=new List<KVObject>();if(mesh.Data.TryGetValue("m_sceneObjects",out var scenes))foreach(var scene in scenes.Values)if(scene.TryGetValue("m_drawCalls",out var calls))foreach(var call in calls.Values)if(call.TryGetValue("m_nVertexCount",out var count)&&call.TryGetValue("m_nBaseVertex",out var start)){ranges.Add((start.ToInt32(null),count.ToInt32(null)));drawCalls.Add(call);}
   if(ranges.Count==0||ranges.Any(r=>r.Start<0||r.Count<0))throw new InvalidDataException("Item mesh has no readable visible draw ranges");
   for(int bufferIndex=0;bufferIndex<mesh.VBIB.VertexBuffers.Count;bufferIndex++){var buffer=mesh.VBIB.VertexBuffers[bufferIndex];var fields=buffer.InputLayoutFields;var position=fields.FirstOrDefault(f=>f.SemanticName=="POSITION");if(position.SemanticName!="POSITION")continue;
    var positions=VBIB.GetVector3AttributeArray(buffer,position);var joints=fields.FirstOrDefault(f=>f.SemanticName=="BLENDINDICES");var weights=fields.FirstOrDefault(f=>f.SemanticName=="BLENDWEIGHT");
    var (indices,values)=Skin(positions.Length,joints.SemanticName=="BLENDINDICES"?VBIB.GetBlendIndicesArray(buffer,joints,model.GetRemapTable(index)):null,weights.SemanticName=="BLENDWEIGHT"?VBIB.GetBlendWeightsArray(buffer,weights):null,RigidBone(model,mesh,index));
    var visible=Enumerable.Range(0,positions.Length).Where(i=>ranges.Any(r=>i>=r.Start&&(long)i<((long)r.Start+r.Count))).ToArray();var stride=Math.Max(1,(int)Math.Ceiling(visible.Length/2048d));
    var edgeVertices=sampleEdges?new Point?[positions.Length]:null;
    foreach(var (i,order) in visible.Select((vertex,order)=>(vertex,order))){if(!sampleEdges&&order%stride!=0)continue;var n=new string[4];var w=new[]{values[i].X,values[i].Y,values[i].Z,values[i].W};var sum=w.Sum();if(!float.IsFinite(sum)||sum<=0)continue;
     for(int j=0;j<4;j++){if(!float.IsFinite(w[j])||w[j]<0)throw new InvalidDataException("Invalid skin weight");if(w[j]==0){n[j]="";continue;}var bone=indices[i*4+j];if(bone>=names.Length)throw new InvalidDataException("Invalid mesh bone remap");n[j]=canonical.GetValueOrDefault(names[bone],names[bone]);w[j]/=sum;}
     var p=positions[i];if(!float.IsFinite(p.X)||!float.IsFinite(p.Y)||!float.IsFinite(p.Z))throw new InvalidDataException("Invalid mesh point");var point=new Point(RebasePoint(p,n,w,inverse,targetPoses),n,w);if(edgeVertices is not null)edgeVertices[i]=point;if(order%stride==0)points.Add(point);
    }
    if(edgeVertices is not null)foreach(var call in drawCalls)SampleDrawEdges(mesh,bufferIndex,call,edgeVertices,points);
   }
  }
  const int maxSnapshotPoints=32768;
  if(points.Count==0)throw new InvalidDataException("No visible skinned item geometry for effect scope");
  if(points.Count<=maxSnapshotPoints)return points;
  return Enumerable.Range(0,maxSnapshotPoints)
   .Select(i=>points[(int)((long)i*(points.Count-1)/(maxSnapshotPoints-1))]).ToList();
 }
 internal static void Snapshot(string output,IReadOnlyList<Point> points){
  var strings=new[]{""}.Concat(points.SelectMany(p=>p.Bones).Where(n=>n.Length>0)).Distinct(StringComparer.Ordinal).ToArray();if(strings.Length>short.MaxValue)throw new InvalidDataException("Too many snapshot bones");var ids=strings.Select((n,i)=>(n,i)).ToDictionary(v=>v.n,v=>(short)v.i);
  var count=points.Count;var data=Row(("num_particles",new KVObject(count)),("attributes",A(new[]{Row(("name",new KVObject("position")),("type",new KVObject("float3")),("data_offset",new KVObject(0)),("data_size",new KVObject(count*12))),Row(("name",new KVObject("skinning")),("type",new KVObject("skinning")),("data_offset",new KVObject(count*12)),("data_size",new KVObject(count*24)))})),("string_list",A(strings.Select(n=>new KVObject(n)))));
  var kv=new BinaryKV3(data,new KV3ID("generic",new Guid("7412167c-06e9-4698-aff2-e63eb59037e7")),BlockType.DATA){Resource=null!};var bytes=HeroActivityRules.SerializeActivity(kv,4);
  using var snap=new MemoryStream();using(var w=new BinaryWriter(snap,System.Text.Encoding.UTF8,true)){w.Write((uint)(count*36)|0x80000000u);foreach(var p in points){w.Write(p.Position.X);w.Write(p.Position.Y);w.Write(p.Position.Z);}foreach(var p in points){foreach(var n in p.Bones)w.Write(ids[n]);foreach(var f in p.Weights)w.Write(f);}}
  var start=48;var second=(start+bytes.Length+7)&~7;using(var f=File.Create(output))using(var w=new BinaryWriter(f)){w.Write((uint)(second+snap.Length));w.Write((ushort)12);w.Write((ushort)1);w.Write(8u);w.Write(2u);w.Write(System.Text.Encoding.ASCII.GetBytes("DATA"));w.Write(start-20);w.Write(bytes.Length);w.Write(System.Text.Encoding.ASCII.GetBytes("SNAP"));w.Write(second-32);w.Write((int)snap.Length);while(f.Position<start)w.Write((byte)0);w.Write(bytes);while(f.Position<second)w.Write((byte)0);w.Write(snap.ToArray());}
  using var check=new Resource{FileName=output};check.Read(output);var decoded=check.Blocks.OfType<ParticleSnapshot>().Single();if(decoded.NumParticles!=count)throw new InvalidDataException("Snapshot round trip failed");
 }
 internal static int Patch(KVObject data,string snapshot){
  if(!data.TryGetValue("m_Initializers",out var rows))return 0;var changed=0;
  foreach(var op in rows.Values)if(op.TryGetValue("_class",out var cls)&&cls.ToString(null)=="C_INIT_CreateOnModel"){
   // Surface samplers become a skin-weighted snapshot of THIS item. Children
   // inherit the same model CP, so merging into a hero cannot widen the scope.
   if(op.TryGetValue("m_modelInput",out var input)&&((input.TryGetValue("m_nType",out var type)&&type.ToString(null)!="PM_TYPE_CONTROL_POINT")||(input.TryGetValue("m_nControlPoint",out var cp)&&cp.ToInt32(null)!=0)))throw new InvalidDataException("Effect samples another model/control point; an explicit binding profile is required");
   op.Clear();op["_class"]=new KVObject("C_INIT_InitSkinnedPositionFromCPSnapshot");op["m_nSnapshotControlPointNumber"]=new KVObject(60);op["m_nControlPointNumber"]=new KVObject(0);op["m_bRandom"]=new KVObject(true);changed++;
  }
  if(changed>0)BindSnapshot(data,snapshot);
  return changed;
 }
 internal static void BindSnapshot(KVObject data,string snapshot){
   data["m_hSnapshot"]=new KVObject(snapshot){Flag=KVFlag.Resource};data["m_nSnapshotControlPoint"]=new KVObject(60);
   var configs=data.TryGetValue("m_controlPointConfigurations",out var current)?current:KVObject.Array();
   if(!configs.Values.Any(v=>v.TryGetValue("m_name",out var n)&&n.ToString(null)=="preview"))configs.Add(Row(("m_name",new KVObject("preview")),("m_drivers",KVObject.Array())));
   foreach(var config in configs.Values){var drivers=config.TryGetValue("m_drivers",out var d)?d:KVObject.Array();if(drivers.Values.Any(v=>v.TryGetValue("m_iControlPoint",out var cp)&&cp.ToInt32(null)==60))throw new InvalidDataException("Effect already uses reserved snapshot CP60");
    drivers=A(drivers.Values.Where(v=>v.TryGetValue("m_iControlPoint",out var cp)&&cp.ToInt32(null)!=0));
    drivers.Add(Row(("m_iControlPoint",new KVObject(0)),("m_entityName",new KVObject("self")),("m_iAttachType",new KVObject("PATTACH_ABSORIGIN_FOLLOW"))));
    drivers.Add(Row(("m_iControlPoint",new KVObject(60)),("m_entityName",new KVObject("self")),("m_iAttachType",new KVObject("PATTACH_WORLDORIGIN"))));config["m_drivers"]=drivers;
   }data["m_controlPointConfigurations"]=configs;
  }
 internal static List<Point> AuthoredSnapshot(string file,IReadOnlyList<Point> geometry){
  using var r=new Resource{FileName=file};r.Read(file);var snap=r.Blocks.OfType<ParticleSnapshot>().Single();
  var pos=snap.AttributeData.FirstOrDefault(p=>p.Key.Name=="position").Value?.Cast<Vector3>().ToArray();var skin=snap.AttributeData.FirstOrDefault(p=>p.Key.Name=="skinning").Value?.Cast<ParticleSnapshot.SkinningData>().ToArray();
  if(pos is null||skin is null||pos.Length!=skin.Length||pos.Length>32768)return [];
  var allowed=geometry.SelectMany(p=>p.Bones).Where(n=>n.Length>0).Distinct().ToDictionary(n=>n,n=>n,StringComparer.OrdinalIgnoreCase);var lo=geometry.Select(p=>p.Position).Aggregate(Vector3.Min)-new Vector3(4);var hi=geometry.Select(p=>p.Position).Aggregate(Vector3.Max)+new Vector3(4);var points=new List<Point>();
  for(int i=0;i<pos.Length;i++){var p=pos[i];if(!float.IsFinite(p.X)||!float.IsFinite(p.Y)||!float.IsFinite(p.Z)||p.X<lo.X||p.Y<lo.Y||p.Z<lo.Z||p.X>hi.X||p.Y>hi.Y||p.Z>hi.Z)continue;
   var names=new string[4];var w=skin[i].Weights.ToArray();if(w.Length!=4||skin[i].JointNames.Length!=4||w.Any(f=>!float.IsFinite(f)||f<0)||w.Sum()<=0)continue;bool valid=true;
   for(int j=0;j<4;j++){if(w[j]==0)names[j]="";else if(!allowed.TryGetValue(skin[i].JointNames[j],out names[j]!)){valid=false;break;}}
   if(valid){var sum=w.Sum();points.Add(new(p,names,w.Select(v=>v/sum).ToArray()));}
  }return points;
 }
 internal static bool UsesReservedPoint(KVObject value){if(value is null)return false;if(value.ValueType is not (KVValueType.Collection or KVValueType.Array))return false;foreach(var pair in value){if(pair.Key?.Contains("ControlPoint",StringComparison.OrdinalIgnoreCase)==true&&pair.Value.ValueType is not (KVValueType.Collection or KVValueType.Array)&&pair.Value.ToString(null)=="60")return true;if(UsesReservedPoint(pair.Value))return true;}return false;}
 public static void Run(string manifest){var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty item scope manifest");if(q.Particles.Length>256)throw new InvalidDataException("Too many scoped particles");var changed=0;var loaded=new List<(Particle,Resource,byte[])>();var meshResources=new List<Resource>();
  try{foreach(var file in q.Particles){var r=new Resource{FileName=file.Input};r.Read(file.Input);if(r.DataBlock is not ParticleSystem p)throw new InvalidDataException("Expected particle system");loaded.Add((file,r,File.ReadAllBytes(file.Input)));if(UsesReservedPoint(p.Data))throw new InvalidDataException("Effect already uses reserved snapshot CP60");changed+=Patch(p.Data,q.SnapshotName);}
   if(changed>0)foreach(var(_,resource,_)in loaded){var definition=((ParticleSystem)resource.DataBlock!).Data;if(!definition.ContainsKey("m_hSnapshot"))BindSnapshot(definition,q.SnapshotName);}
   string[] bones=[],attachments=[];int pointCount=0;string sourceKind="none";
   if(changed>0){using var source=new Resource{FileName=q.Input};source.Read(q.Input);using var host=new Resource{FileName=q.Host};host.Read(q.Host);var model=(Model)source.DataBlock!;var external=new Dictionary<string,Mesh>();foreach(var(name,file)in q.Meshes??new()){var meshResource=new Resource{FileName=file};meshResources.Add(meshResource);meshResource.Read(file);external[name]=meshResource.DataBlock as Mesh??throw new InvalidDataException("Expected external mesh");}var points=Geometry(model,(Model)host.DataBlock!,external);sourceKind="geometry";
    var allowed=points.SelectMany(p=>p.Bones).Where(n=>n.Length>0).ToHashSet(StringComparer.OrdinalIgnoreCase);
    attachments=model.Attachments.Values.Concat(model.GetEmbeddedMeshesForLod(0).SelectMany(m=>m.Mesh.Attachments.Values)).Where(a=>Enumerable.Range(0,a.Length).Any(i=>a[i].Weight>0)&&Enumerable.Range(0,a.Length).All(i=>a[i].Weight<=0||allowed.Contains(a[i].Name))).Select(a=>a.Name).Distinct().Order().ToArray();
    var combined=new List<Point>();foreach(var candidate in q.Snapshots??[]){combined.AddRange(AuthoredSnapshot(candidate,points));}if(combined.Count>0){var step=Math.Max(1,(int)Math.Ceiling(combined.Count/8192d));points=combined.Where((_,i)=>i%step==0).ToList();sourceKind="authored-snapshots";}
    foreach(var(_,resource,_)in loaded){var particle=(ParticleSystem)resource.DataBlock!;if(particle.Data.TryGetValue("m_controlPointConfigurations",out var configs))foreach(var c in configs.Values)if(c.TryGetValue("m_drivers",out var drivers))foreach(var driver in drivers.Values)if(driver.TryGetValue("m_attachmentName",out var name)&&name.ToString(null).Length>0&&!attachments.Contains(name.ToString(null),StringComparer.Ordinal))throw new InvalidDataException("Attachment is outside selected item geometry: "+name.ToString(null));}
    Snapshot(q.Snapshot,points);bones=points.SelectMany(p=>p.Bones).Where(n=>n.Length>0).Distinct().Order().ToArray();pointCount=points.Count;}
   foreach(var(file,r,bytes)in loaded){if(changed==0)File.Copy(file.Input,file.Output,true);else {var references=r.ExternalReferences??throw new InvalidDataException("Scoped particle needs an external-reference table");if(!references.ResourceRefInfoList.Any(v=>v.Name==q.SnapshotName))references.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Name=q.SnapshotName,Id=Program.ComputeResourceId(q.SnapshotName)});
    using(var s=File.Create(file.Output))Program.SerializePatchedResource(r,bytes,s,true,new HashSet<object>{references},preserveMetadata:true);using var check=new Resource{FileName=file.Output};check.Read(file.Output);}}
   File.WriteAllText(q.Report,JsonSerializer.Serialize(new{version=1,applied=changed>0,initializers=changed,pointCount,bones,attachments,sourceKind}));
  }finally{foreach(var(_,r,_)in loaded)r.Dispose();foreach(var r in meshResources)r.Dispose();}
 }
}
