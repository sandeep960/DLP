$(document).ready(function () {
    localStorage.clear();
    $(document).ajaxStart(function () {

        $.blockUI({ message: '<img src="' + imgPath + '/Images/loading.gif" alt="pleasewait"/>' });
    });
    $(document).unbind().bind('click touch', function (event) {
        $('#dv_Error').html('');
        $('#dv_Error').hide();
    });
    $('#btnBigLogin').bind("click",function (evt) {
       
        evt.preventDefault();
        var UserName = $('#txtusername').val();
        var Password = $('#txtPassword').val();
        $('#dv_Error').html('');
        $('#dv_Error').hide();
      
        var KeepMeLogin;
        if ($('#chkKeepmelogin').attr('checked'))
            KeepMeLogin = true;
        else
            KeepMeLogin = false;
        if (UserName == "") {
            PopoverFunction('#txtusername', 'User Name is Required.');
            return false;
        }
        
        else if (!ISvalidString($("#txtusername"))) {
            return false;
        }
        else {
            if (Password == "") {
                PopoverFunction('#txtPassword', 'Password is Required.');
                return false;
            }
            else if (!ISvalidString($("#txtPassword"))) {
                return false;
            }
            else {
                $.blockUI({ message: '<img src="' + imgPath + '/Images/loading.gif" alt="pleasewait"/>' });
                $('#diverrorMsg').hide();
                $('#diverrorMsg').html('');
                $('#loginform').submit();
                return true;
            }
        }
    });
    $('#txtusername').change(function () {
        RemovePopover('#txtusername');
    });
    $('#txtPassword').change(function () {
        RemovePopover('#txtPassword');
    });

    $('#btnsmallLogin').click(function (evt) {

        evt.preventDefault();
        var UserName = $('#txtsmallUserName').val();
        var Password = $('#txtsmallPassword').val();
        $('#dv_Error').html('');
        $('#dv_Error').hide();
        var KeepMeLogin;
        if ($('#chkKeepmelogin').attr('checked'))
            KeepMeLogin = true;
        else
            KeepMeLogin = false;
        if (UserName == "") {
            PopoverFunction('#txtsmallUserName', 'User Name is Required.');
            return false;
        }

        else if (!ISvalidString($("#txtsmallUserName"))) {
            return false;
        }
        else {
            if (Password == "") {
                PopoverFunction('#txtsmallPassword', 'Password is Required.');
                return false;
            }
            else if (!ISvalidString($("#txtsmallPassword"))) {
                return false;
            }
            else {               
                $.blockUI({ message: '<img src="' + imgPath + '/Images/loading.gif" alt="pleasewait"/>' });
                $('#diverrorMsg').hide();
                $('#diverrorMsg').html('');
                $('#loginform1').submit();
                return true;
            }
        }
    });
    $('#txtsmallUserName').change(function () {
        RemovePopover('#txtsmallUserName');
    });
    $('#txtsmallPassword').change(function () {
        RemovePopover('#txtsmallPassword');
    });

    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $(':submit').click();
        }
    });
});