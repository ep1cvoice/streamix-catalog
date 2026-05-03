# Streamix

A Netflix-style streaming catalog UI — portfolio project built with React + Vite.

![Preview](./public/streamix-preview.jpg)

## Tech stack

| Tool | Version |
|------|---------|
| React | 19 |
| React Router | 6 |
| Tailwind CSS | 4 |
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
- [x] React Router v6 — 5 routes: `/`, `/movies`, `/series`, `/cartoons`, `/favorites`
- [x] Dark-only theme (`#141414` background, red-600 accent)
- [x] Bebas Neue bold font for logo and headings

### Components
- [x] **Navbar** — fixed top bar with logo, active-link red underline, responsive
- [x] **Hamburger menu** — animated 3-line → X toggle, slide-in drawer from right, backdrop blur overlay, auto-closes on navigation
- [x] **HeroBanner** — full-viewport hero with dual gradient overlays, Watch / Add to List CTAs
- [x] **MovieCard** — poster with hover scale + red glow, type badge, star rating, raw heart button

### Content
- [x] 30 titles across 3 categories (10 movies, 10 series, 10 cartoons)
- [x] Real TMDB poster images for most titles
- [x] Favorites page with empty-state UI

---

## What's planned

### High priority
- [ ] **TypeScript migration** — strict types for content data, component props, hook returns
- [ ] **TMDB API integration** — replace static data with live API calls; add Trending, Top Rated, Now Playing sections
- [ ] **Favorites** — localStorage persistence, count badge on nav heart icon
- [ ] **Trailer modal** — YouTube embed in an overlay; fetch video key from TMDB API; Esc to close, scroll lock, focus trap

### Medium priority
- [ ] **Search** — full-text filter across all categories with debounce
- [ ] **Skeleton loaders** — reusable `SkeletonCard` shown while images/data load
- [ ] **Mobile polish** — test and refine all pages on small screens

### Low priority
- [ ] Genre filter chips on Movies / Series / Cartoons pages
- [ ] Smooth page transitions
- [ ] Animations

---

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx       # Top nav + mobile drawer
│   ├── MovieCard.jsx    # Poster card with hover effects
│   └── HeroBanner.jsx   # Full-viewport hero section
├── pages/
│   ├── Home.jsx         # Hero + content rows
│   ├── Movies.jsx
│   ├── Series.jsx
│   ├── Cartoons.jsx
│   └── Favorites.jsx    # Empty state (logic coming)
└── data/
    └── content.js       # Static catalog — 30 titles with TMDB posters
```
