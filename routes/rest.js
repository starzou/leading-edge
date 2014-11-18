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

/**
 * hello
 */
router.get('/', function (req, res) {
    res.send({title: 'hello, guys! This is REST Resource'});
});


module.exports = router;
