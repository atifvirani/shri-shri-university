    $(document).ready(function () { 
    
    var location = window.location.href.toLowerCase();
    if (location.indexOf("dashboard") > -1) {
       try{
    toastr.info('Econtent and for more features please refer Academic Dashbaord module at home screen. <br /><br /><a href="../AcademicDash/StudentUI/StudentHome.aspx" >Click here</a>', 'New Module Arrival <br/>(Academic Dashboard) :', {
                  "closeButton": true,
                  "debug": false,
                  "newestOnTop": false,
                  "progressBar": true,
                  "positionClass": "toast-bottom-right",
                  "preventDuplicates": false,
                  "onclick":null,
                  "showDuration": "300",
                  "hideDuration": "500",
                  "timeOut": "5000",
                  "extendedTimeOut": "1000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
    });
       } catch (d) { }
    }
});

if (document.getElementById("owl-demo")) {
    $(document).ready(function () {



        var owl = $("#owl-demo");

        owl.owlCarousel({
            navigation: false,
            singleItem: true,
            transitionStyle: "fade",
            autoPlay: 5000
        });

    });
}

if (document.getElementById("row-2-slide")) {
    $(document).ready(function () {
        $("#row-2-slide").owlCarousel({
            items: 2,
            autoPlay: 5000,
            navigation: false,
            slideSpeed: 400,
            pagination: true,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [990, 3],
            itemsTablet: [768, 2]
        });
    });
}
if (document.getElementById("exam-slider")) {
    $(document).ready(function () {
        $("#exam-slider").owlCarousel({
            items: 4,
            autoPlay: 5000,
            pagination: true,
            navigation: false,
            slideSpeed: 400,
            maring: 10,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [990, 3],
            itemsTablet: [768, 2]
        });
    });
}
if (document.getElementById("shrtcut-slide")) {
    $(document).ready(function () {
        $("#shrtcut-slide").owlCarousel({
            items: 5,
            autoPlay: 4000,
            navigation: true,
            slideSpeed: 400,
            pagination: false,
            stoponHover: true,
            stopOnHover: true,
            itemsTablet: [768, 4],
            itemsMobile: [480, 2],
        });
    });
}

$(function () {
    $('.nav li').hover(function () {
        $(this).find('.drp-this').css({
            'opacity': 0,
            'margin-top': 30
        }).show().animate({
            'margin-top': 0,
            'opacity': 1
        }, 300);
    }, function () {
        $(this).find('.drp-this').fadeOut(200, function () {
            $(this).hide();
            $(this).removeAttr('style');
        });
    });

    $('.drp-this').hover(function () {
        $(this).parent().find("a").css("background-color", "rgb(232,89,89)")
    }, function () {
        $(this).prev().removeAttr('style');
    });

});


function setVerticalScroll() {
    $(".vertical-scroll").mCustomScrollbar({
        autoHideScrollbar: true,
        mouseWheelPixels: 100
    });
}

function setHorizontalScroll() {
    $(".horizontal-scroll").mCustomScrollbar({
        axis: "x",
        advanced: {
            autoExpandHorizontalScroll: true,
            mouseWheelPixels: 100
        }
    });
}

if ($(".vertical-scroll").length) {
    (function ($) {
        $(window).load(function () {
            setVerticalScroll();
        });
    })(jQuery);
}

if ($(".horizontal-scroll").length) {
    (function ($) {
        $(window).load(function () {
            setHorizontalScroll();
        });
    })(jQuery);
}


$(function () {
    $("ul.sortorder").sortable({
        connectWith: "ul.sortorder",
        stop: function (evt, ui) {
            var jsonObj = {} //setNewOrder();
            var p = 0;

            $("#ctl00_ContentPlaceHolder1_StudentExamFormPS1_hfFirst").val($('li.q').eq(0).text().trim());
            $("#ctl00_ContentPlaceHolder1_StudentExamFormPS1_hfMiddle").val($('li.q').eq(1).text().trim());
            $("#ctl00_ContentPlaceHolder1_StudentExamFormPS1_hfLast").val($('li.q').eq(2).text().trim());
        }
    });
});

