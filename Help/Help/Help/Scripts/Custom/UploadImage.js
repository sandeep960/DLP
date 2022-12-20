
$(document).ready(function () {


    // disable the upload button by default
    //$('button').hide();
      
      
    //Get the preview image and set the onload event handler
    var preview = $('#preview').load(function () {
           
        setPreview();
        ias.setOptions({
            x1: 0,
            y1: 0,
            x2: $(this).width(),
            y2: $(this).height(),
            show: true
        });
    });

    //Set the 4 coordinates for the cropping
    var setPreview = function (x, y, w, h) {
        $('#X').val(x || 0);
        $('#Y').val(y || 0);
        $('#Width').val(w || preview[0].naturalWidth);
        $('#Height').val(h || preview[0].naturalHeight);
    };

    //Initialize the image area select plugin
    var ias = preview.imgAreaSelect({
        handles: true,
        instance: true,
        parent: 'body',
        onSelectEnd: function (s, e) {
               
            var scale = preview[0].naturalWidth / preview.width();
            var _f = Math.floor;
            setPreview(_f(scale * e.x1), _f(scale * e.y1), _f(scale * e.width), _f(scale * e.height));
        }
    });



    //Initial state of X, Y, Width and Height is 0 0 1 1
    setPreview(0, 0, 1, 1);



    //What happens if the File changes?
    $('#File').change(function (evt) {
          
        //if (evt.target.files === undefined)
        return filePreview();

        var f = evt.target.files[0];
        var reader = new FileReader();

        if (!f.type.match('image.*')) {
            alert("The selected file does not appear to be an image.");
            return;
        }

        //setBox('#IsFile');
        reader.onload = function (e) { preview.attr('src', e.target.result); };
        reader.readAsDataURL(f);
    });

    //frilePreview

    var filePreview = function () {
        window.callback = function () { };
        $('body').append('<iframe id="preview-iframe" onload="callback();" name="preview-iframe" style="display:none" />');
        var action = $('form').attr('target', 'preview-iframe').attr('action');
        $('form').attr('action', rootUrl + 'Home/PreviewImage');
        window.callback = function () {
               
            //setBox('#IsFile');
            var result = $('#preview-iframe').contents().find('img').attr('src');
            preview.attr('src', result);
            $('#preview-iframe').remove();
            $('button').show();
        };
        $('form').submit().attr('action', action).attr('target', '');
    };
       
    //$('form').submit(function () {
    //    $('button').attr('disabled', true).text('Please wait ...');
    //});
});
    

