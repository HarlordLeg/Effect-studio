using ValveKeyValue;

// Material groups are schema-defined resource references, including imported
// templates whose paths were accidentally authored as plain KV3 strings.
internal static class ModelMaterialReferences
{
    internal static int Repair(KVObject root)
    {
        if (!root.TryGetValue("m_materialGroups", out var groups)) return 0;
        if (!groups.IsArray) throw new InvalidDataException("Invalid model material groups");
        var count = 0;
        foreach (var group in groups.Values)
        {
            if (!group.TryGetValue("m_materials", out var materials) || !materials.IsArray)
                throw new InvalidDataException("Invalid model material array");
            foreach (var material in materials.Values)
            {
                if (material.ValueType != KVValueType.String)
                    throw new InvalidDataException("Invalid model material reference");
                if (material.Flag == KVFlag.Resource) continue;
                material.Flag = KVFlag.Resource;
                count++;
            }
        }
        return count;
    }
}
