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
var App = angular.module('App', []).run(['$rootScope', '$interval', function ($rootScope, $interval) {
    $rootScope.app = {
        name   : 'Angular Tutorial',
        version: '1.0.0 alpha',
        date   : new Date()
    };

    $interval(function () {
        $rootScope.app.date = new Date();
    }, 100, 20);
}]);

/**
 * 注册controller
 */
App.controller('appCtrl', ['$scope', '$filter', function ($scope, $filter) {

    $scope.word = 'hello ';

    $scope.date = new Date();

    $scope.title = 'Hi Guys!';

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

App.directive('validateForm', function () {
    return {
        require: '?ngModel',
        link   : function (scope, element, attrs, ngModel) {
            var form = scope[attrs.name];
            console.log('validateForm', arguments, form);
        }
    };
});

App.directive('validateField', function () {
    var VALIDATE = {
        required : '必填！',
        number   : "必须为数字！",
        minlength: '太短！',
        maxlength: '太长！',
        min      : '太小！',
        max      : '太大！',
        more     : '太多！',
        email    : 'Email无效！',
        username : '有效字符为汉字、字母、数字、下划线，以汉字或小写字母开头！',
        minname  : '长度应大于5字节，一个汉字3字节！',
        maxname  : '长度应小于15字节，一个汉字3字节！',
        repasswd : '密码不一致！',
        url      : 'URL无效！',
        tag      : '标签错误，不能包含“,”、“，”和“、”'
    };
    return {
        require: '?ngModel',
        link   : function (scope, element, attrs, ngModel) {
            console.log('validateField', arguments);

            var validateFn = function () {
                angular.forEach(ngModel.$error, function (value, key) {
                    console.log(VALIDATE[key]);
                });
            };

            /**
             * ngModel 值改变,进行验证
             */
//            scope.$watch(attrs.ngModel, validateFn);

            element.bind('keyup', validateFn);
        }
    };
});

/**
 * 内部指令 测试控制器
 */
App.controller('internalDirectiveController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.appUrl = 'app.js';

    $scope.tplUrl = 'hiTemplate.html';

    $scope.loadImage = function () {
        $timeout(function () {
            $scope.imgUrl = '/images/1.jpg';
            console.log($scope);
            $scope.app.date = '加载完成';
        }, 2000);
    };
}]);

App.directive('sayHello', [function () {
    return {
        restrict: 'A',
        replace : true,
        scope   : {
            title: '=',
            text : '@'
        },
        template: '<div><h3 title="{{title}}">{{text}}</h3><label>title:</label><input type="text" ng-model="title" /></div>'
    };
}]);

App.directive('one', [function () {
    return {
        restrict: 'A',
        replace : true,
        priority: -1,
        template: '<div ng-bind="$id"></div>'
    };
}]);

App.directive('two', [function () {
    return {
        restrict: 'A',
        replace : true,
        scope   : true,
        terminal: true,
        template: '<div ng-bind="$id"></div>'
    };
}]);