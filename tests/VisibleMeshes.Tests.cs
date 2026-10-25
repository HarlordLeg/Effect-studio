using ValveKeyValue;
internal static class VisibleMeshesTests{
 static KVObject Row(int index){var r=KVObject.Collection();r["m_nMeshIndex"]=new KVObject(index);return r;}
 public static int Main(){var rows=new[]{Row(0),Row(1),Row(2),Row(3)};var masks=new[]{new KVObject(1UL),new KVObject(0UL),new KVObject(4UL)};
 var selected=VisibleMeshExport.VisibleRows(rows,masks,1);if(selected.Length!=2||!ReferenceEquals(selected[0],rows[0])||!ReferenceEquals(selected[1],rows[3]))throw new Exception("Hidden or alternate geometry leaked into preview");
 if(VisibleMeshExport.VisibleRows(rows,masks,5).Length!=3)throw new Exception("Visible geometry omitted");
 if(VisibleMeshExport.Mask(new KVObject(-1L))!=ulong.MaxValue)throw new Exception("Legacy mask changed");
 if(VisibleMeshExport.VisibleRows(rows,System.Array.Empty<KVObject>(),1).Length!=4)throw new Exception("Unknown metadata must be retained");
 Console.WriteLine("[OK] Hidden mesh filtering preserves visible geometry, original indices and unknown metadata");return 0;
 }
}
