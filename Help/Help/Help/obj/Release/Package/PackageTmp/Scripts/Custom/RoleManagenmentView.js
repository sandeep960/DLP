var rolesort = 'asc', role_clsname = 'sorting';
var deletelist = [];
var searchlist = function (keyval, minlen) {
    var list = $("#listView").data("kendoListView");
    if (keyval.length > minlen) {
        keyval = keyval.trim();
        list.dataSource.filter({ "logic": "or", "filters": [{ "field": "RoleName", "operator": "contains", "value": keyval }]}
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
        $('input[type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_minimal-grey'
        });
        if (listView.dataSource.totalPages() <= 1) { listView.pager.element.hide(); if ($('#txt_search').val().trim().length == 0) $('#dv_Search').hide(); } else { listView.pager.element.show(); $('#dv_Search').show(); }
        $('#txt_search').focus();

        $('a.anc_RoleName').click(function () {
            var RoleID = $(this).parent().find($('input[type="hidden"]')).val();
            $("#CreateRole").show();
            $('#btnAddnew').hide();
            $('#btndelete').hide();
            $('.canclebutton').show();
            $('#txtRoleName').val($(this).text());
            $('#txtPriority').val($(this).attr('Priority'));
            $('#btnCreateRole').text('Save');
            $('#hdroleID1').val(RoleID);
            $(".demo-section,#dv_Search").hide();
           
        });
    });
    listView.bind("dataBinding", function (e) {

    });
    $('#btn_SearchGroup').click(function () {
        var keyval = $('#txt_search').val();
        if (keyval.length > 0)
            searchlist(keyval, 0);
    });
    $('#Left_chkAll').die('ifClicked').live('ifClicked', function (event) {
        var bflag = ($(this).is(':checked')) ? 'uncheck' : 'check';
        $('#listView div.dv-lhead table tbody tr.group_header').each(function () {
            maincheckbox($(this), deletelist, bflag, 'groupid');
            $(this).find('input[type="checkbox"]').iCheck(bflag);
        });
    });
    $('#Right_chkAll').die('ifClicked').live('ifClicked', function (event) {
        var bflag = ($(this).is(':checked')) ? 'uncheck' : 'check';
        $('#listView div.dv-rhead table tbody tr.group_header').each(function () {
            maincheckbox($(this), deletelist, bflag, 'groupid');
            $(this).find('input[type="checkbox"]').iCheck(bflag);
        });
    });
    $('.sorting,.sorting_desc,.sorting_asc').live('click', function () {
        var index = $(this).index();
        var colval = $(this).text().trim().toLowerCase();
        var fieldName;// = $(this).text().trim().toLowerCase() == 'name' ? 'Name' : 'ClosePrice';
        var sortOrder = $(this).find('input:hidden').val();
        if (colval == 'role name') {
            fieldName = 'RoleName';
            role_clsname = (sortOrder == 'asc') ? 'sorting_asc' : 'sorting_desc'
            rolesort = sortOrder == 'asc' ? 'desc' : 'asc';
        }
        
        var list = $("#listView").data("kendoListView");
        list.dataSource.sort({ field: fieldName, dir: sortOrder });


    });
    
});

