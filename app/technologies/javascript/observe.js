/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * @class observe
 * @description
 * @time 2014-11-29 13:43
 * @author StarZou
 **/

(function (window, document) {
    'use strict';

    var clickButton = document.getElementById('clickButton'),
        obj = {},
        i = 0;

    Object.observe(obj, function (changes) {
        console.log(changes, obj);
    });

    clickButton.addEventListener('click', function () {
        obj.name = 'StarZou';
        obj.index = ++i;
    });
})(window, document);