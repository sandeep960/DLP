$(document).ready(function () {
        
    $(document).ajaxStart(function () {

        $.blockUI();
    });
    $(document).ajaxComplete(function () {
        $.unblockUI();

    });
    $('#btnSubmit').click(function (evt) {

        evt.preventDefault();
       
        if (fn_validateFields()) {
            var oldpwd = $('#txtOldPassword').val();
            var newpwd = $('#txtNewPassword').val();
            var confirmpwd = $('#txtConfirmPassword').val();
                
          
            if (newpwd == confirmpwd)
            {
                RemovePopover('#txtConfirmPassword');
                $.ajax({
                    url: rootUrl + 'Home/UpdatePassword',
                    type: 'GET',
                    data: { "OldPassword": oldpwd, "NewPassword": newpwd, "UserName": username },
                    traditional: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data == true) {
                                
                            $('#txtOldPassword').val('');
                            $('#txtNewPassword').val('');
                            $('#txtConfirmPassword').val('');
                            ShowModel('Password Successfully Updated', 'alert-success');
                            setTimeout(function () { window.location.href = "../Home/Logout" },500);
                        }
                        else
                            ShowModel('Please enter correct password.','alert-error');
                    }
                });
            }
            else
            {
                PopoverFunction('#txtConfirmPassword', 'New password and confirm password must be same');
                return false;
            }

        }
        else
            return false;
    });

    fn_validateFields = function () {
        if (!RequiredFieldValidation('#txtEmailId', 'EmailId is required.'))
        {
            return false;
        }
        else if (!validateEmail($('#txtEmailId').val()))
        {
            return false;
        }
       else if (!IsEmailExist())
        {
            return false;
        }
       else if (!RequiredFieldValidation('#txtOldPassword', 'Old Password is required.'))
       {
           return false;
       }
       else if (!RequiredFieldValidation('#txtNewPassword', 'New Password is required.'))
       {
           return false;
       }
       else if ($('#txtNewPassword').val().trim().length < 6) {
           PopoverFunction('#txtNewPassword', 'Password length should be of minimum 6 characters.');
           return false;
       }  
       else if ($('#txtNewPassword').val().trim() != $('#txtConfirmPassword').val().trim()) {
            PopoverFunction('#txtConfirmPassword', 'Password & Confirm password should match.');
            return false;
        }
        else {
           RemovePopover('#txtConfirmPassword');
       }
        var count = 0;
        $('body input[type="text"],body input[type="password"]').each(function () {
            
            if ($(this).val() != '') {
                var valid = ISvalidString($(this));
                if (!valid) {
                    return valid;
                    count++;
                }
            }
            if (count > 0) { return false; } else { return true; }
        });
        return true;
    }

    //Checking Email availability
    $('#txtEmailId').change(function () {
        if (IsEmailExist())
            return false;
    });
    //$('#txtConfirmPassword').change(function () {
    //    if ($('#txtPassword').val() != $('#txtConfirmPassword').val()) {
    //        PopoverFunction('#txtConfirmPassword', 'Password and confirm password should match.');
    //        return false;
    //    }
    //    else { RemovePopover('#txtConfirmPwd'); }

    //});

    $('#txtConfirmPassword').keyup(function () {
        if ($('#txtNewPassword').val() != "") {
            RemovePopover('#txtNewPassword');
            if ($('#txtNewPassword').val() != $('#txtConfirmPassword').val()) {
                $('#confirmFaCheck').hide();
                PopoverFunction('#txtConfirmPassword', 'Password and confirm password should match.');
                return false;
            }
            else { $('#confirmFaCheck').show(); RemovePopover('#txtConfirmPassword'); }
        }
        else { PopoverFunction('#txtNewPassword', 'Please enter new password.'); }
    });

    IsEmailExist = function () {
        var count = 0;
        $.ajax({
            url: rootUrl + 'Home/CheckEmailAvailabity',
            type: 'GET',
            data: { 'email': $('#txtEmailId').val().trim() },
            traditional: true,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data == false) {
                    PopoverFunction('#txtEmailId', 'Please enter the registered emailid.');
                    count++;
                }
                else {
                    RemovePopover('#txtEmailId');
                    
                }

            }
        });
        if (count > 0) { return false; } else { return true; }
    }
    //End of checking Email availability

    $('#btnreset').click(function () {
        RemovePopover('#txtOldPassword');
        $('#txtOldPassword').val('');
        RemovePopover('#txtNewPassword');
        $('#txtNewPassword').val('');
        RemovePopover('#txtConfirmPassword');
        $('#txtConfirmPassword').val('');
    });
    $('#txtOldPassword').change(function () {
        RemovePopover('#txtOldPassword');
    });
    //$('#txtNewPassword').change(function () {
    //    RemovePopover('#txtNewPassword');
    //});
    //$('#txtConfirmPassword').change(function () {
    //    RemovePopover('#txtConfirmPassword');
    //});

    function validateEmail(sEmail) {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        if (filter.test(sEmail)) {
            return true;
        }
        else {
            return false;
        }
    }

    $('#btnChangePwd').click(function (evt) {

        evt.preventDefault();

        if (fn_validateFields()) {
            var oldpwd = $('#txtOldPassword').val();
            var newpwd = $('#txtNewPassword').val();
            var confirmpwd = $('#txtConfirmPassword').val();


            if (newpwd == confirmpwd) {
                RemovePopover('#txtConfirmPassword');
                $.ajax({
                    url: rootUrl + 'Home/UpdatePassword',
                    type: 'GET',
                    data: { "OldPassword": oldpwd, "NewPassword": newpwd, "UserName": username },
                    traditional: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data == true) {

                            $('#txtOldPassword').val('');
                            $('#txtNewPassword').val('');
                            $('#txtConfirmPassword').val('');
                            window.location.href = "../Home/Login";
                        }
                        else
                            ShowModel('Please enter correct password.', 'alert-error');
                    }
                });
            }
            else {
                PopoverFunction('#txtConfirmPassword', 'New password and confirm password must be same');
                return false;
            }

        }
        else
            return false;
    });
});