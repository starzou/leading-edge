/**
 *@class app2
 *@description
 *@time 2014-11-25 13:16
 *@author StarZou
 **/

var App = angular.module('App', []);

App.controller('AppCtrl', ['$scope', function ($scope) {
    $scope.title = 'Angular 实践2';
}]);