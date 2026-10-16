# Проверка анимаций предметов

Сопоставлено 131 записей из приложенной таблицы с оригинальным items_game из присланного игрового архива.

Это проверка определений, а не подтверждение работы всех предметов в игре. Стойки дополнительно проверяются сервером по ASEQ установленной модели. Дорожки ANIM, геометрия, скелет и остальные блоки проверяются на сохранность при записи.

Для проверки всех моделей на сервере: `runtime\node.exe tools\audit-animations.mjs`. Результат: `output/animation-audit.json`. Его можно прислать для разбора отсутствующих правил и неподдержанных моделей.

Frost Avalanche требует отдельной модели арканы. Fists of Axe Unleashed требует axe_bare; обработка activity сама по себе не заменяет тело героя. Если у предмета нет activity, его особенность может находиться в модели призванного существа, частицах или собственных анимациях предмета. Эти случаи не объявлены исправленными.

| Предмет | Герой | Правила | Кинетический источник |
|---|---|---|---|
| [Mace of the Chosen](https://dota2.fandom.com/wiki/Mace_of_the_Chosen) | abaddon | mace (ACT_DOTA_ATTACK), mace (ACT_DOTA_IDLE), mace (ACT_DOTA_RUN) | — |
| [Shatterblast Rule](https://dota2.fandom.com/wiki/Shatterblast_Rule) | ancient_apparition | 2021_aa (ALL) | — |
| [Basher of Mage Skulls](https://dota2.fandom.com/wiki/Basher_of_Mage_Skulls) | antimage | basher (ALL) | — |
| [Glaive of the Mage Slayer](https://dota2.fandom.com/wiki/Glaive_of_the_Mage_Slayer) | antimage | slasher_weapon (ACT_DOTA_ATTACK), slasher_weapon (ACT_DOTA_IDLE_RARE), slasher_weapon (ACT_DOTA_DIE), slasher_weapon (ACT_DOTA_VICTORY), slasher_weapon (ACT_DOTA_LOADOUT), slasher_weapon (ACT_DOTA_IDLE) | — |
| [Glaive of the Mage Slayer - Off-Hand](https://dota2.fandom.com/wiki/Glaive_of_the_Mage_Slayer_-_Off-Hand) | antimage | slasher_offhand (ACT_DOTA_ATTACK), slasher_offhand (ACT_DOTA_IDLE_RARE), slasher_offhand (ACT_DOTA_DIE), slasher_offhand (ACT_DOTA_VICTORY), slasher_offhand (ACT_DOTA_LOADOUT), slasher_offhand (ACT_DOTA_IDLE) | — |
| [Golden Offhand Basher of Mage Skulls](https://dota2.fandom.com/wiki/Golden_Offhand_Basher_of_Mage_Skulls) | antimage | offhand_basher (ALL) | — |
| [Offhand Basher of Mage Skulls](https://dota2.fandom.com/wiki/Offhand_Basher_of_Mage_Skulls) | antimage | offhand_basher (ALL) | — |
| [Golden Basher of Mage Skulls](https://dota2.fandom.com/wiki/Golden_Basher_of_Mage_Skulls) | antimage | basher (ALL) | — |
| [Blood Chaser](https://dota2.fandom.com/wiki/Blood_Chaser) | axe | blood_chaser (ACT_DOTA_RUN), blood_chaser (ACT_DOTA_CAST_ABILITY_3), blood_chaser (ACT_DOTA_IDLE) | — |
| [Fists of Axe Unleashed](https://dota2.fandom.com/wiki/Fists_of_Axe_Unleashed) | axe | ti9 (ALL) | — |
| [Ghastly Nocturne](https://dota2.fandom.com/wiki/Ghastly_Nocturne) | batrider | ti8 (ALL) | — |
| [Boomerang of the Twin Blades](https://dota2.fandom.com/wiki/Boomerang_of_the_Twin_Blades) | bounty_hunter | twinblade_shuriken_toss_injured (ACT_DOTA_CAST_ABILITY_1) | — |
| [Greater Twin Blade](https://dota2.fandom.com/wiki/Greater_Twin_Blade) | bounty_hunter | twinblade_spawn (ACT_DOTA_SPAWN), twinblade_idle (ACT_DOTA_IDLE), twinblade_attack (ACT_DOTA_ATTACK), twinblade_death (ACT_DOTA_DIE), twinblade_shuriken_toss (ACT_DOTA_CAST_ABILITY_1), twinblade_stun (ACT_DOTA_DISABLED), twinblade_attack_b (ACT_DOTA_ATTACK), twinblade_attack_c (ACT_DOTA_ATTACK), twinblade_run (ACT_DOTA_RUN), twinblade_track (ACT_DOTA_CAST_ABILITY_4), twinblade_attack_d (ACT_DOTA_ATTACK), twinblade_idle_rare (ACT_DOTA_IDLE_RARE), twinblade_jinada (ACT_DOTA_ATTACK_EVENT), twinblade_injured_attack_b (ACT_DOTA_ATTACK), twinblade_jinada_injured (ACT_DOTA_ATTACK_EVENT), twinblade_run_injured (ACT_DOTA_RUN), twinblade_idle_injured (ACT_DOTA_IDLE), twinblade_track_injured (ACT_DOTA_CAST_ABILITY_4) | — |
| [Tines of Tybara](https://dota2.fandom.com/wiki/Tines_of_Tybara) | bounty_hunter | ti9 (ALL) | — |
| [Lycosidae's Brood](https://dota2.fandom.com/wiki/Lycosidae%27s_Brood) | broodmother | lycosidae_spread (ALL) | — |
| [Limbs of Lycosidae](https://dota2.fandom.com/wiki/Limbs_of_Lucosidae) | broodmother | bm_2022 (ALL) | — |
| [Rabid Watchcog](https://dota2.fandom.com/wiki/Rabid_Watchcog) | rattletrap | ti10 (ALL) | — |
| [Telebolt Projektor](https://dota2.fandom.com/wiki/Telebolt_Projektor) | rattletrap | telebolt (ALL) | 28 |
| [Yulsaria's Glacier](https://dota2.fandom.com/wiki/Yulsaria%27s_Glacier) | crystal_maiden | glacier (ALL) | 36 |
| [White Sentry](https://dota2.fandom.com/wiki/White_Sentry) | crystal_maiden | wardstaff (ALL) | — |
| [Frost Avalanche](https://dota2.fandom.com/wiki/Frost_Avalanche) | crystal_maiden | arcana (ALL) | — |
| [The Sunbreeze Birthright](https://dota2.fandom.com/wiki/The_Sunbreeze_Birthright) | dark_willow | rose (ALL) | — |
| [Darkclaw Emissary Staff](https://dota2.fandom.com/wiki/Darkclaw_Emissary_Staff) | dazzle | darkclaw (ALL) | — |
| [Fluttering Mortis](https://dota2.fandom.com/wiki/Fluttering_Mortis) | death_prophet | moth (ALL) | 31 |
| [Dress of the Corpse Maiden](https://dota2.fandom.com/wiki/Dress_of_the_Corpse_Maiden) | death_prophet | corpse_dress (ALL) | — |
| [Ghastly Scarf of the Corpse Maiden](https://dota2.fandom.com/wiki/Ghastly_Scarf_of_the_Corpse_Maiden) | death_prophet | corpse_scarf (ALL) | — |
| [Wicked Collar of the Corpse Maiden](https://dota2.fandom.com/wiki/Wicked_Collar_of_the_Corpse_Maiden) | death_prophet | corpse_dresstop (ALL) | — |
| [Resistive Pinfold](https://dota2.fandom.com/wiki/Resistive_Pinfold) | disruptor | pinfold (ALL) | — |
| [Tremors of the Tandem Storm](https://dota2.fandom.com/wiki/Tremors_of_the_Tandem_Storm) | disruptor | dis_2022 (ALL) | — |
| [Burning Fiend](https://dota2.fandom.com/wiki/Burning_Fiend) | doom_bringer | burning_fiend (ALL) | 41 |
| [Draconic Divide](https://dota2.fandom.com/wiki/Draconic_Divide) | dragon_knight | dk_2022 (ALL) | — |
| [Mania's Mask](https://dota2.fandom.com/wiki/Mania%27s_Mask) | drow_ranger | manias_mask (ALL) | — |
| [Silent Wake](https://dota2.fandom.com/wiki/Silent_Wake) | drow_ranger | ti6 (ACT_DOTA_CAST_ABILITY_2) | — |
| [Golden Silent Wake](https://dota2.fandom.com/wiki/Golden_Silent_Wake) | drow_ranger | ti6 (ACT_DOTA_CAST_ABILITY_2) | — |
| [Silent Wake of the Crimson Witness](https://dota2.fandom.com/wiki/Silent_Wake_of_the_Crimson_Witness) | drow_ranger | ti6 (ACT_DOTA_CAST_ABILITY_2) | — |
| [Judgement of the Fallen](https://dota2.fandom.com/wiki/Judgement_of_the_Fallen) | earthshaker | ti9_totem (ALL) | — |
| [Vise of Creation](https://dota2.fandom.com/wiki/Vise_of_Creation) | elder_titan | et_2021 (ALL) | — |
| [Flourishing Lodestar](https://dota2.fandom.com/wiki/Flourishing_Lodestar) | enchantress | lodestar (ALL) | — |
| [Flutterstep](https://dota2.fandom.com/wiki/Flutterstep) | enchantress | ench_2022 (ALL) | — |
| [Geodesic Eidolon](https://dota2.fandom.com/wiki/Geodesic_Eidolon) | enigma | Нет activity; нужна проверка модели/существа/эффекта | — |
| [Bracers of Aeons](https://dota2.fandom.com/wiki/Bracers_of_Aeons) | faceless_void | ti7 (ALL) | — |
| [Bracers of Aeons of the Crimson Witness](https://dota2.fandom.com/wiki/Bracers_of_Aeons_of_the_Crimson_Witness) | faceless_void | ti7 (ALL) | — |
| [Jewel of Aeons](https://dota2.fandom.com/wiki/Jewel_of_Aeons) | faceless_void | aeons (ALL) | — |
| [Viridus Claw](https://dota2.fandom.com/wiki/Viridus_Claw) | faceless_void | viridi_set (ALL) | — |
| [Mace of Aeons](https://dota2.fandom.com/wiki/Mace_of_Aeons) | faceless_void | mace (ALL) | — |
| [B.U.S.T.E.R](https://dota2.fandom.com/wiki/B.U.S.T.E.R) | gyrocopter | ti10 (ALL) | — |
| [B.U.S.T.E.R of the Crimson Witness](https://dota2.fandom.com/wiki/B.U.S.T.E.R_of_the_Crimson_Witness) | gyrocopter | ti10 (ALL) | — |
| [Obsidian Blade Warhelm](https://dota2.fandom.com/wiki/Obsidian_Blade_Warhelm) | huskar | obsidian_helmet (ACT_DOTA_LOADOUT), obsidian_helmet (ACT_DOTA_IDLE), obsidian_helmet (ACT_DOTA_IDLE_RARE) | — |
| [Draca Mane](https://dota2.fandom.com/wiki/Draca_Mane) | huskar | Нет activity; нужна проверка модели/существа/эффекта | — |
| [Golden Draca Mane](https://dota2.fandom.com/wiki/Golden_Draca_Mane) | huskar | Нет activity; нужна проверка модели/существа/эффекта | — |
| [Draca Maw](https://dota2.fandom.com/wiki/Draca_Maw) | huskar | 2021_huskar (ALL) | — |
| [Golden Draca Maw](https://dota2.fandom.com/wiki/Golden_Draca_Maw) | huskar | 2021_huskar (ALL), gold (ALL) | — |
| [Searing Dominator](https://dota2.fandom.com/wiki/Searing_Dominator) | huskar | dominator (ALL) | — |
| [Dark Artistry Cape](https://dota2.fandom.com/wiki/Dark_Artistry_Cape) | invoker | ti6 (ALL) | — |
| [Mask of the Divine Sorrow](https://dota2.fandom.com/wiki/Mask_of_the_Divine_Sorrow) | invoker | divine_sorrow (ALL), divine_sorrow_loadout (ALL), divine_sorrow_sunstrike (ALL), divine_sorrow_loadout_spawn (ALL) | — |
| [Altar Ball](https://dota2.fandom.com/wiki/Altar_Ball) | wisp | Нет activity; нужна проверка модели/существа/эффекта | — |
| [Crimson Edge of the Lost Order](https://dota2.fandom.com/wiki/Crimson_Edge_of_the_Lost_Order) | juggernaut | ti8 (ALL) | — |
| [Golden Edge of the Lost Order](https://dota2.fandom.com/wiki/Golden_Edge_of_the_Lost_Order) | juggernaut | ti8 (ALL) | — |
| [Edge of the Lost Order](https://dota2.fandom.com/wiki/Edge_of_the_Lost_Order) | juggernaut | ti8 (ALL) | — |
| [Fireborn Odachi](https://dota2.fandom.com/wiki/Fireborn_Odachi) | juggernaut | odachi (ALL) | 3 |
| [Akakiryu of a Thousand Faces](https://dota2.fandom.com/wiki/Akakiryu_of_a_Thousand_Faces) | juggernaut | faces_katana (ACT_DOTA_LOADOUT), faces_katana (ACT_DOTA_DIE) | — |
| [Wings of Daybreak](https://dota2.fandom.com/wiki/Wings_of_Daybreak) | keeper_of_the_light | kotl_ti7_immortal (ALL) | — |
| [Aged Spirit of Tide](https://dota2.fandom.com/wiki/Aged_Spirit_of_Tide) | kunkka | agedspirit (ACT_DOTA_IDLE_RARE) | — |
| [Inverse Bayonet](https://dota2.fandom.com/wiki/Inverse_Bayonet) | kunkka | Espada_pistola (ACT_DOTA_IDLE_RARE), Espada_pistola (ACT_DOTA_ATTACK) | — |
| [BladeBiter](https://dota2.fandom.com/wiki/BladeBiter) | kunkka | bladebiter (ACT_DOTA_LOADOUT) | — |
| [Claddish Guard](https://dota2.fandom.com/wiki/Claddish_Guard) | kunkka | armaments_set (ACT_DOTA_CAPTURE), armaments_set (ACT_DOTA_LOADOUT), armaments_set (ACT_DOTA_IDLE_RARE) | — |
| [Leviathan Whale Blade of Eminent Revival](https://dota2.fandom.com/wiki/Leviathan_Whale_Blade_of_Eminent_Revival) | kunkka | Нет activity; нужна проверка модели/существа/эффекта | — |
| [Pegleg of the Cursed Pirate](https://dota2.fandom.com/wiki/Pegleg_of_the_Cursed_Pirate) | kunkka | pegleg (ACT_DOTA_RUN) | — |
| [Prize of the Saltworn Mariner](https://dota2.fandom.com/wiki/Prize_of_the_Saltworn_Mariner) | kunkka | shark_up (ALL) | — |
| [Legacy of the Fallen Legion](https://dota2.fandom.com/wiki/Legacy_of_the_Fallen_Legion) | legion_commander | fallen_legion (ALL) | — |
| [Spirethorn](https://dota2.fandom.com/wiki/Spirethorn) | leshrac | torment (ALL) | — |
| [Tormented Staff of Eminent Revival](https://dota2.fandom.com/wiki/Tormented_Staff_of_Eminent_Revival) | leshrac | torment (ALL) | — |
| [Tormented Staff](https://dota2.fandom.com/wiki/Tormented_Staff) | leshrac | torment (ALL) | — |
| [Dead Winter Soul](https://dota2.fandom.com/wiki/Dead_Winter_Soul) | lich | deadwinter_soul (ALL) | 5 |
| [Golden Profane Union](https://dota2.fandom.com/wiki/Golden_Profane_Union) | life_stealer | back (ALL) | — |
| [Profane Union](https://dota2.fandom.com/wiki/Profane_Union) | life_stealer | back (ALL) | — |
| [Disciple of the Wyrmwrought Flame](https://dota2.fandom.com/wiki/Disciple_of_the_Wyrmwrought_Flame) | lina | ti6 (ALL) | — |
| [Cauldron of Xahryx of Eminent Revival](https://dota2.fandom.com/wiki/Cauldron_of_Xahryx_of_Eminent_Revival) | lone_druid | cauldron (ACT_DOTA_ATTACK) | — |
| [Cauldron of Xahryx](https://dota2.fandom.com/wiki/Cauldron_of_Xahryx) | lone_druid | cauldron (ACT_DOTA_ATTACK) | — |
| [Lucentyr](https://dota2.fandom.com/wiki/Lucentyr) | luna | lucentyr (ACT_DOTA_IDLE_RARE) | — |
| [Moon Griffon](https://dota2.fandom.com/wiki/Moon_Griffon) | mirana | moon_griffon (ALL) | 106 |
| [Ancient Armor Helmet](https://dota2.fandom.com/wiki/Ancient_Armor_Helmet) | morphling | ancient_armor (ACT_DOTA_RUN), ancient_armor (ACT_DOTA_ATTACK) | — |
| [Scythe of Twin Deaths](https://dota2.fandom.com/wiki/Scythe_of_Twin_Deaths) | necrolyte | death_protest (ALL) | 6 |
| [Flaming Scepter of Ancestral Luck](https://dota2.fandom.com/wiki/Flaming_Scepter_of_Ancestral_Luck) | ogre_magi | ancestral_scepter (ACT_DOTA_CAST_ABILITY_2) | — |
| [Gleaming Seal](https://dota2.fandom.com/wiki/Gleaming_Seal) | phantom_assassin | loda (ACT_DOTA_IDLE), loda (ACT_DOTA_RUN), loda (ACT_DOTA_ATTACK), loda (ACT_DOTA_LOADOUT), loda (ACT_DOTA_CAST_ABILITY_3), loda (ACT_DOTA_SPAWN) | — |
| [Age of Attrition - Head](https://dota2.fandom.com/wiki/Age_of_Attrition_-_Head) | primal_beast | pb_2022 (ALL) | — |
| [Age of Attrition - Arms](https://dota2.fandom.com/wiki/Age_of_Attrition_-_Arms) | primal_beast | pb_2022_arms (ACT_DOTA_ATTACK) | — |
| [Compendium Bone Crusher of the Trapper](https://dota2.fandom.com/wiki/Compendium_Bone_Crusher_of_the_Trapper) | pudge | trapper (ALL) | 111 |
| [Pauldron Perch](https://dota2.fandom.com/wiki/Pauldron_Perch) | pudge | ftp_dendi_back (ALL) | 27 |
| [Whalehook](https://dota2.fandom.com/wiki/Whalehook) | pudge | whalehook (ACT_DOTA_LOADOUT), whalehook (ACT_DOTA_TELEPORT_END), whalehook (ACT_DOTA_SPAWN), whalehook (ACT_DOTA_OVERRIDE_ABILITY_1), whalehook (ACT_DOTA_CHANNEL_ABILITY_1) | — |
| [Golden Bloodfeather Feast](https://dota2.fandom.com/wiki/Golden_Bloodfeather_Feast) | queenofpain | ti8 (ALL) | — |
| [Bloodfeather Feast](https://dota2.fandom.com/wiki/Bloodfeather_Feast) | queenofpain | ti8 (ALL) | — |
| [Severing Lash](https://dota2.fandom.com/wiki/Severing_Lash) | razor | ti6 (ALL) | — |
| [Slim Blade of the Tahlin Watch](https://dota2.fandom.com/wiki/Slim_Blade_of_the_Tahlin_Watch) | riki | masquerade (ACT_DOTA_ATTACK), masquerade (ACT_DOTA_IDLE), masquerade (ACT_DOTA_LOADOUT) | — |
| [Conceit of the Wandering Harlequin](https://dota2.fandom.com/wiki/Conceit_of_the_Wandering_Harlequin) | rubick | harlequin (ALL) | — |
| [Arms of Desolation](https://dota2.fandom.com/wiki/Arms_of_Desolation) | nevermore | desolation (ALL) | — |
| [Empyrean](https://dota2.fandom.com/wiki/Empyrean) | skywrath_mage | emp (ACT_DOTA_LOADOUT) | — |
| [Golden Empyrean](https://dota2.fandom.com/wiki/Golden_Empyrean) | skywrath_mage | emp (ACT_DOTA_LOADOUT) | — |
| [Flight of Epiphany](https://dota2.fandom.com/wiki/Flight_of_Epiphany) | skywrath_mage | ti9 (ALL) | — |
| [Golden Flight of Epiphany](https://dota2.fandom.com/wiki/Golden_Flight_of_Epiphany) | skywrath_mage | ti9 (ALL) | — |
| [Crimson Flight of Epiphany](https://dota2.fandom.com/wiki/Crimson_Flight_of_Epiphany) | skywrath_mage | ti9 (ALL) | — |
| [Hydrakan Latch](https://dota2.fandom.com/wiki/Hydrakan_Latch) | slark | latch (ALL) | — |
| [Golden Hydrakan Latch](https://dota2.fandom.com/wiki/Golden_Hydrakan_Latch) | slark | latch (ALL) | — |
| [Silent Ripper](https://dota2.fandom.com/wiki/Silent_Ripper) | slark | silent_ripper (ACT_DOTA_SLARK_POUNCE) | 0 |
| [Instagib OSP](https://dota2.fandom.com/wiki/Instagib_OSP) | sniper | instagib (ACT_DOTA_CAST_ABILITY_4), instagib (ACT_DOTA_CAPTURE) | — |
| [Muh Keen Gun](https://dota2.fandom.com/wiki/Muh_Keen_Gun) | sniper | MGC (ALL) | — |
| [Wolfhound Rifle](https://dota2.fandom.com/wiki/Wolfhound_Rifle) | sniper | wolfhound (ACT_DOTA_LOADOUT), wolfhound (ACT_DOTA_CAPTURE), wolfhound (ACT_DOTA_IDLE_RARE) | — |
| [The Fearmaker](https://dota2.fandom.com/wiki/The_Fearmaker) | sven | fear (ALL) | 25 |
| [Festive Robes of Good Fortune](https://dota2.fandom.com/wiki/Festive_Robes_of_Good_Fortune) | storm_spirit | ss_fortune (ACT_DOTA_CAST_ABILITY_1) | 19 |
| [Vigil Signet](https://dota2.fandom.com/wiki/Vigil_Signet) | sven | sven_shield (ALL) | — |
| [Pachyderm Powderwagon Elephant](https://dota2.fandom.com/wiki/Pachyderm_Powderwagon_Elephant) | techies | TI9 (ALL) | — |
| [Claddish Cudgel](https://dota2.fandom.com/wiki/Claddish_Cudgel) | tidehunter | fishstick (ALL) | 35 |
| [Mecha Boots of Travel Mk III](https://dota2.fandom.com/wiki/Mecha_Boots_of_Travel_Mk_III) | tinker | bot (ALL) | 26 |
| [Stuntwood Sanctuary](https://dota2.fandom.com/wiki/Stuntwood_Sanctuary) | treant | treant_ti7_immortal (ALL) | — |
| [Stuntwood Sanctuary of the Crimson Witness](https://dota2.fandom.com/wiki/Stuntwood_Sanctuary_of_the_Crimson_Witness) | treant | treant_ti7_immortal (ALL) | — |
| [Scree'auk's Talon](https://dota2.fandom.com/wiki/Scree%27auk%27s_Talon) | vengefulspirit | immortal (ACT_DOTA_ATTACK), immortal (ACT_DOTA_CAST_ABILITY_2) | — |
| [Splattering Forcipule](https://dota2.fandom.com/wiki/Splattering_Forcipule) | venomancer | Нет activity; нужна проверка модели/существа/эффекта | — |
| [Hellborn Grasp](https://dota2.fandom.com/wiki/Hellborn_Grasp) | warlock | glory (ALL) | — |
| [Armored Exoskeleton Wings](https://dota2.fandom.com/wiki/Armored_Exoskeleton_Wings) | weaver | stalker_exo (ACT_DOTA_TELEPORT), stalker_exo (ACT_DOTA_CAST_ABILITY_4) | — |
| [Lyralei's Breeze](https://dota2.fandom.com/wiki/Lyralei%27s_Breeze) | windrunner | lyreleis_breeze (ACT_DOTA_ATTACK), lyreleis_breeze (ACT_DOTA_CAST_ABILITY_2), lyreleis_breeze (ACT_DOTA_OVERRIDE_ABILITY_2) | — |
| [Sparrowhawk Bow](https://dota2.fandom.com/wiki/Sparrowhawk_Bow) | windrunner | sparrowhawk_bow (ACT_DOTA_DIE), sparrowhawk_bow (ACT_DOTA_ATTACK), sparrowhawk_bow (ACT_DOTA_IDLE), sparrowhawk_bow (ACT_DOTA_CAST_ABILITY_2), sparrowhawk_bow (ACT_DOTA_OVERRIDE_ABILITY_2), sparrowhawk_bow (ACT_DOTA_IDLE_RARE) | — |
| [Sparrowhawk Cape](https://dota2.fandom.com/wiki/Sparrowhawk_Cape) | windrunner | sparrowhawk_cape (ACT_DOTA_RUN), sparrowhawk_cape (ACT_DOTA_DIE), sparrowhawk_cape (ACT_DOTA_CAST_ABILITY_1), sparrowhawk_cape (ACT_DOTA_IDLE_RARE) | — |
| [Sparrowhawk Hood](https://dota2.fandom.com/wiki/Sparrowhawk_Hood) | windrunner | sparrowhawk_hood (ACT_DOTA_DIE), sparrowhawk_hood (ACT_DOTA_CAST_ABILITY_1), sparrowhawk_hood (ACT_DOTA_RUN), sparrowhawk_hood (ACT_DOTA_IDLE_RARE) | — |
| [Sparrowhawk Quiver](https://dota2.fandom.com/wiki/Sparrowhawk_Quiver) | windrunner | sparrowhawk_quiver (ACT_DOTA_DIE), sparrowhawk_quiver (ACT_DOTA_IDLE), sparrowhawk_quiver (ACT_DOTA_ATTACK), sparrowhawk_quiver (ACT_DOTA_IDLE_RARE) | — |
| [Sparrowhawk Wings](https://dota2.fandom.com/wiki/Sparrowhawk_Wings) | windrunner | sparrowhawk_shoulder (ACT_DOTA_DIE), sparrowhawk_shoulder (ACT_DOTA_RUN), sparrowhawk_shoulder (ACT_DOTA_IDLE_RARE) | — |
| [Sylvan Cascade](https://dota2.fandom.com/wiki/Sylvan_Cascade) | windrunner | windy (ALL) | 32 |
| [Stinger](https://dota2.fandom.com/wiki/Stinger) | windrunner | stinger (ACT_DOTA_ATTACK), stinger (ACT_DOTA_CAST_ABILITY_2), stinger (ACT_DOTA_OVERRIDE_ABILITY_2) | — |
| [Bonkers the Mad](https://dota2.fandom.com/wiki/Bonkers_the_Mad) | witch_doctor | bonkers_the_mad (ALL) | — |
| [Bonkers of Awaleb](https://dota2.fandom.com/wiki/Bonkers_of_Awaleb) | witch_doctor | bonkers_the_mad (ALL), ti8 (ALL) | — |
| [Head of Morbific Provision](https://dota2.fandom.com/wiki/Head_of_Morbific_Provision) | witch_doctor | Нет activity; нужна проверка модели/существа/эффекта | — |
| [Righteous Thunderbolt](https://dota2.fandom.com/wiki/Righteous_Thunderbolt) | zuus | lightning (ALL) | — |

## Отдельная стойка и SDK

В режиме «Сет» выбери героя и включи «Своя стойка». Выбранная стойка добавляется в корзину отдельной строкой. Предмет-источник не добавляется в VPK. «Базовая стойка» отключает автоматические стойки выбранных предметов, сохраняя их правила для остальных действий. Выбор действует отдельно для каждого героя.

SDK: `await client.stances('dazzle')` возвращает проверенные варианты. Для сборки только стойки передай:

```js
const {options} = await client.stances('dazzle');
if (!options.length) throw new Error('No compatible stances');
const selection = {
  mode: 'set',
  selections: [{heroId: 'dazzle', stanceId: options[0].id}]
};
const job = await client.build(selection);
```

Строку с `stanceId` можно объединять с обычными строками предметов и эффектов. Сервер принимает только варианты из своего каталога, а не произвольные имена анимаций. Предпросмотр выбирает доступную idle-анимацию; полноценная игровая проверка переходов, атак и способностей проводится в Dota.
