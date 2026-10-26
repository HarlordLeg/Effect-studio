// These are importer/container roots observed in the supplied original Valve
// models. Never accept an arbitrary unknown root on an unrelated wearable.
internal static class ModelRootProfiles
{
    internal static IReadOnlyDictionary<string,string>? Attachments(string host,string donor)
    {
        host=host.Replace("\\","/");donor=donor.Replace("\\","/");
        if(host.EndsWith("_c",StringComparison.Ordinal))host=host[..^2];if(donor.EndsWith("_c",StringComparison.Ordinal))donor=donor[..^2];
        Dictionary<string,string> Map(string parent,params string[] roots)=>roots.ToDictionary(r=>r,_=>parent,StringComparer.Ordinal);
        if(host.Contains("/earthshaker/")&&donor.StartsWith("models/items/earthshaker/siege_beast_",StringComparison.Ordinal))return Map("root","earthshaker1");
        if(host.Contains("/tidehunter/")&&donor.StartsWith("models/items/tidehunter/executioner_ray_hood/",StringComparison.Ordinal))return Map("root1","group1");
        if(host.Contains("/spectre/")&&donor.StartsWith("models/items/spectre/malicious_",StringComparison.Ordinal))return Map("root","base");
        if(host.Contains("/io/io_ti7/")){
            if(donor=="models/items/io/io_calavera/io_calavera.vmdl")return Map("root_immortal","io_muerta_root");
            if(donor=="models/items/io/dark_carnival_io/dark_carnival_io.vmdl")return Map("root_immortal","alt_root");
        }
        if(host.Contains("/legion_commander/")&&donor.StartsWith("models/items/legion_commander/conquests_of_golden_sun_",StringComparison.Ordinal))return Map("Root0_JNT","Object001","Object002","SMDImport","SMDImport001","SMDImport002","SMDImport009","smdimport1","legion_base","legion_flags","legion_sword","legion_shoulder");
        if(host.StartsWith("models/heroes/lion/",StringComparison.Ordinal)&&donor.StartsWith("models/items/lion/",StringComparison.Ordinal))return Map("Root_0","spine_3");
        return null;
    }
}
