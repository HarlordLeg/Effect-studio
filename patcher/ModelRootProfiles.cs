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
        if(host.StartsWith("models/heroes/windrunner/",StringComparison.Ordinal)&&new[]{"wr_arcana_head","wr_arcana_cape","wr_arcana_weapon","wr_arcana_quiver","wr_arcana_shoulder_refit_legacy"}.Any(part=>donor=="models/items/windrunner/windrunner_arcana/"+part+".vmdl_c"||donor=="models/items/windrunner/windrunner_arcana/"+part+".vmdl")&&roots.Contains("root",StringComparer.Ordinal))return new Dictionary<string,string>(StringComparer.Ordinal){{"wr_root","root"}};
        if(host.StartsWith("models/heroes/lanaya/",StringComparison.Ordinal)&&(donor=="models/items/lanaya/heavenly_secrets_armor/heavenly_secrets_armor.vmdl_c"||donor=="models/items/lanaya/heavenly_secrets_armor/heavenly_secrets_armor.vmdl")&&roots.Contains("Root_0",StringComparer.Ordinal))return new Dictionary<string,string>(StringComparer.Ordinal){{"armor_lod0","Root_0"}};
        if(host.StartsWith("models/heroes/sven/",StringComparison.Ordinal)&&(donor=="models/items/sven/lord_of_the_north_belt/lord_of_the_north_belt.vmdl_c"||donor=="models/items/sven/lord_of_the_north_belt/lord_of_the_north_belt.vmdl")&&roots.Contains("root",StringComparer.Ordinal))return new Dictionary<string,string>(StringComparer.Ordinal){{"sven_body","root"}};
        if(host.StartsWith("models/heroes/dark_willow/",StringComparison.Ordinal)&&(donor=="models/items/dark_willow/the_naughty_witch_from_dark_woods_head/the_naughty_witch_from_dark_woods_head.vmdl_c"||donor=="models/items/dark_willow/the_naughty_witch_from_dark_woods_head/the_naughty_witch_from_dark_woods_head.vmdl")){
            var head=names.SingleOrDefault(n=>string.Equals(n,"head",StringComparison.OrdinalIgnoreCase));if(head is not null)return new Dictionary<string,string>(StringComparer.Ordinal){{"cat_head_base",head}};
        }
        if(host.StartsWith("models/heroes/ember_spirit/",StringComparison.Ordinal)&&(donor=="models/items/ember_spirit/ember_sindur_sensei_shoulder/ember_sindur_sensei_shoulder.vmdl_c"||donor=="models/items/ember_spirit/ember_sindur_sensei_shoulder/ember_sindur_sensei_shoulder.vmdl")&&roots.Length==1&&roots[0] is "Root_JNT" or "Root0_JNT")return new Dictionary<string,string>(StringComparer.Ordinal){{"ember_spirit_base",roots[0]}};
        var donorPath = donor.EndsWith("_c", StringComparison.Ordinal) ? donor[..^2] : donor;
        if (host is ("models/heroes/omniknight/omniknight.vmdl_c" or "models/heroes/omniknight/omniknight.vmdl") &&
            donorPath == "models/items/omniknight/the_fist_of_frenzied_sun_shoulders/the_fist_of_frenzied_sun_shoulders.vmdl" &&
            roots.Contains("root", StringComparer.Ordinal))
            return new Dictionary<string, string>(StringComparer.Ordinal) { ["back_rays_R_01_JNT"] = "root", ["back_rays_L_01_JNT"] = "root" };
        if (host is ("models/heroes/invoker/invoker.vmdl_c" or "models/heroes/invoker/invoker.vmdl") &&
            donorPath == "models/items/invoker/covenant_of_the_depths_belt_v2/covenant_of_the_depths_belt_v2.vmdl" &&
            roots.Contains("root_0", StringComparer.Ordinal))
            return new Dictionary<string, string>(StringComparer.Ordinal) { ["invoker_body_model"] = "root_0" };
        if (host is ("models/heroes/invoker/invoker.vmdl_c" or "models/heroes/invoker/invoker.vmdl") &&
            donorPath == "models/items/invoker/crimson_taoist_head/crimson_taoist_head.vmdl")
        {
            var head = names.SingleOrDefault(n => string.Equals(n, "Head_1", StringComparison.OrdinalIgnoreCase));
            if (head is not null)
                return new Dictionary<string, string>(StringComparer.Ordinal) { ["topKnot_0"] = head };
        }
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
        // Unchained Entity's Heart has a separate gem root. Preserve its
        // authored bind pose when attaching it to Ancient Apparition.
        if(host=="models/heroes/ancient_apparition/ancient_apparition.vmdl"&&donor=="models/items/ancient_apparition/unchained_entitys_heart/unchained_entitys_heart.vmdl")return Map("root","gem_large_01_JNT");
        // Original Stormwrought Arbiter files retain independent importer roots.
        // Actual hero joints (including ankle_l/ankle_L) are matched first.
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_back/arbiter_back.vmdl")return Map("root","sven_body","sven_shoulder","sven_gauntlet","sven_sword","sven_helmet","new_sven_model","new_sven_model1","1","11","smdimport001","smdimport0011","002","smdimport","smdimport002","smdimport003","smdimport0013","smdimport004","smdimport0041");
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_arms/arbiter_arms.vmdl")return Map("root","new_sven_model1","11","smdimport0011","smdimport0013","smdimport0041","sven_body","sven_shoulder","sven_gauntlet","sven_sword","sven_helmet","new_sven_model","______031","______047","1","______052","smdimport001","002","smdimport","______055","smdimport002","smdimport003","______056","______057","______058","smdimport004","______036","______053","______033","______043","______048","______005","______001");
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_head/arbiter_head.vmdl")return Map("root","smdimport001");
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_belt/arbiter_belt.vmdl")return Map("root","sven_body","sven_shoulder","sven_gauntlet","sven_sword","sven_helmet","new_sven_model","new_sven_model1","1","11","smdimport001","smdimport0011","002","smdimport","smdimport002","smdimport003","smdimport0013","smdimport004","smdimport0041");
        if(host=="models/heroes/sven/sven.vmdl"&&donor=="models/items/sven/arbiter_shoulder/arbiter_shoulder.vmdl")return Map("root","new_sven_model1","11","smdimport0011","smdimport0013","smdimport0041","sven_body","sven_shoulder","sven_gauntlet","sven_sword","sven_helmet","new_sven_model","______031","______047","1","______052","smdimport001","002","smdimport","______055","smdimport002","smdimport003","______056","______057","______058","smdimport004","______036","______053","______033","______043","______048","______005");
        // Six original Pangolier weapon/sheath models have independent bind-pose
        // accessory roots beside the sheath. Keep them on its animated anchor.
        if(host=="models/heroes/pangolier/pangolier.vmdl"&&new[]{"models/items/pangolier/ti9_cache_pango_navigator_off_hand/ti9_cache_pango_navigator_off_hand.vmdl","models/items/pangolier/masked_swordsman_off_hand/masked_swordsman_off_hand.vmdl","models/items/pangolier/forest_winter_expedition_weapon/forest_winter_expedition_weapon.vmdl","models/items/pangolier/masked_swordsman_weapon/masked_swordsman_weapon.vmdl","models/items/pangolier/forest_winter_expedition_off_hand/forest_winter_expedition_off_hand.vmdl","models/items/pangolier/ti9_cache_pango_navigator_weapon/ti9_cache_pango_navigator_weapon.vmdl"}.Contains(donor,StringComparer.Ordinal))return Map("sheath_0","sword_cloth_01","sheath_ring");
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
