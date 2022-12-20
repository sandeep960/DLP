var orgsort = 'asc', primaryContSort = 'asc', licenseTypesort = 'asc', signleLicSort = 'asc', concurrentLicesort = 'asc', org_clsname = 'sorting', email_clsname = 'sorting', licType_clsname = 'sorting', singleLicense_clsname = 'sorting', concurrent_clsname = 'sorting';
var deletelist = [];
var searchlist = function (keyval, minlen) {
    var list = $("#listView").data("kendoListView");
    if (keyval.length > minlen) {
        keyval = keyval.trim();
        list.dataSource.filter({ "logic": "or", "filters": [{ "field": "UserName", "operator": "contains", "value": keyval }, { "field": "EmailID", "operator": "contains", "value": keyval }, { "field": "Profile", "operator": "contains", "value": keyval }, { "field": "Status", "operator": "contains", "value": keyval }] }
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
//function bindhelpmenu(e) {
//    SetTable();
//    var listView = e.sender;
//    $('input[type="checkbox"]').iCheck({
//        checkboxClass: 'icheckbox_minimal-grey'
//    });
//    if (listView.dataSource.totalPages() <= 1) { listView.pager.element.addClass('Hide'); if ($('#txt_search').val().trim().length == 0) $('#dv_Search').addClass('Hide'); } else { listView.pager.element.removeClass('Hide'); $('#dv_Search').removeClass('Hide'); }

//}
SetTable = function () {
    var tblcount = 0;
    //usrsort,emailsort;
    $("#listView").append("<div class='col-lg-6 dv-lhead'><table class='table table-advanced sub-list-table'><thead><tr><th class='tb_2'><input type='checkbox' id='Left_chkAll'/></th><th class='" + org_clsname + "'>Organization Name<input type='hidden' value='" + orgsort + "'/></th><th class='tb140 " + email_clsname + "'>Primary Contact <input type='hidden' value='" + primaryContSort + "'/></th><th class='tb140 " + licType_clsname + "'>License Type <input type='hidden' value='" + licenseTypesort + "'/></th><th class='tb_7 " + singleLicense_clsname + "'>Single Licenses<input type='hidden' value='" + signleLicSort + "'/></th><th class='tb_7 " + concurrent_clsname + "'>Concurrent Licenses<input type='hidden' value='" + concurrentLicesort + "'/></th></tr></thead></table></div>");//
    $("#listView").append("<div class='col-lg-6 dv-rhead'><table class='table table-advanced sub-list-table'><thead><tr><th class='tb_2'><input type='checkbox' id='Right_chkAll'/></th><th class='" + org_clsname + "'>Organization Name<input type='hidden' value='" + orgsort + "'/></th><th class='tb140 " + email_clsname + "'>Primary Contact <input type='hidden' value='" + primaryContSort + "'/></th><th class='tb140 " + licType_clsname + "'>License Type <input type='hidden' value='" + licenseTypesort + "'/></th><th class='tb_7 " + singleLicense_clsname + "'>Single Licenses<input type='hidden' value='" + signleLicSort + "'/></th><th class='tb_7 " + concurrent_clsname + "'>Concurrent Licenses<input type='hidden' value='" + concurrentLicesort + "'/></th></tr></thead></table></div>");//
    // }
    var $divOdd = $("div.dv-lhead table").append('<tbody/>');
    var $divEven = $("div.dv-rhead table").append('<tbody/>');
    $("#listView .dispalydiv").each(function () {
        tblcount++;
        var listCount = $("#listView").find('.dispalydiv').length;
        var halfCount = (listCount % 2) == 0 ? (listCount / 2) : (listCount / 2) + 0.5;
        if (tblcount <= halfCount) {
            $divOdd.append('<tr class="group_header"><td class="tb_2"><input type="checkbox" class="group_header" orgid="' + $(this).find('label.lblOrganizationId').text() + '"/></td><td class="tb_3"><input type="hidden" id="hdnuserId" value="' + $(this).find('label.lblOrganizationId').text() + '"><a class="txt_link anc_OrgName"  href="#">' + $(this).find('label.lblOrganizationName').text() + '</a></td><td class="tb140">' + $(this).find('label.lblPrimaryContact').text() + '</td><td class="tb140">' + $(this).find('label.lblLicenseType').text() + '</td><td class="tb_7">' + $(this).find('label.lblSingleLicenses').text() + '</td><td class="tb_7">' + $(this).find('label.lblConcurrentLicenses').text() + '</td></tr>');//<td><button id="btnClear" class="btn btn-primary btnClear">Clear</button></td>
            $(this).html("");
        }
        else {
            $divEven.append('<tr class="group_header"><td class="tb_2"><input type="checkbox" class="group_header" orgid="' + $(this).find('label.lblOrganizationId').text() + '"/></td><td class="tb_3"><input type="hidden" id="hdnuserId" value="' + $(this).find('label.lblOrganizationId').text() + '"><a class="txt_link anc_OrgName"  href="#">' + $(this).find('label.lblOrganizationName').text() + '</a></td><td class="tb140">' + $(this).find('label.lblPrimaryContact').text() + '</td><td class="tb140">' + $(this).find('label.lblLicenseType').text() + '</td><td class="tb_7">' + $(this).find('label.lblSingleLicenses').text() + '</td><td class="tb_7">' + $(this).find('label.lblConcurrentLicenses').text() + '</td></tr>');//<td><button id="btnClear" class="btn btn-primary btnClear">Clear</button></td>
            $(this).html("");

        }
    });
    if ($("#listView .dispalydiv").length < 3) {
        $('table thead tr th').removeClass('sorting sorting_asc sorting_desc')
    }
    if ($("#listView .dispalydiv").length == 0) {
        $('div.dv-lhead').addClass('dvAlign');
        $divOdd.append('<tr class="group_header"><td style="text-align:center;" colspan="8">No data found</td></tr>');
        //  $("div.odd").append('<table class="table table-advanced sub-list-table tr_Table" style="margin-bottom: 0px;"><tbody><tr class="group_header"><td style="text-align:center;">No data found</td></tr></tbody></table>');
        $("div.dv-rhead").remove();
    }
    else {
        $.each(deletelist, function (i, j) {
            $("#listView table tbody input[type='checkbox'][userid='" + j + "']").iCheck('check');
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
        checkboxclick($(this), bflag, chkid, deletelist, 'orgid', length, 'listView');
    });
}

$(document).ready(function () {

    $("#txtPhone").mask('(000)-(000)-(0000)');

    var listView = $("#listView").data("kendoListView");
    listView.bind("dataBound", function (e) {
        SetTable();
        $('input[type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_minimal-grey'
        });
        if (listView.dataSource.totalPages() <= 1) { listView.pager.element.hide(); if ($('#txt_search').val().trim().length == 0) $('#dv_Search').hide(); } else { listView.pager.element.show(); $('#dv_Search').show(); }
        //alert(listView.dataSource._pristineData);
        $('#txt_search').focus();
        $('a.anc_OrgName').click(function () {
            var orgID = $(this).parent().find($('input[type="hidden"]')).val();
            $("#CreateOrganization").show();
            $('#btnAddnew').hide();
            $('#btndelete').hide();
            $('.canclebutton').show();
            $.blockUI();
            $.ajax({
                url: rootUrl + 'SuperAdmin/GetOrganizationDetailsByOrgID',
                type: 'GET',
                data: { 'orgID': orgID },
                traditional: true,
                content: "application/json; charset=utf-8",
                success: function (data) {
                    if (data[0] != null) {
                        PopulateOrganizationData(data);
                    }
                    $.unblockUI();
                },
                error: function (request, status, err) {
                    ShowModel('Error occured! \n' + err, 'alert-error');
                    $.unblockUI();
                }
            });
            $(".demo-section,#dv_Search").hide();

        });
    });
    $('#btn_SearchOrganization').click(function () {
        var keyval = $('#txt_search').val();
        if (keyval.length > 0)
            searchlist(keyval, 0);
    });
    $('#Left_chkAll').die('ifClicked').live('ifClicked', function (event) {
        var bflag = ($(this).is(':checked')) ? 'uncheck' : 'check';
        $('#listView div.dv-lhead table tbody tr.group_header').each(function () {
            maincheckbox($(this), deletelist, bflag, 'userid');
            $(this).find('input[type="checkbox"]').iCheck(bflag);
        });
    });
    $('#Right_chkAll').die('ifClicked').live('ifClicked', function (event) {
        var bflag = ($(this).is(':checked')) ? 'uncheck' : 'check';
        $('#listView div.dv-rhead table tbody tr.group_header').each(function () {
            maincheckbox($(this), deletelist, bflag, 'userid');
            $(this).find('input[type="checkbox"]').iCheck(bflag);
        });
    });
    $('.sorting,.sorting_desc,.sorting_asc').live('click', function () {
        var index = $(this).index();
        var colval = $(this).text().trim().toLowerCase();
        var fieldName;// = $(this).text().trim().toLowerCase() == 'name' ? 'Name' : 'ClosePrice';
        var sortOrder = $(this).find('input:hidden').val();
        if (colval == 'user name') {
            fieldName = 'UserName';
            usr_clsname = (sortOrder == 'asc') ? 'sorting_asc' : 'sorting_desc'
            usrsort = sortOrder == 'asc' ? 'desc' : 'asc';
            profile_clsname = email_clsname = status_clsname = delete_clsname = 'sorting';
            emailsort = profilesort = statussort = deletesort = 'asc';
        }
        else if (colval == 'emailid') {
            fieldName = 'EmailID';
            email_clsname = (sortOrder == 'asc') ? 'sorting_asc' : 'sorting_desc'
            emailsort = sortOrder == 'asc' ? 'desc' : 'asc';
            profile_clsname = usr_clsname = deletesort = status_clsname = delete_clsname = 'sorting';
            usrsort = profilesort = statussort = deletesort = 'asc';
        } else if (colval == 'profile') {
            fieldName = 'Profile';
            profile_clsname = (sortOrder == 'asc') ? 'sorting_asc' : 'sorting_desc'
            profilesort = sortOrder == 'asc' ? 'desc' : 'asc';
            email_clsname = usr_clsname = status_clsname = delete_clsname = 'sorting';
            usrsort = emailsort = statussort = deletesort = 'asc';
        }
        else if (colval == 'status') {
            fieldName = 'status';
            status_clsname = (sortOrder == 'asc') ? 'sorting_asc' : 'sorting_desc'
            statussort = sortOrder == 'asc' ? 'desc' : 'asc';
            email_clsname = usr_clsname = profile_clsname = delete_clsname = 'sorting';
            usrsort = emailsort = profilesort = deletesort = 'asc';
        }
        else {
            fieldName = 'deleted';
            delete_clsname = (sortOrder == 'asc') ? 'sorting_asc' : 'sorting_desc'
            deletesort = sortOrder == 'asc' ? 'desc' : 'asc';
            email_clsname = usr_clsname = profile_clsname = status_clsname = 'sorting';
            usrsort = emailsort = profilesort = statussort = 'asc';
        }
        var list = $("#listView").data("kendoListView");
        list.dataSource.sort({ field: fieldName, dir: sortOrder });


    });

    $('#dvpaymentforteam a').bind('click', function () {
        $('#dvpaymentforteam a').removeClass('btn-hover').addClass('btn-default2').filter(this).addClass('btn-hover');
        $('#hddvPaymenforteam').val($(this).attr('name'));
    });

    function PopulateOrganizationData(data) {


        $('#btnCreate').text('Save');
        $('#chkAccept').iCheck('enable');
        // $('#chkAccept').iCheck('check');
        $('#btnCreate').removeClass('disabled');
        $('#txtOrganization').val(data[0].OrganizationName);
        $('#OrganizationName').attr('oldname', data[0].OrganizationName)
        $('#txtPrimaryContact').val(data[0].Contact_Primary);
        $('#txtSingleLicense').val(data[0].NoOf_Single_Licenses);
        $('#txtConcurrentLicenses').val(data[0].NoOf_Concurrent_Licenses);
        $('#txtPhone').val(data[0].Contact_Phone);
        $('#hdorgId').val(data[0].Organization_Id);
        $('#hddvPaymenforteam').val(data[0].PaymentForTeam);
        $("#ddlLicenseType option:contains(" + data[0].LicenseType + ")").attr('selected', 'selected');

        var paymentval = '';
        if (data[0].PaymentForTeam == 0) { paymentval = 'No' } else { paymentval = 'Yes' }
        $('#dvpaymentforteam a').removeClass('btn-hover').addClass('btn-default2').filter($('#dvpaymentforteam a:contains(' + paymentval + ')').addClass('btn-hover'));
        
    }
    $('#btnCreate').click(function () {
        var orgID = $('#hdorgId').val() == "" ? 0 : $('#hdorgId').val();
        var valid = validation();
        if (valid) {

            var orgData = {};

            var orgName = $('#txtOrganization').val();
            var primaryContact = $('#txtPrimaryContact').val();
            var licenseType = $('#ddlLicenseType option:selected').text();
            var singleLicenses = $('#txtSingleLicense').val();
            var concurrenLicenses = $('#txtConcurrentLicenses').val();
            var contactPhone = $('#txtPhone').val();
            var PaymentForTeam = $('#hddvPaymenforteam').val();
            var files = $("#File").get(0).files;
            var data = new FormData();
            data.append("userUploadedImage", files[0]);

            orgData.Organization_Id = orgID;
            orgData.OrganizationName = orgName;
            orgData.Contact_Primary = primaryContact;
            orgData.Contact_Phone = contactPhone;
            orgData.LicenseType = licenseType;
            orgData.NoOf_Single_Licenses = singleLicenses
            orgData.NoOf_Concurrent_Licenses = concurrenLicenses;
            orgData.PaymentForTeam = PaymentForTeam;
            var orgInformation = JSON.stringify(orgData);

            data.append("acutalData", orgInformation);

            $.blockUI();
            $.ajax({
                url: rootUrl + 'SuperAdmin/InsertUpdateOrganizationData',
                type: 'POST',
                data: data, traditional: true,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data == -1) {
                        if (orgID == '')
                            ShowModel('Organization is Successfully Created', 'alert-success');
                        else
                            ShowModel('Selected Organization is Successfully Updated', 'alert-success');
                        if ($('#hddvPaymenforteam').val() == "true") {
                            window.location.href = "https://apps.key2options.com/K2OPaymentsGateway";

                        }
                        else {
                            displaytable();
                            GetTabledata();
                            $.unblockUI();
                        }
                    }
                    else if (data == 0) {
                        $.unblockUI();
                        ShowModel('Image size should not exceed more than 50 KB.', 'alert-error');
                    }
                    else {
                        $.unblockUI();
                        ShowModel('Please Check Organization is already exists.', 'alert-error');
                    }
                },
                error: function (xhr, status, error) {
                    $.unblockUI();
                    ShowModel('Internal Server Error! Occured.', 'alert-error');
                }
            });
            //$.unblockUI();
            //}
            //else
            //    return false;
        } else
            return false;
    });

    validation = function () {
        var count = 0;

        if (!RequiredFieldValidation('#txtOrganization', 'Organization Name is required.')) {
            count++;
            return false;
        }
        else if (!orgNamevalidation('#txtOrganization')) {
            count++;
            return false;
        }
        else {
            RemovePopover('#txtOrganization');
        }
        if (!RequiredFieldValidation('#txtPrimaryContact', 'Primary Contact Name is required.')) {
            count++;
            return false;
        }
        else
            RemovePopover('#txtPrimaryContact');
        if (!RequiredFieldValidation('#txtPhone', 'Contact Phone is required.')) {
            count++;
            return false;
        }
        else
            RemovePopover('#txtPhone');
        if ($('#ddlLicenseType option:selected').val() == '0') {
            PopoverFunction('#ddlLicenseType', 'Please select Licese Type.');
            count++;
            return false;
        }
        else {
            RemovePopover('#ddlLicenseType');
        }
        if (!RequiredFieldValidation('#txtSingleLicense', 'No of Single license is required.')) {
            count++;
            return false;
        }
        else {
            RemovePopover('#txtSingleLicense');
        }
        if (parseInt($("#txtConcurrentLicenses").val()) > parseInt($("#txtSingleLicense").val())) {
            PopoverFunction('#txtConcurrentLicenses', "Concurrent users should be less than are equal to Individual users");
            count++;
            return false;
        }
        else {
            RemoveError('#txtConcurrentLicenses');
        }

        if (count == 0)
            return true;
    }

    orgNamevalidation = function (txtname) {

        //Removing spaces, numbers in the first positions
        var strcount = 0;
        var username = $(txtname).val().trim();

        var newString = username.indexOf(/[0-9]+/g) == 0 ? username.substring(1) : username;
        var count = 0;
        username = username.replace(/\s+/g, " ");

        var regExp = /^\s*[a-zA-Z0-9_,\s]+\s*$/;
        var regExpnumbers = /^[0-9]*$/;

        if (regExpnumbers.test(username.charAt(0)) && !username == "") {
            PopoverFunction(txtname, ' You can use letters, numbers and hyphen “_” character. Should not start with numbers.');
            return false;
        }
        else if (!regExp.test(username)) {
            count++;
            PopoverFunction(txtname, 'Special characters are not allowed except "_".');
            return false;
        }
        else {
            RemovePopover(txtname);
            return true;
        }
    }
    $('#txtSingleLicense').bind('change', function () {
        var _noOfSignleLicense = $('#txtSingleLicense');
        if (_noOfSignleLicense.val().trim().length > 0) {

            $regNum = /^(?:\d*\.\d{1,5}|\d+)$/
            if (!$regNum.test(_noOfSignleLicense.val().trim())) {
                PopoverFunction(_noOfSignleLicense, 'Only numbers allowed here.');
                return;
            }
            else RemoveError(_noOfSignleLicense);

        }
    });
    $('#txtConcurrentLicenses').bind('change', function () {
        var _noOfConcurrentLicense = $('#txtConcurrentLicenses');
        if (_noOfConcurrentLicense.val().trim().length > 0) {

            $regNum = /^(?:\d*\.\d{1,5}|\d+)$/
            if (!$regNum.test(_noOfConcurrentLicense.val().trim())) {
                PopoverFunction(_noOfConcurrentLicense, 'Only numbers allowed here.');
                return;
            }
            else RemoveError(_noOfConcurrentLicense);

        }
    });

    $('#btnAddnew').click(function () {

        $('#CreateOrganization input[type="text"]').val('');
        //$('#ddlProfile').val('0');
        $("#CreateOrganization").show();
        $(".demo-section,#dv_Search").hide();
        $('#ddlLicenseType').val(0);

        $('#btnAddnew').hide();
        $('#btndelete').hide();
        $('#diverror').hide();
        $('.canclebutton').show();
        $('#txtOrganization').focus();


    });
    function displaytable() {
        $('#txt_search').val(''); //uservalid = true;

        $('#btnCreate').text('Create Organization');
        //$('#chkAccept').iCheck('uncheck').iCheck('disable');
        var list = $("#listView").data("kendoListView");
        list.dataSource.filter([]);
        RemovePopover("#CreateOrganization input");
        RemovePopover("#CreateOrganization select");
        $("#CreateOrganization input").val('');
        $("#CreateOrganization").css("display", "none");
        $('input[type="checkbox"]').iCheck('uncheck');
        $('#ddlLicenseType').val(0);
        $('#btnAddnew').show();
        $('#btndelete').show();
        $('.canclebutton').hide();
        //$('#ddlRole').val('');
        $('#txtOrganization').removeAttr('oldname');
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
            var _commaSeparatedusers = '';
            if (deletelist.length <= 0) {
                ShowModel('Please select Organizattion to delete.', 'alert-error');

                $('#delete-confirm').modal('hide');
                return false;

            }
            else if (deletelist.length > 0) {
                $.each(deletelist, function (i, j) {
                    if (_commaSeparatedusers == '')
                        _commaSeparatedusers = j;
                    else
                        _commaSeparatedusers = _commaSeparatedusers + ',' + j;
                });
                $('#delete-confirm').modal('show');
                $("#btndeleteConfirm").click(function (evt) {
                    evt.stopPropagation();

                    $("#delete-confirm").modal('hide');
                    $("#btndeleteConfirm").unbind('click');
                    $.blockUI();
                    $.ajax({
                        url: rootUrl + 'SuperAdmin/DeleteOrganizationList',
                        type: 'GET',
                        data: { 'OrgIds': _commaSeparatedusers },
                        traditional: true,
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data == -1) {
                                deletelist = [];
                                ShowModel('Selected Organizations are Successfully Deleted', 'alert-success');
                                GetTabledata();
                            }
                            else {
                                ShowModel('Error in removing Organizations.', 'alert-error');
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
});

