using System.Globalization;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;
internal static class ParticleRecolor {
 private static KVObject Bytes(int[] rgb,KVObject? old=null){var a=KVObject.Array();foreach(var c in rgb)a.Add(new KVObject(c));if(old is not null&&old.IsArray&&old.Count>3)a.Add(old[3]);return a;}
 private static KVObject Vector(int[] rgb,double scale=1){var a=KVObject.Array();foreach(var c in rgb)a.Add(new KVObject(c/255d*scale));return a;}
 private static bool ColorField(KVObject n){foreach(var k in new[]{"m_nFieldOutput","m_nOutputField"})if(n.TryGetValue(k,out var f))return f.ValueType==KVValueType.String?f.ToString(null).Contains("TINT_RGB",StringComparison.OrdinalIgnoreCase)||f.ToString(null).Contains("GLOW_RGB",StringComparison.OrdinalIgnoreCase):f.ToInt32(CultureInfo.InvariantCulture) is 6 or 22;return n.TryGetValue("_class",out var cls)&&(cls.ToString(null) is "C_INIT_InitVec" or "C_OP_SetVec");}
 internal static void Apply(KVObject root,int[] rgb){
  void Visit(KVObject node){if(node.IsArray){foreach(var child in node.Values)Visit(child);return;}if(!node.IsCollection)return;
   var field=ColorField(node);var cls=node.TryGetValue("_class",out var c)?c.ToString(null):"";
   foreach(var key in node.Keys.ToArray()){
    var old=node[key];
    if(key is "m_ConstantColor" or "m_ColorMin" or "m_ColorMax" or "m_ColorFade" or "m_Color" or "m_LiteralColor"){if(old.IsArray&&old.Count>=3)node[key]=Bytes(rgb,old);}
    else if(field&&(key is "m_vecOutput" or "m_vecOutputMin" or "m_vecOutputMax" or "m_vOutputMin" or "m_vOutputMax" or "m_vecMin" or "m_vecMax")){if(old.IsArray&&old.Count>=3){var scale=old.Values.Take(3).Max(v=>Math.Abs(v.ToDouble(CultureInfo.InvariantCulture)));node[key]=Vector(rgb,scale);}}
    else if(field&&key=="m_InputValue"){var input=KVObject.Collection();input["m_nType"]=new KVObject("PVEC_TYPE_LITERAL_COLOR");input["m_LiteralColor"]=Bytes(rgb);node[key]=input;}
    else if(key!="m_Children")Visit(old);
   }
   if(cls=="C_INIT_RandomColor"){node["m_ColorMin"]=Bytes(rgb,node.TryGetValue("m_ColorMin",out var lo)?lo:null);node["m_ColorMax"]=Bytes(rgb,node.TryGetValue("m_ColorMax",out var hi)?hi:null);foreach(var key in new[]{"m_ColorMin","m_ColorMax"})if(node[key].Count==3)node[key].Add(new KVObject(255));}
   if(field&&node.TryGetValue("m_nCPInput",out var cp)&&cp.ToInt32(CultureInfo.InvariantCulture)==15){node["m_vOutputMin"]=Vector(rgb);node["m_vOutputMax"]=Vector(rgb);node["m_nSetMethod"]=new KVObject("PARTICLE_SET_REPLACE_VALUE");var strength=KVObject.Collection();strength["m_nType"]=new KVObject("PF_TYPE_LITERAL");strength["m_flLiteralValue"]=new KVObject(1d);node["m_flOpStrength"]=strength;}
   if(cls.StartsWith("C_OP_Render",StringComparison.Ordinal)&&node.ContainsKey("m_flAddSelfAmount"))node["m_flAddSelfAmount"]=new KVObject(0d);
  }
  Visit(root);root["m_ConstantColor"]=Bytes(rgb);root["m_ConstantColor"].Add(new KVObject(255));
 }
 internal static IEnumerable<string> ColorTextures(ParticleSystem particle,Resource resource){
  var names=new HashSet<string>(StringComparer.Ordinal);if(!particle.Data.TryGetValue("m_Renderers",out var renderers)||!renderers.IsArray)return names;
  void Visit(KVObject node){if(node.IsArray){foreach(var child in node.Values)Visit(child);}else if(node.IsCollection)foreach(var pair in node){if(pair.Key=="m_hTexture"){var value=pair.Value;string? name=null;if(value.ValueType==KVValueType.UInt64){var id=value.ToUInt64(CultureInfo.InvariantCulture);name=resource.ExternalReferences?.ResourceRefInfoList.FirstOrDefault(r=>r.Id==id)?.Name;}else if(value.ValueType==KVValueType.String)name=value.ToString(null);if(name is not null&&(name.EndsWith(".vtex",StringComparison.Ordinal)||name.EndsWith(".vtex_c",StringComparison.Ordinal)))names.Add(name.EndsWith("_c")?name[..^2]:name);}else Visit(pair.Value);}}
  foreach(var renderer in renderers.Values){var cls=renderer.TryGetValue("_class",out var type)?type.ToString(null):"";if(cls is "C_OP_RenderSprites" or "C_OP_RenderTrails" or "C_OP_RenderRopes")Visit(renderer);}
  return names;
 }
}
