var searchpop = function (keyval, len, lstId,fieldName) {
    var list = $(lstId).data("kendoListView");
    if (keyval.length > len) {
        keyval = keyval.trim();
        list.dataSource.filter({ "logic": "or", "filters": [{ "field": fieldName, "operator": "contains", "value": keyval }] }
        );
    }
    else if (keyval.length == 0) list.dataSource.filter([]);
}
//var BindDropDownEvents = function () {
//    $('.imgDDLclosePopup').bind('click', function (e) {
//        $('.nobg').modal('hide');
//    });
//    $('.sortingicon').bind('click', function (e) {
//        e.preventDefault();
//        var rolediv = $(this).attr('role_div');
//        var listViewSort = $(rolediv).data("kendoListView");
//        var sorrtOrder = $(this).attr('sortOrder');
//        switch (sorrtOrder) {
//            case 'asc':
//                $(this).attr('sortOrder', 'desc');
//                $(this).removeClass('sortingicon-bottom').addClass('sortingicon-top');
//                break;
//            case 'desc':
//                $(this).attr('sortOrder', 'asc');
//                $(this).removeClass('sortingicon-top').addClass('sortingicon-bottom');
//                break;
//            default:
//                $(this).attr('sortOrder', 'asc');
//                $(this).addClass('sortingicon');
//                break;

//        }
//        listViewSort.dataSource.sort({ field: $(this).attr('fieldname'), dir: sorrtOrder });
//    });
//}
function naturalSorter(as, bs) {
    var a, b, a1, b1, i = 0, n, L,
    rx = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
    if (as === bs) return 0;
    a = as.toLowerCase().match(rx);
    b = bs.toLowerCase().match(rx);
    L = a.length;
    while (i < L) {
        if (!b[i]) return 1;
        a1 = a[i],
        b1 = b[i++];
        if (a1 !== b1) {
            n = a1 - b1;
            if (!isNaN(n)) return n;
            return a1 > b1 ? 1 : -1;
        }
    }
    return b[i] ? -1 : 0;
}
function determineDropDirection() {
    $(".nobg").each(function () {
        $(this).css({

            display: "block"
        });
        $(this).parent().removeClass("dropup");
        $(this).find('.main-bg-div').css("margin-top", "14px");
        $(this).find('.triangle-top').addClass('triangle-bottom');
        $(this).find('.triangle-bottom').removeClass('triangle-top')
        if ($(this).offset().top + $(this).outerHeight() > $(window).innerHeight() + $(window).scrollTop()) {
            $(this).parent().addClass("dropup");
            $(this).find('.triangle-bottom').addClass('triangle-top');

            if ($(this).find('div').first().hasClass('triangle-top'))
                $(this).find('.main-bg-div').css("margin-top", "26px");
            $(this).find('.triangle-top').removeClass('triangle-bottom')
        }

        $(this).find('input.txt_search').focus();
        $(this).removeAttr("style");
    });
}
var ResetPopup = function (id) {
    var $div = $(id).next().attr('id');
    RemovePopover(id + ' input[type="text"]');   
    var list = $('#listview' + $div).data("kendoListView");
    $('#' + $div + ' .txt_search').val('');
    list.dataSource.filter([]);
    var attr = $('#' + $div).attr('sortcheck');
    if (typeof attr === typeof undefined && attr === false) {
        list.dataSource.sort({ field: 'MdDate', dir: 'desc' });
    } 
    $('#' + $div + ' .sortingicon').removeClass('sortingicon-top').removeClass('sortingicon-bottom').addClass('sortingicon');
    determineDropDirection();
    $('#listview' + $div + '_pager').bind('click', function (e) {
        e.stopPropagation();
    });
   // BindDropDownEvents();
    $('#' + $div).modal('show');
    $('#' + $div + ' .txt_search').focus();

}
$(function () {
    popupEvents();
});

