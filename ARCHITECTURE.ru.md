# Архитектура Dota Effect Studio

[English](ARCHITECTURE.md) · **Русский**

Документ для разработчиков: из каких частей состоит проект, как запрос пользователя превращается в VPK, где лежат данные и как изменения попадают на сервер. Что умеет сайт и как им пользоваться — в [README.ru.md](README.ru.md); встраивание на чужой сайт — в [SDK.md](SDK.md) и [SDK_GUIDE.md](SDK_GUIDE.md).

## Общая картина

```
 Браузер (public/, сайт dota-studio.lol из docs/)
   │  каталог, корзина, 3D-просмотр, перекраска
   ▼
 server.mjs (Node 24, http) ── api.dota-studio.lol через cloudflared
   │
   ├─ lib/game-catalog.mjs ……… каталог героев и предметов из файлов игры
   ├─ lib/preview.mjs ………………… превью: asset-bridge → GLB → кеш
   ├─ lib/build.mjs (Builder) … сборка VPK в пуле воркеров (lib/build-pool.mjs)
   │     │
   │     └─ patcher/ (Dota2UnusualPatcher.exe, C#) — правка ресурсов Source 2
   │
   └─ lib/vpk.mjs ……………………… чтение игровых VPK (AssetStore) и упаковка результата
         ▲
 Dota 2: game/dota/pak01_dir.vpk (+ game/core/pak01_dir.vpk), maps/*.vpk
```

