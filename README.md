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

## What's done

### Core
- [x] React + Vite project setup with Tailwind CSS v4
- [x] React Router v7 — 6 routes: `/`, `/movies`, `/series`, `/cartoons`, `/favorites`, `/search`
- [x] Full TypeScript migration — discriminated union types (`Movie | Show`), strict mode
- [x] Dark-only theme (`#141414` background, red-600 accent)
- [x] Bebas Neue bold font for logo and headings

### Components
- [x] **Navbar** — fixed top bar with logo, active-link red underline, responsive mobile drawer
- [x] **Hamburger menu** — animated 3-line → X toggle, slide-in drawer, backdrop, auto-closes on navigation
- [x] **HeroBanner** — full-viewport auto-rotating hero (5s interval), parallax scroll, dual gradient overlays, Watch / Add to Favorites CTAs
- [x] **MovieCard** — poster with hover scale + red glow, type badge, star rating, heart toggle
- [x] **MovieModal** — Framer Motion shared layout animation (poster morphs from card), trailer embed, full metadata
- [x] **SkeletonCard** — pulse skeleton matching card dimensions, used as lazy-load fallback

### Features
- [x] **Favorites** — localStorage persistence, heart toggle on cards and hero banner, empty-state UI
- [x] **Search** — Netflix-style expanding input in navbar (spring animation), 300ms debounce, `/search?q=` route, results sorted by relevance (title matches first, then genre)
- [x] **Page transitions** — Framer Motion `AnimatePresence` fade between routes
- [x] **Staggered grid animations** — cards animate in with spring on page load
- [x] **Lazy loading** — all pages code-split with `React.lazy` + `Suspense`

### Content
- [x] 30 titles across 3 categories (10 movies, 10 series, 10 cartoons)
- [x] Real TMDB poster images, local hero images for featured titles
- [x] Full metadata per title: cast, director/creator, runtime/seasons, country, language, trailer ID

---

## What's planned

- [ ] **TMDB API integration** — replace static data with live API calls; Trending, Top Rated, Now Playing sections
- [ ] **Genre filter** — swiper row on Movies / Series / Cartoons pages

---

## Project structure

```
src/
├── types/
│   └── content.ts         # Movie | Show discriminated union
├── components/
│   ├── Navbar.tsx          # Top nav + mobile drawer + expanding search
│   ├── MovieCard.tsx       # Poster card with hover effects + favorites
│   ├── MovieModal.tsx      # Detail modal with trailer embed
│   ├── HeroBanner.tsx      # Auto-rotating full-viewport hero
│   ├── PageWrapper.tsx     # Framer Motion page transition wrapper
│   └── SkeletonCard.tsx    # Pulse skeleton for loading states
├── pages/
│   ├── Home.tsx            # Hero + Movies / Series / Cartoons rows
│   ├── Movies.tsx
│   ├── Series.tsx
│   ├── Cartoons.tsx
│   ├── Favorites.tsx
│   └── Search.tsx          # Filtered results from ?q= param
├── context/
│   └── FavoritesContext.tsx
├── hooks/
│   └── useFavorites.tsx    # localStorage sync
├── data/
│   ├── content.ts          # Static catalog — 30 titles
│   └── featuredMovies.ts   # Hero banner rotation list
└── utils/
    └── motionVariants.ts   # Shared Framer Motion variants
```
