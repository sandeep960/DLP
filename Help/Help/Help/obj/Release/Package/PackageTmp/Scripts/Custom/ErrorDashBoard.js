var ugsort = 'asc', ug_clsname = 'sorting', descsort = 'asc', desc_clsname = 'sorting', edatesort = 'asc', edate_clsname = 'sorting';

var searchlist = function (keyval, minlen) {
    var list = $("#listView").data("kendoListView");
    if (keyval.length > minlen) {
        keyval = keyval.trim();
        list.dataSource.filter({ "logic": "or", "filters": [{ "field": "UserName", "operator": "contains", "value": keyval }] }
        );
    }
    else if (keyval.length == 0) list.dataSource.filter([]);
}
$(window).load(function () {
    $.unblockUI();
});

function SendFilterKey() {
    return {
        key: $("#txt_search").val()
    }
}

$(function () {
    //SetTable();
    var listView = $("#listView").data("kendoListView");
    listView.bind("dataBound", function (e) {
        SetTable();

        if (listView.dataSource.totalPages() <= 1) { listView.pager.element.hide(); if ($('#txt_search').val().trim().length == 0) $('#dv_Search').hide(); } else { listView.pager.element.show(); $('#dv_Search').show(); }

    });
    $('#btn_Search').click(function () {
        var keyval = $('#txt_search').val();
        if (keyval.length > 0)
            searchlist(keyval, 0);
    });
    $('.sorting,.sorting_desc,.sorting_asc').live('click', function () {
        var index = $(this).index();
        var colval = $(this).text().trim().toLowerCase();
        var fieldName;
        var sortOrder = $(this).find('input:hidden').val();
        if (colval == 'user name') {
            fieldName = 'UserName';
            ug_clsname = (sortOrder == 'asc') ? 'sorting_asc' : 'sorting_desc'
            ugsort = sortOrder == 'asc' ? 'desc' : 'asc';
            desc_clsname = 'sorting'; descsort = 'asc';
        }
        else if (colval == 'error message') {
            fieldName = 'ErrorMessage';
            desc_clsname = (sortOrder == 'asc') ? 'sorting_asc' : 'sorting_desc'
            descsort = sortOrder == 'asc' ? 'desc' : 'asc';
            ug_clsname = 'sorting'; ugsort = 'asc';
        }
        else {
            fieldName = 'ErrorDate';
            edate_clsname = (sortOrder == 'asc') ? 'sorting_asc' : 'sorting_desc'
            descsort = sortOrder == 'asc' ? 'desc' : 'asc';
            ug_clsname = 'sorting'; ugsort = 'asc';
        }
        var list = $("#listView").data("kendoListView");
        list.dataSource.sort({ field: fieldName, dir: sortOrder });


    });
    
});




$(document).ready(function () {
    $('#imgSymbolclosePopup').unbind().bind('click', function (event) {
        $('#StackTrace').modal('hide');
    });
    $(document).unbind().bind('click touch', function (event) {
        $('#StackTrace').modal('hide');
    }); 
    $('#StackTrace').bind('click touch', function (event) {
        event.stopPropagation();
    });
    $("#txt_search").bind("keyup", function (e) {
        if (e.which === 32 && !this.value.length) return;
        var keyval = $(this).val();
        searchlist(keyval, 0);
    });
});



SetTable = function () {
    var tblcount = 0;
    $("#listView").append("<div class='col-lg-12 divdata'><table class='table table-advanced sub-list-table'><thead><tr><th class='" + ug_clsname + "'>User Name<input type='hidden' value='" + ugsort + "'/></th><th class='" + desc_clsname + "' style='width:77%;'>Error Message<input type='hidden' value='" + descsort + "'/></th><th class='" + edate_clsname + "'>Date<input type='hidden' value='" + edatesort + "'/></th></tr></thead></table></div>");

    var $divOdd = $("div.divdata table").append('<tbody/>');
    $("#listView .dispalydiv").each(function () {
        tblcount++;
        var listCount = $("#listView").find('.dispalydiv').length;
        $divOdd.append('<tr class="group_header"><td>' + $(this).find('label.lblUserName').text() + '</td><td class="tb_3"><a href="#" class="txt_link stack" ErrorId=' + $(this).find('label.lblErrorId').text() + '>' + $(this).find('label.lblErrorMessage').text() + '</a></td><td>' + $(this).find('label.lblErrorDate').text() + '</td></tr>');
        $(this).html("");
    });
    if ($("#listView .dispalydiv").length < 3) {
        $('table thead tr th').removeClass('sorting sorting_asc sorting_desc')
    }
    if ($("#listView .dispalydiv").length == 0) {
        $divOdd.append('<tr class="group_header"><td style="text-align:center;" colspan="3">No data found</td></tr>');
        $("div.dv-rhead").remove();
    }
    $('div.even table').css('margin-bottom', '0px');
    $(".dispalydiv:empty").remove();
    $('a.stack').click(function () {
        var selectedVal = $(this).attr('errorid');  
        if (selectedVal != "") {
            $.ajax({
                url: rootUrl + 'TechSupport/StackTraceDetails',
                type: 'GET',
                data: { 'ErrorId': selectedVal },
                traditional: true,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data) {
                        $('#stackdata').html(data);
                        $('#StackTrace').modal('show');
                        //$('.dialog').modal('show');
                    }
                },
                error: function (request, status, err) {
                    ShowModel('Error occured! \n' + err, 'alert-error');
                }
            });
        }
    });
}