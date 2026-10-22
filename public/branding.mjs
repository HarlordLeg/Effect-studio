export const HARLORD_URL='https://t.me/harlord_mods';
export function applyBranding(){
 const header=document.querySelector?.('header');
 if(header&&!header.querySelector('[data-harlord-telegram]')){const link=document.createElement('a');link.dataset.harlordTelegram='';link.className='header-telegram';link.href=HARLORD_URL;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label','Telegram · Harlord Mods');link.title='Telegram · Harlord Mods';link.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.5 3.6 18.2 20c-.2 1.2-.9 1.5-1.9.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L5.5 13.5.6 12c-1.1-.3-1.1-1.1.2-1.6L20 3c.9-.3 1.7.2 1.5.6Z"/></svg><span>Telegram</span>';header.insertBefore(link,header.querySelector('#language'));}

 for(const element of document.querySelectorAll('[data-harlord-credit]')){
  element.textContent='Powered by Harlord';
  element.href=HARLORD_URL;element.target='_blank';element.rel='noopener noreferrer';
 }
}
if(typeof document!=='undefined')applyBranding();
