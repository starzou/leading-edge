/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * @class app3
 * @description
 * @time 2014-12-14 20:24
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var App = angular.module('app3', []);

    App.controller('AppController', ['$scope', '$compile', function ($scope, $compile) {
        $scope.title = 'Angular 研究 3';
        $scope.hello = 'Hello Angular 研究 3';

        /**
         * angular.bind 示例
         * @param word
         */
        var fn = function (word) {
                console.log('%s say %s', this.name, word);
            },
            warpFn = angular.bind({name: 'StarZou'}, fn, 'hello');

        $scope.bind = function () {
            warpFn();
        };


        /**
         * angular.element 示例
         */
        $scope.element = function () {
            var $html = angular.element(document.documentElement),
                $body = angular.element(document.body),
                $h1 = angular.element('<h1 ng-bind="title" ng-title="hello">hello</h1>');

            var element = $compile($h1)($scope);
            $body.append(element);

            console.log(element);

            //console.log($html.scope());
            //console.log($body, $body.scope());
            //console.log($h1);
        };

    }]);

    App.directive('ngTitle', [function () {
        return {
            link: function postLink($scope, $element, $attr) {
                var title = $scope[$attr['ngTitle'] || $attr['ngModel'] || $attr['ngBind']];
                $element.attr('title', title);
            }
        };
    }]);

})(window, document);