# fsia.in: migration plan, PHP → Laravel + React

Status: draft, 4 Nov 2026. Nothing has been built in this repository yet.

The current site and its admin panels keep running until each part has a tested replacement.
Parts move over one at a time, and each move can be undone.

How sure each fact is:

- **Checked**: read from the live site or from the PHP files in `Hackerboy19/form-fsia`.
- **Reported**: written by earlier Claude sessions on other `form-fsia` branches. Their docs and code are useful
  but may describe what they assumed. Confirm against the live server before relying on them.
- **Unknown**: needs the live source or database.

---

## 1. What exists today

### Public website (checked)

`sitemap-complete.xml` lists **4,332 URLs**. The full list is in `docs/inventory/sitemap-urls.txt`.
They come from about 15–20 page templates.

| Group | URLs | Examples |
| --- | ---: | --- |
| Profiles of people (winners, contestants, awardees) | ~4,100 | `miss-tamil-nadu-2022-rakshya`, `verified_user_details_women.php?…` |
| Registration forms | 72+ (64 state forms + event forms) | `miss-delhi.php`, `mrs-goa.php`, `miss-world-beauty-pageant.php` |
| Event, award and pageant pages | ~23 | `fsia-awards.php`, `super-woman-award.php`, `forever-star-kids-contest.php` |
| Galleries and listings | ~17 | `model-gallery`, `achievers-gallery`, `grand-finale-finalists` |
| Core pages | ~15 | `index.php`, `about.php`, `contact.php`, `FAQ.php`, `our-teams.php`, `privacy-policy.php` |

Some URLs end in `.php` and some do not (`refund-policy`, `channel-partner`). Every one of them must keep working.

### Registration forms (checked)

- 72 form files in `form-fsia`. They are near-copies of each other: the same HTML, OTP code and fee box.
- They post to 7 save scripts: `savemissindia-new.php` (32 forms), `savemrsindia-new.php` (32), `savefashiondesigner.php` (4),
  `saveworld.php`, `save_makeup_artist.php`, `save_channel-partner.php`, `save-bharat-couture-week.php`.
  The save scripts themselves are not in the repository.
- Fields: `fname` or `firstName` (the full name), `mobile`, `email`, `dob` + `birthday` / `birthmonth` / `birthyear`, `age`,
  `city` or `cityfsia`, `state`, `landing`, `fsia_source`. Miss World also posts `country`, `ccode`, `mobile_local` and `ncategory`.
  Earlier versions of some forms also asked for `education`, `totalmarks`, `instname`, `brandname`, `workexpr`,
  `address`, `kyc`, `comment` and `password`.
- OTP over WhatsApp, through a ClickChat webhook written into 67 of the form files.
- Page text, SEO and the fee box come from the `more_pages` table, by `page_name` id.
- **The repository is behind the live site.** Miss World is live but not in the repository, and `fsia_source` is live but
  not in the repository's copies.

### Admin panels (four of them today)

| Panel | Where | What it does | Source |
| --- | --- | --- | --- |
| Old admin | `fsia.in/fsiaadmm21` | Registrations, payments, pages and more | **Unknown**: not in any repository I can see |
| Read-only dashboard | `fsiaadmm21/new-panel` | Counts per event and payment status | Reported (`form-fsia` branch `claude/project-thread-j8o74j`) |
| CMS admin | `/cms-admin/` | SEO, homepage sections, team, news, uploads, Site Check, Profile Changes | Reported (`claude/gallant-mayer-hgabky`, React 18 + Vite + PHP API) |
| starindia admin | `starindia.fsia.in/admin` | starindia profiles | Built separately; only an add-on script is in git |

