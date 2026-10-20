using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.ResourceTypes;

internal static class ParticleSuppression
{
    private sealed record Entry(string Input,string Output);
    private sealed record Request(Entry[] Files);
    public static void Run(string manifest)
    {
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty particle suppression manifest");
        foreach(var file in request.Files){
            var bytes=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);
            if(resource.DataBlock is not ParticleSystem particle)throw new InvalidDataException("Expected particle system");
            foreach(var key in particle.Data.Keys.ToArray())particle.Data.Remove(key);
            particle.Data["_class"]=new KVObject("CParticleSystemDefinition");particle.Data["m_nBehaviorVersion"]=new KVObject(12);particle.Data["m_nMaxParticles"]=new KVObject(1);
            foreach(var key in new[]{"m_Emitters","m_Renderers","m_Children","m_Initializers","m_Operators","m_PreEmissionOperators"})particle.Data[key]=KVObject.Array();
            var changed=new HashSet<object>();if(resource.ExternalReferences is {} references){references.ResourceRefInfoList.Clear();changed.Add(references);}
            using(var output=File.Create(file.Output))Program.SerializePatchedResource(resource,bytes,output,true,changed,preserveMetadata:true);
            using var check=new Resource{FileName=file.Output};check.Read(file.Output);
            if(check.DataBlock is not ParticleSystem result||result.Data["m_Children"].Count!=0||result.Data["m_Emitters"].Count!=0||result.Data["m_Renderers"].Count!=0)throw new InvalidDataException("Particle suppression verification failed");
        }
        Console.WriteLine("[OK] Suppressed stock particle systems: "+request.Files.Length);
    }
}
