using ValveResourceFormat;using ValveResourceFormat.Blocks;using ValveResourceFormat.ResourceTypes;using ValveResourceFormat.ResourceTypes.ModelAnimation;using ValveKeyValue;using System.Globalization;using System.Numerics;using System.Text.Json;
// Correct the entity-scale difference without modifying vertex buffers or
// inverse bind poses. Scale root bind/decode poses and only root translation /
// scale tracks; descendants, rotations, morph channels and timing stay intact.
// Bone-merged wearables inherit the resulting hero bone transforms once.
internal static class PersonaScale{
 static KVObject[] Values(KVObject v,string key)=>v.TryGetValue(key,out var a)?a.Values.ToArray():[];
 static string Text(KVObject v)=>v.ToString(CultureInfo.InvariantCulture);
 static void Vector(KVObject v,float s){for(var i=0;i<v.Count;i++)v.AsArraySpan()[i]=new KVObject(v[i].ToSingle()*s);}
 private sealed record Request(string Input,string Output,float Scale);
 public static void Run(string manifest){var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty persona scale request");if(!float.IsFinite(request.Scale)||request.Scale<0.25f||request.Scale>4)throw new InvalidDataException("Invalid persona scale factor");Run(request.Input,request.Output,request.Scale);}
 public static void Run(string input,string output,float scale){
 if(!float.IsFinite(scale)||scale<0.25f||scale>4)throw new InvalidDataException("Invalid persona scale factor");
 var bytes=File.ReadAllBytes(input);using var r=new Resource();r.Read(input);var model=r.DataBlock as Model??throw new InvalidDataException("Persona scale input is not a model");
 var binary=new Dictionary<Block,BinaryKV3>();BinaryKV3 Read(Block b){if(binary.TryGetValue(b,out var k))return k;k=new BinaryKV3(b.Type){Resource=r,Offset=b.Offset,Size=b.Size};using var rd=new BinaryReader(new MemoryStream(bytes));rd.BaseStream.Position=b.Offset;k.Read(rd);binary.Add(b,k);return k;}
 var data=Read(r.DataBlock!).Data.Root;var skeleton=data["m_modelSkeleton"];var roots=Values(skeleton,"m_nParent").Select((p,i)=>(p,i)).Where(v=>v.p.ToInt32()<0).Select(v=>v.i).ToArray();var names=roots.Select(i=>Text(skeleton["m_boneName"][i])).ToHashSet();if(roots.Length==0)throw new InvalidDataException("Persona skeleton has no root bone");
 foreach(var i in roots){Vector(skeleton["m_bonePosParent"][i],scale);skeleton["m_boneScaleParent"].AsArraySpan()[i]=new KVObject(skeleton["m_boneScaleParent"][i].ToSingle()*scale);}
 var groups=r.Blocks.Where(b=>b.Type==BlockType.AGRP).Select(Read).ToArray();if(groups.Length!=1||model.GetReferencedAnimationGroupNames().Any(n=>!string.IsNullOrWhiteSpace(n)))throw new InvalidDataException("Persona scale requires embedded animation groups");
 var decode=groups[0].Data.Root["m_decodeKey"];foreach(var bone in Values(decode,"m_boneArray"))if(names.Contains(Text(bone["m_name"]))){Vector(bone["m_pos"],scale);bone["m_scale"]=new KVObject(bone["m_scale"].ToSingle()*scale);}
 var channels=Values(decode,"m_dataChannelArray");int modified=0;
 foreach(var block in r.Blocks.Where(b=>b.Type==BlockType.ANIM)){
  var animation=Read(block).Data.Root;var decoders=Values(animation,"m_decoderArray").Select(v=>Text(v["m_szName"])).ToArray();
  foreach(var segment in Values(animation,"m_segmentArray")){
   var channel=channels[segment["m_nLocalChannel"].ToInt32()];var variable=Text(channel["m_szVariableName"]);if(Text(channel["m_szChannelClass"])!="BoneChannel"||variable is not ("Position" or "Scale"))continue;
   var targets=Values(channel,"m_szElementNameArray").Select((v,i)=>(v,i)).Where(x=>names.Contains(Text(x.v))).Select(x=>channel["m_nElementIndexArray"][x.i].ToInt32()).ToHashSet();var blob=segment["m_container"].AsBlob();var count=BitConverter.ToUInt16(blob,4);var header=8+count*2;var selected=Enumerable.Range(0,count).Where(i=>targets.Contains(BitConverter.ToUInt16(blob,8+i*2))).ToArray();if(selected.Length==0)continue;
   var decoder=decoders[BitConverter.ToUInt16(blob,0)];var components=variable=="Position"?3:1;
   void F(int at){var value=BitConverter.ToSingle(blob,at)*scale;if(!float.IsFinite(value))throw new InvalidDataException("Nonfinite scaled float");BitConverter.GetBytes(value).CopyTo(blob,at);}
   void H(int at){var value=(Half)((float)BitConverter.UInt16BitsToHalf(BitConverter.ToUInt16(blob,at))*scale);if(!Half.IsFinite(value))throw new InvalidDataException("Nonfinite scaled half");BitConverter.GetBytes(BitConverter.HalfToUInt16Bits(value)).CopyTo(blob,at);}
   if(decoder is "CCompressedStaticFloat" or "CCompressedFullFloat" or "CCompressedStaticFullVector3" or "CCompressedFullVector3"){
    var stride=count*components*4;if((blob.Length-header)%stride!=0)throw new InvalidDataException("Unknown full float layout");for(var frame=0;frame<(blob.Length-header)/stride;frame++)foreach(var i in selected)for(var c=0;c<components;c++)F(header+frame*stride+(i*components+c)*4);
   }else if(decoder is "CCompressedStaticVector3" or "CCompressedAnimVector3"){
    var stride=count*6;if((blob.Length-header)%stride!=0)throw new InvalidDataException("Unknown half vector layout");for(var frame=0;frame<(blob.Length-header)/stride;frame++)foreach(var i in selected)for(var c=0;c<3;c++)H(header+frame*stride+i*6+c*2);
   }else if(decoder=="CCompressedDeltaVector3"){
    var deltas=header+count*12;var stride=count*6;if(blob.Length<deltas||(blob.Length-deltas)%stride!=0)throw new InvalidDataException("Unknown delta vector layout");foreach(var i in selected)for(var c=0;c<3;c++)F(header+i*12+c*4);for(var frame=0;frame<(blob.Length-deltas)/stride;frame++)foreach(var i in selected)for(var c=0;c<3;c++)H(deltas+frame*stride+i*6+c*2);
   }else throw new InvalidDataException("Unsupported root decoder: "+decoder);
   modified++;
  }
 }
 foreach(var key in new[]{"m_vHullMin","m_vHullMax","m_vViewMin","m_vViewMax","m_vEyePosition"})if(data["m_modelInfo"].TryGetValue(key,out var v))Vector(v,scale);
 foreach(var block in r.Blocks.Where(b=>b.Type==BlockType.MDAT))foreach(var scene in Values(Read(block).Data.Root,"m_sceneObjects"))foreach(var key in new[]{"m_vMinBounds","m_vMaxBounds"})if(scene.TryGetValue(key,out var bounds))Vector(bounds,scale);
 var raw=new Dictionary<object,byte[]>();foreach(var (b,k)in binary)raw[b]=HeroActivityRules.SerializeActivity(k,bytes[(int)b.Offset]);
 using(var stream=File.Create(output))Program.SerializePatchedResource(r,bytes,stream,false,preserveMetadata:true,rawBlocks:raw);
 using var written=new Resource();written.Read(output);var updated=written.DataBlock as Model??throw new InvalidDataException("Scaled resource is not a model");
 var writtenBytes=File.ReadAllBytes(output);for(var i=0;i<r.Blocks.Count;i++){var block=r.Blocks[i];if(raw.ContainsKey(block))continue;var other=written.Blocks[i];if(!bytes.AsSpan((int)block.Offset,(int)block.Size).SequenceEqual(writtenBytes.AsSpan((int)other.Offset,(int)other.Size)))throw new InvalidDataException("Persona immutable block changed: "+block.Type);}
 var before=model.GetEmbeddedAnimations().ToArray();var after=updated.GetEmbeddedAnimations().ToArray();if(before.Length!=after.Length)throw new InvalidDataException("Animation count changed");var frames=0;
 for(var i=0;i<before.Length;i++){if(before[i].Name!=after[i].Name||before[i].FrameCount!=after[i].FrameCount||before[i].Fps!=after[i].Fps)throw new InvalidDataException("Animation timing changed");
  var a=new Frame(model.Skeleton,model.FlexControllers);var b=new Frame(updated.Skeleton,updated.FlexControllers);
  for(var fi=0;fi<before[i].FrameCount;fi++){
   a.Clear(model.Skeleton);b.Clear(updated.Skeleton);a.FrameIndex=b.FrameIndex=fi;before[i].DecodeFrame(a);after[i].DecodeFrame(b);if(!a.Datas.SequenceEqual(b.Datas))throw new InvalidDataException("Facial animation changed");
   for(var bone=0;bone<a.Bones.Length;bone++){var s=roots.Contains(bone)?scale:1f;var av=a.Bones[bone];var bv=b.Bones[bone];if(Vector3.Distance(av.Position*s,bv.Position)>0.05f||Math.Abs(av.Scale*s-bv.Scale)>0.0002f||Math.Abs(Quaternion.Dot(av.Angle,bv.Angle))<0.99999f)throw new InvalidDataException($"Pose mismatch {before[i].Name} frame {fi} bone {bone}: {av.Position} => {bv.Position}; scales {av.Scale} => {bv.Scale}");}frames++;
  }
 }
 Console.WriteLine($"Persona scale verified {before.Length} animations / {frames} frames / {modified} segments");
 }
}
