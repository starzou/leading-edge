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

function a() {
    var name = 'a';
    b(name);

    this['<return>'] = {name: name};
}

function b(n) {
    var name = 'b';
    console.log(arguments);
    c();
}

function c() {
    var name = 'c';
    console.log(Date.now());
}

var obj = new a();
console.log(obj);


(function t() {
    setTimeout(function createA() {
        new a();
    }, 2000);
})();

(function t2() {
    setTimeout(function createA() {
        new a();
    }, 1980);
})();