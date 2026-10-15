using System.Globalization;
using System.Text.Json;
using ValveKeyValue;
using ValveResourceFormat;
using ValveResourceFormat.Blocks;
using ValveResourceFormat.ResourceTypes;

// Bind permanent ambients to the hero model that is recreated by Metamorphosis.
// Geometry, animation, physics and morph payloads are copied without rewriting.
internal static class TerrorbladeBindings
{
    private sealed record AttachmentSource(string Input, string[] Names);
    private sealed record Entry(string Input,string Output,string[]? Particles=null,AttachmentSource[]? Attachments=null,bool SelfBindings=false);
    private sealed record Request(Entry[] Files);
    public static void Run(string manifest)
    {
        var request=JsonSerializer.Deserialize<Request>(File.ReadAllText(manifest),new JsonSerializerOptions{PropertyNameCaseInsensitive=true})??throw new InvalidDataException("Empty binding manifest");
        foreach(var file in request.Files){
            var bytes=File.ReadAllBytes(file.Input);using var resource=new Resource{FileName=file.Input};resource.Read(file.Input);var changed=new HashSet<object>();
            if(resource.DataBlock is Model model){
                var bones=model.Data["m_modelSkeleton"]["m_boneName"].Values.Select(v=>v.ToString(CultureInfo.InvariantCulture)).ToHashSet(StringComparer.Ordinal);
                foreach(var source in file.Attachments??[]){
                    using var donor=new Resource{FileName=source.Input};donor.Read(source.Input);
                    var found=new Dictionary<string,KVObject>(StringComparer.Ordinal);
                    foreach(var block in donor.Blocks.OfType<KeyValuesOrNTRO>().Where(b=>b.Type.ToString()=="MDAT"))
                        if(block.Data.TryGetValue("m_attachments",out var values))foreach(var entry in values.Values){var name=entry["key"].ToString(CultureInfo.InvariantCulture);if(source.Names.Contains(name,StringComparer.Ordinal))found[name]=entry;}
                    foreach(var name in source.Names)if(!found.ContainsKey(name))throw new InvalidDataException("Missing attachment: "+name);
                    foreach(var entry in found.Values)foreach(var name in entry["value"]["m_influenceNames"].Values.Select(v=>v.ToString(CultureInfo.InvariantCulture)).Where(n=>n.Length>0))if(!bones.Contains(name))throw new InvalidDataException("Attachment bone missing: "+name);
                    foreach(var block in resource.Blocks.OfType<KeyValuesOrNTRO>().Where(b=>b.Type.ToString()=="MDAT")){
                        var array=KVObject.Array();if(block.Data.TryGetValue("m_attachments",out var existing))foreach(var entry in existing.Values)if(!found.ContainsKey(entry["key"].ToString(CultureInfo.InvariantCulture)))array.Add(entry);
                        foreach(var entry in found.Values)array.Add(entry);block.Data["m_attachments"]=array;changed.Add(block);
                    }
                }
                if(file.Particles?.Length>0){var info=model.Data["m_modelInfo"];var text=info.TryGetValue("m_keyValueText",out var current)?current.ToString(CultureInfo.InvariantCulture):"";info["m_keyValueText"]=new KVObject(ModelKeyText.AddParticles(text,file.Particles));
                    var references=resource.ExternalReferences??throw new InvalidDataException("Model has no external reference table");
                    foreach(var particle in file.Particles){if(!references.ResourceRefInfoList.Any(r=>r.Name==particle))references.ResourceRefInfoList.Add(new ResourceExtRefList.ResourceReferenceInfo{Name=particle,Id=Program.ComputeResourceId(particle)});}
                    changed.Add(references);Program.SetRed2ParticleReference(resource);if(resource.EditInfo is ResourceEditInfo2)changed.Add(resource.EditInfo);
                }
            }else if(resource.DataBlock is ParticleSystem particle&&file.SelfBindings){
                if(particle.Data.TryGetValue("m_controlPointConfigurations",out var configurations))foreach(var configuration in configurations.Values)if(configuration.TryGetValue("m_drivers",out var drivers))foreach(var driver in drivers.Values)if(driver.TryGetValue("m_entityName",out var name)&&name.ToString(CultureInfo.InvariantCulture)=="parent")driver["m_entityName"]=new KVObject("self");
            }else throw new InvalidDataException("Invalid binding resource");
            using(var output=File.Create(file.Output))Program.SerializePatchedResource(resource,bytes,output,true,changed,preserveMetadata:true);
            using var check=new Resource{FileName=file.Output};check.Read(file.Output);
            var written=File.ReadAllBytes(file.Output);foreach(var block in resource.Blocks.Where(b=>!ReferenceEquals(b,resource.DataBlock)&&!changed.Contains(b))){var after=check.Blocks[resource.Blocks.IndexOf(block)];if(!bytes.AsSpan((int)block.Offset,(int)block.Size).SequenceEqual(written.AsSpan((int)after.Offset,(int)after.Size)))throw new InvalidDataException("Binding changed unrelated block: "+block.Type);}
        }
        Console.WriteLine("[OK] Terrorblade model bindings: "+request.Files.Length);
    }
}