var popupEvents = function () {
    $(document).unbind().bind('click touch', function (event) {
        $('.page-content .dropdown-menu').hide();
        $('.dropdown-menu').modal('hide');
    });
    $(document).on('click', '.dropdown-menu', function (event) {
        event.stopPropagation();

    });

    $(document).on("click", ".popupsender", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $div = $(this).next().attr('id');
        RemovePopover('#' + $(this).attr('id') + ' input[type="text"]');
        var Tbllbl = $('#' + $div + '  div.ul-header div.' + $div + 'lblpopup');
        $('#listview' + $div + '_pager').bind('click', function (e) {
            e.stopPropagation();
        });
        $('#listviewdivddlexpirydays1_pager').bind('click', function (e) {
            e.stopPropagation();
        });
        //var $hdn = $(this).next().find('input:hidden');
        //if ($hdn.val() != '')
        //    Tbllbl.html(Tbllbl.attr('title') + ' (' + $('#' + $div + ' .dv_DDL_List a i').filter('[role-ids="' + $hdn.val() + '"]').attr('title') + ')');
        //else Tbllbl.html(Tbllbl.attr('title'));
        var list = $('#listview' + $div).data("kendoListView");
        $('#' + $div + ' .txt_search').val('');
        list.dataSource.filter([]);
        var attr = $('#' + $div).attr('sortcheck');
        if ((typeof attr === typeof undefined && attr === false) || $div=='divddlScreener') {
            list.dataSource.sort({ field: 'MdDate', dir: 'desc' });
        }
        else if ($(this).is('[id*="ddl_Action_"]') || $(this).is('[id*="ddl_Strategy"]')) {
            //var $div = $(this).next().attr('id');
            if ($div == 'divddl_Strategy') {
                $('div[class*="ddldivddl_Action_"].hidedatesortdiv, .ddldivddl_Strategysortingicon:first').prev('.hidedatesortdiv').html('').html('Legs').show();// $('.hidedatesortdiv').hide();
            }
            list.dataSource.sort({ field: 'StrategyLegs', dir: 'asc' });
        } else if ($div == 'divddlexpirydays'){
            list.dataSource.sort({ field: 'Date', dir: 'asc' });
        }
    else if (e.currentTarget.attributes["sortDescByDefault"] !=undefined && $div == 'divddlInputSL') {//sortDescByDefault
            list.dataSource.sort({ field: 'MdDate', dir: 'desc' });
        }
        else {
            list.dataSource.sort({ field: 'Date', dir: 'desc' });
        }
        $('#' + $div + ' .sortingicon').removeClass('sortingicon-top').removeClass('sortingicon-bottom').addClass('sortingicon');
        determineDropDirection();
        $('#' + $div).modal('show');
        $('#' + $div + ' .txt_search').focus();

    });
    $(document).on("click touch", ".sortingicon", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rolediv = $(this).attr('role_div');
        var listViewSort = $(rolediv).data("kendoListView");
        var sorrtOrder = $(this).attr('sortOrder');
        $('.removesortcls').removeClass('sortingicon-bottom').removeClass('sortingicon-top');
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
        var srcdiv = rolediv.substr(9, rolediv.length);
        var attr = $('#' + srcdiv).attr('sortcheck');
        if (typeof attr !== typeof undefined && attr !== false) {
            var sortdata = [];
            sortdata = listViewSort.dataSource.data();
            sortdata.sort(function (a, b) {
                return naturalSorter(a.Text, b.Text);
            });
            //listViewSort.dataSource.data([]);
            if ($(this).attr('sortOrder') == "asc") {
                sortdata.sort(function (a, b) {
                    return naturalSorter(b.Text, a.Text);
                });
            }
            listViewSort.dataSource.data(sortdata);
        } else {
            if (($(this).is('[class*="ddl_Action_"]') || $(this).is('[class*="divddl_Strategy"]')) && $(this).attr('fieldname')!="Strategy" )
                listViewSort.dataSource.sort({ field: "StrategyLegs", dir: sorrtOrder });
            else
                listViewSort.dataSource.sort({ field: $(this).attr('fieldname'), dir: sorrtOrder });
        }
    });
    $(document).on("keyup", ".txt_search", function (e) {
        e.stopPropagation();
        if (e.which === 32 && !this.value.length) return;
        var keyval = $(this).val();
        searchpop(keyval, 0, $(this).attr('role_div'), $(this).attr('fieldname'));
    });
    $(document).on("click", ".btn_SearchGroup", function (e) {
        e.stopPropagation();
        var keyval = $(this).parent().prev().val();
        if (keyval.length > 0)
            searchpop(keyval, 0, $(this).attr('role_div'), $(this).attr('fieldname'));
    });
    $(document).on("click", ".imgDDLResetPopup", function (e) {
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
        if (typeof ResetFunction !== 'undefined' && $.isFunction(ResetFunction)) { ResetFunction(rolediv); }
    });
    $(document).on("click", ".imgDDLclosePopup", function (e) {
        e.stopPropagation();
        $('.nobg').modal('hide');
    });
}