Сервер — одна программа на Node без фреймворков. Всё, что требует разбирать и записывать бинарные ресурсы Source 2 (модели, партиклы, материалы, анимации, карты), делают три нативные утилиты на .NET 10 и [ValveResourceFormat](https://github.com/ValveResourceFormat/ValveResourceFormat) 20.1:

| Утилита | Проект | Зачем |
|---|---|---|
| Патчер | `patcher/Dota2UnusualPatcher.csproj` → `Dota2UnusualPatcher.exe` | Все изменения ресурсов при сборке VPK |
| Asset bridge | `asset-bridge/AssetBridge.csproj` → `DotaAssetBridge.exe` | Экспорт моделей и партиклов в GLB для 3D-просмотра |
| Icon bridge | `icon-bridge/IconBridge.csproj` → `DotaIconBridge.exe` | Иконки предметов и способностей |

Node вызывает их как отдельные процессы: пишет входные файлы и JSON-манифест во временную папку `output/<job>/`, запускает утилиту, читает результат.

## Папки репозитория

| Путь | Что внутри |
|---|---|
| `server.mjs` | HTTP-сервер: маршруты, доступ, отдача файлов |
| `desktop.cjs` | Оболочка Electron для локального приложения |
| `lib/` | Вся серверная логика (около 110 модулей, ниже — по группам) |
| `lib/editor/` | Редактор ресурсов (перекраска текстур и партиклов вручную) |
| `lib/tester/` | Портал тестеров: перекраска, новый движок сборки, изоляция ресурсов |
| `lib/hud-creator/` | Конструктор HUD |
| `lib/arcana-templates/` | Описания подготовленных шаблонов аркан |
| `public/` | Клиент: страницы, каталог, корзина, перекраска, просмотрщик |
| `public/viewer/`, `public/renderer/` | 3D-сцена: загрузка GLB, анимации, партиклы |
| `public/recolor/`, `public/tester/` | Интерфейс перекраски (общий и тестерский) |
| `docs/` | Статический сайт для GitHub Pages — **выборочная копия** части `public/`; целиком не перегенерировать |
| `patcher/` | Исходники патчера (C#) |
| `asset-bridge/`, `icon-bridge/` | Исходники утилит экспорта |
| `vendor/dota-loadout/` | Сторонний просмотрщик и его адаптации |
| `tools/` | Скрипты подготовки, аудита, публикации и упаковки |
| `tests/` | `*.test.mjs` для `node --test` и 22 C#-проекта нативных регрессий |
| `deploy/` | Установка и обновление серверной установки (PowerShell) |
| `data/` | Данные, которые идут в репозиторий: `catalog.json`, коллекции эффектов |
| `samples/` | Тестовые архивы для запуска без игры |
| `integrations/` | Примеры встраивания |
| `.github/workflows/` | CI: тесты, сборка, автодеплой |

## Сервер: `server.mjs`

При старте читает `config.json` (если его нет — `config.example.json`), применяет `productionBuilderConfig` и создаёт:

- `Builder` (`lib/build.mjs`) — каталог и сборка;
- `PreviewService` (`lib/preview.mjs`) — превью моделей;
- `WidgetAuth` (`lib/auth.mjs`) — ключи сайтов и лимиты; `AdminAuth`, `Statistics` (`lib/admin.mjs`); `Notifications`;
- портал тестеров (`lib/tester/routes.mjs`), сервисы редактора (`lib/editor/`), статический просмотрщик (`lib/static-viewer.mjs`).

Каждый запрос сначала проходит `requestAccess` (`lib/request-access.mjs`): разрешены только локальный адрес и хост из `publicBaseUrl`. Дальше — портал тестеров, статический просмотрщик и маршруты.

Основные маршруты:

| Маршрут | Назначение |
|---|---|
| `GET /api/health` | Готовность сервера (по нему деплой ждёт перезапуска) |
| `/api/catalog` | Каталог героев, предметов и эффектов |
| `GET /api/cosmetics` | Глобальная косметика: варды, курьеры, HUD, ландшафты, погода, музыка… |
| `GET /api/stances` | Кинетические самоцветы героя (проверяются патчером на модели) |
| `POST /api/preview`, `/api/preview-view`, `/api/viewer`, `/api/model-metadata` | 3D-превью |
| `POST /api/inspect` | Проверка выбора без сборки |
| `POST /api/build` | Постановка сборки VPK в очередь |
| `GET /api/jobs/<id>` | Состояние сборки и скачивание по билету (`lib/downloads.mjs`) |
| `/api/recolor/…` | Перекраска (`lib/tester/recolor.mjs`) |
| `/api/*-icon` | Иконки предметов, способностей, аркан |
| `/api/admin/…` | Админка: косметика, наборы, уведомления, статистика, редактор |
| `/api/widget/session` | Сессия встраиваемого виджета |

## Каталог

`expandGameCatalog` (`lib/game-catalog.mjs`) строит каталог из файлов игры при каждом запуске: `scripts/items/items_game.txt`, определения героев и юнитов, плюс ручные дополнения из `data/catalog.json`. Поверх него модули добавляют то, чего в `items_game` нет в готовом виде:

- стили предметов — `item-styles.mjs`; наборы — `hero-sets.mjs`; персоны — `personas.mjs`, `persona-build.mjs`;
- нативные подмены предметов (`visuals`: замены партиклов, моделей, иконок, звуков) — `native-overrides.mjs`;
- слияние моделей (предмет вливается в модель героя) — `model-merge.mjs`;
- кинетические самоцветы и анимации предметов — `kinetic-catalog.mjs`, `hero-activities.mjs`, `activity-corrections.mjs`;
- арканы — `public-arcanas.mjs`, `expanded-arcanas.mjs`, отдельные модули под героев (`terrorblade-arcana.mjs`, `techies-arcana.mjs`, `drow-arcana.mjs`, `rubick-arcana.mjs`, `spectre-template.mjs`, `razor-template.mjs`…);
- глобальная косметика — `global-cosmetics.mjs`, ландшафты — `cosmetic-terrain.mjs`, погода — `cosmetic-weather.mjs`, HUD — `cosmetic-hud.mjs`.

Игровые архивы читает `AssetStore` (`lib/vpk.mjs`): VPK из `config.archives` (рядом автоматически подключается `game/core/pak01_dir.vpk`) и папки `assetDirectories`. Каждое чтение проверяет CRC. `store.closure(roots)` обходит ссылки ресурсов (блок RERL) и возвращает все зависимости и список отсутствующих файлов.

## Сборка VPK

### Очередь

`Builder.create` ставит задание в `BuildPool` (`lib/build-pool.mjs`): воркеры на `worker_threads`, их число — `buildConcurrency` (по умолчанию половина ядер, не больше 4), длина очереди — `buildQueueLimit` (64), потоки .NET на воркер — `buildNativeThreads`. Воркер (`lib/build-worker.mjs`) создаёт свой `Builder` и вызывает `build()`.

### Выбор пользователя → choices

`normalizeSelections` (`lib/namespace.mjs`) превращает запрос в список выборов `{hero, item, effects, stance?}`. В режиме набора — до 1024 строк (`MAX_SET_BUILD_ITEMS`), в режиме эффектов — до 128 (`MAX_BUILD_ITEMS`). Арканы, кинетики и персоны раскрываются в обычные выборы (`completePublicArcanas`, `completePersonaChoices`, `kineticBuildChoices`…).

### Конвейер `Builder.assemble`

Порядок шагов в `lib/build.mjs`:

1. **Подготовка шаблонов.** Spectre и Razor собираются через подготовленные шаблоны; цветные эффекты получают свою копию дерева партиклов (`colored-effects.mjs`).
2. **Проверка патчера** — `--capabilities`: сервер отказывается собирать со старым патчером.
3. **Сбор файлов по каждому предмету.** Для каждого выбора — `replacementTarget` (`lib/replacement.mjs`): по какому игровому пути встанет модель предмета (обычно путь модели слота по умолчанию). Затем `store.closure` собирает зависимости. Проверка: каждая модель, партикл и снапшот должны найтись, иначе «Не хватает зависимостей». Исключение — ссылки, которые сама игра шипит без файла (после патча файл удалён, а игровой файл на него ссылается): их находит `gameShippedMissing` (`lib/asset-availability.mjs`). Два предмета, требующие разные байты по одному пути, дают «Конфликт ресурса между предметами»; нативная подмена модели, сделанная раньше (оружие меняет модель других предметов, как в игре), выигрывает независимо от порядка выбора. Кинетические самоцветы берут зависимости из тех же подмен шаблонов, что и предметы.
4. **Привязка эффектов к модели** — патчер в режиме по умолчанию (`--input/--output`, `--particle`, `--skin`, `--particle-replacements`).
5. **Защита и оптимизация.** Разрыв циклов подмен партиклов (`particle-override-cycles.mjs`), выкидывание материалов, которые уже есть в игре (`pack-optimization.mjs`).
6. **Перенос в своё пространство имён.** Изменённые копии общих ресурсов уезжают под `harlord/…` (`namespacePlan`, `harlordPath`), чтобы мод не ломал чужие предметы; патчер `--relocate` переписывает ссылки внутри файлов.
7. **Модель героя.** Скины тела, группы мешей, слияния моделей (`--merge-models`), анимации предметов и кинетиков (`--activity-rules`, `--hero-activities`). Правила анимаций снимаются с обычной модели героя; если тело подменено (аркана, персона), обязательными остаются только те последовательности, что в нём есть.
8. **Особые случаи героев** — Terrorblade, Techies, Crystal Maiden, Lifestealer, Invoker, Windrunner, Morphling и другие: отдельные модули `lib/*-runtime.mjs`, `lib/*-arcana.mjs` и команды патчера.
9. **Персоны, звуки, голоса** — `persona-scales`, `persona-voices`, `sound-overrides`.
10. **Хосты тестерского движка** (`lib/tester/build.mjs`, `--tester-wearable-host`) — только при `testerBuildV1`.
11. **Финальная проверка**: замыкание всех корней по уже собранным файлам — «После переноса не найдены ресурсы», если что-то потерялось.
12. **Глобальная косметика, иконки миникарты, водяной знак** (`--watermark-models`), упаковка `packVpk`.

`build()` пишет `pakNN_dir.vpk`; если выбран ландшафт или атаки эмблем, `finishCosmeticPackage` (`lib/cosmetic-terrain.mjs`) упаковывает всё в ZIP с `INSTALL.txt` и отдельным `maps/dota.vpk`.

### Движки `legacy` и `new`

`productionBuilderConfig` (`lib/production-builder.mjs`) выбирает движок: переменная `DOTA_BUILDER_ENGINE` или `builderEngine` в конфиге, **по умолчанию `new`** (`testerBuildV1: true`). Новый движок собирает предметы в хост-модель героя (`lib/tester/`). Ошибки пользователей воспроизводить нужно на нём; `tools/audit-builder-regressions.mjs` собирает каждый сценарий обоими движками.

## Патчер

`patcher/Program.cs` разбирает аргументы и вызывает нужный класс. Без команды — правка модели предмета (`--input`, `--output`, `--particle`…). Команды:

| Команда | Класс / назначение |
|---|---|
| `--capabilities` | Версия и список возможностей (JSON) |
| `--relocate` | `ResourceRelocator` — перенос путей и ссылок |
| `--merge-models` | `ModelMerge` — слияние предметов в модель героя |
| `--activity-rules`, `--inspect-activities` | `HeroActivityRules` — таблица анимаций (ASEQ/ANIM) |
| `--hero-activities` | `HeroActivities` — шаблон Skullbasher и подобные |
| `--model-mesh-groups`, `--model-softbody-parts` | Группы мешей, мягкие части |
| `--item-effect-scope`, `--item-hitbox-scope` | Эффекты и хитбоксы в пределах предмета |
| `--suppress-particles` | Отключение партиклов |
| `--global-cosmetics`, `--hud-cosmetics`, `--hud-creator`, `--minimap-icons` | Косметика, HUD, миникарта |
| `--map-weather` | `MapWeather` — погода в карте |
| `--cosmetic-shader-rgb` | Цвет шейдеров косметики |
| `--sound-overrides`, `--index-sound-events`, `--persona-voices` | Звуки и голоса |
| `--persona-scale` | Масштаб персон |
| `--terrorblade-arcana`, `--terrorblade-bindings`, `--techies-body-meshes`, `--cm-arcana-runtime`, `--lifestealer-runtime`, `--healthy-locomotion`, `--morphling-runtime`, `--morphling-fish-channels`, `--windrunner-focusfire` | Героеспецифичные правки |
| `--tester-wearable-host` | Хост-модель нового движка |
| `--editor-resources`, `--editor-textures` | Редактор ресурсов |
| `--watermark-models` | Водяной знак |

Патчер пишет исправленный файл и при ошибке завершается с кодом 1 и текстом `[ERROR] Patcher 1.1.0: …`; этот текст пользователь видит под кнопкой сборки.

## Превью и статический просмотрщик

`PreviewService` (`lib/preview.mjs`) вызывает asset bridge, тот экспортирует модель с партиклами в GLB; результат кешируется в `cache/models`. Метаданные просмотрщика — `lib/viewer-metadata.mjs`, отдача — `lib/viewer-transfer.mjs`. Клиент рисует сцену в `public/viewer` и `public/renderer` на three.js.

Статический просмотрщик (`lib/static-viewer.mjs`, `tools/publish-static-viewer.mjs`) заранее экспортирует превью, кладёт их в Cloudflare R2 (`tools/upload-static-r2.py`) и публикует индекс, чтобы сайт показывал модели без сервера.

## Перекраска и редактор

- Перекраска героя и предметов — `lib/tester/recolor.mjs` (маршруты `/api/recolor/`), изоляция общих ресурсов — `lib/tester/recolor-isolation.mjs`, цели героя — `lib/hero-recolor.mjs`.
- Редактор ресурсов — `lib/editor/`: проекты (`project-service.mjs`), конвейер материалов и партиклов (`resource-pipeline.mjs`), сборка (`build-service.mjs`, очередь до 16 сборок).

## Ландшафты и погода

- `terrain-standard` — карта из установленной игры (`game/dota/maps/dota.vpk`).
- Остальные ландшафты — готовые карты на сервере: `data/cosmetic-templates/terrain/<id>/maps/dota.vpk`, где `<id>` — номер предмета из `items_game` (11171 Spring, 11316 TI6, 11339 TI5 Desert, 11444 Winter, 11476 King's New Journey, 11904 Autumn, 11946 TI7 Reef, 12022 TI8 Emerald, 12289 Summer, 12921 TI9 Overgrown, 21441 TI10). Источник — каталог Dota2PornFx (релиз [terrains](https://github.com/h6rd/Dota2PornFx/releases/tag/terrains)). **После обновления карты в игре** эти файлы нужно перекачать оттуда и положить по тем же папкам; каталог перечитывает их сам (по размеру и времени файла).
- Если готовой карты нет, `prepareTerrain` переносит карту `maps/dota_<name>.vpk` игры в `maps/dota` через `--relocate` и кеширует результат в `cache/cosmetic-terrains`.
- Погода (`lib/cosmetic-weather.mjs`, `patcher/MapWeather.cs`) правит `weather_effect` в зонах `ent_dota_lightinfo` выбранной карты.

## Данные сервера

Рабочая установка — `D:\DotaEffectStudio`. В git из `data/` лежит только то, что входит в `deploy/update-server.ps1` (`catalog.json`, `effect-collections.json`, `frostbloom.json`). Остальное живёт только на сервере и не коммитится:

| Путь | Что |
|---|---|
| `config.json` | Пути к игре, порт, `publicBaseUrl`, патчер, лимиты |
| `data/site-keys.json`, `data/admin-auth.json`, `data/session-secret`, `data/tester-whitelist.json` | Ключи и доступы (секреты) |
| `data/statistics.json`, `data/notifications.json` | Статистика и уведомления |
| `data/cosmetic-templates/` | Готовые карты и шаблоны HUD |
| `data/animation-templates/`, `data/arcana-templates/`, `data/model-merge-templates/`, `data/model-fixes/` | Подготовленные шаблоны для сборки |
| `cache/` | Кеши превью, иконок, анимаций, карт — можно удалить, пересоберутся |
| `output/` | Временные папки сборок; чистятся после выдачи |

## Тесты

- `npm test` — `node --test tests/*.test.mjs` (около 200 файлов). Сборки проверяются с заглушкой вместо патчера: тест подменяет `run` у `Builder` и проверяет манифесты и итоговый VPK. Примеры: `tests/set-entities.test.mjs`, `tests/game-update-regressions.test.mjs`.
- Нативные регрессии — все `tests/**/*.csproj` (22 проекта), их запускает `node tools/build-native.mjs patcher` перед сборкой патчера.
- Аудит реальных сборок на установленной игре — `node tools/audit-builder-regressions.mjs [--hero <id>] [--case <id>]`: собирает сценарии из `tools/builder-regression-*.mjs` обоими движками и проверяет зависимости готового VPK (`tools/audit-package.mjs`). Игру он не запускает.

Успешные тесты не доказывают, что мод работает в игре: анимации, ткань и партиклы проверяются только запуском Dota.

## CI и деплой

`.github/workflows/windows-build.yml` при пуше в `main`:

1. **windows** — `npm test`, проверка скриптов деплоя, C#-тесты, `build-native.mjs patcher` и `assets` (с нативными регрессиями), серверный пакет `DotaEffectStudio-Server-Windows-x64`.
2. **desktop** — портативное приложение `DotaEffectStudio-Windows-x64`.
3. **deploy** — на self-hosted runner сервера (метка `des-server`), если переменная `DES_AUTO_DEPLOY` = `true`: `deploy/update-server.ps1` останавливает задачу планировщика, копирует управляемые файлы (`lib`, `public`, `patcher/publish`, `server.mjs`…), запускает сервер и ждёт `/api/health`. Не входящее в список (`config.json`, `data/*` кроме каталога, `cache`) не трогается. Прошлая версия остаётся в `D:\DotaEffectStudio-deploy\previous`.

Сайт `docs/` публикуется GitHub Pages отдельно и сразу после пуша.

## Как разбирать ошибку сборки от пользователя

1. Восстановить набор: герой, предметы со стилями, аркана, кинетики, эффекты.
2. Собрать его скриптом с `Builder` из `lib/build.mjs` на конфиге сервера, движком `new`, с вызовом `heroStances` перед кинетиками (так делает сайт).
3. Найти шаг конвейера по тексту ошибки; ошибки патчера — по классу и строке в стеке.
4. Добавить тест в `tests/` с заглушкой патчера, проверить, что без исправления он падает.
5. `npm test`; при правке патчера — `node tools/build-native.mjs patcher`.
