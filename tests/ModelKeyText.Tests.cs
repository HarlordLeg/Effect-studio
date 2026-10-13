using System.Text.RegularExpressions;
var effect = "harlord/particles/econ/seasonal/seasonal_ambient_silver.vpcf";
static void Assert(bool condition, string message) { if (!condition) throw new Exception(message); }
const string original = "<!-- kv3 encoding:text:version{a} format:x:version{b} -->\n{\n attachments = [{ name = \"blade}\\\"test\" pos = [1,2,3] }]\n particle_cfg_list = [{ name = resource:\"particles/original.vpcf\" config = \"original\" }] // keep\n other_key = { enabled = true }\n}";
var updated = ModelKeyText.AddParticles(original, new[]{effect});
Assert(updated.Contains("attachments = [{ name = \"blade}\\\"test\" pos = [1,2,3] }]"), "Attachments lost");
Assert(updated.Contains("particles/original.vpcf"), "Original particle lost");
Assert(updated.Contains("other_key = { enabled = true }"), "Other key lost");
Assert(updated.Contains(effect), "New particle missing");
Assert(ModelKeyText.AddParticles(updated, new[]{effect}) == updated, "Not idempotent");
Assert(Regex.Matches(updated, Regex.Escape(effect)).Count == 1, "Duplicate effect");
var newText=ModelKeyText.AddParticles("",new[]{effect});Assert(newText.Contains("particle_cfg_list"),"No list generated");
var withComments=ModelKeyText.AddParticles("{ particle_cfg_list = [ { name = resource:\"particles/a.vpcf\" } /* } ] */ ] }",new[]{effect});
Assert(withComments.Contains(effect),"Comments confused parser");
try { ModelKeyText.AddParticles("{ particle_cfg_list = [ }",new[]{effect});throw new Exception("Malformed input accepted"); } catch(InvalidDataException) {}
try { ModelKeyText.AddParticles("{}",new[]{"particles/../bad.vpcf"});throw new Exception("Unsafe path accepted"); } catch(InvalidDataException) {}
Console.WriteLine("ModelKeyText tests passed.");
