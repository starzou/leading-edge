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
            autoclose : true,
            maxDate   : Date.now()
        });
    }]);

    App.run(['$rootScope', function ($rootScope) {
        $rootScope.title = 'angular-strap 研究2';
    }]);

    App.controller('AppCtrl', ['$scope', '$http', '$alert', function ($scope, $http, $alert) {

        $scope.submit = function () {
            $http.post('/rest/users', $scope.user).success(function (data) {
                console.log(data);
            });
        };


        $scope.showAlert = function () {
            $alert({
                title    : '警告!',
                content  : '服务器磁盘不足!',
                placement: 'top-right',
                type     : 'info',
                animation: 'am-fade-and-slide-top',
                duration : 3
            });
        };

    }]);


    App.directive('dateRange', [function () {
        return {
            replace : true,
            //scope   : true,
            template: '<div class="form-inline"><input type="text" class="form-control" ng-model="startDate" data-max-date="{{endDate}}" placeholder="开始日期" bs-datepicker><input type="text" class="form-control" ng-model="endDate" data-min-date="{{startDate}}" placeholder="结束日期" bs-datepicker></div>'
        };
    }]);

    App.directive('datetimePicker', [function () {
        return {
            replace : true,
            template: '<div class="form-inline"><input type="text" size="10" class="form-control" ng-model="date" bs-datepicker><input type="text" size="8" class="form-control" ng-model="time" bs-timepicker></div>'
        };
    }]);

})(window, document);