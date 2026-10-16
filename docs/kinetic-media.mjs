import {kineticGroups} from './kinetic-gems.mjs';
// Original Dota 2 Wiki media, checked 2026-10-16. GIF URLs may return animated WebP.
// Never substitute ambient/ability videos for a missing stance demonstration.
export const kineticWikiPages={
 "5168": "https://dota2.fandom.com/wiki/Mace_of_the_Chosen",
 "18510": "https://dota2.fandom.com/wiki/Shatterblast_Rule",
 "8271": "https://dota2.fandom.com/wiki/Basher_of_Mage_Skulls",
 "4654": "https://dota2.fandom.com/wiki/Glaive_of_the_Mage_Slayer",
 "4322": "https://dota2.fandom.com/wiki/Glaive_of_the_Mage_Slayer_-_Off-Hand",
 "7276": "https://dota2.fandom.com/wiki/Golden_Offhand_Basher_of_Mage_Skulls",
 "8324": "https://dota2.fandom.com/wiki/Offhand_Basher_of_Mage_Skulls",
 "7277": "https://dota2.fandom.com/wiki/Golden_Basher_of_Mage_Skulls",
 "4004": "https://dota2.fandom.com/wiki/Blood_Chaser",
 "12964": "https://dota2.fandom.com/wiki/Fists_of_Axe_Unleashed",
 "12290": "https://dota2.fandom.com/wiki/Ghastly_Nocturne",
 "6529": "https://dota2.fandom.com/wiki/Boomerang_of_the_Twin_Blades",
 "6543": "https://dota2.fandom.com/wiki/Greater_Twin_Blade",
 "13081": "https://dota2.fandom.com/wiki/Tines_of_Tybara",
 "9090": "https://dota2.fandom.com/wiki/Lycosidae%27s_Brood",
 "23344": "https://dota2.fandom.com/wiki/Limbs_of_Lucosidae",
 "14992": "https://dota2.fandom.com/wiki/Rabid_Watchcog",
 "6239": "https://dota2.fandom.com/wiki/Telebolt_Projektor",
 "6686": "https://dota2.fandom.com/wiki/Yulsaria%27s_Glacier",
 "6784": "https://dota2.fandom.com/wiki/White_Sentry",
 "7385": "https://dota2.fandom.com/wiki/Frost_Avalanche",
 "9209": "https://dota2.fandom.com/wiki/The_Sunbreeze_Birthright",
 "7361": "https://dota2.fandom.com/wiki/Darkclaw_Emissary_Staff",
 "6694": "https://dota2.fandom.com/wiki/Fluttering_Mortis",
 "4049": "https://dota2.fandom.com/wiki/Dress_of_the_Corpse_Maiden",
 "4191": "https://dota2.fandom.com/wiki/Ghastly_Scarf_of_the_Corpse_Maiden",
 "4190": "https://dota2.fandom.com/wiki/Wicked_Collar_of_the_Corpse_Maiden",
 "8131": "https://dota2.fandom.com/wiki/Resistive_Pinfold",
 "23655": "https://dota2.fandom.com/wiki/Tremors_of_the_Tandem_Storm",
 "6873": "https://dota2.fandom.com/wiki/Burning_Fiend",
 "23628": "https://dota2.fandom.com/wiki/Draconic_Divide",
 "6785": "https://dota2.fandom.com/wiki/Mania%27s_Mask",
 "8006": "https://dota2.fandom.com/wiki/Silent_Wake",
 "8037": "https://dota2.fandom.com/wiki/Golden_Silent_Wake",
 "8035": "https://dota2.fandom.com/wiki/Silent_Wake_of_the_Crimson_Witness",
 "12969": "https://dota2.fandom.com/wiki/Judgement_of_the_Fallen",
 "14242": "https://dota2.fandom.com/wiki/Vise_of_Creation",
 "6857": "https://dota2.fandom.com/wiki/Flourishing_Lodestar",
 "23682": "https://dota2.fandom.com/wiki/Flutterstep",
 "6480": "https://dota2.fandom.com/wiki/Geodesic_Eidolon",
 "7816": "https://dota2.fandom.com/wiki/Bracers_of_Aeons",
 "7996": "https://dota2.fandom.com/wiki/Bracers_of_Aeons_of_the_Crimson_Witness",
 "8268": "https://dota2.fandom.com/wiki/Jewel_of_Aeons",
 "5382": "https://dota2.fandom.com/wiki/Viridus_Claw",
 "7571": "https://dota2.fandom.com/wiki/Mace_of_Aeons",
 "14967": "https://dota2.fandom.com/wiki/B.U.S.T.E.R",
 "24670": "https://dota2.fandom.com/wiki/B.U.S.T.E.R_of_the_Crimson_Witness",
 "4300": "https://dota2.fandom.com/wiki/Obsidian_Blade_Warhelm",
 "22716": "https://dota2.fandom.com/wiki/Draca_Mane",
 "24877": "https://dota2.fandom.com/wiki/Golden_Draca_Mane",
 "18616": "https://dota2.fandom.com/wiki/Draca_Maw",
 "18564": "https://dota2.fandom.com/wiki/Golden_Draca_Maw",
 "8188": "https://dota2.fandom.com/wiki/Searing_Dominator",
 "7979": "https://dota2.fandom.com/wiki/Dark_Artistry_Cape",
 "7849": "https://dota2.fandom.com/wiki/Mask_of_the_Divine_Sorrow",
 "23768": "https://dota2.fandom.com/wiki/Altar_Ball",
 "12417": "https://dota2.fandom.com/wiki/Crimson_Edge_of_the_Lost_Order",
 "12296": "https://dota2.fandom.com/wiki/Golden_Edge_of_the_Lost_Order",
 "9984": "https://dota2.fandom.com/wiki/Edge_of_the_Lost_Order",
 "4076": "https://dota2.fandom.com/wiki/Fireborn_Odachi",
 "4904": "https://dota2.fandom.com/wiki/Akakiryu_of_a_Thousand_Faces",
 "9198": "https://dota2.fandom.com/wiki/Wings_of_Daybreak",
 "6487": "https://dota2.fandom.com/wiki/Aged_Spirit_of_Tide",
 "6757": "https://dota2.fandom.com/wiki/Inverse_Bayonet",
 "5335": "https://dota2.fandom.com/wiki/BladeBiter",
 "5466": "https://dota2.fandom.com/wiki/Claddish_Guard",
 "12291": "https://dota2.fandom.com/wiki/Leviathan_Whale_Blade_of_Eminent_Revival",
 "4011": "https://dota2.fandom.com/wiki/Pegleg_of_the_Cursed_Pirate",
 "9115": "https://dota2.fandom.com/wiki/Prize_of_the_Saltworn_Mariner",
 "7930": "https://dota2.fandom.com/wiki/Legacy_of_the_Fallen_Legion",
 "7734": "https://dota2.fandom.com/wiki/Spirethorn",
 "12308": "https://dota2.fandom.com/wiki/Tormented_Staff_of_Eminent_Revival",
 "8612": "https://dota2.fandom.com/wiki/Tormented_Staff",
 "4852": "https://dota2.fandom.com/wiki/Dead_Winter_Soul",
 "9215": "https://dota2.fandom.com/wiki/Golden_Profane_Union",
 "9199": "https://dota2.fandom.com/wiki/Profane_Union",
 "8003": "https://dota2.fandom.com/wiki/Disciple_of_the_Wyrmwrought_Flame",
 "12309": "https://dota2.fandom.com/wiki/Cauldron_of_Xahryx_of_Eminent_Revival",
 "5105": "https://dota2.fandom.com/wiki/Cauldron_of_Xahryx",
 "5947": "https://dota2.fandom.com/wiki/Lucentyr",
 "7398": "https://dota2.fandom.com/wiki/Moon_Griffon",
 "5445": "https://dota2.fandom.com/wiki/Ancient_Armor_Helmet",
 "4686": "https://dota2.fandom.com/wiki/Scythe_of_Twin_Deaths",
 "5241": "https://dota2.fandom.com/wiki/Flaming_Scepter_of_Ancestral_Luck",
 "5658": "https://dota2.fandom.com/wiki/Gleaming_Seal",
 "23785": "https://dota2.fandom.com/wiki/Age_of_Attrition_-_Head",
 "23766": "https://dota2.fandom.com/wiki/Age_of_Attrition_-_Arms",
 "7838": "https://dota2.fandom.com/wiki/Compendium_Bone_Crusher_of_the_Trapper",
 "6115": "https://dota2.fandom.com/wiki/Pauldron_Perch",
 "5347": "https://dota2.fandom.com/wiki/Whalehook",
 "12337": "https://dota2.fandom.com/wiki/Golden_Bloodfeather_Feast",
 "12322": "https://dota2.fandom.com/wiki/Bloodfeather_Feast",
 "8000": "https://dota2.fandom.com/wiki/Severing_Lash",
 "4702": "https://dota2.fandom.com/wiki/Slim_Blade_of_the_Tahlin_Watch",
 "7029": "https://dota2.fandom.com/wiki/Conceit_of_the_Wandering_Harlequin",
 "8259": "https://dota2.fandom.com/wiki/Arms_of_Desolation",
 "6892": "https://dota2.fandom.com/wiki/Empyrean",
 "6919": "https://dota2.fandom.com/wiki/Golden_Empyrean",
 "12926": "https://dota2.fandom.com/wiki/Flight_of_Epiphany",
 "12993": "https://dota2.fandom.com/wiki/Golden_Flight_of_Epiphany",
 "13568": "https://dota2.fandom.com/wiki/Crimson_Flight_of_Epiphany",
 "7974": "https://dota2.fandom.com/wiki/Hydrakan_Latch",
 "8002": "https://dota2.fandom.com/wiki/Golden_Hydrakan_Latch",
 "4804": "https://dota2.fandom.com/wiki/Silent_Ripper",
 "4594": "https://dota2.fandom.com/wiki/Instagib_OSP",
 "6453": "https://dota2.fandom.com/wiki/Muh_Keen_Gun",
 "5240": "https://dota2.fandom.com/wiki/Wolfhound_Rifle",
 "5956": "https://dota2.fandom.com/wiki/The_Fearmaker",
 "6019": "https://dota2.fandom.com/wiki/Festive_Robes_of_Good_Fortune",
 "8189": "https://dota2.fandom.com/wiki/Vigil_Signet",
 "13527": "https://dota2.fandom.com/wiki/Pachyderm_Powderwagon_Elephant",
 "7469": "https://dota2.fandom.com/wiki/Claddish_Cudgel",
 "6224": "https://dota2.fandom.com/wiki/Mecha_Boots_of_Travel_Mk_III",
 "9196": "https://dota2.fandom.com/wiki/Stuntwood_Sanctuary",
 "9452": "https://dota2.fandom.com/wiki/Stuntwood_Sanctuary_of_the_Crimson_Witness",
 "5344": "https://dota2.fandom.com/wiki/Scree%27auk%27s_Talon",
 "6474": "https://dota2.fandom.com/wiki/Splattering_Forcipule",
 "6473": "https://dota2.fandom.com/wiki/Hellborn_Grasp",
 "4636": "https://dota2.fandom.com/wiki/Armored_Exoskeleton_Wings",
 "4454": "https://dota2.fandom.com/wiki/Lyralei%27s_Breeze",
 "4598": "https://dota2.fandom.com/wiki/Sparrowhawk_Bow",
 "4601": "https://dota2.fandom.com/wiki/Sparrowhawk_Cape",
 "4603": "https://dota2.fandom.com/wiki/Sparrowhawk_Hood",
 "4619": "https://dota2.fandom.com/wiki/Sparrowhawk_Quiver",
 "4607": "https://dota2.fandom.com/wiki/Sparrowhawk_Wings",
 "6687": "https://dota2.fandom.com/wiki/Sylvan_Cascade",
 "4483": "https://dota2.fandom.com/wiki/Stinger",
 "8267": "https://dota2.fandom.com/wiki/Bonkers_the_Mad",
 "9679": "https://dota2.fandom.com/wiki/Bonkers_of_Awaleb",
 "9934": "https://dota2.fandom.com/wiki/Head_of_Morbific_Provision",
 "5412": "https://dota2.fandom.com/wiki/Righteous_Thunderbolt",
 "5581": "https://dota2.fandom.com/wiki/Kinetic:_Impatient_Maiden"
};
export const kineticWikiClips={
 "4004":[{"file":"The_Blood_Chaser_ambient.gif","action":"ACT_DOTA_RUN","url":"https://static.wikia.nocookie.net/dota2_gamepedia/images/3/30/The_Blood_Chaser_ambient.gif","type":"image","page":"https://dota2.fandom.com/wiki/File:The_Blood_Chaser_ambient.gif"},{"file":"The_Blood_Chaser_Counter_Helix.gif","action":"ACT_DOTA_IDLE","url":"https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a7/The_Blood_Chaser_Counter_Helix.gif","type":"image","page":"https://dota2.fandom.com/wiki/File:The_Blood_Chaser_Counter_Helix.gif"}],
 "4076": [
  {
   "file": "Fireborn_Odachi_Idle.gif",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/69/Fireborn_Odachi_Idle.gif",
   "type": "image",
   "action": "ACT_DOTA_IDLE",
   "page": "https://dota2.fandom.com/wiki/File:Fireborn_Odachi_Idle.gif"
  },
  {
   "file": "Fireborn_Odachi_Run.gif",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3e/Fireborn_Odachi_Run.gif",
   "type": "image",
   "action": "ACT_DOTA_RUN",
   "page": "https://dota2.fandom.com/wiki/File:Fireborn_Odachi_Run.gif"
  }
 ],
 "6873": [
  {
   "file": "Burning_Fiend_Loadout.gif",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/cf/Burning_Fiend_Loadout.gif",
   "type": "image",
   "action": "ACT_DOTA_LOADOUT",
   "page": "https://dota2.fandom.com/wiki/File:Burning_Fiend_Loadout.gif"
  }
 ],
 "6892": [
  {
   "file": "Kinetic_Empyrean.webm",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/69/Kinetic_Empyrean.webm",
   "type": "video",
   "action": "ACT_DOTA_LOADOUT",
   "page": "https://dota2.fandom.com/wiki/File:Kinetic_Empyrean.webm"
  }
 ],
 "6919": [
  {
   "file": "Kinetic_Empyrean.webm",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/69/Kinetic_Empyrean.webm",
   "type": "video",
   "action": "ACT_DOTA_LOADOUT",
   "page": "https://dota2.fandom.com/wiki/File:Kinetic_Empyrean.webm"
  }
 ],
 "6453": [
  {
   "file": "Muh_Keen_Gun_Idle.webm",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/89/Muh_Keen_Gun_Idle.webm",
   "type": "video",
   "action": "ACT_DOTA_LOADOUT",
   "page": "https://dota2.fandom.com/wiki/File:Muh_Keen_Gun_Idle.webm"
  }
 ],
 "4594": [
  {
   "file": "Muh_Keen_Gun_Idle.webm",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/89/Muh_Keen_Gun_Idle.webm",
   "type": "video",
   "action": "ACT_DOTA_LOADOUT",
   "page": "https://dota2.fandom.com/wiki/File:Muh_Keen_Gun_Idle.webm"
  }
 ],
 "5581": [
  {
   "file": "Impatient_Maiden_Loadout.webm",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/0/05/Impatient_Maiden_Loadout.webm",
   "type": "video",
   "action": "ACT_DOTA_LOADOUT",
   "page": "https://dota2.fandom.com/wiki/File:Impatient_Maiden_Loadout.webm"
  }
 ],
 "5956": [
  {
   "file": "Kinetic_Allure_of_Succubus.webm",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/60/Kinetic_Allure_of_Succubus.webm",
   "type": "video",
   "action": "ACT_DOTA_LOADOUT",
   "page": "https://dota2.fandom.com/wiki/File:Kinetic_Allure_of_Succubus.webm"
  }
 ],
 "5347": [
  {
   "file": "Whalehook_Loadout.gif",
   "url": "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/19/Whalehook_Loadout.gif",
   "type": "image",
   "action": "ACT_DOTA_LOADOUT",
   "page": "https://dota2.fandom.com/wiki/File:Whalehook_Loadout.gif"
  }
 ]
};
export function kineticWikiPreview(option,downloaded={items:{}}){
 const match=/^game-(\d+)(?:-style-\d+)?$/.exec(option.id??'');
 const id=match?.[1]??null,actions=kineticGroups([option]);
 const local=downloaded.items?.[id];const clips=[...(local?.clips??[]),...(kineticWikiClips[id]??[])].filter((clip,index,all)=>all.findIndex(c=>c.file===clip.file&&c.action===clip.action)===index);
 return {page:local?.page??kineticWikiPages[id]??null,clips:clips.filter(clip=>actions.has(clip.action))};
}
