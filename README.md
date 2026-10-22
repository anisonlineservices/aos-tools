# AOS Tools V2 — ₹0-first, no tool redirects

A React + Vite starter for a single-site tools workspace. PDF and image processing supported here runs in the user's browser. This project does not require a paid API for the implemented local tools.

## Zero-cost policy

See [FREE_POLICY.md](./FREE_POLICY.md). No paid APIs, subscriptions, credit-card trials, or automatic paid upgrades are permitted. Third-party free plans can change; if a dependency stops being free, disable it or replace it rather than incur a charge.

## Zero-cost policy

See [FREE_POLICY.md](./FREE_POLICY.md). No paid APIs, subscriptions, credit-card trials, or automatic paid upgrades are permitted. Third-party free plans can change; if a dependency stops being free, disable it or replace it rather than incur a charge.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Browser-based tools implemented in this starter

- PDF Merge, PDF Split by page list/range, Rotate PDF, Page Numbers, JPG/PNG to PDF
- Image compression, resize, JPG/PNG/WEBP conversion, rotate, circle PNG, center-square crop, generic photo-sheet layout, signature-size resize, and image merge
- Special tools: Code 39 Barcode Generator (SVG export), ZIP Extractor (browser-side; may need permission for multiple downloads), QR generator modes for text/URL/contact/email/phone/SMS/Wi-Fi, PAN Master Hub image presets, Password Generator, Age Calculator, HTML Editor/preview, basic image colour sampling, image-to-HTML wrapper, and session-only Khata entry with JSON export
- Additional local utilities: Text Case Converter, Word Counter, JSON Formatter/Validator, Unit Converter, GST Calculator, EMI Calculator, Percentage Calculator, Date Difference Calculator, Base64 Encoder/Decoder, URL Encoder/Decoder, UUID Generator, Lorem Ipsum Generator, Color Picker, Notepad (TXT download), and Text-to-Slug Converter
- Search/categories, responsive layout, dark/light mode, font/accent settings

The photo sheet and signature resize are generic utilities, not official-size validators. Check the destination service's current rules before submitting identity documents.

## Important limitations

This is a starter, not a fully implemented full catalog. Items labeled Planned in the UI are catalog entries only. Barcode support is Code 39, not every barcode standard. PAN Master Hub presets are convenience dimensions and are not official acceptance validators. ZIP extraction is client-side and browser download settings can affect batch downloads. OCR, office document conversion, PDF/A, video processing, AI, cloud storage, and secure backend authentication need separate implementation. The project does not send users to external websites to use these tools. A Government Portals category lists 50 public portal links separately from the tools. Those links open the relevant official/public service site in a new tab; the PDF/image tools themselves do not redirect. Check each portal URL and current service availability before production use; third-party sites are not affiliated with AOS Tools.

Google sign-in UI is an integration point only. Do not treat a decoded browser token as secure authentication. If adding Google login or Drive, validate tokens server-side and request the minimum required scopes. Never put a Google client secret in frontend code. `VITE_GOOGLE_CLIENT_ID` is an optional public client ID configured through `.env.local`; OAuth authorized origins must be configured in Google Cloud.

## Free hosting

You can deploy the static build to a provider's free tier if it is available for your account and usage. Provider limits and policies may change; no third-party hosting plan can be guaranteed permanently free. Do not purchase a custom domain or upgrade a hosting plan for this project; use an available free subdomain or switch providers if needed. No paid tool API is required for the browser-based tools above.
