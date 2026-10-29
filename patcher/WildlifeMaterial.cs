using ValveKeyValue;
using ValveResourceFormat.Serialization.KeyValues;
using ValveResourceFormat.ResourceTypes;

// The legacy wildlife atlas has a FadeOut expression duplicated into the
// texture slot. Keep its authored static atlas and its scalar alpha expression.
internal static class WildlifeMaterial {
 internal static bool Repair(Material material){
  var name=material.Name.Replace('\\','/');
  if(!name.EndsWith("materials/models/props_wildlife/wildlife001.vmat",StringComparison.OrdinalIgnoreCase)||material.ShaderName!="global_lit_simple.vfx")return false;
  KVObject? Entry(string group,string key)=>material.Data.TryGetValue(group,out var rows)&&rows.IsArray?rows.Values.FirstOrDefault(row=>row.TryGetValue("m_name",out var n)&&n.ToString(null)==key):null;
  var scalar=Entry("m_dynamicParams","g_flAlphaTestReference");var dynamicTexture=Entry("m_dynamicTextureParams","g_tColor");
  if(!material.TextureParams.ContainsKey("g_tColor")||scalar is null||dynamicTexture is null||!scalar.GetArray<byte>("m_value").SequenceEqual(dynamicTexture.GetArray<byte>("m_value")))return false;
  if(!material.Data.TryGetValue("m_dynamicTextureParams",out var old)||!old.IsArray)return false;
  var next=KVObject.Array();foreach(var row in old.Values){if(row.TryGetValue("m_name",out var key)&&key.ToString(null)=="g_tColor")continue;next.Add(row);}if(next.Count==old.Count)return false;
  next.Flag=old.Flag;material.Data["m_dynamicTextureParams"]=next;return true;
 }
}
