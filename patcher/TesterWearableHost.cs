using System.Text.Json;using System.Text.RegularExpressions;using ValveKeyValue;using ValveResourceFormat;using ValveResourceFormat.ResourceTypes;
// Tester-only: merge visible wearables into hero, preserve independent visible
// copies for model-rendering particles, keep host locomotion bytes untouched.
internal static class TesterWearableHost {
 private sealed record Donor(string Input,string Target,string Slot,string Hidden,string Visible,string PrivatePath,string? SourceModel=null,bool MetadataOnly=false,bool IndependentRuntime=false,bool RetainParticles=false);
 private sealed record HostEntry(string Host,string Input,string Output,Donor[] Donors);
 private sealed record Particle(string Input,string Output,string? Name=null);
 private sealed record Request(HostEntry[] Hosts,Particle[] Particles,Dictionary<string,string>? Meshes,string Report);
 static readonly Regex List=new(@"particle_cfg_list\s*=\s*\[[^\]]*\]",RegexOptions.Singleline);
 static readonly Regex Binding=new("name\\s*=\\s*resource:\\s*\"[^\"]+\\.vpcf\"");
 internal static bool MetadataOnly(bool requested,KVObject model)=>requested||(model.TryGetValue("m_nDefaultMeshGroupMask",out var mask)&&mask.ToString(System.Globalization.CultureInfo.InvariantCulture)=="0");
 // Keep this cloth on its own model: its lower-cape FE controls are absent
 // from the base hero. Importing those bones would intercept bone merge.
 internal static bool IndependentCloth(string host,string? source)=>host.Replace('\\','/').StartsWith("models/heroes/drow/",StringComparison.Ordinal)&&source?.Replace('\\','/')=="models/items/drow/ti6_immortal_cape/drow_ti6_immortal_arcana_refit.vmdl_c";
 // Cloth controls and simulation belong to the wearable resource. Keep the
 // original PHYS/animation blocks and do not append its simulation bones.
 // These runtime wearables cannot be embedded as static hero geometry:
 // Tide's base chain has an independent chain_1 rig; Huskar's weapon has
 // authored mesh/LOD selection. Keep their original geometry and runtime.
 internal static bool PreserveRuntimeModel(string host,string? source){
  static string Normalize(string value){value=value.Replace('\\','/');if(value.StartsWith("harlord/",StringComparison.Ordinal))value=value[8..];return value.EndsWith("_c",StringComparison.Ordinal)?value[..^2]:value;}
  host=Normalize(host);source=source is null?null:Normalize(source);
  return host=="models/heroes/tidehunter/tidehunter.vmdl"&&source=="models/heroes/tidehunter/tidehunter_bracer.vmdl"
   ||host=="models/heroes/huskar/huskar.vmdl"&&source=="models/items/huskar/huskar_explosive_maniac_weapon/huskar_explosive_maniac_weapon.vmdl";
 }
 internal static bool HasCloth(Resource resource)=>resource.Blocks.Any(b=>b.Type==ValveResourceFormat.BlockType.PHYS&&(b.ToString()?.Contains("m_cloth",StringComparison.OrdinalIgnoreCase)??false));
 internal static int[] DonorOrder(KVObject host,IReadOnlyList<KVObject> donors){
  string[] Names(KVObject skeleton)=>skeleton["m_boneName"].Values.Select(v=>v.ToString(null)).ToArray();
  var known=Names(host).ToHashSet(StringComparer.OrdinalIgnoreCase);var names=donors.Select(Names).ToArray();var parents=donors.Select(s=>s["m_nParent"].Values.Select(v=>v.ToInt32(null)).ToArray()).ToArray();
  if(names.Where((n,i)=>n.Length!=parents[i].Length).Any())throw new InvalidDataException("Missing donor parents in dependency order");
  var dependencies=Enumerable.Range(0,donors.Count).Select(_=>new HashSet<int>()).ToArray();
  for(int i=0;i<donors.Count;i++)for(int b=0;b<names[i].Length;b++)if(parents[i][b]<0&&!known.Contains(names[i][b])){
   for(int j=0;j<donors.Count;j++){if(i==j)continue;var matches=Enumerable.Range(0,names[j].Length).Where(k=>string.Equals(names[j][k],names[i][b],StringComparison.OrdinalIgnoreCase)).ToArray();if(matches.Length==1&&parents[j][matches[0]]>=0){dependencies[i].Add(j);break;}}
  }
  var result=new List<int>();var done=new HashSet<int>();while(result.Count<donors.Count){var next=Enumerable.Range(0,donors.Count).FirstOrDefault(i=>!done.Contains(i)&&dependencies[i].All(done.Contains),-1);if(next<0)throw new InvalidDataException("Cyclic wearable skeleton dependencies");result.Add(next);done.Add(next);}return result.ToArray();
 }
 static string Plain(string name)=>name.EndsWith("_c",StringComparison.Ordinal)?name[..^2]:name;
 static bool Bound(Model model){var text=model.Data["m_modelInfo"]["m_keyValueText"].ToString(null);var matches=List.Matches(text);if(matches.Count>1)throw new InvalidDataException("Duplicate particle binding list");return matches.Count==1&&Binding.IsMatch(matches[0].Value);}
 static void CopyModel(Donor d,bool hidden,string? destination=null,bool retainParticles=false){var bytes=File.ReadAllBytes(d.Input);using var r=new Resource{FileName=d.Input};r.Read(d.Input);var model=r.DataBlock as Model??throw new InvalidDataException("Expected model");var info=model.Data["m_modelInfo"];if(!retainParticles)info["m_keyValueText"]=new KVObject(List.Replace(info["m_keyValueText"].ToString(null),"particle_cfg_list = [ ]"));if(hidden){model.Data["m_refMeshGroupMasks"]=KVObject.Array(model.Data["m_refMeshGroupMasks"].Values.Select(_=>new KVObject(0UL)));model.Data["m_nDefaultMeshGroupMask"]=new KVObject(0UL);}var output=destination??(hidden?d.Hidden:d.Visible);using(var s=File.Create(output))Program.SerializePatchedResource(r,bytes,s,true,preserveMetadata:true);using var check=new Resource{FileName=output};check.Read(output);var cm=check.DataBlock as Model??throw new InvalidDataException("Expected written model");if(!retainParticles&&Bound(cm))throw new InvalidDataException("Duplicate particle launch in wearable copy");if(hidden&&cm.Data["m_nDefaultMeshGroupMask"].ToUInt64(null)!=0)throw new InvalidDataException("Wearable was not hidden");var written=File.ReadAllBytes(output);for(int i=0;i<r.Blocks.Count;i++){var a=r.Blocks[i];var b=check.Blocks[i];if(!ReferenceEquals(a,r.DataBlock)&&!bytes.AsSpan((int)a.Offset,(int)a.Size).SequenceEqual(written.AsSpan((int)b.Offset,(int)b.Size)))throw new InvalidDataException("Wearable runtime block changed: "+a.Type);}}
 // A private wearable model must come from m_ModelList, never the hero
 // carried by a legacy model CP or a modern model input.
 internal static int UsePrivateModelList(KVObject data,IReadOnlySet<string> privateModels){
  if(!data.TryGetValue("m_Renderers",out var renderers))return 0;var changed=0;
  foreach(var renderer in renderers.Values){
   if(!renderer.TryGetValue("_class",out var kind)||kind.ToString(null)!="C_OP_RenderModels"||!renderer.TryGetValue("m_ModelList",out var models)||!models.Values.Any(m=>m.TryGetValue("m_model",out var model)&&privateModels.Contains(Plain(model.ToString(null)))))continue;
   renderer.Remove("m_nModelCP");renderer.Remove("m_modelInput");renderer["m_EconSlotName"]=new KVObject("");changed++;
  }return changed;
 }
 public static void Run(string manifest){var q=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty tester manifest");if(q.Hosts.Length>129)throw new InvalidDataException($"Tester manifest has {q.Hosts.Length} hero models; maximum is 129");var map=new Dictionary<string,string>();var identities=new Dictionary<string,string>();var launched=new HashSet<string>(StringComparer.Ordinal);var slots=new HashSet<string>();var reports=new List<object>();var notes=new List<string>();
 foreach(var host in q.Hosts){var active=new List<Donor>();foreach(var d in host.Donors){using var resource=new Resource{FileName=d.Input};resource.Read(d.Input);if(resource.DataBlock is not Model model)throw new InvalidDataException("Wearable must be a model");var preserveRuntime=PreserveRuntimeModel(host.Host,d.SourceModel);var independent=preserveRuntime||d.IndependentRuntime||HasCloth(resource)||IndependentCloth(host.Host,d.SourceModel);active.Add(d with {IndependentRuntime=independent,MetadataOnly=independent||MetadataOnly(d.MetadataOnly,model.Data),RetainParticles=preserveRuntime||HasCloth(resource)||IndependentCloth(host.Host,d.SourceModel)||d.IndependentRuntime&&(d.SourceModel=="models/items/chaos_knight/oda_nobunaga_off_hand/oda_nobunaga_off_hand.vmdl_c"||d.SourceModel=="models/items/invoker_kid/dark_artistry_kid/invoker_kid_dark_artistry_back.vmdl_c"||d.SourceModel=="models/items/dawnbreaker/dawnbreaker_lady_of_blaze_weapon/dawnbreaker_lady_of_blaze_weapon.vmdl_c"||d.SourceModel=="models/items/dawnbreaker/judgement_of_light_armor/judgement_of_light_armor.vmdl_c"||d.SourceModel=="models/items/axe/demon_blood/demon_blood_weapon.vmdl_c"||d.SourceModel=="models/items/dark_seer/imperious_tactician_back/imperious_tactician_back.vmdl_c"||d.SourceModel=="models/items/dragon_knight/aurora_warrior_set_weapon/aurora_warrior_set_weapon.vmdl_c"||d.SourceModel=="models/items/shredder/timbersaw_ti9_immortal_offhand/timbersaw_ti9_immortal_offhand.vmdl_c"||d.SourceModel=="models/items/earth_spirit/jade_reckoning_v2/mesh/jade_reckoning_v2.vmdl_c")});}
 if(active.Count==0)continue;foreach(var d in active)if(d.SourceModel is not null){identities[d.PrivatePath]=d.SourceModel;identities[Plain(d.Target)]=d.SourceModel;}
 using(var hostResource=new Resource{FileName=host.Input}){hostResource.Read(host.Input);var hostSkeleton=(hostResource.DataBlock as Model??throw new InvalidDataException("Expected host model")).Data["m_modelSkeleton"];var skeletons=new List<KVObject>();foreach(var d in active){using var donorResource=new Resource{FileName=d.Input};donorResource.Read(d.Input);skeletons.Add((donorResource.DataBlock as Model??throw new InvalidDataException("Expected donor model")).Data["m_modelSkeleton"]);}active=DonorOrder(hostSkeleton,skeletons).Select(i=>active[i]).ToList();}
 var merge=host.Output+".merge.json";
 var fallback=new HashSet<string>(StringComparer.Ordinal);
 try {
  while(true){
   var donors=active.Where(d=>!fallback.Contains(d.Input)).ToArray();
   if(donors.Length==0){
    File.Copy(host.Input,host.Output,true);
    break;
   }
   File.WriteAllText(merge,JsonSerializer.Serialize(new{
    input=host.Input,output=host.Output,hostModel=host.Host,testerImporterRoots=true,meshes=q.Meshes,
    donors=donors.Select(d=>new{input=d.Input,sourceModel=d.SourceModel,metadataOnly=d.MetadataOnly,
     skipParticleMetadata=d.RetainParticles,matchBoneCase=true,overrideAttachments=true})
   }));
   try {
    ModelMerge.Run(merge);
    break;
   } catch(InvalidDataException error) when(error.Data[ModelMerge.IncompatibleDonorInput] is string input &&
    donors.Any(d=>d.Input==input&&!d.MetadataOnly&&!string.Equals(Plain(d.Target),Plain(host.Host),StringComparison.OrdinalIgnoreCase))){
    fallback.Add(input);
    var donor=donors.Single(d=>d.Input==input);
    notes.Add(host.Host+": kept original wearable runtime at "+donor.Target+". "+error.Message);
   }
  }
 } finally { File.Delete(merge); }
 using var original=new Resource{FileName=host.Input};original.Read(host.Input);using var combined=new Resource{FileName=host.Output};combined.Read(host.Output);var particleText=(combined.DataBlock as Model)!.Data["m_modelInfo"]["m_keyValueText"].ToString(null);foreach(Match match in Regex.Matches(particleText,"name\\s*=\\s*resource:\"([^\"]+\\.vpcf)\""))launched.Add(match.Groups[1].Value);var originalBones=(original.DataBlock as Model??throw new InvalidDataException("Expected original model")).Skeleton.Bones.Select(b=>b.Name).ToHashSet(StringComparer.OrdinalIgnoreCase);var extras=(combined.DataBlock as Model??throw new InvalidDataException("Expected merged model")).Skeleton.Bones.Where(b=>!originalBones.Contains(b.Name)).Select(b=>b.Name).ToArray();if(extras.Length>0)notes.Add(host.Host+": дополнительные кости сохранены без импорта анимационных слоёв; нужна проверка в игре: "+string.Join(", ",extras));
 foreach(var d in active){
  if(fallback.Contains(d.Input)){
   File.Copy(d.Input,d.Hidden,true);
   File.Copy(d.Input,d.Visible,true);
   continue;
  }
  CopyModel(d,!d.IndependentRuntime&&!IndependentCloth(host.Host,d.SourceModel),d.Hidden,d.RetainParticles);CopyModel(d,false);var key=d.Target.EndsWith("_c")?d.Target[..^2]:d.Target;if(map.TryGetValue(key,out var old)&&old!=d.PrivatePath)throw new InvalidDataException("Conflicting private wearable model");map[key]=d.PrivatePath;slots.Add(d.Slot);}reports.Add(new{host=host.Host,wearables=active.Select(d=>d.Target),fallbackTargets=active.Where(d=>fallback.Contains(d.Input)).Select(d=>d.Target),independentWearables=active.Where(d=>d.IndependentRuntime||fallback.Contains(d.Input)).Select(d=>d.SourceModel??d.Target),extraBones=extras});
 }
 // The manifest promises an output for every particle even if all donors
 // keep their original runtime and no particle model paths need rewriting.
 if(map.Count==0){
  foreach(var particle in q.Particles)File.Copy(particle.Input,particle.Output,true);
 }
 if(map.Count>0&&q.Particles.Length>0){var relocate=manifest+".relocate.json";try{File.WriteAllText(relocate,JsonSerializer.Serialize(new{paths=map,files=q.Particles.Select(p=>new{input=p.Input,output=p.Output})}));ResourceRelocator.Run(relocate);}finally{File.Delete(relocate);}
 foreach(var file in q.Particles){var bytes=File.ReadAllBytes(file.Output);using var r=new Resource{FileName=file.Output};r.Read(file.Output);if(r.DataBlock is not ParticleSystem p)throw new InvalidDataException("Expected particle");bool changed=NativeImmortalParticles.Patch(p.Data)>0;changed|=TesterAttachmentProfiles.PatchForHost(p.Data,identities,file.Name is not null&&launched.Contains(Plain(file.Name)))>0;changed|=UsePrivateModelList(p.Data,map.Values.ToHashSet(StringComparer.Ordinal))>0;
 if(changed){var temp=file.Output+".patched";using(var s=File.Create(temp))Program.SerializePatchedResource(r,bytes,s,true,preserveMetadata:true);using(var check=new Resource{FileName=temp})check.Read(temp);r.Dispose();File.Move(temp,file.Output,true);}}
 }
 File.WriteAllText(q.Report,JsonSerializer.Serialize(new{version=2,hosts=reports,warnings=notes},new JsonSerializerOptions{WriteIndented=true}));Console.WriteLine("[OK] Tester full-set base-model hosts: "+reports.Count);}
}
