# Editor: shared set selection and UI fix

Apply this update over `DotaEffectStudio_Admin_Modding_Editor_Kunkka_FIX.zip`. Deploy through the existing workflow, then reload the admin page with Ctrl+F5. No production deployment was performed here.

## Behavior

The editor now mounts the actual `initSetStudio` component used by `sets.html`. Hero search/cards, set picker, slot dialogs, item search, styles, arcana/persona/kinetic choices and animation selection use the same code and preview path. There is no separate hero/item dropdown workflow and no Add item step.

Choose a hero in the catalog. The standard set component previews the base hero and generates a valid default-slot selection even before a cosmetic is selected. Material/particle discovery runs automatically; the first available resource opens. Selecting a set or item updates the preview and resource list. Hero changes reset the editor resource context; a saved old hero does not enter the new preview request. The editor's selection stays independent of the normal cosmetics basket.

`Preview supports one hero at a time` was caused by the old editor sending an empty selections array, which the static preview reported with that generic message. `Add an item` was the separate editor guard. Both manual request paths have been removed. The shared component owns preview payload creation; tests verify nonempty, one-hero requests for a bare hero, sets, item changes and hero changes.

The native resource selector accepts default-slot/null-item rows and the same styles/arcana/persona options as the set catalog. VPK delegation retains selected effects instead of discarding their ids. Source discovery includes the hero/default model resources alongside selected gear and effects. Projects saved by the first editor without slot fields have those slots resolved from the current catalog before opening.

## Design

- Shared hero/set/slot selection on the left and the existing 3D preview in the center.
- A compact inspector on the right: material/particle tabs, search, resource names and editable parameters.
- Common shader parameters appear in grouped controls; the complete typed structure remains in Advanced.
- Color vectors have RGB/alpha fields and the existing color picker. Raw native fields and unsupported shader previews retain the original editor's limitations.
- Project actions are in a dropdown. Technical logs stay collapsed; errors and Bug Report remain visible when needed.
- Private scoped CSS styles all editor controls, avoiding white default browser buttons. Styles load before the editor is shown.
- Responsive layouts and compact slot cards. Public pages receive no editor controls; shared-component hooks are inactive by default.

## Files

- `lib/editor/ui.mjs`, `lib/editor/editor.css`, `lib/editor/selection-state.mjs`: shared catalog integration, lifecycle, inspector, project restoration and layout.
- `lib/editor/routes.mjs`: protected CSS/helper delivery.
- `lib/editor/project-service.mjs`, `lib/editor/build-service.mjs`: canonical set selection support and effects preservation.
- `public/set-studio.mjs`, `docs/set-studio.mjs`: optional host hooks and selection restore methods; ordinary page behavior stays unchanged.
- `public/admin.mjs`: pause/resume the shared editor scene when switching admin tabs.
- `tests/editor.test.mjs`, `tests/editor-selection.test.mjs`: default selection, hero isolation, styles/effects/persona data, legacy project slots, auth and build delegation.

## Verification

Full JavaScript suite: 626 passed, 0 failed. Browser checks used the real shared catalog UI and renderer with controlled resource responses: choose hero with no Add item, choose a set, search/select an item, edit a material and observe a renderer patch, save/undo, switch hero, reopen the saved project, and check desktop/narrow layout. Five preview requests and four discovery requests were inspected; no empty/mixed-hero request and no page errors occurred.

The browser resource data/GLB were fixtures, not the user's installed Dota files or live R2 catalog. This update has not been run on the user's server or in Dota 2. Native format support/known limitations remain those of the previous editor package.

Suggested commit: `fix(admin): reuse set catalog in modding editor and redesign inspector`
