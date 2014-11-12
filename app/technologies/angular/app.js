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
App.controller('appCtrl', ['$scope' , '$filter', function ($scope, $filter) {

    $scope.word = 'Hello ';

    $scope.date = new Date();

    /**
     * 使用$filter 服务
     */
    $scope.name = $filter('lowercase')('StarZou');

    $scope.users = [
        {id: 1, name: 'star1'},
        {id: 2, name: 'star2'},
        {id: 3, name: 'star3'},
    ];

    $scope.addUser = function (name) {
        $scope.users.push({id: Date.now(), name: name});
    }
}]);