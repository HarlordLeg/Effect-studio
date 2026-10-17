using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

// Combine compiled embedded meshes without decoding/re-encoding vertex buffers.
// Host animation/physics blocks keep their indices and their original bytes.
internal static class ModelMerge
{
    private sealed record Donor(string Input,string[]? MeshNames=null,bool MetadataOnly=false,bool AttachRootZero=false);
    private sealed record Request(string Input,string Output,Donor[] Donors,Dictionary<string,string>? Meshes=null);
    private sealed record Chunk(BlockType Type,byte[] Bytes);
    static string Text(KVObject value)=>value.ToString(CultureInfo.InvariantCulture);
    internal static string MeshReference(KVObject value)=>value.ValueType==KVValueType.Null?string.Empty:value.ValueType==KVValueType.String?Text(value):throw new InvalidDataException("Mesh reference must be a resource string or null");
    static int Number(KVObject value)=>value.ToInt32(CultureInfo.InvariantCulture);
    static KVObject Array(IEnumerable<KVObject> values){var a=KVObject.Array();foreach(var value in values)a.Add(value);return a;}
    static KVObject[] Values(KVObject root,string key)=>root.TryGetValue(key,out var a)?a.Values.ToArray():[];
    static BinaryKV3 Read(Resource resource,byte[] bytes,Block block){
        if(block.Size<4||!BinaryKV3.IsBinaryKV3(BitConverter.ToUInt32(bytes,(int)block.Offset)))throw new InvalidDataException("Mesh merging requires binary KV3: "+block.Type);
        var result=new BinaryKV3(block.Type){Resource=resource,Offset=block.Offset,Size=block.Size};using var reader=new BinaryReader(new MemoryStream(bytes));reader.BaseStream.Position=block.Offset;result.Read(reader);return result;
    }
    static byte[] Serialize(BinaryKV3 value,byte version)=>HeroActivityRules.SerializeActivity(value,version);
    static string Field(KVObject row,string modern,string legacy)=>row.ContainsKey(modern)?modern:legacy;
    static ulong Mask(KVObject value){var text=Text(value);return text.StartsWith('-')?unchecked((ulong)long.Parse(text,CultureInfo.InvariantCulture)):ulong.Parse(text,CultureInfo.InvariantCulture);}
    static int MeshIndex(KVObject row)=>Number(row[Field(row,"m_nMeshIndex","mesh_index")]);
    static string MeshName(KVObject row)=>Text(row[Field(row,"m_Name","name")]);
    static readonly HashSet<string> BlockFields=["m_nDataBlock","m_nMorphBlock","m_nVBIBBlock","m_nToolsVBBlock","m_nBlockIndex","tools_vb_block","data_block","vbib_block","morph_block"];
    static void BlockReferences(KVObject value,Action<KVObject,string,int> action){
        if(value.ValueType is not (KVValueType.Collection or KVValueType.Array))return;
        foreach(var (key,child) in value){if(BlockFields.Contains(key)){var index=Number(child);if(index>=0)action(value,key,index);}else BlockReferences(child,action);}
    }
    static Dictionary<string,KVObject> RootLocalPose(KVObject host,int parent,KVObject donor,int bone){
        System.Numerics.Matrix4x4 Pose(KVObject skeleton,int index){
            var pos=Values(skeleton,"m_bonePosParent")[index].Values.Select(v=>v.ToSingle(CultureInfo.InvariantCulture)).ToArray();
            var rot=Values(skeleton,"m_boneRotParent")[index].Values.Select(v=>v.ToSingle(CultureInfo.InvariantCulture)).ToArray();
            var scales=Values(skeleton,"m_boneScaleParent");var scale=scales.Length==0?1f:scales[index].ToSingle(CultureInfo.InvariantCulture);
            if(pos.Length!=3||rot.Length!=4||!pos.Concat(rot).Append(scale).All(float.IsFinite)||scale<=0)throw new InvalidDataException("Invalid root attachment bind pose");
            var q=new System.Numerics.Quaternion(rot[0],rot[1],rot[2],rot[3]);if(q.LengthSquared()<0.000001f)throw new InvalidDataException("Invalid root attachment rotation");
            return System.Numerics.Matrix4x4.CreateScale(scale)*System.Numerics.Matrix4x4.CreateFromQuaternion(System.Numerics.Quaternion.Normalize(q))*System.Numerics.Matrix4x4.CreateTranslation(pos[0],pos[1],pos[2]);
        }
        if(!System.Numerics.Matrix4x4.Invert(Pose(host,parent),out var inverse)||!System.Numerics.Matrix4x4.Decompose(Pose(donor,bone)*inverse,out var scale,out var rotation,out var translation))throw new InvalidDataException("Cannot preserve root attachment bind pose");
        if(Math.Abs(scale.X-scale.Y)>0.00001f||Math.Abs(scale.X-scale.Z)>0.00001f)throw new InvalidDataException("Nonuniform root attachment scale");
        return new(){["m_bonePosParent"]=Array(new[]{translation.X,translation.Y,translation.Z}.Select(v=>new KVObject(v))),["m_boneRotParent"]=Array(new[]{rotation.X,rotation.Y,rotation.Z,rotation.W}.Select(v=>new KVObject(v))),["m_boneScaleParent"]=new KVObject(scale.X)};
    }
    internal static int[] MergeSkeleton(KVObject host,KVObject donor,bool attachRootZero=false){
        var hostNames=Values(host,"m_boneName").Select(Text).ToList();var donorNames=Values(donor,"m_boneName").Select(Text).ToArray();
        if(hostNames.Distinct(StringComparer.Ordinal).Count()!=hostNames.Count||donorNames.Distinct(StringComparer.Ordinal).Count()!=donorNames.Length)throw new InvalidDataException("Duplicate skeleton bone name");
        var map=new int[donorNames.Length];var added=new List<int>();var attachedRoots=new Dictionary<int,(int Parent,Dictionary<string,KVObject> Pose)>();
        var donorParents=Values(donor,"m_nParent");if(donorParents.Length!=donorNames.Length)throw new InvalidDataException("Missing donor parents");
        for(var i=0;i<map.Length;i++){var index=hostNames.IndexOf(donorNames[i]);if(index<0){if(Number(donorParents[i])<0){
                var hostParents=Values(host,"m_nParent");var roots=hostParents.Select((p,index)=>(p,index)).Where(v=>Number(v.p)<0).Select(v=>v.index).ToArray();
                if(!attachRootZero||donorNames[i]!="root_0"||roots.Length!=1)throw new InvalidDataException("Donor root bone has no host attachment: "+donorNames[i]+" (host roots: "+string.Join(", ",roots.Select(r=>hostNames[r]))+")");
                attachedRoots[i]=(roots[0],RootLocalPose(host,roots[0],donor,i));
            }index=hostNames.Count;hostNames.Add(donorNames[i]);added.Add(i);}map[i]=index;}
        foreach(var key in new[]{"m_boneName","m_nParent","m_boneSphere","m_nFlag","m_bonePosParent","m_boneRotParent","m_boneScaleParent"}){
            var source=Values(donor,key);var original=Values(host,key);
            // Scale is optional in compiled model skeletons; an omitted or
            // empty array means identity scale, not an incomplete skeleton.
            // Sphere radii are also optional (no authored radius => zero).
            // Never pad a non-empty partial array: that hides malformed data.
            if(key=="m_boneScaleParent"||key=="m_boneSphere"){
                var fallback=key=="m_boneScaleParent"?1.0f:0.0f;
                if(original.Length==0)original=Enumerable.Range(0,hostNames.Count-added.Count).Select(_=>new KVObject(fallback)).ToArray();
                if(source.Length==0)source=Enumerable.Range(0,donorNames.Length).Select(_=>new KVObject(fallback)).ToArray();
            }
            if(original.Length!=hostNames.Count-added.Count||source.Length!=donorNames.Length)throw new InvalidDataException("Incomplete skeleton field: "+key+" (host "+original.Length+"/"+(hostNames.Count-added.Count)+", donor "+source.Length+"/"+donorNames.Length+")");
            var result=original.ToList();
            if(key=="m_nFlag"||key=="m_boneSphere")for(var i=0;i<map.Length;i++)if(map[i]<original.Length){if(key=="m_nFlag")result[map[i]]=new KVObject(unchecked((uint)(result[map[i]].ToInt64(CultureInfo.InvariantCulture)|source[i].ToInt64(CultureInfo.InvariantCulture))));else result[map[i]]=new KVObject(Math.Max(result[map[i]].ToDouble(CultureInfo.InvariantCulture),source[i].ToDouble(CultureInfo.InvariantCulture)));}
            foreach(var i in added){var value=source[i];if(attachedRoots.TryGetValue(i,out var attachment)&&attachment.Pose.TryGetValue(key,out var pose))value=pose;if(key=="m_nParent"){var parent=Number(value);if(parent>=map.Length||parent==i)throw new InvalidDataException("Invalid donor bone parent");value=new KVObject(attachedRoots.TryGetValue(i,out var rootAttachment)?rootAttachment.Parent:parent<0?-1:map[parent]);}result.Add(value);}host[key]=Array(result);
        }
        if(hostNames.Count>1024)throw new InvalidDataException("Combined skeleton exceeds 1024 bones");
        // Shared bones retain host poses. Newly appended bones retain donor local
        // poses under their mapped parent; vertex inverse bind matrices stay raw.
        return map;
    }
    internal static int[] RemapMeshBones(KVObject[] table,int start,int end,int[] boneMap,int? meshBoneCount,string context){
        if(start<0||end<start||end>table.Length)throw new InvalidDataException("Invalid donor remap range: "+context);
        // Some legacy models retain an obsolete palette tail between mesh
        // starts. Only the MDAT skeleton's bones address this mesh's palette.
        var count=meshBoneCount??(end-start);
        if(count<0||count>end-start)throw new InvalidDataException("Donor mesh palette is shorter than its skeleton: "+context);
        var result=new int[count];
        for(var i=0;i<count;i++){
            var bone=Number(table[start+i]);
            if(bone<0||bone>=boneMap.Length)throw new InvalidDataException("Donor vertex bone mapping is outside its skeleton: "+context+", palette["+i+"]="+bone+", skeleton bones="+boneMap.Length);
            result[i]=boneMap[bone];
        }
        return result;
    }
    static void EnsureArray(KVObject root,string key,int count,Func<KVObject> value){var rows=Values(root,key).ToList();while(rows.Count<count)rows.Add(value());root[key]=Array(rows);}
    static void AddReferences(Resource host,Resource donor){
        var target=host.ExternalReferences??throw new InvalidDataException("Host has no RERL");
        foreach(var reference in donor.ExternalReferences?.ResourceRefInfoList??[]){if(target.ResourceRefInfoList.Any(r=>r.Name==reference.Name))continue;target.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Name=reference.Name,Id=reference.Id});}
    }
    internal static string MergeParticleText(string host,string donor){
        if(string.IsNullOrWhiteSpace(donor))return host;
        var serializer=KVSerializer.Create(KVSerializationFormat.KeyValues3Text);
        using var input=new MemoryStream(System.Text.Encoding.UTF8.GetBytes(donor));var source=serializer.Deserialize(input);
        if(!source.Root.TryGetValue("particle_cfg_list",out var particles)||particles.Count==0)return host;
        if(string.IsNullOrWhiteSpace(host))host=ModelKeyText.AddParticles("",System.Array.Empty<string>());
        using var original=new MemoryStream(System.Text.Encoding.UTF8.GetBytes(host));var target=serializer.Deserialize(original);
        var rows=Values(target.Root,"particle_cfg_list").ToList();var known=rows.Where(r=>r.ContainsKey("name")).Select(r=>Text(r["name"])).ToHashSet(StringComparer.OrdinalIgnoreCase);
        foreach(var row in particles.Values)if(row.TryGetValue("name",out var name)&&known.Add(Text(name)))rows.Add(row);
        target.Root["particle_cfg_list"]=Array(rows);using var output=new MemoryStream();serializer.Serialize(output,target);return System.Text.Encoding.UTF8.GetString(output.ToArray());
    }
    static string EmbedExternalMeshes(string input,Dictionary<string,string>? meshes,List<string> temporary){
        var original=File.ReadAllBytes(input);using var model=new Resource{FileName=input};model.Read(input);
        if(model.DataBlock is not Model)throw new InvalidDataException("Expected model: "+input);
        var data=Read(model,original,model.DataBlock);var refs=Values(data.Data.Root,"m_refMeshes");
        if(!refs.Any(v=>MeshReference(v).Length>0))return input;
        var ctrlBlock=model.Blocks.FirstOrDefault(b=>b.Type==BlockType.CTRL);
        var ctrl=ctrlBlock is null?new BinaryKV3(KVObject.Collection(),new ValveKeyValue.KeyValues3.KV3ID("generic",new Guid("7412167c-06e9-4698-aff2-e63eb59037e7")),BlockType.CTRL){Resource=model}:Read(model,original,ctrlBlock);
        var rows=Values(ctrl.Data.Root,"embedded_meshes").ToList();
        var chunks=model.Blocks.Select(b=>new Chunk(b.Type,original.AsSpan((int)b.Offset,(int)b.Size).ToArray())).ToList();
        for(var meshIndex=0;meshIndex<refs.Length;meshIndex++){
            var reference=MeshReference(refs[meshIndex]);if(reference.Length==0)continue;
            var key=reference.Replace('\\','/');if(!key.EndsWith("_c",StringComparison.Ordinal))key+="_c";
            if(meshes is null||!meshes.TryGetValue(key,out var file))throw new InvalidDataException("Missing external mesh in merge manifest: "+key+" (model "+input+")");
            if(rows.Any(row=>MeshIndex(row)==meshIndex))throw new InvalidDataException("Mesh is both referenced and embedded: "+key);
            var bytes=File.ReadAllBytes(file);using var mesh=new Resource{FileName=file};mesh.Read(file);
            if(mesh.DataBlock is not Mesh)throw new InvalidDataException("External geometry is not a mesh: "+key);
            var meshData=Read(mesh,bytes,mesh.DataBlock);var map=new Dictionary<int,int>();
            int Copy(int index){
                if(map.TryGetValue(index,out var found))return found;
                if(index<0||index>=mesh.Blocks.Count)throw new InvalidDataException("External mesh block index invalid: "+key);
                var block=mesh.Blocks[index];var kind=block==mesh.DataBlock?BlockType.MDAT:block.Type;
                if(kind.ToString() is not ("MDAT" or "MBUF" or "VBIB" or "MVTX" or "MIDX" or "MRPH" or "MSLT" or "MADJ" or "TBUF"))throw new InvalidDataException("Unsupported external geometry block: "+kind+" / "+key);
                var target=chunks.Count;map[index]=target;chunks.Add(new Chunk(kind,bytes.AsSpan((int)block.Offset,(int)block.Size).ToArray()));return target;
            }
            // Copy geometry payloads unchanged, then relocate only descriptors.
            foreach(var block in mesh.Blocks)if(block==mesh.DataBlock||block.Type.ToString() is "MBUF" or "VBIB" or "MVTX" or "MIDX" or "MRPH" or "MSLT" or "MADJ" or "TBUF")Copy(mesh.Blocks.IndexOf(block));
            var row=KVObject.Collection();var name=Path.GetFileNameWithoutExtension(reference);
            var vbib=mesh.Blocks.FirstOrDefault(b=>b.Type==BlockType.VBIB);var morph=mesh.Blocks.FirstOrDefault(b=>b.Type==BlockType.MRPH);
            if(vbib is not null){
                row["name"]=new KVObject(name);row["mesh_index"]=new KVObject(meshIndex);row["data_block"]=new KVObject(Copy(mesh.Blocks.IndexOf(mesh.DataBlock)));row["vbib_block"]=new KVObject(Copy(mesh.Blocks.IndexOf(vbib)));row["morph_block"]=new KVObject(morph is null?-1:Copy(mesh.Blocks.IndexOf(morph)));
                var tools=mesh.Blocks.FirstOrDefault(b=>b.Type.ToString()=="TBUF");if(tools is not null)row["tools_vb_block"]=new KVObject(Copy(mesh.Blocks.IndexOf(tools)));
            }else{
                foreach(var keyName in new[]{"m_vertexBuffers","m_indexBuffers","m_toolsBuffers"})if(meshData.Data.Root.TryGetValue(keyName,out var buffers))row[keyName]=buffers;
                if(!row.ContainsKey("m_vertexBuffers")||!row.ContainsKey("m_indexBuffers"))throw new InvalidDataException("External mesh buffer descriptors missing: "+key);
                BlockReferences(meshData.Data.Root,(parent,field,index)=>parent[field]=new KVObject(Copy(index)));
                row["m_Name"]=new KVObject(name);row["m_nMeshIndex"]=new KVObject(meshIndex);row["m_nDataBlock"]=new KVObject(Copy(mesh.Blocks.IndexOf(mesh.DataBlock)));row["m_nMorphBlock"]=new KVObject(morph is null?-1:Copy(mesh.Blocks.IndexOf(morph)));
                // DATA can also contain buffer block descriptors; update a copy
                // of the decoded mesh data, leaving vertex/index bytes intact.
                chunks[Copy(mesh.Blocks.IndexOf(mesh.DataBlock))]=new Chunk(BlockType.MDAT,Serialize(meshData,bytes[(int)mesh.DataBlock.Offset]));
            }
            rows.Add(row);refs[meshIndex]=new KVObject(""){Flag=KVFlag.Resource};AddReferences(model,mesh);
        }
        data.Data.Root["m_refMeshes"]=Array(refs);ctrl.Data.Root["embedded_meshes"]=Array(rows);
        chunks[model.Blocks.IndexOf(model.DataBlock)]=new Chunk(BlockType.DATA,Serialize(data,original[(int)model.DataBlock.Offset]));
        var ctrlBytes=Serialize(ctrl,ctrlBlock is null?original[(int)model.DataBlock.Offset]:original[(int)ctrlBlock.Offset]);
        if(ctrlBlock is null)chunks.Add(new Chunk(BlockType.CTRL,ctrlBytes));else chunks[model.Blocks.IndexOf(ctrlBlock)]=new Chunk(BlockType.CTRL,ctrlBytes);
        if(model.ExternalReferences is {} references){using var buffer=new MemoryStream();references.Serialize(buffer);chunks[model.Blocks.IndexOf(references)]=new Chunk(BlockType.RERL,buffer.ToArray());}
        var output=input+".embedded-"+Guid.NewGuid().ToString("N")+".vmdl_c";temporary.Add(output);Write(original,chunks,output);
        using var check=new Resource{FileName=output};check.Read(output);if(check.DataBlock is not Model combined||combined.GetEmbeddedMeshes().Count()!=rows.Count)throw new InvalidDataException("External mesh embedding validation failed: "+input);
        return output;
    }
    public static void Run(string manifest){
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty mesh merge manifest");
        if(request.Donors.Length is <1 or >32)throw new InvalidDataException("Choose 1–32 merge donors");
        var temporary=new List<string>();
        try{
            request=request with{Input=EmbedExternalMeshes(request.Input,request.Meshes,temporary),Donors=request.Donors.Select(d=>d.MetadataOnly?d:d with{Input=EmbedExternalMeshes(d.Input,request.Meshes,temporary)}).ToArray()};
            RunEmbedded(request);
        }finally{foreach(var file in temporary)File.Delete(file);}
    }
    static void RunEmbedded(Request request){
        var original=File.ReadAllBytes(request.Input);using var host=new Resource{FileName=request.Input};host.Read(request.Input);if(host.DataBlock is not Model)throw new InvalidDataException("Merge host must be a model");
        var dataBlock=host.DataBlock;var ctrlBlock=host.Blocks.Single(b=>b.Type==BlockType.CTRL);var data=Read(host,original,dataBlock);var ctrl=Read(host,original,ctrlBlock);var root=data.Data.Root;var control=ctrl.Data.Root;
        var meshRows=Values(control,"embedded_meshes").ToList();if(meshRows.Count==0)throw new InvalidDataException("Merge host has no embedded meshes");
        var chunks=host.Blocks.Select(b=>new Chunk(b.Type,original.AsSpan((int)b.Offset,(int)b.Size).ToArray())).ToList();var imported=new List<string>();
        var meshGroups=Values(root,"m_meshGroups").ToList();if(meshGroups.Count>=63)throw new InvalidDataException("Host has no free mesh group bit");
        var mergedMask=1UL<<meshGroups.Count;meshGroups.Add(new KVObject("harlord_merged"));root["m_meshGroups"]=Array(meshGroups);
        root["m_nDefaultMeshGroupMask"]=new KVObject((root.TryGetValue("m_nDefaultMeshGroupMask",out var maskValue)?Mask(maskValue):ulong.MaxValue)|mergedMask);
        var originalSkeleton=Values(root["m_modelSkeleton"],"m_boneName").Select(Text).ToArray();
        foreach(var entry in request.Donors){
            var bytes=File.ReadAllBytes(entry.Input);using var donor=new Resource{FileName=entry.Input};donor.Read(entry.Input);if(donor.DataBlock is not Model)throw new InvalidDataException("Merge donor must be a model");
            var source=Read(donor,bytes,donor.DataBlock).Data.Root;var sourceCtrl=Read(donor,bytes,donor.Blocks.Single(b=>b.Type==BlockType.CTRL)).Data.Root;
            if(Values(source,"m_refMeshes").Any(v=>MeshReference(v).Length>0))throw new InvalidDataException("External donor meshes must be embedded before merging");
            if(Values(source,"m_boneFlexDrivers").Length>0)throw new InvalidDataException("Donor bone flex drivers require a dedicated merge profile");
            if(!entry.MetadataOnly&&donor.Blocks.Any(b=>b.Type==BlockType.PHYS&&(b.ToString()?.Contains("m_cloth",StringComparison.OrdinalIgnoreCase)??false)))throw new InvalidDataException("Donor contains cloth physics; use a dedicated merge profile");
            if(!entry.MetadataOnly&&Values(source,"m_ExtParts").Length>0)throw new InvalidDataException("Donor external parts require a dedicated merge profile");
            if(!entry.MetadataOnly){
                var donorMorph=donor.Blocks.FirstOrDefault(b=>b.Type==BlockType.MRPH);var hostMorph=host.Blocks.FirstOrDefault(b=>b.Type==BlockType.MRPH);
                if(donorMorph is not null){var controls=Values(Read(donor,bytes,donorMorph).Data.Root,"m_FlexControllers").Select(v=>Text(v["m_szName"])).ToArray();var originalControls=hostMorph is null?System.Array.Empty<string>():Values(Read(host,original,hostMorph).Data.Root,"m_FlexControllers").Select(v=>Text(v["m_szName"])).ToArray();if(!controls.SequenceEqual(originalControls.Take(controls.Length)))throw new InvalidDataException("Donor morph controller order requires a dedicated merge profile");}
            }
            var boneMap=entry.MetadataOnly?System.Array.Empty<int>():MergeSkeleton(root["m_modelSkeleton"],source["m_modelSkeleton"],entry.AttachRootZero);
            var boneTable=Values(root,"m_remappingTable").ToList();var starts=Values(root,"m_remappingTableStarts").ToList();var sourceTable=Values(source,"m_remappingTable");var sourceStarts=Values(source,"m_remappingTableStarts");
            var sourceGroups=Values(source,"m_refMeshGroupMasks");var sourceDefault=source.TryGetValue("m_nDefaultMeshGroupMask",out var sourceMask)?Mask(sourceMask):ulong.MaxValue;
            var sourceRows=Values(sourceCtrl,"embedded_meshes").Where(r=>!entry.MetadataOnly).Where(r=>MeshIndex(r)>=sourceGroups.Length||(Mask(sourceGroups[MeshIndex(r)])&sourceDefault)!=0).Where(r=>entry.MeshNames is null||entry.MeshNames.Contains(MeshName(r),StringComparer.Ordinal)).ToArray();
            if(!entry.MetadataOnly&&sourceRows.Length==0||entry.MeshNames?.Any(name=>!sourceRows.Any(r=>MeshName(r)==name))==true)throw new InvalidDataException("Requested donor mesh not found");
            var blocks=new Dictionary<int,int>();
            int CopyBlock(int index){if(index<0||index>=donor.Blocks.Count)throw new InvalidDataException("Invalid donor mesh block index");if(blocks.TryGetValue(index,out var mapped))return mapped;var b=donor.Blocks[index];if(b.Type.ToString() is not ("MDAT" or "MBUF" or "VBIB" or "MVTX" or "MIDX" or "MRPH" or "MSLT" or "MADJ" or "TBUF"))throw new InvalidDataException("Unexpected donor geometry block: "+b.Type);mapped=chunks.Count;chunks.Add(new Chunk(b.Type,bytes.AsSpan((int)b.Offset,(int)b.Size).ToArray()));blocks[index]=mapped;return mapped;}
            var nextIndex=new[]{meshRows.Max(MeshIndex)+1,starts.Count,Values(root,"m_refMeshes").Length,Values(root,"m_refMeshGroupMasks").Length}.Max();
            foreach(var row in sourceRows){
                var oldIndex=MeshIndex(row);var newIndex=nextIndex++;var name=MeshName(row);imported.Add(name);
                if(oldIndex>=sourceStarts.Length)throw new InvalidDataException("Donor remap start missing: "+name);
                var start=Number(sourceStarts[oldIndex]);var end=oldIndex+1<sourceStarts.Length?Number(sourceStarts[oldIndex+1]):sourceTable.Length;
                if(start<0||end<start||end>sourceTable.Length)throw new InvalidDataException("Invalid donor remap range");
                while(starts.Count<newIndex)starts.Add(new KVObject(boneTable.Count));starts.Add(new KVObject(boneTable.Count));
                var meshBlock=Number(row[Field(row,"m_nDataBlock","data_block")]);
                if(meshBlock<0||meshBlock>=donor.Blocks.Count||donor.Blocks[meshBlock].Type!=BlockType.MDAT)throw new InvalidDataException("Invalid donor MDAT: "+name);
                var meshData=Read(donor,bytes,donor.Blocks[meshBlock]).Data.Root;
                int? meshBoneCount=meshData.TryGetValue("m_skeleton",out var meshSkeleton)&&meshSkeleton.ContainsKey("m_bones")?Values(meshSkeleton,"m_bones").Length:null;
                foreach(var bone in RemapMeshBones(sourceTable,start,end,boneMap,meshBoneCount,entry.Input+" / "+name))boneTable.Add(new KVObject(bone));
                BlockReferences(row,(parent,key,index)=>parent[key]=new KVObject(CopyBlock(index)));
                row[Field(row,"m_nMeshIndex","mesh_index")]=new KVObject(newIndex);meshRows.Add(row);
                EnsureArray(root,"m_refMeshes",newIndex+1,()=>new KVObject(""){Flag=KVFlag.Resource});
                EnsureArray(root,"m_refMeshGroupMasks",newIndex+1,()=>new KVObject(ulong.MaxValue));var groupMasks=Values(root,"m_refMeshGroupMasks");groupMasks[newIndex]=new KVObject(mergedMask);root["m_refMeshGroupMasks"]=Array(groupMasks);
                var lod=Values(source,"m_refLODGroupMasks");var mask=oldIndex<lod.Length?lod[oldIndex]:new KVObject(ulong.MaxValue);
                EnsureArray(root,"m_refLODGroupMasks",newIndex+1,()=>new KVObject(ulong.MaxValue));var masks=Values(root,"m_refLODGroupMasks");masks[newIndex]=mask;root["m_refLODGroupMasks"]=Array(masks);
            }
            root["m_remappingTable"]=Array(boneTable);root["m_remappingTableStarts"]=Array(starts);
            // Keep material choices on draw calls; material groups append the
            // selected donor materials to each host skin instead of changing it.
            var donorGroups=Values(source,"m_materialGroups");var donorMaterials=entry.MetadataOnly?System.Array.Empty<KVObject>():donorGroups.Length>0?Values(donorGroups[0],"m_materials"):donor.Blocks.Where(b=>blocks.ContainsKey(donor.Blocks.IndexOf(b))&&b.Type==BlockType.MDAT).SelectMany(b=>Values(Read(donor,bytes,b).Data.Root,"m_sceneObjects")).SelectMany(scene=>Values(scene,"m_drawCalls")).Where(draw=>draw.ContainsKey("m_material")).Select(draw=>draw["m_material"]).DistinctBy(Text).ToArray();
            foreach(var group in Values(root,"m_materialGroups"))group["m_materials"]=Array(Values(group,"m_materials").Concat(donorMaterials));
            var info=root["m_modelInfo"];var sourceInfo=source["m_modelInfo"];if(sourceInfo.TryGetValue("m_keyValueText",out var text)&&Text(text).Length>0)info["m_keyValueText"]=new KVObject(MergeParticleText(info.TryGetValue("m_keyValueText",out var old)?Text(old):"",Text(text)));
            AddReferences(host,donor);
            foreach(var key in new[]{"pool_size_hint","pool_size_hint_mesh"})if(control.TryGetValue(key,out var hint))control[key]=new KVObject(checked(hint.ToInt64(CultureInfo.InvariantCulture)+(sourceCtrl.TryGetValue(key,out var sourceHint)?sourceHint.ToInt64(CultureInfo.InvariantCulture):bytes.Length*4L)));
        }
        control["embedded_meshes"]=Array(meshRows);
        chunks[host.Blocks.IndexOf(dataBlock)]=new Chunk(dataBlock.Type,Serialize(data,original[(int)dataBlock.Offset]));chunks[host.Blocks.IndexOf(ctrlBlock)]=new Chunk(ctrlBlock.Type,Serialize(ctrl,original[(int)ctrlBlock.Offset]));
        if(host.ExternalReferences is { } references){using var buffer=new MemoryStream();references.Serialize(buffer);chunks[host.Blocks.IndexOf(references)]=new Chunk(references.Type,buffer.ToArray());}
        Write(original,chunks,request.Output);
        using var check=new Resource{FileName=request.Output};check.Read(request.Output);var combined=check.DataBlock as Model??throw new InvalidDataException("Merged resource is not a model");var names=Values(combined.Data["m_modelSkeleton"],"m_boneName").Select(Text).ToArray();if(!names.Take(originalSkeleton.Length).SequenceEqual(originalSkeleton))throw new InvalidDataException("Host bone indices changed");
        var decodedMeshes=combined.GetEmbeddedMeshes().ToArray();if(decodedMeshes.Length!=meshRows.Count)throw new InvalidDataException("Merged mesh count mismatch");
        var written=File.ReadAllBytes(request.Output);for(var i=0;i<host.Blocks.Count;i++){var b=host.Blocks[i];if(b.Type is BlockType.DATA or BlockType.CTRL or BlockType.RERL)continue;var after=check.Blocks[i];if(!original.AsSpan((int)b.Offset,(int)b.Size).SequenceEqual(written.AsSpan((int)after.Offset,(int)after.Size)))throw new InvalidDataException("Host animation/physics payload changed: "+b.Type);}
        File.WriteAllText(request.Output+".merge.json",JsonSerializer.Serialize(new{meshes=imported,bones=names.Length,preservedHostBlocks=host.Blocks.Count}));Console.WriteLine("[OK] Embedded model merge: "+imported.Count+" meshes, "+names.Length+" bones; host animations and physics preserved");
    }
    static void Write(byte[] original,List<Chunk> chunks,string output){
        using var stream=File.Create(output);using var writer=new BinaryWriter(stream);writer.Write(0u);writer.Write(original.AsSpan(4,4));writer.Write(8u);writer.Write((uint)chunks.Count);writer.Write(new byte[chunks.Count*12]);
        for(var i=0;i<chunks.Count;i++){var pad=(int)((16-stream.Position%16)%16);writer.Write(new byte[pad]);var start=stream.Position;writer.Write(chunks[i].Bytes);var end=stream.Position;var field=16L+i*12;stream.Position=field;writer.Write((uint)chunks[i].Type);writer.Write(checked((uint)(start-field-4)));writer.Write((uint)chunks[i].Bytes.Length);stream.Position=end;}
        stream.Position=0;writer.Write(checked((uint)stream.Length));
    }
}