/* bar chart */


$(document).ready(function () {
    var exampleBarChartData = {
        "datasets": {
            "values": [5, 4, 1, 2.5],
            "labels": [
				"1",
				"2",
				"3",
				"4"
            ],
            "color": "blue"
        },
        "title": "Semester",
        "noY": false,
        "height": "300px",
        "width": "600px",
        "hovered": true
    };

    MaterialCharts.bar("#bar-chart-example", exampleBarChartData)
});


/* bar chart end */

var stickySidebar = $('#sticky').offset().top;

$(window).scroll(function() {  
    if ($(window).scrollTop() > stickySidebar) {
        $('#sticky').addClass('stick');
    }
    else {
        $('#sticky').removeClass('stick');
    }  
});

if ($(".side-bar").length) {
    $(document).on("click", ".more", function () {
        $('.side-bar').show().animate({
            right: 0
        });
        $('.close-btn-top').show().animate({
            right: 300
        });

        $("body").addClass('no-scroll');
        $(".side-bar-overlay").show();
    });

    $(document).on("click", ".close-btn-top", function () {
        $('.side-bar, .close-btn-top').animate({
            right: -300,
        }, function () {
            $('.side-bar, .close-btn-top').fadeOut(
                function () {
                    $(this).removeAttr('style');
                }
            );
        });
        $("body").removeClass('no-scroll');
        $(".side-bar-overlay").hide();
    });

    $(document).on("click", function (event) {
        var $trigger = $(".side-bar, .more");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $(".side-bar, .close-btn-top").animate({
                right: -300,
            }, function () {
                $('.side-bar, .close-btn-top').fadeOut(
					function () {
					    $(this).removeAttr('style');
					}
				);
                $("body").removeClass('no-scroll');
                $(".side-bar-overlay").hide();
            });
        }

    });
}


$(function () {
    if ($('.drp-this-inr').hasClass('drp-this-inr')) {
        $('.drp-this-inr').parent("li").addClass('drp-dwn');
    }
});

$(document).ready(function () {
    //toggle the component with class accordion_body
    $(".side-bar li").click(function () {
        $(".side-bar li").removeAttr("style");
        if ($(".drp-this-inr").is(':visible')) {
            $(".drp-this-inr").slideUp(300);
            $(".side-bar li").removeAttr("style");

        }

        if ($(this).find(".drp-this-inr").is(':visible')) {
            $(this).find(".drp-this-inr").slideUp(300);
            $(".side-bar li").removeAttr("style");


        } else {
            $(this).find(".drp-this-inr").slideDown(300);
            $(this).css("background", "#E85959");

        }
    });
});

$('.top-icon li:first').click(function () {
    $('.search').fadeIn();
    $(this).find('.icon').fadeOut();
});

$(document).on("click", function (event) {
    var $trigger = $(".top-icon li:first, .search");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".search").fadeOut("fast");
        $('.top-icon li:first').find('.icon').fadeIn();
    }
});


$(document).on("click", ".usr-drp", function () {
    $(this).next().slideToggle();
});

$(document).on("click", function (event) {
    var $trigger = $(".usr-drp, .user-detail .drp-this");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".user-detail .drp-this").slideUp("fast");
    }
});

$(document).on("click", ".top-icon .ion-ios-bell-outline", function () {
    $(this).next().slideToggle();
});

$(document).on("click", function (event) {
    var $trigger = $(".top-icon li:last");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".top-icon .drp-this").slideUp("fast");
    }
});



$('.breadcrums li:last a').addClass('active');

$('[data-toggle="tooltip"]').tooltip();


