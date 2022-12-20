
$(window).load(function () {
    $.unblockUI();
});


$(document).ready(function () {

    $.blockUI();
    GetUserDetails();
    var title = '';
    var titlearr = [];
    var uservalid = true;
    var emailvalid = true;
    var passwordchange = false;

    $(document).ajaxStart(function () {
        $.blockUI();
    });
    $(document).ajaxComplete(function () {
        $.unblockUI();
    });
    $("#txtPhone").mask('(000)-(000)-(0000)');

    $('#aTermsConditions').click(function () {
        $('#terms-confirm').modal('show');
    });
    var userID = 0;
    $('#table_id1 thead tr th').find('input:checkbox').live('ifChecked ifUnchecked', function (event) {
        var bflag = (event.type == 'ifChecked') ? 'check' : 'uncheck';
        $('#table_id1 tbody tr td :checkbox').not(this).iCheck(bflag);
    });
    IsUserExist = function () {
        if ($('#txtUsername').val() != '') {
            $.blockUI();
            $.ajax({
                url: rootUrl + 'Home/CheckUserAvailabity',
                type: 'GET',
                data: { "userName": $('#txtUsername').val().trim(), 'userId': UserID },
                traditional: true,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data == true) {
                        PopoverFunction('#txtUsername', 'Already someone has registered with this name.');
                        $.unblockUI();
                        uservalid = false;
                    }
                    else {
                        RemovePopover('#txtUsername');
                        $.unblockUI();
                        uservalid = true;
                        return true;
                    }
                    $.unblockUI();
                }
            });
        }
    }
    $('#ddlProfile').change(function () {
        RemovePopover('#ddlProfile');
        var oldprofile = $('#hdProfileID').val();
        if ($(this).val() != 0) {
            if (oldprofile != $(this).val()) {
                var days = $('option:selected', this).attr('days');
                GetEndDate(parseInt(days));
            }
            else
                $('#txtendDate').val($('#hdEndDate').val());
        }
    });
    function GetEndDate(days) {
        var date = new Date();
        var date1 = (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
        var dString = date1.split('/');
        var dt = new Date(dString[2], dString[0] - 1, dString[1]);
        dt.setDate(dt.getDate() + days);
        var finalDate = pad(dt.getMonth() + 1, 2) + "/" + pad(dt.getDate(), 2) + "/" + dt.getFullYear();
        $('#txtendDate').val(finalDate);
    }
    function pad(number, length) {

        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }

        return str;

    }
    $('#dv_ISActive a').bind('click', function () {
        $('#dv_ISActive a').removeClass('btn-hover').addClass('btn-default2').filter(this).addClass('btn-hover');
        $('#hf_ISActive').val($(this).text().toLowerCase() == 'yes' ? '1' : '0');
    });
    $('#dv_ISDeleted a').bind('click', function () {
        $('#dv_ISDeleted a').removeClass('btn-hover').addClass('btn-default2').filter(this).addClass('btn-hover');
        $('#hf_ISDeleted').val($(this).text().toLowerCase() == 'yes' ? '1' : '0');
    });
    $('[name="datepicker"]').each(function () {
        $(this).datepicker({
            minDate: new Date(), changeMonth: true,
            changeYear: true
        });
        DateTexBox($(this));

    });

    $('#txtUsername').bind('click', function () {
        RemovePopover(this);
        var id = $(this).attr('id');
        for (var k = 0; k < titlearr.length; ++k) {
            if (id == titlearr[k]['id']) {
                title = titlearr[k]['value'];
            }
        }
        if (title != "") {
            PopoverHelp(this, title, 'bottom');
            title = "";
        }
    });

    $('#btnCancel').click(function () {
        //displaytable();
        GetUserDetails();
    });


    $('#txtFirstName').keypress(function (e) {
        var regex = new RegExp("^[a-zA-Z]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            RemovePopover('#txtFirstName');
            return true;
        }
        else {
            e.preventDefault();
            PopoverFunction('#txtFirstName', 'Only characters allowed.');
            return false;
        }
    });
    $('#txtLastName').keypress(function (e) {
        var regex = new RegExp("^[a-zA-Z]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            RemovePopover('#txtLastName');
            return true;
        }
        else {
            e.preventDefault();
            PopoverFunction('#txtLastName', 'Only characters allowed.');
            return false;
        }
    });
    $('#txtPassword').bind('focus', function (e) {
        if (!passwordchange) {
            $(this).val('');
            $('#txtConfirmPwd').val('');
            passwordchange = true;
        }
    });
    $('#btnAccept').click(function () {
        $('#chkAccept').iCheck('enable');
        $('#chkAccept').iCheck('check');
        $('#btnSignUp').removeClass('disabled');
    });
    $('#btnDecline').click(function () {
        $('#chkAccept').iCheck('uncheck').iCheck('disable');
        $('#btnSignUp').addClass('disabled');
    });
    $('#chkAccept').on("ifUnchecked", function () {
        $('#btnSignUp').addClass('disabled');
        $('#chkAccept').iCheck('uncheck').iCheck('disable');
    });


    function IsEmailExist() {
        if ($('#txtEmailId').val() != '') {
            $.blockUI();
            $.ajax({
                url: rootUrl + 'Home/CheckEmailAvailabity',
                type: 'GET',
                data: { "email": $('#txtEmailId').val().trim() },
                traditional: true,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data == true) {
                        PopoverFunction('#txtEmailId', 'Already registered with this Email.');
                        $.unblockUI();
                        emailvalid = false;
                        return false;
                    }
                    else {
                        RemovePopover('#txtEmailId');
                        $.unblockUI();
                        emailvalid = true;
                        return true;
                    }
                    $.unblockUI();
                }
            });
        }

    }
    //End of checking Email availability

    $('#txtConfirmPwd').change(function () {
        if ($('#txtPassword').val() != $('#txtConfirmPwd').val()) {
            PopoverFunction('#txtConfirmPwd', 'Password and confirm password should match.');
            return false;
        }
        else { RemovePopover('#txtConfirmPwd'); }

    });
    $('#txtUsername').change(function () {
        if (UserID != '') {
            if (!IsUserExist()) {
                PopoverFunction('#txtUsername', 'Already registered with this name.');
                return false;
            }
            else
                return true;
        }
    });
    $('#txtEmailId').change(function () {
        //if (UserID == '') {
        //    if (!IsEmailExist()) {
        //        PopoverFunction('#txtEmailId', 'Already some one registered with this email.');
        //        return false;
        //    }
        //}
        //else {
        //    var oldEmail = $('#hdEMailID').val().toLowerCase();
        //    if (oldEmail != $('#txtEmailId').val().toLowerCase()) {
        //        if (!IsEmailExist()) {
        //            PopoverFunction('#txtEmailId', 'Already some one registered with this email.');
        //            count++;
        //            return false;
        //        }
        //        else
        //            RemovePopover('#txtEmailId');
        //    }
        //}
        emailvalid = true;
        var oldEmail = $('#hdEMailID').val().toLowerCase();
        if (oldEmail != $('#txtEmailId').val().toLowerCase()) {
            IsEmailExist();
        }
        else {
            RemovePopover('#txtEmailId');
        }
    });
    $('#btnSignUp').click(function () {

        userID = $('#hduserID1').val();
        var valid = validation();
        if (valid) {
            var validUE = validataionUE();
            if (validUE) {
                var arr = [];
                var firstName = $('#txtFirstName').val();
                var lastName = $('#txtLastName').val();
                var userName = $('#txtUsername').val();
                var passWord = $('#txtPassword').val();
                var email = $('#txtEmailId').val();
                var profile = 0; // $('#ddlProfile option:selected').val();
                var role = $('#ddlRole option:selected').val();
                var phone = $('#txtPhone').val();
                var IsActive = $('#hf_ISActive').val();
                var ISDeleted = $('#hf_ISDeleted').val();
                var EndDate = $('#txtendDate').val();
                var PasswordHash = $('#hdPasswordHash').val();
                var PasswordSalt = $('#hdPasswordSalt').val();
                //var Orgnization_Id = $('#ddlOrganization option:selected').val();
                if (!passwordchange)
                    passWord = '';
                var address = $('#txtaddress1').val() + ';' + $('#txtaddress2').val() + ';' + $('#ddlState').val() + ';' + $('#txtCity').val() + ';' + $('#txtCountry').val(); //$('#txtAddress').val();
                //var terms_Condistions = $('#dvTermsConditions').text().trim();
                //arr.push({ UserName: userName, UserID: userID, password: passWord, EmailID: email, Phone: phone, PasswordHash: PasswordHash, PasswordSalt: PasswordSalt, Profile_ID: profile, Role_ID: role, Address: address, FirstName: firstName, role: role, IsActive: IsActive, ISDeleted: ISDeleted, EndDate: EndDate, LastName: lastName });
                arr.push({ UserName: userName, UserID: userID, password: passWord, EmailID: email, Phone: phone, PasswordHash: PasswordHash, PasswordSalt: PasswordSalt, Profile_ID: profile, Role_ID: role, Address: address, FirstName: firstName, role: role, IsActive: IsActive, ISDeleted: ISDeleted, EndDate: EndDate, LastName: lastName });
                arr = JSON.stringify({ 'arr': arr, opertaionType: 'save' });
                $.blockUI();
                $.ajax({
                    url: rootUrl + 'Home/Insert_Update_SignUpData',
                    type: 'POST',
                    data: arr, traditional: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data == -1) {
                            if (userID == '')
                                ShowModel('New User are Successfully Added', 'alert-success');
                            else
                                ShowModel('Selected User are Successfully Updated', 'alert-success');
                            //displaytable();
                            //GetTabledata();
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
        } else
            return false;
    });
    validation = function () {
        var count = 0;
        //if (!$('#chkAccept').is(':checked')) {
        //    $('#chkAccept').iCheck('enable');
        //    $('input').iCheck({
        //        checkboxClass: 'icheckbox_square-red'
        //    });
        //    $('#chkAccept').iCheck('disable');
        //    ShowModel('In order to use our services, you must agree to K2O Terms and Conditions.', 'alert-error');
        //    return false;
        //}
        if (!RequiredFieldValidation('#txtUsername', 'User Name is required.')) {
            count++;
            return false;
        }
        else if (!usernamevalidation('#txtUsername')) {
            count++;
            return false;
        }
        else {
            RemovePopover('#txtUsername');
        }
        if (!RequiredFieldValidation('#txtFirstName', 'First Name is required.')) {
            count++;
            return false;
        }
        else
            RemovePopover('#txtFirstName');
        if (!RequiredFieldValidation('#txtLastName', 'Last Name is required.')) {
            count++;
            return false;
        }
        else
            RemovePopover('#txtLastName');
        if (!RequiredFieldValidation('#txtEmailId', 'EmailId is required.')) {
            count++;
            return false;
        }
        else if (!(validateEmail($('#txtEmailId').val().trim()))) {
            PopoverFunction('#txtEmailId', 'Please enter valid email id.');
            count++;
            return false;
        }
        else {
            RemovePopover('#txtEmailId');
        }

        if (!RequiredFieldValidation('#txtPhone', 'Phone number is required.')) {
            count++;
            return false;
        }
        else if (($('#txtPhone').val().trim().length < 12)) {
            PopoverFunction('#txtPhone', 'Should be of 10 numbers.');
            count++;
            return false;
        }
        else {
            RemovePopover('#txtPhone');
        }
        if (!RequiredFieldValidation('#txtaddress1', 'Address is Required')) {
            count++;
            return false;
        }
        else {
            RemovePopover('#txtaddress1');
        }

          if ($('#ddlState option:selected').val() == '0')
        {
            PopoverFunction('#ddlState', 'Please select State.');
            count++;
            return false;
         }
          else
          {
            RemovePopover('#ddlState');
            }
                

        if (!RequiredFieldValidation('#txtCity', 'City name is Required')) {
            count++;
            return false;
        }
    else
            {
            RemovePopover('#txtCity');
        }

        if (!RequiredFieldValidation('#txtCountry', 'Country name is Required')) {
            count++;
            return false;
        }
        else {
            RemovePopover('#txtCountry');
        }
        if (count == 0)
            return true;

        //if (passwordchange) {
        //    if (!RequiredFieldValidation('#txtPassword', 'Password is required.')) {
        //        count++;
        //        return false;
        //    }
        //    else {
        //        RemovePopover('#txtPassword');
        //    }
        //}
        //if ($('#txtPassword').val() != '') {
        //    if ($('#txtPassword').val().trim().length < 6) {
        //        PopoverFunction('#txtPassword', 'Password length should be of minimum 6 characters.');
        //        count++;
        //        return false;
        //    }
        //    else {
        //        RemovePopover('#txtPassword');
        //    }
        //    if (!RequiredFieldValidation('#txtConfirmPwd', 'Confirm Password is required.')) {
        //        count++;
        //        return false;
        //    }
        //    else if ($('#txtConfirmPwd').val().trim() != $('#txtPassword').val().trim()) {
        //        PopoverFunction('#txtConfirmPwd', 'Password & Confirm password should match.');
        //        count++;
        //        return false;
        //    }
        //    else {
        //        RemovePopover('#txtConfirmPwd');
        //    }
        //}
        //if ($('#ddlProfile option:selected').val() == '0') {
        //    PopoverFunction('#ddlProfile', 'Please select profile.');
        //    count++;
        //    return false;
        //}
        //else {
        //    RemovePopover('#ddlProfile');
        //}

        //if ($('#ddlRole option:selected').val() == '') {
        //    PopoverFunction('#ddlRole', 'Please select Role.');
        //    count++;
        //    return false;
        //}
        //else {
        //    RemovePopover('#ddlRole');
        //}
        //if (!RequiredFieldValidation('#txtendDate', 'End Date is required.')) {
        //    count++;
        //    return false;
        //}
        //else
        //    RemovePopover('#txtendDate');
        //if (!RequiredFieldValidation('#txtaddress2', 'Address is Required')) {
        //    count++;
        //    return false;
        //}
        //else {
        //    RemovePopover('#txtaddress2');
        //} 
    }

    validataionUE = function () {
        var count = 0;
        if (userID != '') {
            if (!uservalid) {
                PopoverFunction('#txtUsername', 'Already registered with this name.');
                count++;
                return false;
            }
            else
                RemovePopover('#txtUsername');
        }
        if (!emailvalid) {
            PopoverFunction('#txtEmailId', 'Already some one registered with this email.');
            count++;
            return false;
        }
        else
            RemovePopover('#txtEmailId');

        $('fieldset input[type="text"],fieldset input[type="password"]').each(function () {
            if ($(this).val() != '') {
                var valid = ISvalidString($(this));
                if (!valid) {
                    count++;
                    return valid;
                }
                else
                    count = 0;
            }
        });
        if (count == 0)
            return true;
        else
            return false;
    }
    usernamevalidation = function (txtname) {

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
    function validateEmail(sEmail) {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        if (filter.test(sEmail)) {
            return true;
        }
        else {
            return false;
        }
    }

    function GetUserDetails() {

        //var userID = $(this).parent().find($('input[type="hidden"]')).val();
        var userID = UserID;
        $("#CreateUser").show();
        $('#btnAddnew').hide();
        $('#btndelete').hide();
        $('#canclebutton').show();
        $.blockUI();
        $.ajax({
            url: rootUrl + 'Home/GetUserDetailsByUserID',
            type: 'GET',
            data: { 'userID': userID },
            traditional: true,
            content: "application/json; charset=utf-8",
            success: function (data) {
                if (data[0] != null) {
                    FillData(data);
                }
                $.unblockUI();
            },
            error: function (request, status, err) {
                ShowModel('Error occured! \n' + err, 'alert-error');
                $.unblockUI();
            }
        });
        $(".demo-section,#dv_Search").hide();
    }

    function FillData(data) {
        //$('#txtUsername').attr('disabled', 'disabled');
        $('#btnSignUp').text('Save');
        $('#chkAccept').iCheck('enable');
        $('#chkAccept').iCheck('check');
        $('#btnSignUp').removeClass('disabled');
        $('#txtUsername').val(data[0].UserName);
        $('#txtFirstName').val(data[0].FirstName);
        $('#txtLastName').val(data[0].LastName);
        $('#ddlProfile').val(data[0].Profile_ID);
        $('#txtPhone').val(data[0].Phone);
        $('#txtEmailId').val(data[0].EmailID);
        $('#hdProfileID').val(data[0].Profile_ID);
        $('#hdPasswordSalt').val(data[0].PasswordSalt);
        $('#hduserID1').val(data[0].UserID);
        $('#hdPasswordHash').val(data[0].PasswordHash);
        $('#txtPassword').val(data[0].PasswordHash.substr(0, 8));
        $('#txtConfirmPwd').val(data[0].PasswordHash.substr(0, 8));
        $('#hdEndDate').val(data[0].EndDate);
        $('#txtendDate').val(data[0].EndDate);
        $('#ddlRole').val(data[0].Role_ID);
        $('#hdEMailID').val(data[0].EmailID);
        if (data[0].Status.toLowerCase() == 'true') {
            $('#dv_ISActive a').addClass('btn-default2').removeClass('btn-hover').filter($('#dv_ISActive a:contains("Yes")')).addClass('btn-hover').removeClass('btn-default2');
            $('#hf_ISActive').val("1");
        }
        else {
            $('#dv_ISActive a').addClass('btn-default2').removeClass('btn-hover').filter($('#dv_ISActive a:contains("No")')).addClass('btn-hover').removeClass('btn-default2');
            $('#hf_ISActive').val("0");
        }
        if (data[0].IsDeleted == '1') {
            $('#dv_ISDeleted a').addClass('btn-default2').removeClass('btn-hover').filter($('#dv_ISDeleted a:contains("Yes")')).addClass('btn-hover').removeClass('btn-default2');
            $('#hf_ISDeleted').val("1");
        }
        else {
            $('#dv_ISDeleted a').addClass('btn-default2').removeClass('btn-hover').filter($('#dv_ISDeleted a:contains("No")')).addClass('btn-hover').removeClass('btn-default2');
            $('#hf_ISDeleted').val("0");
        }
        if (data[0].Address != '' && data[0].Address != null) {
            var addr = [];
            addr = data[0].Address.split(';');
            if (addr.length > 4) {
                $('#txtaddress1').val(addr[0]);
                $('#txtaddress2').val(addr[1]);
                $('#ddlState').val(addr[2]);
                $('#txtCity').val(addr[3]);
                $('#txtCountry').val(addr[4]);
            }
            else {
                $('#txtaddress1').val(data[0].Address);
            }
        }
    }
});
var cout = 0;