using ValveKeyValue;
internal static class MorphlingRootsTests
{
 static KVObject Array(params KVObject[] values){var a=KVObject.Array();foreach(var value in values)a.Add(value);return a;}
 static KVObject Skeleton(string[] names,int[] parents){var s=KVObject.Collection();s["m_boneName"]=Array(names.Select(n=>new KVObject(n)).ToArray());s["m_nParent"]=Array(parents.Select(n=>new KVObject(n)).ToArray());foreach(var key in new[]{"m_boneSphere","m_nFlag","m_bonePosParent","m_boneRotParent","m_boneScaleParent"})s[key]=Array(names.Select(_=>new KVObject(1)).ToArray());return s;}
 static void Check(bool condition){if(!condition)throw new Exception("Model merge regression");}
 public static int Main(){
   KVObject Posed(string name,float x){var s=Skeleton([name],[-1]);s["m_bonePosParent"]=Array(Array(new KVObject(x),new KVObject(0f),new KVObject(0f)));s["m_boneRotParent"]=Array(Array(new KVObject(0f),new KVObject(0f),new KVObject(0f),new KVObject(1f)));return s;}
   foreach(var side in new[]{"R","L","R_back","L_back"}){
    var donor=Posed("shark_"+side+"_01_JNT",10f);
    try{ModelMerge.MergeSkeleton(Posed("root",2f),donor);throw new Exception("Shark exception enabled globally");}catch(InvalidDataException){}
    var host=Posed("root",2f);var map=ModelMerge.MergeSkeleton(host,donor,attachMorphlingSharkRoots:true);
    Check(map.SequenceEqual(new[]{1})&&host["m_nParent"][1].ToInt32(null)==0);
    Check(Math.Abs(host["m_bonePosParent"][1][0].ToSingle(null)-8f)<0.0001f);
   }
   try{ModelMerge.MergeSkeleton(Posed("root",0f),Posed("unknown_root",0f),attachMorphlingSharkRoots:true);throw new Exception("Unknown root accepted by shark exception");}catch(InvalidDataException){}

 Console.WriteLine("[OK] Morphling shark roots attach with preserved bind pose; unrelated roots rejected"); return 0;
 }
}
