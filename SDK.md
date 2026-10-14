# SDK: собственный дизайн сайта

Подключите скрипт `https://api.dota-studio.lol/embed.js`. Получите у администратора Dota Effect Studio ключ для точного HTTPS-адреса вашего сайта, например `https://example.com`. Ключ можно использовать в публичном коде страницы: он привязан к вашему домену.

Для начала используйте `custom-design.html`, `custom-design.css` и `custom-design.js`. Вставьте полученный ключ в `SITE_KEY` внутри JS-файла и разместите все три файла на своём HTTPS-сайте. Затем измените оформление под свой дизайн. Открытие HTML через `file://` не поддерживается.

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

Подпись Powered by Harlord со ссылкой https://t.me/harlord_mods встроена в 3D-компонент на сервере. Она отображается автоматически; SDK не предоставляет настройку для её отключения или изменения.

## Язык интерфейса: English / Русский

Готовый интерфейс Dota Effect Studio использует английский по умолчанию. Пользователь может выбрать русский в переключателе; выбор сохраняется в браузере. Названия игровых ресурсов и технические логи могут оставаться в исходном виде.

### Готовый виджет с каталогом и кнопками

Подключите полный интерфейс:

```javascript
const widget = await DotaEffectStudio.mount({
  target: '#studio',
  serverUrl: 'https://api.dota-studio.lol',
  siteKey: 'des_pk_ВАШ_КЛЮЧ',
  height: 1100
});
```

Переключатель English / Русский уже находится внутри виджета. Чтобы принудительно задать начальный язык, добавьте `lang` к адресу созданного iframe:

```javascript
const url = new URL(widget.frame.src);
url.searchParams.set('lang', 'en'); // 'en' или 'ru'
widget.frame.src = url.href;
```

Это перезагружает iframe, поэтому задавайте начальный язык до работы пользователя с редактором. Если вызываете `widget.reload()`, снова задайте параметр `lang`, когда нужно принудительно сохранить язык интеграции.

Для переключателя на своей странице используйте сообщение после загрузки iframe:

```html
<select id="studio-language" aria-label="Language">
  <option value="en">English</option>
  <option value="ru">Русский</option>
</select>
```

```javascript
document.getElementById('studio-language').addEventListener('change', event => {
  const language = event.target.value;
  if (!['en', 'ru'].includes(language)) return;
  widget.frame.contentWindow.postMessage({
    channel: 'des-language',
    language
  }, 'https://api.dota-studio.lol');
});
```

Сообщение меняет подписи без перезагрузки 3D-сцены. Виджет проверяет домен и окно отправителя. Если переключатель расположен внутри iframe, он также работает самостоятельно.

### Собственный дизайн и mountViewer

`mountViewer()` содержит только 3D-сцену. Каталог, кнопки, сообщения и переключатель языка находятся на вашей странице: их перевод реализует владелец сайта. Параметров `language` или метода `viewer.setLanguage()` в текущем SDK нет — добавлять их в вызовы не нужно.

Минимальный пример перевода собственного интерфейса:

```html
<select id="site-language" aria-label="Language">
  <option value="en">English</option>
  <option value="ru">Русский</option>
</select>
<button id="show" data-text="preview">Preview</button>
<button id="build" data-text="build">Build VPK</button>
<p id="status" role="status"></p>
```

```javascript
const messages = {
  en: {
    preview: 'Preview',
    build: 'Build VPK',
    loading: 'Preparing the hero…',
    ready: 'Ready',
    failed: 'Operation failed. Please try again.'
  },
  ru: {
    preview: 'Посмотреть',
    build: 'Собрать VPK',
    loading: 'Готовим героя…',
    ready: 'Готово',
    failed: 'Не удалось выполнить действие. Попробуйте снова.'
  }
};

let language = 'en';
try {
  const saved = localStorage.getItem('my-studio-language');
  if (['en', 'ru'].includes(saved)) language = saved;
} catch {}

const t = key => messages[language][key] ?? key;
let statusKey = null;
function setStatus(key) {
  statusKey = key;
  document.getElementById('status').textContent = t(key);
}
function setLanguage(value) {
  language = value === 'ru' ? 'ru' : 'en';
  document.documentElement.lang = language;
  document.getElementById('site-language').value = language;
  document.querySelectorAll('[data-text]').forEach(element => {
    element.textContent = t(element.dataset.text);
  });
  if (statusKey) document.getElementById('status').textContent = t(statusKey);
  try { localStorage.setItem('my-studio-language', language); } catch {}
}

document.getElementById('site-language').addEventListener('change', event => {
  setLanguage(event.target.value);
});
setLanguage(language);
```

В обработчике просмотра используйте `setStatus('loading')`, после успеха — `setStatus('ready')`, при ошибке — `setStatus('failed')`. Полную ошибку можно записывать в `console.error(error)` для диагностики.

В готовом `custom-design.js` обработчики уже существуют: замените в них русские подписи вызовами своего словаря, а не добавляйте вторую инициализацию SDK или повторные обработчики тех же кнопок.

Переключение языка не меняет `heroId`, `itemId`, `effectId`, пути ресурсов и имя VPK. Названия анимаций — внутренние игровые имена. API не принимает `lang` для перевода каталога и ошибок: текст API не гарантированно локализован. Если нужны переведённые названия предметов, добавьте собственный словарь по стабильным ID и сохраняйте оригинальные ID в запросах.

Подпись **Powered by Harlord** со ссылкой https://t.me/harlord_mods встроена в оба viewer. Она не переводится и не требует добавления в HTML владельца сайта; настройки отключения в SDK нет.
