using System.Text.Json;
using ValveResourceFormat.IO;
using ValveResourceFormat.ResourceTypes;

internal static class Program
{
    private sealed record DefaultModel(string Model, string Output);
    private sealed record Request(string Model, string Output, string[] Archives, string[] AssetDirectories, bool Materials, string? HeroModel = null, string? HeroOutput = null, string? Particle = null, DefaultModel[]? DefaultModels = null, bool SkipModel = false);

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


            var exporter = new GltfModelExporter(loader)
            {
                ProgressReporter = new Progress<string>(message => Console.WriteLine(message)),
                ExportMaterials = request.Materials,
                ExportAnimations = true,
                AdaptTextures = true,
                SatelliteImages = false,
            };
            if(!request.SkipModel){using var model=loader.LoadFile(request.Model)??throw new FileNotFoundException("Model not found",request.Model);if(model.DataBlock is not Model)throw new InvalidDataException("Resource is not a model");exporter.Export(model,target);}
            if (request.HeroModel is not null && request.HeroOutput is not null)
            {
                using var hero = loader.LoadFile(request.HeroModel) ?? throw new FileNotFoundException("Hero model not found", request.HeroModel);
                if (hero.DataBlock is not Model) throw new InvalidDataException("Hero resource is not a model");
                exporter.Export(hero, Path.GetFullPath(request.HeroOutput));
            }
            foreach (var part in request.DefaultModels ?? [])
            {
                using var resource = loader.LoadFile(part.Model) ?? throw new FileNotFoundException("Default item model not found", part.Model);
                if (resource.DataBlock is not Model) throw new InvalidDataException("Default item resource is not a model");
                exporter.Export(resource, Path.GetFullPath(part.Output));
            }
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
}
