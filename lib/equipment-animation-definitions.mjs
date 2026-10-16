// Reviewed item animation rules and global ability effects from items_game.
export const equipmentAnimationDefinitions=[
 {
  "id": "animation-mage-slayer-main",
  "hero": "antimage",
  "name": "Glaive of the Mage Slayer",
  "kind": "animation",
  "sources": [
   {
    "itemId": "4654",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_ATTACK",
      "modifier": "slasher_weapon"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE_RARE",
      "modifier": "slasher_weapon"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_DIE",
      "modifier": "slasher_weapon"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_VICTORY",
      "modifier": "slasher_weapon"
     },
     "asset_modifier4": {
      "type": "activity",
      "asset": "ACT_DOTA_LOADOUT",
      "modifier": "slasher_weapon"
     },
     "asset_modifier5": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "slasher_weapon"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Glaive_of_the_Mage_Slayer",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием.",
   "Атаки и смерть добавляют варианты к базовым анимациям, а не заменяют все стандартные варианты."
  ]
 },
 {
  "id": "animation-mage-slayer-offhand",
  "hero": "antimage",
  "name": "Glaive of the Mage Slayer — Off-Hand",
  "kind": "animation",
  "sources": [
   {
    "itemId": "4322",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_ATTACK",
      "modifier": "slasher_offhand"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE_RARE",
      "modifier": "slasher_offhand"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_DIE",
      "modifier": "slasher_offhand"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_VICTORY",
      "modifier": "slasher_offhand"
     },
     "asset_modifier4": {
      "type": "activity",
      "asset": "ACT_DOTA_LOADOUT",
      "modifier": "slasher_offhand"
     },
     "asset_modifier5": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "slasher_offhand"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Glaive_of_the_Mage_Slayer_-_Off-Hand",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием.",
   "Атаки и смерть добавляют варианты к базовым анимациям, а не заменяют все стандартные варианты."
  ]
 },
 {
  "id": "animation-mage-slayer-set",
  "hero": "antimage",
  "name": "The Mage Slayer’s Set",
  "kind": "animation",
  "sources": [
   {
    "itemId": "4654",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_ATTACK",
      "modifier": "slasher_weapon"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE_RARE",
      "modifier": "slasher_weapon"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_DIE",
      "modifier": "slasher_weapon"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_VICTORY",
      "modifier": "slasher_weapon"
     },
     "asset_modifier4": {
      "type": "activity",
      "asset": "ACT_DOTA_LOADOUT",
      "modifier": "slasher_weapon"
     },
     "asset_modifier5": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "slasher_weapon"
     }
    }
   },
   {
    "itemId": "4322",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_ATTACK",
      "modifier": "slasher_offhand"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE_RARE",
      "modifier": "slasher_offhand"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_DIE",
      "modifier": "slasher_offhand"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_VICTORY",
      "modifier": "slasher_offhand"
     },
     "asset_modifier4": {
      "type": "activity",
      "asset": "ACT_DOTA_LOADOUT",
      "modifier": "slasher_offhand"
     },
     "asset_modifier5": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "slasher_offhand"
     }
    }
   },
   {
    "itemId": "4476",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE_RARE",
      "modifier": "slasher_chest"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_VICTORY",
      "modifier": "slasher_chest"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_LOADOUT",
      "modifier": "slasher_chest"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_DIE",
      "modifier": "slasher_chest"
     },
     "asset_modifier4": {
      "type": "activity",
      "asset": "ACT_DOTA_CAST_ABILITY_2",
      "modifier": "slasher_chest"
     },
     "asset_modifier5": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "slasher_chest"
     }
    }
   },
   {
    "itemId": "4651",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE_RARE",
      "modifier": "slasher_shoulder"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_DIE",
      "modifier": "slasher_shoulder"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_VICTORY",
      "modifier": "slasher_shoulder"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_LOADOUT",
      "modifier": "slasher_shoulder"
     },
     "asset_modifier4": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "slasher_shoulder"
     }
    }
   },
   {
    "itemId": "4652",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE_RARE",
      "modifier": "slasher_arms"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_DIE",
      "modifier": "slasher_arms"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_VICTORY",
      "modifier": "slasher_arms"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_LOADOUT",
      "modifier": "slasher_arms"
     },
     "asset_modifier4": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "slasher_arms"
     }
    }
   },
   {
    "itemId": "4653",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE_RARE",
      "modifier": "slasher_belt"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_DIE",
      "modifier": "slasher_belt"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_VICTORY",
      "modifier": "slasher_belt"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_LOADOUT",
      "modifier": "slasher_belt"
     },
     "asset_modifier4": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "slasher_belt"
     }
    }
   },
   {
    "itemId": "4655",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE_RARE",
      "modifier": "slasher_mask"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_DIE",
      "modifier": "slasher_mask"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_VICTORY",
      "modifier": "slasher_mask"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_CAST_ABILITY_4",
      "modifier": "slasher_mask"
     },
     "asset_modifier4": {
      "type": "activity",
      "asset": "ACT_DOTA_LOADOUT",
      "modifier": "slasher_mask"
     },
     "asset_modifier5": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "slasher_mask"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/The_Mage_Slayer's_Set",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием.",
   "Атаки и смерть добавляют варианты к базовым анимациям, а не заменяют все стандартные варианты."
  ]
 },
 {
  "id": "animation-pegleg",
  "hero": "kunkka",
  "name": "Pegleg of the Cursed Pirate",
  "kind": "animation",
  "sources": [
   {
    "itemId": "4011",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_RUN",
      "modifier": "pegleg"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Pegleg_of_the_Cursed_Pirate",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием."
  ]
 },
 {
  "id": "animation-mace-chosen",
  "hero": "abaddon",
  "name": "Mace of the Chosen",
  "kind": "animation",
  "sources": [
   {
    "itemId": "5168",
    "fallback": {
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_ATTACK",
      "modifier": "mace"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_IDLE",
      "modifier": "mace"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_RUN",
      "modifier": "mace"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Mace_of_the_Chosen",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием."
  ]
 },
 {
  "id": "animation-lyralei-breeze",
  "hero": "windrunner",
  "name": "Lyralei’s Breeze",
  "kind": "animation",
  "sources": [
   {
    "itemId": "4454",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ACT_DOTA_ATTACK",
      "modifier": "lyreleis_breeze"
     },
     "asset_modifier1": {
      "type": "activity",
      "asset": "ACT_DOTA_CAST_ABILITY_2",
      "modifier": "lyreleis_breeze"
     },
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_OVERRIDE_ABILITY_2",
      "modifier": "lyreleis_breeze"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Lyralei's_Breeze",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием."
  ]
 },
 {
  "id": "animation-screeauk-talon",
  "hero": "vengefulspirit",
  "name": "Scree’auk’s Talon",
  "kind": "animation",
  "sources": [
   {
    "itemId": "5344",
    "fallback": {
     "asset_modifier2": {
      "type": "activity",
      "asset": "ACT_DOTA_ATTACK",
      "modifier": "immortal"
     },
     "asset_modifier3": {
      "type": "activity",
      "asset": "ACT_DOTA_CAST_ABILITY_2",
      "modifier": "immortal"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Scree'auk's_Talon",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием."
  ]
 },
 {
  "id": "animation-tormented-staff",
  "hero": "leshrac",
  "name": "Tormented Staff",
  "kind": "animation",
  "sources": [
   {
    "itemId": "8612",
    "fallback": {
     "asset_modifier0": {
      "type": "activity",
      "asset": "ALL",
      "modifier": "torment"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Tormented_Staff",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием."
  ]
 },
 {
  "id": "animation-crystal-dryad",
  "hero": "tiny",
  "name": "Crystal Dryad",
  "kind": "animation",
  "sources": [
   {
    "itemId": "6786",
    "fallback": {
     "asset_modifier2": {
      "type": "activity",
      "asset": "ALL",
      "modifier": "dryad_tree"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Crystal_Dryad",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "Доступность зависит от таблицы анимаций установленной модели Tiny. Неподдерживаемая форма не будет применяться молча.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием."
  ]
 },
 {
  "id": "animation-colossal-terrorpin",
  "hero": "tiny",
  "name": "Colossal Terrorpin",
  "kind": "animation",
  "sources": [
   {
    "itemId": "28280",
    "fallback": {
     "asset_modifier": {
      "type": "activity",
      "asset": "ALL",
      "modifier": "palm"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Colossal_Terrorpin",
  "notes": [
   "Применяются только подтверждённые анимации предмета. Его модель и собственные частицы оружия не добавляются.",
   "Доступность зависит от таблицы анимаций установленной модели Tiny. Неподдерживаемая форма не будет применяться молча.",
   "На превью может быть показан сам предмет и его эффекты. Выбор применяет только перечисленные анимации; хват может отличаться с другим оружием."
  ]
 },
 {
  "id": "animation-kantusa",
  "hero": "juggernaut",
  "name": "Kantusa the Script Sword",
  "kind": "effect",
  "sources": [
   {
    "itemId": "4101",
    "fallback": {
     "asset_modifier1": {
      "type": "particle",
      "asset": "particles/units/heroes/hero_juggernaut/juggernaut_blade_fury.vpcf",
      "modifier": "particles/econ/items/juggernaut/jugg_sword_script/juggernaut_blade_fury_script_new.vpcf"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Kantusa_the_Script_Sword",
  "notes": [
   "Применяются только подтверждённые эффекты способностей и иконки предмета. Его модель и собственные частицы оружия не добавляются."
  ]
 },
 {
  "id": "animation-sword-colossus",
  "hero": "tiny",
  "name": "Sword of the Colossus",
  "kind": "effect",
  "sources": [
   {
    "itemId": "13541",
    "fallback": {
     "asset_modifier__repeat5": {
      "type": "particle",
      "asset": "particles/units/heroes/hero_tiny/tiny_scepter_empty.vpcf",
      "modifier": "particles/econ/items/tiny/tiny_prestige/tiny_prestige_tree_ambient.vpcf",
      "apply_when_equipped_in_ability_effects_slot": "3"
     },
     "asset_modifier__repeat7": {
      "type": "particle",
      "asset": "particles/units/heroes/hero_tiny/tiny_tree_linear_proj.vpcf",
      "modifier": "particles/econ/items/tiny/tiny_prestige/tiny_prestige_tree_linear_proj.vpcf",
      "apply_when_equipped_in_ability_effects_slot": "3"
     },
     "asset_modifier__repeat8": {
      "type": "particle",
      "asset": "particles/units/heroes/hero_tiny/tiny_craggy_cleave.vpcf",
      "modifier": "particles/econ/items/tiny/tiny_prestige/tiny_prestige_tree_melee_hit.vpcf",
      "apply_when_equipped_in_ability_effects_slot": "3"
     },
     "asset_modifier__repeat9": {
      "type": "particle",
      "asset": "particles/units/heroes/hero_tiny/tiny_tree_proj.vpcf",
      "modifier": "particles/econ/items/tiny/tiny_prestige/tiny_prestige_tree_proj.vpcf",
      "apply_when_equipped_in_ability_effects_slot": "3"
     },
     "asset_modifier__repeat11": {
      "type": "ability_icon",
      "asset": "tiny_craggy_exterior",
      "modifier": "tiny/ti9_immortal/tiny_tree_grab_immortal",
      "apply_when_equipped_in_ability_effects_slot": "3"
     },
     "asset_modifier__repeat12": {
      "type": "ability_icon",
      "asset": "tiny_toss_tree",
      "modifier": "tiny/ti9_immortal/tiny_toss_tree_immortal",
      "apply_when_equipped_in_ability_effects_slot": "3"
     },
     "asset_modifier__repeat13": {
      "type": "ability_icon",
      "asset": "tiny_tree_channel",
      "modifier": "tiny/ti9_immortal/tiny_tree_channel_immortal",
      "apply_when_equipped_in_ability_effects_slot": "3"
     },
     "asset_modifier__repeat14": {
      "type": "ability_icon",
      "asset": "tiny_tree_grab",
      "modifier": "tiny/ti9_immortal/tiny_tree_grab_immortal",
      "apply_when_equipped_in_ability_effects_slot": "3"
     }
    }
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Sword_of_the_Colossus",
  "notes": [
   "Применяются только подтверждённые эффекты способностей и иконки предмета. Его модель и собственные частицы оружия не добавляются."
  ]
 },
 {
  "id": "animation-black-death",
  "hero": "pudge",
  "name": "Chains of the Black Death",
  "kind": "effect",
  "sources": [
   {
    "itemId": "6293",
    "fallback": {
     "asset_modifier0": {
      "type": "ability_icon",
      "asset": "pudge_meat_hook",
      "modifier": "blackdeath_hookicon",
      "apply_when_equipped_in_ability_effects_slot": "1"
     },
     "asset_modifier1": {
      "type": "ability_icon",
      "asset": "pudge_rot",
      "modifier": "blackdeath_roticon",
      "apply_when_equipped_in_ability_effects_slot": "2"
     },
     "asset_modifier2": {
      "type": "ability_icon",
      "asset": "pudge_flesh_heap",
      "modifier": "blackdeath_fleshheapicon",
      "apply_when_equipped_in_ability_effects_slot": "3"
     },
     "asset_modifier3": {
      "type": "ability_icon",
      "asset": "pudge_dismember",
      "modifier": "blackdeath_dismembericon",
      "apply_when_equipped_in_ability_effects_slot": "4"
     },
     "asset_modifier4": {
      "type": "particle",
      "asset": "particles/units/heroes/hero_pudge/pudge_rot.vpcf",
      "modifier": "particles/econ/items/pudge/pudge_tassles_of_black_death/pudge_black_death_rot.vpcf",
      "apply_when_equipped_in_ability_effects_slot": "2"
     },
     "asset_modifier5": {
      "type": "particle",
      "asset": "particles/units/heroes/hero_pudge/pudge_rot_recipient.vpcf",
      "modifier": "particles/econ/items/pudge/pudge_tassles_of_black_death/pudge_black_death_rot_recipient.vpcf",
      "apply_when_equipped_in_ability_effects_slot": "2"
     }
    }
   },
   {
    "itemId": "6294",
    "fallback": {}
   },
   {
    "itemId": "6295",
    "fallback": {}
   },
   {
    "itemId": "6296",
    "fallback": {}
   },
   {
    "itemId": "6297",
    "fallback": {}
   },
   {
    "itemId": "6298",
    "fallback": {}
   },
   {
    "itemId": "6299",
    "fallback": {}
   }
  ],
  "wiki": "https://dota2.fandom.com/wiki/Chains_of_the_Black_Death",
  "notes": [
   "Применяются только подтверждённые эффекты способностей и иконки предмета. Его модель и собственные частицы оружия не добавляются."
  ]
 }
];
