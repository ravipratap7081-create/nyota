/**
 * Nyota RSVP — Google Apps Script backend (Option B).
 * Setup: nayi Google Sheet > Extensions > Apps Script > ye code paste > Save
 * > Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone.
 * Sheet ka pehla tab "RSVP" hona chahiye; headers pehli run par auto-banenge.
 * Data: Timestamp, Guest, Function, Attending, Count, Meal.
 * Rules: consent form par liya jata hai; guest data shaadi ke 30 din baad
 * manually delete karna hai; koi guest login / public list nahi.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVP');
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('RSVP');
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Guest', 'Function', 'Attending', 'Count', 'Meal']);
    }
    var d = e.parameter || {};
    sheet.appendRow([
      new Date(),
      d.guest || '',
      d.fn || '',
      d.attend || '',
      d.count || '',
      d.meal || ''
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** Browser me kholo to pata chale endpoint zinda hai ya nahi. */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'Nyota RSVP endpoint live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
