/**
 *@class app2
 *@description
 *@time 2014-11-25 13:16
 *@author StarZou
 **/

var App = angular.module('App', ['ngDragDrop']);

App.run(['$rootScope', function ($rootScope) {
    $rootScope.title = 'Angular 拖动';
}]);

App.controller('AppCtrl', ['$scope', function ($scope) {

}]);