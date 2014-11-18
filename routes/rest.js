/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * REST 服务
 * @type {*|exports}
 */

var express = require('express');
var router = express.Router();
var data = [{name: 'abc', age: 22}, {name: 'star', age: 21}];

var query, obj, tempData;

/**
 * hello
 */
router.get('/', function (req, res) {
    res.send({title: 'hello, guys! This is REST Resource'});
});

/**
 * get users
 */
router.get('/users', function (req, res) {
    query = req.query;
    if (Object.keys(query).length) {
        tempData = [];
        /**
         * 模拟模糊查询
         */
        for (var i = 0; i < data.length; i++) {
            obj = data[i];
            if (obj.name.indexOf(query.name) > -1) {
                tempData.push(obj);
            }
        }
        res.send(tempData);
    } else {
        res.send(data);
    }
});

/**
 * post users
 */
router.post('/users', function (req, res) {
    data.push(req.body);
    res.send(data);
});

module.exports = router;
