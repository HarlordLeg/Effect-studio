export const notificationReadKey='des.notifications.read.v1';
export function readSequence(storage){try{const n=Number(storage.getItem(notificationReadKey));return Number.isSafeInteger(n)&&n>=0?n:0;}catch{return 0;}}
export function unreadNotifications(items,seen){return items.filter(i=>Number.isSafeInteger(i.sequence)&&i.sequence>seen).length;}
export function markNotificationsRead(storage,sequence){const next=Math.max(readSequence(storage),sequence);try{storage.setItem(notificationReadKey,String(next));}catch{}return next;}
