$(document).ready(function () {
    $(document).ajaxStart(function () {

        $.blockUI();
    });
    $(document).ajaxComplete(function () {
        $.unblockUI();

    });
    $('#btnSubmit').click(function (evt) {
        $('#diverrorMsg').hide();
        $('#diverrorMsg').html('');
        evt.preventDefault();
        var emailstatus = EmailValidation('#txtemail', 'Please enter registered Email Id.')
        if (emailstatus) {
            var Email = $('#txtemail').val();

            $.ajax({
                url: rootUrl + 'Home/ResetPassword',
                type: 'GET',
                data: { "Email": Email },
                traditional: true,
                contentType: "application/json; charset=utf-8",
                success: function (data) {                    
                    if (data == true) {
                       
                        $('#txtemail').val('');
                        ShowModel('Password has been successfully sent to your Email ID.', 'alert-success');
                    }
                    else {
                        //$('#diverrorMsg').html('<i class="fa fa-exclamation-circle"></i> Email ID Is Not Registered.', 'alert-error');
                        //$('#diverrorMsg').show();
                        ShowModel('Email ID is Not Registered.', 'alert-error');
                    }

                }
            });
        }
        else
            return false;
    });
    $('#txtemail').change(function () {
        RemovePopover('#txtemail');
    });

});