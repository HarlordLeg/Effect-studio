// Native preview/discovery only need equipment selections. Texture PNGs and
// editor patches stay in local state and travel only with save/build requests.
export function recolorRequest(route,data){
 const pathname=new URL(route,'https://local.invalid').pathname;
 if(!/^\/api\/(?:(?:tester\/studio\/)?(?:preview|preview-view|inspect)|(?:tester\/)?recolor\/inventory)$/.test(pathname)||!Array.isArray(data?.selections))return data;
 return {...data,selections:data.selections.map(({recolor,...selection})=>selection)};
}
