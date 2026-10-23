using ValveKeyValue;
internal static class HeroActivitiesTests
{
 static KVObject Array(params KVObject[] values){var result=KVObject.Array();foreach(var value in values)result.Add(value);return result;}
 static KVObject Sequence(string name,params string[] activities){var row=KVObject.Collection();row["m_sName"]=new KVObject(name);row["m_name"]=new KVObject(name);row["m_fetch"]=new KVObject(123);row["m_activityArray"]=Array(activities.Select(a=>{var v=KVObject.Collection();v["m_name"]=new KVObject(a);return v;}).ToArray());return row;}
 static string[] Names(KVObject row)=>row["m_activityArray"].Values.Select(v=>v["m_name"].ToString(null)).ToArray();
 static void Check(bool condition){if(!condition)throw new Exception("Hero activity regression");}
 private sealed class ActivityDocument : ValveResourceFormat.ResourceTypes.BinaryKV3{
  internal ActivityDocument(KVObject root):base(ValveResourceFormat.BlockType.ANIM){Data=new KVDocument(new KVHeader(),"",root);}
 }
 static void EqualTree(KVObject expected,KVObject actual){
  Check(expected.ValueType==actual.ValueType&&expected.Flag==actual.Flag);
  if(expected.ValueType==KVValueType.Collection){Check(expected.Select(p=>p.Key).SequenceEqual(actual.Select(p=>p.Key)));foreach(var(key,value)in expected)EqualTree(value,actual[key]);}
  else if(expected.ValueType==KVValueType.Array){Check(expected.Count==actual.Count);foreach(var pair in expected.Values.Zip(actual.Values))EqualTree(pair.First,pair.Second);}
  else if(expected.ValueType==KVValueType.BinaryBlob)Check(expected.AsBlob().AsSpan().SequenceEqual(actual.AsBlob()));
  else if(expected.ValueType==KVValueType.FloatingPoint)Check(BitConverter.SingleToInt32Bits((float)expected)==BitConverter.SingleToInt32Bits((float)actual));
  else if(expected.ValueType==KVValueType.FloatingPoint64)Check(BitConverter.DoubleToInt64Bits((double)expected)==BitConverter.DoubleToInt64Bits((double)actual));
  else Check(expected.ToString(System.Globalization.CultureInfo.InvariantCulture)==actual.ToString(System.Globalization.CultureInfo.InvariantCulture));
 }
 static ValveResourceFormat.ResourceTypes.BinaryKV3 ReadActivity(byte[] bytes){
  var result=new ValveResourceFormat.ResourceTypes.BinaryKV3(ValveResourceFormat.BlockType.ANIM){Offset=0,Size=(uint)bytes.Length,Resource=null!};
  using var reader=new BinaryReader(new MemoryStream(bytes));result.Read(reader);return result;
 }
 public static int Main(string[] args)
 {
  // Exercise the actual serializer, not a mocked patch process. Both compact
  // allocation hints overflow while full v5 counters and all scalar types survive.
  {
   var root=KVObject.Collection();var arrays=KVObject.Array();var objects=KVObject.Array();
   for(var i=0;i<65536;i++){arrays.Add(KVObject.Array());var item=KVObject.Collection();item["i"]=new KVObject(i);objects.Add(item);}
   root["arrays"]=arrays;root["objects"]=objects;
   root["values"]=Array(new KVObject(),new KVObject(true),new KVObject(false),new KVObject((short)-123),new KVObject((ushort)54321),new KVObject(int.MinValue),new KVObject(uint.MaxValue),new KVObject(long.MinValue),new KVObject(ulong.MaxValue),new KVObject(-0.0f),new KVObject(-0.0d),new KVObject(0.25f),new KVObject(1.25d),new KVObject(""),new KVObject("Unicode: Ж λ"),KVObject.Blob(new byte[]{0,255,1}),KVObject.Blob(System.Array.Empty<byte>()));
   var flagged=new KVObject("particles/test.vpcf"){Flag=KVFlag.Resource};root["resource"]=flagged;
   var binary=new ActivityDocument(root){Resource=null!};binary.SerializationVersion=5;
   try{using var stream=new MemoryStream();binary.Serialize(stream);throw new Exception("Expected old VRF allocation overflow");}catch(OverflowException){}
   var bytes=HeroActivityRules.SerializeActivity(binary,5);Check(bytes[0]==5);
   Check(BitConverter.ToUInt16(bytes,44)==65535&&BitConverter.ToUInt16(bytes,46)==65535);
   Check(BitConverter.ToInt32(bytes,108)>65535&&BitConverter.ToInt32(bytes,112)>65535);
   var read=ReadActivity(bytes);EqualTree(root,read.Data.Root);
   var second=ReadActivity(ActivityKv3V5.Serialize(read));EqualTree(root,second.Data.Root);
   Console.WriteLine("[OK] Large KV3 v5: saturated hints, full counts, typed lanes, flags and blobs round-trip");
  }
  foreach(byte source in new byte[]{2,3,4,5})Check(HeroActivityRules.WritableVersion(source)==(source<4?4:source));
  try{HeroActivityRules.WritableVersion(6);throw new Exception("Future KV3 must be rejected");}catch(System.IO.InvalidDataException){}

  {
   var root=KVObject.Collection();root["rows"]=Array(Sequence("idle","ACT_DOTA_IDLE"));root["empty"]=Array();
   foreach(byte version in new byte[]{4,5}){
    var bytes=Enumerable.Repeat((byte)0xAA,128).ToArray();bytes[0]=version;
    HeroActivityRules.RepairAllocationCounts(bytes,root);
    Check(BitConverter.ToUInt16(bytes,44)==3&&BitConverter.ToUInt16(bytes,46)==3);
    Check(bytes[120]==0xAA);
    if(version==5)Check(BitConverter.ToInt32(bytes,108)==3&&BitConverter.ToInt32(bytes,112)==3&&BitConverter.ToInt32(bytes,116)==3);
   }
  }
  foreach(var arrayKey in new[]{"m_localS1SeqDescArray","m_animArray"})
  foreach(var modifiers in new[]{new[]{"basher"},new[]{"offhand_basher"},new[]{"basher","offhand_basher"}}){
   var basic=Sequence("loadout","ACT_DOTA_LOADOUT");var offhand=Sequence("basher_loadout_anim","ACT_DOTA_LOADOUT","offhand_basher");
   var cast=Sequence("cast","ACT_DOTA_CAST_ABILITY_4");var basher=Sequence("basher_cast","ACT_DOTA_CAST_ABILITY_4","basher");
   var other=Sequence("slasher","ACT_DOTA_LOADOUT","slasher");var run=Sequence("run","ACT_DOTA_RUN");
   var root=KVObject.Collection();root[arrayKey]=Array(basic,offhand,cast,basher,other,run);
   HeroActivities.Bake(root,modifiers.ToHashSet(),arrayKey);
   Check(Names(basic).Contains("ACT_DOTA_LOADOUT")!=modifiers.Contains("offhand_basher"));
   Check(Names(cast).Contains("ACT_DOTA_CAST_ABILITY_4")!=modifiers.Contains("basher"));
   Check(Names(other).SequenceEqual(new[]{"ACT_DOTA_LOADOUT","slasher"}));Check(Names(run).Single()=="ACT_DOTA_RUN");
   Check(Names(offhand).Contains("offhand_basher")!=modifiers.Contains("offhand_basher"));
   Check(Names(basher).Contains("basher")!=modifiers.Contains("basher"));
   foreach(var s in root[arrayKey].Values)Check(s["m_fetch"].ToInt32(null)==123);
  }
  // v2 flags use a bit mask while v3/v4 use an enum. Legacy output keeps
  // the numeric lanes and blob payload, and removes only the v4 header fields.
  {
   var b=new byte[87];void Put(int offset,int value)=>BitConverter.GetBytes(value).CopyTo(b,offset);
   Put(0,unchecked((int)0x4b563304));Put(32,1);Put(40,3);Put(48,15);Put(52,15);Put(72,1);
   b[81]=0x85;b[82]=(byte)KVFlag.Panorama;Put(83,unchecked((int)0xffeedd00));
   var legacy=HeroActivityRules.LegacyActivityBuffer((byte[])b.Clone(),2);
   Check(legacy.Length==b.Length-8&&legacy[0]==2&&legacy[74]==8);
   Check(legacy.AsSpan(64,9).SequenceEqual(b.AsSpan(72,9)));
   Check(legacy.AsSpan(75,4).SequenceEqual(b.AsSpan(83,4)));
   var v3=HeroActivityRules.LegacyActivityBuffer((byte[])b.Clone(),3);Check(v3[74]==(byte)KVFlag.Panorama);
   Put(64,1);try{HeroActivityRules.LegacyActivityBuffer(b,2);throw new Exception("16-bit legacy lanes must fail");}catch(System.IO.InvalidDataException){}
  }
  // A stance is scoped to locomotion and cannot enable the item's spell cast.
  {
   KVObject basic=Sequence("idle","ACT_DOTA_IDLE"),stance=Sequence("custom_idle","ACT_DOTA_IDLE","custom"),cast=Sequence("custom_cast","ACT_DOTA_CAST_ABILITY_1","custom"),injured=Sequence("custom_injured","ACT_DOTA_IDLE","custom","injured"),combo=Sequence("combo","ACT_DOTA_IDLE","custom","other");
   var root=KVObject.Collection();root["m_localS1SeqDescArray"]=Array(basic,stance,cast,injured,combo);
   var report=HeroActivityRules.Bake(root,"m_localS1SeqDescArray",new[]{new HeroActivityRules.Rule("ACT_DOTA_IDLE","custom")},new HashSet<string>{"custom","other"});
   Check(report.Count==2);Check(!Names(basic).Contains("ACT_DOTA_IDLE"));Check(Names(stance).SequenceEqual(new[]{"ACT_DOTA_IDLE"}));Check(Names(cast).Contains("custom"));Check(Names(injured).Contains("injured"));Check(Names(combo).Contains("other"));
  }
  // More specific two-item animation wins; the incomplete variant keeps tags.
  {
   KVObject basic=Sequence("idle","ACT_DOTA_IDLE"),one=Sequence("one","ACT_DOTA_IDLE","one"),pair=Sequence("pair","ACT_DOTA_IDLE","one","two");var root=KVObject.Collection();root["m_animArray"]=Array(basic,one,pair);
   HeroActivityRules.Bake(root,"m_animArray",new[]{new HeroActivityRules.Rule("ALL","one"),new HeroActivityRules.Rule("ALL","two")},new HashSet<string>{"one","two"});
   Check(!Names(basic).Contains("ACT_DOTA_IDLE"));Check(Names(one).Contains("one"));Check(Names(pair).SequenceEqual(new[]{"ACT_DOTA_IDLE"}));
  }
  // Source sequence restriction activates only the injured variant.
  {
   KVObject normal=Sequence("normal","ACT_DOTA_CAST_ABILITY_1","actual"),injured=Sequence("injured","ACT_DOTA_CAST_ABILITY_1","actual","injured");var root=KVObject.Collection();root["m_localS1SeqDescArray"]=Array(normal,injured);
   var report=HeroActivityRules.Bake(root,"m_localS1SeqDescArray",new[]{new HeroActivityRules.Rule("ACT_DOTA_CAST_ABILITY_1","actual",Sequence:"injured")},new HashSet<string>{"actual"});
   Check(report.Count==1);Check(Names(normal).Contains("actual"));Check(!Names(injured).Contains("actual"));Check(Names(injured).Contains("injured"));
  }
  // Explicit gems must not silently apply only a subset of requested actions.
  {
   var root=KVObject.Collection();root["m_animArray"]=Array(Sequence("idle","ACT_DOTA_IDLE","gem"),Sequence("taunt","ACT_DOTA_TAUNT","gem"));
   var report=HeroActivityRules.Bake(root,"m_animArray",new[]{new HeroActivityRules.Rule("ALL","gem",Priority:100,ExcludedActivities:new[]{"ACT_DOTA_TAUNT"}),new HeroActivityRules.Rule("ACT_DOTA_RUN","missing",Priority:100)},new HashSet<string>{"gem","missing"});
   Check(report.MissingRequired.SequenceEqual(new[]{"ACT_DOTA_RUN / missing"}));
   Check(!Names(root["m_animArray"].Values.First()).Contains("gem"));Check(Names(root["m_animArray"].Values.Last()).Contains("gem"));
  }
  // Mage Slayer adds authored attack/death variants to the normal pool.
  {
   var basic=Sequence("normal_attack","ACT_DOTA_ATTACK");var custom=Sequence("slasher_attack","ACT_DOTA_ATTACK","slasher_weapon");var root=KVObject.Collection();root["m_animArray"]=Array(basic,custom);
   var report=HeroActivityRules.Bake(root,"m_animArray",new[]{new HeroActivityRules.Rule("ACT_DOTA_ATTACK","slasher_weapon",Priority:100,RetainBase:true)},new HashSet<string>{"slasher_weapon"});
   Check(report.MissingRequired.Length==0&&Names(basic).Contains("ACT_DOTA_ATTACK")&&Names(custom).SequenceEqual(new[]{"ACT_DOTA_ATTACK"}));
  }
  var skeleton=KVObject.Collection();skeleton["m_boneName"]=Array(new KVObject("root"));skeleton["m_nParent"]=Array(new KVObject(-1));foreach(var key in new[]{"m_bonePosParent","m_boneRotParent","m_boneScaleParent"})skeleton[key]=Array(new KVObject(1d));HeroActivities.ValidateSkeleton(skeleton,skeleton);
  var mismatched=KVObject.Collection();mismatched["m_boneName"]=Array(new KVObject("wrong"));mismatched["m_nParent"]=Array(new KVObject(-1));var rejected=false;try{HeroActivities.ValidateSkeleton(skeleton,mismatched);}catch(InvalidDataException){rejected=true;}Check(rejected);
  // Optional real Pudge arcana regression: its large v5 ANIM overflows VRF
  // when unnecessarily reserialized although the arcana rule changes nothing.
  if(args.Length==2&&args[0]=="--pudge"){
   var source=File.ReadAllBytes(args[1]);var manifest=Path.GetTempFileName();var output=manifest+".vmdl_c";
   try{
    File.WriteAllText(manifest,System.Text.Json.JsonSerializer.Serialize(new{input=Path.GetFullPath(args[1]),output,model="models/items/pudge/arcana/pudge_arcana_base.vmdl_c",rules=new[]{new HeroActivityRules.Rule("ALL","arcana")},knownModifiers=System.Array.Empty<string>(),requireActivity=false}));
    HeroActivityRules.Run(manifest);Check(source.AsSpan().SequenceEqual(File.ReadAllBytes(output)));
    Console.WriteLine("[OK] Pudge arcana: unchanged large KV3 v5 stays byte-for-byte exact");
    using var resource=new ValveResourceFormat.Resource{FileName=args[1]};resource.Read(args[1]);
    var anim=resource.Blocks.Single(b=>b.Type.ToString()=="ANIM");
    var binary=new ValveResourceFormat.ResourceTypes.BinaryKV3(anim.Type){Offset=anim.Offset,Size=anim.Size,Resource=resource};
    using(var reader=new BinaryReader(new MemoryStream(source))){reader.BaseStream.Position=anim.Offset;binary.Read(reader);}
    // Force a real metadata edit within the large block while retaining tracks.
    var labels=binary.Data.Root["m_animArray"].Values.First()["m_activityArray"];
    var activity=KVObject.Collection();activity["m_name"]=new KVObject("ACT_DOTA_IDLE");activity["m_nActivity"]=new KVObject(1);activity["m_nFlags"]=new KVObject(0);activity["m_nWeight"]=new KVObject(1);
    labels.Add(activity);var modifier=KVObject.Collection();modifier["m_name"]=new KVObject("regression_arcana");modifier["m_nActivity"]=new KVObject(0);modifier["m_nFlags"]=new KVObject(0);modifier["m_nWeight"]=new KVObject(1);labels.Add(modifier);
    var serialized=HeroActivityRules.SerializeActivity(binary,5);EqualTree(binary.Data.Root,ReadActivity(serialized).Data.Root);
    using(var modified=File.Create(output))HeroActivityRules.WriteActivityBlocks(resource,source,modified,new Dictionary<object,byte[]>{{anim,serialized}});
    var editedInput=output+".edited.vmdl_c";File.Move(output,editedInput);
    try{
     File.WriteAllText(manifest,System.Text.Json.JsonSerializer.Serialize(new{input=editedInput,output,model="models/items/pudge/arcana/pudge_arcana_base.vmdl_c",rules=new[]{new HeroActivityRules.Rule("ALL","regression_arcana")},knownModifiers=new[]{"regression_arcana"},requireActivity=false}));
     HeroActivityRules.Run(manifest);
     using var check=System.Text.Json.JsonDocument.Parse(File.ReadAllText(output+".activities.json"));
     Check(check.RootElement.GetProperty("reports").EnumerateArray().Any(r=>r.GetProperty("block").GetString()=="ANIM"&&r.GetProperty("selected").GetInt32()>0));
     Console.WriteLine("[OK] Pudge arcana: actual changed large ANIM serializes and animation payload is verified");
    }finally{File.Delete(editedInput);}

   }finally{File.Delete(manifest);File.Delete(output);File.Delete(output+".activities.json");}
   args=System.Array.Empty<string>();
  }
  // Original modern fixtures: both activity tables change, other blocks stay exact.
  if(args.Length==2&&(args[0]=="--tinker"||args[0]=="--mage-slayer")){
   var mageSlayer=args[0]=="--mage-slayer";var modelName=mageSlayer?"models/heroes/antimage/antimage.vmdl_c":"models/heroes/tinker/tinker.vmdl_c";
   var gemRules=mageSlayer?new[]{"slasher_weapon","slasher_offhand","slasher_mask","slasher_chest","slasher_belt","slasher_arms","slasher_shoulder"}.Select(m=>new HeroActivityRules.Rule("ALL",m,Priority:100,RetainBase:true)).ToArray():new[]{new HeroActivityRules.Rule("ACT_DOTA_TELEPORT","bot",Priority:100),new HeroActivityRules.Rule("ACT_DOTA_TELEPORT_END","bot",Priority:100)};
   var source=File.ReadAllBytes(args[1]);var manifest=Path.GetTempFileName();var output=manifest+".vmdl_c";
   try{
    File.WriteAllText(manifest,System.Text.Json.JsonSerializer.Serialize(new{input=Path.GetFullPath(args[1]),output,model=modelName,rules=gemRules,knownModifiers=gemRules.Select(r=>r.Modifier).Distinct().ToArray(),requireActivity=true}));HeroActivityRules.Run(manifest);
    using var before=new ValveResourceFormat.Resource{FileName=args[1]};before.Read(args[1]);using var after=new ValveResourceFormat.Resource{FileName=output};after.Read(output);var bytes=File.ReadAllBytes(output);
    Check(before.Blocks.Count==after.Blocks.Count);
    for(var index=0;index<before.Blocks.Count;index++){var a=before.Blocks[index];var b=after.Blocks[index];Check(a.Type==b.Type);if(a.Type.ToString() is "ASEQ" or "ANIM"){
     Check(b.Offset>=source.Length);
     Check(BitConverter.ToUInt32(bytes,(int)b.Offset+20)==0);
     Check(BitConverter.ToUInt16(bytes,(int)b.Offset+44)>0&&BitConverter.ToUInt16(bytes,(int)b.Offset+46)>0);
     var labels=b.ToString()!;Check(labels.Contains("m_activityArray"));continue;
    }Check(a.Offset==b.Offset&&a.Size==b.Size&&source.AsSpan((int)a.Offset,(int)a.Size).SequenceEqual(bytes.AsSpan((int)b.Offset,(int)b.Size)));}
    Console.WriteLine("[OK] Original model integration: ANIM/ASEQ replaced with allocation counts; every other block and offset unchanged");
   }finally{File.Delete(manifest);File.Delete(output);File.Delete(output+".activities.json");}
   args=System.Array.Empty<string>();
  }
  // Optional integration against the user's original compiled Anti-Mage model.
  if(args.Length==2)foreach(var modifiers in new[]{new[]{"basher"},new[]{"offhand_basher"},new[]{"basher","offhand_basher"}}){var temp=Path.GetTempFileName();var output=temp+".vmdl_c";try{
   File.WriteAllText(temp,System.Text.Json.JsonSerializer.Serialize(new{input=Path.GetFullPath(args[0]),output,modifiers,animationTemplate=Path.GetFullPath(args[1])}));HeroActivities.Run(temp);
  }finally{File.Delete(temp);File.Delete(output);}}
  // Optional original Dazzle fixture; no Valve assets are committed.
  if(args.Length==1){var manifest=Path.GetTempFileName();var output=manifest+".vmdl_c";try{
   File.WriteAllText(manifest,System.Text.Json.JsonSerializer.Serialize(new{input=Path.GetFullPath(args[0]),output,modifiers=new[]{"darkclaw"}}));HeroActivities.Run(manifest);
   File.WriteAllText(manifest,System.Text.Json.JsonSerializer.Serialize(new{input=Path.GetFullPath(args[0]),output,model="models/heroes/dazzle/dazzle.vmdl_c",rules=new[]{new{asset="ALL",modifier="darkclaw"}},knownModifiers=new[]{"darkclaw"}}));HeroActivityRules.Run(manifest);
   File.Delete(output+".activities.json");
  }finally{File.Delete(manifest);File.Delete(output);}}
  Console.WriteLine("[OK] Hero activity selection and compiled payload preservation");return 0;
 }
}
