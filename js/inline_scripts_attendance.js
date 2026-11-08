
var theForm = document.forms['aspnetForm'];
if (!theForm) {
    theForm = document.aspnetForm;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}

$(document).ready(function () {
    if ($ && $('#divRevoke').length && $('#divRevoke').modal) {
        try { $('#divRevoke').modal('hide'); } catch (e) {}
    }
});

if (typeof Sys !== 'undefined' && Sys.WebForms && Sys.WebForms.PageRequestManager) {
    try {
        Sys.WebForms.PageRequestManager._initialize('ctl00$sc1', 'aspnetForm', [], [], [], 360000, 'ctl00');
    } catch (e) {}
}

var yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
