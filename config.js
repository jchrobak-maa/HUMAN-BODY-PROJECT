/* =========================================================================
   HUMAN BODY MUSEUM — SITE CONFIG
   =========================================================================
   Student-notes feature. Notes always save on the student's own device.
   To ALSO collect them in a Google Sheet you (the teacher) can see, follow
   the setup steps, then paste your Apps Script web-app URL below between the
   quotes. Leave it blank to keep notes device-only.

   Example:
     endpoint: "https://script.google.com/macros/s/AKfy..../exec"
   ========================================================================= */
window.NOTES_CONFIG = {
  endpoint: "",          // <-- paste your Google Apps Script /exec URL here
  requireClassCode: true // students must enter a class/period code before saving
};
