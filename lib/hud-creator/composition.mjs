// Explicit file-backed components verified against the supplied compiled Dota layouts.
// Scene, movie, avatar rendering and C++ controllers are not inferred from filenames.
export const COMPONENT_LAYOUTS=Object.freeze({
 "DOTADashboardBackgroundManager": "panorama/layout/dashboard_background_manager.vxml_c",
 "DOTAPlay": "panorama/layout/play.vxml_c",
 "DOTACustomLobby": "panorama/layout/custom_lobby.vxml_c",
 "DOTAFriendMenu": "panorama/layout/friend_menu.vxml_c",
 "DOTAParty": "panorama/layout/party.vxml_c",
 "DOTACoachingButton": "panorama/layout/coaching_button.vxml_c",
 "DOTAPlusMenu": "panorama/layout/plus/plus_menu.vxml_c",
 "DOTANotificationsMenu": "panorama/layout/notifications_menu.vxml_c",
 "DOTARecentArmoryItemsMenu": "panorama/layout/recent_armory_items_menu.vxml_c",
 "DOTAShardsMenu": "panorama/layout/shards_menu.vxml_c",
 "DOTAShardsButton": "panorama/layout/shards_button.vxml_c",
 "DOTAPlusButton": "panorama/layout/plus/plus_button.vxml_c",
 "DOTAChat": "panorama/layout/chat.vxml_c",
 "DOTACoachingMenu": "panorama/layout/coaching_menu.vxml_c",
 "DOTAHelpTipsManager": "panorama/layout/help_tips_manager.vxml_c",
 "DOTAAntiAddictionBadge": "panorama/layout/anti_addiction_badge.vxml_c",
 "DOTAFrontpageContents": "panorama/layout/frontpage_contents.vxml_c",
 "DOTAAvatarImage": "panorama/layout/avatar_image.vxml_c",
 "DOTALobbyBrowser": "panorama/layout/lobby_browser.vxml_c",
 "DOTALobby": "panorama/layout/lobby.vxml_c",
 "DOTAWeekendTourneySetup": "panorama/layout/weekendtourney_setup.vxml_c",
 "DOTABattleCupVictoryIcon": "panorama/layout/battle_cup_victory_icon.vxml_c",
 "DOTAMiniShowcase": "panorama/layout/showcase/mini_showcase.vxml_c",
 "DOTARecentTreasures": "panorama/layout/recent_treasures.vxml_c",
 "DOTAGroupMemberSlot": "panorama/layout/group_member_slot.vxml_c",
 "DOTAPlusWeeklyChallenge": "panorama/layout/plus/plus_weekly_challenge.vxml_c",
 "DOTAChatAutocomplete": "panorama/layout/chat_autocomplete.vxml_c",
 "DOTAEmoticonPicker": "panorama/layout/emoticon_picker.vxml_c",
 "DOTAFrontpageCellDarkCarnival": "panorama/layout/banners/front_page_cell_dark_carnival.vxml_c",
 "DOTALobbyPlayerRow": "panorama/layout/lobby_player_row.vxml_c",
 "DOTAShowcaseContents": "panorama/layout/showcase/showcase_contents.vxml_c",
 "DOTAShowcaseDecoration": "panorama/layout/showcase_decoration.vxml_c",
 "DOTATopBar": "panorama/layout/hud/dota_hud_top_bar.vxml_c",
 "DOTAHUDShop": "panorama/layout/hud/dota_hud_shop.vxml_c",
 "DOTAStatBranch": "panorama/layout/hud/dota_hud_stat_branch.vxml_c",
 "DOTAAbilityDetailsUICard": "panorama/layout/hud/dota_hud_ability_details_ui_card.vxml_c",
 "DOTAXP": "panorama/layout/hud/dota_hud_xp.vxml_c",
 "DOTAStatsRegion": "panorama/layout/hud/dota_hud_stats_region.vxml_c",
 "DOTAHUDStrAgiInt": "panorama/layout/hud/dota_hud_str_agi_int.vxml_c",
 "DOTAUnitName": "panorama/layout/hud/dota_hud_unit_name.vxml_c",
 "DOTALevelUpButton": "panorama/layout/hud/dota_hud_level_up_button.vxml_c",
 "DOTAHealthMana": "panorama/layout/hud/dota_hud_health_mana.vxml_c",
 "DOTAHudTalentDisplay": "panorama/layout/hud/dota_hud_talentdisplay.vxml_c",
 "DOTAInnateDisplay": "panorama/layout/hud/dota_hud_innate_display.vxml_c",
 "DOTAAbilityList": "panorama/layout/hud/dota_hud_ability_list.vxml_c",
 "DOTAAghsStatusDisplay": "panorama/layout/hud/dota_hud_aghs_status_display.vxml_c",
 "DOTAInventory": "panorama/layout/hud/dota_hud_inventory.vxml_c",
 "DOTAAbilityPanel": "panorama/layout/hud/dota_hud_ability_panel.vxml_c",
 "DOTAScoreboard": "panorama/layout/hud/dota_hud_scoreboard.vxml_c",
 "DOTAHUDItemBuild": "panorama/layout/hud/dota_hud_item_build.vxml_c",
 "DOTAHUDShopPinnedItems": "panorama/layout/hud/dota_hud_shop_pinned_items.vxml_c",
 "DOTAHUDShopSearchResults": "panorama/layout/hud/dota_hud_shop_search_results.vxml_c",
 "DOTAScoreboardCoaches": "panorama/layout/hud/dota_hud_scoreboard_coaches.vxml_c"
});
export const NATIVE_SCENE_TYPES=new Set(['DOTAScenePanel','DOTAParticleScenePanel','Movie','MoviePanel','DOTAMinimap','DOTAHeroModelOverlay']);
export function componentLayout(kind){return COMPONENT_LAYOUTS[kind]??null;}
export const CLOSED_MENU_IDS=new Set(['CustomLobby','PlusMenu','NotificationsMenu','RecentArmoryItemsMenu','ShardsMenu','CoachingMenu','CoachingMenuContainer','PartySearch','HelpTipsManager','ChatAutocompletePanel','ChatEmoticonPicker','ChatDialogVariablePanel','ChatMessageTempLabel','RoleTableAvatar0','RoleTableAvatar1','RoleTableAvatar2','RoleTableAvatar3','RoleTableAvatar4','Lobby','LobbyBrowser','WeekendTourneySetup']);
export const IDLE_PLAY_IDS=new Set(['RankedRolesTableSlideOut','FXSearching','AbovePlayButtonStack','SafeLeaveButton','AbandonButton','DisconnectButton','LeaveQueueButton','ReconnectButton','ReturnToGameButton','PlayDisabledLocalMods','DeniedPlayButton','JoinPlaytestButton','LeaverConsequences','LeaverConsequences_Warning','Searching','ExtraReturnToWeekendTourneyButton']);
export const IDLE_HUD_IDS=new Set(['InvokerSpellCard','RingmasterSouvenirCard','KezWeaponCard','LargoSongCard','AbilityDetailsUICard','QueryUnit','PreGame','GuideBrowser','PausedInfo','KillGraph','ChatWheel','PingWheel','CoachingControls','spectator_game_stats','SpectatorGraph','spectator_quickstats','spectator_options','spectator_overwatch','ScoreboardCoaches','overlaymap_container','HudChat','GameEndContainer','OrdersContainer']);
export const TRANSIENT_CONTROLS=new Set(['DOTATooltipManager','DOTAContextMenuManager','DOTAHelpTipsManager','DOTADashboardPopupManager','PopupManager','ToastManager']);
export function previewVisibility({scene,view='base',id,kind}){if(TRANSIENT_CONTROLS.has(kind))return false;if(kind==='DOTAAntiAddictionBadge')return false;if(['ChatAutocompletePanel','ChatEmoticonPicker','ChatDialogVariablePanel','ChatMessageTempLabel'].includes(id))return false;if(scene==='menu'){if(CLOSED_MENU_IDS.has(id)||IDLE_PLAY_IDS.has(id))return false;if(id==='PlaySlideOut'||id==='CloseButton')return view==='play';if(id==='ChatAutocompletePanel'||id==='ChatEmoticonPicker')return false;}else if(scene==='hud'&&IDLE_HUD_IDS.has(id))return false;return null;}

// These are sibling hosts in dashboard.vxml: native events remain above custom backgrounds.
export const MENU_LAYER_ORDER=Object.freeze({DashboardBackgroundManager:0,DashboardBackgroundStatus:10,DashboardForeground:20});
export function menuLayer(id){return MENU_LAYER_ORDER[id]??null;}
