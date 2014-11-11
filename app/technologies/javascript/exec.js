/**
 *@class exec
 *@description
 *@time 2014-11-11 15:29
 *@author StarZou
 **/



function log(str) {
    console.log('Date : %s , args : %s', Date.now(), str);

}

function _log(str) {
    return function () {
        log(str);
    };
}

function myFor(start, end, callback) {
    for (var i = start; i < end; i++) {
        callback(i);
    }
}

log(1);

setTimeout((function (str) {
    return  function () {
        log(str);
    };
})(2), 0);

myFor(3, 10, log);

setTimeout(_log(11), 0);