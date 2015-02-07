/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

var obj = {};
Object.defineProperty(obj, 'name', {
    set: function (value) {
        this.newName = value;
    }
});

obj.name = 123;
console.log(obj.newName);