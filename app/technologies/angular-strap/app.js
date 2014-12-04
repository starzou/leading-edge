/**
 *@class app
 *@description
 *@time 2014-12-01 16:24
 *@author StarZou
 **/

(function (window, document, undefined) {
    'use strict';

    var App = angular.module('App', ['ngAnimate', 'mgcrea.ngStrap']);

    App.run(['$rootScope', function ($rootScope) {
        $rootScope.title = 'angular-strap 研究';
    }]);

    App.controller('AppCtrl', ['$scope', '$modal', '$alert', '$aside', '$tooltip', function ($scope, $modal, $alert, $aside, $tooltip) {

        var model = $modal({
            title    : 'hello',
            content  : 'Hello angular-strap!',
            animation: 'am-fade-and-scale',
            placement: 'center',
            show     : false
        });

        $scope.showModal = function () {
            model.$promise.then(model.show);
        };

        var myAlert = $alert({
            title    : 'Holy guacamole!',
            content  : 'Best check yo self, you\'re not looking too good.',
            placement: 'top-right',
            type     : 'info',
            show     : false,
            animation: 'am-fade-and-slide-top',
            duration : 3
        });

        $scope.showAlert = function () {
            console.log('show alert...');
            myAlert.show();
        };

        var myAside = $aside({title: 'My Title', content: 'My Content', show: false});

        $scope.showAside = function () {
            myAside.show();
        };

        var tooltips = [];
        angular.forEach(document.querySelectorAll('button'), function (button) {
            var tooltip = $tooltip(angular.element(button), {
                title  : button.innerHTML,
                trigger: 'manual'
            });
            tooltips.push(tooltip);
        });

        $scope.showTooltip = function () {
            angular.forEach(tooltips, function (tooltip) {
                tooltip.show();
            })
        };

        $scope.hideTooltip = function () {
            angular.forEach(tooltips, function (tooltip) {
                tooltip.hide();
            })
        };
    }]);

})(window, document);