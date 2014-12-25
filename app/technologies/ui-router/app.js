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
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {url: '/', template: '<h1>home</h1>'})
            .state('page1', {url: '/page1', template: '<h1>page1</h1>'})
            .state('page1.list', {url: '/list', template: '<h1>page1-list</h1>'})
            .state('page2', {url: '/page2', template: '<h1>page2</h1>'})
            .state('page3', {url: '/page3', templateUrl: 'page3.html'});
    }]);

    App.run(['$rootScope', function ($rootScope) {
        $rootScope.title = 'ui-router 示例';
    }]);

    App.controller('AppController', ['$scope', function ($scope) {
        console.log($scope);
    }]);

    App.controller('Page3Controller', ['$scope', function ($scope) {
        $scope.title = 'this is page3';
    }]);
})(window, document);