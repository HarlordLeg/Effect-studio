using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat.IO;
using ValveResourceFormat.ResourceTypes;
using SkiaSharp;

internal static class ParticleExport
{
    private static object? JsonValue(KVObject value)
    {
        if (value.IsArray) return value.Values.Select(JsonValue).ToArray();
        if (value.IsCollection) return value.Children.ToDictionary(pair => pair.Key, pair => JsonValue(pair.Value));
        return value.ValueType switch
        {
            KVValueType.Null => null,
            KVValueType.Boolean => value.ToBoolean(CultureInfo.InvariantCulture),
            KVValueType.String => value.ToString(CultureInfo.InvariantCulture),
            KVValueType.BinaryBlob => Convert.ToBase64String(value.AsBlob().ToArray()),
            _ => value.ToDouble(CultureInfo.InvariantCulture),
        };
    }

    public static void Write(GameFileLoader loader, string root, string output)
    {
        var definitions = new Dictionary<string, object?>();
        var textures = new Dictionary<string, object?>();
        var missing = new List<string>();
        var models = new Dictionary<string, object?>();
        var materials = new Dictionary<string, object?>();
        var visited = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var queue = new Queue<string>();
        queue.Enqueue(root.EndsWith("_c", StringComparison.Ordinal) ? root : root + "_c");
        while (queue.TryDequeue(out var path))
        {
            if (!visited.Add(path)) continue;
            if (visited.Count > 256) throw new InvalidDataException("Particle dependency limit exceeded");
            try
            {
            using var resource = loader.LoadFile(path);
            if (resource is null) { missing.Add(path); continue; }
            if (resource.DataBlock is ParticleSystem system) definitions[path] = JsonValue(system.Data);
            if(resource.DataBlock is Material material)materials[path]=new {shader=material.ShaderName,vectors=material.VectorParams.ToDictionary(pair=>pair.Key,pair=>new[]{pair.Value.X,pair.Value.Y,pair.Value.Z,pair.Value.W}),floats=material.FloatParams,textures=material.TextureParams};
            if (resource.DataBlock is Texture texture)
            {
                using var bitmap = texture.GenerateBitmap();
                using var png = bitmap.Encode(SKEncodedImageFormat.Png, 100);
                var sheet = texture.GetSpriteSheetData();
                var sequences = sheet?.Sequences.Select(sequence => new {
                    frames = sequence.Frames.Select(frame => new {
                        duration = frame.DisplayTime,
                        images = frame.Images.Select(image => new {
                            min = new[] { image.CroppedMin.X, image.CroppedMin.Y },
                            max = new[] { image.CroppedMax.X, image.CroppedMax.Y }
                        }).ToArray()
                    }).ToArray()
                }).ToArray();
                textures[path] = new { mime = "image/png", data = Convert.ToBase64String(png.ToArray()), sequences };
            }
            if (resource.DataBlock is Model model)
            {
                var file = Path.Combine(Path.GetDirectoryName(output)!, "particle-" + models.Count + ".glb");
                try {
                    var exporter = new GltfModelExporter(loader) {
                        ProgressReporter = new Progress<string>(message => Console.WriteLine(message)),
                        ExportMaterials = true, ExportAnimations = true, AdaptTextures = true, SatelliteImages = false
                    };
                    exporter.Export(resource, file);
                    var groups=model.Data.TryGetValue("m_meshGroups",out var groupNames)?JsonValue(groupNames):null;
                    var masks=model.Data.TryGetValue("m_refMeshGroupMasks",out var groupMasks)&&groupMasks.IsArray?groupMasks.Values.Select(v=>v.ToUInt64(CultureInfo.InvariantCulture).ToString(CultureInfo.InvariantCulture)).ToArray():[];
                    models[path] = new { data = Convert.ToBase64String(File.ReadAllBytes(file)), meshGroups=groups, meshMasks=masks, meshes=model.GetEmbeddedMeshes().Select(m=>new {index=m.MeshIndex,name=m.Name}).ToArray() };
                } catch (Exception exception) { missing.Add(path + ": " + exception.Message); }
                finally { File.Delete(file); }
            }
            if (resource.ExternalReferences is not null)
            {
                foreach (var reference in resource.ExternalReferences.ResourceRefInfoList)
                {
                    if (reference.Name.EndsWith(".vpcf", StringComparison.OrdinalIgnoreCase)
                        || reference.Name.EndsWith(".vtex", StringComparison.OrdinalIgnoreCase)
                        || reference.Name.EndsWith(".vmat", StringComparison.OrdinalIgnoreCase)
                        || reference.Name.EndsWith(".vmdl", StringComparison.OrdinalIgnoreCase)) queue.Enqueue(reference.Name + "_c");
                }
            }
            }
            catch (Exception exception) { missing.Add(path + ": " + exception.Message); }
        }
        File.WriteAllText(output, JsonSerializer.Serialize(new { root, definitions, textures, models, materials, missing, modelFormatVersion=2 }));
    }
}
