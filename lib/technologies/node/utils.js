/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

var objectToString = Object.prototype.toString;

var types = {
    obj: '[object Object]',
    arr: '[object Array]',
    fun: '[object Function]'
};

function toString(obj, name) {
    var type = objectToString.call(obj);
    if (type === types.obj) {
        var propertyName;
        for (propertyName in obj) {
            if (obj.hasOwnProperty(propertyName)) {
                toString(obj[propertyName], propertyName)
            }
        }
    } else if (type === types.arr) {
        var index, length = obj.length;
        for (index = 0; index < length; index++) {
            toString(obj[index]);
        }
    }
    else if (type === types.fun) {
        console.log(name || obj.name, ':', obj());
    } else {
        console.log(name || '', ':', obj);
    }
}

exports.toString = toString;