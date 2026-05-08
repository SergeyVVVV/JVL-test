# JVL Analytics — Follow-up Plan

**Дата:** 2026-05-08  
**Статус:** После аудита + финальная схема событий  
**Для:** Стейкхолдер / маркетинг

---

## Часть 1 — Что есть сейчас

### Стек трекинга

| Платформа | ID | Статус |
|---|---|---|
| Google Tag Manager | GTM-MXFJV2DZ | ✅ активен — главный контейнер |
| Google Analytics 4 | G-7FWN801MS4 | ✅ активен |
| Google Ads | — | ✅ конверсии настроены |
| Microsoft Advertising (Bing) | UET 97217087 | ✅ активен |
| Microsoft Clarity | — | ✅ записи сессий и heatmaps |
| Meta Pixel | 1304815181285371 | ✅ активен |
| X (Twitter) Pixel | — | ✅ активен |
| Reddit Pixel | — | ✅ активен (частично) |

Все платформы подключены через GTM. При каждом ключевом событии данные уходят параллельно во все рекламные системы.

---

### Как работают события — важно понимать

События делятся на два уровня:

**GTM-уровень** — срабатывает автоматически на всех страницах, логика настроена в GTM без изменений кода:
- `wg_go_to_amazon` — срабатывает на клик по любой ссылке `amazon.com` на любой странице сайта
- `wg_interested_user` — срабатывает когда пользователь активен ≥ 30 секунд (scroll, движение мыши, тач), максимум 1 раз в день

**Код-уровень** — срабатывает только там, где в HTML явно прописан атрибут `data-ga-event` или `data-ga-block-view`:
- `block_view` — когда пользователь доскроллил до секции с атрибутом `data-ga-block-view` (порог 50% видимости, один раз за сессию)
- Именованные события кнопок (`echo_hero_buy` и др.) — только на страницах где атрибут `data-ga-event` добавлен в код

> **Итог:** `wg_go_to_amazon` и `wg_interested_user` работают на 100% страниц сайта. Вопрос покрытия касается только `block_view` и именованных событий кнопок.

---

### Текущие события

#### GTM-события (работают везде)

| Событие | Когда срабатывает | Платформы |
|---|---|---|
| `wg_go_to_amazon` | Клик на любую ссылку amazon.com на любой странице | GA4, Google Ads, MS Ads, X |
| `wg_interested_user` | Активен на сайте ≥ 30 сек, max 1 раз в день | GA4, Google Ads, MS Ads, X |
| `wg_form_submit` | Отправка контактной формы | GA4, Google Ads, MS Ads, X |
| `wg_file_download` | Скачивание файла | GA4, Google Ads, MS Ads |
| `wg_social_click` | Клик на LinkedIn или YouTube | GA4, Google Ads, MS Ads |

#### Код-события (только на `/echo`)

| Событие | Где | Что означает |
|---|---|---|
| `echo_hero_buy` | Hero-секция | Клик на Amazon CTA в hero (также идёт в Reddit) |
| `echo_purchase_buy` | Блок выбора варианта | Клик "Buy on Amazon" в purchase-секции |
| `echo_major_features_buy` | Секция фич | Клик на Amazon CTA |
| `echo_minor_features_buy` | Секция specs | Клик на Amazon CTA |
| `echo_support_contact` | Секция поддержки | Клик на Contact Us |
| `block_view` | 6 секций страницы | Пользователь доскроллил до секции |

---

### Покрытие `block_view` по страницам

#### `/echo` — 6 секций ✅
`echo_scroll_superiority` · `echo_scroll_purchase` · `echo_scroll_lifestyle` · `echo_scroll_major_features` · `echo_scroll_games` · `echo_scroll_business`

#### Главная — 5 секций ✅ *(добавлено)*
`home_scroll_hero` · `home_scroll_products` · `home_scroll_about` · `home_scroll_games` · `home_scroll_news`

#### `/echo-b2b` — 5 секций ✅ *(добавлено)*
`b2b_scroll_hero` · `b2b_scroll_promise` · `b2b_scroll_venues` · `b2b_scroll_features` · `b2b_scroll_cta`

#### Блог — ❌ не настроено

---

## Часть 2 — Что сделано / исправлено

### ✅ Исправлен триггер `wg_go_to_amazon` (GTM)

**Проблема:** событие срабатывало на все ссылки amazon.com — включая клики на отзывы покупателей и страницу продавца. Это завышало конверсии во всех рекламных кабинетах.

**Исправление:** добавлены исключения в триггер — ссылки на отзывы (`/gp/customer-reviews/`) и страницу продавца (`seller=`) исключены. Изменение затронуло все 5 рекламных платформ одновременно.

---

### ✅ Добавлены `block_view` секции на главную и `/echo-b2b` (код)

**Проблема:** scroll-tracking работал только на `/echo`. Главная страница и `/echo-b2b` не передавали данные о том, какие секции смотрят пользователи.

**Исправление:** добавлен атрибут `data-ga-block-view` на ключевые секции обеих страниц. Теперь GA4 и MS Ads получают данные о глубине просмотра на всех трёх основных страницах.

