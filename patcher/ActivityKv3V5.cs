using System.Text;
using ValveKeyValue;
using ValveResourceFormat.ResourceTypes;

// Uncompressed KV3 v5 for large activity tables. The 16-bit allocation hints
// saturate; the full counts remain in the v5 32-bit fields. Numeric lanes,
// flags and binary blobs retain their types and exact values.
internal static class ActivityKv3V5
{
    internal static byte[] Serialize(BinaryKV3 binary)
    {
        using var objects=new MemoryStream();using var tw=new MemoryStream();
        using var i2=new MemoryStream();using var i4=new MemoryStream();using var i8=new MemoryStream();using var blobs=new MemoryStream();
        using var ow=new BinaryWriter(objects);using var types=new BinaryWriter(tw);
        using var w2=new BinaryWriter(i2);using var w4=new BinaryWriter(i4);using var w8=new BinaryWriter(i8);using var bw=new BinaryWriter(blobs);
        var strings=new Dictionary<string,int>(StringComparer.Ordinal);var lengths=new List<int>();
        int countObjects=0,countArrays=0,countNodes=0,countElements=0;
        int StringId(string text){if(text.Length==0)return -1;if(!strings.TryGetValue(text,out var id)){id=strings.Count;strings.Add(text,id);}return id;}
        void Type(byte code,KVFlag flag){types.Write(flag==KVFlag.None?code:(byte)(code|0x80));if(flag!=KVFlag.None)types.Write((byte)flag);}
        void Visit(KVObject value){
            countNodes=checked(countNodes+1);
            byte code=value.ValueType switch{
                KVValueType.Null=>1,KVValueType.Boolean=>(bool)value?(byte)13:(byte)14,
                KVValueType.Int64=>3,KVValueType.UInt64=>4,KVValueType.FloatingPoint64=>5,
                KVValueType.String=>6,KVValueType.BinaryBlob=>7,KVValueType.Array=>8,KVValueType.Collection=>9,
                KVValueType.Int32=>11,KVValueType.UInt32=>12,KVValueType.FloatingPoint=>19,KVValueType.Int16=>20,KVValueType.UInt16=>21,
                _=>throw new InvalidDataException("Unsupported activity value: "+value.ValueType)};
            Type(code,value.Flag);
            switch(value.ValueType){
                case KVValueType.Null:case KVValueType.Boolean:break;
                case KVValueType.Int16:w2.Write((short)value);break;
                case KVValueType.UInt16:w2.Write((ushort)value);break;
                case KVValueType.Int32:w4.Write((int)value);break;
                case KVValueType.UInt32:w4.Write((uint)value);break;
                case KVValueType.FloatingPoint:w4.Write((float)value);break;
                case KVValueType.Int64:w8.Write((long)value);break;
                case KVValueType.UInt64:w8.Write((ulong)value);break;
                case KVValueType.FloatingPoint64:w8.Write((double)value);break;
                case KVValueType.String:w4.Write(StringId((string)value));break;
                case KVValueType.BinaryBlob:var data=value.AsBlob();lengths.Add(data.Length);bw.Write(data);break;
                case KVValueType.Collection:
                    countObjects=checked(countObjects+1);ow.Write(value.Count);
                    foreach(var (name,child) in value){w4.Write(StringId(name));Visit(child);}break;
                case KVValueType.Array:
                    countArrays=checked(countArrays+1);countElements=checked(countElements+Math.Max(value.Count,1));w4.Write(value.Count);
                    foreach(var child in value.Values)Visit(child);break;
            }
        }
        Visit(binary.Data.Root);
        static void Align(BinaryWriter writer,int alignment){while(writer.BaseStream.Position%alignment!=0)writer.Write((byte)0);}
        using var first=new MemoryStream();using var fw=new BinaryWriter(first);
        foreach(var text in strings.Keys){fw.Write(Encoding.UTF8.GetBytes(text));fw.Write((byte)0);}
        var stringBytes=checked((int)first.Length);Align(fw,4);fw.Write(strings.Count);
        using var second=new MemoryStream();using var sw=new BinaryWriter(second);
        void Lane(MemoryStream lane,int alignment){if(lane.Length==0)return;Align(sw,alignment);sw.Write(lane.GetBuffer(),0,checked((int)lane.Length));}
        Lane(objects,4);Lane(i2,2);Lane(i4,4);Lane(i8,8);Lane(tw,1);
        foreach(var length in lengths)sw.Write(length);sw.Write(0xFFEEDD00u);
        using var output=new MemoryStream();using var writer=new BinaryWriter(output);
        var firstSize=checked((int)first.Length);var secondSize=checked((int)second.Length);
        writer.Write(0x4B563305u);writer.Write(binary.Data.Header!.Format.Id.ToByteArray());
        writer.Write(0u);writer.Write((ushort)0);writer.Write((ushort)0);
        writer.Write(stringBytes);writer.Write(1);writer.Write(0);writer.Write(checked((int)tw.Length));
        writer.Write((ushort)Math.Min(countObjects,ushort.MaxValue));writer.Write((ushort)Math.Min(countArrays,ushort.MaxValue));
        writer.Write(checked(firstSize+secondSize));writer.Write(checked(firstSize+secondSize));
        writer.Write(lengths.Count);writer.Write(checked((int)blobs.Length));writer.Write(0);writer.Write(0);
        writer.Write(firstSize);writer.Write(0);writer.Write(secondSize);writer.Write(0);
        writer.Write(0);writer.Write(checked((int)i2.Length/2));writer.Write(checked((int)i4.Length/4));writer.Write(checked((int)i8.Length/8));
        writer.Write(countNodes);writer.Write(countObjects);writer.Write(countArrays);writer.Write(countElements);
        if(output.Length!=120)throw new InvalidDataException("Invalid activity v5 header size");
        writer.Write(first.GetBuffer(),0,firstSize);writer.Write(second.GetBuffer(),0,secondSize);
        writer.Write(blobs.GetBuffer(),0,checked((int)blobs.Length));if(lengths.Count>0)writer.Write(0xFFEEDD00u);
        return output.ToArray();
    }
}
