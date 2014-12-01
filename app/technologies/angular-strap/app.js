/**
 *@class app
 *@description
 *@time 2014-12-01 16:24
 *@author StarZou
 **/

(function (window, document, undefined) {
    'use strict';

    var App = angular.module('App', ['mgcrea.ngStrap']);

    App.controller('AppCtrl', ['$scope', function ($scope) {
        $scope.title = 'angular-strap 研究';

    }]);

})(window, document);