$(document).ready(function () {

    var title = '';
    var titlearr = [];
    $('#table_id1 thead tr th').find('input:checkbox').live('ifChecked ifUnchecked', function (event) {
        var bflag = (event.type == 'ifChecked') ? 'check' : 'uncheck';
        $('#table_id1 tbody tr td :checkbox').not(this).iCheck(bflag);
    });
    $('#btnAddnew').click(function () {
        $('#CreateRole input[type="text"]').val('');
        $('#ddlProfile').val('0');
        $("#CreateRole").show();
        $('#hdroleID1').val('');
        $('#btnCreateRole').text('Create Role');
        $(".demo-section,#dv_Search").hide();
        $('#btnAddnew').hide();
        $('#btndelete').hide();
        $('#diverror').hide();
        $('.canclebutton').show();
        $('#txtRoleName').focus();

       // titlearr.push({ "id": 'txtRoleName', "value": 'You can use letters, numbers and hyphen “_” character. Should not start with numbers.' });
    });
    $('#txtRoleName').bind('click', function () {
        RemovePopover(this);
        var id = $(this).attr('id');
        for (var k = 0; k < titlearr.length; ++k) {
            if (id == titlearr[k]['id']) {
                title = titlearr[k]['value'];
            }
        }
        if (title != "") {
            PopoverHelp(this, title, 'right');
            title = "";
        }
    });
    function displaytable() {
        $('#txt_search').val(''); 
        var list = $("#listView").data("kendoListView");
        list.dataSource.filter([]);
        RemovePopover("#CreateRole input");
        $("#CreateRole input").val('');
        $("#CreateRole").css("display", "none");
        $('#btnAddnew').show();
        $('#btndelete').show();
        $('.canclebutton').hide();
        $('#ddlRole').val('');
        $(".demo-section,#dv_Search").css("display", "inline");
    }
    $('#btnCancel').click(function () {
        displaytable();
    });
    var GetTabledata = function () {
        $.blockUI();
        try {
            var list = $("#listView").data("kendoListView");
            list.dataSource.read();

            //list.dataSource.refresh();
            displaytable();
        }
        catch (e) {
            ShowModel('An Error occurred due to\n ' + e, 'alert-error');
        }
        $.unblockUI();
    }
    $('#btndelete').click(function () {
        try {

            var _checked;
            //var arr=[];
            var _commaSeparatedroles = '';
            if (deletelist.length <= 0) {
                ShowModel('Please select Role to delete.', 'alert-error');

                $('#delete-confirm').modal('hide');
                return false;

            }
            else if (deletelist.length > 0) {
                $.each(deletelist, function (i, j) {
                    if (_commaSeparatedroles == '')
                        _commaSeparatedroles = j;
                    else
                        _commaSeparatedroles = _commaSeparatedroles + ',' + j;
                });
                $('#delete-confirm').modal('show');
                $("#btndeleteConfirm").click(function (evt) {
                    evt.stopPropagation();

                    $("#delete-confirm").modal('hide');
                    $("#btndeleteConfirm").unbind('click');
                    $.blockUI();
                    $.ajax({
                        url: rootUrl + 'SuperAdmin/DeleteRoleList',
                        type: 'GET',
                        data: { 'RoleIds': _commaSeparatedroles },
                        traditional: true,
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data == 1) {
                                deletelist = [];
                                ShowModel('Selected Roles are Successfully Deleted', 'alert-success');
                                GetTabledata();
                            }
                            else {
                                ShowModel('Error in removing Roles.', 'alert-error');
                            }
                            $.unblockUI();

                        },
                        error: function (request, status, err) {
                            ShowModel('Error occured! \n' + err, 'alert-error');
                            $.unblockUI();
                        }
                    });
                });

            }
        }
        catch (e) {
            ShowModel('An Error occurred due to\n ' + e, 'alert-error');
            $.unblockUI();
        }
    });
    $("#txt_search").bind("keyup", function (e) {
        if (e.which === 32 && !this.value.length) return;
        var keyval = $(this).val();
        searchlist(keyval,0);
    });
    //End of checking Email availability

    $('#btnCreateRole').click(function () {
        RoleID = $('#hdroleID1').val();
        var valid = texboxvalidation('#txtRoleName', "Role Name is required.");
        if (!valid) {
            return false;
        }
        else {
            valid = Integervalidation('#txtPriority', 'Priority number is Required.');
        }
        if (valid) {
            var OperationType = "CREATE";
            if (RoleID != '')
                OperationType = 'UPDATE';
            else
                RoleID = 0;
            var RoleName = $('#txtRoleName').val();
            var Priority = $('#txtPriority').val();
            arr = JSON.stringify({ RoleName: RoleName,Priority:Priority, RoleID: RoleID, OperationType: OperationType });
                $.blockUI();
                $.ajax({
                    url: rootUrl + 'SuperAdmin/Insert_RoleData',
                    type: 'POST',
                    data: arr, traditional: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data ==1) {
                            if (RoleID == '')
                                ShowModel('New Role are Successfully Added', 'alert-success');
                            else
                                ShowModel('Selected Role are Successfully Updated', 'alert-success');
                            displaytable();
                            GetTabledata();
                            $.unblockUI();
                        }

                        else {
                            $.unblockUI();
                            ShowModel('Internal Server Error! Occured.', 'alert-error');
                        }
                    },
                    error: function (xhr, status, error) {
                        $.unblockUI();
                        ShowModel('Internal Server Error! Occured.', 'alert-error');
                    }
                });
                //$.unblockUI();
            }
           else
            return false;
    });
 
    
    usernamevalidation = function (txtname) {

        //Removing spaces, numbers in the first positions
        var strcount = 0;
        var username = $(txtname).val().trim();

        var newString = username.indexOf(/[0-9]+/g) == 0 ? username.substring(1) : username;
        var count = 0;
        username = username.replace(/\s+/g, " ");

        var regExp = /^\s*[a-zA-Z]+\s*$/;
        if (!regExp.test(username)) {
            count++;
            PopoverFunction(txtname, 'You can use letters.');
            return false;
        }
        else {
            RemovePopover(txtname);
            return true;
        }
    }
    
});
SetTable = function () {
    var tblcount = 0;
    //usrsort,emailsort;
    $("#listView").append("<div class='col-lg-6 dv-lhead'><table class='table table-advanced sub-list-table'><thead><tr><th class='tb_2'><input type='checkbox' id='Left_chkAll'/></th><th class='" + role_clsname + "'>Role Name<input type='hidden' value='" + rolesort + "'/></th></tr></thead></table></div>");//
    $("#listView").append("<div class='col-lg-6 dv-rhead'><table class='table table-advanced sub-list-table'><thead><tr><th class='tb_2'><input type='checkbox' id='Right_chkAll'/></th><th class='" + role_clsname + "'>Role Name<input type='hidden' value='" + rolesort + "'/></th></tr></thead></table></div>");
    // }
    var $divOdd = $("div.dv-lhead table").append('<tbody/>');
    var $divEven = $("div.dv-rhead table").append('<tbody/>');
    $("#listView .dispalydiv").each(function () {
        tblcount++;
        var listCount = $("#listView").find('.dispalydiv').length;
        var halfCount = (listCount % 2) == 0 ? (listCount / 2) : (listCount / 2) + 0.5;

        if (tblcount <= halfCount) {
            $divOdd.append('<tr class="group_header"><td class="tb_2"><input type="checkbox" class="group_header" roleid="' + $(this).find('label.lblRoleID').text() + '" /></td><td class="tb_3"><input type="hidden" id="hdnroleId" value="' + $(this).find('label.lblRoleID').text() + '"><a class="txt_link anc_RoleName" Priority="' + $(this).find('label.lblPriority').text() + '" href="#">' + $(this).find('label.lblRoleName').text() + '</a></td></tr>');
            $(this).html("");
        }
        else {
            $divEven.append('<tr class="group_header"><td class="tb_2"><input type="checkbox" class="group_header" roleid="' + $(this).find('label.lblRoleID').text() + '" /></td><td class="tb_3"><input type="hidden" id="hdnroleId" value="' + $(this).find('label.lblRoleID').text() + '"><a class="txt_link anc_RoleName" Priority="' + $(this).find('label.lblPriority').text() + '" href="#">' + $(this).find('label.lblRoleName').text() + '</a></td></tr>');
            $(this).html("");

        }
    });
    if ($("#listView .dispalydiv").length < 3) {
        $('table thead tr th').removeClass('sorting sorting_asc sorting_desc')
    }
    if ($("#listView .dispalydiv").length == 0) {
        $('div.dv-lhead').addClass('dvAlign');
        $("div.odd").append('<table class="table table-advanced sub-list-table tr_Table" style="margin-bottom: 0px;"><tbody><tr class="group_header"><td style="text-align:center;">No data found</td></tr></tbody></table>');
        $("div.dv-rhead").remove();
    }
    else {
        $.each(deletelist, function (i, j) {
            $("#listView table tbody input[type='checkbox'][roleid='" + j + "']").iCheck('check');
        });
        Fillcheckboxes('listView', 'dv-lhead', 'Left_chkAll', 'left');
        Fillcheckboxes('listView', 'dv-rhead', 'Right_chkAll', 'right');
    }
    if ($("div.dv-rhead table tbody tr").length == 0) $("div.dv-rhead").remove();
    $('div.even table').css('margin-bottom', '0px');
    $('div.odd table').css('margin-bottom', '0px');
    $(".dispalydiv:empty").remove();
    $('table tbody [type="checkbox"]').die('ifClicked').live('ifClicked', function (event) {
        var bflag = ($(this).is(':checked')) ? 'uncheck' : 'check';
        var chkid = $(this).closest('table').find('thead [type="checkbox"]').attr('id');
        var length = $(this).closest('table').find('tbody tr.group_header').length;
        checkboxclick($(this), bflag, chkid, deletelist, 'roleid', length, 'listView');
    });
}
var cout = 0;