var SubscribeHeadDateChange = function (e) {
    if ($('#txtSymbol').val() != '')
        DisplayGraph(rootUrl + 'Admin/GetGraphsForStateAnalysisDashboard');
};
var max = 0;
function removedot(ele) {
    myString = ele.val();
    var lastChar = myString[myString.length - 1];
    if (lastChar == '.')
        ele.val(myString.replace('.', ''));
}
function validdays(days, min, max) {
    if (days < min || days > max)
        return false;
    else
        return true;
}
$(document).ready(function () {
    $('#txtSymbol').val(DashboardSymbol);
    Symbols = GetAdminSymbolsData(rootUrl);
    $(".mask").numeric();
    $('#dvMAType a').bind('click', function () {
        $('#dvMAType a').removeClass('btn-hover').addClass('btn-default2').filter(this).addClass('btn-hover');
        $('#hddvMAType').val($(this).text().trim());
    });
    DateTexBox($('#txtToDate'));

    var titlearr = [];
    titlearr.push({ "id": 'txtSymbol', "value": 'You can select symbol from auto dropdown list' });
    $('#txtSymbol').bind('click', function () {
        RemovePopover(this);
        var id = $(this).attr('id');
        for (var k = 0; k < titlearr.length; ++k) {
            if (id == titlearr[k]['id']) {
                title = titlearr[k]['value'];
            }
        }
        if (title != "") {
            PopoverHelp(this, title, 'top');
            title = "";
        }
    });
    $('#txtSymbol').change(function () {
        if ($('#txtSymbol').val() != '')
            DisplayGraph(rootUrl + 'Admin/GetGraphsForStateAnalysisDashboard');
    });
    $('#txtdistance').change(function () {
        if ($('#txtSymbol').val() != '')
            DisplayGraph(rootUrl + 'Admin/GetGraphsForStateAnalysisDashboard');
    });
    $('#ddlState').change(function () {
        if ($('#txtSymbol').val() != '')
            DisplayGraph(rootUrl + 'Admin/GetGraphsForStateAnalysisDashboard');
    });
    $('#txtdistance').keyup(function () {
        removedot($(this));
        var valid = validdays($(this).val(), 1, 100)
        if (valid) {
            RemovePopover($(this));
        }
        else
            PopoverFunction($(this), 'Distance value must be 1-100 range.');
    });
    $("#txtSymbol").keyup(function () {
        $("#txtSymbol").autocomplete({
            source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                //$('#dvSymErroMessage').text('');
                $('#txtSymbol').removeClass('badfield');
                //$('#dvSymErroMessage').hide();
                var matching = $.grep(Symbols, function (value) {
                    var name = value.SymbolName;
                    return matcher.test(name);
                });
                response($.map(matching, function (data) {
                    return {
                        label: data.SymbolName,
                        desc: data.Description
                    };
                }));
            },
            select: function () {
                setTimeout(function () {
                    if ($('#txtSymbol').val() != '')
                        DisplayGraph(rootUrl + 'Admin/GetGraphsForStateAnalysisDashboard');
                }, 1);

            }
        });
    });

    $('#dv_btns button').bind('click', function (evt) {
        $('#dv_btns button').removeClass('btn-primary').addClass('btn-grey').filter(this).addClass('btn-primary').removeClass('btn-grey');
        DisplayGraph(rootUrl + 'Admin/GetGraphsForStateAnalysisDashboard');
        $(".highcharts-background").attr('stroke-width', '0');
    });
    if ($('#txtSymbol').val() != '')
        DisplayGraph(rootUrl + 'Admin/GetGraphsForStateAnalysisDashboard');

});

function DisplayGraph(url) {
    var validmsg = true;
    if (Symbols.length > 0) {
        validmsg = validation();
    }
    max = 0;
    if (validmsg) {
        $('#lblcompanyname').closest('div').find('a.txt_link').remove();
        $('#lblcompanyname').closest('div').find('span').remove();
        $('#lblcompanyname').text('');
        $('#btnGraph').removeClass('btn-grey').addClass('btn-primary2').show();
        var data = { symbol: $('#txtSymbol').val().trim(), distance: $('#txtdistance').val(), State: $('#ddlState').val(), CurrDate: $('#txtAppsDate').val() };
        $.blockUI();
        $.get(url, data, function (GetGraphsForStateAnalysisDashboard) {
            $("#divStateAnalysisGraph").show();
            var count = 0;
            var graphscount = GetGraphsForStateAnalysisDashboard.length;
            Bindchartclick();
            $("#dv_Transition_data").parent().parent().find('.caption span.symbol').text($('#txtSymbol').val());
            $.each(GetGraphsForStateAnalysisDashboard.result, function (i, o) {
                $("#dv_Transition_" + i).parent().parent().removeClass('Hide');
                $("#dv_Transition_" + i).html('');
                $("#dv_Transition_" + i).parent().parent().find('.caption span.symbol').text($('#txtSymbol').val());

                $("#dv_Transition_" + i).html('');

                $("#dv_Transition_" + i).html(o);
               
                $("#dv_Transition_" + i).find('rect').removeAttr('stroke-width').removeAttr('strokeWidth').removeAttr('stroke');
               
                    $("#dv_Transition_" + i).find('.highcharts-title').hide();

            });
            if (count == graphscount) {
                ShowModel('No Data found', 'alert-error');
            }
            
            $.unblockUI();
        });
    }
}

