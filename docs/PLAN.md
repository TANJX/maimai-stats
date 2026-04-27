# Maimai Stats — Vite + React Bootstrap Plan

A plan for porting the existing `prototype/` (Babel-in-the-browser React) into a proper Vite + React + TypeScript app, with a clean data model derived from `maimai-arcade-pricing.md`.

## Goals

1. **Real build pipeline** — Vite + TS, hot reload, type-checked data, no CDN scripts.
2. **Single source of truth** — typed `arcades.ts` dataset that mirrors the markdown 1:1. The markdown stays human-readable; the TS dataset is what the app consumes.
3. **Component decomposition** — split `app.jsx` / `app-shell.jsx` into focused components, one concern each.
4. **Sticker theme only** — port the prototype's `sticker` aesthetic verbatim (cyan halftone field, sticker-puffy outlines, hot pink + yellow accents). Drop the other prototype themes and the floating Tweaks panel; this is a single, opinionated visual.

## Tech choices

- **Vite** with the `react-ts` template.
- **React 19**, function components only. Use the new JSX transform; no `forwardRef` needed (refs are props in 19).
- **TypeScript** — the dataset has lots of optional fields whose presence implies others (e.g. `vipOnly` rows have no `units`, only `vipUnits`); types catch this at the boundary.
- **Tailwind CSS v4** — installed via the `@tailwindcss/vite` plugin (no `tailwind.config.js`; configuration lives in CSS via `@theme`). The sticker palette and fonts are the design tokens; utilities like `bg-bg`, `text-ink`, `border-rule`, `text-pop`, `text-best` resolve directly. No theme-switching machinery.
- **No state library** — `useState` + `useMemo` is plenty for this app.
- **No router** — single-page, scrollable layout.

## Project layout

Recommend putting the Vite app in `app/` so `prototype/` stays as a reference and the markdown stays at the repo root.

```
maimai-stats/
├── maimai-arcade-pricing.md       # source of truth (human)
├── prototype/                     # existing prototype, kept as reference
├── docs/
│   └── PLAN.md                    # this file
└── app/                           # new Vite project
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx
        ├── App.tsx
        │
        ├── data/
        │   └── arcades.ts         # typed dataset (ports prototype/data.js)
        │
        ├── types/
        │   └── pricing.ts         # Arcade, PricingTier, etc.
        │
        ├── components/
        │   ├── Hero.tsx           # title, eyebrow, headline stats
        │   ├── HowToRead.tsx      # definitions section
        │   ├── Leaderboard.tsx    # sort controls + card grid
        │   ├── ArcadeCard.tsx     # per-arcade card (collapsible)
        │   ├── BigNumber.tsx      # the headline $X.XX display
        │   ├── Sparkline.tsx      # SVG pricing curve
        │   ├── TiersTable.tsx     # expanded tier breakdown
        │   ├── ComparisonTable.tsx# side-by-side row
        │   └── Footer.tsx
        │
        ├── lib/
        │   ├── format.ts          # fmt(), fmtCents()
        │   ├── markdown.ts        # renderInline() — **bold** / *em* in notes
        │   └── ranking.ts         # sort helpers (rankBy: practical | best | vip)
        │
        └── styles/
            ├── index.css          # @import "tailwindcss"; + @theme tokens
            └── components.css     # @layer components for sticker treatments
                                   #   (halftone field, puffy outlines, etc.)
```

### Tailwind setup notes

- `npm i -D tailwindcss @tailwindcss/vite` and add `tailwindcss()` to `vite.config.ts` plugins.
- `src/styles/index.css` starts with `@import "tailwindcss";` then declares the sticker design tokens in `@theme { --color-bg: …; --color-ink: …; --color-pop: …; --color-best: …; --color-trap: …; --font-display: …; --font-mono: …; }`. Tokens prefixed correctly (`--color-*`, `--font-*`, `--spacing-*`, etc.) become utility classes automatically (`bg-bg`, `text-ink`, `font-display`).
- Sticker-specific treatments that don't map cleanly to utilities — the cyan halftone field on `<body>`, the puffy double-stroke outlines on cards, sticker drop-shadows on the headline number — live in `@layer components` as a few small named classes (`.halftone-bg`, `.sticker-card`, etc.).
- Prefer utilities for layout/spacing/typography; reach for `@layer components` only when a treatment needs a pseudo-element or is reused 3+ times.

