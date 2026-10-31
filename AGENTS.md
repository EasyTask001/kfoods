<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# K Foods — project engineering guide

## Boundaries
- Owner-assigned project: `/home/hsthind/Documents/kfoods`. The repository is hosted at `https://github.com/EasyTask001/kfoods`; deployment still requires separate owner approval.
- Preserve the original logo, supplied public assets, `lib/products-data.ts` and `lib/recipes-data.ts` byte-for-byte. Regression hashes live in `tests/fixtures/original-assets.sha256.json`. Original-source backup: `artifacts/original-source-HSTH-198.zip`.
- Never invent packaging, product facts, nutrition claims, stock, ratings, retailer affiliations, certifications or private-label capability.
- Retailer names (Costco, Walmart, Loblaws, Real Canadian Superstore) are buyer-audience/resource references, not listing or endorsement claims.
- The fresh-produce and dry-fruit range is an Afreen supplier-partner catalogue, not a K Foods product line. Keep every partner page and quote entry disclosed as such, keep images labelled as AI-generated illustrations, and never attach pack sizes, stock, prices, certifications or offers to partner items.
- No production writes, external email sends, public networking, paid services, commits, pushes or deployment without owner approval.

## Architecture
- Next.js App Router, React, TypeScript, Tailwind 4; Node 22 and npm/package-lock.json verified.
- Server-rendered home, category, informational and recipe pages; product/recipe details have static parameters and real 404 handling.
- `lib/seo.ts`: configured origin and metadata/schema helpers. `components/structured-data.tsx`: escaped server-rendered JSON-LD. Root metadata must not set a homepage canonical inherited by other routes.
- `components/product-catalogue.tsx`: catalogue rendering. `components/product-detail.tsx`: client package selection and accessible Radix image dialog; immutable product data.
- `lib/afreen-products-data.ts`: Afreen supplier-partner catalogue (12 entries: 9 fresh produce, 3 dry fruit/nut), derived from the source catalog noted in the file. `components/afreen-product-catalogue.tsx`: `/fruits` and `/dry-fruits` listings plus the `/afreen-products/[id]` detail with AI-illustration disclosure and no commercial claims. Partner routes are statically generated, return real 404s and are covered in `app/sitemap.ts`.
- `lib/quote-products.ts`: merges the K Foods catalogue and partner range for the local quote form; partner entries intentionally carry zero package options.
- `lib/quote.ts`: pure validation and email-draft construction. There is no delivery backend. Preparation stays local; explicit email/Gmail action and manual Send are required. No hidden recipients.
- `app/globals.css`: ivory/forest/gold editorial system, responsive nav, skip links and reduced motion.
- The footer carries one compact, text-first website technology-partner credit for EasyTask AI Corp.; `tests/afreen.test.ts` enforces that shape. Do not expand it into product, retailer or endorsement claims.
- `public/buyer-checklist.html`: printable discussion aid, not supplier qualification. `npm run assets` regenerates `public/social-card.png` and `public/product-range.csv` from original assets/data (including the partner range), without overwriting them.

## Commands
- Install: `npm ci`.
- Development: `npm run dev -- --port 18766` (loopback).
- Production-like preview: `npm run build`, then `npm run start -- --port 18767` (loopback).
- Unit/server tests: `npm test`; types: `npm run typecheck`; implemented-site lint: `npm run lint:site` (zero warnings). `tests/afreen.test.ts` guards partner catalogue counts, disclosures, quote wiring, sitemap/metadata and the footer credit.
- Full source lint: `npm run lint`. Do not suppress unrelated legacy errors to claim a clean tree.
- E2E: `TEST_BASE_URL=http://127.0.0.1:18767 npm run test:e2e` against a running preview. Installed Google Chrome is used by default; override `PLAYWRIGHT_CHROMIUM_EXECUTABLE` if needed. No database seeding or production writes.
- Runtime audit: `npm audit --omit=dev`; tooling audit: `npm audit`.

## Publishing prerequisites
- Set `NEXT_PUBLIC_SITE_URL` to the owner-verified HTTPS origin **before the build**. `https://kfoods.us` is a provisional fallback inferred from the email only, not verified ownership or deployment. Protect/noindex any public staging at the hosting layer.
- Confirm contact/address, catalogue packaging consistency, nutrition/health claims, GTINs, case/pallet details, delivery capability, live availability and certification evidence with the owner.
- Confirm with the owner that the Afreen partner range, its copy and its AI-generated illustrations may be published, and that origin/availability/presentation wording matches what Afreen will actually confirm per enquiry.
- Analytics is off by default. Existing Vercel Analytics loads only when `VERCEL=1` AND `NEXT_PUBLIC_ENABLE_ANALYTICS=true`; do not enable tracking or services silently.
- Search Console/Bing verification, sitemap submission and public deployment are not performed by local development. No ranking, rich-result, AI-citation or retailer-acceptance guarantees.
- `package-lock.json` is authoritative for the verified npm workflow. The original `pnpm-lock.yaml` is retained unchanged, not synchronized; intentionally regenerate it before choosing pnpm.

## Known baseline issues
- Full ESLint exposes four pre-existing errors in unused template `components/ui/carousel.tsx`, `components/ui/sidebar.tsx`, `components/ui/use-mobile.tsx` and `hooks/use-mobile.ts`, plus unused-variable warnings elsewhere. Site-scope lint is separate and strict.
- Check current full `npm audit` for the development-only transitive Zod advisory. Do not apply breaking overrides blindly. Runtime dependencies are audited separately.
- Original remote product-image URLs are an external availability dependency. Do not silently substitute invented packs.
- `public/afreen-products/` holds AI-generated illustrative partner images, not supplied K Foods pack photography. Keep the on-page disclosure; their local hash manifest (`artifacts/afreen-images.sha256`) is gitignored and informational only.
