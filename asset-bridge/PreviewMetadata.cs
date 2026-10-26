using System.Buffers.Binary;
using System.Text.Json;
using System.Text.Json.Nodes;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

// Metadata travels with our GLB, so the viewer never depends on an external
// hero CDN. Offsets and quaternion rotations remain in Source bone space.
internal static class PreviewMetadata
{
    internal static void Write(Resource resource, string target)
    {
        if (resource.DataBlock is not Model model) return;
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
        Embed(target, JsonSerializer.SerializeToNode(new { version = 1, attachments })!);
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
