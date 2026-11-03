# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # frontend at localhost:5173 (proxies /api to localhost:3001)
npm run server     # API at localhost:3001 (tsx watch; restart manually after editing server/.env)
npm run build      # frontend production build
npm run lint       # ESLint, root config covers only .js/.jsx, so TS files are not linted
npx tsc --noEmit   # frontend typecheck; 4 known errors in MovieModal.tsx (Movie | Show field access)

npm --prefix server run typecheck
npm --prefix server run build   # tsc → server/dist
```

Package manager is npm (both `package-lock.json` files); the server has its own `package.json` in `server/`.
No test runner is configured. `server/requests/*.rest` are VS Code REST Client files for manual API checks.

## Stack

- **Frontend**: React 19 + Vite 8, TypeScript (strict), React Router v7 (`BrowserRouter`), TanStack Query 5, Framer Motion 12, lucide-react icons
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (`@import "tailwindcss"` in `src/index.css`, no config file)
- **Bebas Neue** from Google Fonts in `index.html`, applied with an inline `style` prop, not a Tailwind class
- **API** (`server/`): Express 5 + TypeScript (ESM, NodeNext: relative imports end in `.js`), Mongoose 9 on MongoDB Atlas, Zod 4, bcrypt, jsonwebtoken, helmet, express-rate-limit

## Architecture

### Content
Catalog data comes live from TMDB through `src/api/tmdb.ts` (key in root `.env` as `VITE_TMDB_KEY`), normalized into `ContentItem = Movie | Show` (`src/types/content.ts`). `type` is `'movie' | 'series' | 'cartoon'`; the TMDB media type is `movie` for movies and `tv` for the rest.
TMDB ids are unique only per media type, so list items are identified by media type + id (`isSameItem` in `src/api/lists.ts`), never by `id` alone.

### Auth and lists
- The frontend calls only same-origin `/api` (`src/api/client.ts`): Vite proxy in dev, Vercel rewrite in prod (`vercel.json`). This keeps the session cookie first-party.
- Session: JWT in an httpOnly `token` cookie, SameSite=Lax, 7 days, `Secure` when `NODE_ENV=production` (`server/src/utils/session.ts`). Logout only clears the cookie; tokens are not revoked server-side.
- `useAuth` / `AuthContext` restore the session from `GET /api/auth/me`. `RequireAuth` guards `/favorites` and `/watch-later`.
- Lists: `useUserList(list)` (TanStack Query, key `['lists', userId, list]`) with optimistic toggles; mutations share a `scope` per list so they reach the server in order. `useFavorites` / `useWatchLater` wrap it, and the existing contexts expose them.
- Guests clicking ♡ or the clock are sent to `/login?redirect=...`. `useLegacyListsImport` moves pre-account localStorage lists (`favorites`, `watchLater` keys) into the account once.
- Sign-out runs the auth state change and `navigate('/')` in one `startTransition`, and `RequireAuth` skips redirecting while its page is animating out (`useIsPresent`). Without both, the exiting protected page redirects to `/login` over the navigation home.

### API (`server/src`)
- `index.ts` connects to MongoDB, then listens; `app.ts` holds the middleware and routes.
- Routes: `/api/health`, `/api/auth/{register,login,logout,me}`, `/api/lists/:list` (GET), `/api/lists/:list/:mediaType/:tmdbId` (PUT idempotent, DELETE), `/api/lists/import` (POST). `:list` is `favorites` or `watch-later`.
- Validation: Zod `schema.parse()` in controllers; `errorHandler` turns `ZodError` into `400 { error, fields }`, which `AuthForm` shows per field.
- Models: `User` (unique email), `ListItem` (unique `user + list + mediaType + tmdbId`, card snapshot in `item`, explicit `addedAt`).
- Env (`server/.env`, see `.env.example`): `MONGODB_URI`, `JWT_SECRET`, `PORT`, `TRUST_PROXY` (proxy hops in front of the app; verify with the `ip=` part of the access log after deploy).

### Routing
Ten routes in `src/App.tsx`, all lazy-loaded, inside `AnimatePresence mode='wait'`. Navbar has 6 links plus search and the account menu. It is tight at `md` and `lg`: check widths 768 and 1024 with the search open after changing it.

### Gotchas
- In a hidden or background browser tab, Framer Motion exit animations don't finish, so route changes look stuck. Verify UI flows in a visible tab (taking screenshots advances frames).
- Featured hero images are bundled assets; `toSnapshot` in `src/api/lists.ts` drops non-https `hero` values before saving.

## Deployment
Vercel (frontend, `vercel.json` rewrites `/api/*` to Render plus the SPA fallback) → Render (`server/`, build `npm ci --include=dev && npm run build`, start `npm start`, health `/api/health`) → MongoDB Atlas. The free Render tier sleeps after ~15 min idle.