If preferred, the Vite project can live at the repo root instead of `app/`. Either works — `app/` is just cleaner alongside the existing `prototype/`.

## Data structure

The prototype's `data.js` shape is mostly right. The main improvements: stronger types, clearer naming (`crPerRound` → `unitsPerRound` since it's not always credits), and an explicit "headline" object reused for `practical` / `best` / `vipPractical` / `vipBest`.

```ts
// src/types/pricing.ts

/** Sign-flagged or computed annotations on a single tier row. */
export interface TierFlags {
  popular?: boolean;   // sign-flagged "Best Value" / "Most Popular"
  best?: boolean;      // computed: cheapest regular $/round
  vipBest?: boolean;   // computed: cheapest VIP $/round
  trap?: boolean;      // computed: worse $/round than a cheaper tier
  vipOnly?: boolean;   // tier is only purchasable on a VIP card
}

/** One pricing tier. Either regular fields, VIP fields, or both populated. */
export interface PricingTier extends TierFlags {
  spend: number;                  // dollars paid
  units?: number | null;          // units received on regular card
  vipUnits?: number;              // units received on VIP card (if different)
  perUnit: number;                // $/unit (regular pricing baseline)
  perRound?: number | null;       // effective $/round on regular
  perRoundVip?: number | null;    // effective $/round on VIP
  combo?: string;                 // e.g. "+$5" — supercharge add-on label
}

/** A pre-computed headline figure shown in the card. */
export interface PricingHighlight {
  cost: number;
  label: string;                  // e.g. "$55 'Most Popular'", "$110 VIP pack"
}

export interface Arcade {
  id: string;                     // slug
  name: string;                   // "Round 1"
  area: string;                   // "Elizabeth, NJ"

  unitName: string;               // "credits" | "tokens" | "points" — display label

  unitsPerRound: number;          // e.g. 8.4
  unitsPerRoundVip?: number;      // e.g. 6.6 if VIP burns fewer per round

  tiers: PricingTier[];

  practical: PricingHighlight;    // realistic pick — what most people buy
  best: PricingHighlight;         // theoretical floor on regular
  vipPractical?: PricingHighlight;
  vipBest?: PricingHighlight;

  cardFee?: number;               // one-time activation, regular
  cardFeeVip?: number;            // one-time activation, VIP
  membership?: {                  // monthly/annual VIP cost (Gatcha)
    firstMonth?: number;
    ongoingMonth?: number;
    annual?: number;
  };

  pending?: boolean;              // arcade listed but no confirmed data

  notes: string[];                // markdown-ish strings (**bold**, *em*)
}

export interface PricingDataset {
  lastUpdated: string;            // ISO date
  arcades: Arcade[];
}
```

Key derivations the UI does at render time (no need to bake into data):

