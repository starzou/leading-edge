/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * @class app
 * @description
 * @time 2014-12-14 20:24
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var App = angular.module('app', ['colorpicker.module']);

    App.controller('AppController', ['$scope', '$compile', '$parse', function ($scope, $compile, $parse) {
        $scope.title = 'Angular 相关研究';

        console.log('AppController...');
    }]);

})(window, document);