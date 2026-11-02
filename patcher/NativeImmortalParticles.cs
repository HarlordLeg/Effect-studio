using ValveKeyValue;
// Verified Crimson Beastmaster profile. Preserve snapshot data and hero-owned
// launch; read the original snapshot index on every simulation tick.
internal static class NativeImmortalParticles {
 static string Text(KVObject row,string key,string fallback="")=>row.TryGetValue(key,out var v)?v.ToString(null):fallback;
 static KVObject Row(params (string Key,object Value)[] values){var r=KVObject.Collection();foreach(var (key,value) in values)r[key]=value switch {KVObject kv=>kv,string v=>new KVObject(v),int v=>new KVObject(v),float v=>new KVObject(v),bool v=>new KVObject(v),_=>throw new InvalidDataException("Unsupported particle field")};return r;}
 static KVObject Index()=>Row(("m_nType","PF_TYPE_PARTICLE_FLOAT"),("m_nMapType","PF_MAP_TYPE_DIRECT"),("m_nScalarAttribute",18),("m_flMultFactor",1f));
 internal static int Patch(KVObject data){
  const string folder="particles/econ/items/beastmaster/bm_crimson_2021/";
  if(data.TryGetValue("m_Children",out var children)&&children.Values.Any(c=>Text(c,"m_ChildRef")==folder+"bm_weapon_2021_crimson_ambient_blade_l.vpcf")){
   int changed=0;if(data.TryGetValue("m_controlPointConfigurations",out var configs))foreach(var c in configs.Values)if(c.TryGetValue("m_drivers",out var drivers))foreach(var d in drivers.Values)if((d.TryGetValue("m_iControlPoint",out var driverControlPoint)?driverControlPoint.ToInt32(null):0)==0&&Text(d,"m_iAttachType")!="PATTACH_ABSORIGIN_FOLLOW"){d["m_iAttachType"]=new KVObject("PATTACH_ABSORIGIN_FOLLOW");changed++;}return changed;
  }
  const string prefix="particles/models/items/beastmaster/bm_2021_immortal/bm_2021_immortal/";
  var snapshot=Text(data,"m_hSnapshot");var suffix=snapshot.StartsWith(prefix,StringComparison.Ordinal)?snapshot[prefix.Length..]:"";
  var count=suffix switch {"bm_2021_immortal_weapon_fx_l.vsnap" or "bm_2021_immortal_weapon_fx_r.vsnap"=>40,"bm_2021_immortal_weapon_feathers_fx_l.vsnap" or "bm_2021_immortal_weapon_feathers_fx_r.vsnap"=>14,_=>0};
  if(count==0||!data.TryGetValue("m_Initializers",out var initializers)||!data.TryGetValue("m_Operators",out var operators))return 0;
  if(operators.Values.Any(o=>Text(o,"_class")=="C_OP_MovementSkinnedPositionFromCPSnapshot"))return 0;
  var skin=initializers.Values.Where(i=>Text(i,"_class")=="C_INIT_InitSkinnedPositionFromCPSnapshot").ToArray();
  if(skin.Length!=1||operators.Values.Count(o=>Text(o,"_class")=="C_OP_SnapshotRigidSkinToBones")!=1)return 0;
  if(initializers.Values.Concat(operators.Values).Any(o=>new[]{"m_nFieldOutput","m_nOutputField"}.Any(k=>o.TryGetValue(k,out var field)&&field.ToInt32(null)==18)))throw new InvalidDataException("Beastmaster snapshot scratch attribute is occupied");
  var cp=data["m_nSnapshotControlPoint"].ToInt32(null);if(cp!=(count==40?6:5))throw new InvalidDataException("Unexpected Beastmaster snapshot control point");
  var remap=Row(("_class","C_INIT_RemapParticleCountToScalar"),("m_nFieldOutput",18),("m_nInputMin",0),("m_nInputMax",count-1),("m_nScaleControlPoint",-1),("m_flOutputMin",0f),("m_flOutputMax",(float)(count-1)),("m_nSetMethod","PARTICLE_SET_REPLACE_VALUE"),("m_bWrap",true));
  skin[0]["m_bRigid"]=new KVObject(false);skin[0]["m_nControlPointNumber"]=new KVObject(0);skin[0]["m_nIndexType"]=new KVObject("SNAPSHOT_INDEX_DIRECT");skin[0]["m_flReadIndex"]=Index();data["m_Initializers"]=KVObject.Array(new[]{remap}.Concat(initializers.Values));
  var interpolation=Row(("m_nType","PF_TYPE_LITERAL"),("m_nMapType","PF_MAP_TYPE_DIRECT"),("m_flLiteralValue",1f));
  var movement=Row(("_class","C_OP_MovementSkinnedPositionFromCPSnapshot"),("m_nSnapshotControlPointNumber",cp),("m_nControlPointNumber",0),("m_bRandom",false),("m_bSetNormal",true),("m_bSetRadius",false),("m_nIndexType","SNAPSHOT_INDEX_DIRECT"),("m_flReadIndex",Index()),("m_flInterpolation",interpolation));data["m_Operators"]=KVObject.Array(operators.Values.Where(o=>Text(o,"_class")!="C_OP_SnapshotRigidSkinToBones").Append(movement));return 1;
 }
}
