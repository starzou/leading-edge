/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * @class index
 * @description
 * @time 2014-11-22 13:10
 * @author StarZou
 **/

var mysql = require('mysql');

var options = {user: 'root', password: 'admin123', database: 'test'};

var connection = mysql.createConnection(options);

connection.connect();

connection.query('select * from person', function (err, rows, fields) {
    console.log(fields);
});

connection.end();
