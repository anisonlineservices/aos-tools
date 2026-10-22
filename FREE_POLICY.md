# AOS Tools — ₹0-first project policy

This project must not require the owner to spend money to build, publish, operate, or maintain the website. This is a design constraint, not a guarantee that any third-party provider will keep a free plan forever.

## Accept a tool only if

- It can run in the browser using the user's device, or it has a genuinely free, self-hostable/open-source implementation.
- Its licence permits the intended use and redistribution.
- The normal workflow does not require a paid API key, paid account, credit card, subscription, or trial conversion.
- Its limits, privacy implications, file size constraints, and browser/device requirements are documented.
- It can be tested without buying access.

## Reject or defer

- Paid AI inference APIs and services that only provide temporary free credits.
- Paid video-processing endpoints or cloud storage that becomes billable after a quota.
- Mandatory premium SDKs, paid domains, paid plugins, and credit-card-required trials.
- Any feature that cannot be honestly described as implemented and tested.

## Preferred architecture

1. Static frontend hosted on an available free tier, with a fallback plan if terms change.
2. Local browser processing for PDF, images, text, QR/barcode, and small/medium video jobs where feasible.
3. Open-source dependencies with compatible licences; pin and review dependency versions.
4. No secret keys in frontend code. Optional Google OAuth/Drive features must remain optional and use the provider's official quota and consent requirements.
5. No user files uploaded unless the tool explicitly explains why and asks for consent.

## Honest limitation

No developer can guarantee that a third-party host, browser, AI model, Google API, or internet provider will remain free forever. AOS Tools should never automatically upgrade to a paid plan. If a free provider changes its terms or becomes unsuitable, disable that integration or replace it with a free alternative; do not create a charge.
