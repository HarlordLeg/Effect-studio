# Viewer migration: dota-loadout 0.1.0

This update adds a separate admin-only preview runtime with a bundled, locally adapted
MIT version of dota-loadout. The signed-in admin panel has a Catalog of sets tab using the new runtime.
The main app, public set preview, SDK and docs/ Pages frontend keep their current viewer. Models and effects continue to come from the
configured Effect Studio endpoints/static assets. No upstream hero CDN is used.

No public page imports the new runtime. Admin preview requests and GLB parts
use authenticated, owner-scoped admin routes. This migration adds no material editor, particle editor, import,
export or save controls. SceneDocument is an internal data interface for the
future Mod Maker; no editing or persistence endpoint is introduced.

## Build and deployment

CI now runs npm ci, npm run build:viewer, JS tests and native metadata tests
before packaging. The portable application includes the generated runtime.
The existing auto deploy handles installation/restart. Manual build-patcher.bat
or build-assets.bat steps are not required when deploying that CI artifact.

For local source builds: npm ci, then npm run build:viewer. Rebuild after editing
public/viewer/ or vendor/dota-loadout/src/. Commit the generated public/viewer/
runtime and licenses together with source changes.

## Existing exported models

Asset bridge adds Source attachment names, influence bones, offsets, rotations
and weights under GLB extras.dotaStudio. Binary geometry and animations remain
unchanged. The local preview cache has a new version so future model requests
receive fresh exports.

Existing static/R2 GLBs do not acquire metadata merely from a server restart.
Re-export them with the updated bridge and publish/sync the resulting static
assets using the existing publishing workflow. Start with:

    node tools/publish-static-viewer.mjs --hero spectre

For a complete refresh run the publisher without --hero and without --missing.
Do not use --missing for this migration: it intentionally retains old models.
Existing GLBs remain viewable; precise named particle attachments require the
refreshed files. Geometry-only exports get a neutral fallback material.

## Validation and limits

JS tests cover GLB preservation, material isolation, particle/child reference
namespacing, texture animation conversion, snapshot skin weights, colors,
ghost materials, resource cleanup and scene patch validation. The native test
checks GLB chunk sizes and retention of binary data, animations and extras.

A headless Chromium smoke check loaded the demo and an actual geometry export
of Spectre, installed a sprite effect and checked for browser errors and extra
UI controls. Real Spectre attachment extraction produced four attachments;
binary chunks remained identical after metadata insertion. The supplied debug
model has no textures, so this does not establish visual parity for every hero,
skin or effect. Operators unsupported by the pinned upstream library are
reported in preview warnings; this update does not claim support for all Dota
particle operators or shader features.

Suggested commit: Add dota-loadout viewer to admin set catalog
