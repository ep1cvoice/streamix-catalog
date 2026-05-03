# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server at localhost:5173
npm run build      # production build
npm run lint       # ESLint check
npm run preview    # preview production build
```

No test runner is configured.

## Stack

- **React 19** + **Vite 8** (uses Oxc for JSX compilation via `@vitejs/plugin-react`)
- **Tailwind CSS v4** — configured via `@tailwindcss/vite` Vite plugin, not PostCSS. Import is `@import "tailwindcss"` in `src/index.css`. No `tailwind.config.js` exists.
- **React Router v7** (`react-router-dom`)
- **Bebas Neue** loaded from Google Fonts in `index.html` — applied via inline `style` prop, not a Tailwind class

## Architecture

### Data flow
All content lives in `src/data/content.js` as three named exports: `movies`, `series`, `cartoons` (10 items each). Each item has: `id`, `title`, `year`, `rating`, `genre` (string), `type` (`'movie'|'series'|'cartoon'`), `poster` (URL), `description`. Some items also have a `hero` field (landscape URL) — `HeroBanner` falls back to `item.poster` when absent.

Poster URLs are a mix of TMDB CDN (`https://image.tmdb.org/t/p/w1280/...`) and picsum placeholders. No API calls are made — everything is static.

### Routing
Five routes in `src/App.jsx`: `/`, `/movies`, `/series`, `/cartoons`, `/favorites`. `Navbar` uses `useLocation` to auto-close the mobile drawer on navigation.

### Component contracts
- `HeroBanner` — receives a single `item` object. Derives its background from `item.hero ?? item.poster`. Uses `object-top` so portrait TMDB posters anchor at the top.
- `MovieCard` — receives a single `item`. Type badge resolves via a lookup object `{ movie, series, serial, cartoon }`. Heart button is raw UI with no logic yet.
- `Navbar` — self-contained, manages its own `isOpen` state. Desktop links hidden below `md` breakpoint; hamburger shown instead.

## Planned work (from README)
- TypeScript migration
- TMDB API integration (replace static data)
- Favorites with localStorage
- Trailer modal (YouTube embed, fetched from TMDB)
- Search with debounce
- Skeleton loaders
