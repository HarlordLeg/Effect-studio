export function notificationContent(item,language='en'){
 const key=String(language).toLowerCase().startsWith('ru')?'ru':'en';
 const valid=v=>v&&typeof v.title==='string'&&v.title.trim()&&typeof v.body==='string'&&v.body.trim();
 const text=[item.translations?.[key],item.translations?.en,item.translations?.ru].find(valid);
 return text?{title:text.title,body:text.body}:{title:item.title??'',body:item.body??''};
}
