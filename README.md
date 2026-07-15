# Bevisa

Bevisa is a pre-launch website for an evidence and compliance operating layer for Swedish public-tender teams. It maps mandatory requirements to dated, approved evidence and keeps a human bid lead at the final approval gate.

The repository contains only the static launch site. It has no backend, form submission, tracking cookies, fabricated customer claims, or active conversion destinations by default.

## Product and content boundaries

- The public statistics are sourced from Upphandlingsmyndigheten: [2024 bidders and classified bids](https://www.upphandlingsmyndigheten.se/statistik/upphandlingsstatistik/statistik-om-annonserade-upphandlingar-2024/46-anbud-per-upphandling-2024/), [2025 supplier survey](https://www.upphandlingsmyndigheten.se/statistik/nationella-upphandlingsenkaten/nationella-upphandlingsenkaten-riktad-mot-leverantorer/en-mangfald-av-leverantorer-och-en-valfungerande-konkurrens-2025/), and [2025 advertised-procurement value](https://www.upphandlingsmyndigheten.se/statistik/upphandlingsstatistik/statistik-om-annonserade-upphandlingar-2025/annonserade-upphandlingar-for-982-miljarder-kronor-2025/).
- The sovereignty narrative follows the direction of [Sweden's 2026 cloud policy](https://www.regeringen.se/pressmeddelanden/2026/05/ny-molnpolicy-ska-bidra-till-okad-digital-suveranitet-i-offentlig-forvaltning/).
- Hosting, access control, retention, and audit logging are design-partner commitments, not claims about a certified production service. GitHub Pages hosts this marketing site only.
- Mercell, TendSign, Tendium, Microsoft 365, Word, and Excel appear as text labels only. No third-party logos are used.

## Architecture

- Vite 5.4, React 18.3, strict TypeScript, and Tailwind 3.4.
- Three.js, React Three Fiber, and Drei for the instanced 90-record evidence field and reversible pipeline.
- GSAP ScrollTrigger drives one normalized pipeline progress value. Lenis is loaded after first paint.
- Framer Motion provides evidence-radar layout transitions.
- Fontsource assets are self-hosted. Heavy narrative and 3D code is lazy-loaded.
- Six generated SVG frames (hero evidence field plus five pipeline stages) cover mobile, reduced motion, missing WebGL, lost WebGL, and no-JavaScript paths.
- All copy, sources, locale shapes, evidence records, and launch configuration are typed.

## How to run and test on Windows

```powershell
npm install
npm run dev
npm run check
npm run build
npm run preview
```

Run the browser and performance gates separately:

```powershell
npm run test:e2e:install
npm run test:e2e
npm run lighthouse
```

`npm run check` performs strict type checking, ESLint, unit tests, locale/source/config validation, component-size enforcement, a production dependency audit, forbidden-content scanning, a production build, and the 450 KB gzip JavaScript budget.

## Optional launch configuration

Copy `.env.example` to `.env.local` and set only validated values:

| Variable | Accepted value | Effect |
| --- | --- | --- |
| `VITE_BOOKING_URL` | HTTPS URL | Activates booking links |
| `VITE_CONTACT_EMAIL` | Valid email address | Activates the clipboard control |
| `VITE_SAMPLE_REPORT_URL` | HTTPS URL or safe `./` path | Activates report links |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible site domain | Loads pageview-only Plausible analytics |

When values are absent or invalid, hero and nav actions scroll to the design-partner section, final controls remain accessibly disabled, and `founders@bevisa.se` is visibly marked inactive. Plausible is not loaded unless its domain is supplied.

## Verified quality snapshot

Local production verification on 15 July 2026:

| Gate | Result |
| --- | --- |
| Production JavaScript | 367.2 KB gzip / 450 KB budget |
| Unit tests | 13 passing |
| Browser suite | 52 passing, 15 intentional project-specific skips across Chromium, Firefox, WebKit, 390 px mobile, and the dedicated visual-baseline project |
| Visual regression | 42 deterministic section-level baselines at 390×844, 768×1024, and 1440×900 in both locales (local Windows workstation; skipped on CI) |
| Automated accessibility | 100 Lighthouse; zero axe violations |
| Mobile Lighthouse | 98 performance, 100 accessibility, 100 SEO; 2.10 s LCP |
| Desktop Lighthouse | 100 performance, 100 accessibility, 100 SEO; 0.46 s LCP |
| Animation pacing | 60.0 fps desktop hero, forward and reverse pipeline, and 60.0 fps mobile fallback |

The workflow reruns every required gate on Node.js 22 before publishing `dist` to GitHub Pages. Official actions are pinned to full commit SHAs.

## What must be done manually

- Confirm company-name ownership and clearance.
- Configure the production domain, DNS, MX records, and working email delivery.
- Add the final booking URL.
- Supply and legally review `public/sample-report.pdf` before activating it.
- Review the Swedish translation with a native procurement specialist.
- Create and configure a Plausible account only if analytics is desired.
- Obtain legal review of the marketing copy and disclaimer.

Until those items are complete, this remains a technically complete pre-launch site rather than a conversion-ready launch. The project is proprietary and intentionally has no open-source license.
