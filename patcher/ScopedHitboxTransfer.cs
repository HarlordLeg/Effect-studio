using ValveKeyValue;
// Only generated effect volumes cross an independent wearable boundary.
// Selection/default hitboxes and the item's animation/skeleton stay untouched.
internal static class ScopedHitboxTransfer {
 internal static KVObject[] Collect(KVObject mesh,KVObject skeleton){
  if(!mesh.TryGetValue("m_hitboxsets",out var sets))return [];
  var names=skeleton["m_boneName"].Values.Select(v=>v.ToString(null)).GroupBy(v=>v,StringComparer.OrdinalIgnoreCase).Where(g=>g.Count()==1).ToDictionary(g=>g.Key,g=>g.First(),StringComparer.OrdinalIgnoreCase);
  var result=new List<KVObject>();
  foreach(var set in sets.Values){if(!set["key"].ToString(null).StartsWith("harlord_fx_",StringComparison.Ordinal))continue;
   foreach(var box in set["value"]["m_HitBoxes"].Values){var bone=box["m_sBoneName"].ToString(null);if(!names.TryGetValue(bone,out var target))throw new InvalidDataException("Independent effect volume has no host bone: "+bone);if(target!=bone){box["m_sBoneName"]=new KVObject(target);box["m_nBoneNameHash"]=new KVObject(ValveResourceFormat.Utils.StringToken.Get(target));}}
   result.Add(set);
  }return result.ToArray();
 }
 internal static void Append(KVObject mesh,IEnumerable<KVObject> sets){
  var rows=mesh.TryGetValue("m_hitboxsets",out var old)?old.Values.ToList():new List<KVObject>();
  foreach(var set in sets){var key=set["key"].ToString(null);if(rows.Any(s=>s["key"].ToString(null)==key))throw new InvalidDataException("Duplicate independent effect volume: "+key);rows.Add(set);}
  mesh["m_hitboxsets"]=KVObject.Array(rows);
 }
}
