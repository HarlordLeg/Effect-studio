<div align="center">

# Dota Effect Studio

**Build a hero look, tune effects and colours, download a VPK.**

**English** · [Русский](README.ru.md)

[![Windows build](https://github.com/HarlordLeg/Effect-studio/actions/workflows/windows-build.yml/badge.svg)](https://github.com/HarlordLeg/Effect-studio/actions/workflows/windows-build.yml)
![Platform](https://img.shields.io/badge/platform-Windows%20x64-0078D6)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)

[**Open the site**](https://dota-studio.lol/) · [Report a bug](https://t.me/harlord_mods) · [Issues](https://github.com/HarlordLeg/Effect-studio/issues) · [Architecture](ARCHITECTURE.md)

</div>

---

Dota Effect Studio is a web studio and a local Windows application for making Dota 2 cosmetic mods. Pick items and effects from the catalogue, look at the hero in 3D, recolour what you want and get one ready-to-use VPK. Builds use the resources of the installed game, so everything in the package comes from Dota itself.

> [!NOTE]
> The project is in active development. The 3D preview helps you set up a look, but it is not guaranteed to match the game client exactly. Always check the finished mod in Dota.

## Contents

- [Studio modes](#studio-modes)
- [What you can do](#what-you-can-do)
- [Quick start](#quick-start)
- [Recolouring](#recolouring)
- [Saved builds](#saved-builds)
- [Camera controls](#camera-controls)
- [Local application](#local-application)
- [Development](#development)
- [Project layout](#project-layout)
- [Limitations and bug reports](#limitations-and-bug-reports)
- [Rights to the code and resources](#rights-to-the-code-and-resources)

## Studio modes

The site opens in English; add `?lang=ru` to the address for Russian. The main page is the effects studio; **Set**, **Cosmetics** and **Weather** are switched with the buttons at the top of the page.

| Mode | What it is for |
|---|---|
| **Your effect** (main page) | One hero, one item, your effect: attach supported effects to items and colour them |
| **Set** | A full look: items from different sets, styles, arcanas, personas and kinetic gems for one or several heroes |
| **Cosmetics** | Global cosmetics: wards, couriers, HUD skins, announcers, emblems, music, terrains |
| **Weather** | Weather effects on top of the chosen terrain |

## What you can do

**Look**
- Pick items from different sets and fill one cart for several heroes.
- Use supported arcanas, styles, personas and kinetic gems. Availability depends on the catalogue and on resource compatibility.
- Inspect the hero in 3D with items, effects and the available animations.

**Colour**
- Recolour an item, the hero base, effects, abilities and icons. Each effect can have its own colour.
- Changes show up in 3D right away, with no confirmation step; **Compare with original** shows the difference.

**Build**
- Build a VPK with any name from `pak01_dir.vpk` to `pak99_dir.vpk`.
- A build with a terrain or emblem attacks comes as a ZIP with `INSTALL.txt` and a separate map file.

Features of the tester studio may differ from the main site. Experimental features are published separately from general builder fixes.

## Quick start

1. Open [dota-studio.lol](https://dota-studio.lol/) or the local application and choose a hero.
2. Pick items for the slots you want. A new item replaces the previous one in the same slot.
3. Add effects if needed. To change colours, press **Recolor** under the item; for the body, use the **Hero base** slot.
4. In the **Cart**, choose the **VPK filename** and press **Build VPK**.
5. When the build is ready, press **Download VPK**.
6. Check the result in Dota 2. Keep your original mods elsewhere so you can return to a previous build.

> [!TIP]
> Changing the VPK number changes only the package name, not the paths inside it. If several mods replace the same resource, the result depends on the order in which the packages load.

## Recolouring

In the recolour window choose what to change — **Item**, **Effects**, **Ability** or **Icon** — and then the colour mode:

| Mode | Result |
|---|---|
| **Preserve details** | Changes the colour while keeping the light edges and dark details of the original colour map |
| **Tint** | Multiplies the original colour by the chosen one; dark areas may stay dark |
| **Recolor entire surface** | Colours even very dark areas; the look may differ noticeably from the original |

Effects can be coloured all at once or one by one. **Include child effects** applies the colour to the dependent parts of an effect as well. Some glow comes from materials or particles and is tuned separately; normal maps and technical masks are not ordinary colour textures.

## Saved builds

The **Saved builds** panel above the cart keeps your work in the browser: **Save**, **Save a copy**, **Load** and **Delete**. A loaded build can be changed and built again. Builds are stored locally in this browser, so they do not move to another browser or computer on their own.

## Camera controls

| Control | Action |
|---|---|
| Mouse | Rotate the camera |
| Wheel | Zoom in and out |
| `W` `A` `S` `D` | Move the camera |
| `Q` `E` | Change height |
| `Shift` | Move faster |

## Local application

Official builds are published through [GitHub Actions](https://github.com/HarlordLeg/Effect-studio/actions). The Windows build is distributed as `DotaEffectStudio-Windows-x64`.

The builder needs an installed Dota 2 and access to its game archives:

1. Set the game path with `configure-dota.bat`.
2. Start `start-local.bat` (or `start-desktop.bat` for the desktop window).
3. Open `http://127.0.0.1:8787`.

> [!WARNING]
> Do not add game archives, finished user VPKs, server secrets or private configuration to the repository.

## Development

This section is for the project owner and for developers with permission to work on the code. The terms for using the source are in [LICENSE](LICENSE).

**Requirements:** Windows x64, Node.js 24, .NET SDK 10, an installed Dota 2.

```powershell
npm install
npm run build:viewer
.\build-patcher.bat
.\build-assets.bat
.\configure-dota.bat
npm start
```

The server listens on port `8787` by default. Other useful commands:

| Command | What it does |
|---|---|
| `npm run desktop` | Starts the Electron shell |
| `npm run doctor` | Checks the patcher and inspects the catalogue on the current config |
| `npm run db:import` | Imports the catalogue and statistics JSON into SQLite (`data/integration.sqlite`); `-- --every 60` repeats hourly |
| `npm test` | JavaScript tests (`node --test tests/*.test.mjs`) |
| `node tools/build-native.mjs patcher` | Runs the native C# regressions and builds the patcher |
| `node tools/package-windows.mjs` | Packs a portable folder into `dist/DotaEffectStudio` |

Passing tests do not replace testing the finished mod in the game. No fixed test count is given here: see CI for the current result.

## Project layout

How the server, catalogue, VPK pipeline, patcher, server data, tests and deployment fit together is described in **[ARCHITECTURE.md](ARCHITECTURE.md)**.

| Path | Purpose |
|---|---|
| `server.mjs` | HTTP server |
| `desktop.cjs` | Electron shell |
| `lib/` | Catalogue, resource selection, VPK building, dependency relocation and the API |
| `public/` | Site: catalogue, cart, recolouring and the 3D viewer |
| `patcher/` | Native editing of Source 2 resources (C#) |
| `asset-bridge/`, `icon-bridge/` | Exporting models, effects and icons for the preview |
| `vendor/dota-loadout/` | Third-party viewer code and local adaptations; the original MIT notices are kept |
| `tools/` | Preparation, publishing, building and packaging |
| `tests/` | JavaScript and C# checks |
| `licenses/` | Notices for third-party code, game resources and the former MIT licence |

Embedding the viewer on another site: [SDK.md](SDK.md) and [SDK_GUIDE.md](SDK_GUIDE.md). The project uses **dota-loadout, Three.js and ValveResourceFormat**; the full list of notices is in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Limitations and bug reports

- The browser simulation does not support every particle operator, material or game scenario.
- Complex skeletons, cloth physics, transformations and dependent models may need a dedicated compatibility profile.
- Some effects or models may display incorrectly even when the VPK builds successfully.
- After a Dota 2 update, the exported data, the cache or the patcher may need updating.

If a build fails, the error appears under the **Build VPK** button together with a **Bug report** button. When reporting, send the hero, the exact names of items and styles, and a screenshot or video; for a build error, the full error text; if the problem only shows in the game, the built VPK as well. Do not send tokens, passwords or private configuration.

| Problem | What to check |
|---|---|
| The local page does not open | That the server started, and the console messages |
| Port already in use | Whether a second copy of the application is running |
| Model not found | The game path, that the resource exists, and that the catalogue data is current |
| CRC error | A game update; verify the integrity of the game files if needed |
| The browser and the game look different | Simulation limits, animations, particle bindings and materials |

## Rights to the code and resources

New code of the project's own, published under the current [LICENSE](LICENSE), has restricted terms of use: **all rights reserved**, and reuse in another project requires written permission from HarlordLeg. Using the official site and the official application for personal non-commercial builds is allowed within the LICENSE.

**Versions previously published under MIT do not become closed retroactively.** Rights to previously licensed parts are kept; the former text is in [licenses/Effect-Studio-legacy-MIT.txt](licenses/Effect-Studio-legacy-MIT.txt). Third-party code keeps its own licences. Where a given part comes from is determined by the history and the notices, not only by the current root LICENSE.

These terms apply to the specific protected code. They claim no exclusive rights to the idea of building VPKs, to the file format, or to an independent implementation of a similar tool.

Game models, textures, sounds and particles belong to Valve and other rights holders. Exporting to GLB or packing into a VPK does not change who owns these resources. The application's source licence does not automatically apply to the contents of a generated package.

<div align="center">

Effect Studio is an independent project, not an official Valve product.<br>
For permission to use the project's own code: [Harlord Mods](https://t.me/harlord_mods)

</div>
