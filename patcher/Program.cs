using System.Globalization;
using ValveKeyValue;
using ValveKeyValue.KeyValues3;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

internal static class Program
{
    private sealed record Options(
        string Input,
        string Output,
        IReadOnlyList<string> ParticlePaths,
        ulong? ResourceId,
        bool Backup, int Skin, string? ParticleReplacements, bool ModelOnly);

    private sealed record ParticleEntry(string Path, ulong ResourceId, string? Config);

    public static int Main(string[] args)
    {
        try
        {
            if (args.Length == 0 || args.Contains("--help") || args.Contains("-h"))
            {
                PrintHelp();
                return 0;
            }

            if(args.Length==2&&args[0]=="--techies-body-meshes"){TechiesBodyMeshes.Run(args[1]);return 0;}
            if(args.Length==2&&args[0]=="--cosmetic-shader-rgb"){CosmeticShaderRgb.Run(args[1]);return 0;}
            if(args.Length==2&&args[0]=="--hud-cosmetics"){HudCosmetics.Run(args[1]);return 0;}
            if(args.Length==2&&args[0]=="--global-cosmetics"){GlobalCosmetics.Run(args[1]);return 0;}
            if(args.Length==2&&args[0]=="--index-sound-events"){SoundOverrides.Index(args[1]);return 0;}
            if(args.Length==2&&args[0]=="--sound-overrides"){SoundOverrides.Run(args[1]);return 0;}
            if(args.Length==2&&args[0]=="--persona-voices"){PersonaVoices.Run(args[1]);return 0;}
            if(args.Length==2&&args[0]=="--watermark-models"){ResourceWatermark.Run(args[1]);return 0;}
            if(args.Length==2&&args[0]=="--merge-models"){ModelMerge.Run(args[1]);return 0;}
            if (args.Length == 1 && args[0] == "--capabilities") { Console.WriteLine("{\"version\":\"1.1.0\",\"cosmeticShaderRgbV1\":true,\"globalHudV2\":true,\"globalHudV1\":true,\"globalCosmeticsV1\":true,\"wearableBindingsV1\":true,\"techiesArcanaV1\":true,\"techiesBodyMeshesV1\":true,\"soundOverridesV1\":true,\"personaRuntimeV1\":true,\"personaVoicesV1\":true,\"watermarkV1\":true,\"modelMergeV1\":true,\"modelMergeV2\":true,\"modelMergeV5\":true,\"modelMergeV4\":true,\"modelMergeV3\":true,\"relocate\":true,\"legacyRaw\":true,\"materialSkin\":true,\"nativeParticleVariants\":true,\"modelOnly\":true,\"heroActivities\":true,\"heroActivitiesV2\":true,\"heroActivitiesV3\":true,\"heroActivitiesV4\":true,\"darkclawActivities\":true,\"activityRulesV1\":true,\"activityRulesV2\":true,\"activityRulesV3\":true,\"activityRulesV4\":true,\"activityRulesV5\":true,\"activityRulesV6\":true,\"activityRulesV7\":true,\"activityRulesV8\":true,\"activityRulesV9\":true,\"terrorbladeArcana\":true,\"terrorbladeArcanaV2\":true,\"terrorbladeArcanaV3\":true,\"terrorbladeArcanaV4\":true,\"terrorbladeBindingsV1\":true}");return 0; }
            if (args.Length == 2 && args[0] == "--relocate") { ResourceRelocator.Run(args[1]); return 0; }
            if (args.Length == 2 && args[0] == "--terrorblade-bindings") { TerrorbladeBindings.Run(args[1]); return 0; }
            if (args.Length == 2 && args[0] == "--terrorblade-arcana") { TerrorbladeArcana.Run(args[1]); return 0; }
            if (args.Length == 2 && args[0] == "--activity-rules") { HeroActivityRules.Run(args[1]); return 0; }
            if (args.Length == 2 && args[0] == "--inspect-activities") { HeroActivityRules.Run(args[1],true); return 0; }
            if (args.Length == 2 && args[0] == "--hero-activities") { HeroActivities.Run(args[1]); return 0; }
            var options = ParseArguments(args);
            Patch(options);
            return 0;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[ERROR] Patcher 1.1.0: {ex}");
            return 1;
        }
    }

