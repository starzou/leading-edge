/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * @class 1
 * @description
 * @time 2015-01-30 20:21
 * @author StarZou
 **/
(function (window, document) {
    'use strict';
    var title = 'jquery 研究...';
    console.log(title);

    var h1 = $('h1');
    h1.html(new Date());
    console.log(h1.offset());
    console.log(h1.position());


    var title = document.getElementById('title');
    console.log(title.getBoundingClientRect());
})(window, document);