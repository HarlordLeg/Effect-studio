# Dota Effect Studio SDK — инструкция для владельца сайта

Эта инструкция предназначена владельцу сайта, который хочет подключить Dota Effect Studio со своим дизайном.

## 1. Получите ключ

Передайте администратору Dota Effect Studio точный адрес своего сайта, например `https://example.com`. В ответ вы получите ключ вида `des_pk_...`.

Ключ привязан к адресу сайта. `https://example.com` и `https://www.example.com` — разные адреса. Если используете оба, сообщите об этом администратору.

Ключ можно размещать в JavaScript страницы. Устанавливать Dota 2, Node.js или сервер приложения на свой хостинг не требуется: обработка моделей и сборка VPK выполняются на сервере Dota Effect Studio.

## 2. Запустите готовый пример

Получите три файла:

- `custom-design.html`
- `custom-design.css`
- `custom-design.js`

В `custom-design.js` найдите:

```javascript
const SITE_KEY = 'ВСТАВЬ_КЛЮЧ_ЭТОГО_САЙТА';
```

Вставьте свой ключ:

```javascript
const SITE_KEY = 'des_pk_ВАШ_КЛЮЧ';
```

Разместите все три файла в одной папке на своём HTTPS-сайте. Откройте страницу, например `https://example.com/studio/custom-design.html`.

Пример содержит выбор героя, предмета и эффекта, 3D-просмотр, управление анимациями и сборку VPK. Открытие HTML напрямую с компьютера через `file://` не поддерживается.

## 3. Измените дизайн

| Файл | Что менять |
| --- | --- |
| HTML | Расположение и состав элементов |
| CSS | Цвета, шрифты, размеры, отступы |
| JavaScript | Выбор предметов, обработчики кнопок и запросы |

При использовании готового JS сохраняйте `id` элементов, к которым он обращается. Если меняете идентификаторы, обновляйте их и в JavaScript.

3D-компонент отображается в отдельном iframe. Вы можете менять его размер, рамку, скругления и расположение. CSS вашего сайта не изменяет внутреннюю сцену; её фон пока фиксированный.

## 4. Подключите SDK к существующей странице

Если готовый пример не нужен, добавьте контейнер для 3D и подключите SDK:

```html
<div id="dota-viewer"></div>
<script src="https://api.dota-studio.lol/embed.js"></script>
<script src="/js/dota-studio.js"></script>
```

В файле `dota-studio.js` создайте клиент:

```javascript
async function initStudio() {
  const client = await DotaEffectStudio.connect({
    serverUrl: 'https://api.dota-studio.lol',
    siteKey: 'des_pk_ВАШ_КЛЮЧ'
  });

  const viewer = await DotaEffectStudio.mountViewer({
    target: '#dota-viewer',
    client,
    height: 650,
    onEvent(event) {
      if (event.type === 'error') console.error(event.error);
    }
  });

  await viewer.ready;
  const catalog = await client.catalog();
  // Здесь создайте свой интерфейс на основе catalog.
  return { client, viewer, catalog };
}

initStudio().catch(console.error);
```

Переменные `client`, `viewer` и `catalog` в следующих примерах — экземпляры, полученные при инициализации. Идентификаторы выбранных элементов берутся из вашего интерфейса.

## 5. Получите каталог

```javascript
const catalog = await client.catalog();
```

Основные данные:

- `catalog.heroes` — герои и их предметы.
- `catalog.effects` — эффекты.
- `hero.items` — предметы конкретного героя.
- `item.effects` — идентификаторы доступных предмету эффектов.

```javascript
const hero = catalog.heroes.find(h => h.id === selectedHeroId);
const item = hero.items.find(i => i.id === selectedItemId);
const availableEffects = catalog.effects.filter(effect =>
  item.effects.includes(effect.id)
);
```

Используйте идентификаторы из каталога. Не подставляйте отображаемые названия вместо `id`.

## 6. Загрузите героя с предметом и эффектом

```javascript
const selection = {
  heroId: selectedHeroId,
  itemId: selectedItemId,
  effectId: selectedEffectId
};

const result = await viewer.show(selection, {
  onProgress(job) {
    console.log('Подготовка:', job.status);
  }
});
```

SDK подготовит сцену на сервере, дождётся результата и загрузит модель с эффектами.