Затронутые файлы:
- `src/components/HomeHeroCarousel.tsx` — hero секция главной
- `src/app/(frontend)/[locale]/page.tsx` — 4 секции главной
- `src/components/EchoB2bHero.tsx` — hero секция echo-b2b
- `src/components/EchoB2bSections.tsx` — venues и features секции
- `src/app/(frontend)/[locale]/echo-b2b/page.tsx` — promise и CTA секции

---

## Часть 3 — Целевая схема событий

### Две приоритетных воронки

Цель аналитики — понимать два ключевых пути пользователя к покупке ECHO:

**Воронка 1: Сайт → Amazon**
```
[любая страница]  →  клик "Buy/Explore on Amazon"  →  Echo Home B2C
[любая страница]  →  клик "Buy/Explore on Amazon"  →  Echo Commercial B2B
```

**Воронка 2: Блог → Продуктовая страница → Amazon**
```
[статья блога]  →  переход на /echo или /echo-b2b  →  клик на Amazon
[статья блога]  →  клик на баннер внизу статьи     →  Amazon (прямая покупка)
```

---

### Финальный список событий

Минимальная и достаточная схема — всего 4 события:

| Событие | Что покрывает | Статус |
|---|---|---|
| `store_click` | Все клики "купить" — с любой страницы, в любой магазин | 🔨 Нужно реализовать |
| `blog_to_product` | Переход из статьи на продуктовую страницу (без покупки) | 🔨 Нужно реализовать |
| `block_view` | Глубина просмотра страницы | ✅ Работает на `/echo`, главной, `/echo-b2b` |
| `wg_interested_user` | Вовлечённость: активен ≥ 30 сек | ✅ Работает везде |

---

### Событие `store_click` — подробно

Единое событие для всех кликов "купить". Заменит текущий набор разрозненных событий (`echo_hero_buy`, `echo_purchase_buy` и др.).

| Параметр | Значения | Описание |
|---|---|---|
| `channel` | `amazon` \| `shopify` | Магазин назначения |
| `product_type` | `b2c` \| `b2b` | Echo Home или Echo Commercial |
| `page` | `echo` \| `echo-b2b` \| `home` \| `header` \| `blog` | Страница откуда кликнули |
| `section` | `hero` \| `purchase` \| `features` \| `specs` \| `banner` \| `bottom` \| `article-banner` | Секция страницы |

**Примеры:**
```
store_click  channel=amazon  product_type=b2c  page=echo        section=hero
store_click  channel=amazon  product_type=b2b  page=echo-b2b    section=hero
store_click  channel=amazon  product_type=b2c  page=blog        section=article-banner
store_click  channel=shopify product_type=b2c  page=echo        section=purchase   ← будущее
```

**Почему это лучше текущей схемы:**
- Один отчёт в GA4 вместо разрозненных событий
- Сразу видно B2C vs B2B в любом разрезе
- При добавлении Shopify — просто меняется `channel`, схему не нужно переделывать
- При добавлении новых страниц — просто новое значение `page`

---

### Событие `blog_to_product` — подробно

Срабатывает когда пользователь переходит из статьи блога на продуктовую страницу (внутренняя навигация).

| Параметр | Значения | Описание |
|---|---|---|
| `article_slug` | строка | URL-slug статьи откуда кликнули |
| `destination` | `echo` \| `echo-b2b` | Куда перешли |

> Прямые клики на Amazon из статьи (например, баннер внизу) — это `store_click` с `page="blog"`, `section="article-banner"`. Отдельного события не нужно.

---

## Часть 4 — Что ещё нужно сделать

### В GTM

| # | Задача | Время |
|---|---|---|
| 1 | Reddit триггер: переключить с текста кнопки на CSS-класс `btn-amazon` | 15 мин |
| 2 | Проверить тег `HTML - Link changer` — неизвестный Custom HTML тег на всех страницах | 10 мин |
| 3 | Добавить теги для нового события `store_click` (GA4 + рекламные платформы) | 30 мин |
| 4 | `wg_social_click`: добавить Instagram и Facebook, добавить параметр `platform` | 20 мин |

**Детали по п.1:** Reddit пиксель сейчас срабатывает по тексту кнопки "Explore on Amazon" — если текст изменится, конверсии пропадут без предупреждения. Новое условие: `Click Classes contains btn-amazon` + `Click URL contains amazon.com`. Не зависит от текста, покрывает все CTA-кнопки.

**Детали по п.4:** Расширить событие `wg_social_click` — добавить Instagram и Facebook, добавить параметр платформы.

*Шаг 1 — Триггер `wg_social_click`:*

Текущее условие охватывает только LinkedIn и YouTube. Добавить две строки:
- `Click URL` contains `instagram.com`
- `Click URL` contains `facebook.com`

Итоговое условие (любое из четырёх):
```
Click URL contains linkedin.com
Click URL contains youtube.com
Click URL contains instagram.com
Click URL contains facebook.com
```

*Шаг 2 — Переменная `Platform from Click URL`:*

