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
var App = angular.module('App', ['ngRoute']);

/**
 * App.config
 */
App.config(['$routeProvider', function ($routeProvider) {

    /**
     * 路由服务配置
     */
    $routeProvider
        .when('/users', {templateUrl: 'users.html', controller: 'AppCtrl'})
        .when('/users/:name', {templateUrl: 'users.html', controller: 'AppCtrl'})
        .when('/hi', {templateUrl: 'hiTemplate.html', controller: 'AppCtrl'})
        .otherwise({redirectTo: '/users'});

    console.log('App.config');
}]);

/**
 * App.run
 */
App.run(['$rootScope', '$interval', function ($rootScope, $interval) {
    $rootScope.app = {
        name: 'Angular Tutorial',
        version: '1.0.0 alpha',
        date: new Date()
    };

    $interval(function () {
        $rootScope.app.date = new Date();
    }, 100, 20);

    /**
     * 监听路由服务改变, 例:可以统计用户打开页面的情况
     */
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        console.log('$routeChangeStart : ', arguments);
    });

    console.log('App.run');
}]);

/**
 * 注册controller
 */
App.controller('AppCtrl', ['$scope', '$filter', '$location', '$route', '$routeParams', function ($scope, $filter, $location, $route, $routeParams) {
    var users = $scope.users || [
            {id: 1, name: 'star1'},
            {id: 2, name: 'star2'},
            {id: 3, name: 'star3'}
        ];

    $scope.word = 'hello ';

    $scope.date = new Date();

    $scope.title = 'Hi Guys!';

    /**
     * 使用$filter 服务
     */
    $scope.name = $filter('lowercase')('StarZou');


    if (Object.keys($routeParams).length) {
        $scope.users = $filter('filter')(users, $routeParams);
    } else {
        $scope.users = users;
    }

    $scope.addUser = function (name) {
        $scope.users.push({id: Date.now(), name: name});
        $scope.name = undefined;
    };

    $scope.removeUser = function (index) {
        $scope.users.splice(index, 1);
    };

    $scope.routeTo = function (path) {
        $location.path(path);
    };

    console.log($location, $route);
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
        link: function (scope, element, attrs, ngModel) {
            var form = scope[attrs.name];
            console.log('validateForm', arguments, form);
        }
    };
});

App.directive('validateField', function () {
    var VALIDATE = {
        required: '必填！',
        number: "必须为数字！",
        minlength: '太短！',
        maxlength: '太长！',
        min: '太小！',
        max: '太大！',
        more: '太多！',
        email: 'Email无效！',
        username: '有效字符为汉字、字母、数字、下划线，以汉字或小写字母开头！',
        minname: '长度应大于5字节，一个汉字3字节！',
        maxname: '长度应小于15字节，一个汉字3字节！',
        repasswd: '密码不一致！',
        url: 'URL无效！',
        tag: '标签错误，不能包含“,”、“，”和“、”'
    };
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
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
App.controller('InternalDirectiveController', ['$scope', '$timeout', function ($scope, $timeout) {
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
        replace: true,
        scope: {
            title: '=',
            text: '@'
        },
        template: '<div><h3 title="{{title}}">{{text}}</h3><label>title:</label><input type="text" ng-model="title" /></div>'
    };
}]);

App.directive('one', [function () {
    return {
        restrict: 'A',
        replace: true,
        priority: -1,
        template: '<div ng-bind="$id"></div>'
    };
}]);

App.directive('two', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope: true,
        terminal: true,
        template: '<div ng-bind="$id"></div>'
    };
}]);

App.directive('userList', [function () {
    return {
        scope: {
            users: '=',
            remove: '&'
        },
        templateUrl: 'users.html',
        link: function (scope, element, attrs) {
            console.log(arguments);
            element.on('mouseover', function () {
                element.css('backgroundColor', 'green');
            });
            element.on('mouseout', function () {
                element.css('backgroundColor', 'white');
            });
        }
    };
}]);

/**
 * Service 使用案例
 */

App.controller('ServiceController', ['$scope', 'AppService', 'GitHubService', function ($scope, AppService, GitHubService) {
    console.log('AppService : ', AppService);
    console.log('GitHubService : ', GitHubService);

    $scope.userName = 'starzou';
    $scope.queryEvents = function (userName) {
        GitHubService.events(userName).success(function (response) {
            $scope.events = response.data;
        });
    };
}]);

App.factory('AppService', [function () {
    var version = {
        full: "1.0.0",
        major: 1,
        dot: 0,
        minor: 0
    };
    return {
        version: version,
        date: Date.now()
    };
}]);

App.factory('GitHubService', ['$http', function ($http) {
    var Resources = {
        events: {
            url: 'https://api.github.com/users/:user/events?callback=JSON_CALLBACK',
            method: function (userName) {
                return $http({method: 'JSONP', url: this.url.replace(':user', userName)});
            }
        },
        repos: {
            url: 'https://api.github.com/users/:user/repos?callback=JSON_CALLBACK',
            method: function (userName) {
                return $http({method: 'JSONP', url: this.url.replace(':user', userName)});
            }
        }
    };

    return {
        events: function (userName) {
            return Resources.events.method(userName);
        },

        repos: function (userName) {
            return Resources.repos.method(userName);
        }
    };
}]);