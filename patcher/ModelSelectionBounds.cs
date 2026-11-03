using System.Numerics;using ValveKeyValue;
// Recover only absent bounds from the hero's authored selection boxes.
// Selection hitboxes themselves, donor effect sets and physics stay untouched.
internal static class ModelSelectionBounds {
 internal static bool Apply(KVObject root,IEnumerable<KVObject> meshes){
  var info=root["m_modelInfo"];float[] Floats(KVObject v)=>v.Values.Select(x=>x.ToSingle(null)).ToArray();
  bool Empty(string lo,string hi)=>info.TryGetValue(lo,out var a)&&info.TryGetValue(hi,out var b)&&Floats(a).SequenceEqual(new float[3])&&Floats(b).SequenceEqual(new float[3]);
  var hull=Empty("m_vHullMin","m_vHullMax");var view=Empty("m_vViewMin","m_vViewMax");if(!hull&&!view)return false;
  var sk=root["m_modelSkeleton"];var names=sk["m_boneName"].Values.Select(v=>v.ToString(null)).ToArray();var poses=new Dictionary<int,Matrix4x4>();
  Matrix4x4 Pose(int i){if(poses.TryGetValue(i,out var old))return old;var p=Floats(sk["m_bonePosParent"][i]);var q=Floats(sk["m_boneRotParent"][i]);var scale=sk.TryGetValue("m_boneScaleParent",out var scales)?scales[i].ToSingle(null):1;var m=Matrix4x4.CreateScale(scale)*Matrix4x4.CreateFromQuaternion(new(q[0],q[1],q[2],q[3]))*Matrix4x4.CreateTranslation(p[0],p[1],p[2]);var parent=sk["m_nParent"][i].ToInt32(null);if(parent>=0)m*=Pose(parent);return poses[i]=m;}
  Vector3 min=new(float.PositiveInfinity),max=new(float.NegativeInfinity);var count=0;
  foreach(var mesh in meshes)if(mesh.TryGetValue("m_hitboxsets",out var sets))foreach(var set in sets.Values){var key=set["key"].ToString(null);if(key is not("select_low" or "select_high"))continue;foreach(var box in set["value"]["m_HitBoxes"].Values){var bone=Array.IndexOf(names,box["m_sBoneName"].ToString(null));if(bone<0)throw new InvalidDataException("Selection box has no host bone");var lo=Floats(box["m_vMinBounds"]);var hi=Floats(box["m_vMaxBounds"]);var pose=Pose(bone);for(int corner=0;corner<8;corner++){var p=Vector3.Transform(new((corner&1)==0?lo[0]:hi[0],(corner&2)==0?lo[1]:hi[1],(corner&4)==0?lo[2]:hi[2]),pose);if(!float.IsFinite(p.X)||!float.IsFinite(p.Y)||!float.IsFinite(p.Z))throw new InvalidDataException("Non-finite selection bounds");min=Vector3.Min(min,p);max=Vector3.Max(max,p);}count++;}}
  if(count==0||min.X>=max.X||min.Y>=max.Y||min.Z>=max.Z)return false;
  KVObject Vec(Vector3 v)=>KVObject.Array(new[]{new KVObject(v.X),new KVObject(v.Y),new KVObject(v.Z)});
  if(hull){info["m_vHullMin"]=Vec(min);info["m_vHullMax"]=Vec(max);}if(view){info["m_vViewMin"]=Vec(min);info["m_vViewMax"]=Vec(max);}return true;
 }
}
