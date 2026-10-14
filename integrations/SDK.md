# SDK: собственный дизайн сайта

Подключите скрипт https://api.dota-studio.lol/embed.js. Получите у администратора Dota Effect Studio ключ для точного HTTPS-адреса вашего сайта, например https://example.com. Ключ можно использовать в публичном коде страницы: он привязан к вашему домену.

Для начала используйте пример из трёх файлов: custom-design.html, custom-design.css и custom-design.js. Вставьте полученный ключ в SITE_KEY внутри JS-файла и разместите все три файла на своём HTTPS-сайте. Затем измените оформление и элементы интерфейса под свой дизайн. Открытие HTML-файла напрямую с компьютера через file:// не поддерживается.

```javascript
const client = await DotaEffectStudio.connect({
  serverUrl: 'https://api.dota-studio.lol', siteKey: 'des_pk_...'
});
const viewer = await DotaEffectStudio.mountViewer({
  target: '#viewer', client, height: 650,
  onEvent: event => console.log(event)
});
const catalog = await client.catalog();
const result = await viewer.show({heroId, itemId, effectId});
// result.animations, animation, warnings, systems
await viewer.setAnimation(0);
await viewer.setEffectsEnabled(false);
await viewer.replay();
await viewer.clear();
viewer.destroy();
```

`mountViewer` создаёт только 3D iframe, без каталога, кнопок и интерфейса приложения. Внешнее оформление, размеры, каталог, сообщения, анимационные кнопки и сборка полностью принадлежат сайту. CSS сайта не проникает внутрь iframe; фон сцены пока фиксирован. WebGL2 обязателен. WASD/QE работают при фокусе внутри сцены, Shift ускоряет движение, мышь вращает камеру.

`show(selection, {signal, onProgress, timeout})` запускает экспорт, ждёт готовности и подключает модель и эффекты. Одновременный второй show отклоняется: отключайте кнопку на время загрузки. signal прерывает ожидание на клиенте, не серверный экспорт. Для комплекта передайте `selections` вместе с верхними heroId/itemId/effectId первого выбранного предмета; состав сцены одного героя определяется сервером. Цвет courierColor — RGB 0–255.

Сборка: `client.build(selection)` → `client.wait(job.id)` → `client.downloadUrl(job.id)`. Номер `vpkNumber` от 1 до 99. Обновляйте downloadUrl перед скачиванием, если ссылка долго не использовалась. Сессии обновляются автоматически при обращениях SDK. После истечения сессии старые задачи могут быть недоступны — создайте новую.

Сообщения 3D проверяют origin и окно отправителя; страница 3D разрешена только с валидной widget-сессией, CSP ограничивает встраивание доменом ключа. При обновлении сервера активные задачи могут прерваться.

Визуальную проверку моделей и эффектов выполняйте в браузере и игре; предпросмотр не гарантирует точное совпадение со всеми операторами Source 2.
