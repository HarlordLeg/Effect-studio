using System.Reflection;using System.Text.Json;using System.Text;using ValveResourceFormat;using ValveResourceFormat.ResourceTypes;
var root=Path.Combine(Path.GetTempPath(),"harlord-minimap-"+Guid.NewGuid().ToString("N"));Directory.CreateDirectory(root);
try{
 string input=Path.Combine(root,"atlas.vtex_c"),output=Path.Combine(root,"patched.vtex_c"),manifest=Path.Combine(root,"request.json");byte[] original=[20,20,20,255,255,0,0,128,0,255,0,255,0,0,255,255];
 using(var stream=File.Create(input))using(var w=new BinaryWriter(stream)){w.Write(68u);w.Write((ushort)12);w.Write((ushort)1);w.Write(8u);w.Write(1u);w.Write(Encoding.ASCII.GetBytes("DATA"));w.Write(8u);w.Write(40u);w.Write((ushort)1);w.Write((ushort)8);for(var i=0;i<4;i++)w.Write(0f);w.Write((ushort)4);w.Write((ushort)1);w.Write((ushort)1);w.Write((byte)4);w.Write((byte)1);w.Write(0u);w.Write(0u);w.Write(0u);w.Write(original);}
 var method=Assembly.Load("Dota2UnusualPatcher").GetType("MinimapIcons")!.GetMethod("Run",BindingFlags.Public|BindingFlags.Static)!;
 object Rect(int x,int width=1)=>new {x,y=0,width,height=1};
 void Apply(object[] operations){File.WriteAllText(manifest,JsonSerializer.Serialize(new {files=new[]{new {input,output,operations}}}));method.Invoke(null,new object[]{manifest});}
 Apply(new object[]{new {target="A",source="B",targetRect=Rect(0),sourceRect=Rect(1)},new {target="B",source="C",targetRect=Rect(1),sourceRect=Rect(2)}});
 using(var r=new Resource{FileName=output}){r.Read(output);var t=(Texture)r.DataBlock;var bytes=File.ReadAllBytes(output).AsSpan((int)(t.Offset+t.Size)).ToArray();if(!bytes.AsSpan(0,4).SequenceEqual(original.AsSpan(4,4))||!bytes.AsSpan(4,4).SequenceEqual(original.AsSpan(8,4))||!bytes.AsSpan(8).SequenceEqual(original.AsSpan(8))||t.Width!=4||t.Flags!=(VTexFlags)8)throw new Exception("Minimap pixel copy changed an unrelated cell or cascaded donor data");}
 Apply(new object[]{new {target="tinted",source="red",targetRect=Rect(0),sourceRect=Rect(1),color=new[]{0,0,255},inputIcon=input}});
 using(var r=new Resource{FileName=output}){r.Read(output);var t=(Texture)r.DataBlock;var bytes=File.ReadAllBytes(output).AsSpan((int)(t.Offset+t.Size)).ToArray();if(bytes[0]!=0||bytes[1]!=0||bytes[2]!=255||bytes[3]!=128||!bytes.AsSpan(4).SequenceEqual(original.AsSpan(4)))throw new Exception("Minimap RGB changed alpha, a neighboring icon or the requested color");}
 foreach(var operations in new[]{new object[]{new {target="outside",source="B",targetRect=Rect(4),sourceRect=Rect(1)}},new object[]{new {target="A",source="B",targetRect=Rect(0,2),sourceRect=Rect(1,2)},new {target="overlap",source="B",targetRect=Rect(1),sourceRect=Rect(3)}}}){try{Apply(operations);throw new Exception("Invalid minimap rectangles were accepted");}catch(TargetInvocationException error)when(error.InnerException is InvalidDataException){}}
 var type=Assembly.Load("Dota2UnusualPatcher").GetType("MinimapIcons")!;var rectType=type.GetNestedType("Rect",BindingFlags.NonPublic)!;
 var tupleType=typeof(ValueTuple<,>).MakeGenericType(rectType,rectType);var resizing=Array.CreateInstance(tupleType,1);
 resizing.SetValue(Activator.CreateInstance(tupleType,Activator.CreateInstance(rectType,0,0,2,1),Activator.CreateInstance(rectType,3,0,1,1)),0);
 var resized=(byte[])type.GetMethod("CopyCells",BindingFlags.Static|BindingFlags.NonPublic)!.Invoke(null,new object[]{original,4,1,resizing})!;
 if(!resized.AsSpan(0,4).SequenceEqual(original.AsSpan(12,4))||!resized.AsSpan(4,4).SequenceEqual(original.AsSpan(12,4))||!resized.AsSpan(8).SequenceEqual(original.AsSpan(8)))throw new Exception("Packed-sheet resampling changes alpha or neighboring cells");
 Console.WriteLine("Minimap atlas: original donor snapshot, multiple heroes, alpha, unchanged cells, dimensions, flags, RGB and invalid rectangles passed.");
}finally{Directory.Delete(root,true);}
