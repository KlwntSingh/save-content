var URLS = {
    CONTENT_SAVE : '/text',
    FILE_SAVE : '/file'
}
function initialize(){
    fileDragDropFn();
    $('#submitBtn').click(function(event){
        getDataFromForm()
        saveContent(getDataFromForm(), function(res){
            $.toaster(res);
            $('#myForm')[0].reset();
        }).done(function(){
            // alert('done');
        }).fail(function(e, res){
            $.toaster(e.responseText, '','danger');
        });
    })
}

function getDataFromForm(){
    return getJsonObjFromArray($('#myForm').serializeArray());
}

function getJsonObjFromArray(arr){
    let json = {};
    $.map(arr, (item) => json[item.name] = item.value);

    return json;
}

function saveContent(data, cb){
    return $.post(URLS.CONTENT_SAVE, data, cb)
}

function saveFile(files, cb, cb2){
    var formData = new FormData();
    $.each(files, function(index, file){
        console.log(file);
        formData.append('file[]', file);
    })
    console.log(formData);
    return $.ajax({
        type : 'POST',
        url : URLS.FILE_SAVE,
        data :  formData,
        success :  cb,
        error : cb2,
        processData: false, 
        contentType: false
    })
}

function fileDragDropFn(){
    // $.event.props.push('dataTransfer');
    $('#myForm').on({
        'dragover dragenter': function(e) {
            $("body").addClass('file-on-box');
            e.preventDefault();
            e.stopPropagation();
        },
        'drop': function(e) {
            $("body").removeClass('file-on-box');
            e.preventDefault();
            // e.stopPropagation()
            console.log(e);
            console.log(e.originalEvent.dataTransfer.files);
            var file = e.originalEvent.dataTransfer.files;
            saveFile(file, function(e){
                $.toaster(e);
            }, function(e){
                $.toaster(e.responseText, '','danger');
            });
          //our code will go here
        },
        'dragleave': function(e){
            $("body").removeClass('file-on-box');
            e.preventDefault();
        }
    });
}

jQuery(document).ready(function($) {
    initialize($);
});