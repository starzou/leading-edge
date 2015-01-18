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

    Notification.requestPermission(function (status) {
        var notification = new Notification("通知", {body: "你的好基友 kk 已上线!"});

        notification.onclick = function () {
            console.log('click...');
        };

        notification.onclose = function () {
            console.log('close...');
        };

        notification.onshow = function () {
            console.log('show...');
        };

        console.log(status);
        console.log(notification);
    });

})(window, document);