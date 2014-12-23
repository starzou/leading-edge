/**
 * @class file-upload
 * @description 文件上传示例
 * @time 2014-12-23 11:14
 * @author StarZou
 **/

var previewContainer = document.getElementById('previewContainer');

function handleFiles(files) {
    var file,
        index,
        length = files.length,
        maxSize = 5 * 1024 * 1024,
        filter = /image.*/;

    if (length === 0) {
        return null;
    }

    for (index = 0; index < length; index++) {
        file = files[index];

        if (!file.type.match(filter)) {
            continue;
        }

        if (file.size > maxSize) {
            continue;
        }

        createImgPreviewElement(file, previewContainer);

        //createCanvasPreviewElement(file, previewContainer);
        console.log(file);
    }
}

function createImgPreviewElement(file, container) {
    var img = document.createElement("img"),
        reader = new FileReader();

    img.style.width = '60px';
    img.style.height = '60px';

    img.file = file;

    reader.onload = function (e) {
        img.src = e.target.result;
        container.appendChild(img);
    };
    reader.readAsDataURL(file);
}

function createCanvasPreviewElement(file, container) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = 100;
    canvas.height = 100;
    container.appendChild(canvas);

    var img = new Image();
    img.width = 60;
    img.height = 60;
    img.src = URL.createObjectURL(file);
    img.onload = function () {
        ctx.drawImage(img, 20, 20);
    }
}