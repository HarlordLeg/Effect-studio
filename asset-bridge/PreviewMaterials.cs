using System.Text.Json.Nodes;
using SkiaSharp;
using ValveResourceFormat;
using ValveResourceFormat.IO;
using ValveResourceFormat.ResourceTypes;

// Keep Dota's masks and material switches for the loadout hero shader. PBR
// color/normal maps alone cannot describe additive cards or animated detail.
internal static class PreviewMaterials
{
    internal static JsonObject Describe(Resource model, IFileLoader loader)
    {
        var result=new JsonObject();var visited=new HashSet<string>();var queue=new Queue<string>();
        void Refs(Resource r){foreach(var reference in r.ExternalReferences?.ResourceRefInfoList??[])if(reference.Name.EndsWith(".vmat")||reference.Name.EndsWith(".vmesh"))queue.Enqueue(reference.Name+"_c");}
        Refs(model);
        while(queue.TryDequeue(out var file)&&visited.Count<128){if(!visited.Add(file))continue;
            try{using var source=loader.LoadFile(file);if(source is null)continue;if(source.DataBlock is not Material material){Refs(source);continue;}
                var row=Extract(source,material,loader);result[file.EndsWith("_c")?file[..^2]:file]=row;
            }catch(Exception error){Console.WriteLine("[WARN] Preview material "+file+": "+error.Message);}
        }
        return result;
    }
    internal static JsonObject Extract(Resource resource,Material m,IFileLoader loader)
    {
        float F(string name,float fallback=0)=>m.FloatParams.GetValueOrDefault(name,fallback);
        bool Flag(string name)=>m.IntParams.GetValueOrDefault(name)!=0;
        JsonArray V(string name,int count=3){var v=m.VectorParams.GetValueOrDefault(name,new System.Numerics.Vector4(1));return new JsonArray(new[]{v.X,v.Y,v.Z,v.W}.Take(count).Select(f=>(JsonNode?)JsonValue.Create(f)).ToArray());}
        var descriptor=new JsonObject{["detailMode"]=m.IntParams.GetValueOrDefault("F_DETAIL"),["detailBlend"]=F("g_flDetailBlendFactor",1),["detailScale"]=V("g_vDetailTexCoordScale",2),["detailTint"]=V("g_vDetail1ColorTint"),["rimColor"]=V("g_vRimLightColor"),["rimScale"]=F("g_flRimLightScale"),["specColor"]=V("g_vSpecularColor"),["specScale"]=F("g_flSpecularScale",1),["specExponent"]=F("g_flSpecularExponent",16),["alphaTest"]=Flag("F_ALPHA_TEST")?F("g_flAlphaTestReference",.5f):0,["translucent"]=Flag("F_TRANSLUCENT"),["additive"]=Flag("F_ADDITIVE_BLEND"),["cloak"]=Flag("F_ENABLE_CLOAK")?F("g_flMaterialCloakFactor"):0};
        var images=new JsonObject();var bitmaps=new Dictionary<string,SKBitmap>();
        void Image(string name,SKBitmap bitmap){using var png=bitmap.Encode(SKEncodedImageFormat.Png,100);images[name]=new JsonObject{["mime"]="image/png",["data"]=Convert.ToBase64String(png.ToArray())};}
        try{
            using var content=new MaterialExtract(resource,loader).ToContentFile();
            foreach(var sub in content.SubFiles.Where(s=>s.FileName.EndsWith(".png"))){var bitmap=SKBitmap.Decode(sub.Extract?.Invoke()??[]);if(bitmap is null)continue;var cap=Math.Min(1,512f/Math.Max(bitmap.Width,bitmap.Height));if(cap<1){var scaled=bitmap.Resize(new SKImageInfo(Math.Max(1,(int)(bitmap.Width*cap)),Math.Max(1,(int)(bitmap.Height*cap))),new SKSamplingOptions(SKFilterMode.Linear));if(scaled is not null){bitmap.Dispose();bitmap=scaled;}}bitmaps[sub.FileName]=bitmap;}
            SKBitmap? Pick(string suffix)=>bitmaps.FirstOrDefault(p=>Path.GetFileNameWithoutExtension(p.Key).EndsWith(suffix,StringComparison.OrdinalIgnoreCase)).Value;
            void Pack(string field,string[] suffixes){var layers=suffixes.Select(Pick).ToArray();var first=layers.FirstOrDefault(b=>b is not null);if(first is null)return;using var packed=new SKBitmap(first.Width,first.Height);for(int y=0;y<first.Height;y++)for(int x=0;x<first.Width;x++){byte Channel(int i,byte fallback=0){var b=i<layers.Length?layers[i]:null;return b is null?fallback:b.GetPixel(x*b.Width/first.Width,y*b.Height/first.Height).Red;}packed.SetPixel(x,y,new SKColor(Channel(0),Channel(1),Channel(2),Channel(3,255)));}Image(field,packed);}
            if(Pick("_specexp") is {} exponent)Image("exponent",exponent);
            Pack("masks",["_detailmask","_selfillummask","_rimmask","_diffusemask"]);Pack("specular",["_specmask","_metalnessmask","_basetintmask"]);
            foreach(var field in new[]{("detail","g_tDetail"),("fresnel","g_tFresnelWarp"),("diffuseWarp","g_tDiffuseWarp")}){if(!m.TextureParams.TryGetValue(field.Item2,out var texture))continue;using var source=loader.LoadFile(texture.EndsWith("_c")?texture:texture+"_c");if(source?.DataBlock is not Texture t)continue;using var bitmap=t.GenerateBitmap();Image(field.Item1,bitmap);}
        }catch(Exception error){Console.WriteLine("[WARN] Preview texture masks: "+error.Message);}finally{foreach(var bitmap in bitmaps.Values)bitmap.Dispose();}
        foreach(var expression in m.DynamicExpressions){var scroll=System.Text.RegularExpressions.Regex.Match(expression.Value,@"float2\(([-\d.]+),\s*([-\d.]+)\)");if(expression.Key.Contains("Scroll")&&scroll.Success)descriptor["detailScroll"]=new JsonArray(float.Parse(scroll.Groups[1].Value,System.Globalization.CultureInfo.InvariantCulture),float.Parse(scroll.Groups[2].Value,System.Globalization.CultureInfo.InvariantCulture));}
        return new JsonObject{["descriptor"]=descriptor,["images"]=images};
    }
}
