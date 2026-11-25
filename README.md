# Next.js + Headless WordPress (multilingual starter)

A lightweight starter for building multilingual sites with **Next.js** on the frontend and **WordPress as a headless CMS**. Content is fetched over **WPGraphQL**, and translations are managed in WordPress with **Polylang**.

I use this setup as the base for client projects that keep WordPress as the editing experience but need a fast, modern frontend.

## Features

- **Headless WordPress via WPGraphQL**: a small fetch helper (`src/lib/wp.js`) with queries for post lists, single posts and slugs
- **Multilingual routing**: `en`, `sr` and `de` out of the box, using Next.js i18n and `[lang]` routes; posts are filtered by Polylang language, and translations are resolved per post
- **Static generation + ISR**: pages are pre-rendered with `getStaticProps` / `getStaticPaths` and revalidated every 60 seconds, so content updates go live without a rebuild
- **SCSS Modules**: component-scoped styles with shared global styles
- **Minimal dependencies**: `next`, `react`, `graphql`, `graphql-request`, `sass`

## Tech stack

Next.js 14 (Pages Router) · React 18 · WPGraphQL · Polylang · SCSS Modules

## Project structure

```
src/
├── components/      # Layout, Header, PostList (each with its own .module.scss)
├── lib/
│   ├── wp.js        # GraphQL client and WordPress queries
│   └── locales.js   # Language names and default locale
├── pages/
│   ├── index.jsx
│   └── [lang]/
│       ├── index.jsx
│       └── blog/
│           ├── index.jsx    # Post list per language
│           └── [slug].jsx   # Single post (ISR, fallback: true)
└── styles/
```

## WordPress requirements

Install and activate these plugins on the WordPress side:

- [WPGraphQL](https://www.wpgraphql.com/)
- [Polylang](https://polylang.pro/)
- [WPGraphQL Polylang](https://github.com/valu-digital/wp-graphql-polylang) (exposes languages and translations in the GraphQL schema)

## Getting started

```bash
git clone https://github.com/Nenad1Kozoder/nextjs-wp-headless.git
cd nextjs-wp-headless
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT
npm run dev
```

Then open http://localhost:3000.

### Configuration

| Where | What to change |
| --- | --- |
| `.env.local` | `NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT` – your WordPress GraphQL URL |
| `next.config.js` | `i18n.locales` / `defaultLocale` and allowed image domains |
| `src/lib/locales.js` | Language labels and flags shown in the UI |

## Used in production

The same architecture powers client sites such as [psg.rs](https://psg.rs) (a law firm's WordPress site migrated to Next.js) and the bilingual [studiomusmula.rs](https://studiomusmula.rs).

## Author

**Nenad Kozoder** – Frontend Developer · [nenad-kozoder.rs](https://nenad-kozoder.rs)
