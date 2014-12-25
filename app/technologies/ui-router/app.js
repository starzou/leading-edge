/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * @class app
 * @description
 * @time 2014-12-14 20:24
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var App = angular.module('app', ['ui.router']);

    App.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url       : '/home/:name',
                template  : '<h1>home</h1>',
                controller: 'HomeController'
            })
            .state('page1', {
                url     : '/page1',
                template: '<h1>page1</h1>'
            })
            .state('page1.list', {
                url     : '/list',
                template: '<h1>page1-list</h1>'
            })
            .state('page2', {
                url     : '/page2',
                template: '<h1>page2</h1>'
            })
            .state('page3', {
                url        : '/page3',
                templateUrl: 'page3.html',
                resolve    : {
                    user : function () {
                        return {name: 'StarZou'};
                    },
                    users: ['$http', function ($http) {
                        return $http.get('/rest/users');
                    }]
                },
                controller : ['$scope', 'user', 'users', function ($scope, user, users) {
                    $scope.title = 'page3';
                    console.log($scope, user);
                    console.log(users);
                }]
            });
    }]);

    App.run(['$rootScope', function ($rootScope) {
        $rootScope.title = 'ui-router 示例';
    }]);

    App.controller('AppController', ['$scope', function ($scope) {
        console.log('AppController', $scope);
    }]);

    App.controller('HomeController', ['$scope', '$stateParams', function ($scope, $stateParams) {
        console.log('HomeController', $stateParams);
    }]);

})(window, document);