# Full admin set catalog with the new viewer

Apply on top of the admin dota-loadout viewer update and its CI import fix.
The Admin > Catalog of sets tab now opens the same set-studio and shared-basket
components used by the public Sets page. Hero cards/search, set picker, individual
slots and styles, arcanas, particles, animation selection and saved builds use
the ordinary UI. The admin frame injects the new ModelPreview implementation;
public pages retain their original viewer and the default component behavior.

The frame uses an authenticated /api/admin/set-studio/ namespace and the same
catalog/preview/build handlers as the ordinary site. Its short-lived browser
session cookie is HttpOnly and SameSite=Strict; it is verified against the admin
session on every request. It does not authenticate public preview/build routes.
Normal image requests can use this cookie so thumbnails require no token in URLs.

The frame alone permits its own parent to embed it, blob model fetches and the
viewer decoder's WebAssembly. Other pages retain their existing CSP. Static
models are served to this frame through authenticated endpoints from the local
static-viewer cache, avoiding an extra cross-origin GLB fetch. If the local static
model is missing, restore it with the existing export/sync workflow; the endpoint
returns an explicit error rather than exposing another owner's model.

No material or particle editor was added. No workflow/.NET files are changed by
this patch. The existing CI/auto deploy installs the updated public files.

Validation: 588 JS tests pass. A Chromium check against the actual HTTP server
and its CSP used fixture models/catalog data to exercise hero selection, a whole
set, item search, animation switching, basket changes, build-job creation,
authenticated download URL, tab switching and teardown. It did not build a real
VPK or check the visual fidelity of every Dota item.

Suggested commit: Reuse the full set catalog in admin with the new viewer
