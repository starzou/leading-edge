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

    var App = angular.module('app', ['angularFileUpload']);

    App.run(['$rootScope', function ($rootScope) {
        $rootScope.title = 'angular-file-upload 上传示例';
    }]);

    App.controller('AppController', ['$scope', function ($scope) {
        console.log($scope);

    }]);
})(window, document);