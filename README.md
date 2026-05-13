# Streamix

A Netflix-style streaming catalog UI — portfolio project built with React + TS + Vite.

![Preview](./public/streamix-preview.jpg)

## Tech stack

| Tool | Version |
|------|---------|
| React | 19 |
| React Router | 7 |
| TypeScript | 6 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| Vite | 8 |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Features

### Core
- React + Vite project setup with Tailwind CSS v4
- React Router v7 — 7 routes: `/`, `/movies`, `/series`, `/cartoons`, `/favorites`, `/search`, `/browse`
- Full TypeScript migration — discriminated union types (`Movie | Show`), strict mode
- Dark-only theme (`#141414` background, red-600 accent)
- Bebas Neue bold font for logo and headings
- **TMDB API integration** — live data across multiple endpoints; genre ID maps; normalizer layer

### Components
- **Navbar** — fixed top bar with logo, active-link red underline, responsive mobile drawer
- **Hamburger menu** — animated 3-line → X toggle, slide-in drawer, backdrop, auto-closes on navigation
- **HeroBanner** — full-viewport auto-rotating hero (5s interval), parallax scroll, dual gradient overlays, Watch / Add to Favorites CTAs
- **MovieCard** — poster with hover scale + red glow, type badge, TMDB logo watermark, heart toggle
- **MovieModal** — spring entrance animation, trailer embed fetched live from TMDB, full metadata (director/creator, cast, runtime/seasons, country)
- **SkeletonCard** — pulse skeleton matching card dimensions, used as lazy-load fallback
- **ScrollRow** — horizontal slider with native `scrollBy` arrows, hidden scrollbar, staggered card entrance, "See All" link per row

### Pages & features
- **Home** — HeroBanner + horizontal rows: Upcoming, Now Playing, Top Rated, then genre rows (Drama, Action, Sci-Fi, etc.) built from live TMDB data
- **Movies / Series / Cartoons** — full-page grid from TMDB popular endpoints
- **Favorites** — localStorage persistence, heart toggle on cards and hero banner, empty-state UI
- **Search** — expanding input in navbar (spring animation), 700ms debounce, TMDB `/search/multi` endpoint, skeleton loading, relevance-sorted MovieCard grid
- **Browse** — "See All" destination; handles predefined lists (`?list=top-rated / now-playing / upcoming`) and genre filters (`?genre=Action`)
- **Trailer modal** — YouTube embed fetched from TMDB on modal open; prefers official trailer, falls back to any trailer or teaser
- **Live metadata** — cast, director/creator, runtime/seasons, country fetched from TMDB detail endpoint on modal open
- **Page transitions** — Framer Motion `AnimatePresence` fade between routes + scroll-to-top on navigation
- **Staggered animations** — grid and slider cards animate in with spring on page load
- **Lazy loading** — all pages code-split with `React.lazy` + `Suspense`

---

## Project structure

```
src/
├── types/
│   └── content.ts              # Movie | Show discriminated union
├── api/
│   └── tmdb.ts                 # Fetch helpers, genre maps, normalizers, search, video, detail endpoints
├── hooks/
│   ├── useTMDB.ts              # Generic fetch hook → { items, loading, error }
│   └── useFavorites.tsx        # localStorage sync
├── components/
│   ├── Navbar.tsx              # Top nav + mobile drawer + expanding search with debounce
│   ├── MovieCard.tsx           # Poster card with hover effects + favorites
│   ├── MovieModal.tsx          # Detail modal with live trailer + metadata
│   ├── HeroBanner.tsx          # Auto-rotating full-viewport hero
│   ├── ScrollRow.tsx           # Horizontal genre slider with arrow buttons + See All link
│   ├── PageWrapper.tsx         # Framer Motion page transition wrapper
│   └── SkeletonCard.tsx        # Pulse skeleton for loading states
├── pages/
│   ├── Home.tsx                # HeroBanner + Netflix-style rows
│   ├── Movies.tsx
│   ├── Series.tsx
│   ├── Cartoons.tsx
│   ├── Favorites.tsx
│   ├── Search.tsx              # Live TMDB search results
│   └── Browse.tsx              # Full grid for list or genre filter
├── context/
│   └── FavoritesContext.tsx
├── data/
│   └── featuredMovies.ts       # Hero banner rotation list (static, curated)
└── utils/
    ├── motionVariants.ts       # Shared Framer Motion variants
    └── groupByGenre.ts         # Groups ContentItem[] by primary genre
```
