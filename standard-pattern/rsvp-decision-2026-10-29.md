# RSVP Backend — DECISION (29 Oct 2026, Ravi: "rsvp ka kya hi kro")

## Faisla
- **Option B — Google Sheet via Apps Script (RECOMMENDED, design doc se).** Data host ke apne Google account me rehta hai, ₹0, koi naya vendor account nahi.
- **Account owner:** Ravi ka business Google account (ravipratap7081@gmail.com). Isi account se Sheet + Apps Script deployment hoga.
- **Live-headcount promise rule (LOCKED):** kisi customer se "live headcount" ka vaada NAHI hoga jab tak pipeline ban + ek asli test RSVP se verify na ho jaye. Tab tak pattern ka sach yehi hai: RSVP har visitor ke apne browser me save hota hai (localStorage) + CSV download.
- **Fallback barkarar:** Sheet POST fail ho to bhi RSVP local save + CSV download chalta rahega — guest ko kabhi error nahi dikhega.
- **Rules:** consent line form par, guest data shaadi ke 30 din baad delete, no guest login, no public guest list, no partner sharing.

## Kya ban gaya hai (live demo NOT touched)
- `rsvp-apps-script-Code.gs` — paste-ready Apps Script code (Sheet me row append karta hai).
- `rsvp-wired-snippet.html` — pattern me paste karne wala JS snippet (local save + Sheet POST dono).
- Setup steps neeche hain. Live `index.html` me kuch nahi badla hai.

## Setup (ek baar, Ravi ke Google sign-in se — VM browser Google session abhi signed out hai)
1. Business Google account se ek nayi Google Sheet banao, naam: "Nyota RSVP".
2. Extensions > Apps Script > `rsvp-apps-script-Code.gs` ka code paste karo, Save.
3. Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone > Deploy > Web app URL copy karo.
4. Pattern file me `rsvp-wired-snippet.html` paste karo aur `RSVP_ENDPOINT` ki jagah wo URL daalo.
5. Test: pattern kholo, ek test RSVP submit karo, Sheet me row aani chahiye + CSV download bhi chalna chahiye. Tabhi kisi customer ko Sheet wali baat batao.
6. Live demo me daalna + deploy alag word par hoga (copy-proposal + deploy abhi bhi pending approval par hain).
