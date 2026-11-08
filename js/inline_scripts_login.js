
        function DisableButton() {
            if (document.getElementById("txtEmpCodeOrEnrollment").value != "") {
                document.getElementById("btnSendVerification").disabled = true;
            }
        }
    


//<![CDATA[
var theForm = document.forms['form1'];
if (!theForm) {
    theForm = document.form1;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>



//<![CDATA[
if (typeof(Sys) === 'undefined') throw new Error('ASP.NET Ajax client-side framework failed to load.');
//]]>



//<![CDATA[
function WebForm_OnSubmit() {
if (typeof(ValidatorOnSubmit) == "function" && ValidatorOnSubmit() == false) return false;
return true;
}
//]]>



//<![CDATA[
Sys.WebForms.PageRequestManager._initialize('Scriptmanager1', 'form1', ['tupdLogin','','tupdForVIEWPDF',''], [], [], 90, '');
//]]>



//<![CDATA[
var Page_ValidationSummaries =  new Array(document.getElementById("vsLogin"));
var Page_Validators =  new Array(document.getElementById("rfvtxtuser"), document.getElementById("rfvtxtpass"), document.getElementById("rfvtxtEmpCodeOrEnrollment"));
//]]>



//<![CDATA[
var vsLogin = document.all ? document.all["vsLogin"] : document.getElementById("vsLogin");
vsLogin.headertext = "Please correct the following errors:";
vsLogin.showmessagebox = "True";
vsLogin.showsummary = "False";
vsLogin.validationGroup = "vgLogin";
var rfvtxtuser = document.all ? document.all["rfvtxtuser"] : document.getElementById("rfvtxtuser");
rfvtxtuser.controltovalidate = "txtuser";
rfvtxtuser.errormessage = "Please enter Roll / Enrollment No / EMP Code.";
rfvtxtuser.display = "None";
rfvtxtuser.validationGroup = "vgLogin";
rfvtxtuser.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
rfvtxtuser.initialvalue = "";
var rfvtxtpass = document.all ? document.all["rfvtxtpass"] : document.getElementById("rfvtxtpass");
rfvtxtpass.controltovalidate = "txtpass";
rfvtxtpass.errormessage = "Please enter Password.";
rfvtxtpass.display = "None";
rfvtxtpass.validationGroup = "vgLogin";
rfvtxtpass.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
rfvtxtpass.initialvalue = "";
var rfvtxtEmpCodeOrEnrollment = document.all ? document.all["rfvtxtEmpCodeOrEnrollment"] : document.getElementById("rfvtxtEmpCodeOrEnrollment");
rfvtxtEmpCodeOrEnrollment.controltovalidate = "txtEmpCodeOrEnrollment";
rfvtxtEmpCodeOrEnrollment.errormessage = "*";
rfvtxtEmpCodeOrEnrollment.display = "Dynamic";
rfvtxtEmpCodeOrEnrollment.validationGroup = "vgReset";
rfvtxtEmpCodeOrEnrollment.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
rfvtxtEmpCodeOrEnrollment.initialvalue = "";
//]]>



//<![CDATA[

(function(id) {
    var e = document.getElementById(id);
    if (e) {
        e.dispose = function() {
            Array.remove(Page_ValidationSummaries, document.getElementById(id));
        }
        e = null;
    }
})('vsLogin');

var Page_ValidationActive = false;
if (typeof(ValidatorOnLoad) == "function") {
    ValidatorOnLoad();
}

function ValidatorOnSubmit() {
    if (Page_ValidationActive) {
        return ValidatorCommonOnSubmit();
    }
    else {
        return true;
    }
}
        Sys.Application.add_init(function() {
    $create(Sys.UI._UpdateProgress, {"associatedUpdatePanelId":null,"displayAfter":500,"dynamicLayout":true}, null, null, $get("UpdateProgress1"));
});

document.getElementById('rfvtxtuser').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('rfvtxtuser'));
}

document.getElementById('rfvtxtpass').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('rfvtxtpass'));
}

document.getElementById('rfvtxtEmpCodeOrEnrollment').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('rfvtxtEmpCodeOrEnrollment'));
}
//]]>



        $('#forget-password').on('shown.bs.modal', function () {
            $('#txtEmpCodeOrEnrollment').focus();
        });

        $(document).on('keypress', '#txtEmpCodeOrEnrollment', function (e) {
            if (e.which === 13) {
                e.preventDefault();
                $('#btnSendVerification').click();
                return false;
            }
        });


        if (document.getElementById("full-sider")) {
            $(document).ready(function () {

                var owl = $("#full-sider");

                owl.owlCarousel({
                    navigation: false,
                    singleItem: true,
                    transitionStyle: "fade",
                    autoplay: true,
                    autoplayTimeout: 8000,
                    items: 1,
                    mouseDrag: false,
                    touchDrag: false,
                    rewind: true,
                    animateOut: 'fadeOut',
                    dot: true,
                });

                $('.play').on('click', function () {
                    owl.trigger('play.owl.autoplay', [1000])
                    $('.pause').show();
                    $('.play').hide();
                })
                $('.pause').on('click', function () {
                    owl.trigger('stop.owl.autoplay')
                    $('.pause').hide();
                    $('.play').show();
                })
            });
        }

    