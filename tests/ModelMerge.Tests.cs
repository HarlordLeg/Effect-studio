using ValveKeyValue;
internal static class ModelMergeTests
{
 static KVObject Array(params KVObject[] values){var a=KVObject.Array();foreach(var value in values)a.Add(value);return a;}
 static KVObject Skeleton(string[] names,int[] parents){var s=KVObject.Collection();s["m_boneName"]=Array(names.Select(n=>new KVObject(n)).ToArray());s["m_nParent"]=Array(parents.Select(n=>new KVObject(n)).ToArray());foreach(var key in new[]{"m_boneSphere","m_nFlag","m_bonePosParent","m_boneRotParent","m_boneScaleParent"})s[key]=Array(names.Select(_=>new KVObject(1)).ToArray());return s;}
 static void Check(bool condition){if(!condition)throw new Exception("Model merge regression");}
 public static int Main(){
  var host=Skeleton(["root","Head_1"],[-1,0]);var donor=Skeleton(["Head_1","hair","tip"],[-1,0,1]);
  donor["m_nFlag"]=Array(new KVObject(4),new KVObject(8),new KVObject(16));
  var map=ModelMerge.MergeSkeleton(host,donor);Check(map.SequenceEqual(new[]{1,2,3}));Check(host["m_nParent"].Values.Select(v=>v.ToInt32(null)).SequenceEqual(new[]{-1,0,1,2}));
  Check(host["m_nFlag"].Values.Select(v=>v.ToInt32(null)).SequenceEqual(new[]{1,5,8,16}));
  Check(host["m_boneName"][0].ToString(null)=="root"&&host["m_boneName"][1].ToString(null)=="Head_1");
  try{ModelMerge.MergeSkeleton(host,Skeleton(["unrelated_root"],[-1]));throw new Exception("Unattached root accepted");}catch(InvalidDataException){}
  try{ModelMerge.MergeSkeleton(Skeleton(["root"],[-1]),Skeleton(["root","root"],[-1,0]));throw new Exception("Duplicate bones accepted");}catch(InvalidDataException){}
  var header="<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:vmdlkeys4:version{9f5c1002-f19f-470c-bd42-c3c26c063d33} -->";
  var donorText=header+"\n{ particle_cfg_list = [{ name = resource:\"particles/ambient.vpcf\" config = \"authored\" controls = [1,2,3] }] death = resource:\"particles/death.vpcf\" }";
  var merged=ModelMerge.MergeParticleText("",donorText);Check(merged.Contains("authored")&&merged.Contains("controls")&&!merged.Contains("particles/death.vpcf"));
  Check(ModelMerge.MergeParticleText(merged,donorText)==merged);
  Console.WriteLine("[OK] Merge skeleton keeps host indices, maps donor parents and rejects unattached roots");return 0;
 }
}
