var SubscribeHeadDateChange = function (e) {
    if ($('#txtSymbol').val() != '')
    DisplayGraph(rootUrl + 'Analysis/GetGraphsForStateAnalysisDashboard');
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
var symbolArr = [], rownumber = 0;
var ResetFunction = function (e) {
    clearpopup('ddlInputSL');
}
function clearpopup(id) {
    $('#listviewdiv' + id).attr('dataSel', '');
    $('#' + id).find('input').val('Select');
    $('#' + id).next('div').find('input[type="hidden"]').val('');
    $('#divnextprevtrade').addClass('Hide'); symbolArr = []; rownumber = 0;
    $('#divnextprevtrade a').removeAttr('Symbol').addClass('Hide');
    $('#lblcount').html('');
}
function GetGraphBasedOnStockListSymbol(StockID, flag) {
    if (flag == 0)
        flag = "Usr"
    else
        flag = "Sys";
    var data = JSON.stringify({ 'StockID': StockID, 'flag': flag });
    $.blockUI();
    $.ajax({
        url: rootUrl + 'Charts/GetStockSymbols',
        type: 'POST',
        data: data, traditional: true,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null && data != '') {
                symbolArr = data.split(',');
                var smcount = rownumber + 1;
                $('#lblcount').html("(<b>" + smcount + "</b> out of <b>" + symbolArr.length + "</b>)");
                $('#txtSymbol').val(symbolArr[0]); rownumber = 0;
                if (symbolArr.length > 1) {
                    $('#divnextprevtrade').removeClass('Hide');
                    $('#tradenext').removeClass('Hide');
                }
                DisplayGraph(rootUrl + 'Analysis/GetGraphsForStateAnalysisDashboard');
            }
            else {
                $('#divnextprevtrade').addClass('Hide'); symbolArr = []; rownumber = 0;
                $('#divnextprevtrade a').removeAttr('Symbol').addClass('Hide');
                $('#lblcount').html('');
                ShowModel('Selected stockList is Empty', 'alert-error');
                $.unblockUI();
            }
        }
    });

}
var SearchStockList = function (keyval, len) {
    var slsrch = $('#listviewdivddlInputSL').data("kendoListView");
    var slistsrch = $('#listviewdivddlInputSL1').data("kendoListView");
    if (slistsrch != null && slistsrch != '' && slistsrch != undefined) {
        if (keyval.length > len) {
            keyval = keyval.trim();
            slistsrch.dataSource.filter({ "logic": "or", "filters": [{ "field": "Strategy", "operator": "contains", "value": keyval }] });
            slsrch.dataSource.filter({ "logic": "or", "filters": [{ "field": "Strategy", "operator": "contains", "value": keyval }] });
        }
        else if (keyval.length == 0) {
            slistsrch.dataSource.filter([]);
            slsrch.dataSource.filter([]);
        }
    }
}
var SubscribeClick = function (strId, seltext, selval) {
    $('#' + strId + ' .anc_DDL_Select').unbind().bind('click', function (e) {
        e.preventDefault();
        $('.nobg').modal('hide');
        var $hdn = $('#' + strId).find('input:hidden');
        $hdn.val($(this).find('label').attr('role-ids'));
        $hdn.attr('stocklisttype', $(this).find('label').attr('value'));
        var $txtbox = $('#' + strId).prev('div').find('input[type="text"]');
        $txtbox.val($(this).find('label').attr('title'));
        var flag = $('#ddlInputSL').next('div').find('input[type="hidden"]').attr('stocklisttype');
        var stocklistID = $('#ddlInputSL').next('div').find('input[type="hidden"]').val();
        $('.txt_search_Stocklist1').val('');
        GetGraphBasedOnStockListSymbol($hdn.val(), $hdn.attr('stocklisttype'));
    });
    var $hdn = $('#' + strId).find('input[type=hidden]');
    $hdn.val(selval);
    var $txtbox = $('#' + strId).prev('div').find('input[type="text"]');
    if (seltext != '') {
        $txtbox.val(seltext);
        //var flag= $('#ddlInputSL').next('div').find('input[type="hidden"]').attr('stocklisttype');
        //var stocklistID = $('#ddlInputSL').next('div').find('input[type="hidden"]').val();
        //GetGraphBasedOnStockListSymbol(stocklistID, flag);
    }
    else $txtbox.val('Select');

}
$(document).ready(function () {
    $('#txtSymbol').val(DashboardSymbol);
    Symbols = GetAdminSymbolsData(rootUrl);
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
            DisplayGraph(rootUrl + 'Analysis/GetGraphsForStateAnalysisDashboard');
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
                        DisplayGraph(rootUrl + 'Analysis/GetGraphsForStateAnalysisDashboard');
                }, 1);

            }
        });
    });
    
    $('#dv_btns button').bind('click', function (evt) {
        $('#dv_btns button').removeClass('btn-primary').addClass('btn-grey').filter(this).addClass('btn-primary').removeClass('btn-grey'); 
        DisplayGraph(rootUrl + 'Analysis/GetGraphsForStateAnalysisDashboard');
        $(".highcharts-background").attr('stroke-width', '0');        
    });
    if ($('#txtSymbol').val() != '')
        DisplayGraph(rootUrl + 'Analysis/GetGraphsForStateAnalysisDashboard');
    $('#tradeprev').click(function () {
        if (rownumber > 0) {
            rownumber--;
            $('#txtSymbol').val(symbolArr[rownumber]);
            $('#tradenext').removeClass('Hide');
            if (rownumber <= 0)
                $('#tradeprev').addClass('Hide');
            var smcount = rownumber + 1;
            $('#lblcount').html("(<b>" + smcount + "</b> out of <b>" + symbolArr.length + "</b>)");
            DisplayGraph(rootUrl + 'Analysis/GetGraphsForStateAnalysisDashboard');
        }
    });
    $('#tradenext').click(function () {
        if (rownumber < symbolArr.length) {
            rownumber++;
            $('#txtSymbol').val(symbolArr[rownumber]);
            $('#tradeprev').removeClass('Hide');
            if (rownumber + 1 >= symbolArr.length)
                $('#tradenext').addClass('Hide');
            var smcount = rownumber + 1;
            $('#lblcount').html("(<b>" + smcount + "</b> out of <b>" + symbolArr.length + "</b>)");
            DisplayGraph(rootUrl + 'Analysis/GetGraphsForStateAnalysisDashboard');
        }
    });

    $(".txt_search_Stocklist1").bind("keyup", function (e) {
        if (e.which === 32 && !this.value.length) return;
        var keyval = $(this).val();
        SearchStockList(keyval, 0);
    });
    $('.btn_SearchGroup_Stocklist1').click(function () {
        var keyval = $('#txt_search_Stocklist1').val();
        if (keyval.length > 0)
            SearchStockList(keyval, 0);
    });
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
        $('.lblcompany').text('').html('');
        $('#btnGroupDashboard').closest('div').find('a.earnings').remove();
        $('#btnGraph').removeClass('btn-grey').addClass('btn-primary2').show();
        var data = { symbol: $('#txtSymbol').val().trim(), distance:100,State:"All States", CurrDate: $('#txtAppsDate').val() };
        $.blockUI();
        $.get(url, data, function (GetGraphsForStateAnalysisDashboard) {
            $("#divStateAnalysisGraph").show();
            var count = 0;
            max = GetGraphsForStateAnalysisDashboard.max;
            var graphscount = GetGraphsForStateAnalysisDashboard.length;
            if (GetGraphsForStateAnalysisDashboard.CompanyName.toUpperCase() != 'NULL')
                $('#lblcompanyname').text(GetGraphsForStateAnalysisDashboard.CompanyName);
            $('#dv_Transition_data').html(BindTable(GetGraphsForStateAnalysisDashboard.table, GetGraphsForStateAnalysisDashboard.UDtable, GetGraphsForStateAnalysisDashboard.currentprice));
          //  $('#lblcompanyname').closest('div').append('<a class="txt_link ohlc m5" symbol="' + $('#txtSymbol').val() + '" title="Stock Chart" href="#"><img class="CriteriaCls" src=' + rootUrl + 'Images/Ohlc.png /></a>');
           // $('#lblcompanyname').closest('div').append('<span class="m5 mr5"><b>Options<b></span><a class="txt_link opt mr5" symbol="' + $('#txtSymbol').val() + '" title="Options" href="#"><i class="fa fa-bar-chart fa-fw"></i></a>');
            if (GetGraphsForStateAnalysisDashboard.NextEarningsDate != '' && GetGraphsForStateAnalysisDashboard.NextEarningsDate!=null)
                $('.lblcompany').html('<span class="m5 mr5"><b>Next Earnings: ' + GetGraphsForStateAnalysisDashboard.NextEarningsDate + '<b></span>');
          //  $('#btnGroupDashboard').closest('div').prepend('<a class="earnings btn btn-primary mr5" symbol="' + $('#txtSymbol').val() + '"  href="#">Earnings</a>');
            Bindchartclick();
            $("#dv_Transition_data").parent().parent().find('.caption span.symbol').text($('#txtSymbol').val());
            $.each(GetGraphsForStateAnalysisDashboard.result, function (i, o) {
                $("#dv_Transition_" + i).parent().parent().removeClass('Hide');
                $("#dv_Transition_" + i).html('');
                $("#dv_Transition_" + i).parent().parent().find('.caption span.symbol').text($('#txtSymbol').val());
               
                $("#dv_Transition_" + i).html('');

                $("#dv_Transition_" + i).html(o);
                if (o == null) {
                    $("#dv_Transition_" + i).parent().parent().addClass('Hide');
                    count++;
                }
                else if(i==4|i==5) {
                    $($('#dv_Transition_' + i + ' .highcharts-legend-item')[1]).click()
                }
                else if (i == 8 && GetGraphsForStateAnalysisDashboard.UDtable.length > 0) {
                    $("#dv_Transition_" + i).append(GetGraphsForStateAnalysisDashboard.HighSeriesData);
                    $("#dv_Transition_" + i).append(GetGraphsForStateAnalysisDashboard.LowSeriesData);
                    $($('#dv_Transition_' + i + ' .highcharts-legend-item')[2]).click()
                    $($('#dv_Transition_' + i + ' .highcharts-legend-item')[3]).click()
                    if (GetGraphsForStateAnalysisDashboard.statenum > 0) {
                        var num = GetGraphsForStateAnalysisDashboard.statenum;
                        if(num%2==0)
                            $($('#dv_Transition_' + i + ' .highcharts-legend-item')[5]).click()
                        else
                            $($('#dv_Transition_' + i + ' .highcharts-legend-item')[6]).click()
                    }
                    var charts = $("#dv_Transition_" + i + ' div').highcharts();
                    charts.yAxis[0].update({
                                plotBands: [{
                                    color: '#32CD32',
                                    to: GetlinePrice(GetGraphsForStateAnalysisDashboard.UDtable[0].UT1, GetGraphsForStateAnalysisDashboard.table[0].PriceOnEntryStateDate),
                                    from: GetlinePrice(GetGraphsForStateAnalysisDashboard.UDtable[0].UT2, GetGraphsForStateAnalysisDashboard.table[0].PriceOnEntryStateDate)
                                },
                                {
                                    color: '#6fdc6f',
                                    to: GetlinePrice(GetGraphsForStateAnalysisDashboard.UDtable[0].UT2, GetGraphsForStateAnalysisDashboard.table[0].PriceOnEntryStateDate),
                                    from: GetlinePrice(GetGraphsForStateAnalysisDashboard.UDtable[0].UT3, GetGraphsForStateAnalysisDashboard.table[0].PriceOnEntryStateDate)
                                }
                                ,
                                {
                                    color: '#DE2008',
                                    to: GetlinePrice(GetGraphsForStateAnalysisDashboard.UDtable[0].DT1, GetGraphsForStateAnalysisDashboard.table[0].PriceOnEntryStateDate),
                                    from: GetlinePrice(GetGraphsForStateAnalysisDashboard.UDtable[0].DT2, GetGraphsForStateAnalysisDashboard.table[0].PriceOnEntryStateDate)
                                }
                                ,
                                {
                                    color: '#FF6347',
                                    to: GetlinePrice(GetGraphsForStateAnalysisDashboard.UDtable[0].DT2, GetGraphsForStateAnalysisDashboard.table[0].PriceOnEntryStateDate),
                                    from: GetlinePrice(GetGraphsForStateAnalysisDashboard.UDtable[0].DT3, GetGraphsForStateAnalysisDashboard.table[0].PriceOnEntryStateDate)
                                }]
                    });
                }
                $("#dv_Transition_" + i).find('rect').removeAttr('stroke-width').removeAttr('strokeWidth').removeAttr('stroke');
                if (i != 1)
                    $("#dv_Transition_" + i).find('.highcharts-title').hide();
                
            });
            if (count == graphscount) {
                ShowModel('No Data found', 'alert-error');
            }
            else {
                if (GetGraphsForStateAnalysisDashboard.State != '' && GetGraphsForStateAnalysisDashboard.State != null) {
                    chart = $('#StateTransmitionPie_container').highcharts();
                    chart.setTitle(null, { text: GetGraphsForStateAnalysisDashboard.subtitle, useHTML: true, align: "left" });
                    chart = $('#FutureForecast_container').highcharts();
                    if (chart != null) {
                        var subtitle = GetGraphsForStateAnalysisDashboard.State + "</span> <span class='sub' style='text-align:right;margin-left:5%;'>(Path:" + GetGraphsForStateAnalysisDashboard.StatePath + ")";
                        if (GetGraphsForStateAnalysisDashboard.SV > 0)
                            subtitle = subtitle + "</span> <span class='sub' style='text-align:right;margin-left:5%;'> SV:" + GetGraphsForStateAnalysisDashboard.SV.toFixed(2) + "%";
                        if (GetGraphsForStateAnalysisDashboard.days > 0)
                            subtitle = subtitle + "</span> - <span class='sub1'>  (" + GetGraphsForStateAnalysisDashboard.days + " days)";
                        chart.setTitle(null, { text: "<b><span class='currstate'>Current State:" + subtitle + "</span> </b>", useHTML: true, align: "right" });
                    }
                    
                }
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

    $('body').on('click', '.earnings', function () {
        var symbol = $(this).text().trim();

        if ($("#data_form"))
            $("#data_form").empty();

        $.blockUI();
        //Create a Form
        var $form = $("<form/>").attr("id", "data_form")
                        .attr("action", rootUrl + 'Charts/EarningsAnalysis')
                        .attr("method", "post");
        $("body").append($form);

        //Append the values to be send
        AddParameter($form, "symbol", $(this).attr('symbol'));


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
    if(data1.length>0)
        var table = '<table class="table table-bordered"><thead><tr><th>Direction</th><th>T1 (conservative)</th><th>T2 (moderate)</th><th>T3 (aggressive)</th><tbody><tr><td><b>Expected</b></td><td>' + GetPrice(data1[0].UT1, data[0].PriceOnEntryStateDate) + '</td><td>' + GetPrice(data1[0].UT2, data[0].PriceOnEntryStateDate) + '</td><td>' + GetPrice(data1[0].UT3, data[0].PriceOnEntryStateDate) + '</td></tr><tr><td><b>Expected(%)</b></td><td>' + data1[0].UT1 + '%</td><td>' + data1[0].UT2 + '%</td><td>' + data1[0].UT3 + '%</td></tr><tr><td><b>Unexpected</b></td><td>' + GetPrice(data1[0].DT1, data[0].PriceOnEntryStateDate) + '</td><td>' + GetPrice(data1[0].DT2, data[0].PriceOnEntryStateDate) + '</td><td>' + GetPrice(data1[0].DT3, data[0].PriceOnEntryStateDate) + '</td></tr><tr><td><b>Unexpected(%)</b></td><td>' + data1[0].DT1 + '%</td><td>' + data1[0].DT2 + '%</td><td>' + data1[0].DT3 + '%</td></tr></tbody></table>';
    else
        var table = '<table class="table table-bordered"><thead><tr><th>Direction</th><th>T1 (conservative)</th><th>T2 (moderate)</th><th>T3 (aggressive)</th><tbody><tr><td><b>Expected</b></td><td colspan="4" align="center" style="text-align:center">No data found</td></tr><tr><td><b>Unexpected</b></td><td colspan="4" align="center" style="text-align:center">No data found</td></tr></tbody></table>';
    table = table + '<table class="table table-bordered mt10"><tbody><tr><td><b>Last Entry Date in Current state</b></td><td>' + data[0].LastEntryDate + '</td></tr><tr><td><b>Days since last Entry</b></td><td>' + data[0].DaysSinceLastEntry + '</td></tr><tr><td><b>Price On Entry State Date</b></td><td>$' + data[0].PriceOnEntryStateDate + '</td></tr><tr><td><b>High Price Change in Current State</b></td><td><span class="green-highlighted">$' + data[0].High.toFixed(2) + '</span></td></tr><tr><td><b>Low Price Change in Current State</b></td><td><span class="red-highlighted">$' + data[0].Low.toFixed(2) + '</span></td></tr><tr><td><b>Change Price (%)</b></td><td>' + data[0].ChangePrice + '</td></tr></tbody></table>';
    return table;
}
function GetlinePrice(change, price) {
    return (price + (price * change / 100)).toFixed(4);
}
GetPrice = function (change, price) {
    if (change<0)
        var cls = 'red-highlighted';
    else
        var cls = 'green-highlighted';
    var expPrice = (price + (price * change / 100)).toFixed(4);
    if (parseFloat(expPrice) > parseFloat(max))
        max = expPrice;
    return "<span class=" + cls + ">$" + expPrice + "</span>";

}

var BindDropDownEvents = function () {
    $('.imgDDLclosePopup').bind('click', function (e) {
        $('.nobg').modal('hide');
    });
    $('.nobg').bind('click touch', function (event) {
        event.stopPropagation();
    });
    $(".popupsender").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#listview' + $div + '_pager').bind('click', function (e) {
            e.stopPropagation();
        });
        var $div = $(this).next().attr('id');
        RemovePopover('#' + $(this).attr('id') + ' input[type="text"]');
        var Tbllbl = $('#' + $div + '  div.ul-header div.' + $div + 'lblpopup');
        var list = $('#listview' + $div).data("kendoListView");
        $('#' + $div + ' .txt_search').val('');
        list.dataSource.filter([]);
        list.dataSource.sort({ field: 'MdDate', dir: 'desc' });
        $('#' + $div + ' .sortingicon').removeClass('sortingicon-top').removeClass('sortingicon-bottom').addClass('sortingicon');
        determineDropDirection();
        $('#' + $div).modal('show');

    });
    $('.sortingicon').bind('click', function (e) {

        e.preventDefault();
        var rolediv = $(this).attr('role_div');
        var listViewSort = $(rolediv).data("kendoListView");
        var sorrtOrder = $(this).attr('sortOrder');

        var fieldName = $(this).attr('fieldname');
        $('.rmvcls').removeClass('sortingicon-bottom').removeClass('sortingicon-top');

        switch (sorrtOrder) {
            case 'asc':
                $(this).attr('sortOrder', 'desc');
                $(this).removeClass('sortingicon-bottom').addClass('sortingicon-top');
                break;
            case 'desc':
                $(this).attr('sortOrder', 'asc');
                $(this).removeClass('sortingicon-top').addClass('sortingicon-bottom');
                break;
            default:
                $(this).attr('sortOrder', 'asc');
                $(this).addClass('sortingicon');
                break;

        }
        listViewSort.dataSource.sort({ field: fieldName, dir: sorrtOrder });

        var listViewSortPreDefined = $('#listviewdivddlInputSL1').data("kendoListView");
        if (listViewSortPreDefined != null && listViewSortPreDefined != '' && listViewSortPreDefined != undefined) {
            listViewSortPreDefined.dataSource.sort({ field: fieldName, dir: sorrtOrder });
        }
        var listViewSortPreDefined1 = $('#listviewdivddlInputSL').data("kendoListView");
        if (listViewSortPreDefined1 != null && listViewSortPreDefined1 != '' && listViewSortPreDefined1 != undefined) {
            listViewSortPreDefined1.dataSource.sort({ field: fieldName, dir: sorrtOrder });
        }
    });
    $(".imgDDLResetPopup").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rolediv = $(this).attr('role_div');
        $(rolediv).attr('dataSel', '');
        var listView = $(rolediv).data("kendoListView");
        listView.dataSource.filter([]);
        $(rolediv).parent().parent().find('.lblpopup').html($(rolediv).parent().parent().find('.lblpopup').attr('title'));
        $(rolediv).parent().parent().find('.txt_search').val('');
        $(rolediv).parent().parent().find('.sortingicon').removeClass('sortingicon-top').removeClass('sortingicon-bottom').addClass('sortingicon');
        listView.dataSource.sort({ field: 'MdDate', dir: 'desc' });
    });
    $(".imgDDLclosePopup").on("click", function (e) {
        e.stopPropagation();
        $('.nobg').modal('hide');
    });
    $('.ResetPopup').on("click", function (e) {
        e.stopPropagation();
        var slistsrch = $('#listviewdivddlInputSL1').data("kendoListView");
        $('#listviewdivddlInputSL1').attr('dataSel', '');
        slistsrch.dataSource.filter([]);
        slistsrch.dataSource.sort({ field: 'Strategy', dir: 'asc' });


        $('#listviewdivddlInputSL1 a i').removeClass('fa-check-circle').addClass('fa-circle');

        var rolediv = $(this).attr('role_div');
        $(rolediv).attr('dataSel', '');
        var listView = $(rolediv).data("kendoListView");
        listView.dataSource.filter([]);
        $(rolediv).parent().parent().parent().parent().find('.lblpopup').html($(rolediv).parent().parent().find('.lblpopup').attr('title'));
        $(rolediv).parent().parent().parent().parent().find('.txt_search_Stocklist1').val('');
        $(rolediv).parent().parent().parent().parent().find('.sortingicon').removeClass('sortingicon-top').removeClass('sortingicon-bottom').addClass('sortingicon');
        listView.dataSource.sort({ field: 'Strategy', dir: 'asc' });
    });
}
BindDropDownEvents();