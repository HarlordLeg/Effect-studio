export async function testerJson(response){
 const text=await response.text();let value;
 try{value=JSON.parse(text);}catch{const status=response.status;throw Object.assign(Error(status===401?'Сессия истекла. Войдите через Discord.':`Сервер вернул HTML или некорректный ответ (HTTP ${status}). Проверьте доступность сервера и повторите запрос.`),{status});}
 if(!response.ok)throw Object.assign(Error(value?.error??`Ошибка запроса (HTTP ${response.status})`),{status:response.status});return value;
}