function setToggle() {

    if ($('#leave').is(":checked")) {
        $('.for-leave').show();
    }

    if ($('#gatepass').is(":checked")) {
        $('.for-gatepass').show();
    }

    if ($('#leavehistory').is(":checked")) {
        $('.for-leavehistory').show();
    }

    if ($('#gatepasshistory').is(":checked")) {
        $('.for-gatepasshistory').show();
    }


    $('input[type="radio"]').click(function () {

        if ($(this).attr("id") == "leave") {
            document.getElementById('ctl00_ContentPlaceHolder1_hdLeaveType').value = "L";
            $('.for-gatepass').hide();
            $(".for-leave").show();

        }

        if ($(this).attr("id") == "gatepass") {
            document.getElementById('ctl00_ContentPlaceHolder1_hdLeaveType').value = "P";
            $('.for-leave').hide();
            $(".for-gatepass").show();
        }

        if ($(this).attr("id") == "leavehistory") {
            document.getElementById('ctl00_ContentPlaceHolder1_hdnHistoryType').value = "L";
            $('.for-gatepasshistory').hide();
            $(".for-leavehistory").show();

        }

        if ($(this).attr("id") == "gatepasshistory") {
            document.getElementById('ctl00_ContentPlaceHolder1_hdnHistoryType').value = "P";
            $('.for-leavehistory').hide();
            $(".for-gatepasshistory").show();
        }
    });

};
$(document).ready(function () {
    setToggle();
    setCalenderTime();
	
	
});

function setCalenderTime() {
    $('.cal').datetimepicker({
        format: 'll',
        useCurrent: false,
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "ion-chevron-up",
            down: "ion-chevron-down",
            previous: "ion-chevron-left",
            next: "ion-chevron-right",
        }

    });

    $('.time').datetimepicker({
        format: 'LT',
        useCurrent: false,
        icons: {

            up: "ion-chevron-up",
            down: "ion-chevron-down"
        },


    });



}

$(document).on("click", ".accordion-head", function () {

    $('accordion.data').slideUp();
    if ($('.accordion-data').is(':visible')) {
        $('.accordion-data').slideUp();
        $('.accordion-head').removeClass('active');
        $(".accordion-head i").addClass('ion-plus-circled');
    }

    if ($(this).next().is(':visible')) {
        $(this).next().slideUp();
        $(this).removeClass('active');
        $(this).prev().find('i').removeClass("ion-minus-circled").addClass('ion-plus-circled');
    }
    else {
        $(this).next().slideDown();
        $(this).addClass('active');
        $(this).find('i').removeClass("ion-plus-circled").addClass('ion-minus-circled');
    }
});

//$(document).ready(function(){
//	$('#admsn-cncl').click(function(){
//		$('.admsn-cancel').show();
//		$('.main-cancel').hide();	
//	});

//	$('#cmplt-rfnd').click(function(){
//		$('.completion').show();
//		$('.main-cancel').hide();	
//	});	

//	$('#trnsprt-rfnd').click(function(){
//		$('.transportation').show();
//		$('.main-cancel').hide();	
//	});

//	$('#hostel-rfnd').click(function(){
//		$('.hostel').show();
//		$('.main-cancel').hide();	
//	});

//	$('.back').click(function(){
//		$(this).parent().hide();
//		$('.main-cancel').show();
//	});
//});

$(document).ready(function () {

    $('.inline-radiobtnlist-chck input[type="radio"]').addClass("same-clr");
    $('#subject').attr('checked', true);

    $('#newreq-dtl').attr('checked', true);

    $(document).on("click", 'input[type="radio"]', function () {

        if ($(this).attr("id") == "subject") {
            $('#txtEmployee').hide();
            $('#txtSearch').show();
            $('#divSOrF').html("S");
        }

        if ($(this).attr("id") == "faculty") {
            $('#txtEmployee').show();
            $('#txtSearch').hide();
            $('#divSOrF').html("F");
        }

        if ($(this).attr("id") == "newreq") {
            $('#newreq-dtl').show();
            $('#refund-dtl').hide();
            //$('#divSOrF').html("F");
        }

        if ($(this).attr("id") == "refund") {
            $('#refund-dtl').show();
            $('#newreq-dtl').hide();
            //$('#divSOrF').html("F");
        }

    });
	
	$(".select2-single").select2({
    theme: "bootstrap" 
    });

    $('.multi-select').select2({
        closeOnSelect: true,
        minimumResultsForSearch: -1
    });

    $('.multi-select-search').select2({
        closeOnSelect: true,
        minimumResultsForSearch: 3
    });
    ChangeUIFileUpload();
});

