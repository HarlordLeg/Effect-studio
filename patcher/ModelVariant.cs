using System.Globalization;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;
internal static class ModelVariant
{
    // Valve's third cavern style supplies its own ambient particles while these
    // compiled parts contain only groups 0/1. Keep the authored default material,
    // just as for Tellurian Full Throttle; never clamp arbitrary invalid skins.
    internal static bool UsesDefaultThirdStyle(string name)
    {
        foreach(var part in new[]{"arms","head","shoulder","weapon"})
            if(name=="models/items/slark/cavern_crawl_2020_slark_"+part+"/cavern_crawl_2020_slark_"+part+".vmdl")return true;
        foreach(var part in new[]{"back","head","misc","weapon"})
            if(name=="models/items/nerubian_assassin/nyx_ti10_cavern_crawl_"+part+"/nyx_ti10_cavern_crawl_"+part+".vmdl")return true;
        foreach(var part in new[]{"arms","belt","head","shoulders","tail","weapon"})
            if(name=="models/items/spirit_breaker/spirit_breaker_ti10_cavern_crawl_"+part+"/spirit_breaker_ti10_cavern_crawl_"+part+".vmdl")return true;
        return false;
    }
    internal static int ResolveSkin(string name,int skin,int groupCount)
    {
        if(skin<0||groupCount<0)throw new InvalidDataException("Invalid material skin: "+skin);
        if(skin==0||groupCount==0)return 0; // no switchable materials in this model
        if(skin<groupCount)return skin;
        if(skin==2&&groupCount==2&&UsesDefaultThirdStyle(name))return 0;
        throw new InvalidDataException("Material skin group does not exist: "+skin+" ("+name+")");
    }
    public static HashSet<object> Apply(Resource resource, int skin)
    {
        var changed=new HashSet<object>();if(skin==0)return changed;
        var model=resource.DataBlock as Model ?? throw new InvalidDataException("Expected model");
        var name=model.Data.TryGetValue("m_name",out var identity)?identity.ToString(CultureInfo.InvariantCulture):"";
        model.Data.TryGetValue("m_materialGroups",out var groups);
        if(groups is not null&&!groups.IsArray)throw new InvalidDataException("Invalid material group table: "+name);
        var resolved=ResolveSkin(name,skin,groups?.Count??0);
        if(resolved==0){Console.WriteLine("[INFO] Model uses its compiled default materials for requested skin "+skin+": "+name);return changed;}
        skin=resolved;
        var values=groups!.Values.ToArray();
        if(!values[0].TryGetValue("m_materials",out var baseline) || !baseline.IsArray || !values[skin].TryGetValue("m_materials",out var selected) || !selected.IsArray || baseline.Count!=selected.Count)
            throw new InvalidDataException("Material skin groups have incompatible slots: "+skin);
        var paths=new Dictionary<string,string>(StringComparer.OrdinalIgnoreCase);
        var a=baseline.Values.ToArray();var b=selected.Values.ToArray();
        for(var i=0;i<a.Length;i++)paths[a[i].ToString(CultureInfo.InvariantCulture)]=b[i].ToString(CultureInfo.InvariantCulture);
        foreach(var block in resource.Blocks)
        {
            KVObject? data=block is KeyValuesOrNTRO kv?kv.Data:block is BinaryKV3 binary?binary.Data.Root:null;
            if(data is null)continue;
            if(Rewrite(data,paths)){
                if(resource.ContainsBlockType(BlockType.NTRO))throw new InvalidDataException("Cannot rewrite variant materials in NTRO model; refusing a partial skin change");
                changed.Add(block);
            }
        }
        if(resource.ExternalReferences is not null)foreach(var reference in resource.ExternalReferences.ResourceRefInfoList)
            if(paths.TryGetValue(reference.Name,out var target))reference.Name=target;
        // The draw calls and default material arrays now agree with the selected group.
        // RERL names/IDs are relocated later using the normal namespace pass.
        return changed;
    }
    private static bool Rewrite(KVObject value,Dictionary<string,string> paths)
    {
        var changed=false;
        if(value.IsCollection){foreach(var pair in value.Children.ToArray()){
            if(pair.Value.ValueType==KVValueType.String && paths.TryGetValue(pair.Value.ToString(CultureInfo.InvariantCulture),out var target) && target!=pair.Value.ToString(CultureInfo.InvariantCulture))
            {value[pair.Key]=new KVObject(target){Flag=pair.Value.Flag};changed=true;}
            else changed|=Rewrite(pair.Value,paths);
        }}else if(value.IsArray){
            var children=value.Values.ToArray();for(var i=0;i<children.Length;i++){
                // String arrays are rewritten by their owning collection below.
                changed|=Rewrite(children[i],paths);
            }
        }
        if(value.IsCollection)foreach(var pair in value.Children.ToArray())if(pair.Value.IsArray){
            var array=KVObject.Array(pair.Value.Count);var replaced=false;
            foreach(var child in pair.Value.Values){if(child.ValueType==KVValueType.String && paths.TryGetValue(child.ToString(CultureInfo.InvariantCulture),out var target) && target!=child.ToString(CultureInfo.InvariantCulture)){array.Add(new KVObject(target){Flag=child.Flag});replaced=true;}else array.Add(child);}
            if(replaced){array.Flag=pair.Value.Flag;value[pair.Key]=array;changed=true;}
        }
        return changed;
    }
}
