# Nyota Standard ₹2,499 — Invite Pattern (working file)

## File
- `standard-invite-pattern.html` — standalone Standard invite pattern with the 3 new Standard features.
  NOT linked from `index.html`. NOT deployed. `index.html` (live demo) is untouched.

## The 3 features (all in this file, verified locally 29 Oct 2026)
1. **Per-function RSVP breakdown** — Har function (Haldi / Mehndi / Vivah / Reception) ke liye alag:
   haan wale jawab, kul mehman, Veg mehman, Non-veg mehman, nahi wale. Plus kul total row.
2. **Guest-list CSV download** — "Guest list CSV download karo" button: saari RSVP entries ka `.csv`
   (Naam, Karyakram, Aayenge, Mehman, Khaane ki pasand, Samay), Excel/Sheets me khulta hai,
   Hindi ke liye BOM ke saath. CSV escaping (comma/quote/newline) handled hai.
3. **Meal-preference RSVP question** — "Khaane ki pasand": Veg / Non-veg / Koi khaas pasand nahi.
   "Nahi aa paunga" chunte hi ye sawaal disable ho jata hai; decline entries me meal "—" rehta hai
   aur unke mehman ginti me nahi judte.

## How a customer invite is made from this file
Bracket placeholders badlo: couple ke naam, families, dates, venue, function list. RSVP block + script
jaisa hai waisa rakho. Premium ₹3,999 unchanged — is file se Premium me kuch nahi badla.

## Honest limit (must read before promising a customer)
Entries isi browser me save hoti hain (localStorage). Alag-alag phone se aaye jawab ek central list me
tabhi judenge jab koi form backend/endpoint lagega — wo backend is task me nahi bana hai (usme signup/
spend ho sakta hai, isliye bina Ravi ke word ke nahi). Customer ko ye mat kaho ki "sab guests ke jawab
ek jagah auto-jud jayenge" jab tak backend na lage. CSV export wahi entries deta hai jo is browser me
record hui hain.

## Gates — Ravi's word still needed
- Demo copy update (pricing table / feature list me ye 3 features jodna) — ONLY on Ravi's word, features
  verify hone ke baad.
- Deploy / push — ONLY on Ravi's word. Is folder me `test-evidence/` test screenshot hai — kisi bhi
  deploy se pehle use hatana ya folder ko deploy se bahar rakhna hai.
- Form backend (central RSVP collection) — alag faisla, alag task.
