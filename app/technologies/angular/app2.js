/**
 *@class app2
 *@description
 *@time 2014-11-25 13:16
 *@author StarZou
 **/

var App = angular.module('App', ['ngAnimate']);

App.run(['$rootScope', function ($rootScope) {
    $rootScope.title = 'Angular 实践2';
    $rootScope.words = 'hello world!';
}]);

App.controller('AppCtrl', ['$scope', function ($scope) {
    /**
     * 监听作用域事件
     */
    $scope.$on('eventTriggered', function (event) {
        console.log('AppCtrl', event);
    });
}]);

App.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.$on('eventTriggered', function (event) {
        console.log('MainCtrl', event);
    });

    /**
     * 向上传播
     */
    $scope.emit = function () {
        $scope.$emit('eventTriggered', {date: Date.now()});
    };

    /**
     * 向下传播
     */
    $scope.broadcast = function () {
        $scope.$parent.$broadcast('eventTriggered', {date: Date.now()});
    };
}]);

App.controller('AnimateCtrl', ['$scope', '$animate', function ($scope, $animate) {

}]);

App.directive('sayHello', [function () {
    return {
        restrict: 'A',
        replace : true,
        scope   : true,
        template: '<div><h1 ng-bind="word"></h1></div>',
        link    : function postLink(scope, element, attrs) {
            scope.word = scope.$eval(attrs.sayHello);
        }
    };
}]);