# Garage Sites - Project Handover

Four separate Next.js websites (BMW, Mercedes, Jaguar, Land Rover) that sell engine rebuilds and replacements. They share one code design, one lead pipeline and one content model. Each has its own repo, Vercel project, domain, accent colours and photography.

Everything needed to build and run a site is in its repo. Environment variables are listed by **name only** (`.env.example` in each repo); the values are in the Vercel project settings. This file is `HANDOVER.md` in the root of all four repos.

---

## 1. Overview

| Site | Live domain | GitHub repo | Vercel project |
|---|---|---|---|
| BMW Garage | bmwgarage.uk | [Engine-Finders/bmw-gs](https://github.com/Engine-Finders/bmw-gs) | bmw-gs |
| Mercedes Garage | mercedesgarage.uk | [Engine-Finders/mercedes-gs](https://github.com/Engine-Finders/mercedes-gs) | mercedes-gs |
| Jaguar Garage | jaguargarage.uk | [Engine-Finders/jaguar-gs](https://github.com/Engine-Finders/jaguar-gs) | jaguar-gs |
| Land Rover Garage | landrovergarage.co.uk | [Engine-Finders/landrover-gs](https://github.com/Engine-Finders/landrover-gs) | landrover-gs |

- All repos use the `main` branch. A push to `main` deploys to Production on Vercel automatically.
- **Land Rover is the most complete site and is the reference implementation.** When unsure how something should work, copy how Land Rover does it.
- A fix made on one site usually has to be copied to the other three (see section 11).

**Core flow:** a visitor lands on a model, variant or engine page, enters a registration plate (looked up through a vehicle-data API), and submits a quote form. The form posts to the site's own `/api/send-lead` route, which emails the sales team through a PHP mail relay and, in parallel, saves the lead to a central Supabase CRM. A password-protected `/leads` page lists each site's leads.

---

## 2. Where things live

Paths are relative to the repo root (the same layout in all four repos):

| Path | What it is |
|---|---|
| `src/app/<slug>/page.js` | One folder per page (model, variant, engine, guide, core pages), plus `api/`, `leads/`, `get-quote/`, `blog/`, `sitemap.js`, `robots.js` |
| `src/app/api` | Route handlers: `send-lead`, `vrm`, `leads` (+ `login`, `logout`), `revalidate` |
| `src/components/home`, `model`, `variant`, `engine-family`, `shared`, `reusable`, `blog` | UI components, grouped by page type |
| `src/data/home`, `model`, `variant`, `engine-family`, `authority`, `core`, `shared` | JSON content for every page (copy, prices, links, image paths). This is the single source of truth for page content |
| `src/data/vehiclePhotos.json` | Index of the vehicle photo library used by the plate look-up |
| `src/lib` | `leads.js`, `leadsAuth.js`, `vrmLookup.js`, `vehiclePhoto.js`, `vehicleImageMatch.js`, `vehicleTitle.js`, `partImage.js`, `cms.js`, `schema.js`, `seo.js`, `site.js` |
| `public` | Every image, icon, font and logo the site uses |
| `scripts` | `build-part-index.mjs` (runs automatically before `dev` and `build`) and `verify_site.py` (static checks of routes, links, metadata, sitemap; add `--crawl` to hit a running server on localhost:3000) |
| `.env.example` | The environment variable names |

---

## 3. Technology

| Area | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.3 (App Router), React 19.2 | Breaking changes versus older versions; check the docs in `node_modules/next/dist/docs/` before using an unfamiliar API |
| Styling | Tailwind CSS v4 | CSS-first config in `src/app/globals.css`. The important modifier is a trailing `!` (e.g. `text-[11px]!`) and `group-has-[...]/name:` variants work |
| Images | `next/image` + static webp | Optimised images are cached by path. `next.config.mjs` must list allowed `qualities` before `quality={90}` is used |
| Fonts | Barlow for titles | Variant page titles are `font-bold`, not extrabold |
| Server code | Route handlers in `src/app/api` | |
| Hosting | Vercel (team `engine-finders-projects`) | `vercel ls` inside a site folder lists deployments |
| Mail | PHP relay on cPanel | Vercel cannot use SMTP reliably, so mail goes over HTTP |
| CRM | Supabase Edge Function + REST | Shared lead store |
| Blog | Company CMS (REST) + webhook revalidation | Posts cached with tags |

The integrations are the mail relay, the CRM, the vehicle-data API and the CMS (section 6).

---

## 4. How a site is built

Pages are **data-driven**: a page file imports a numbered set of section components and a matching set of JSON files. To change copy, prices, links or images, edit the JSON, not the components.

| Page type | URL pattern | Components | Data |
|---|---|---|---|
| Home | `/` | `components/home/HomeSecN` | `data/home/homeSecN.json` |
| Model page | `/defender-engines`, `/range-rover-engines` ... | `ModelHeroSec1` + `ModelSec2..18` | `data/model/<prefix>SecN.json` (N = 1-18) |
| Variant page | `/landrover-defender-d250-engines` | `VariantHeroSec1` + `VariantSec2..13` | `data/variant/<prefix>SecN.json` |
| Engine-family page | `/landrover-aj300d-engine` | `HeroSec1` + `Sec2..11` | `data/engine-family/<prefix>SecN.json` |
| Guide / authority pages | `/landrover-engine-rebuild` ... | `AuthorityPage` | `data/authority/<slug>.json` |
| Core pages | `/about`, `/contact`, `/financing`, `/warranty`, `/privacy-policy`, `/terms-and-conditions`, `/pricing-legal-disclaimer`, `/models`, `/variants`, `/engines` | `DirectoryPage`, `LegalPage` | `data/core/*.json` |
| Quote page | `/get-quote` | `GetQuoteClient` | URL query (`vrm`, `year`, `brand`, `series` ...) |
| Blog / guides | `/blog`, `/guides` | `components/blog` | from the CMS |
| Leads admin | `/leads` | `LeadsClient`, `LeadsLogin` | CRM via `/api/leads` |

**Model page section map** (same on all four sites):
1 hero (kicker, h1, plate look-up, trust bar, price card, call card, rating bar) -
2 known-issue block -
3 "starting from" price cards + quote banner -
4 full price guide table -
5 why rebuild instead of swap -
6 trust metrics -
7 workshop gallery -
8 reviews -
9 plate look-up / browse by -
10 most popular rebuilds (cards) -
11 why owners choose us -
12 recent jobs -
13 how it works -
14 used-engine note -
15 coverage by model year + checklist -
16 engine sizes, fuel types, services -
17 full variant coverage tabs -
18 FAQ + on-page quote form.

Each model component has a **mobile block** (`md:hidden`) followed by a **desktop block** after the marker `{/* ===== desktop ===== */}`. Both render in the DOM and CSS hides one. Mobile-first is the default: build and fix mobile unless told "desktop".

**Shared building blocks** (`components/reusable`): `Icon` (CSS-mask icons from `public/icons`, mapped in `iconMap.js`), `RegPlate` (yellow UK plate input), `QuoteRegField` (plate + look-up + vehicle card inside quote forms), `FormSelect` (custom dropdown replacing native selects), `RegLookupForm` / `RegLookupGlass` / `useRegLookup` (hero look-ups), `useLeadForm` + `LeadStatus`, `PhotoStripes` and the brand stripe components, `ExpandGrid` ("View More").

**Shared pieces** (`components/shared`): `Navbar`, `Footer`, `QuoteModal` + `QuotePopup` (the pop-up quote form; any `#quote*` link opens it through `QuoteLink`), `StickyQuoteCta` (floating "Get Free Quote" button), `QuoteForm`, `ImageLightbox`, `JsonLd` (schema.org), `DirectoryPage`, `AuthorityPage`, `LegalPage`.

**Theming:** wrap a section root in `theme-dark` or `theme-light` (defined in `globals.css`, driven by `--color-hero-dark`, `--color-light-surface`, `--color-hero-blue`). Despite its name, `hero-blue` is the brand accent colour on every site (olive on Land Rover, silver/gold on Mercedes, blue on BMW).

**Brand differences:**
- BMW: three-colour stripes (blue, violet, red), drawn in an inline SVG in `ModelSec11`.
- Land Rover: two flat olive bands via `PhotoStripes` presets.
- Mercedes: silver and gold bands.
- Jaguar: silver and black bands, drawn over a photo that already contains baked-in stripes.

---

## 5. Content

Page content lives in `src/data/**` JSON. Edit it there; there are no generators in the repos, and pages carry hand edits (coverage checklists, links, specs, images, naming).

- **Naming rule:** Range Rover, Range Rover Sport, Velar and Evoque are never prefixed with "Land Rover" in visible text. "Land Rover" stays for Defender, Discovery, Discovery Sport and Freelander. URLs and image filenames keep their original names.
- **Dashes rule:** no em or en dashes in visible text. Use a plain hyphen (year ranges stay as `1983-2016`).
- **Client wording:** prices, counts and claims (engines rebuilt, rating, warranty, recovery price, turnaround) are client text. Do not change them without the client. If client text contains a factual error (for example a TDV6 listed as an I6), keep the wording and flag it.

**Adding or changing a model page:** copy the nearest model's 18 JSON files to a new prefix and edit the text (hero, issue, prices, variants, generations, FAQ). Copy its `page.js` to `src/app/<slug>/page.js`, point the imports at the new prefix and set the title, description and `PATH`. Then add the page to the navbar, footer, models directory (`data/core/models.json`), `data/shared/siteRoutes.json` and the engine explorer if needed. The sitemap builds itself from the route folders. The Land Rover Range Rover page is the worked example.

---

## 6. Lead pipeline, APIs and integrations

### 6.1 Lead flow

| Step | What happens | Code |
|---|---|---|
| 1 | Visitor enters a plate. The browser calls `/api/vrm`, which asks the vehicle-data API for make, model, year, engine size, fuel and colour | `src/lib/vrmLookup.js`, `src/app/api/vrm/route.js` |
| 2 | The result shows in a vehicle card (pop-up, `/get-quote` or on-page form) with a matching photo | `QuotePopup`, `GetQuoteClient`, `QuoteRegField`, `lib/vehiclePhoto.js` |
| 3 | Visitor fills name, phone, email, postcode and enquiry type. Registration is required. A hidden honeypot field catches bots | `useLeadForm.js`, `ModelSec18`, `VariantSec13`, `engine-family/Sec11` |
| 4 | The form POSTs JSON to `/api/send-lead` with `page_url` and `lead_source` (`page-quote-form`, `quote-popup`, `get-quote`) | `useLeadForm.js` |
| 5 | The route drops honeypot leads (returns a fake success), requires an email or phone, then runs two sends in parallel: email via the relay, and the CRM function | `src/app/api/send-lead/route.js` |
| 6 | Success is returned if either channel works. A 502 is returned only if both fail. Failures are logged with `console.error` | same |
| 7 | Staff read leads in their inbox (to + cc) and on `/leads` | `src/app/leads`, `/api/leads` |

Every lead form must render `<LeadStatus lead={lead} />` (it carries the honeypot).

### 6.2 Payload

Forms post: `name, number, email, postcode, description` (enquiry type), `vehicle_vrm`, and when a plate was looked up `vehicle_brand, vehicle_series, year, engine_capacity, fuel_type`, plus `page_url, lead_source, honeypot`.

`lib/leads.js: toCrmLeadPayload` maps these to the CRM's field names (`number`/`phone`, `vehicle_brand`/`brand`, `vehicle_series`/`series`; engine capacity converted from cc to litres; `vehicle_part` defaults to "Engine"; `source` is the domain; `source_page` is the domain plus path without the query string). `year` is emailed but not mapped into the CRM payload.

### 6.3 Mail relay (PHP on cPanel)

- The API route POSTs JSON to `MAIL_RELAY_URL` (an HTTP endpoint on the mail host) with header `X-Relay-Secret`. The relay sends with PHP `mail()`. It is plain HTTP, a server-to-server call protected by the shared secret.
- Body: `to`, `cc`, `fromAddress`, `fromName`, `subject` ("New Quote Request - <Brand> Garage"), and an HTML table of every field.
- Recipients come from `MAIL_TO_ADDRESS` (a `leads@<brand-domain>` address) and `MAIL_CC_ADDRESS`. cPanel email forwarders are unreliable on this host, so use cc instead.
- A brand domain on third-party DNS needs SPF, DKIM and DMARC records, and its MX must point at the host's mail cluster, or outbound mail is silently dropped with no bounce.
- `MAIL_FROM_ADDRESS` must be on a domain the relay accepts; a wrong domain makes the relay return 502. Test through the real deployed route, not a direct curl with an explicit from-address.
- `mail-relay.php` is uploaded to cPanel by hand and is not in any repo.

### 6.4 CRM (Supabase)

- `SUPABASE_WEBHOOK_URL` is the receive-lead Edge Function. `SUPABASE_ANON_KEY` authenticates the call. `SUPABASE_REST_URL` (optional) overrides the REST base, otherwise it is derived from the webhook host.
- A 409 response means a duplicate within the function's window and is treated as success.
- `fetchSiteLeads` reads a site's leads back (filtered by source domain, 10 per page) for `/leads`.

### 6.5 Leads admin (`/leads`)

One shared password in `LEADS_ADMIN_PASSWORD`. Login posts to `/api/leads/login` and sets an 8-hour cookie that is an HMAC of the password, so changing the password signs everyone out. If the variable is missing, nobody can log in. `/api/leads` returns 401 without the cookie.

### 6.6 Vehicle-data (plate look-up) API

- The browser calls the site's own `GET /api/vrm?vrm=<plate>`. The route calls the third-party UK vehicle-data provider (`/vehicledata/vehicleregistration`) with the key from the server-only `VRM_API_KEY`, and returns make, model, year, engine capacity (cc), fuel type and colour. Errors surface as "Please enter a valid UK registration number."
- The route only answers requests from the site's own pages, validates the plate and limits look-ups per IP (30 per 10 minutes per server instance). Without `VRM_API_KEY` it answers 503.
- `lib/vehicleTitle.js` turns make and model into a clean title and subtitle (Range Rover is its own marque).
- `lib/vehicleImageMatch.js` + `lib/vehiclePhoto.js` pick a photo: brand must match, then model, then variant, then nearest year, using `src/data/vehiclePhotos.json` (photos in `public/vehicle-photos`). If the library has only the brand, the site's own model-card cut-out is preferred.
- `public/vehicle-photos-nobg` holds background-removed copies with the same filenames, used inside dark quote forms. The pop-up and `/get-quote` use the originals blended onto a light panel.

### 6.7 CMS and blog

- `lib/cms.js` fetches published posts from `CMS_API_URL` for `CMS_SITE_SLUG`, cached with tags (`cms-posts`, `post-<slug>`) for an hour.
- The CMS calls `/api/revalidate` with header `x-cms-signature-256`, an HMAC-SHA256 of the body using `CMS_REVALIDATION_SECRET`. Valid calls revalidate the listed routes and tags.
- `REVIEW_URLS` in `lib/site.js` are placeholder search URLs. They need the real Google Business and Trustpilot profile links.

### 6.8 Environment variable names (all four sites)

| Name | Used for |
|---|---|
| `MAIL_RELAY_URL`, `MAIL_RELAY_SECRET` | Mail relay endpoint and shared secret |
| `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME`, `MAIL_TO_ADDRESS`, `MAIL_CC_ADDRESS` | Sender, recipient and cc of lead emails |
| `SUPABASE_WEBHOOK_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_REST_URL` | CRM write and read |
| `VRM_API_KEY` | Plate look-up key (server only; without it `/api/vrm` answers 503) |
| `LEADS_ADMIN_PASSWORD` | `/leads` login |
| `CMS_API_URL`, `CMS_SITE_SLUG`, `CMS_REVALIDATION_SECRET` | Blog fetch and webhook verification |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, robots, JSON-LD (defaults to the live domain, never localhost) |

Locally they live in `.env.local` (copy `.env.example`); in production they are set per Vercel project. Not every name is needed locally, so check Vercel before assuming a feature works.

---

## 7. Images, icons and assets

- **Conversion:** keep the source jpg/png and write a webp next to it. Home page: ffmpeg libwebp quality 92. Model pages: effort 6 (`compression_level 6`), quality 85. A same-name output overwrites the old one, so JSON paths do not change.
- **Cache gotcha:** `next/image` caches by path. If a replaced image still looks old, give it a new filename (this is why files are named `card2-`, `card3-`, `vehicle-photos-nobg`, `process-N-...-card`).
- **Reference image wins:** when the client's reference image and the text spec disagree, follow the image. Never add "NN + label" section-number badges above headlines.
- **Icons:** SVGs in `public/icons`, rendered as CSS masks by `Icon.js` and mapped by name in `iconMap.js`. Default to larger icons in cards, tables and feature bars.
- **Car cut-outs and engine photos:** background-removed with the Python tool `rembg` (u2net model, onnxruntime), about one second per photo. Engine photos live in `public/engines`.
- **Part and failure photos:** `lib/partImage.js` picks a photo from filenames in `public/parts` using a generated `partIndex.json` (`scripts/build-part-index.mjs`, run on `predev` and `prebuild`). Only the SYNONYMS in `partImage.js` need editing for new wording. If nothing matches, the old image stays.
- **Lightbox:** any tap-to-enlarge image opens at full viewport size with the whole picture visible. `ImageLightbox.js` is identical on all four sites; copy any change to all four.
- **Process section** (home page, BMW and Land Rover): nine step photos and descriptions in `data/home/homeSec8.json`. Portrait crops of the originals (field `thumb`) feed the cards; the full image opens in the lightbox.
- **Stripes:** brand stripes are vector bands (`PhotoStripes` presets or an inline SVG). They must share the photo's crop (object-fit and position) to stay locked to it.

---

## 8. Local development

```
npm install        # first time only
npm run dev        # http://localhost:3000 (builds the part index first)
npm run lint
npm run build      # run before pushing; this is what Vercel runs
npm start          # serve a production build
python scripts/verify_site.py   # static route / link / metadata checks
```

- Leave the dev server running and rely on Fast Refresh. Do not rebuild or restart for small CSS tweaks.
- Files use CRLF in several repos. Scripts that edit files should read and write with `newline=''` and re-apply the original line endings.
- Run `npm run build` locally before pushing; it is what Vercel runs.
- To test mobile in desktop Chrome, use a 390px-wide iframe pointing at the page, because the window cannot be made narrower than about 500px.

---

## 9. Deploying

- Push to `main`; Vercel builds and promotes to Production automatically (roughly 30-60 seconds).
- Afterwards run `vercel ls` inside the site folder (or open the project on Vercel). The newest Production row should say **Ready**. An older Error row is only history.
- Open the live page for a quick check.

---

## 10. Per-site state

| | BMW | Mercedes | Jaguar | Land Rover |
|---|---|---|---|---|
| Models | 26 model pages | several model lines | 9: E-Pace, F-Pace, F-Type, S-Type, X-Type, XE, XF, XJ, XK | 8: Defender, Discovery, Discovery Sport, Freelander, Range Rover, Range Rover Sport, Velar, Evoque |
| Accent / stripes | blue, violet, red | silver and gold | silver and black | dark and light olive |
| Process section | done | not yet | not yet | done |
| Dedicated Range Rover model page | n/a | n/a | n/a | done (19 variants) |

Phone number on all sites: 01268 944234 (WhatsApp is a separate number).

**Land Rover only (not mirrored yet):** reordered mobile hero (plate look-up first, rating card last), the Range Rover model page and its navbar/footer/models-hub/engine-explorer entries, the single "View All Models" button on the home page, browse cards that open the quote pop-up, the Sec15 checklist linking to variant pages, the "Range Rover" naming across the data files, and the mobile checkerboard on pricing cards (the desktop alternation is on all four).

---

## 11. Conventions and gotchas

- **Mirror fixes:** when you fix something on one site, check the equivalent section on the other three and apply it. Grep each analogous model, variant and engine-family file rather than relying on memory.
- **CSS that will not apply:** search all stylesheets for a conflicting rule (often a shared class with `!important`) before guessing new values.
- **Stripe height:** brand stripes next to titles scale with the title font size; align to the first line only when the title can wrap.
- **Dropdowns inside a `<label>`** re-fire clicks on the first button. `FormSelect` stops that.
- **Form reset:** after a lead is sent, `form.reset()` fires a `reset` event. `QuoteRegField` and `FormSelect` listen to it to clear their own state. Any new custom field inside a lead form should do the same.
- **Plates:** the yellow plate is the default everywhere.
- **Visual checks:** the product owner verifies visually in the browser. Use screenshots they provide first.
- **"All sites"** means bmw, mercedes, jaguar and landrover. "Only landrover" means only that repo.
- Do not send test leads to production without the owner's OK.

---

## 12. Open items

| Item | Detail |
|---|---|
| `/our-reviews` | Linked from the site but returns 404. There is no spec or source for it; ask the client |
| CRM year field | `year` is emailed but not mapped by `lib/leads.js`, so it never reaches the CRM. Small change in `toCrmLeadPayload` |
| `REVIEW_URLS` | Placeholder search URLs in `lib/site.js`; need the real Google Business and Trustpilot profile links |
| Process section | Mercedes and Jaguar still need it (each needs its own nine photos and wording from the client). The BMW step-3 photo shows a Range Rover and should be replaced |
| Range Rover page photos | The "Most Popular" cards reuse three generic photos (L322 / L405 / L460); per-variant photos would be better |
| Jaguar stripes | The "Why owners choose us" stripes were drawn by eye over the baked-in ones; check alignment at several widths. The Sec2 and Sec5 stripes were not redrawn |
| BMW and Mercedes mobile hero | Land Rover's reordered mobile hero and tick removal are not on BMW or Mercedes mobile |
| Source inconsistencies | Some Land Rover Evoque and Velar variants carry inconsistencies from the client text |
| Old phone number elsewhere | Business listings, CRM or email templates and other external places may still hold an old number; only the code is current |
| `/api/revalidate` | Has a fallback secret in the file, used when `CMS_REVALIDATION_SECRET` is missing |
| Mail relay | Plain HTTP, protected by the shared secret only |
| Plate look-up key | The key used before `/api/vrm` was readable in the browser and in the source. It has not been rotated; only the provider's account owner can do that |
| Hosting split | The four sites are on Vercel; mail and its DNS are on a separate cPanel host. Know which one you are changing |

---

## 13. Day-one checklist

1. Get access to the GitHub repos, the Vercel team, Supabase, cPanel (mail relay), the CMS admin and the vehicle-data provider.
2. Clone `landrover-gs`. For `.env.local`, copy `.env.example` and ask the owner for the values, or unzip the `Env-local-files.zip` the owner supplies in the folder that holds the cloned repos (it places each site's `.env.local` next to its repo).
3. Run `npm install` and `npm run dev` and click through: home, `/defender-engines`, `/range-rover-engines`, `/get-quote`, the pop-up, and the quote form with a test plate.
4. Read in this order: this document, `src/components/model/ModelSec18.js`, `src/components/reusable/useLeadForm.js`, `src/app/api/send-lead/route.js`, `src/lib/leads.js`, `src/lib/vrmLookup.js`, `src/app/api/vrm/route.js`.
5. Make one small change on Land Rover, run `npm run lint` and `npm run build`, then mirror it to a second site to practise the workflow.
