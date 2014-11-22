/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * @class Random
 * @description
 * @time 2014-11-21 21:08
 * @author StarZou
 **/
'use strict';

var ma = {}, sortMa = {}, count = 100000000, index, number, property;

for (index = 0; index < count; index++) {
    number = Math.floor(Math.random() * 49 + 1);
    if (ma[number]) {
        ma[number] += 1;
    } else {
        ma[number] = 1;
    }
}

for (property in ma) {
    if (ma.hasOwnProperty(property)) {
        sortMa[ma[property]] = property;
    }
}
console.log(sortMa);
