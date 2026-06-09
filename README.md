AI Fraud Detection — Static Landing Page

A minimal, conversion-ready static website for an AI-powered fraud detection for insurance claims consultancy.

Files created:

- index.html
- features.html
- how.html
- brochure.html
- styles.css
- script.js
- package.json

Quick start

Open `index.html` directly in your browser, or run a local static server.

Using Python 3:

```bash
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Using Node (if you have a static server like `serve`):

```bash
npx serve . --listen 8080
```

Brochure

There is a printable one-page brochure at `brochure.html`. Open it and use your browser's print-to-PDF for a downloadable brochure.

Next steps you might want:

- Hook the contact form to your CRM or form provider (Formspree, Netlify Forms, or a simple SMTP backend).
- Replace placeholder email `hello@yourcompany.com` in `index.html`.
- Add tracking (Google Analytics, or server-side events) and A/B tests.
 
Generate social images (PNG)

This repo includes a small Node script to generate Open Graph PNGs from an SVG template. It uses Puppeteer.

```bash
npm install
npm run generate-og
```

The script writes `assets/og-<page>.png` files (index, features, how, brochure). After generation, social platforms will use the PNG images referenced in the pages.

Notes: Puppeteer downloads Chromium during `npm install` and may take time. If you prefer, you can create PNGs with an external tool and place them into `assets/`.

Sitemap

`sitemap.xml` has been added at the repo root. Update the `loc` URLs to match your production domain before submitting to search consoles.
