using ValveKeyValue;using ValveResourceFormat;using ValveResourceFormat.ResourceTypes;
class MaterialFix {
static void Main(string[] args) {
using var r=new Resource{FileName=args[0]};r.Read(args[0]);var original=File.ReadAllBytes(args[0]);var model=(Model)r.DataBlock!;
var groups=model.Data["m_materialGroups"];
foreach(var g in groups.Values)foreach(var m in g["m_materials"].Values)Console.WriteLine("BEFORE "+m.Flag+" "+m.ToString(null));
if(args.Length<2)return;
using(var stream=File.Create(args[1]))Program.SerializePatchedResource(r,original,stream,false,preserveMetadata:true);
using var check=new Resource{FileName=args[1]};check.Read(args[1]);var after=File.ReadAllBytes(args[1]);
foreach(var g in ((Model)check.DataBlock!).Data["m_materialGroups"].Values)foreach(var m in g["m_materials"].Values){if(m.Flag!=KVFlag.Resource)throw new Exception("Material flag not preserved");Console.WriteLine("AFTER "+m.Flag+" "+m.ToString(null));}
for(int i=0;i<r.Blocks.Count;i++){var a=r.Blocks[i];var b=check.Blocks[i];if(a.Type!=b.Type)throw new Exception("Block order changed");if(a==r.DataBlock)continue;if(!original.AsSpan((int)a.Offset,(int)a.Size).SequenceEqual(after.AsSpan((int)b.Offset,(int)b.Size)))throw new Exception("Unrelated block changed: "+a.Type);}
Console.WriteLine("PASS: resource flags retained; all non-DATA blocks identical; meshes="+((Model)check.DataBlock!).GetEmbeddedMeshes().Count());
if(ModelMaterialReferences.Repair(((Model)check.DataBlock!).Data)!=0)throw new Exception("Not idempotent");
}}
