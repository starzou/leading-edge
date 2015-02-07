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

    var App = angular.module('app', ['colorpicker.module', 'angularTreeview']);

    App.controller('AppController', ['$scope', '$compile', '$parse', function ($scope, $compile, $parse) {
        $scope.title = 'Angular 相关研究';

        console.log('AppController...');

        $scope.treedata =
            [
                {
                    "label": "User", "id": "role1", "children": [
                    {"label": "subUser1", "id": "role11", "children": []},
                    {
                        "label": "subUser2", "id": "role12", "children": [
                        {
                            "label": "subUser2-1", "id": "role121", "children": [
                            {"label": "subUser2-1-1", "id": "role1211", "children": []},
                            {"label": "subUser2-1-2", "id": "role1212", "children": []}
                        ]
                        }
                    ]
                    }
                ]
                },
                {"label": "Admin", "id": "role2", "children": []},
                {"label": "Guest", "id": "role3", "children": []}
            ];

        $scope.buttonClick = function (event) {
            console.log(event);
        };
    }]);

})(window, document);