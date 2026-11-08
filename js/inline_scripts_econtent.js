
        function callRedioSOrF() {
            var a = document.getElementById("subject");
            if (a.checked) {
                document.getElementById("lblSBySorF").innerHTML = 'F';
                document.getElementById("divSubject").style.display = "none";
                document.getElementById("divEmployee").style.display = "block";
            }
            else {
                document.getElementById("lblSBySorF").innerHTML = 'S';
                document.getElementById("divSubject").style.display = "block";
                document.getElementById("divEmployee").style.display = "none";
            }
        }
        function callRedioFullorMysub() {
            var b = document.getElementById("full");
            if (b.checked)
            { document.getElementById("lblFullOrMySub").innerHTML = 'F'; }
            else
            { document.getElementById("lblFullOrMySub").innerHTML = 'M'; }
        }
        function callRedioSem() {

            var S1 = document.getElementById("S1");
            var S2 = document.getElementById("S2");
            var S3 = document.getElementById("S3");
            var S4 = document.getElementById("S4");
            var S5 = document.getElementById("S5");
            var S6 = document.getElementById("S6");
            var S7 = document.getElementById("S7");
            var S8 = document.getElementById("S8");

            if (S1.checked)
            { document.getElementById("lblSem").innerHTML = '1'; }
            else if (S2.checked)
            { document.getElementById("lblSem").innerHTML = '2'; }
            else if (S3.checked)
            { document.getElementById("lblSem").innerHTML = '3'; }
            else if (S4.checked)
            { document.getElementById("lblSem").innerHTML = '4'; }
            else if (S5.checked)
            { document.getElementById("lblSem").innerHTML = '5'; }
            else if (S6.checked)
            { document.getElementById("lblSem").innerHTML = '6'; }
            else if (S7.checked)
            { document.getElementById("lblSem").innerHTML = '7'; }
            else if (S8.checked)
            { document.getElementById("lblSem").innerHTML = '8'; }

        }
    


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
Sys.WebForms.PageRequestManager._initialize('ctl00$sc1', 'aspnetForm', ['tctl00$ContentPlaceHolder1$UpPopUpBackColor1','','tctl00$ContentPlaceHolder1$pnl1','','tctl00$ContentPlaceHolder1$grdTitleUpdatePanel1','','tctl00$ContentPlaceHolder1$listDocumentTypeUpdatePanel1',''], [], [], 360000, 'ctl00');
//]]>



        var actTitle = 1;
        var actDocType = 1;
        var actSearchTypeId = "subject";
        function resetTitle() {
            $('#lnkTitle li').removeClass('active');
            $('#lnkDocType li').removeClass('active');
            $('#lnkTitle li').first().addClass('active');
            $('#lnkDocType li').first().addClass('active');
            actTitle = 1;
            actDocType = 1;
        }
        function getCurTitle() {
            actTitle = $('#lnkTitle .active').index();
            actDocType = $('#lnkDocType .active').index();
            actSearchTypeId = $('.inline-radio-chck input[type=radio]:checked').attr('id');
        } function setCurTitle() {
            $('#lnkTitle li').removeClass('active');
            $('#lnkDocType li').removeClass('active');
            $('#lnkTitle li').eq(actTitle).addClass('active');
            $('#lnkDocType li').eq(actDocType).addClass('active');
            $('#' + actSearchTypeId).attr('checked', true);
            if ($('#' + actSearchTypeId).attr("id") == "subject") {
                $('#txtEmployee').hide();
                $('#txtSearch').show();
                $('#divSOrF').html("S");
            }
            if ($('#' + actSearchTypeId).attr("id") == "faculty") {
                $('#txtEmployee').show();
                $('#txtSearch').hide();
                $('#divSOrF').html("F");
            }

        }
        $(document).ready(function () {
            resetTitle();
        });
    


    document.getElementById("year").textContent = new Date().getFullYear();



//<![CDATA[
Sys.Application.add_init(function() {
    $create(Sys.Extended.UI.AutoCompleteBehavior, {"completionListCssClass":"autocomplete_completionListElement","completionListItemCssClass":"autocomplete_listItem","completionSetCount":1,"delimiterCharacters":"","enableCaching":false,"highlightedItemCssClass":"autocomplete_highlightedListItem","id":"ctl00_ContentPlaceHolder1_AutoCompleteExtender2","minimumPrefixLength":2,"serviceMethod":"GetDocumentName","servicePath":"GetStudentDocName.asmx"}, null, null, $get("txtSearch"));
});
Sys.Application.add_init(function() {
    $create(Sys.Extended.UI.AutoCompleteBehavior, {"completionListCssClass":"autocomplete_completionListElement","completionListItemCssClass":"autocomplete_listItem","completionSetCount":2,"delimiterCharacters":"","enableCaching":false,"highlightedItemCssClass":"autocomplete_highlightedListItem","id":"ctl00_ContentPlaceHolder1_AutoCompleteExtender1","minimumPrefixLength":1,"serviceMethod":"GetTeachingEmployeeName","servicePath":"GetEmployeeName.asmx"}, null, null, $get("txtEmployee"));
});
//]]>
