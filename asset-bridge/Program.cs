using System.Text.Json;
using SkiaSharp;
using ValveResourceFormat.IO;
using ValveResourceFormat.ResourceTypes;

internal static class Program
{
    private sealed record DefaultModel(string Model, string Output);
    private sealed record Request(string Model, string Output, string[] Archives, string[] AssetDirectories, bool Materials, string? HeroModel = null, string? HeroOutput = null, string? Particle = null, DefaultModel[]? DefaultModels = null, bool SkipModel = false, int Skin = 0, string[]? NativeParticles = null, string? ThumbnailTexture = null, string[]? MetadataModels = null, string[]? MetadataAnimationModels = null, string[]? MetadataPreferredAnimations = null, string[]? MetadataActivityTags = null);

    public static int Main(string[] args)
    {
        try
        {
            if(args.Length==1&&args[0]=="--capabilities"){Console.WriteLine("{\"version\":\"1.1.0\",\"skipModel\":true,\"animatedParticleModels\":true}");return 0;}
            if (args.Length != 1) throw new ArgumentException("Usage: DotaAssetBridge request.json");
            var request = JsonSerializer.Deserialize<Request>(File.ReadAllText(args[0]), new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
                ?? throw new InvalidDataException("Empty request");
            if (!request.Model.EndsWith(".vmdl_c", StringComparison.OrdinalIgnoreCase)
                || request.Model.Split('/').Contains("..")) throw new InvalidDataException("Invalid model path");
            var target = Path.GetFullPath(request.Output);
            Directory.CreateDirectory(Path.GetDirectoryName(target)!);

            using var loader = new GameFileLoader(null, null);
            foreach (var archive in request.Archives) loader.AddPackageToSearch(Path.GetFullPath(archive));
            foreach (var directory in request.AssetDirectories) loader.AddDiskPathToSearch(Path.GetFullPath(directory));
            foreach (var archive in request.Archives)
            {
                var core = Path.GetFullPath(Path.Combine(Path.GetDirectoryName(archive)!, "..", "core", "pak01_dir.vpk"));
                if (File.Exists(core)) loader.AddPackageToSearch(core);
            }


            if (request.MetadataModels is not null)
            {
                if (request.MetadataModels.Length > 32) throw new InvalidDataException("Too many metadata models");
                var models = new Dictionary<string, System.Text.Json.Nodes.JsonNode>();
                var warnings = new List<string>();
                foreach (var path in request.MetadataModels.Distinct()) {
                    if (!path.StartsWith("models/", StringComparison.Ordinal) || !path.EndsWith(".vmdl_c", StringComparison.Ordinal) || path.Split('/').Contains("..")) throw new InvalidDataException("Invalid model path");
                    try { using var source = loader.LoadFile(path) ?? throw new FileNotFoundException(path); models[path] = PreviewMetadata.Describe(source, loader);
                        if ((request.MetadataAnimationModels??[]).Contains(path)) {
                            try {
                                var glb=Path.Combine(Path.GetDirectoryName(target)!,"animations-"+models.Count+".glb");
                                ExportModel(loader,path,glb,false,animationFilter:PreviewMetadata.AnimationNames(models[path],request.MetadataPreferredAnimations??[],request.MetadataActivityTags??[]));
                                models[path]["animationGlb"]=Convert.ToBase64String(File.ReadAllBytes(glb));
                            } catch(Exception error) {warnings.Add(path+": animation recovery failed: "+error.Message);}
                        } }
                    catch (Exception error) { warnings.Add(path + ": " + error.Message); }
                }
                File.WriteAllText(target, JsonSerializer.Serialize(new {models,warnings}));
                return 0;
            }

            if (request.ThumbnailTexture is not null)
            {
                if (!new[]{"panorama/images/econ/","panorama/images/heroes/","panorama/images/spellicons/","panorama/images/items/"}.Any(prefix=>request.ThumbnailTexture.StartsWith(prefix,StringComparison.Ordinal)) || !request.ThumbnailTexture.EndsWith(".vtex_c", StringComparison.Ordinal) || request.ThumbnailTexture.Split('/').Contains("..")) throw new InvalidDataException("Invalid inventory texture");
                using var image = loader.LoadFile(request.ThumbnailTexture) ?? throw new FileNotFoundException("Inventory texture missing");
                if (image.DataBlock is not Texture texture) throw new InvalidDataException("Inventory image is not a texture");
                using var bitmap = texture.GenerateBitmap();
                using var png = bitmap.Encode(SKEncodedImageFormat.Png, 100);
                File.WriteAllBytes(target, png.ToArray());
                return 0;
            }

            if (!request.SkipModel) ExportModel(loader, request.Model, target, request.Materials, request.Skin);
            if (request.HeroModel is not null && request.HeroOutput is not null)
                ExportModel(loader, request.HeroModel, Path.GetFullPath(request.HeroOutput), request.Materials);
            foreach (var part in request.DefaultModels ?? [])
                ExportModel(loader, part.Model, Path.GetFullPath(part.Output), request.Materials);
            if (request.Particle is not null)
            {
                var effectOutput = Path.Combine(Path.GetDirectoryName(target)!, "effect.json");
                try { ParticleExport.Write(loader, request.Particle, effectOutput); }
                catch (Exception exception)
                {
                    File.WriteAllText(effectOutput, JsonSerializer.Serialize(new { error = exception.Message }));
                    Console.WriteLine("Particle data export failed: " + exception.Message);
                }
            }
            foreach(var entry in (request.NativeParticles ?? []).Select((particle,index)=>(particle,index)))
            {
                var output=Path.Combine(Path.GetDirectoryName(target)!, "native-"+entry.index+".json");
                try { ParticleExport.Write(loader, entry.particle, output); }
                catch(Exception exception){File.WriteAllText(output,JsonSerializer.Serialize(new {error=exception.Message}));}
            }
            if (!File.Exists(target) || new FileInfo(target).Length < 20) throw new InvalidDataException("GLB export is empty");
            Console.WriteLine(JsonSerializer.Serialize(new { status = "ready", bytes = new FileInfo(target).Length, materials = request.Materials }));
            return 0;
        }
        catch (Exception exception)
        {
            Console.Error.WriteLine(exception.ToString());
            return 1;
        }
    }
    private static void ExportModel(GameFileLoader loader, string modelPath, string target, bool materials, int skin = 0, HashSet<string>? animationFilter = null)
    {
        using var resource = loader.LoadFile(modelPath) ?? throw new FileNotFoundException("Model not found", modelPath);
        if (resource.DataBlock is not Model) throw new InvalidDataException("Resource is not a model: " + modelPath);
        ModelVariant.Apply(resource, skin);
        var hidden=VisibleMeshExport.Prepare(resource);if(hidden>0)Console.WriteLine("Preview: skipped "+hidden+" disabled mesh(es)");
        Directory.CreateDirectory(Path.GetDirectoryName(target)!);
        var modes = materials ? new[] { "adapted", "original", "geometry" } : new[] { "geometry" };
        string? warning = null;
        var animations = true;
        for (var i = 0; i < modes.Length; i++)
        {
            var mode = modes[i];
            // A failed export leaves failed texture tasks in the exporter. Never reuse it.
            var exporter = new GltfModelExporter(loader)
            {
                ProgressReporter = new Progress<string>(message => Console.WriteLine(message)),
                ExportMaterials = mode != "geometry",
                ExportAnimations = animations,
                ComposeAdditiveAnimations = true,
                AdaptTextures = mode == "adapted",
                SatelliteImages = false,
            };
            if(animationFilter is not null)foreach(var animation in animationFilter)exporter.AnimationFilter.Add(animation);
            try
            {
                exporter.Export(resource, target);
                PreviewMetadata.Write(resource, target, loader);
                if (!File.Exists(target) || new FileInfo(target).Length < 20)
                    throw new InvalidDataException("GLB export is empty: " + modelPath);
                File.WriteAllText(target + ".export.json", JsonSerializer.Serialize(new { model = modelPath, mode, warning, animations }));
                return;
            }
            catch (Exception exception) when (animations && IsAnimationFailure(exception))
            {
                animations = false;
                warning = "Animation decoder fallback for " + modelPath + ": exporting without item animations";
                Console.WriteLine("[WARN] " + warning);
                if (File.Exists(target)) File.Delete(target);
                i--; // Retry this material mode with a fresh exporter, retaining skinning.
            }
            catch (Exception exception) when (i + 1 < modes.Length && IsTextureFailure(exception))
            {
                warning = "Texture export fallback for " + modelPath + ": " + modes[i + 1];
                Console.WriteLine("[WARN] " + warning);
                Console.WriteLine(exception.ToString());
                if (File.Exists(target)) File.Delete(target);
            }
        }
    }

    private static bool IsAnimationFailure(Exception exception)
    {
        var details = exception.ToString();
        return details.Contains("ModelAnimation", StringComparison.Ordinal)
            || details.Contains("GltfModelExporter.AnimationWriter", StringComparison.Ordinal)
            || details.Contains("GltfModelExporter.Anim.cs", StringComparison.Ordinal);
    }

    private static bool IsTextureFailure(Exception exception)
    {
        var details = exception.ToString();
        return details.Contains("TextureExtract", StringComparison.Ordinal)
            || details.Contains("GltfModelExporter.Material", StringComparison.Ordinal)
            || details.Contains("TexturePacker", StringComparison.Ordinal);
    }

}
