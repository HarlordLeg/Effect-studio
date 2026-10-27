# Item workbench

Apply this patch over the previous Editor Sets UI and Material JSON fixes. Commit all source files in this ZIP with their directory structure. The browser runtime is already rebuilt. No C# changes or dependency installation changes are required for this update. After the normal deployment, reload the admin page with Ctrl+F5.

## Workflow

1. Open Admin → Modding Editor and choose a hero using the shared Sets catalog.
2. Click an equipped or default item card. Its editor opens in a modal occupying most of the window. Use **Заменить** to choose a different item; selecting one also opens its editor.
3. Select **Материалы** or **Частицы**. The viewer retains the original skeleton and attachments but hides the other hero parts. A material shows only the selected item's meshes using that material. A particle shows its item, without the other loadout effects. Resources with no matching visible geometry in the current form are reported explicitly.
4. Click a material's texture button, or use **Текстуры**. Paint with a round brush, sample colors, change size/opacity, zoom, undo/redo strokes, compare with the original, or recolor the complete texture using the existing HSV/tint/mask controls. Changes are stored in the project and applied to supported 3D shader texture slots. Alpha is retained. For technical textures, whole-image recoloring remains disabled; direct RGB painting requires the explicit channel-edit button. PNG/TGA replacement remains available.
5. Close the texture and item windows to see the full hero. Save the project or build the VPK from the top toolbar.

Item inspection uses resources from the focused item, including an unselected default slot. It reuses the loaded scene rather than downloading the hero again. Selection changes invalidate pending resource reads. Admin authentication remains required for editor APIs and project/build access. The public catalog keeps its usual behavior.

## Dependency correction

Editor discovery, particle export and VPK construction follow file resource references. Shader constants such as `F_DETAIL`, `g_tColor`, `g_flSpecularScale`, `time`, and engine shader program references such as `hero.vfx` are not packed as external asset files. Missing real textures, materials, particles and other supported Source 2 resource files still fail the build. The shared game dependency reader outside editor builds is unchanged.

## Verification

- 634 Node tests passed, including item-only discovery, default slot inspection, exact material ownership, brush pixels/alpha, and actual editor VPK packing with synthetic Source 2 resources containing shader symbols and real/missing textures.
- Real browser renderer smoke test with controlled catalog/GLB/native API fixtures: material isolation, item/particle mode, texture brush, undo/redo, reopening texture, project save, full-scene restoration and desktop/narrow layouts. No page errors.
- Browser runtime rebuilt from source. No production deployment or in-game Dota test was performed. Native shader preview remains limited to the renderer's supported fields; the authored VPK is the final game result.
