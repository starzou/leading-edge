/**
 *@class app2
 *@description
 *@time 2014-11-25 13:16
 *@author StarZou
 **/

var App = angular.module('App', []);

App.controller('AppCtrl', ['$scope', function ($scope) {
    $scope.title = 'Angular 实践2';

    $scope.words = 'hello world!';
}]);

App.directive('sayHello', [function () {
    return {
        restrict: 'A',
        replace : true,
        scope   : true,
        template: '<div><h1 ng-bind="word"></h1></div>',
        link    : function postLink(scope, element, attrs) {
            scope.word = scope.$eval(attrs.sayHello);
//            console.log(arguments);
        }
    };
}]);

//var showButton = document.getElementById('showButton');
//showButton.addEventListener('click', function () {
//    console.log(arguments);
//});

function a() {
    var name = 'a';
    b(name);

    this['<return>'] = {name: name};
}

function b() {
    var name = 'b';
    console.log(arguments);
    c();
}

function c() {
    var name = 'c';
    console.log(Date.now());
}

var obj = new a();
console.log(obj);