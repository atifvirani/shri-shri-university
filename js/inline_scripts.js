
//<![CDATA[
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
//]]>


$(document).ready(function () { $('#divRevoke').modal('hide'); });


//<![CDATA[
if (typeof(Sys) === 'undefined') throw new Error('ASP.NET Ajax client-side framework failed to load.');
//]]>



//<![CDATA[
Sys.WebForms.PageRequestManager._initialize('ctl00$sc1', 'aspnetForm', [], [], [], 360000, 'ctl00');
//]]>



    document.getElementById("year").textContent = new Date().getFullYear();