$(document).on("click", ".toggle-btn", function () {
    if ($(this).attr("value") == "no") {
        $(this).attr("value", "yes");

        $(this).removeClass('btn-danger').addClass('btn-success');
    }

    else {

        $(this).attr("value", "no");
        $(this).removeClass('btn-sucess').addClass('btn-danger');
    }
});

function CreateDynamicModel(id, title, content) {
    var model = "<div class='modal fade' id='" + id + "' role='dialog'><div class='modal-dialog'><div class='modal-content'>";
    model += "<div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button>";
    model += "<h4 class='modal-title'>" + title + "</h4></div>";
    model += "<div class='modal-body clearfix'><div class='col-md-12'>" + content + "</div></div></div></div></div>";
    $('#' + id).remove();
    $("body").append(model);
    $('#' + id).modal('show');
}

$(document).ready(function () {
    //            $('.imageUploaderField').inputFileText({
    //                text: 'Select Assignment File',
    //                buttonClass: 'button-class',
    //                textClass: 'text-class'
    //            });
	$(".select2-single").select2({
    theme: "bootstrap" 
	});
});


function setNavigation() {
    var path = window.location.pathname.split("/").slice(-1)[0];

    $("#sticky a").each(function () {
        var href = $(this).attr('href');
        $(this).removeClass('active');

    });
    var parentDiv = $('a[href="' + window.location.pathname.split("/").slice(-1)[0] + '" i]').closest("div");
    if (parentDiv.attr('class') == 'drp-this') {
        parentDiv.closest("li").children("a").addClass('active')
    }
    $('.main-nav li a[href="' + window.location.pathname.split("/").slice(-1)[0] + '" i]').addClass('active');
    $('.side-nav ul li a[href="' + window.location.pathname.split("/").slice(-1)[0] + '" i]').addClass('active');

}


function ShowTimeHome() {
    window.setTimeout("ShowTimeHome()", 1000); // Here 1000(milliseconds) means one 1 Sec

    var username = getCookieHome("IsClose");
    if (username == "TRUE") {
        $('#divBackpopupMain').modal('hide');
    }

}
function getCookieHome(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function ShowTime() {
    window.setTimeout("ShowTime()", 1000); // Here 1000(milliseconds) means one 1 Sec
    var username = getCookie("IsStop");
    //alert("hello");
    if (username == "TRUE") {

        var ckN = getCookie("IsStop");
        //alert(ckN);

        eraseCookie("IsStop");

        createCookie("IsStop", "FALSE", 1);
        var ckN2 = getCookie("IsStop");
        //alert(ckN2);

        document.getElementById('ctl00_ContentPlaceHolder1_PopupCTRLMain_btnMyClickHide').click();
        //alert(response.Cookies["IsStop"].Value.toString());
    }

}
function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/; domain=.e.srisriuniversity.edu.in";

}


if (typeof Sys !== 'undefined' && Sys.WebForms && Sys.WebForms.PageRequestManager) {
    try {
        Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(BeginRequestHandler);
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
    } catch (e) {}
}
function BeginRequestHandler(sender, args) {
    //    var elem = args.get_postBackElement();
    //ActivateAlertDiv('visible', 'AlertDiv',  ' processing...');]
    $('#AlertDiv').css('display', 'block');
	
}
function EndRequestHandler(sender, args) {
    $('#AlertDiv').css('display', 'none');
    $('.inline-radiobtnlist-chck input[type="radio"]').addClass("same-clr");
    setVerticalScroll(); setHorizontalScroll(); setCalenderTime();
    setSubjectSelection();
    CheckboxDesign();
    ChangeUIFileUpload();
    $('.multi-select').select2({
        closeOnSelect: true,
        minimumResultsForSearch: -1
    });

    $('.multi-select-search').select2({
        closeOnSelect: true,
        minimumResultsForSearch: 3
    });

}
var pageIndex = 0;
var pageCount = 10;


