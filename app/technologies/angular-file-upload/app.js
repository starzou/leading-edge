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

    App.controller('AppController', ['$scope', 'FileUploader', function ($scope, FileUploader) {
        console.log($scope);

        var uploader = $scope.uploader = new FileUploader({
            url: '/rest/files'
        });

        uploader.filters.push({
            name: 'customFilter',
            fn  : function (item, options) {
                console.log(item, options);
                return this.queue.length < 3;
            }
        });
    }]);
})(window, document);