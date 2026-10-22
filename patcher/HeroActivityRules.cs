using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

// Only activity selection metadata is edited. Encoded tracks and every other
// model block are verified after writing; a schema entry alone is not proof
// that its animation exists in this version of the game.
internal static class HeroActivityRules
{
    // Legacy animation blocks must keep their KV3 generation. VRF writes only
    // v4/v5, so use its lossless v4 lanes as an intermediate for v2/v3.
    internal static byte WritableVersion(byte source)=>source switch
    {
        2 or 3=>4,
        4 or 5=>source,
        _=>throw new InvalidDataException("Unsupported activity KV3 version: "+source)
    };
    internal static byte[] SerializeActivity(BinaryKV3 binary,byte sourceVersion)
    {
        if(sourceVersion<4)PromoteLegacyNumbers(binary.Data.Root);
        binary.SerializationVersion=WritableVersion(sourceVersion);
        // Keep activity metadata and binary animation blobs in the documented raw layout.
        // v4 Zstd readers expect one stream covering both metadata and blob lanes.
        binary.SerializationCompressionMethod=KV3BinaryCompressionMethod.Uncompressed;
        using var stream=new MemoryStream();binary.Serialize(stream);var bytes=stream.ToArray();
        RepairAllocationCounts(bytes,binary.Data.Root);
        if(sourceVersion>=4)return bytes;
        return LegacyActivityBuffer(bytes,sourceVersion);
    }
    // FLOAT (node 19) and 16-bit numeric lanes were introduced after KV3 v3.
    // The modern writer accepts these KVObject types even when its output is
    // subsequently wrapped as v2/v3. Widen exactly, preserving resource flags.
    internal static KVObject PromoteLegacyNumbers(KVObject value)
    {
        KVObject? replacement=value.ValueType switch{
            KVValueType.FloatingPoint=>new KVObject((double)value.ToSingle(CultureInfo.InvariantCulture)),
            KVValueType.Int16=>new KVObject(value.ToInt64(CultureInfo.InvariantCulture)),
            KVValueType.UInt16=>new KVObject(value.ToUInt64(CultureInfo.InvariantCulture)),
            KVValueType.Array=>Array(value.Values.Select(PromoteLegacyNumbers)),
            _=>null
        };
        if(replacement is not null){replacement.Flag=value.Flag;return replacement;}
        if(value.ValueType==KVValueType.Collection)foreach(var (key,child) in value.ToArray())value[key]=PromoteLegacyNumbers(child);
        return value;
    }
    // VRF releases which emit zero allocation hints still round-trip through
    // their reader, but omit the counts used by the game KV3 loader.
    internal static void RepairAllocationCounts(byte[] bytes,KVObject root)
    {
        var objects=0;var arrays=0;var nodes=0;var elements=0;
        void Visit(KVObject value){
            nodes++;
            if(value.ValueType==KVValueType.Collection)objects++;
            else if(value.ValueType==KVValueType.Array){arrays++;elements+=Math.Max(value.Count,1);}
            else return;
            foreach(var child in value.Values)Visit(child);
        }
        Visit(root);
        if(bytes.Length<72||bytes[0] is not (4 or 5))throw new InvalidDataException("Invalid activity allocation header");
        BitConverter.GetBytes((ushort)Math.Min(objects,ushort.MaxValue)).CopyTo(bytes,44);
        BitConverter.GetBytes((ushort)Math.Min(arrays,ushort.MaxValue)).CopyTo(bytes,46);
        if(bytes[0]==5){
            if(bytes.Length<120)throw new InvalidDataException("Truncated v5 activity allocation header");
            BitConverter.GetBytes(nodes).CopyTo(bytes,104);
            BitConverter.GetBytes(objects).CopyTo(bytes,108);
            BitConverter.GetBytes(arrays).CopyTo(bytes,112);
            BitConverter.GetBytes(elements).CopyTo(bytes,116);
        }
    }
    internal static byte[] LegacyActivityBuffer(byte[] bytes,byte sourceVersion)
    {
        if(sourceVersion is not (2 or 3)||bytes.Length<72||BitConverter.ToUInt32(bytes,0)!=0x4b563304||BitConverter.ToUInt32(bytes,20)!=0)
            throw new InvalidDataException("Invalid legacy activity intermediate");
        int I(int offset)=>BitConverter.ToInt32(bytes,offset);
        int Align(int n,int a)=>checked((n+a-1)/a*a);
        if(I(64)!=0||I(68)!=0)throw new InvalidDataException("Legacy activity contains unsupported 16-bit lanes");
        var ones=I(28);var fours=I(32);var eights=I(36);var typeBytes=I(40);var bufferSize=I(48);
        if(ones<0||fours<1||eights<0||typeBytes<0||bufferSize<0||bufferSize>bytes.Length-72)throw new InvalidDataException("Invalid legacy activity lanes");
        var fourStart=Align(ones,4);var stringsStart=checked(Align(fourStart+fours*4,8)+eights*8);
        var typeEnd=checked(stringsStart+typeBytes);var cursor=stringsStart;var stringCount=I(72+fourStart);
        if(stringCount<0||typeEnd>bufferSize)throw new InvalidDataException("Invalid legacy activity string table");
        for(var i=0;i<stringCount;i++){while(cursor<typeEnd&&bytes[72+cursor]!=0)cursor++;if(cursor>=typeEnd)throw new InvalidDataException("Truncated activity string");cursor++;}
        // The writer emits explicit arrays, so the type stream consists solely
        // of node types and optional flag bytes. No encoded values are changed.
        while(cursor<typeEnd){var type=bytes[72+cursor++];
            if((type&0x40)!=0)throw new InvalidDataException("Unexpected activity type extension");
            if((type&0x80)==0)continue;
            if(cursor>=typeEnd)throw new InvalidDataException("Truncated activity type flag");
            if(sourceVersion==2)bytes[72+cursor]=((KVFlag)bytes[72+cursor]) switch{
                KVFlag.Resource=>1,KVFlag.ResourceName=>2,KVFlag.Panorama=>8,KVFlag.SoundEvent=>16,KVFlag.SubClass=>32,
                _=>throw new InvalidDataException("Unsupported legacy activity flag")};
            cursor++;
        }
        var result=new byte[bytes.Length-8];Buffer.BlockCopy(bytes,0,result,0,64);result[0]=sourceVersion;Buffer.BlockCopy(bytes,72,result,64,bytes.Length-72);return result;
    }
    internal sealed record Rule(string Asset,string Modifier,int Priority=0,bool ExcludeStance=false,string? Sequence=null,string[]? ExcludedActivities=null,bool RetainBase=false);
    private sealed record Option(string Id,string Name,Rule[] Rules);
    private sealed record Request(string Input,string Output,string Model,Rule[] Rules,string[] KnownModifiers,Option[]? Options=null,bool RequireStance=false,bool RequireActivity=false);
    private static readonly HashSet<string> StanceActivities=["ACT_DOTA_IDLE","ACT_DOTA_IDLE_RARE","ACT_DOTA_RUN","ACT_DOTA_LOADOUT"];
    private static string Text(KVObject obj,string key)=>obj[key].ToString(CultureInfo.InvariantCulture);
    private static KVObject Data(Block block)=>block is KeyValuesOrNTRO kv?kv.Data:block is BinaryKV3 binary?binary.Data.Root:throw new InvalidDataException("Unsupported activity block "+block.Type);
    private static KVObject Array(IEnumerable<KVObject> rows){var result=KVObject.Array();foreach(var row in rows)result.Add(row);return result;}
    private static string Payload(Block block,string key){var rows=Data(block)[key].Values.ToArray();var labels=rows.Select(r=>r["m_activityArray"]).ToArray();try{foreach(var row in rows)row["m_activityArray"]=KVObject.Array();return block.ToString()!;}finally{for(var i=0;i<rows.Length;i++)rows[i]["m_activityArray"]=labels[i];}}
    private static bool Matches(Rule rule,string activity)=>!(rule.ExcludedActivities?.Contains(activity)??false)&&! (rule.ExcludeStance&&StanceActivities.Contains(activity))&&(rule.Asset=="ALL"||rule.Asset==activity);
    internal static (int Count,string[] Names,string[] Missing,int StanceCount,string[] MissingRequired) Bake(KVObject data,string key,Rule[] rules,IReadOnlySet<string> known)
    {
        var rows=data[key].Values.ToArray();var candidates=new List<(KVObject Row,KVObject[] Labels,string Act,string Signature,int Specificity,int Priority,string[] Strip)>();var found=new HashSet<string>();
        foreach(var row in rows){
            var labels=row["m_activityArray"].Values.ToArray();var tags=labels.Select(a=>Text(a,"m_name")).Where(n=>!n.StartsWith("ACT_",StringComparison.Ordinal)).ToArray();
            foreach(var act in labels.Select(a=>Text(a,"m_name")).Where(n=>n.StartsWith("ACT_",StringComparison.Ordinal))){
                var applicable=rules.Where(r=>Matches(r,act)&&(r.Sequence is null||r.Sequence==Text(row,key=="m_animArray"?"m_name":"m_sName"))).ToArray();var selected=applicable.Select(r=>r.Modifier).ToHashSet();
                var equipment=tags.Where(known.Contains).ToArray();
                if(equipment.Any(t=>!selected.Contains(t)))continue;
                var strip=tags.Where(selected.Contains).ToArray();if(strip.Length==0)continue;
                found.UnionWith(strip);var remaining=tags.Except(strip).Order(StringComparer.Ordinal);
                candidates.Add((row,labels,act,act+"\0"+string.Join("\0",remaining),strip.Length,applicable.Where(r=>strip.Contains(r.Modifier)).Max(r=>r.Priority),strip));
            }
        }
        var winners=candidates.GroupBy(c=>c.Signature).SelectMany(g=>{var priority=g.Max(c=>c.Priority);var size=g.Where(c=>c.Priority==priority).Max(c=>c.Specificity);return g.Where(c=>c.Priority==priority&&c.Specificity==size);}).ToArray();
        var promoted=winners.Where(w=>!rules.Any(r=>r.RetainBase&&Matches(r,w.Act)&&w.Strip.Contains(r.Modifier))).Select(w=>w.Signature).ToHashSet();var names=new List<string>();
        foreach(var row in rows){
            var labels=row["m_activityArray"].Values.ToArray();var tags=labels.Select(a=>Text(a,"m_name")).Where(n=>!n.StartsWith("ACT_",StringComparison.Ordinal)).ToArray();var selected=winners.Where(w=>ReferenceEquals(w.Row,row)).ToArray();
            var keep=new List<KVObject>();
            foreach(var label in labels){var name=Text(label,"m_name");if(!name.StartsWith("ACT_",StringComparison.Ordinal)){if(!selected.Any(w=>w.Strip.Contains(name)))keep.Add(label);continue;}
                if(selected.Any(w=>w.Act==name)){keep.Add(label);continue;}
                var signature=name+"\0"+string.Join("\0",tags.Order(StringComparer.Ordinal));
                if(!promoted.Contains(signature))keep.Add(label);
            }
            // Losers requiring an equipped modifier must not enter the pool after
            // a subset of their tags has been removed for another activity.
            if(selected.Length>0){var keepActs=selected.Select(w=>w.Act).ToHashSet();keep.RemoveAll(l=>Text(l,"m_name").StartsWith("ACT_",StringComparison.Ordinal)&&!keepActs.Contains(Text(l,"m_name")));names.Add(Text(row,key=="m_animArray"?"m_name":"m_sName"));}
            row["m_activityArray"]=Array(keep);
        }
        return (winners.Select(w=>w.Row).Distinct().Count(),names.Distinct().ToArray(),rules.Select(r=>r.Modifier).Distinct().Except(found).ToArray(),winners.Count(w=>w.Priority>=100&&StanceActivities.Contains(w.Act)),rules.Where(r=>r.Priority>=100&&!winners.Any(w=>Matches(r,w.Act)&&w.Strip.Contains(r.Modifier)&&(r.Sequence is null||r.Sequence==Text(w.Row,key=="m_animArray"?"m_name":"m_sName")))).Select(r=>r.Asset+" / "+r.Modifier).Distinct().ToArray());
    }
    // Keep the original file layout and append the changed activity blocks.
    // No original payload, including padding/trailing data, is moved or removed.
    internal static void WriteActivityBlocks(Resource resource,byte[] original,Stream output,Dictionary<object,byte[]> rawBlocks)
    {
        output.Write(original);using var writer=new BinaryWriter(output,System.Text.Encoding.UTF8,true);
        for(var index=0;index<resource.Blocks.Count;index++){
            var block=resource.Blocks[index];if(!rawBlocks.TryGetValue(block,out var payload))continue;
            if(block.Type.ToString() is not ("ASEQ" or "ANIM"))throw new InvalidDataException("Activity patch attempted another block");
            var padding=(int)((16-output.Position%16)%16);writer.Write(new byte[padding]);var start=output.Position;writer.Write(payload);var end=output.Position;
            var field=16L+index*12L+4;output.Position=field;writer.Write(checked((uint)(start-field)));writer.Write(checked((uint)payload.Length));output.Position=end;
        }
        output.Position=0;writer.Write(checked((uint)output.Length));writer.Flush();
    }
    public static void Run(string manifest,bool inspect=false)
    {
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty activities request");
        var bytes=File.ReadAllBytes(request.Input);using var resource=new Resource{FileName=request.Input};resource.Read(request.Input);
        if(resource.DataBlock is not Model model||Text(model.Data,"m_name")!=(request.Model.EndsWith("_c",StringComparison.Ordinal)?request.Model[..^2]:request.Model))throw new InvalidDataException("Hero model does not match activity request");
        var sequence=resource.Blocks.SingleOrDefault(b=>b.Type.ToString()=="ASEQ");
        if(sequence is null)throw new InvalidDataException("Hero has no embedded sequence activity table");
        var known=request.KnownModifiers.ToHashSet(StringComparer.Ordinal);
        if(inspect){
            var rows=Data(sequence)["m_localS1SeqDescArray"].Values.ToArray();var options=new List<object>();var audit=new List<object>();
            foreach(var option in request.Options??[]){
                var matches=option.Rules.Where(rule=>rows.Any(row=>{var labels=row["m_activityArray"].Values.Select(a=>Text(a,"m_name")).ToArray();return (rule.Sequence is null||rule.Sequence==Text(row,"m_sName"))&&labels.Contains(rule.Modifier)&&labels.Any(a=>a.StartsWith("ACT_",StringComparison.Ordinal)&&Matches(rule,a));})).ToArray();
                audit.Add(new{id=option.Id,name=option.Name,matchedRules=matches,missingRules=option.Rules.Except(matches).ToArray()});
                var genuine=(option.Id.StartsWith("kinetic-",StringComparison.Ordinal)||option.Id.StartsWith("animation-",StringComparison.Ordinal));
                var actions=rows.SelectMany(row=>row["m_activityArray"].Values.Select(a=>Text(a,"m_name"))).Where(a=>a.StartsWith("ACT_",StringComparison.Ordinal)).Distinct().ToArray();
                var rules=option.Rules.SelectMany(r=>r.Asset=="ALL"?(genuine?actions:StanceActivities.ToArray()).Select(a=>r with{Asset=a}):genuine||StanceActivities.Contains(r.Asset)?[r]:System.Array.Empty<Rule>()).Where(r=>!genuine||rows.Any(row=>{var labels=row["m_activityArray"].Values.Select(a=>Text(a,"m_name")).ToArray();return Matches(r,r.Asset)&&labels.Contains(r.Modifier)&&labels.Contains(r.Asset)&&!labels.Where(known.Contains).Any(tag=>tag!=r.Modifier&&!option.Rules.Any(other=>other.Modifier==tag&&Matches(other,r.Asset)));})).Distinct().ToArray();
                var selected=rules.Select(r=>r.Modifier).ToHashSet();
                var eligible=rows.Where(row=>{var labels=row["m_activityArray"].Values.Select(a=>Text(a,"m_name")).ToArray();return labels.Where(n=>n.StartsWith("ACT_",StringComparison.Ordinal)).Any(a=>rules.Any(r=>Matches(r,a)&&labels.Contains(r.Modifier)))&&!labels.Where(known.Contains).Any(t=>!selected.Contains(t));}).ToArray();
                if(eligible.Length>0)options.Add(new{id=option.Id,name=option.Name,rules,animations=eligible.OrderBy(r=>r["m_activityArray"].Values.Count(a=>!Text(a,"m_name").StartsWith("ACT_",StringComparison.Ordinal))).ThenBy(r=>r["m_activityArray"].Values.Any(a=>Text(a,"m_name")=="ACT_DOTA_IDLE")?0:1).Select(r=>Text(r,"m_sName")).ToArray()});
            }
            File.WriteAllText(request.Output,JsonSerializer.Serialize(new{options,audit,sequenceLabels=rows.Select(row=>new{name=Text(row,"m_sName"),activities=row["m_activityArray"].Values.Select(label=>Text(label,"m_name")).ToArray()}).ToArray(),externalAnimations=resource.ExternalReferences?.ResourceRefInfoList.Where(r=>r.Name.EndsWith(".vanim",StringComparison.Ordinal)||r.Name.EndsWith(".vagrp",StringComparison.Ordinal)||r.Name.EndsWith(".vseq",StringComparison.Ordinal)).Select(r=>r.Name).ToArray()}));return;
        }
        var animBlock=resource.Blocks.SingleOrDefault(b=>b.Type.ToString()=="ANIM");
        var modernAnim=animBlock is not null&&animBlock.Size>=4&&(BitConverter.ToUInt32(bytes,(int)animBlock.Offset)&0xffffff00)==0x4b563300&&bytes[(int)animBlock.Offset]>=4;
        var appendActivities=modernAnim;
        var changed=new HashSet<object>();var rawBlocks=new Dictionary<object,byte[]>();var snapshots=new Dictionary<string,string>();var expected=new Dictionary<string,string>();var reports=new List<object>();
        foreach(var (type,key) in new[]{("ASEQ","m_localS1SeqDescArray"),("ANIM","m_animArray")}){
            var block=resource.Blocks.SingleOrDefault(b=>b.Type.ToString()==type);if(block is null)continue;
            var binary=new BinaryKV3(block.Type){Offset=block.Offset,Size=block.Size,Resource=resource};
            using(var reader=new BinaryReader(new MemoryStream(bytes))){reader.BaseStream.Position=block.Offset;binary.Read(reader);}
            binary.SerializationCompressionMethod=(KV3BinaryCompressionMethod)(BitConverter.ToUInt32(bytes,(int)block.Offset+20)&0xff);
            snapshots[type]=Payload(binary,key);var report=Bake(binary.Data.Root,key,request.Rules,known);reports.Add(new{block=type,selected=report.Count,animations=report.Names,missing=report.Missing});
            if(type=="ASEQ"&&request.RequireActivity&&report.MissingRequired.Length>0)throw new InvalidDataException("Kinetic changes could not all be applied: "+string.Join(", ",report.MissingRequired));
            if(type=="ASEQ"&&request.RequireActivity&&report.Count==0)throw new InvalidDataException("This kinetic gem has no compatible animations in the installed hero model");
            if(type=="ASEQ"&&request.RequireStance&&report.StanceCount==0)throw new InvalidDataException("This stance has no compatible animations in the installed hero model");
            rawBlocks[block]=SerializeActivity(binary,bytes[(int)block.Offset]);
            changed.Add(block);expected[type]=binary.ToString()!;
        }
        using(var output=File.Create(request.Output)){if(appendActivities)WriteActivityBlocks(resource,bytes,output,rawBlocks);else Program.SerializePatchedResource(resource,bytes,output,false,changed,preserveMetadata:true,rawBlocks:rawBlocks);}
        using var check=new Resource{FileName=request.Output};check.Read(request.Output);var written=File.ReadAllBytes(request.Output);
        for(var i=0;i<resource.Blocks.Count;i++){
            var before=resource.Blocks[i];var after=check.Blocks[i];var type=before.Type.ToString();if(before.Type!=after.Type)throw new InvalidDataException("Activity block order changed");
            if(snapshots.TryGetValue(type,out var snapshot)){
                var key=type=="ASEQ"?"m_localS1SeqDescArray":"m_animArray";
                if(expected[type]!=after.ToString()||snapshot!=Payload(after,key))throw new InvalidDataException("Activity animation payload mismatch: "+type);
            }else if((appendActivities&&before.Offset!=after.Offset)||before.Size!=after.Size||!bytes.AsSpan((int)before.Offset,(int)before.Size).SequenceEqual(written.AsSpan((int)after.Offset,(int)after.Size)))throw new InvalidDataException("Activity patch changed model block: "+type);
        }
        File.WriteAllText(request.Output+".activities.json",JsonSerializer.Serialize(new{reports}));Console.WriteLine("[OK] Activity rules applied; geometry, skeleton and animation tracks preserved");
    }
}