```javascript
result.animations // Список анимаций.
result.animation  // Индекс выбранной анимации; может быть -1.
result.systems    // Количество подключённых систем частиц.
result.warnings   // Предупреждения предпросмотра.
```

На время загрузки отключайте кнопку просмотра. Одновременный повторный вызов `show()` отклоняется.

## 7. Управляйте 3D-просмотром

```javascript
await viewer.setAnimation(0);         // Индекс из result.animations.
await viewer.setEffectsEnabled(false);
await viewer.setEffectsEnabled(true);
await viewer.replay();                // Запустить эффекты заново.
await viewer.clear();                 // Очистить сцену.
viewer.destroy();                     // Удалить компонент.
```

Управление камерой:

- Мышь — вращение.
- WASD — перемещение.
- Q/E — изменение высоты.
- Shift — ускорение.

Чтобы клавиши управляли камерой, сначала нажмите внутри 3D-сцены. Браузер должен поддерживать WebGL 2.

## 8. Используйте несколько предметов и эффектов

Для нескольких эффектов на одном предмете передайте `effectIds`. Основной эффект также укажите в `effectId`:

```javascript
const selection = {
  heroId,
  itemId,
  effectId: firstEffectId,
  effectIds: [firstEffectId, secondEffectId]
};
```

Для комплекта из нескольких предметов:

```javascript
const selections = [
  {
    heroId,
    itemId: firstItemId,
    effectId: firstEffectId,
    effectIds: [firstEffectId]
  },
  {
    heroId,
    itemId: secondItemId,
    effectId: secondEffectId,
    effectIds: [secondEffectId]
  }
];

const selection = { ...selections[0], selections };
await viewer.show(selection);
```

Для 3D-просмотра используйте комплект одного героя. Каждый предмет и эффект должны быть совместимы согласно каталогу.

## 9. Задайте цвет courier-эффекта

Для эффектов, поддерживающих изменение цвета:

```javascript
const selection = {
  heroId,
  itemId,
  effectId,
  courierColor: [255, 100, 20]
};
```

Каждая RGB-компонента — целое число от 0 до 255. Без собственного цвета используйте `null` или не передавайте поле.

## 10. Соберите и скачайте VPK

```javascript
const job = await client.build({ ...selection, vpkNumber: 1 });
const result = await client.wait(job.id, {
  onProgress(job) {
    console.log('Сборка:', job.status);
  }
});

const downloadUrl = await client.downloadUrl(result.id);
const link = document.getElementById('download');
link.href = downloadUrl;
link.textContent = `Скачать ${result.filename}`;
link.hidden = false;
```

| vpkNumber | Имя |
| --- | --- |
| 1 | pak01_dir.vpk |
| 14 | pak14_dir.vpk |
| 99 | pak99_dir.vpk |

Допустимый диапазон — от 1 до 99. Если ссылка долго не использовалась, получите новую через `downloadUrl()` перед скачиванием.

## 11. Обрабатывайте ошибки

Показывайте пользователю сообщение и возвращайте кнопки в рабочее состояние:

```javascript
button.disabled = true;
try {
  await viewer.show(selection);
} catch (error) {
  statusElement.textContent = error.message;
} finally {
  button.disabled = false;
}
```

| Проблема | Что проверить |
| --- | --- |
| Не создаётся сессия | Ключ и точный HTTPS-адрес сайта |
| Работает без www, но не с www | Разрешены ли оба адреса |
| Превышен лимит | Обратиться к администратору за увеличением |
| Ошибка загрузки модели | Попробовать другой предмет, передать ошибку администратору |
| Нет WebGL 2 | Поддержку браузера и аппаратное ускорение |
| Предпросмотр уже загружается | Дождаться предыдущего запроса |

Предпросмотры и сборки расходуют общий лимит сайта. Не запускайте экспорт при каждом движении мыши или вводе символа — используйте кнопку либо задержку после изменения выбора.

## 12. Сессии и ограничения

SDK автоматически обновляет сессию при обращениях к API. После длительного простоя старая задача может стать недоступной — тогда создайте новый предпросмотр или сборку.

Отмена ожидания на странице не останавливает уже запущенный экспорт на сервере. Обновление сервера может прервать активные задачи.

Приложение находится в бете. Некоторые модели и эффекты могут отображаться с отличиями от Dota 2; итоговый VPK следует проверять в игре.
