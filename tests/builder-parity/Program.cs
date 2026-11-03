using System.Reflection;using System.Text.Json;using ValveKeyValue;
var assembly=Assembly.Load("Dota2UnusualPatcher");var type=assembly.GetType("CrystalMaidenArcanaRuntime")!;var bake=type.GetMethod("Bake",BindingFlags.Static|BindingFlags.NonPublic)!;
KVObject A(params KVObject[] v)=>KVObject.Array(v);
KVObject Row(params (string,KVObject)[] fields){var r=KVObject.Collection();foreach(var(k,v)in fields)r[k]=v;return r;}
var names=new[]{"arcana_idle","arcana_agg_idle","arcana_run","arcana_agg_run","wardstaff_arcana_idle","wardstaff_arcana_agg_idle","wardstaff_arcana_run","wardstaff_arcana_agg_run"};
foreach(var key in new[]{"m_animArray","m_localS1SeqDescArray"}){
 var field=key=="m_animArray"?"m_name":"m_sName";var rows=new List<KVObject>();
 string Healthy(string n){if(n=="arcana_run")return key=="m_animArray"?"@run_arcana_anim":"run_arcana_anim";if(n=="wardstaff_arcana_run")return key=="m_animArray"?"@wardstaff_run_arcana_anim":"wardstaff_run_arcana_anim";return (key=="m_animArray"&&n.Contains("agg_run")?"@":"")+n+"_anim";}
 foreach(var n in names){foreach(var injured in new[]{false,true}){
  var flags=Row(("m_bHidden",new KVObject(!injured)));var activities=A(Row(("m_name",new KVObject("ACT_DOTA_IDLE"))));if(injured)activities.Add(Row(("m_name",new KVObject("injured"))));
  rows.Add(Row((field,new KVObject(injured?n+"_injured":Healthy(n))),("m_flags",flags),("m_activityArray",activities),("m_pData",Row(("marker",new KVObject(injured?"bad-pose":"healthy-cloth-tracks")),("m_nFrames",new KVObject(injured?21:45)))),("m_eventArray",A(new KVObject(injured?"injured-event":"healthy-event")))));
 }}
 var untouched=Row((field,new KVObject("arcana_attack1_injured")),("m_activityArray",A()),("marker",new KVObject("untouched-attack")));rows.Add(untouched);
 var root=Row((key,KVObject.Array(rows)));var expectedNames=root[key].Values.Select(r=>r[field].ToString(null)).ToArray();
 if((int)bake.Invoke(null,new object[]{root,key})! !=8)throw new Exception("CM slot count mismatch");
 if(!root[key].Values.Select(r=>r[field].ToString(null)).SequenceEqual(expectedNames))throw new Exception("Sequence identity/order changed");
 foreach(var n in names){var target=root[key].Values.Single(r=>r[field].ToString(null)==n+"_injured");if(target["m_pData"]["marker"].ToString(null)!="healthy-cloth-tracks"||target["m_pData"]["m_nFrames"].ToInt32(null)!=45||target["m_flags"]["m_bHidden"].ToBoolean(null)||target["m_activityArray"][1]["m_name"].ToString(null)!="injured")throw new Exception("CM motion or original selection identity lost");}
 foreach(var r in root[key].Values.Where(r=>!r[field].ToString(null).EndsWith("_injured")))if(!r["m_flags"]["m_bHidden"].ToBoolean(null))throw new Exception("Healthy source mutated");
 if(!ReferenceEquals(root[key].Values.Last(),untouched))throw new Exception("Attack slot changed");
 var text=root.ToString();bake.Invoke(null,new object[]{root,key});if(root.ToString()!=text)throw new Exception("CM repair is not idempotent");
}
try{bake.Invoke(null,new object[]{Row(("m_animArray",A())),"m_animArray"});throw new Exception("Unknown table accepted");}catch(TargetInvocationException e)when(e.InnerException is InvalidDataException){}
Console.WriteLine("Builder parity: CM raw/sequence idle/run slots, authored cloth tracks, original names/order/tags, untouched attacks and idempotence passed.");
var attachmentType=assembly.GetType("TesterAttachmentProfiles")!;var prefixMethod=attachmentType.GetMethod("Prefix",BindingFlags.Static|BindingFlags.NonPublic)!;var namespaceMethod=attachmentType.GetMethod("NamespaceMesh",BindingFlags.Static|BindingFlags.NonPublic)!;var particleMethod=attachmentType.GetMethod("PatchParticle",BindingFlags.Static|BindingFlags.NonPublic)!;
KVObject Read(JsonElement e)=>e.ValueKind switch{JsonValueKind.Object=>Row(e.EnumerateObject().Select(p=>(p.Name,Read(p.Value))).ToArray()),JsonValueKind.Array=>A(e.EnumerateArray().Select(Read).ToArray()),JsonValueKind.String=>new KVObject(e.GetString()!),JsonValueKind.Number=>e.TryGetInt32(out var n)?new KVObject(n):new KVObject(e.GetDouble()),JsonValueKind.True=>new KVObject(true),JsonValueKind.False=>new KVObject(false),JsonValueKind.Null=>KVObject.Null(),_=>throw new Exception("Unsupported fixture")};
using var fixture=JsonDocument.Parse(File.ReadAllText(Path.Combine("tests","fixtures","mk-ti9-attachment-collision.json")));var aliases=new HashSet<string>();
foreach(var entry in fixture.RootElement.GetProperty("meshes").EnumerateObject()){
 var mesh=Read(entry.Value);var prefix=(string)prefixMethod.Invoke(null,new object[]{entry.Name})!;var bones=mesh["m_attachments"].Values.Select(r=>r["value"]["m_influenceNames"].ToString()).ToArray();
 if((int)namespaceMethod.Invoke(null,new object?[]{mesh,prefix})! !=mesh["m_attachments"].Count)throw new Exception("MK eye aliases missing");
 foreach(var name in mesh["m_attachments"].Values.Select(a=>a["key"].ToString(null)).Distinct())if(!aliases.Add(name))throw new Exception("Head and weapon attachment collision");
 if(!mesh["m_attachments"].Values.Select(r=>r["value"]["m_influenceNames"].ToString()).SequenceEqual(bones))throw new Exception("Attachment bone changed");
 if((int)namespaceMethod.Invoke(null,new object?[]{mesh,prefix})! !=0)throw new Exception("Attachment namespace is not idempotent");
}
foreach(var entry in fixture.RootElement.GetProperty("particles").EnumerateObject()){
 var data=Read(entry.Value);if((int)particleMethod.Invoke(null,new object[]{data})! <=0)throw new Exception("MK root not patched");
 foreach(var c in data["m_controlPointConfigurations"].Values)foreach(var d in c["m_drivers"].Values){if(d["m_entityName"].ToString(null)=="parent")throw new Exception("Detached hero-launch parent retained");if(d.TryGetValue("m_attachmentName",out var a)&&a.ToString(null).StartsWith("harlord_mk_",StringComparison.Ordinal)&&!aliases.Contains(a.ToString(null)))throw new Exception("Particle alias not present on model");}
 if((int)particleMethod.Invoke(null,new object[]{data})! !=0)throw new Exception("Particle binding is not idempotent");
}
Console.WriteLine("Real MK VPK fixture: disjoint head/weapon eyes, original bones, self-owned root drivers and idempotent parent-handoff removal passed.");
