using ValveKeyValue;
using ValveResourceFormat.ResourceTypes;
internal static class ModelVariant
{
    // Game item visuals.skin is a zero-based material group index.
    // Copy the selected group's materials to the default group; keep all groups.
    public static void Apply(Model model, int skin)
    {
        if(skin==0)return;
        if(skin<0 || !model.Data.TryGetValue("m_materialGroups",out var groups) || !groups.IsArray || skin>=groups.Count)
            throw new InvalidDataException("Material skin group does not exist: "+skin);
        var values=groups.Values.ToArray();
        if(!values[skin].TryGetValue("m_materials",out var selected) || !selected.IsArray)
            throw new InvalidDataException("Selected material group is invalid: "+skin);
        var copy=KVObject.Array(selected.Count);
        foreach(var material in selected.Values)copy.Add(new KVObject(material.ToString(System.Globalization.CultureInfo.InvariantCulture)){Flag=material.Flag});
        values[0]["m_materials"]=copy;
    }
}
