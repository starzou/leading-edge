/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 *@class app
 *@description
 *@time 2014-11-04 22:45
 *@author StarZou
 **/
'use strict';

// 定义模块
var App = angular.module('App', []);

// 在模块上 注册controller
App.controller('appCtrl', ['$scope', function ($scope) {
    $scope.word = 'Hello Angular!';
}]);