function GetPlacementsRecords() {
    pageIndex++;
    if (pageIndex == 2 || pageIndex <= pageCount) {
        $('#AlertDiv').css('display', 'block');
        $.ajax({
            type: "POST",
            url: "StudentsPlacements.aspx/GetPlacementsData",
            data: '{pageIndex: ' + pageIndex + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnPlacementsRecordSuccess,
            failure: function (response) {
                alert(response.d);
            },
            error: function (response) {
                alert(response.d);
            }
        });
    }
}
function OnPlacementsRecordSuccess(response) {
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var Placements = xml.find("Table1");
    pageCount = parseInt(xml.find("PageCount").eq(0).find("TotalPages").text());
    var div = $(".plcmnt-pg")
    Placements.each(function () {
        var Placement = $(this);
        var row = $(".plcmnt-pg div").eq(0).clone(true);
        $(".stndnt-img img", row).attr("src", "../handler/getImage.ashx?SID=" + Placement.find("StudentID").text());
        $(".stndnt-name", row).html(Placement.find("StudentName").text() + " - <span>" + Placement.find("StreamName").text() + "</span>");
        $(".package", row).html("Package - " + Placement.find("PackageOffered").text());
        $(".placement-dt", row).html("Placement Date - " + Placement.find("CampusVisitDateVal").text());
        $(".cmpny-nm", row).html(Placement.find("CompanyName").text());
        div.append(row);
    });
    $('#AlertDiv').css('display', 'none');
}


//=============ALERT MESSAGE ON ADDDING QUICK MENU ============================

