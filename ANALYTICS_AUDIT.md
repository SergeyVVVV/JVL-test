# Analytics Audit — JVL Website

**Дата:** 2026-05-07  
**Ветка:** analytics-check  
**Цель:** понять текущее состояние событий, найти пробелы, предложить улучшения

---

## 1. Текущий стек трекинга

| Инструмент | ID | Подключение |
|---|---|---|
| Google Tag Manager | `GTM-MXFJV2DZ` | `src/app/layout.tsx` — основной контейнер |
| Google Analytics 4 | `G-7FWN801MS4` | `src/app/layout.tsx` — прямой fallback-скрипт |
| Meta Pixel | `1304815181285371` | `src/app/layout.tsx` — захардкожен |

GTM — главный инструмент. GA4 и Meta Pixel загружаются через него (или напрямую как fallback).

**Env vars:**

```
NEXT_PUBLIC_GTM_ID   — GTM-MXFJV2DZ (дефолт в коде)
NEXT_PUBLIC_GA_ID    — G-7FWN801MS4 (дефолт в коде)
```

> ⚠️ Дефолты захардкожены в `layout.tsx` строки 10–11. Если `.env` не задан — IDs всё равно подтянутся. Это нормально для одного проекта, но неочевидно.

---

## 2. Архитектура событий в коде

### Утилита `src/lib/analytics.ts`

Функция `trackEvent(eventName, params)` пушит событие в `window.dataLayer` — стандартная интеграция с GTM.

Две категории событий:
- `echo_*` — события страниц продукта
- `wg_*` — глобальные события сайта (управляются триггерами GTM, не кодом)

### Компонент `src/components/AnalyticsEvents.tsx`

Глобальный слушатель, смонтированный в root layout. Перехватывает клики по элементам с атрибутом `data-ga-event` и показы секций с `data-ga-block-view`.

**Как добавить событие в разметку:**
```html
<!-- клик -->
<a data-ga-event="echo_hero_buy" data-ga-param-label="hero" href="...">

<!-- показ блока -->
<section data-ga-block-view="echo_scroll_purchase" data-ga-block-threshold="0.5">
```

---

## 3. Инвентарь событий

### 3.1 Клики — CTA кнопки (Echo-1)

| Событие | Файл | Строка | Секция |
|---|---|---|---|
| `echo_hero_buy` | `echo-1/EchoPageClient.tsx` | 135 | Hero |
| `echo_purchase_buy` | `echo-1/EchoPageClient.tsx` | 634 | Блок покупки / выбор варианта |
| `echo_major_features_buy` | `echo-1/EchoPageClient.tsx` | 820 | Основные фичи |
| `echo_minor_features_buy` | `echo-1/EchoPageClient.tsx` | 1197 | Дополнительные фичи |
| `echo_support_contact` | `echo-1/EchoPageClient.tsx` | 1340 | Поддержка (не Amazon) |

> ⚠️ `EchoHomeClient.tsx` — текущий основной файл страницы (`echo-1`) — **не имеет ни одного `data-ga-event`**. Все события выше находятся в `EchoPageClient.tsx`, который может быть устаревшей версией.

### 3.2 Scroll-view события (видимость секций)

| Событие | Блок | Файл | Строка |
|---|---|---|---|
| `block_view` | `echo_scroll_superiority` | `EchoPageClient.tsx` | 340 |
| `block_view` | `echo_scroll_purchase` | `EchoPageClient.tsx` | 556 |
| `block_view` | `echo_scroll_lifestyle` | `EchoPageClient.tsx` | 703 |
| `block_view` | `echo_scroll_major_features` | `EchoPageClient.tsx` | 771 |
| `block_view` | `echo_scroll_games` | `EchoPageClient.tsx` | 979 |
| `block_view` | `echo_scroll_business` | `EchoPageClient.tsx` | 1373 |

> ⚠️ Аналогично — все scroll-события в `EchoPageClient.tsx`, а не в `EchoHomeClient.tsx`.

### 3.3 GTM-managed события (настраиваются в GTM, не в коде)

| Событие | Триггер GTM |
|---|---|
| `wg_go_to_amazon` | Клик по любой ссылке на amazon.com |
| `wg_file_download` | Клик по файлу |
| `wg_form_submit` | Отправка формы |
| `wg_interested_user` | Определяется в GTM |

---

## 4. Amazon-ссылки — полный инвентарь

### 4.1 Покупочные ссылки с MAAS-тегом (`tag=maas`)

Используются на страницах echo-1 и echo-2. Тег `maas` позволяет Amazon Attribution отслеживать источник трафика.

| Файл | Строки | Продукт | Тег |
|---|---|---|---|
| `echo-1/EchoHomeClient.tsx` | 25 (константа), 1757, 1931 | Echo Home | `tag=maas` |
| `echo-2/EchoTwoClient.tsx` | 19 (константа), 1174, 1471, 1517 | Echo Home | `tag=maas` |
| `echo-1/EchoPageClient.tsx` | 393, 407, 629, 816, 1193 | Echo Home / B2B | `tag=maas` |
| `components/Header.tsx` | 32, 37 | Echo Home + B2B | `tag=maas` |

### 4.2 Ссылки БЕЗ MAAS-тега

