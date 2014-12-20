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

    App.controller('AppController', ['$scope', '$compile', '$parse', function ($scope, $compile, $parse) {

        /**
         * $parse 示例
         */
        var psFn = $parse('user.name');
        console.log(psFn({user: {name: 'context-StarZou'}}, {user: {name: 'local-StarZou'}}));

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
            var h1Template = '<h1 ng-bind="title" ng-title="hello" class="animated bounce" style="cursor: pointer;color: red;" ng-click="showTitle()">hello</h1>',
                $html = angular.element(document.documentElement),
                $body = angular.element(document.body),
                $h1 = angular.element(h1Template);


            var childScope = $scope.$new(),
                element = $compile($h1)(childScope);

            childScope.showTitle = function () {
                console.log(childScope.title);
            };

            $body.append(element);
            console.log(childScope);

            //console.log($html.scope());
            //console.log($body, $body.scope());
            //console.log($body.controller());
            //console.log($h1);
        };

    }]);

    App.directive('ngTitle', [function () {
        return {
            compile: function compile($element, $attr) {
                console.log($element, $attr);
                return function postLink($scope, $element, $attr) {
                    var title = $scope[$attr['ngTitle'] || $attr['ngModel'] || $attr['ngBind']];
                    $element.attr('title', title);

                    $element.on('click', function () {
                        console.log($scope.title);

                        $element.css('color', 'green');
                    });
                }
            }
        };
    }]);

})(window, document);