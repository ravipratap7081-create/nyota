/**
 * Nyota RSVP — Google Apps Script backend, HARDENED v2
 * (PREPARED 30 Oct 2026 — NOT YET APPLIED. Live deployment is still v1, 29 Oct 2026.)
 *
 * APPLY STEPS (owner / Muse, only on Ravi's word for this action):
 *  1. Open the bound "Nyota RSVP" script, replace Code.gs with this file, Save.
 *  2. Deploy > Manage deployments > edit the web-app deployment > New version.
 *     Endpoint URL stays the same ONLY if you version the SAME deployment; a
 *     brand-new deployment gives a NEW exec URL — then update RSVP_ENDPOINT
 *     in standard-invite-pattern.html.
 *  3. Optional spam key: Script Properties > add RSVP_FORM_KEY = <random string>,
 *     and put the SAME string in the pattern's RSVP_FORM_KEY. If the property is
 *     unset, the key check is SKIPPED (fail-open) so existing invites keep working.
 *  4. Test POST (guest=TEST-DELETE-2) > confirm row > DELETE the test row >
 *     confirm headers-only, exactly like the 29 Oct v1 test.
 *
 * WHAT v2 ADDS OVER v1 (gaps found in the 30 Oct audit):
 *  - Honeypot: a hidden "website" field guests never fill; bots fill it -> row
 *    rejected, response says "ignored" (no reveal).
 *  - Shared form key (spam friction, NOT authentication): see step 3. True
 *    per-invite tokens (one secret per customer invite, issued by the host) are
 *    the follow-up when the first real invite ships — they need host-side
 *    issuance tooling, which does not exist yet. Do NOT call this key "secure"
 *    to a customer.
 *  - Validation: empty guest rejected; attend must be yes/no/Haan/Nahi
 *    (normalised to Haan/Nahi for the Sheet); count clamped 1-20; fields
 *    truncated to sane lengths. v1 appended a row for ANY post, even an empty one.
 *  - Global rate limit: max 20 POSTs/minute across ALL guests (CacheService
 *    counter). Honest limit: Apps Script exposes NO client IP, so per-IP
 *    limiting is impossible here — this cap only blunts floods, it does not
 *    identify abusers.
 *  - Lock honoured: if the script lock cannot be taken, the POST fails loudly
 *    instead of racing appends.
 *  - Listener-order fix (pattern side): the pattern's local submit listener
 *    runs BEFORE the sync listener and resets the form, so a naive FormData
 *    read in the sync listener would send an EMPTY guest name. The hardened
 *    pattern snippet therefore tracks field values on input/change and sends
 *    those, not a post-reset FormData read. (Form-path sync was never
 *    end-to-end proven — only a manual POST was proven 29 Oct — so this bug
 *    is latent, caught by code reading before any real invite shipped.)
 *
 * DATA RULES UNCHANGED: Sheet private to the host; consent on the form; guest
 * data deleted 30 days after the wedding; no guest login; no public list;
 * no partner sharing.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    return jsonOut({ result: 'error', message: 'busy, try again' });
  }
  try {
    var d = (e && e.parameter) || {};

    // Honeypot: real guests never fill "website" (hidden field). Bots do.
    if (d.website) {
      return jsonOut({ result: 'ignored' });
    }

    // Shared form key — skipped entirely when the property is unset (fail-open).
    var expectedKey = PropertiesService.getScriptProperties().getProperty('RSVP_FORM_KEY');
    if (expectedKey && d.key !== expectedKey) {
      return jsonOut({ result: 'error', message: 'bad key' });
    }

    // Global rate limit: 20 POSTs per minute, all guests combined.
    var cache = CacheService.getScriptCache();
    var bucket = 'rsvp_min_' + Math.floor(Date.now() / 60000);
    var used = parseInt(cache.get(bucket) || '0', 10);
    if (used >= 20) {
      return jsonOut({ result: 'error', message: 'rate limited' });
    }
    cache.put(bucket, String(used + 1), 60);

    // Validation + normalisation.
    var guest = String(d.guest || '').trim().slice(0, 100);
    if (!guest) {
      return jsonOut({ result: 'error', message: 'guest name required' });
    }
    var fn = String(d.fn || '').trim().slice(0, 50);
    var attendRaw = String(d.attend || '').trim().toLowerCase();
    var attend;
    if (attendRaw === 'yes' || attendRaw === 'haan') attend = 'Haan';
    else if (attendRaw === 'no' || attendRaw === 'nahi' || attendRaw === 'na') attend = 'Nahi';
    else return jsonOut({ result: 'error', message: 'attend must be yes/no' });
    var count = parseInt(d.count, 10);
    if (isNaN(count) || count < 1) count = 1;
    if (count > 20) count = 20;
    var meal = String(d.meal || '').trim().slice(0, 50);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVP');
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('RSVP');
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Guest', 'Function', 'Attending', 'Count', 'Meal']);
    }
    sheet.appendRow([new Date(), guest, fn, attend, count, meal]);
    return jsonOut({ result: 'ok' });
  } catch (err) {
    return jsonOut({ result: 'error', message: 'server error' });
  } finally {
    lock.releaseLock();
  }
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Browser me kholo to pata chale endpoint zinda hai ya nahi. */
function doGet() {
  return jsonOut({ result: 'Nyota RSVP endpoint live' });
}
