# Dota Effect Studio architecture

**English** · [Русский](ARCHITECTURE.ru.md)

A document for developers: what the project is made of, how a user request turns into a VPK, where the data lives and how changes reach the server. What the site does and how to use it is in [README.md](README.md); embedding on another site is in [SDK.md](SDK.md) and [SDK_GUIDE.md](SDK_GUIDE.md).

## Overview

```
 Browser (public/, the dota-studio.lol site from docs/)
   │  catalogue, basket, 3D preview, recolouring
   ▼
 server.mjs (Node 24, http) ── api.dota-studio.lol via cloudflared
   │
   ├─ lib/game-catalog.mjs ……… hero and item catalogue from the game files
   ├─ lib/preview.mjs ………………… previews: asset-bridge → GLB → cache
   ├─ lib/build.mjs (Builder) … VPK builds in a worker pool (lib/build-pool.mjs)
   │     │
   │     └─ patcher/ (Dota2UnusualPatcher.exe, C#) — editing Source 2 resources
   │
   └─ lib/vpk.mjs ……………………… reading game VPKs (AssetStore) and packing the result
         ▲
 Dota 2: game/dota/pak01_dir.vpk (+ game/core/pak01_dir.vpk), maps/*.vpk
```

The server is a single Node program with no framework. Everything that has to parse and write binary Source 2 resources (models, particles, materials, animations, maps) is done by three native tools on .NET 10 and [ValveResourceFormat](https://github.com/ValveResourceFormat/ValveResourceFormat) 20.1:

| Tool | Project | Purpose |
|---|---|---|
| Patcher | `patcher/Dota2UnusualPatcher.csproj` → `Dota2UnusualPatcher.exe` | Every resource change during a VPK build |
| Asset bridge | `asset-bridge/AssetBridge.csproj` → `DotaAssetBridge.exe` | Exporting models and particles to GLB for the 3D preview |
| Icon bridge | `icon-bridge/IconBridge.csproj` → `DotaIconBridge.exe` | Item and ability icons |

Node runs them as separate processes: it writes the input files and a JSON manifest into a temporary folder `output/<job>/`, starts the tool and reads the result.

## Repository folders

| Path | Contents |
|---|---|
| `server.mjs` | HTTP server: routes, access, serving files |
| `desktop.cjs` | Electron shell for the local application |
| `lib/` | All server logic (about 110 modules, grouped below) |
| `lib/editor/` | Resource editor (manual recolouring of textures and particles) |
| `lib/tester/` | Tester portal: recolouring, the new build engine, resource isolation |
| `lib/hud-creator/` | HUD builder |
| `lib/arcana-templates/` | Descriptions of prepared arcana templates |
| `public/` | Client: pages, catalogue, basket, recolouring, viewer |
| `public/viewer/`, `public/renderer/` | 3D scene: GLB loading, animations, particles |
| `public/recolor/`, `public/tester/` | Recolouring interface (general and tester) |
| `docs/` | Static site for GitHub Pages — a **selective copy** of part of `public/`; never regenerate it wholesale |
| `patcher/` | Patcher sources (C#) |
| `asset-bridge/`, `icon-bridge/` | Export tool sources |
| `vendor/dota-loadout/` | Third-party viewer and its adaptations |
| `tools/` | Preparation, audit, publishing and packaging scripts |
| `tests/` | `*.test.mjs` for `node --test` and 22 C# native regression projects |
| `deploy/` | Installing and updating the server installation (PowerShell) |
| `data/` | Data kept in the repository: `catalog.json`, effect collections |
| `samples/` | Test archives for running without the game |
| `integrations/` | Embedding examples |
| `.github/workflows/` | CI: tests, builds, automatic deployment |

## Server: `server.mjs`

On start it reads `config.json` (or `config.example.json` if there is none), applies `productionBuilderConfig` and creates:

- `Builder` (`lib/build.mjs`) — catalogue and builds;
- `PreviewService` (`lib/preview.mjs`) — model previews;
- `WidgetAuth` (`lib/auth.mjs`) — site keys and limits; `AdminAuth`, `Statistics` (`lib/admin.mjs`); `Notifications`;
- the tester portal (`lib/tester/routes.mjs`), editor services (`lib/editor/`), the static viewer (`lib/static-viewer.mjs`).

Every request first goes through `requestAccess` (`lib/request-access.mjs`): only the local address and the host from `publicBaseUrl` are allowed. Then come the tester portal, the static viewer and the routes.

Main routes:

| Route | Purpose |
|---|---|
| `GET /api/health` | Server readiness (deployment waits on it after a restart) |
| `/api/catalog` | Catalogue of heroes, items and effects |
| `GET /api/cosmetics` | Global cosmetics: wards, couriers, HUD, terrains, weather, music… |
| `GET /api/stances` | A hero's kinetic gems (checked against the model by the patcher) |
| `POST /api/preview`, `/api/preview-view`, `/api/viewer`, `/api/model-metadata` | 3D preview |
| `POST /api/inspect` | Checking a selection without building |
| `POST /api/build` | Queueing a VPK build |
| `GET /api/jobs/<id>` | Build status and download by ticket (`lib/downloads.mjs`) |
| `/api/recolor/…` | Recolouring (`lib/tester/recolor.mjs`) |
| `/api/*-icon` | Item, ability and arcana icons |
| `/api/admin/…` | Admin: cosmetics, sets, notifications, statistics, editor |
| `/api/widget/session` | Embedded widget session |

## Catalogue

`expandGameCatalog` (`lib/game-catalog.mjs`) builds the catalogue from the game files on every start: `scripts/items/items_game.txt`, hero and unit definitions, plus manual additions from `data/catalog.json`. On top of it, modules add what `items_game` does not provide ready-made:

- item styles — `item-styles.mjs`; sets — `hero-sets.mjs`; personas — `personas.mjs`, `persona-build.mjs`;
- native item overrides (`visuals`: particle, model, icon and sound replacements) — `native-overrides.mjs`;
- model merging (an item merged into the hero model) — `model-merge.mjs`;
- kinetic gems and item animations — `kinetic-catalog.mjs`, `hero-activities.mjs`, `activity-corrections.mjs`;
- arcanas — `public-arcanas.mjs`, `expanded-arcanas.mjs`, and per-hero modules (`terrorblade-arcana.mjs`, `techies-arcana.mjs`, `drow-arcana.mjs`, `rubick-arcana.mjs`, `spectre-template.mjs`, `razor-template.mjs`…);
- global cosmetics — `global-cosmetics.mjs`, terrains — `cosmetic-terrain.mjs`, weather — `cosmetic-weather.mjs`, HUD — `cosmetic-hud.mjs`.

Game archives are read by `AssetStore` (`lib/vpk.mjs`): the VPKs from `config.archives` (`game/core/pak01_dir.vpk` next to them is added automatically) and the `assetDirectories` folders. Every read checks the CRC. `store.closure(roots)` walks resource references (the RERL block) and returns all dependencies plus the list of missing files.

## Building a VPK

### Queue

`Builder.create` puts the job into `BuildPool` (`lib/build-pool.mjs`): workers on `worker_threads`, their number is `buildConcurrency` (half the cores by default, at most 4), the queue length is `buildQueueLimit` (64), .NET threads per worker are `buildNativeThreads`. A worker (`lib/build-worker.mjs`) creates its own `Builder` and calls `build()`.

### User selection → choices

`normalizeSelections` (`lib/namespace.mjs`) turns the request into a list of choices `{hero, item, effects, stance?}`. In set mode — up to 1024 rows (`MAX_SET_BUILD_ITEMS`), in effects mode — up to 128 (`MAX_BUILD_ITEMS`). Arcanas, kinetics and personas expand into ordinary choices (`completePublicArcanas`, `completePersonaChoices`, `kineticBuildChoices`…).

### The `Builder.assemble` pipeline

The order of steps in `lib/build.mjs`:

1. **Preparing templates.** Spectre and Razor are built from prepared templates; coloured effects get their own copy of the particle tree (`colored-effects.mjs`).
2. **Checking the patcher** — `--capabilities`: the server refuses to build with an old patcher.
3. **Collecting files for each item.** For each choice, `replacementTarget` (`lib/replacement.mjs`) decides which game path the item model will take (usually the slot's default model path). Then `store.closure` collects the dependencies. Check: every model, particle and snapshot must be found, otherwise the build fails with «Не хватает зависимостей» (missing dependencies). The exception is references the game itself ships without a file (the file was removed in a patch but a game file still points to it): `gameShippedMissing` (`lib/asset-availability.mjs`) finds them. Two items that need different bytes at the same path fail with «Конфликт ресурса между предметами» (resource conflict between items); a native model override made earlier (a weapon changes the model of other items, as in the game) wins regardless of selection order. Kinetic gems resolve their dependencies from the same template sources as the items.
4. **Binding effects to the model** — the patcher in its default mode (`--input/--output`, `--particle`, `--skin`, `--particle-replacements`).
5. **Protection and optimisation.** Breaking particle override cycles (`particle-override-cycles.mjs`), dropping materials the game already has (`pack-optimization.mjs`).
6. **Moving into our own namespace.** Modified copies of shared resources move under `harlord/…` (`namespacePlan`, `harlordPath`) so the mod does not break other items; the patcher's `--relocate` rewrites the references inside the files.
7. **The hero model.** Body skins, mesh groups, model merges (`--merge-models`), item and kinetic animations (`--activity-rules`, `--hero-activities`). Animation rules are taken from the ordinary hero model; if the body is replaced (arcana, persona), only the sequences it actually has stay mandatory.
8. **Hero special cases** — Terrorblade, Techies, Crystal Maiden, Lifestealer, Invoker, Windrunner, Morphling and others: separate `lib/*-runtime.mjs` and `lib/*-arcana.mjs` modules and patcher commands.
9. **Personas, sounds, voices** — `persona-scales`, `persona-voices`, `sound-overrides`.
10. **Tester engine hosts** (`lib/tester/build.mjs`, `--tester-wearable-host`) — only with `testerBuildV1`.
11. **Final check**: closing all roots over the files already collected — «После переноса не найдены ресурсы» (resources not found after relocation) if something got lost.
12. **Global cosmetics, minimap icons, watermark** (`--watermark-models`), packing with `packVpk`.

`build()` writes `pakNN_dir.vpk`; if a terrain or emblem attacks are selected, `finishCosmeticPackage` (`lib/cosmetic-terrain.mjs`) packs everything into a ZIP with `INSTALL.txt` and a separate `maps/dota.vpk`.

### The `legacy` and `new` engines

`productionBuilderConfig` (`lib/production-builder.mjs`) picks the engine: the `DOTA_BUILDER_ENGINE` variable or `builderEngine` in the config, **`new` by default** (`testerBuildV1: true`). The new engine builds items into the hero host model (`lib/tester/`). Reproduce user errors on it; `tools/audit-builder-regressions.mjs` builds every scenario with both engines.

## Patcher

`patcher/Program.cs` parses the arguments and calls the right class. With no command it edits an item model (`--input`, `--output`, `--particle`…). Commands:

| Command | Class / purpose |
|---|---|
| `--capabilities` | Version and list of capabilities (JSON) |
| `--relocate` | `ResourceRelocator` — moving paths and references |
| `--merge-models` | `ModelMerge` — merging items into the hero model |
| `--activity-rules`, `--inspect-activities` | `HeroActivityRules` — the animation table (ASEQ/ANIM) |
| `--hero-activities` | `HeroActivities` — the Skullbasher template and similar |
| `--model-mesh-groups`, `--model-softbody-parts` | Mesh groups, soft-body parts |
| `--item-effect-scope`, `--item-hitbox-scope` | Effects and hitboxes scoped to an item |
| `--suppress-particles` | Disabling particles |
| `--global-cosmetics`, `--hud-cosmetics`, `--hud-creator`, `--minimap-icons` | Cosmetics, HUD, minimap |
| `--map-weather` | `MapWeather` — weather in the map |
| `--cosmetic-shader-rgb` | Cosmetic shader colour |
| `--sound-overrides`, `--index-sound-events`, `--persona-voices` | Sounds and voices |
| `--persona-scale` | Persona scale |
| `--terrorblade-arcana`, `--terrorblade-bindings`, `--techies-body-meshes`, `--cm-arcana-runtime`, `--lifestealer-runtime`, `--healthy-locomotion`, `--morphling-runtime`, `--morphling-fish-channels`, `--windrunner-focusfire` | Hero-specific edits |
| `--tester-wearable-host` | The new engine's host model |
| `--editor-resources`, `--editor-textures` | Resource editor |
| `--watermark-models` | Watermark |

The patcher writes the fixed file; on error it exits with code 1 and the text `[ERROR] Patcher 1.1.0: …`, which the user sees under the build button.

## Preview and the static viewer

`PreviewService` (`lib/preview.mjs`) calls the asset bridge, which exports the model with its particles to GLB; the result is cached in `cache/models`. Viewer metadata — `lib/viewer-metadata.mjs`, serving — `lib/viewer-transfer.mjs`. The client draws the scene in `public/viewer` and `public/renderer` with three.js.

The static viewer (`lib/static-viewer.mjs`, `tools/publish-static-viewer.mjs`) exports previews in advance, uploads them to Cloudflare R2 (`tools/upload-static-r2.py`) and publishes an index, so the site can show models without the server.

## Recolouring and the editor

- Hero and item recolouring — `lib/tester/recolor.mjs` (routes `/api/recolor/`), isolation of shared resources — `lib/tester/recolor-isolation.mjs`, hero targets — `lib/hero-recolor.mjs`.
- Resource editor — `lib/editor/`: projects (`project-service.mjs`), the material and particle pipeline (`resource-pipeline.mjs`), builds (`build-service.mjs`, a queue of up to 16 builds).

## Terrains and weather

- `terrain-standard` — the map from the installed game (`game/dota/maps/dota.vpk`).
- Other terrains are ready-made maps on the server: `data/cosmetic-templates/terrain/<id>/maps/dota.vpk`, where `<id>` is the item number from `items_game` (11171 Spring, 11316 TI6, 11339 TI5 Desert, 11444 Winter, 11476 King's New Journey, 11904 Autumn, 11946 TI7 Reef, 12022 TI8 Emerald, 12289 Summer, 12921 TI9 Overgrown, 21441 TI10). The source is the Dota2PornFx catalogue (the [terrains](https://github.com/h6rd/Dota2PornFx/releases/tag/terrains) release). **After the game updates its map**, download these files again from there and put them in the same folders; the catalogue rereads them on its own (by file size and time).
- If there is no ready-made map, `prepareTerrain` moves the game's `maps/dota_<name>.vpk` map to `maps/dota` with `--relocate` and caches the result in `cache/cosmetic-terrains`.
- Weather (`lib/cosmetic-weather.mjs`, `patcher/MapWeather.cs`) edits `weather_effect` in the `ent_dota_lightinfo` zones of the selected map.

## Server data

The production installation is `D:\DotaEffectStudio`. Of `data/`, git holds only what `deploy/update-server.ps1` covers (`catalog.json`, `effect-collections.json`, `frostbloom.json`). Everything else lives only on the server and is never committed:

| Path | Contents |
|---|---|
| `config.json` | Game paths, port, `publicBaseUrl`, patcher, limits |
| `data/site-keys.json`, `data/admin-auth.json`, `data/session-secret`, `data/tester-whitelist.json` | Keys and access (secrets) |
| `data/statistics.json`, `data/notifications.json` | Statistics and notifications |
| `data/cosmetic-templates/` | Ready-made maps and HUD templates |
| `data/animation-templates/`, `data/arcana-templates/`, `data/model-merge-templates/`, `data/model-fixes/` | Prepared templates for builds |
| `cache/` | Preview, icon, animation and map caches — safe to delete, they are rebuilt |
| `output/` | Temporary build folders; cleaned after delivery |

## Tests

- `npm test` — `node --test tests/*.test.mjs` (about 200 files). Builds are tested with a stub instead of the patcher: the test replaces `run` on `Builder` and checks the manifests and the resulting VPK. Examples: `tests/set-entities.test.mjs`, `tests/game-update-regressions.test.mjs`.
- Native regressions — all `tests/**/*.csproj` (22 projects); `node tools/build-native.mjs patcher` runs them before building the patcher.
- Auditing real builds on the installed game — `node tools/audit-builder-regressions.mjs [--hero <id>] [--case <id>]`: builds the scenarios from `tools/builder-regression-*.mjs` with both engines and checks the dependencies of the finished VPK (`tools/audit-package.mjs`). It does not launch the game.

Passing tests do not prove the mod works in the game: animations, cloth and particles can only be checked by running Dota.

## CI and deployment

On a push to `main`, `.github/workflows/windows-build.yml` runs:

1. **windows** — `npm test`, deploy script checks, C# tests, `build-native.mjs patcher` and `assets` (with native regressions), the server package `DotaEffectStudio-Server-Windows-x64`.
2. **desktop** — the portable application `DotaEffectStudio-Windows-x64`.
3. **deploy** — on the server's self-hosted runner (label `des-server`), if the `DES_AUTO_DEPLOY` variable is `true`: `deploy/update-server.ps1` stops the scheduled task, copies the managed files (`lib`, `public`, `patcher/publish`, `server.mjs`…), starts the server and waits for `/api/health`. Anything not on the list (`config.json`, `data/*` except the catalogue, `cache`) is left alone. The previous version stays in `D:\DotaEffectStudio-deploy\previous`.

The `docs/` site is published by GitHub Pages separately, right after the push.

## Investigating a user's build error

1. Reconstruct the selection: hero, items with styles, arcana, kinetics, effects.
2. Build it with a script using `Builder` from `lib/build.mjs` on the server config, with the `new` engine, calling `heroStances` before the kinetics (as the site does).
3. Find the pipeline step from the error text; patcher errors — by the class and line in the stack trace.
4. Add a test in `tests/` with a patcher stub and check that it fails without the fix.
5. `npm test`; when the patcher changes — `node tools/build-native.mjs patcher`.