There is also a redesign of the admin in `form-fsia/admin-redesign` (merged in PR #13). It covers registrations, payments,
team roles and the activity log, with a PHP API and tests. This plan reuses its screens, rules and tests.

### Database (MySQL)

| Table | What it holds | Source |
| --- | --- | --- |
| `registration` | Every registration: `id`, `first_name`, `last_name`, `regtype`, `status`, `date_of_reg`, `pdate`, … | Reported (new-panel code) |
| `adminweb` | Old admin users: `id`, `uname`, `name`, `password` (plain text or md5), `atype` (1 = Super Admin) | Reported |
| `more_pages` | SEO, text and fee box per page (`page_name`, `meta_title`, `descritpion`, `app_fee`, …) | Checked |
| `otp_verifications` | `id`, `mobile`, `otp_code`, `expires_at`, `is_verified` | Checked |
| `city` | City list for the forms | Checked |
| `pages_seo`, `page_sections`, `team_members`, `news_coverage` | CMS content | Reported |
| `site_monitor_*` | Site Check tool | Reported |

Event codes in `registration.regtype` (reported): 6 Forever Miss India, 7 Forever Mrs India, 8 The Real Super Heroes,
9 The Real Super Woman Awards, 13 Forever Miss Teen India.
Payment states in `registration.status` (reported): 0 Unpaid. For awards: 1 Paid, 3 Title.
For pageants: 2 Semi Paid, 1 Full Paid.

### Hosting

The current site is PHP 8.3 on a shared host (Hostinger; Plesk was mentioned earlier). The new hosting is not chosen yet (see §3).

---

## 2. Fix now, before any migration

These cannot wait for the new site:

1. **Make the repositories private.** `form-fsia` and `fsia-laravel` are public. `form-fsia` contains the ClickChat
   webhook URL in 67 files, so anyone can read it.
2. **Rotate the ClickChat webhook.** Create a new one, update the live forms, then delete the old one. Until then
   anyone can send WhatsApp messages from your account.
3. **Limit the OTP sender.** The earlier audit reports no send or guess limit. Add a per-number and per-IP limit.
4. **Back up** the database and the whole web root before anything else, and keep a copy offline.
5. **Put the live source in git.** The old admin, the save scripts, the header and footer files and every live page.
   The account has private repositories called `fsia-php`, `fsia-platform` and `fsia`. If one of them is the live
   site, that is the starting point; otherwise download the web root (§8).

---

## 3. Target

| Layer | Choice |
| --- | --- |
| Backend | Laravel 11, PHP 8.3 |
| Frontend | React 18 + TypeScript through **Inertia.js** (one app, no separate API needed), Vite, Tailwind |
| Database | The **existing MySQL database**. Eloquent models read the current tables as they are. New tables come only from Laravel migrations. |
| Auth and roles | New `users` table with hashed passwords. Roles and permissions use the six roles of `admin-redesign` (Super Admin, Manager, Registration team, Content editor, Accounts, Viewer), with state limits per user. |
| Forms | One form component plus one config per event, instead of 72 copies. Laravel validation, CSRF, rate limits. |
| OTP / WhatsApp | One OTP service (rate limits, attempt lockout, `random_int`) behind a ClickChat adapter. The key lives in `.env`. |
| SEO | Same URLs (including `.php`), titles, canonicals and JSON-LD. Sitemap built from the database. |
| Tests | Pest feature tests, Playwright for the browser, a URL check that every one of the 4,332 URLs answers 200 or 301 |

### The hosting decision

React pages are only safe for Google when the server sends finished HTML (server-side rendering, SSR).
SSR needs a Node process next to Laravel.

| | Hostinger VPS / Cloud | Hostinger shared |
| --- | --- | --- |
| Laravel | Yes | Yes (needs SSH and Composer, available on Business plans) |
| React for the admin | Yes | Yes (built files only) |
| React public pages with SSR | Yes (Inertia SSR) | **No** Node process |
| Public pages on shared | — | Laravel Blade templates (server HTML), React only for interactive parts |
| Queues, scheduled jobs | Supervisor + cron | cron only (`schedule:run`, database queue) |

The code is written so both work: business logic lives in Laravel services, pages share components, and SSR is
switched on later if the site moves to a VPS. **Decide before Phase 4** (public pages).

---

## 4. How the switch-over works

The new Laravel app sits next to the old PHP site, on the same domain and database.
An `.htaccess` route list (or Cloudflare, if you put it in front) sends finished URL groups to Laravel and
everything else to the old PHP files.

```
visitor ─► fsia.in ─► .htaccess route list ─┬─► Laravel (migrated groups)
                                            └─► old PHP files (everything else)
                       both use the same MySQL database
```

Each phase moves one group. Rolling back means removing that group from the route list.
Old PHP files are deleted only 30 days after their group moved, with no errors in that time.

---

## 5. Phases

Time ranges assume one developer working with Claude. They depend most on getting the live source (§8).

### Phase 0: safety (≈1 week)

§2: private repos, new webhook, OTP limits, backups, live source in git.
**Done when** the old webhook no longer works and the live source is in a private repository.

### Phase 1: foundation (1–2 weeks)

- Laravel 11 + Inertia + React + TypeScript + Tailwind in this repository, with CI running the tests on every push.
- `.env` per environment. A **copy** of the production database for development and staging, never production itself.
- Eloquent models for `registration`, `more_pages`, `otp_verifications`, `city`, CMS tables. Read-only at first.
- Users, roles, permissions, state limits, activity log, sign-in with lockout.
- Import the `adminweb` users with a forced password reset. Never keep their plain or md5 passwords.

**Done when** a member can sign in, permissions are checked on the server, and the tests run in CI.

### Phase 2: one admin (3–5 weeks)

Rebuild the admin in React on Laravel, by bringing in the features of all four panels:

- From `admin-redesign`:
  - Dashboard, Registrations (filters, profile panel, data checks, CSV)
  - Offer and payment, assignment, notes
  - Forms & Pages (`more_pages`), OTP log, Team & Access, activity log
- From the old admin: everything it does that is not listed above.
  - This needs its source, or screenshots of every screen (§8).
  - Old payment states (Unpaid / Paid / Semi Paid / Full Paid / Title) are shown exactly as stored.
- From the CMS admin: SEO, homepage sections, team directory, news, uploads, Site Check, Profile Changes.
- starindia profiles: link out first, merge later (Phase 5).

The old admin stays available read-only until a parity checklist (from `form-fsia/admin-redesign/FEATURE-CHECKLIST.md`)
is all ticked against real data.

**Done when** the team works only in the new admin for two weeks without needing the old one.

### Phase 3: registration forms (2–3 weeks)

- One form component; one config per event (fields, fee box, `regtype`, `more_pages` id).
- Saves into `registration` with the same columns the save scripts use today, so old reports keep working.
- OTP service with limits; ClickChat adapter; success page; spam protection.
- Move form groups one at a time: one state form first, then all state forms, then the event forms.

**Done when** every form URL is served by Laravel, saved rows match what the old scripts saved, and OTP limits hold.

### Phase 4: public pages (3–5 weeks)

- Templates for: home, about, team, news, FAQ, contact, policies, event pages, galleries and listings,
  and the profile pages (~4,100 URLs).
- Profile pages cached (they change rarely). The sitemap is generated from the database.
- Same URLs. Duplicate URLs (www / starindia) get one canonical and a 301.
- Motion and the new design from `form-fsia` (`assets-new/css/fsia-motion.css`) carried over as React/Tailwind components.

**Done when** a crawl of all 4,332 URLs on staging matches production: status, title, canonical, H1 and JSON-LD.

### Phase 5: starindia and the rest (2–4 weeks)

starindia profiles, Site Check, premium plans, events and promotions, analytics. Each needs a business decision first.

### Phase 6: final switch (1 week, then 30 days of watching)

Every group is served by Laravel, the old admin is turned off, and 404s and Search Console are watched daily.
After 30 clean days the old PHP files are archived and removed.

---

## 6. Protecting SEO

- `docs/inventory/sitemap-urls.txt` becomes a test: every URL must answer 200, or 301 to its new home.
- Titles, descriptions, canonicals, H1s and JSON-LD are compared old vs new for every template before its group moves.
- `.php` URLs stay as they are. A change of URL style, if ever wanted, is a separate project with 301s.
- Page speed is measured per template (Core Web Vitals) before and after.

## 7. Risks

| Risk | What reduces it |
| --- | --- |
| Live code is missing from git, so features get missed | Phase 0 puts it in git; nothing old is removed until its parity checklist is ticked |
| Data written differently by the new forms | Save into the same columns; compare a week of rows old vs new |
| SEO drop | Same URLs, crawl comparison before every move, 30-day watch |
| Shared hosting limits (no SSR, no long jobs) | Hosting decision before Phase 4; code works on both |
| Four admins with overlapping data | One admin in Phase 2; old ones read-only, then off |
| Weak old passwords | Forced reset on import; old password columns never read again |

## 8. What I need from you

1. **The live source.** Is `fsia-php` (or `fsia-platform`, or `fsia`) the current site? If so, add it to this session.
   If not, download `public_html` from Hostinger without the config files that hold passwords.
2. **The database structure.** From phpMyAdmin: Export → Custom → "Structure" only, no data.
3. **The hosting choice** (§3): VPS / Cloud or shared, before Phase 4.
4. **Old admin screens.** Screenshots of every screen of `fsiaadmm21`, if its source cannot be found.
5. **Payments.** Which gateway is used, and how payment links are made today.
6. **starindia.** Who runs it, and whether it should join the new admin.

## 9. Next steps

1. You: Phase 0 items 1–2 (private repos, new ClickChat webhook) today.
2. You: the live source and the database structure (§8, items 1–2).
3. Me: Phase 1 in this repository on a branch, with a pull request for each step.
