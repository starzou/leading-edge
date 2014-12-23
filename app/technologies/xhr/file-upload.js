/**
 * @class file-upload
 * @description 文件上传示例
 * @time 2014-12-23 11:14
 * @author StarZou
 **/

var previewDiv = document.getElementById('previewDiv');

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

        createPreviewElement(file, previewDiv);

        console.log(file);
    }
}

function createPreviewElement(file, container) {
    var img = document.createElement("img"),
        reader = new FileReader();

    img.style.width = '60px';
    img.style.height = '60px';

    img.file = file;
    container.appendChild(img);

    reader.onload = (function (aImg) {
        return function (e) {
            aImg.src = e.target.result;
        };
    })(img);
    reader.readAsDataURL(file);
}