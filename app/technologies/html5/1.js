/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * @class 1
 * @description
 * @time 2015-01-18 15:24
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    //Notification.requestPermission(function (status) {
    //    var notification = new Notification("通知", {body: "你的好基友 kk 已上线!"});
    //
    //    notification.onclick = function () {
    //        console.log('click...');
    //    };
    //
    //    notification.onclose = function () {
    //        console.log('close...');
    //    };
    //
    //    notification.onshow = function () {
    //        console.log('show...');
    //    };
    //
    //    setTimeout(function () {
    //        notification.close();
    //    }, 3000);
    //
    //    console.log(status);
    //    console.log(notification);
    //});


    var body = document.body;

    var webGLCanvas = document.getElementById('webGLCanvas');
    var glCtx = webGLCanvas.getContext('webgl');
    console.log(glCtx);

    var d2Canvas = document.getElementById('d2Canvas');
    var d2Ctx = d2Canvas.getContext('2d');
    console.log(d2Ctx);

    /**
     * 绘矩形
     */
    var doRectBtn = document.getElementById('doRectBtn');
    doRectBtn.onclick = function () {
        d2Ctx.fillStyle = 'green';
        d2Ctx.fillRect(20, 20, 100, 100);
    };


})(window, document);