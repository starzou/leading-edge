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

    App.controller('AppController', ['$scope', function ($scope) {

        $scope.title = 'Angular 研究 3';

    }]);

})(window, document);