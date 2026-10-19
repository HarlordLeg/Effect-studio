using System.Reflection;using ValveKeyValue;
static KVObject Event(string name){var row=KVObject.Collection();var list=KVObject.Array();list.Add(new KVObject(name));row["type"]=new KVObject("dota_update_vo_switch");row["vsnd_files"]=list;return row;}
var target=KVObject.Collection();var fallback=Event("sounds/vo/announcer/announcer_welcome_02.vsnd");target["announcer_announcer_welcome_01"]=Event("sounds/vo/announcer/announcer_welcome_01.vsnd");target["announcer_announcer_welcome_02"]=fallback;target["announcer_killing_spree_announcer_kill_double_01"]=Event("sounds/vo/announcer_killing_spree/announcer_kill_double_01.vsnd");
var source=KVObject.Collection();var welcome=Event("sounds/vo/announcer_dlc_meepo/meepo_ann_welcome_01.vsnd");source["meepo_line"]=welcome;var doubleKill=Event("sounds/vo/announcer_dlc_techies_killing_spree/tech_ann_kill_double_01.vsnd");source["techies_line"]=doubleKill;
var method=Assembly.Load("Dota2UnusualPatcher").GetType("GlobalCosmetics")!.GetMethod("MapSounds",BindingFlags.NonPublic|BindingFlags.Static)!;var count=(int)method.Invoke(null,new object[]{target,source})!;
if(count!=2||!ReferenceEquals(target["announcer_announcer_welcome_01"]["vsnd_files"],welcome["vsnd_files"])||!ReferenceEquals(target["announcer_announcer_welcome_02"],fallback)||!ReferenceEquals(target["announcer_killing_spree_announcer_kill_double_01"]["vsnd_files"],doubleKill["vsnd_files"]))throw new Exception("Semantic announcer mapping failed");
Console.WriteLine("Global cosmetic sound mapping: default event names retained, announcer and kill lines mapped independently, unmatched variation preserved.");

var pirateTarget=KVObject.Collection();pirateTarget["announcer_announcer_dire_ancientattack_03"]=Event("sounds/vo/announcer/announcer_dire_ancientattack_03.vsnd");
var pirate=KVObject.Collection();var pirateLine=Event("sounds/vo/Announcer_DLC_Workshop_Pirate/announcer_capn_dire_ancientattack3.vsnd");pirate["pirate_line"]=pirateLine;
if((int)method.Invoke(null,new object[]{pirateTarget,pirate})! !=1||!ReferenceEquals(pirateTarget["announcer_announcer_dire_ancientattack_03"]["vsnd_files"],pirateLine["vsnd_files"]))throw new Exception("Pirate Cap'n numeric suffix regression");
var type=Assembly.Load("Dota2UnusualPatcher").GetType("GlobalCosmetics")!;
var data=KVObject.Collection();data["_class"]=new KVObject("CParticleSystemDefinition");data["m_nMaxParticles"]=new KVObject(32);
var append=type.GetMethod("AppendChildren",BindingFlags.NonPublic|BindingFlags.Static)!;
append.Invoke(null,new object[]{data,new[]{"particles/ring_b.vpcf","particles/emblem.vpcf"}});append.Invoke(null,new object[]{data,new[]{"particles/emblem.vpcf"}});
if(data["m_Children"].Values.Count()!=2||data["m_nMaxParticles"].ToString(null)!="32")throw new Exception("Emblem must append once without replacing ring operators");
using var binding=System.Text.Json.JsonDocument.Parse("""{"attach_type":"absorigin_follow","control_points":{"0":{"control_point_index":"0","attach_type":"point_follow","attachment":"attach_eye_l"},"1":{"control_point_index":"1","attach_type":"point_follow","attachment":"attach_eye_r"}}}""");
type.GetMethod("BindCourier",BindingFlags.NonPublic|BindingFlags.Static)!.Invoke(null,new object[]{data,binding.RootElement});
var drivers=data["m_controlPointConfigurations"].Values.First()["m_drivers"].Values.ToArray();
if(drivers.Length!=2||drivers[1]["m_attachmentName"].ToString(null)!="attach_eye_r"||drivers.Any(d=>d["m_entityName"].ToString(null)!="self"))throw new Exception("Courier authored attachments must follow the replacement model");
Console.WriteLine("Pirate suffixes, non-destructive emblem children, courier authored eye bindings: passed.");