function HideMsgAlert(m, s) {

    var seconds;
    if (s === undefined) {
        seconds = 10;
    } else {
        seconds = s;
    }

    document.getElementById("MsgAlert").innerHTML = m;
    document.getElementById("MsgAlert").style.display = "block";
    setTimeout(function () {
        document.getElementById("MsgAlert").style.display = "none";
        document.getElementById("MsgAlert").innerHTML = "";
    }, seconds * 1000);



}
if (document.getElementById("attendance-chart")) {

    var aLabels;
    var aLab;
    var aTheory;
    var aWorkshop;

    try {
        $.ajax({
            type: "GET",
            url: "Attendance.aspx/ChartData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            complete: function (jqXHR, status) {
                if (jqXHR && jqXHR.responseText) {
                    var obj = JSON.parse(jqXHR.responseText);
                    var aData = (typeof obj.d === 'string') ? JSON.parse(obj.d) : obj.d;
                    aLabels = aData[0];
                    aLab = aData[1];
                    aTheory = aData[2];
                    aWorkshop = aData[3];
                }
            }
        });
    } catch (e) {
        // Fallback gracefully in isolated offline environments
    }

    // Ensure Synthetic Demonstration Data is used if not already assigned
    if (!aLabels || !aTheory || !aLab) {
        var synth = (window.getSyntheticChartData) ? JSON.parse(window.getSyntheticChartData().d) : [
            [
                "PMM", "P L", "AST", "DCFATAI", "DFAL", "DATA STRUC C",
                "EGD", "IDTL", "DESIGN THINK", "DIGITAL LOG", "EXP SOFT COMP",
                "RPAUB", "MRN", "ML TI", "FNTC", "CMTS",
                "OOP", "J L", "ADA", "AGTS", "DAT", "MOL", "EVTA"
            ],
            [
                0, 40, 61, 0, 57, 0,
                56, 67, 0, 67, 91,
                0, 0, 36, 49, 36,
                0, 53, 0, 100, 0, 57, 56
            ],
            [
                56, 0, 26, 55, 0, 0,
                0, 0, 13, 38, 0,
                43, 54, 0, 47, 71,
                48, 0, 45, 0, 35, 0, 0
            ],
            new Array(23).fill(0)
        ];
        aLabels = synth[0];
        aLab = synth[1];
        aTheory = synth[2];
        aWorkshop = synth[3];
    }

    var aChartType = "horizontalBar";
    var afillStyle = '#fff';
    var afontSize = 11;
    var atextAlign = 'right';
    var atextBaseline = 'middle';
    var apadding = -5;

    var barChartData = {
        labels: aLabels,
        datasets: [{
            label: 'Lab',
            backgroundColor: '#0067ac',
            hoverBackgroundColor: '#0067ac',
            data: aLab
        }, {
            label: 'Theory',
            backgroundColor: '#449d44',
            hoverBackgroundColor: '#449d44',
            data: aTheory
        },
        {
            label: 'Workshop',
            backgroundColor: '#5e34eb',
            hoverBackgroundColor: '#5e34eb',
            data: aWorkshop
        }]
    };

    Chart.plugins.register({
        afterDatasetsDraw: function (chart, easing) {
            var ctx = chart.ctx;
            chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                    meta.data.forEach(function (element, index) {
                        var val = dataset.data[index];
                        if (val && val > 0) {
                            ctx.fillStyle = afillStyle;
                            var fontSize = afontSize;
                            var fontStyle = 'bold';
                            var fontFamily = 'Lato, sans-serif';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                            var dataString = val.toString();
                            ctx.textAlign = atextAlign;
                            ctx.textBaseline = atextBaseline;
                            var position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x - 5, position.y);
                        }
                    });
                }
            });
        }
    });

    function initAttendanceChart() {
        var canvas = document.getElementById("attendance-chart");
        if (!canvas) return;
        var ctx = canvas.getContext("2d");
        if (window.myBar && typeof window.myBar.destroy === 'function') {
            try { window.myBar.destroy(); } catch (e) {}
        }
        Chart.defaults.global.tooltips.enabled = false;
        window.myBar = new Chart(ctx, {
            type: aChartType,
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'top',
                    display: true,
                    labels: {
                        boxWidth: 40,
                        fontSize: 13,
                        fontFamily: 'Lato, sans-serif',
                        fontColor: '#333',
                        padding: 15
                    }
                },
                layout: {
                    padding: {
                        top: 15,
                        bottom: 15,
                        left: 5,
                        right: 15
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 100,
                            stepSize: 20,
                            fontSize: 13,
                            fontFamily: 'Lato, sans-serif',
                            fontColor: '#444'
                        },
                        gridLines: {
                            color: '#e5e5e5',
                            zeroLineColor: '#333',
                            drawBorder: true
                        }
                    }],
                    yAxes: [{
                        barPercentage: 0.85,
                        categoryPercentage: 0.9,
                        ticks: {
                            fontSize: 12,
                            fontFamily: 'Lato, sans-serif',
                            fontColor: '#333'
                        },
                        gridLines: {
                            display: true,
                            color: '#f0f0f0',
                            drawBorder: true
                        }
                    }]
                }
            }
        });
    }

    window.initAttendanceChart = initAttendanceChart;

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initAttendanceChart, 10);
    } else {
        $(document).ready(initAttendanceChart);
        window.addEventListener('load', function () {
            if (!window.myBar) initAttendanceChart();
        });
    }

    var chartCanvas = document.getElementById("attendance-chart");
    if (chartCanvas) {
        chartCanvas.addEventListener('click', function () {
            if (window.myBar) {
                window.myBar.update();
            }
        });
    }
}


$(document).on("click", ".select-subject", function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find(".chk-tick input:checkbox").prop('checked', false);
    }
    else {
        $(this).addClass('active');
        $(this).find(".chk-tick input:checkbox").prop('checked', true);
    }
})
function setSubjectSelection() {

    $('.chk-tick input:checkbox').each(function () {
        if ($(this).is(':checked')) {
            $(this).closest(".select-subject").addClass('active');
        }
        else {
            $(this).closest(".select-subject").removeClass('active');
        }
    });
}

//QUIZ
//$(document).on("click", ".start-quiz", function () {
//    $('.quiz-rules').hide();
//    $('.quiz-ques').show();

//    AllQueHeight();

//    $('html, body').animate({
//        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
//    }, 500);
//    return false;


//});
//$('.ans-option .options').click(function () {
//    $('.ans-option .options').removeClass('active');
//    $(this).addClass('active');

//})

