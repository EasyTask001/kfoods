# K Foods / Kartarpur Foods

An editorial, product-led website for the existing K Foods rice, dals and pulses range, with North American retail/wholesale buyer resources.

## Run locally

Node 22 and npm are the verified setup. Use `npm ci`, then `npm run dev -- --port 18766` and open `http://127.0.0.1:18766`.

For a production-like local build:

```sh
npm run build
npm run start -- --port 18767
```

Both commands bind the application to **127.0.0.1**, not the public network. No deployment is implied. Local build output, test reports and source snapshots under `artifacts/` are intentionally excluded from Git.

## Main routes

- `/`: brand, collections, featured products, recipes and FAQs.
- `/rice`, `/dal`: existing catalogue and pack sizes.
- `/products/[id]`: original product information and imagery; package selection, zoom and inquiry links.
- `/wholesale`: retail, club, distribution and foodservice buyer guide.
- `/request-quote`: prepare an email draft, review/copy/download it, then choose your own email client. **Nothing is sent automatically; there is no delivery backend.** The optional Gmail link clearly discloses sharing with Google.
- `/contact`, `/about`: contact and brand information.
- `/recipes`, `/recipes/[id]`: existing recipe collection; shareable category query filters.
- `/buyer-checklist.html`: printable buyer discussion checklist, with a Print / Save as PDF action.
- `/product-range.csv`: catalogue-derived range sheet (not an inventory/price list).
- `/robots.txt`, `/sitemap.xml`: generated discovery endpoints.
- `/llms.txt`: optional plain-text orientation, not a Google or AI-search eligibility requirement.

## Verification

```sh
npm test
npm run typecheck
npm run lint:site
TEST_BASE_URL=http://127.0.0.1:18767 npm run test:e2e
npm audit --omit=dev
```

E2E tests need a running loopback preview and installed Google Chrome. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to another compatible Chromium executable if necessary. They use local test-only buyer details and never send email or write to a database. Reports/screenshots are stored under `artifacts/`.

`npm run lint` checks the full supplied component library as well as the site. It currently flags four pre-existing errors in unused template carousel/sidebar/mobile-hook components. These are kept visible rather than disabled. `npm run lint:site` checks all implemented site code with zero warnings allowed.

`npm audit` also checks developer tooling; report its findings separately from `npm audit --omit=dev`. No automatic breaking audit fix is used.

## Assets and identity

The original logo, supplied images and `lib/products-data.ts` / `lib/recipes-data.ts` are preserved. New social image and CSV can be regenerated from the project root with:

```sh
npm run assets
```

Do not run broad formatters over immutable catalogue files or replace product packs with invented images. `AGENTS.md` contains the source boundaries and maintenance guide. `package-lock.json` is authoritative for the tested npm workflow; the originally supplied `pnpm-lock.yaml` remains unchanged and is not a synchronized alternative.

## Before publishing — owner approval required

1. Confirm the public HTTPS domain. Set `NEXT_PUBLIC_SITE_URL` before the build; the `https://kfoods.us` fallback is provisional, inferred from the email address only.
2. Confirm business contacts, current product packaging/copy, nutrition/health claims, availability, SKU identifiers, case/pallet details and applicable compliance/certification evidence. Existing catalogue facts have not been independently certified.
3. Approve the visual design and buyer wording. Retailer names are audience/resource references, **not partnership or stockist claims**.
4. Choose and approve hosting/deployment. Protect public staging from indexing. Configure Search Console/Bing and submit the sitemap after domain verification.
5. If automatic inquiry delivery is wanted, separately approve an email backend, recipient policy, privacy text and deployment configuration. The current draft-only workflow is deliberate and honest.

Standard SEO, crawlable content and truthful structured data support discovery, but do not guarantee rankings, rich results, AI answer inclusion or acceptance by a grocery chain.
