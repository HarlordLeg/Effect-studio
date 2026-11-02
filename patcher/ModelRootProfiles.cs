// These are importer/container roots observed in the supplied original Valve
// models. Never accept an arbitrary unknown root on an unrelated wearable.
internal static class ModelRootProfiles
{
    // Tester-only importer roots reported by the first tester batch. Each
    // profile is limited to matching hero namespaces and a unique host root.
    internal static IReadOnlyDictionary<string,string>? TesterAttachments(string host,string donor,ValveKeyValue.KVObject skeleton)
    {
        host=host.Replace("\\","/");donor=donor.Replace("\\","/");
        if(host.StartsWith("harlord/",StringComparison.Ordinal))host=host[8..];if(donor.StartsWith("harlord/",StringComparison.Ordinal))donor=donor[8..];
        var names=skeleton["m_boneName"].Values.Select(v=>v.ToString(null)).ToArray();
        var parents=skeleton["m_nParent"].Values.Select(v=>v.ToInt32(null)).ToArray();
        var roots=names.Where((_,i)=>parents[i]<0).ToArray();
        // Techies has several independent character roots. This importer root
        // belongs to the TI9 spleen component's root1, not to the first root.
        if(host.Contains("/techies/")&&donor.StartsWith("models/items/techies/techies_ti9_immortal_spleen/",StringComparison.Ordinal)&&roots.Contains("root1",StringComparer.Ordinal))return new Dictionary<string,string>(StringComparer.Ordinal){{"techies_ti9_immortal_spleen_root1","root1"}};
        if(roots.Length!=1)return null;
        var profiles=new (string[] Heroes,string[] Bones)[]{
            (new[]{"windrunner","windranger"},new[]{"wr_root"}),
            (new[]{"venomancer"},new[]{"m_snake_L_09_attach_JNT"}),
            (new[]{"nyx_assassin","nerubian_assassin"},new[]{"body","armor_wbadges","low_weapon"}),
            (new[]{"io","wisp"},new[]{"alt_root","io_muerta_root"}),
            (new[]{"dazzle"},new[]{"legs_lod0","arms_lod0"}),
            (new[]{"furion","natures_prophet","nature_prophet"},new[]{"blender_implicit"}),
            (new[]{"bane"},new[]{"achain0_0"}),
            (new[]{"batrider"},new[]{"batrider_base"})
        };
        foreach(var p in profiles)if(p.Heroes.Any(h=>host.Contains("/"+h+"/"))&&p.Heroes.Any(h=>(donor.StartsWith("models/items/"+h+"/",StringComparison.Ordinal)||donor.StartsWith("models/heroes/"+h+"/",StringComparison.Ordinal))))return p.Bones.ToDictionary(b=>b,_=>roots[0],StringComparer.Ordinal);
        return null;
    }
    internal static IReadOnlyDictionary<string,string>? Attachments(string host,string donor)
    {
        host=host.Replace("\\","/");donor=donor.Replace("\\","/");
        if(host.StartsWith("harlord/",StringComparison.Ordinal))host=host[8..];if(donor.StartsWith("harlord/",StringComparison.Ordinal))donor=donor[8..];
        if(host.EndsWith("_c",StringComparison.Ordinal))host=host[..^2];if(donor.EndsWith("_c",StringComparison.Ordinal))donor=donor[..^2];
        Dictionary<string,string> Map(string parent,params string[] roots)=>roots.ToDictionary(r=>r,_=>parent,StringComparer.Ordinal);
        // Original Stormwrought Arbiter files retain independent importer roots.
        // Actual hero joints (including ankle_l/ankle_L) are matched first.
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_back/arbiter_back.vmdl")return Map("root","sven_body","sven_shoulder","sven_gauntlet","sven_sword","sven_helmet","new_sven_model","new_sven_model1","1","11","smdimport001","smdimport0011","002","smdimport","smdimport002","smdimport003","smdimport0013","smdimport004","smdimport0041");
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_arms/arbiter_arms.vmdl")return Map("root","new_sven_model1","11","smdimport0011","smdimport0013","smdimport0041","sven_body","sven_shoulder","sven_gauntlet","sven_sword","sven_helmet","new_sven_model","______031","______047","1","______052","smdimport001","002","smdimport","______055","smdimport002","smdimport003","______056","______057","______058","smdimport004","______036","______053","______033","______043","______048","______005","______001");
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_head/arbiter_head.vmdl")return Map("root","smdimport001");
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_belt/arbiter_belt.vmdl")return Map("root","sven_body","sven_shoulder","sven_gauntlet","sven_sword","sven_helmet","new_sven_model","new_sven_model1","1","11","smdimport001","smdimport0011","002","smdimport","smdimport002","smdimport003","smdimport0013","smdimport004","smdimport0041");
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_shoulder/arbiter_shoulder.vmdl")return Map("root","new_sven_model1","11","smdimport0011","smdimport0013","smdimport0041","sven_body","sven_shoulder","sven_gauntlet","sven_sword","sven_helmet","new_sven_model","______031","______047","1","______052","smdimport001","002","smdimport","______055","smdimport002","smdimport003","______056","______057","______058","smdimport004","______036","______053","______033","______043","______048","______005");
        if(host.Contains("/earthshaker/")&&donor.StartsWith("models/items/earthshaker/siege_beast_",StringComparison.Ordinal))return Map("root","earthshaker1");
        if(host.Contains("/tidehunter/")&&donor.StartsWith("models/items/tidehunter/executioner_ray_hood/",StringComparison.Ordinal))return Map("root1","group1");
        if(host.Contains("/spectre/")&&donor.StartsWith("models/items/spectre/malicious_",StringComparison.Ordinal))return Map("root","base");
        if(host.Contains("/io/io_ti7/")){
            if(donor=="models/items/io/io_calavera/io_calavera.vmdl")return Map("root_immortal","io_muerta_root");
            if(donor=="models/items/io/dark_carnival_io/dark_carnival_io.vmdl")return Map("root_immortal","alt_root");
        }
        if(host.Contains("/legion_commander/")&&donor.StartsWith("models/items/legion_commander/conquests_of_golden_sun_",StringComparison.Ordinal))return Map("Root0_JNT","Object001","Object002","SMDImport","SMDImport001","SMDImport002","SMDImport009","smdimport1","legion_base","legion_flags","legion_sword","legion_shoulder");
        if(host.StartsWith("models/heroes/lion/",StringComparison.Ordinal)&&donor.StartsWith("models/items/lion/",StringComparison.Ordinal))return Map("Root_0","spine_3");
        if(host.StartsWith("models/heroes/kunkka/",StringComparison.Ordinal)&&donor.StartsWith("models/items/kunkka/",StringComparison.Ordinal))return Map("root","flexslidersnode");
        return null;
    }
}