function validation() {
    var count = 0;
    if ($('#txtSymbol').val() == '') {
        count++;
        PopoverFunction('#txtSymbol', 'Symbol is Required.');
        return false;
    }
    else {
        var count1 = 0;
        $.each(Symbols, function (k, v) {
            if (v.SymbolName.trim().toUpperCase() == $('#txtSymbol').val().trim().toUpperCase()) {
                count1++;
            }
        });
        if (count1 != 1) {
            PopoverFunction('#txtSymbol', 'Please enter valid symbol or select from dropdown');
            count++;
            return false;
        }
        else
            RemovePopover('#txtSymbol');
    }
    if ($('#txtdistance').val() == '') {
        count++;
        PopoverFunction('#txtdistance', 'Distance is Required.');
        return false;
    }
    else {
        var valid = validdays($('#txtdistance').val(), 1, 100)
        if (valid) {
            RemovePopover($('#txtdistance'));
        }
        else {
            PopoverFunction($('#txtdistance'), 'Distance value must be 1-100 range.');
            return false;
        }
           
    }
    if (count > 0)
        return false;
    else
        return true;
}

function Bindchartclick() {
    //posting required data to Option table graph when clicking on icon
    $('body').on('click', '.opt', function () {
        var expiryDate = $('#txtAppsDate').val();
        if ($("#data_form"))
            $("#data_form").empty();

        $.blockUI();
        //Create a Form
        var $form = $("<form/>").attr("id", "data_form")
                        .attr("action", rootUrl + 'Charts/OptionsGraph')
                        .attr("method", "post");
        $("body").append($form);
        //Append the values to be send
        AddParameter($form, "symbol", $(this).attr('symbol'));
        AddParameter($form, "expiryDate", expiryDate);

        //Send the Form
        $form[0].submit();
    });



    //posting required data to StockChart when clicking on icon
    $('body').on('click', '.ohlc', function () {
        var symbol = $(this).text().trim();

        if ($("#data_form"))
            $("#data_form").empty();

        $.blockUI();
        //Create a Form
        var $form = $("<form/>").attr("id", "data_form")
                        .attr("action", rootUrl + 'Charts/StockChart')
                        .attr("method", "post");
        $("body").append($form);

        //Append the values to be send
        AddParameter($form, "symbol", $(this).attr('symbol'));


        //Send the Form
        $form[0].submit();
    });

    function AddParameter(form, name, value) {

        var $input = $("<input />").attr("type", "hidden")
                                .attr("name", name)
                                .attr("value", value);
        form.append($input);
    }
}
BindTable = function (data, data1, currentprice) {
    if (data1.length > 0)
        var table = '<table class="table table-bordered"><thead><tr><th>Direction</th><th>T1 (conservative)</th><th>T2 (moderate)</th><th>T3 (aggressive)</th><tbody><tr><td><b>Expected</b></td><td>' + GetPrice(data1[0].UT1, data[0].PriceOnEntryStateDate) + '</td><td>' + GetPrice(data1[0].UT2, data[0].PriceOnEntryStateDate) + '</td><td>' + GetPrice(data1[0].UT3, data[0].PriceOnEntryStateDate) + '</td></tr><tr><td><b>Expected(%)</b></td><td>' + data1[0].UT1 + '%</td><td>' + data1[0].UT2 + '%</td><td>' + data1[0].UT3 + '%</td></tr><tr><td><b>Unexpected</b></td><td>' + GetPrice(data1[0].DT1, data[0].PriceOnEntryStateDate) + '</td><td>' + GetPrice(data1[0].DT2, currentprice) + '</td><td>' + GetPrice(data1[0].DT3, data[0].PriceOnEntryStateDate) + '</td></tr><tr><td><b>Unexpected(%)</b></td><td>' + data1[0].DT1 + '%</td><td>' + data1[0].DT2 + '%</td><td>' + data1[0].DT3 + '%</td></tr></tbody></table>';
    else
        var table = '<table class="table table-bordered"><thead><tr><th>Direction</th><th>T1 (conservative)</th><th>T2 (moderate)</th><th>T3 (aggressive)</th><tbody><tr><td><b>Expected</b></td><td colspan="4" align="center" style="text-align:center">No data found</td></tr><tr><td><b>Unexpected</b></td><td colspan="4" align="center" style="text-align:center">No data found</td></tr></tbody></table>';
    table = table + '<table class="table table-bordered mt10"><tbody><tr><td><b>Last Entry Date in Current state</b></td><td>' + data[0].LastEntryDate + '</td></tr><tr><td><b>Days since last Entry</b></td><td>' + data[0].DaysSinceLastEntry + '</td></tr><tr><td><b>Price On Entry State Date</b></td><td>$' + data[0].PriceOnEntryStateDate + '</td></tr><tr><td><b>High Price Change in Current State</b></td><td><span class="green-highlighted">$' + data[0].High.toFixed(2) + '</span></td></tr><tr><td><b>Low Price Change in Current State</b></td><td><span class="red-highlighted">$' + data[0].Low.toFixed(2) + '</span></td></tr><tr><td><b>Change Price (%)</b></td><td>' + data[0].ChangePrice + '</td></tr></tbody></table>';
    return table;
}
function GetlinePrice(change, price) {
    return (price + (price * change / 100)).toFixed(2);
}
GetPrice = function (change, price) {
    if (change < 0)
        var cls = 'red-highlighted';
    else
        var cls = 'green-highlighted';
    var expPrice = (price + (price * change / 100)).toFixed(2);
    if (parseFloat(expPrice) > parseFloat(max))
        max = expPrice;
    return "<span class=" + cls + ">$" + expPrice + "</span>";

}