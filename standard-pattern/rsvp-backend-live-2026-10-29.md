# Nyota RSVP backend — LIVE (29 Oct 2026)

## What exists now
- **Sheet:** "Nyota RSVP" — https://docs.google.com/spreadsheets/d/1ISd2vRPgliyGEWaKTyYADYzF-8j3SEqwDEWIvP8jjsA/edit
  - Private to ravipratap7081@gmail.com only. NOT shared, NOT public, no editors/viewers added.
  - Tabs: `Sheet1` (empty) + `RSVP` (headers: Timestamp | Guest | Function | Attending | Count | Meal).
- **Apps Script project:** "Nyota RSVP" (bound to the Sheet), Code.gs doPost/doGet, saved with no syntax error.
- **Deployment:** Version 1, 29 Oct 2026 ~14:47 IST. Execute as: Me (ravipratap7081@gmail.com). Who has access: Anyone.
  - Deployment ID: AKfycbx3kcnFlJZr59C3bYsb535M-az_P_36i9Fn6mC6Tw_XOSA61qW-6LRyW3IA_RDwN2XxYQ
- **Endpoint (Web App URL):** https://script.google.com/macros/s/AKfycbx3kcnFlJZr59C3bYsb535M-az_P_36i9Fn6mC6Tw_XOSA61qW-6LRyW3IA_RDwN2XxYQ/exec
  - Live check: opening it returns `{"result":"Nyota RSVP endpoint live"}`.

## End-to-end test evidence (29 Oct 2026)
- Test POST (guest=TEST-DELETE, fn=Vivah, attend=Haan, count=2, meal=Veg) reached the Sheet:
  row seen in the RSVP tab as `10/29/2026 14:49:29 | TEST-DELETE | Vivah | Haan | 2 | Veg`.
- That test row was then DELETED (only row 2, via row context menu). Sheet confirmed back to
  headers only, "Saved to Drive" shown. No test data remains. No other row was touched.

## Pattern wiring (same day)
- `standard-invite-pattern.html`: backend-sync `<script>` appended (RSVP_ENDPOINT = endpoint above),
  registered as a second submit listener on `rsvpForm` — local save + CSV unchanged, Sheet sync
  added, fail-open (guest still sees success if Sheet POST fails).
- Form field names verified: guest, fn, attend, count, meal — match the snippet keys exactly.
- Stale note replaced: the pattern no longer says a backend is a separate step not in the pattern;
  it now says entries save locally AND sync to the couple's Sheet.

## What this does NOT change
- The LIVE demo (nyota-demo.vercel.app) is NOT wired — its RSVP stays demo-only by design.
  The demo's price-table rows describe what a CUSTOMER invite (built from this pattern) does.
- Rules still stand: consent line on the form; delete guest data 30 days after the wedding;
  no guest login; no public guest list; no partner sharing; Sheet stays private to the host.

## Honest limitation
- "Anyone" access means anyone holding the endpoint URL can POST a row. The URL is embedded
  only in customer invites (page source), never published as a standalone link. Spam rows are
  possible in principle; the couple's Sheet is the place to spot and delete them.

## Update 30 Oct 2026 — hardened v2 LIVE (applied 20:55 IST)
- Code.gs replaced entirely with rsvp-apps-script-Code-v2-HARDENED.gs; Deployment **Version 2** (same deployment versioned, NOT a new deployment).
- Exec URL UNCHANGED: https://script.google.com/macros/s/AKfycbx3kcnFlJZr59C3bYsb535M-az_P_36i9Fn6mC6Tw_XOSA61qW-6LRyW3IA_RDwN2XxYQ/exec
- doGet check: {"result":"Nyota RSVP endpoint live"}.
- Test POST (guest=TEST-DELETE-2, fn=Vivah, attend=yes, count=2, meal=Veg) → 200 {"result":"ok"}; row appeared as the ONLY data row (attend normalised to "Haan" by v2) and was DELETED; tab back to headers only, no other row touched.
- No Script Property set (RSVP_FORM_KEY unset → v2 fail-opens, as designed). Pattern snippet already updated to the hardened version (honeypot + tracked values + pending retry).
- Note: the Sheet URL in the task assignment had a repeated segment and 404'd; the agent found the correct Sheet in Drive (ID 1ISd2vRPgliyGEWaKTyYADYzF-8j3SEqwDEWIvP8jjsA) — this doc's URL was already correct.
