# Nyota Central RSVP — Backend Design (STATUS UPDATE 30 Oct 2026: backend BUILT + LIVE 29 Oct — see rsvp-backend-live-2026-10-29.md. The "nothing built" note below is historical, from before the build.)

## Problem (verified 29 Oct 2026)

The Standard pattern (`standard-pattern/standard-invite-pattern.html`) stores RSVPs in the
visitor's own browser (localStorage) and its CSV export lists only that browser's entries.
Guests replying from different phones do NOT feed one central list. Until a backend exists,
never promise a customer "sab guests ke jawab ek jagah auto-jud jayenge".

## Option A — Form-endpoint service (e.g. Formspree / Basin / FormSubmit style)

- How: invite page POSTs each RSVP (naam, karyakram, aayenge/na, mehman, khaane ki pasand,
  samay) to the service; host reads replies in its dashboard / email.
- Effort: LOW — form action + field names + one test invite (~1–2 hours wiring + testing).
- Cost: ₹0 on free tiers (typically ~50–100 submissions/month free). A big wedding
  (200–300 guests) can exceed the free tier → paid plan roughly $10/month (price to
  confirm at signup time; nothing bought here).
- Privacy: guest data sits with a third-party service (usually US/EU hosted). Invite
  footer must say replies go to the couple via this service; delete the form's data
  after wedding + 30 days. Spam risk: endpoint URL public ho to koi bhi POST kar sakta
  hai — honeypot field + simple per-form token chahiye.
- Verdict: fastest to first customer; acceptable if the couple is told where data goes.

## Option B — Google Sheet via Apps Script web app (RECOMMENDED for first customers)

- How: invite page POSTs each RSVP to an Apps Script web app; the script appends one row
  per reply to a Sheet owned by the host (or the couple, if they prefer). Host/couple
  watches the Sheet; CSV export stays as backup.
- Effort: MEDIUM — Apps Script (~50 lines) + POST wiring + CORS + one test invite
  (~half a day including testing). No new vendor, no new account beyond a Google
  account the host already has.
- Cost: ₹0 (Google free tier; Apps Script quotas are generous for wedding scale).
- Privacy: BEST control of the three — data lives in the host's own Google account,
  not a third-party marketing service. Same spam note as A: the web-app URL is callable
  by anyone who finds it → add a per-invite secret token in the POST + basic
  rate-limiting + a honeypot field; never put the Sheet link itself in the invite.
- Verdict: recommended starting point. Host-owned, ₹0, no new signup, and the Sheet
  itself becomes the couple's guest list (sortable, shareable with family).

## Option C — Tiny database (Supabase / Firebase free tier)

- How: RSVP writes go to a hosted DB table; the couple gets a private read view
  (live headcount page). Needs row-level rules so guests can only insert, never read
  others' replies.
- Effort: HIGH — table + rules + frontend rewrite + auth for the couple's view
  (~1–2 days including testing). Real-time headcount is the payoff.
- Cost: ₹0 on free tiers at wedding scale. Caution (29 Oct 2026 standing rule):
  Supabase stopped auto-granting Data API access to NEW public tables from 30 Oct 2026
  — every new table migration MUST include the GRANT lines (anon select; authenticated
  full; service_role full), or reads fail. Also note: the existing ProTools Supabase
  project is PAUSED — a new project (or a revive decision) would be needed.
- Privacy: strongest when rules are right, riskiest when wrong — a misconfigured rule
  can expose the whole guest list publicly. Must be tested with a stranger's browser
  before any real wedding uses it.
- Verdict: graduate to this only when a customer explicitly wants a live headcount
  page or when volume outgrows Sheets.

## What stays the same in all options

- localStorage + CSV export remain as offline fallback (guest sees instant confirmation
  even if the network POST fails; failed POSTs queue for retry — design detail, not built).
- Guest form keeps the same fields; add one consent line under the form:
  "Aapka naam aur jawab sirf jode ko dikhega, kahin public nahi hoga."
- Retention: delete/export-and-delete guest data 30 days after the wedding.
- No guest login system, no public guest-list page, no sharing guest data with partners.

## Decision needed from Ravi (nothing moves without it)

1. Which option for the first central-RSVP customer: B recommended (Sheet), A as fallback.
2. Who owns the Sheet/DB account — host (RPS World) or the couple — and who deletes
   the data after 30 days.
3. Whether "live headcount" may be promised for Premium only, Standard only on request,
   or not at all until the backend is live and tested.

No backend was built, no account was created, no form was pointed at a live endpoint.
