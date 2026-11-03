using ValveKeyValue;
internal static class TesterAttachmentProfiles
{
    internal static string? Prefix(string model){
        model=model.Replace('\\','/');if(model.EndsWith("_c",StringComparison.Ordinal))model=model[..^2];
        if(model.StartsWith("models/items/monkey_king/mk_ti9_immortal_head/",StringComparison.Ordinal))return "harlord_mk_head_";
        if(model.StartsWith("models/items/monkey_king/mk_ti9_immortal_weapon/",StringComparison.Ordinal))return "harlord_mk_weapon_";
        if(model.StartsWith("models/items/juggernaut/ancient_exile_head/",StringComparison.Ordinal)||model=="models/heroes/juggernaut/jugg_mask.vmdl")return "harlord_jugg_head_";
        if(model.StartsWith("models/items/juggernaut/ancient_exile_weapon/",StringComparison.Ordinal)||model=="models/heroes/juggernaut/jugg_sword.vmdl")return "harlord_jugg_weapon_";
        if(model.StartsWith("models/items/juggernaut/ancient_exile_legs/",StringComparison.Ordinal)||model=="models/heroes/juggernaut/juggernaut_pants.vmdl")return "harlord_jugg_legs_";
        if(model.StartsWith("models/items/faceless_void/mace_of_aeons/",StringComparison.Ordinal))return "harlord_void_mace_";
        return null;
    }
    static bool Rename(string prefix,string name)=>prefix=="harlord_void_mace_"?name is "attach_plate_01" or "attach_plate_02" or "attach_plate_03" or "attach_sphere":prefix.StartsWith("harlord_jugg_",StringComparison.Ordinal)?name=="attach_core":name is "attach_eye_l" or "attach_eye_r";
    internal static int NamespaceMesh(KVObject mesh,string? prefix){
        if(prefix is null||!mesh.TryGetValue("m_attachments",out var rows))return 0;var count=0;
        foreach(var row in rows.Values){var name=row["key"].ToString(null);if(!Rename(prefix,name))continue;row["key"]=new KVObject(prefix+name);row["value"]["m_name"]=new KVObject(prefix+name);count++;}return count;
    }
    internal static int PatchParticle(KVObject data)=>PatchForHost(data,null,false);
    internal static int PatchForHost(KVObject data,IReadOnlyDictionary<string,string>? identities,bool heroOwned){
        if(!data.TryGetValue("m_controlPointConfigurations",out var configs))return 0;var changed=0;var root=false;
        foreach(var config in configs.Values){
            if(!config.TryGetValue("m_previewState",out var preview)||!preview.TryGetValue("m_previewModel",out var model))continue;
            var identity=model.ToString(null);if(identities is not null&&identities.TryGetValue(identity.EndsWith("_c",StringComparison.Ordinal)?identity[..^2]:identity,out var source))identity=source;var prefix=Prefix(identity);var arcana=identity=="models/items/monkey_king/monkey_king_arcana_head/mesh/monkey_king_arcana.vmdl";
            if(prefix is null&&!arcana||!config.TryGetValue("m_drivers",out var drivers))continue;root=true;
            foreach(var driver in drivers.Values){
                if(prefix is not null&&driver.TryGetValue("m_attachmentName",out var a)&&Rename(prefix,a.ToString(null))){driver["m_attachmentName"]=new KVObject(prefix+a.ToString(null));driver["m_entityName"]=new KVObject("self");changed++;}
                else if(driver.TryGetValue("m_entityName",out var e)&&e.ToString(null)=="parent"){driver["m_entityName"]=new KVObject("self");changed++;}
            }
        }
        // These are now hero-launched roots. A wearable-parent CP handoff
        // would overwrite their explicit, namespaced hero bindings.
        if(root&&data.TryGetValue("m_PreEmissionOperators",out var operators)){var keep=operators.Values.Where(o=>!o.TryGetValue("_class",out var c)||c.ToString(null)!="C_OP_SetParentControlPointsToChildCP").ToArray();changed+=operators.Count-keep.Length;data["m_PreEmissionOperators"]=KVObject.Array(keep);}
        if(heroOwned)foreach(var config in configs.Values)if(config.TryGetValue("m_drivers",out var drivers))foreach(var driver in drivers.Values)if(driver.TryGetValue("m_entityName",out var e)&&e.ToString(null)=="parent"){driver["m_entityName"]=new KVObject("self");changed++;}
        return changed;
    }
}