    private static void Patch(Options options)
    {
        var input = Path.GetFullPath(options.Input);
        var output = Path.GetFullPath(options.Output);
        var particlePaths = options.ParticlePaths
            .Select(NormalizeParticlePath)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (!File.Exists(input))
        {
            throw new FileNotFoundException("Input .vmdl_c file was not found.", input);
        }

        if (!input.EndsWith(".vmdl_c", StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException("Input must be a compiled Source 2 model (.vmdl_c).", nameof(options.Input));
        }

        Directory.CreateDirectory(Path.GetDirectoryName(output)!);

        if (options.Backup && File.Exists(output))
        {
            File.Copy(output, output + ".bak", overwrite: true);
        }

        // Keep every unsupported/unknown block byte-for-byte. Only DATA and
        // RERL are serialized below, because those are the blocks we modify.
        var originalBytes = File.ReadAllBytes(input);

        using (var resource = new Resource { FileName = input })
        {
            resource.Read(input);

            if (resource.DataBlock is not Model model)
            {
                throw new InvalidDataException("The DATA block is not a compiled model.");
            }

            var changedBlocks=ModelVariant.Apply(resource, options.Skin);
            if(options.ParticleReplacements is not null)
            {
                var paths=System.Text.Json.JsonSerializer.Deserialize<Dictionary<string,string>>(File.ReadAllText(options.ParticleReplacements)) ?? throw new InvalidDataException("Invalid particle replacement map");
                if(model.Data.TryGetValue("m_modelInfo",out var info) && info.TryGetValue("m_keyValueText",out var text))
                {
                    var original=text.ToString(CultureInfo.InvariantCulture);
                    foreach(var pair in paths)original=original.Replace("\""+NormalizeParticlePath(pair.Key)+"\"","\""+NormalizeParticlePath(pair.Value)+"\"",StringComparison.Ordinal);
                    info["m_keyValueText"]=new KVObject(original);
                }
            }
            IReadOnlyList<ParticleEntry> particleEntries = particlePaths.Length == 0 && options.ModelOnly ? Array.Empty<ParticleEntry>() : ResolveParticleEntries(particlePaths, options.ResourceId);
            if (particleEntries.Count > 0) { SetParticleConfig(model, particleEntries); SetRed2ParticleReference(resource); }
            foreach (var entry in particleEntries)
            {
                AddExternalReference(resource, entry.Path, entry.ResourceId);
            }

            var temporary = output + ".tmp";
            try
            {
                using (var stream = new FileStream(temporary, FileMode.Create, FileAccess.Write, FileShare.None))
                {
                    SerializePatchedResource(resource, originalBytes, stream, true, changedBlocks);
                }

                Validate(temporary, particleEntries);
                File.Move(temporary, output, overwrite: true);
            }
            finally
            {
                if (File.Exists(temporary))
                {
                    File.Delete(temporary);
                }
            }
        }

        Console.WriteLine($"[OK] Attached particles: {particlePaths.Length}");
        Console.WriteLine($"Model:    {output}");
        foreach (var entry in particlePaths.Length==0 ? Array.Empty<ParticleEntry>() : ResolveParticleEntries(particlePaths, options.ResourceId))
        {
            Console.WriteLine($"Particle: {entry.Path}");
            Console.WriteLine($"RERL id:  0x{entry.ResourceId:X16}");
        }
    }

    internal static void SerializePatchedResource(Resource resource, byte[] original, Stream output, bool rewriteData = true, HashSet<object>? changedBlocks = null, bool preserveMetadata = false, Dictionary<object,byte[]>? rawBlocks = null)
    {
        if (!output.CanSeek)
        {
            throw new ArgumentException("Output stream must support seeking.", nameof(output));
        }

        if (original.Length < 16)
        {
            throw new InvalidDataException("Resource header is truncated.");
        }

        var blockCount = BitConverter.ToUInt32(original, 12);
        if (blockCount != resource.Blocks.Count)
        {
            throw new InvalidDataException("Parsed block count does not match the resource header.");
        }

        var headerSize = checked(16 + (int)blockCount * 12);
        if (headerSize > original.Length)
        {
            throw new InvalidDataException("Resource block directory is truncated.");
        }

        var payloads = new List<byte[]>(resource.Blocks.Count);
        foreach (var block in resource.Blocks)
        {
            if(rawBlocks is not null&&rawBlocks.TryGetValue(block,out var raw)){payloads.Add(raw);continue;}
            if ((changedBlocks?.Contains(block) == true) || (rewriteData && ReferenceEquals(block, resource.DataBlock))
                || (!preserveMetadata && ReferenceEquals(block, resource.ExternalReferences))
                || (!preserveMetadata && block is ResourceEditInfo2 && ReferenceEquals(block, resource.EditInfo)))
            {
                using var memory = new MemoryStream();
                try { block.Serialize(memory); }
                catch (NotImplementedException ex) { throw new InvalidDataException($"Cannot serialize {resource.FileName}: {block.Type} ({block.GetType().Name}). {ex.Message}", ex); }
                payloads.Add(memory.ToArray());
                continue;
            }

            var offset = checked((int)block.Offset);
            var size = checked((int)block.Size);
            if (offset < 0 || size < 0 || offset > original.Length - size)
            {
                throw new InvalidDataException($"Block {block.Type} points outside the source file.");
            }

            payloads.Add(original.AsSpan(offset, size).ToArray());
        }

        using var writer = new BinaryWriter(output, System.Text.Encoding.UTF8, leaveOpen: true);
        writer.Write(original, 0, headerSize);

        for (var i = 0; i < payloads.Count; i++)
        {
            var padding = (int)((16 - output.Position % 16) % 16);
            if (padding != 0)
            {
                writer.Write(new byte[padding]);
            }

            var blockStart = output.Position;
            writer.Write(payloads[i]);
            var blockEnd = output.Position;

            // Source 2 stores an offset relative to the address of this
            // block-directory offset field, not an absolute file offset.
            var offsetFieldPosition = 16L + i * 12L + 4L;
            var relativeOffset = checked((uint)(blockStart - offsetFieldPosition));
            var blockSize = checked((uint)(blockEnd - blockStart));

            output.Position = offsetFieldPosition;
            writer.Write(relativeOffset);
            writer.Write(blockSize);
            output.Position = blockEnd;
        }

        var fileSize = checked((uint)output.Length);
        output.Position = 0;
        writer.Write(fileSize);
        writer.Flush();
    }

    private static IReadOnlyList<ParticleEntry> ResolveParticleEntries(
        IReadOnlyList<string> particlePaths,
        ulong? resourceIdOverride)
    {
        if (particlePaths.Count == 0)
        {
            throw new ArgumentException("At least one particle path is required.");
        }

        if (resourceIdOverride.HasValue && particlePaths.Count != 1)
        {
            throw new ArgumentException("--resource-id can only be used with one --particle.");
        }

        return particlePaths
            .Select(path => new ParticleEntry(
                path,
                resourceIdOverride ?? ComputeResourceId(path),
                "preview"))
            .ToArray();
    }

    // Source 2 resource handles are MurmurHash64B(path, 0xEDABCDEF).
    // The path is the uncompiled resource name, for example *.vpcf, not *.vpcf_c.
    internal static ulong ComputeResourceId(string path)
    {
        var data = System.Text.Encoding.UTF8.GetBytes(path.ToLowerInvariant());
        const uint m = 0x5BD1E995;
        const int r = 24;
        uint h1 = 0xEDABCDEFu ^ (uint)data.Length;
        uint h2 = 0;
        var offset = 0;
        var remaining = data.Length;

        static uint Mix(uint value)
        {
            const uint multiplier = 0x5BD1E995;
            value *= multiplier;
            value ^= value >> 24;
            value *= multiplier;
            return value;
        }

        while (remaining >= 8)
        {
            var k1 = System.Buffers.Binary.BinaryPrimitives.ReadUInt32LittleEndian(data.AsSpan(offset, 4));
            h1 = h1 * m ^ Mix(k1);
            offset += 4;
            remaining -= 4;

            var k2 = System.Buffers.Binary.BinaryPrimitives.ReadUInt32LittleEndian(data.AsSpan(offset, 4));
            h2 = h2 * m ^ Mix(k2);
            offset += 4;
            remaining -= 4;
        }

        if (remaining >= 4)
        {
            var k1 = System.Buffers.Binary.BinaryPrimitives.ReadUInt32LittleEndian(data.AsSpan(offset, 4));
            h1 = h1 * m ^ Mix(k1);
            offset += 4;
            remaining -= 4;
        }

        switch (remaining)
        {
            case 3: h2 ^= (uint)data[offset + 2] << 16; goto case 2;
            case 2: h2 ^= (uint)data[offset + 1] << 8; goto case 1;
            case 1: h2 ^= data[offset]; h2 *= m; break;
        }

        h1 ^= h2 >> 18;
        h1 *= m;
        h2 ^= h1 >> 22;
        h2 *= m;
        h1 ^= h2 >> 17;
        h1 *= m;
        h2 ^= h1 >> 19;
        h2 *= m;
        return ((ulong)h1 << 32) | h2;
    }

    private static void SetParticleConfig(Model model, IReadOnlyList<ParticleEntry> entries)
    {
        var root = model.Data;

        if (!root.TryGetValue("m_modelInfo", out var modelInfo)
            || modelInfo.ValueType != KVValueType.Collection)
        {
            throw new InvalidDataException("DATA does not contain m_modelInfo.");
        }

        // Preserve other keys (attachments, hitboxes, original particle settings).
        var original = modelInfo.TryGetValue("m_keyValueText", out var oldText)
            ? (string)oldText : string.Empty;
        modelInfo["m_keyValueText"] = new KVObject(ModelKeyText.AddParticles(
            original, entries.Select(entry => entry.Path).ToArray()));
    }

    internal static void SetRed2ParticleReference(Resource resource)
    {
        if (resource.EditInfo is not ResourceEditInfo2 red2 || red2.Data is null)
        {
            return;
        }

        // Update only the affected property, retaining all other subasset refs.
        var root = red2.Data.Root;
        if (!root.TryGetValue("m_SubassetReferences", out var subassets)
            || subassets.ValueType != KVValueType.Collection)
        {
            subassets = KVObject.Collection();
            root["m_SubassetReferences"] = subassets;
        }
        if (!subassets.TryGetValue("model_key", out var modelKey)
            || modelKey.ValueType != KVValueType.Collection)
        {
            modelKey = KVObject.Collection();
            subassets["model_key"] = modelKey;
        }
        modelKey["particle_cfg_list"] = new KVObject(1);
    }

    private static void AddExternalReference(Resource resource, string particlePath, ulong resourceId)
    {
        var rerl = resource.ExternalReferences
            ?? throw new InvalidDataException("The model has no RERL block.");

        var existing = rerl.ResourceRefInfoList.FirstOrDefault(x =>
            string.Equals(x.Name, particlePath, StringComparison.OrdinalIgnoreCase));

        if (existing is not null)
        {
            existing.Id = resourceId;
            return;
        }

        rerl.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo
        {
            Id = resourceId,
            Name = particlePath,
        });
    }

