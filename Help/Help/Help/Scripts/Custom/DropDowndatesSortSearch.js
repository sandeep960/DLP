var searchpop = function (keyval, len, lstId, fieldName) {
    var list = $(lstId).data("kendoListView");
    if (keyval.length > len) {
        keyval = keyval.trim();
        list.dataSource.filter({ "logic": "or", "filters": [{ "field": fieldName, operator: "Contains", "value": keyval }] }
        );
    }
    else if (keyval.length == 0) list.dataSource.filter([]);
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
    list.dataSource.sort({ field: 'Text', dir: 'asc' });
    $('#' + $div + ' .sortingicon').removeClass('sortingicon-top').removeClass('sortingicon-bottom').addClass('sortingicon');
    determineDropDirection();
    $('#listview' + $div + '_pager').bind('click', function (e) {
        e.stopPropagation();
    });
    // BindDropDownEvents();
    $('#' + $div).modal('show');
}
$(function () {
    $(document).unbind().bind('click touch', function (event) {
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
        var list = $('#listview' + $div).data("kendoListView");
        $('#' + $div + ' .txt_search').val('');
        list.dataSource.filter([]);
        //list.dataSource.sort({ field: 'Text', dir: 'asc' });
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
        var field = $(this).attr('fieldname');
        field = "Date";
        $('.removesortcls').removeClass('sortingicon-bottom').removeClass('sortingicon-top');
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
        listViewSort.dataSource.sort({ field: field, dir: sorrtOrder });
    });
    $(document).on("keyup", ".txt_search", function (e) {
        e.stopPropagation();
        if (e.which === 32 && !this.value.length) return;
        var keyval = $(this).val();
        searchpop(keyval,0, $(this).attr('role_div'), $(this).attr('fieldname'));
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
        listView.dataSource.sort({ field: 'Text', dir: 'asc' });
        if (typeof ResetFunction !== 'undefined' && $.isFunction(ResetFunction)) { ResetFunction(rolediv); }
    });
    $(document).on("click", ".imgDDLclosePopup", function (e) {
        e.stopPropagation();
        $('.nobg').modal('hide');
    });



});