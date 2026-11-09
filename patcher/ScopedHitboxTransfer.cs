using ValveKeyValue;
// Only generated effect volumes cross an independent wearable boundary.
// Selection/default hitboxes and the item's animation/skeleton stay untouched.
internal static class ScopedHitboxTransfer {
 // An exact bone name wins; a case-only spelling is accepted when it is the
 // single host bone of that spelling. The old lookup dropped every name that
 // had two spellings on the host, exact match included.
 internal static string? HostBone(IReadOnlyList<string> hostBones,string bone){
  if(hostBones.Contains(bone,StringComparer.Ordinal))return bone;
  var matches=hostBones.Where(v=>string.Equals(v,bone,StringComparison.OrdinalIgnoreCase)).ToArray();
  return matches.Length==1?matches[0]:null;
 }
 // A volume on a bone the host does not have (weapon_3 of a separate weapon
 // skeleton) cannot follow anything on the host, so it is left out of the
 // host copy. The independent wearable keeps its own copy of the set. Throwing
 // here failed the whole set build over one effect volume.
 internal static KVObject[] Collect(KVObject mesh,KVObject skeleton,ICollection<string>? dropped=null){
  if(!mesh.TryGetValue("m_hitboxsets",out var sets))return [];
  var names=skeleton["m_boneName"].Values.Select(v=>v.ToString(null)).ToArray();
  var result=new List<KVObject>();
  foreach(var set in sets.Values){if(!set["key"].ToString(null).StartsWith("harlord_fx_",StringComparison.Ordinal))continue;
   var kept=new List<KVObject>();
   foreach(var box in set["value"]["m_HitBoxes"].Values){var bone=box["m_sBoneName"].ToString(null);var target=HostBone(names,bone);if(target is null){dropped?.Add(bone);continue;}if(target!=bone){box["m_sBoneName"]=new KVObject(target);box["m_nBoneNameHash"]=new KVObject(ValveResourceFormat.Utils.StringToken.Get(target));}kept.Add(box);}
   if(kept.Count==0)continue;
   set["value"]["m_HitBoxes"]=KVObject.Array(kept);
   result.Add(set);
  }return result.ToArray();
 }
 internal static void Append(KVObject mesh,IEnumerable<KVObject> sets){
  var rows=mesh.TryGetValue("m_hitboxsets",out var old)?old.Values.ToList():new List<KVObject>();
  foreach(var set in sets){var key=set["key"].ToString(null);if(rows.Any(s=>s["key"].ToString(null)==key))throw new InvalidDataException("Duplicate independent effect volume: "+key);rows.Add(set);}
  mesh["m_hitboxsets"]=KVObject.Array(rows);
 }
}
