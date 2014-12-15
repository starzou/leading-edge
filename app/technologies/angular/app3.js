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

    App.controller('AppController', ['$scope', '$rootElement', function ($scope, $rootElement) {
        $scope.title = 'Angular 研究 3';

        console.log($rootElement);

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
                $h1 = angular.element('<h1>hello</h1>');

            $body.append($h1);

            console.log($html.scope());
            console.log($body);
            console.log($h1);
        };

    }]);

})(window, document);