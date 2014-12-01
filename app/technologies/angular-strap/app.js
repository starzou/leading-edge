/**
 *@class app
 *@description
 *@time 2014-12-01 16:24
 *@author StarZou
 **/

(function (window, document, undefined) {
    'use strict';

    var App = angular.module('App', ['mgcrea.ngStrap']);

    App.run(['$rootScope', function ($rootScope) {
        $rootScope.title = 'angular-strap 研究';
    }]);

    App.controller('AppCtrl', ['$scope', '$modal', function ($scope, $modal) {

        var model = $modal({title: 'hello', content: 'Hello angular-strap!', show: false});

        $scope.showModal = function () {
            model.$promise.then(model.show);
        };

    }]);

})(window, document);