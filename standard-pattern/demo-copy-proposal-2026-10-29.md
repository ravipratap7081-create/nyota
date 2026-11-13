# Nyota Demo Copy Proposal — Standard ₹2,499: 3 New Features (SUPERSEDED — LIVE SINCE 29 OCT 2026)

- Date: 29 Oct 2026. Status: SUPERSEDED — this copy went LIVE 29 Oct 2026 (deployment dpl_4hhpyxgBVm8RCXWiD5GFsLi7GhyT); the live demo `index.html` WAS edited with these 3 rows. This file is now a historical record only — do not re-apply.
- Verified pattern file: `~/workspace/nyota-demo-deploy/standard-pattern/standard-invite-pattern.html`
  (per-function RSVP breakdown, guest CSV download, meal-preference question — all verified locally 29 Oct 2026).
- Live demo `index.html` md5 at proposal time: `6e0ddcc2a3d673ed011f3347311e0860` (must still match after this proposal is applied).

## Where the change goes

Pricing comparison table (`<table class="price">`), immediately AFTER this existing row:

```html
<tr><td>RSVP form + mehmanon ki ginti</td><td>✔</td><td>✔ Live headcount</td></tr>
```

and BEFORE this row:

```html
<tr><td>Har parivaar ke liye alag personalised greeting + alag karyakram suchi (Demo 3 jaisa)</td><td>—</td><td>✔</td></tr>
```

## Exact new rows (copy-paste ready HTML)

```html
<tr><td>Har karyakram ki alag RSVP ginti (Haldi / Mehndi / Vivah / Reception — kitne haan, kitne mehman, Veg / Non-veg)</td><td>✔</td><td>✔</td></tr>
<tr><td>Guest list download (CSV) — saare RSVP ek spreadsheet me</td><td>✔</td><td>✔</td></tr>
<tr><td>RSVP me khaane ki pasand — Veg / Non-veg / Koi khaas pasand nahi</td><td>✔</td><td>✔</td></tr>
```

## What does NOT change

- Prices: Standard ₹2,499, Premium ₹3,999, ₹499 advance, 48h free preview — all unchanged.
- Premium-only rows (personalised greeting, animated design) — unchanged.
- Payment, refund, revision (2 rounds), date-edit, and 30-days-live rows — unchanged.
- Hero chips and lede — no change needed (RSVP is already mentioned generally).

## Notes / decisions for Ravi

1. Premium column shows ✔ on the 3 new rows because Premium "adds" features on top of Standard
   (existing table structure) — i.e. Premium includes all Standard features. If Premium should
   behave differently for any of these 3, say so before applying.
2. The 3 features describe the CUSTOMER invite built from the pattern — the demo page's own
   RSVP forms stay in-page demo-only (nothing saves on the demo page itself). Do not write copy
   that claims the demo page collects replies centrally.
3. Before ANY deploy of this folder: remove `standard-pattern/test-evidence/` (test screenshot)
   or exclude that folder from the deploy. The pattern file itself is not linked from `index.html`.
4. Apply only on Ravi's word, then re-verify: table renders on mobile, md5 of the new
   `index.html` recorded, and the 3 features still match the pattern file exactly.
