export const HARLORD_URL='https://t.me/harlord_mods';
export function applyBranding(){
 for(const element of document.querySelectorAll('[data-harlord-credit]')){
  element.textContent='Powered by Harlord';
  element.href=HARLORD_URL;element.target='_blank';element.rel='noopener noreferrer';
 }
}
if(typeof document!=='undefined')applyBranding();
