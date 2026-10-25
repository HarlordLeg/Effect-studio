using System.Globalization;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

// Export only authored visible geometry. VRF enumerates every embedded mesh
// before selecting a LOD, including disabled legacy buffers that Dota ignores.
// This changes the in-memory preview resource, never the generated game VPK.
internal static class VisibleMeshExport
{
 internal static ulong Mask(KVObject value){var text=value.ToString(CultureInfo.InvariantCulture);return text.StartsWith('-')?unchecked((ulong)long.Parse(text,CultureInfo.InvariantCulture)):ulong.Parse(text,CultureInfo.InvariantCulture);}
 internal static KVObject[] VisibleRows(KVObject[] rows,KVObject[] masks,ulong selected)=>rows.Where(row=>{
  var key=row.ContainsKey("m_nMeshIndex")?"m_nMeshIndex":"mesh_index";
  if(!row.TryGetValue(key,out var value))return true;
  var index=value.ToInt32(CultureInfo.InvariantCulture);
  return index<0||index>=masks.Length||(Mask(masks[index])&selected)!=0;
 }).ToArray();
 internal static int Prepare(Resource resource){
  if(resource.DataBlock is not Model model||resource.GetBlockByType(BlockType.CTRL) is not BinaryKV3 ctrl)return 0;
  if(!model.Data.TryGetValue("m_refMeshGroupMasks",out var masks)||!model.Data.TryGetValue("m_nDefaultMeshGroupMask",out var state)||!ctrl.Data.Root.TryGetValue("embedded_meshes",out var meshes))return 0;
  var rows=meshes.Values.ToArray();var visible=VisibleRows(rows,masks.Values.ToArray(),Mask(state));
  if(visible.Length==rows.Length)return 0;
  var replacement=KVObject.Array();foreach(var row in visible)replacement.Add(row);ctrl.Data.Root["embedded_meshes"]=replacement;
  return rows.Length-visible.Length;
 }
}