- **Ranking** — `lib/ranking.ts` sorts arcades by `practical.cost`, `best.cost`, or `vipPractical?.cost ?? practical.cost`.
- **VIP availability** — `vipPractical != null` is the single signal.
- **Trap detection** — `trap` flags stay hand-annotated in the dataset (matches the prototype and the markdown's editorial calls — e.g. Gatcha's $78 tier, GAMEROOM's $5 supercharge). Don't try to compute these from per-unit monotonicity; the calls aren't always strictly numeric.

### A note on derivation

The markdown is the authoring surface. The TS dataset is the runtime surface. They stay in sync **manually** for now — the markdown is short enough, and round-tripping precision-formatted dollar values through a parser is asking for off-by-one-cent bugs. If the dataset grows past ~10 arcades, revisit with a small build script that parses the markdown tables.

### Data confidence rule

Only confirmed numbers go in the dataset. No "ballpark" or "approximate" fields, no caveat badges in the UI: if a value is uncertain, the row is omitted (or marked `pending` with no figures rendered).

Implication for the initial port: **The GAMEROOM** entry in `prototype/data.js` is built on a "ballpark from memory ~17 cr/round" — that's not confirmed. Either drop the arcade entirely or carry it as `pending: true` with no `tiers` / `practical` / `best`, and the UI shows a "data pending — confirm next visit" placeholder instead of numbers.

## Component breakdown

Direct port of `app.jsx` + `app-shell.jsx`, just split along natural seams:

| Component | Owns | Notes |
|---|---|---|
| `App` | top-level layout | Renders `Hero`, `HowToRead`, `Leaderboard`, `ComparisonTable`, `Footer`. |
| `Hero` | eyebrow + headline + 3-stat legend | Reads cheapest from the ranked list (passed in). |
| `HowToRead` | static `<dl>` definitions | No props. |
| `Leaderboard` | sort buttons + card list | Owns `rankBy` (`practical` \| `best` \| `vip`). |
| `ArcadeCard` | one arcade, collapsed/expanded | Owns local `open` and `showVip`. |
| `BigNumber` | dollar display with split int/frac | Pure render. |
| `Sparkline` | SVG curve with flag dots | Pure render; pulls colors from CSS vars. |
| `TiersTable` | expanded tiers + notes | Receives `showVip`. |
| `ComparisonTable` | side-by-side row | Reads the whole ranked + pending list. |
| `Footer` | sig + caveats | Static. |

State that lives where:

- **`rankBy`** — local to `Leaderboard`.
- **Per-card `open`/`showVip`** — local to `ArcadeCard`.

## Migration steps

1. **Scaffold** — `npm create vite@latest app -- --template react-ts` from the repo root, then bump React to 19 (`npm i react@^19 react-dom@^19 && npm i -D @types/react@^19 @types/react-dom@^19`) and install Tailwind v4 (`npm i -D tailwindcss @tailwindcss/vite`).
2. **Wire Tailwind** — add `tailwindcss()` to `vite.config.ts`, create `src/styles/index.css` with `@import "tailwindcss";` and an empty `@theme {}`, import it in `main.tsx`. Confirm a stock utility renders.
3. **Port sticker tokens** — translate the `:root` + `[data-theme="sticker"]` blocks from `prototype/styles.css` and `prototype/themes-pop.css` into a single `@theme {}` block. Ignore the receipt/editorial/circle/prism blocks entirely.
4. **Port the dataset** — translate `prototype/data.js` into `app/src/data/arcades.ts` against the types above. Drop any uncertain rows (see "Data confidence" below) — only confirmed numbers ship.
5. **Port helpers** — `fmt`, `fmtCents`, `renderInline` into `lib/`. Add tests if we want guardrails on `renderInline`.
6. **Port components with utilities** — `Sparkline`, `BigNumber`, `ArcadeCard` from `app.jsx`; `App`, `Hero`, `HowToRead`, `Leaderboard`, `ComparisonTable`, `Footer` from `app-shell.jsx`. Each gets its own file. Convert prototype class names to Tailwind utilities; reach for `@layer components` only for sticker-specific treatments (halftone field, puffy outlines, drop-shadowed headline).
7. **Visual diff against prototype (sticker only)** — open both side by side, fix regressions.
8. **Tighten** — only after parity: collapse near-duplicate utility strings into `@apply`-ed component classes if a pattern appears 3+ times.

## i18n (English + Simplified Chinese)

### Goals

- Toggle the UI between **English** and **Simplified Chinese** with a control in the top-right.
- Persist the choice across reloads (`localStorage`); on first load, default to `navigator.language` if it starts with `zh`, otherwise English.
- Preserve proper nouns verbatim regardless of locale: arcade names, areas/locations, unit names (credits / tokens / points), server tags (Mythos / International), and dollar amounts.
- Translate everything else: hero headline + subhead, section labels, sort buttons, table headers, the Reg/VIP segmented control, badges (best / popular / trap), expand/collapse copy, the per-arcade `notes`, and the footer caveats.

### Options surveyed

| Library | Bundle (gz) | Why fit | Why skip |
|---|---|---|---|
| **react-i18next + i18next** | ~30 KB | De facto standard. Plugins for detection, lazy load, ICU plurals. | Heavy for ~50 strings; we have no plurals, no async loading. |
| **@lingui/react** | ~7 KB | Macro-based extraction, ICU, build-time compile. Nice DX. | Adds a build step; macro setup overhead. Worth it once we cross ~200 strings. |
| **react-intl (FormatJS)** | ~40 KB | Most powerful ICU/MessageFormat surface. | Massively over-spec for this app. |
| **DIY (Context + typed dict)** | ~0 KB | Full TS type safety on every key, zero runtime cost, two languages, no plurals/dates. Cleanly upgradeable later — string keys are portable. | Reinventing tiny pieces of i18next; would hurt at scale. |

### Recommendation: DIY

This app has roughly fifty UI strings, two languages, no pluralization or locale-specific number formatting, no async needs. A typed-dict approach in a small `src/i18n/` module gets us full compile-time key safety and adds ~no runtime weight. If the surface grows past a couple hundred strings or we need plurals/ICU, swapping to react-i18next later is mechanical (string keys are the same shape).

### Module layout

```
src/i18n/
├── types.ts        # Locale = "en" | "zh"; Dict = typeof en
├── en.ts           # source-of-truth shape; Chinese must match
├── zh.ts           # typed as Dict — missing keys fail tsc
└── index.ts        # I18nProvider, useT, useLocale
```

- `useT()` returns `(key, vars?) => string` with a typed key path. Implementation does dotted-path resolution (`t("hero.headline")`) plus `{name}` interpolation.
- `useLocale()` returns `[locale, setLocale]`. `setLocale` writes to `localStorage["maimai-locale"]`.
- `<I18nProvider>` wraps `<App>` in `main.tsx`. State lives at provider level; everything below re-renders when locale flips.
- `LanguageToggle` is a sticker-pill segmented control in the hero eyebrow row, opposite the "Updated YYYY-MM-DD" stamp.

### What gets translated

| Surface | Notes |
|---|---|
| Hero eyebrow tag, headline, subhead | Headline retains `<em>without</em>` emphasis pattern via interpolation tokens. |
| HowToRead `<dt>` / `<dd>` pairs | Keep the structured copy in keys like `howto.practical.term` / `howto.practical.body`. |
| Leaderboard heading + sort labels (Practical / Best case / VIP if avail.) + "Rank by" | |
| ArcadeCard chrome | "Practical", "Best case", "Pricing curve", "Show all tiers & notes" / "Hide …", "Regular"/"VIP" segment, sparkline legend (best / popular / trap). |
| TiersTable | Column headers (Spend / units / $/unit / $/round / VIP), badge labels (best / popular / trap), card-fee fineprint. |
| ComparisonTable | Section heading + column headers. |
| Footer | Caveats prose + "Last walked the floor" / "corrections welcome on @TANJX". |
| `arcade.notes` | The markdown-flavored bullets per arcade — the editorial commentary. Translate alongside the data (see "Data shape changes"). |

### What does NOT get translated

- **Arcade names**: `Round 1`, `River City Gaming`, `Max Funland`, `Gatcha`.
- **Areas / locations**: `Elizabeth, NJ`, `Rahway, NJ`, `FiDi, NY`, `Flushing, NY`.
- **Unit names**: `credits`, `tokens`, `points`.
- **Server tags**: `Mythos`, `International`.
- **Dollar values**: `$55`, `$1.54`, `$0.46`. Currency stays USD; symbol stays `$`.
- **Tier amounts** (`$55`, `$110`) — but the noun "pack" / "VIP pack" surrounding them is translated.

### Data shape changes

Two small refactors to make i18n clean:

1. **`PricingHighlight.label: string` → `{ spend: number; vip?: boolean }`.** The current label string mixes the dollar amount (data) with the descriptor "pack" / "VIP pack" (UI text). After the change, the BigNumber sub-line composes via `t("label.pack", { spend: 55 })` → "$55 pack" / "$55 套餐".
2. **`Arcade.notes: string[]` → `notes: { en: string[]; zh: string[] }`.** Notes are long, editorial, frequently updated, and authored beside the data — keeping them next to `tiers` rather than punting to a dict file is the ergonomic win. The runtime helper `t.notes(arcade)` returns the right array.

### Out of scope (i18n)

- Locale-aware **number / date formatting** — all currency stays USD with `$` prefix; "Last updated YYYY-MM-DD" is ISO-stable across both locales.
- **RTL** layouts — neither target language needs it.
- **Translation extraction tooling** — by hand at this scale.
- **Lazy-loading** dictionaries — both locales ship in the initial bundle (still tiny vs. one external font request).

## Out of scope (for now)

- A markdown → TS build step.
- Theme switching / multiple aesthetics — sticker only.
- Mobile-specific layout work beyond what the prototype already does.
- Adding new arcades or new pricing dimensions.
- Tests beyond a smoke `it renders` per component, unless we add the markdown parser.

## Open questions

- **`app/` vs root?** Recommend `app/`. Decide before scaffolding.
- **The GAMEROOM (American Dream)** — markdown labels its credits/round as "ballpark from memory". Per the data-confidence rule, omit it from the dataset until confirmed in person. The prototype's "data pending" UX can stay as a placeholder mode if we want a slot for it; otherwise drop it entirely.
