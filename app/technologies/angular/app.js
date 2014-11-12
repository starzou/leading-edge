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

/**
 * 定义模块
 */
var App = angular.module('App', []);

/**
 * 注册controller
 */
App.controller('appCtrl', ['$scope' , '$filter', function ($scope, $filter) {

    $scope.word = 'hello ';

    $scope.date = new Date();

    /**
     * 使用$filter 服务
     */
    $scope.name = $filter('lowercase')('StarZou');

    $scope.users = [
        {id: 1, name: 'star1'},
        {id: 2, name: 'star2'},
        {id: 3, name: 'star3'}
    ];

    $scope.addUser = function (name) {
        $scope.users.push({id: Date.now(), name: name});
        $scope.name = undefined;
    };

    $scope.removeUser = function (index) {
        $scope.users.splice(index, 1);
    };
}]);

/**
 * 注册自定义过滤器
 */
App.filter('capitalize', function () {
    return function (input) {
        if (input) {
            return input[0].toUpperCase() + input.slice(1);
        }
    };
});