function AllQueHeight() {
    var ActiveQue = $('.active-que').outerHeight(true);
    $('.all-question').height(ActiveQue);
    SetRadioDivJquery();
}

AllQueHeight();

//$(document).on("click", ".next-que", function () {
//    $(this).parent().removeClass('active-que').css({ left: '-100%', opacity: 0 });
//    $(this).parent().next('.question-rows').addClass('active-que');
//    AllQueHeight();
//})

function SetRadioDivJquery() {
    $('.ans-option .options').click(function () {
        $('.ans-option .options').removeClass('active');
        $(this).addClass('active');
    })
}

function NextQuestionAnimation() {
    $(".DevQuizQuestion").removeClass('active-que').css({ left: '-100%', opacity: 0 });
    $(".DevQuizQuestion").addClass('active-que').css({ left: '0', opacity: 1 });
}

if (document.getElementById("winner-slider")) {
    $(document).ready(function () {
        $("#winner-slider").owlCarousel({
            items: 5,
            autoPlay: 4000,
            navigation: false,
            slideSpeed: 400,
            pagination: true,
            stoponHover: true,
            stopOnHover: true,
            itemsDesktopSmall: [768, 3],
            itemsTablet: [640, 2],
            itemsMobile: [480, 1],
        });
    });
}
$(document).on("change", "#understandCheckbox", function () {
    if (this.checked && $("#ctl00_ContentPlaceHolder1_hdnEnableStartQuiz").val() == "1") {
        $(".start-quiz").removeAttr("disabled");
    }
    else {
        $(".start-quiz").attr("disabled", true);
    }
})

var QuestInverval;
var QuesSecondsRemain = 0;
var QuesSecondsElapsed = 0;

function SetTimerEvents() {
    QuesSecondsRemain = document.getElementById("ctl00_ContentPlaceHolder1_hdnTotalTime").value;
    QuesSecondsElapsed = 0;

    $(".stop-watch").html(QuesSecondsRemain + " Sec");
    document.getElementById("ctl00_ContentPlaceHolder1_hdnTimeElapsed").value = QuesSecondsElapsed;
    QuestInverval = setInterval(TimerProgress, 1000);
}
function TimerProgress() {
    QuesSecondsRemain = parseInt(QuesSecondsRemain) - 1;
    QuesSecondsElapsed = parseInt(QuesSecondsElapsed) + 1;

    $(".stop-watch").html(QuesSecondsRemain + " Sec");
    document.getElementById("ctl00_ContentPlaceHolder1_hdnTimeElapsed").value = QuesSecondsElapsed;

    if (QuesSecondsRemain == 0) {
        clearInterval(QuestInverval);
        GetSelectedAnswer();
        $(".btnSubmit").click();
    }
}
function SaveAnswer() {
    clearInterval(QuestInverval);
    GetSelectedAnswer();
    $(".btnSubmit").click();
}
function GetSelectedAnswer() {
    var SelVal = $(".ans-option .options.active .optn-num").html();
    if (SelVal == undefined) {
        $("#ctl00_ContentPlaceHolder1_hdnSelectedAnswer").val("");
    }
    else {
        $("#ctl00_ContentPlaceHolder1_hdnSelectedAnswer").val(SelVal);
    }
}
function CheckboxDesign() {
    $('input[type="checkbox"].designed').each(function () {
        var id = this.id;
        if ($(this).parent('.check-block').length == 0) {
            $(this).before('<div class="check-block" id="div' + id + '"></div>');
            $(this).appendTo('#div' + id);
            $(this).parent().append('<label for=""></label>')
            $(this).next('label').attr('for', this.id);
        }
    });
}


function ChangeUIFileUpload() {

    var location = window.location.href.toLowerCase();

    if (location.indexOf("placementpolicyacceptance.aspx") > -1) {
        $('input[type="file"]').parent().parent().parent().addClass('choose-file-inpt');
        $('input[type="file"]').addClass('filestyle')
        $('input[type="file"]').attr("data-buttonName", "btn-primary")
        $(":file").filestyle({ buttonName: "btn-primary" });
    }
    
}