Создать переменную типа **Lookup Table**:
- Input Variable: `{{Click URL}}`
- Строки маппинга:

| Содержит | Значение |
|---|---|
| `linkedin.com` | `linkedin` |
| `youtube.com` | `youtube` |
| `instagram.com` | `instagram` |
| `facebook.com` | `facebook` |

- Default Value: `other`

*Шаг 3 — Тег GA4 Event `wg_social_click`:*

Добавить параметр события:
- Имя: `platform`
- Значение: `{{Platform from Click URL}}`

После этого в GA4 каждый клик на соцсеть будет приходить с параметром `platform`, и в отчётах сразу видно: кто и куда кликает.

### В коде

| # | Задача | Файлы | Время |
|---|---|---|---|
| 1 | Заменить `echo_hero_buy` и др. на `store_click` с параметрами на `/echo` | `EchoPageClient.tsx` | 1 ч |
| 2 | Добавить `store_click` на `/echo-b2b` | `EchoB2bHero.tsx`, `echo-b2b/page.tsx` | 1 ч |
| 3 | Добавить `store_click` на главную | `HomeHeroCarousel.tsx` | 30 мин |
| 4 | Добавить `blog_to_product` и `store_click` на блог | `blog-and-news/[slug]/page.tsx` | 1–2 ч |

---

## Часть 5 — Когда появится покупка на сайте (Shopify)

### Почему Shopify меняет всё

Сейчас единственная метрика конверсии — клик на Amazon. Мы видим **намерение**, но не **результат**: купил человек или нет — неизвестно.

Shopify даёт возможность отслеживать **реальные покупки** с суммой, товаром и order ID. Это принципиально другой уровень данных для оптимизации рекламы.

---

### Рекомендуемый вариант: Shopify Checkout на отдельном домене

Встроенный Buy Button (iframe) не рекомендуется: iframe изолирован от страницы, GA4 не видит что внутри, атрибуция ломается.

---

### Что нужно настроить

**В GA4:** добавить `checkout.shopify.com` в список доменов для cross-domain tracking — GA4 будет видеть сессию целиком без разрыва.

**В Shopify:** подключить GA4 через нативную интеграцию (Google & YouTube app) — автоматически отправляет событие `purchase` с данными заказа.

**В GTM:** добавить тег `wg_go_to_shopify` + настроить передачу `purchase` в Google Ads и MS Ads как конверсию с ценностью.

**В коде:** на кнопки Shopify добавить `data-ga-event="store_click"` с `channel="shopify"` — больше ничего менять не нужно, схема уже готова.

---

### Как изменится схема событий

| | Сейчас | После Shopify |
|---|---|---|
| Клик на Amazon | `store_click` channel=amazon | `store_click` channel=amazon |
| Клик на Shopify | — | `store_click` channel=shopify |
| Реальная покупка | ❌ недоступно | `purchase` (сумма + товар + order ID) |

---

### Что мы знаем сейчас vs после Shopify

| Вопрос | Сейчас | После Shopify |
|---|---|---|
| Сколько людей кликнули на Amazon? | ✅ | ✅ |
| Сколько людей реально купили? | ❌ | ✅ |
| Сколько денег принесла реклама? | ❌ | ✅ |
| B2C vs B2B — кто покупает больше? | Частично | ✅ |
| С какой страницы пришёл покупатель? | Частично | ✅ |
| ROAS по каждой кампании? | ❌ | ✅ |

---

## Итого — план действий

| # | Задача | Где | Статус | Время |
|---|---|---|---|---|
| ✅ | Исправить `wg_go_to_amazon` (исключить отзывы и продавца) | GTM | Сделано | — |
| ✅ | Добавить `block_view` на главную (5 секций) | Код | Сделано | — |
| ✅ | Добавить `block_view` на `/echo-b2b` (5 секций) | Код | Сделано | — |
| 1 | Reddit триггер → CSS класс `btn-amazon` | GTM | Нужно сделать | 15 мин |
| 2 | Проверить `HTML - Link changer` | GTM | Нужно сделать | 10 мин |
| 3 | GTM теги для `store_click` | GTM | Нужно сделать | 30 мин |
| 4 | `wg_social_click`: добавить Instagram, Facebook + параметр `platform` | GTM | Нужно сделать | 20 мин |
| 4 | Заменить события на `/echo` → `store_click` | Код | Нужно сделать | 1 ч |
| 5 | Добавить `store_click` на `/echo-b2b` | Код | Нужно сделать | 1 ч |
| 6 | Добавить `store_click` на главную | Код | Нужно сделать | 30 мин |
| 7 | Добавить события на блог | Код | Нужно сделать | 1–2 ч |
| 8 | Cross-domain tracking для Shopify | GA4 + GTM | При Shopify | 2–3 ч |
| 9 | Подключить Shopify → GA4 `purchase` | Shopify + GTM | При Shopify | 3–4 ч |

---

*Документ подготовлен по результатам аудита кодовой базы и GTM-контейнера GTM-MXFJV2DZ. Обновлён 2026-05-08.*
