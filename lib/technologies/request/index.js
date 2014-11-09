/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 *@class index
 *@description
 *@time 2014-11-09 14:09
 *@author StarZou
 **/
'use strict';


var request = require('request');
request('http://www.baidu.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});