| Файл | Строки | Продукт |
|---|---|---|
| `echo-1/page.tsx` | 40, 55, 86 | Echo Home |
| `echo-2/page.tsx` | 40, 55, 72 | Echo Home |
| `echo-b2b/page.tsx` | 83, 123, 262 | Echo B2B |
| `[locale]/page.tsx` | 78 | Echo Home (главная) |

> ⚠️ 9 покупочных ссылок на Amazon не имеют MAAS-тега. GTM-событие `wg_go_to_amazon` сработает на все клики, но в Amazon Attribution эти переходы не будут атрибутированы корректно.

### 4.3 Ссылки на отзывы и продавца (не покупочные)

| Файл | Строки | Тип |
|---|---|---|
| `EchoHomeClient.tsx` | 874, 883, 892, 901 | Customer Reviews |
| `EchoHomeClient.tsx` | 905 | Seller Page |
| `EchoTwoClient.tsx` | 619, 627, 635, 643 | Customer Reviews |

> Эти клики тоже попадут в `wg_go_to_amazon`. Стоит добавить отдельный параметр чтобы их отделить от покупочных.

---

## 5. Блог и трафик-драйверы

| Маршрут | Файл | Событий |
|---|---|---|
| `/blog-and-news` | `blog-and-news/page.tsx` | ❌ нет |
| `/blog-and-news/[slug]` | `blog-and-news/[slug]/page.tsx` | ❌ нет |
| Карточки новостей на главной | `[locale]/page.tsx` | ❌ нет |

**Нет ни одного события** на блог-страницах: ни клики на карточки, ни переходы на продуктовые страницы, ни время на странице.

---

## 6. Критические пробелы

### 🔴 Высокий приоритет

1. **`EchoHomeClient.tsx` не имеет событий**  
   Это основной рабочий файл `echo-1`, но все события находятся в `EchoPageClient.tsx`. Непонятно, какой файл рендерится в продакшне. Нужно проверить и перенести события в актуальный файл.

2. **9 покупочных Amazon-ссылок без `tag=maas`**  
   Эти переходы не атрибутируются в Amazon Attribution. Потеря данных о конверсиях.

3. **Нет различия между покупочными кликами и кликами на отзывы**  
   `wg_go_to_amazon` срабатывает на все ссылки amazon.com, включая отзывы и страницу продавца. В отчётах они смешиваются.

### 🟡 Средний приоритет

4. **Блог не отслеживается вообще**  
   Нет данных: сколько людей переходит с блога на продуктовые страницы, какие статьи дают конверсии.

5. **Нет `page_source` параметра на Amazon-ссылках**  
   Когда человек жмёт "Buy on Amazon" — неизвестно, с какой страницы сайта он пришёл. Это ключевой вопрос для понимания конверсионного пути.

6. **Meta Pixel ID захардкожен в layout.tsx**  
   Должен быть в `.env` как `NEXT_PUBLIC_META_PIXEL_ID`.

### 🟢 Низкий приоритет

7. **Нет отслеживания варианта продукта при клике**  
   При выборе Echo Home vs Echo B2B в блоке покупки — событие `echo_purchase_buy` не передаёт, какой вариант был выбран.

---

## 7. Что нужно для достижения целей

### Цель 1: Понимать конверсии с разных страниц → Amazon

**Решение:** добавить UTM-параметры или кастомный параметр `page_source` к Amazon-ссылкам.

```
https://amazon.com/dp/B0DJ3BSJ4D?tag=maas&page_source=echo-1-hero
https://amazon.com/dp/B0DJ3BSJ4D?tag=maas&page_source=blog-article
```

Тогда в Amazon Attribution будет видно: с hero section конверсия X%, с блога — Y%.

### Цель 2: Знать, откуда пришёл покупатель

Amazon Attribution + `tag=maas` + разные значения параметров для каждой точки входа. Дополнительно — `wg_go_to_amazon` в GTM можно обогатить параметром `page_url` из `document.referrer`.

### Цель 3: Переходы из блога на продуктовые страницы

Добавить события на блог-страницы:
- `blog_article_view` — просмотр статьи (scroll-view)
- `blog_to_product_click` — клик на ссылку продуктовой страницы из статьи
- `blog_card_click` — клик на карточку статьи с главной / листинга

---

## 8. Рекомендуемый план действий

| # | Задача | Приоритет | Сложность |
|---|---|---|---|
| 1 | Выяснить, какой файл (`EchoHomeClient` или `EchoPageClient`) рендерится в продакшне, и перенести события в нужный | 🔴 высокий | низкая |
| 2 | Добавить `page_source` параметр ко всем Amazon CTA кнопкам | 🔴 высокий | низкая |
| 3 | Добавить `tag=maas` к 9 ссылкам без него | 🔴 высокий | низкая |
| 4 | Разделить `wg_go_to_amazon` на `amazon_purchase_click` и `amazon_review_click` | 🟡 средний | средняя |
| 5 | Добавить события на блог: просмотр статьи, клик на продукт | 🟡 средний | средняя |
| 6 | Вынести Meta Pixel ID в `.env` | 🟢 низкий | низкая |
| 7 | Передавать выбранный вариант продукта в `echo_purchase_buy` | 🟢 низкий | низкая |

---

*Репорт сгенерирован на основе аудита кодовой базы. Конфигурация GTM-контейнера не проверялась — нужен доступ к GTM интерфейсу для полной картины триггеров `wg_*`.*
