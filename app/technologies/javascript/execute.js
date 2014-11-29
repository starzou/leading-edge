/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * @class execute
 * @description
 * @time 2014-11-28 21:31
 * @author StarZou
 **/
'use strict';

var name = 'window';

function a() {
    var name = 'a';
    b(name);

    this['<return>'] = {name: name};

    return b();
}

function b(n) {
    var name = 'b';
    console.log(arguments);
    return c.apply({x: 13});
}

function c() {
    var name = 'c', now = Date.now();
    console.log(name, now);

    function otherInC() {
        var name = 'otherInC';

        function inC2() {
            console.log(name, now);
        }

        inC2();

        console.log(name, this, this.x);
    }

    otherInC.apply(this);

    return function childC() {
        console.log(name, this);
    };
}

var obj = new a();
console.log(obj);
obj();

//(function t() {
//    setTimeout(function createA() {
//        new a();
//    }, 2000);
//})();

// (function t2() {
//    setTimeout(function createA() {
//        new a();
//    }, 1980);
//})();

var clickButton = document.getElementById('clickButton');

clickButton.addEventListener('click', function () {
    console.log(arguments);
});

clickButton.onclick = function () {
    console.log(arguments);
};

