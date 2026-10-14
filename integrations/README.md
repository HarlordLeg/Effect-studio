# Dota Effect Studio: виджет и API

Интеграция позволяет добавить выбор героев, вещей, эффектов, 3D-просмотр и сборку VPK на другой сайт. Обработка ресурсов выполняется на сервере владельца Dota Effect Studio. На сайте посетителя Dota 2 устанавливать не нужно.

## 1. Выдать ключ сайту

На ПК, где запущен сервер:

```powershell
cd D:\DotaEffectStudio
.\runtime\node.exe .\tools\site-key.mjs add https://example.com 3000
```

Команда создаёт ключ `des_pk_…`, разрешает origin `https://example.com` и задаёт лимит 3000 запросов на предпросмотр/сборку в час. Лимит общий для интеграции. Последний аргумент необязателен; по умолчанию — 300.

Для `www.example.com` нужен соответствующий origin. Если один ключ должен обслуживать несколько origins, добавь их в его массив `origins` в серверном `data/site-keys.json`. В origin не указываются страницы и подпапки.

Для отключения интеграции:

```powershell
.\runtime\node.exe .\tools\site-key.mjs list
.\runtime\node.exe .\tools\site-key.mjs disable SITE_ID
```

Сайтовый ключ размещается в HTML и является публичным. Проверка origin ограничивает браузерную интеграцию, но не заменяет защиту от произвольных HTTP-клиентов. Серверные секреты и пароль администратора остаются на ПК.

## 2. Встроить готовый редактор

Создатель сайта добавляет два элемента:

```html
<div id="dota-studio"></div>
<script
  src="https://api.example.com/embed.js"
  data-key="des_pk_ВАШ_КЛЮЧ"
  data-target="dota-studio"
  data-height="1100"
  defer>
</script>
```

Заменить `https://api.example.com` на адрес сервера, а ключ — на выданный для этого сайта. Контейнер должен находиться перед скриптом. Готовый пример: [example.html](example.html).

Редактор открывается в iframe: каталог, 3D, эффекты, корзина и скачивание VPK остаются внутри него. Его внутренний дизайн пока не настраивается через SDK; сайт управляет размером и расположением контейнера.

Чтобы не перенастраивать сторонние сайты после каждого перезапуска туннеля, используй постоянный HTTPS-адрес сервера. Если на сайте есть CSP, разреши этот адрес в `script-src`, `connect-src` и `frame-src`.

## 3. Подключить виджет программно

Сначала загрузить скрипт без `data-key` и `data-target`:

```html
<script src="https://api.example.com/embed.js"></script>
<div id="dota-studio"></div>
<script>
(async () => {
  const widget = await DotaEffectStudio.mount({
    serverUrl: 'https://api.example.com',
    siteKey: 'des_pk_ВАШ_КЛЮЧ',
    target: '#dota-studio',
    height: 1100,
    onEvent(event) {
      console.log(event.type, event);
    }
  });

  // await widget.reload(); // Переподключить после истечения сессии.
  // widget.destroy();      // Удалить виджет и его обработчик событий.
})();
</script>
```

SDK проверяет origin сообщения и окно отправителя. События:

| Событие | Данные |
|---|---|
| `preview-ready` | `previewId` — основная 3D-модель загружена; частицы могут ещё подготавливаться |
| `build-ready` | `jobId`, `filename`, `bytes` |
| `error` | `message` |

Те же события доступны на контейнере как `des:preview-ready`, `des:build-ready`, `des:error`. Токены в события не передаются.

## 4. API для своего интерфейса

```javascript
const client = await DotaEffectStudio.connect({
  serverUrl: 'https://api.example.com',
  siteKey: 'des_pk_ВАШ_КЛЮЧ'
});

const catalog = await client.catalog();
const hero = catalog.heroes[0];
const item = hero.items.find(item => item.effects.length);
const effectId = item.effects[0];

const selection = {
  heroId: hero.id,
  itemId: item.id,
  effectId,
  effectIds: [effectId],
  vpkNumber: 9
};

const preview = await client.preview(selection);
await client.wait(preview.id, {preview: true});
const modelUrl = await client.modelUrl(preview.id);
const particleData = await client.effect(preview.id);
// modelUrl — GLB для вашего 3D-рендерера.
// particleData — определения эффекта; их отображение требует симулятора частиц.

const build = await client.build(selection);
const ready = await client.wait(build.id, {
  onProgress(job) { console.log(job.status); }
});
const download = await client.downloadUrl(ready.id);
// Назначьте download в href ссылки. Файл будет называться pak09_dir.vpk.
```

Для нескольких вещей:

```javascript
const job = await client.build({
  vpkNumber: 1,
  selections: [
    {heroId: 'HERO_ID', itemId: 'ITEM_ID_1', effectIds: ['EFFECT_ID_1']},
    {heroId: 'HERO_ID', itemId: 'ITEM_ID_2', effectIds: ['EFFECT_ID_2']}
  ]
});
```

ID берутся из каталога, а не из названий для отображения. Для группового preview передай те же `selections` и дополнительно `heroId`, `itemId`, `effectId` текущей вещи на верхнем уровне. Сервер проверяет доступность эффектов и конфликты слотов.

SDK сам получает токен и обновляет его перед запросом, пока сессия ещё действует. При обновлении токена сохраняется владелец заданий. Если страница не выполняла запросов больше 30 минут и токен уже истёк, создаётся новая сессия; старые задания могут стать недоступны. Ссылки скачивания содержат временный токен и не предназначены для постоянного хранения.

## HTTP-маршруты

Для собственного HTTP-клиента:

1. `POST /api/widget/session` с JSON `{ "key": "des_pk_…" }` и заголовком `Origin` разрешённого сайта.
2. Получить `token` и `expiresIn`.
3. Передавать `Authorization: Bearer TOKEN` в API-запросах.

| Метод | Маршрут | Результат |
|---|---|---|
| POST | `/api/widget/session` | Токен на 30 минут; для продления передать также `previousToken` |
| GET | `/api/catalog` | Герои, предметы и эффекты |
| POST | `/api/inspect` | Зависимости выбранной вещи |
| POST | `/api/preview` | Создать задачу предпросмотра |
| GET | `/api/previews/ID` | Состояние предпросмотра |
| GET | `/api/previews/ID/model` | Подготовленный GLB |
| GET | `/api/previews/ID/effect` | JSON эффекта или эффектов комплекта |
| POST | `/api/build` | Создать задачу сборки |
| GET | `/api/jobs/ID` | Состояние сборки |
| GET | `/api/jobs/ID/download` | Готовый VPK |

Ошибки возвращаются как JSON `{ "error": "…" }`. Создание задачи возвращает HTTP 202. Сборки выполняются по одной; если сервер занят, повторить запрос позже. Административная статистика и локальные команды не входят в публичную интеграцию.

## Развёртывание обновления

Загрузить файлы обновления в репозиторий и дождаться `windows → deploy`. После этого создать ключ для сайта и передать владельцу сайта вставку из раздела 2. Настройки `config.json`, адрес HTTPS-сервера и текущие ключи сохраняются.
