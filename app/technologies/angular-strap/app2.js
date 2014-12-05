/**
 * @class app2
 * @description
 * @time 2014-12-05 10:14
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var App = angular.module('App', ['ngAnimate', 'mgcrea.ngStrap']);

    App.config(['$datepickerProvider', function ($datepickerProvider) {
        console.log($datepickerProvider);

        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'yyyy-MM-dd',
            animation : 'am-fade-and-slide-top',
            startWeek : 1,
            maxDate   : Date.now()
        });
    }]);

    App.run(['$rootScope', function ($rootScope) {
        $rootScope.title = 'angular-strap 研究2';
    }]);

    App.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.submit = function () {
            $http.post('/rest/users', $scope.user).success(function (data) {
                console.log(data);
            });
        };

    }]);

})(window, document);