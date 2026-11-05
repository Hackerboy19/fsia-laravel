# fsia.in redesign: React preview

A design preview of the new fsia.in, built with React 18, TypeScript, Vite, Tailwind and Framer Motion.
It is for review only: it has no backend, and forms do not send anything.

Pages: Home, About (`/about.php`), Our Team (`/our-teams.php`), FAQ (`/FAQ.php`), Contact (`/contact.php`).
They keep the live site's URLs. Links to pages that are not rebuilt yet open the current fsia.in page.

## Not for search engines

The preview must not be crawled or indexed:

- `index.html` has `<meta name="robots" content="noindex, nofollow">`
- `vercel.json` sends `X-Robots-Tag: noindex, nofollow, noarchive` on every response
- `public/robots.txt` disallows all crawling
- a banner on every page says it is a preview

For a stronger lock, turn on **Vercel → Settings → Deployment Protection** (Vercel Authentication or a password)
for production as well, so only people you invite can open it.

## Content

Text, names and photos come from the live fsia.in pages (home, about, our-teams, contact, FAQ) and live in
`src/content/`. Images are loaded from `https://www.fsia.in`.

Known gaps carried over from the live site:

- The live homepage shows a photo of a different person next to "Arbaaz Khan"; the preview shows his initials
  until the right photo is supplied.
- The live pages name two venues: "Zee Studio Jaipur" (coronation, homepage) and "The Fern Nest by Marriott, Jaipur"
  (Grand Finale 8–10 Jan 2027, team page). The preview shows both as they appear; confirm which is current.

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Deploy to Vercel

1. Vercel → **Add New → Project** → import `Hackerboy19/fsia-laravel`.
2. **Root Directory**: `frontend`. Framework Preset: **Vite** (detected). Build command `npm run build`, output `dist`.
3. Deploy. Every push to a branch gets its own preview URL.

## Later

The components in `src/components` and `src/pages` are plain React. They move into Laravel + Inertia
(`resources/js`) when the backend is built, with the content coming from the database instead of `src/content`.

## Admin preview (`/admin/`)

`public/admin/` is a copy of the admin redesign from the `form-fsia` repository (`admin-redesign/`, commit
`3c6c304`). It runs on sample data: on Vercel there is no `api/`, so it stays in preview mode. Edit it in
`form-fsia` and copy it again; do not edit it here.

```bash
cp -r ../../form-fsia/admin-redesign/{index.html,css,js} public/admin/
```

`vercel.json` sends `/admin` to `/admin/` (the admin uses relative paths) and keeps `/admin/` out of the
website's catch-all rewrite. The admin pages get the stricter headers from the admin's own `vercel.json`.