    private static void Validate(string file, IReadOnlyList<ParticleEntry> entries)
    {
        using var check = new Resource { FileName = file };
        check.Read(file);
        if (entries.Count == 0 && check.DataBlock is Model) return;

        if (check.DataBlock is not Model model
            || !model.Data.TryGetValue("m_modelInfo", out var modelInfo)
            || !modelInfo.TryGetValue("m_keyValueText", out var keyValueTextObject))
        {
            throw new InvalidDataException("Written DATA does not contain m_modelInfo.m_keyValueText.");
        }

        var keyValueText = (string)keyValueTextObject;

        foreach (var entry in entries)
        {
            if (!keyValueText.Contains(entry.Path, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidDataException($"Written model key data does not contain {entry.Path}.");
            }

            if (check.ExternalReferences?.ResourceRefInfoList.Any(x =>
                    x.Id == entry.ResourceId
                    && string.Equals(x.Name, entry.Path, StringComparison.OrdinalIgnoreCase)) != true)
            {
                throw new InvalidDataException($"Written RERL does not contain {entry.Path} with the expected id.");
            }
        }
    }

    private static Options ParseArguments(string[] args)
    {
        string? input = null;
        string? output = null;
        var particles = new List<string>();
        ulong? resourceId = null;
        var backup = true;
        var skin = 0;
        var modelOnly = false;
        string? particleReplacements = null;

        for (var i = 0; i < args.Length; i++)
        {
            string NextValue()
            {
                if (++i >= args.Length)
                {
                    throw new ArgumentException($"Missing value after {args[i - 1]}.");
                }
                return args[i];
            }

            switch (args[i])
            {
                case "--input":
                case "-i": input = NextValue(); break;
                case "--output":
                case "-o": output = NextValue(); break;
                case "--particle":
                case "-p": particles.Add(NextValue()); break;
                case "--resource-id": resourceId = ParseUInt64(NextValue()); break;
                case "--particle-replacements": particleReplacements = NextValue(); break;
                case "--skin": skin = int.Parse(NextValue(), CultureInfo.InvariantCulture); if(skin<0)throw new ArgumentException("Invalid skin"); break;
                case "--model-only": modelOnly = true; break;
                case "--no-backup": backup = false; break;
                default: throw new ArgumentException($"Unknown argument: {args[i]}");
            }
        }

        if (string.IsNullOrWhiteSpace(input)
            || string.IsNullOrWhiteSpace(output)
            || (particles.Count == 0 && !modelOnly)
            || particles.Any(string.IsNullOrWhiteSpace))
        {
            throw new ArgumentException("--input, --output and --particle are required. Run with --help.");
        }

        return new Options(input, output, particles, resourceId, backup, skin, particleReplacements, modelOnly);
    }

    private static ulong ParseUInt64(string text)
    {
        text = text.Trim();
        return text.StartsWith("0x", StringComparison.OrdinalIgnoreCase)
            ? ulong.Parse(text[2..], NumberStyles.HexNumber, CultureInfo.InvariantCulture)
            : ulong.Parse(text, CultureInfo.InvariantCulture);
    }

    private static string NormalizeParticlePath(string path)
    {
        var normalized = path.Trim().Replace('\\', '/');
        if (normalized.EndsWith("_c", StringComparison.OrdinalIgnoreCase))
        {
            normalized = normalized[..^2];
        }
        if (!normalized.EndsWith(".vpcf", StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException("Particle path must end in .vpcf or .vpcf_c.");
        }
        return normalized.TrimStart('/');
    }

    private static void PrintHelp()
    {
        Console.WriteLine("Dota2UnusualPatcher - attaches a particle to a compiled .vmdl_c model");
        Console.WriteLine();
        Console.WriteLine("Usage:");
        Console.WriteLine("  Dota2UnusualPatcher --input model.vmdl_c --output patched.vmdl_c");
        Console.WriteLine("    --particle particles/econ/seasonal/new_bloom/seasonal_ambient_gold_drop.vpcf");
        Console.WriteLine("    --particle particles/econ/seasonal/new_bloom/seasonal_ambient_gold_glow.vpcf");
        Console.WriteLine();
        Console.WriteLine("Options:");
        Console.WriteLine("  --particle PATH          May be repeated to attach multiple effects");
        Console.WriteLine("  --resource-id 0x...      Override automatically calculated RERL resource id");
        Console.WriteLine("  --no-backup              Do not back up an existing output file");
    }
}
