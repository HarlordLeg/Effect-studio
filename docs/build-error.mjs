// The message and the link are separate boxes: an inline .secondary link
// (12px padding) broke across lines in the narrow cart and covered the error.
export function showBuildError(target,error){const text=document.createElement('span');text.className='build-error-text';text.textContent=error?.message??String(error);const link=document.createElement('a');link.href='https://t.me/harlord_mods';link.target='_blank';link.rel='noopener noreferrer';link.className='secondary bug-report';link.textContent='Bug report';target.replaceChildren(text,link);}
