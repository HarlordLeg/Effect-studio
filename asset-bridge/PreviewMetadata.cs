using System.Buffers.Binary;
using System.Text.Json;
using System.Text.Json.Nodes;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;
using ValveResourceFormat.IO;
using ValveResourceFormat.ResourceTypes.ModelAnimation;

// Metadata travels with our GLB, so the viewer never depends on an external
// hero CDN. Offsets and quaternion rotations remain in Source bone space.
internal static class PreviewMetadata
{
    internal static void Write(Resource resource, string target, IFileLoader? loader = null) { var data=Describe(resource, loader); data["composedAdditiveAnimations"]=true; Embed(target, data); }

    internal static JsonNode Describe(Resource resource, IFileLoader? loader = null)
    {
        if (resource.DataBlock is not Model model) throw new InvalidDataException("Not a model");
        var attachments = new Dictionary<string, object>();
        void Add(ValveResourceFormat.ResourceTypes.ModelData.Attachments.Attachment attachment)
        {
            var influences = Enumerable.Range(0, attachment.Length).Select(i => attachment[i]).ToArray();
            attachments[attachment.Name] = new {
                bones = influences.Select(i => i.Name).ToArray(),
                offsets = influences.Select(i => new[] { i.Offset.X, i.Offset.Y, i.Offset.Z }).ToArray(),
                rotations = influences.Select(i => new[] { i.Rotation.X, i.Rotation.Y, i.Rotation.Z, i.Rotation.W }).ToArray(),
                weights = influences.Select(i => i.Weight).ToArray(),
                ignoreRotation = attachment.IgnoreRotation
            };
        }
        foreach (var attachment in model.Attachments.Values) Add(attachment);
        foreach (var mesh in model.GetEmbeddedMeshes())
            foreach (var attachment in mesh.Mesh.Attachments.Values) Add(attachment);
        var sequences = new List<object>();
        if (loader is not null) try {
            foreach (var animation in model.GetAllAnimations(loader)) {
                var sequence = animation as SequenceAnimation;
                var activities = sequence?.Activities.Select(a => a.Name).ToArray() ?? [];
                sequences.Add(new { name = animation.Name, loop = sequence?.IsLooping ?? false,
                    activity = activities.FirstOrDefault(), modifiers = activities.Skip(1).ToArray(), additive = animation.IsAdditive });
            }
        } catch (Exception error) { Console.WriteLine("[WARN] Animation metadata: " + error.Message); }
        return JsonSerializer.SerializeToNode(new { version = 2, attachments, sequences })!;
    }

    internal static HashSet<string> AnimationNames(JsonNode metadata, string[] preferred)
    {
        var rows=(metadata["sequences"] as JsonArray)?.OfType<JsonObject>().ToArray() ?? [];
        var keep=new System.Text.RegularExpressions.Regex(@"^ACT_DOTA_(LOADOUT|IDLE|IDLE_RARE|RUN|ATTACK|ATTACK2|CAST_ABILITY_[1-6]|RAZE_[1-3]|SPAWN|TELEPORT|DISABLED|VICTORY|TAUNT|DIE)$");
        string Name(JsonObject row)=>row["name"]?.GetValue<string>()??"";
        int Score(JsonObject row)=>((row["modifiers"] as JsonArray)?.Count??0)*1000+Name(row).Length+(Name(row).Contains("debut",StringComparison.OrdinalIgnoreCase)?5000:0);
        var names=rows.Where(r=>keep.IsMatch(r["activity"]?.GetValue<string>()??"")&&!Name(r).StartsWith('@')).GroupBy(r=>r["activity"]!.GetValue<string>()).Select(g=>Name(g.OrderBy(Score).First())).Take(24).ToHashSet(StringComparer.Ordinal);
        if(names.Count==0)foreach(var row in rows.Where(r=>!Name(r).StartsWith('@')&&System.Text.RegularExpressions.Regex.IsMatch(Name(r),"idle|loadout|run|walk|attack",System.Text.RegularExpressions.RegexOptions.IgnoreCase)).Take(24))names.Add(Name(row));
        foreach(var name in preferred)if(rows.Any(r=>Name(r)==name)&&!name.StartsWith('@'))names.Add(name);
        return names;
    }

    internal static void Embed(string target, JsonNode metadata)
    {
        var input = File.ReadAllBytes(target);
        if (input.Length < 20 || BinaryPrimitives.ReadUInt32LittleEndian(input) != 0x46546c67
            || BinaryPrimitives.ReadUInt32LittleEndian(input.AsSpan(4)) != 2
            || BinaryPrimitives.ReadUInt32LittleEndian(input.AsSpan(8)) != input.Length
            || BinaryPrimitives.ReadUInt32LittleEndian(input.AsSpan(16)) != 0x4e4f534a)
            throw new InvalidDataException("Invalid exported GLB");
        var length = checked((int)BinaryPrimitives.ReadUInt32LittleEndian(input.AsSpan(12)));
        if (length > input.Length - 20) throw new InvalidDataException("Truncated GLB JSON");
        var json = JsonNode.Parse(input.AsSpan(20, length))!.AsObject();
        var extras = json["extras"] as JsonObject ?? new JsonObject();
        if (json["extras"] is null) json["extras"] = extras;
        extras["dotaStudio"] = metadata;
        var text = JsonSerializer.SerializeToUtf8Bytes(json);
        var padded = (text.Length + 3) & ~3;
        var output = new byte[checked(input.Length - length + padded)];
        input.AsSpan(0, 12).CopyTo(output);
        BinaryPrimitives.WriteUInt32LittleEndian(output.AsSpan(8), (uint)output.Length);
        BinaryPrimitives.WriteUInt32LittleEndian(output.AsSpan(12), (uint)padded);
        BinaryPrimitives.WriteUInt32LittleEndian(output.AsSpan(16), 0x4e4f534a);
        output.AsSpan(20, padded).Fill(32);
        text.CopyTo(output.AsSpan(20));
        input.AsSpan(20 + length).CopyTo(output.AsSpan(20 + padded));
        File.WriteAllBytes(target, output);
    }
}
