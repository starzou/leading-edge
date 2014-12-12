/**
 *@class app2
 *@description
 *@time 2014-11-25 13:16
 *@author StarZou
 **/

var App = angular.module('App', ['ngDragDrop']);

App.run(['$rootScope', function ($rootScope) {
    $rootScope.title = 'Angular 拖动';
}]);

App.controller('AppCtrl', ['$scope', function ($scope) {

}]);


var target;

App.factory('dragDrop', function () {
    var me = {
        bindDragStart: function ($element) {
            $element.on('dragstart', function (event) {
                me.target = event.target;
            });

            return me;
        },

        bindDragOver: function ($element) {
            $element.on('dragover', function (event) {
                event.preventDefault();
            });
            return me;
        },

        bindDrop: function ($element) {
            $element.on('drop', function (event) {
                event.preventDefault();
                event.target.appendChild(me.target);
            });
            return me;
        }
    };

    return me;
});

App.directive('uiDrag', [function () {
    return {
        restrict: 'A',
        scope   : true,
        compile : function ($element, $attr) {
            $element.attr('draggable', true);// 元素设为可拖动
            return function ($scope, $element, $attr) {

                $element.on('dragstart', function (event) {
                    target = event.target;
                });

                $element.on('dragover', function (event) {
                    event.preventDefault();
                });
            };
        }
    }
}]);

App.directive('uiDrop', [function () {
    return {
        restrict: 'A',
        scope   : true,
        compile : function ($element, $attr) {
            return function ($scope, $element, $attr) {

                $element.on('drop', function (event) {
                    event.preventDefault();
                    event.target.appendChild(target);
                });


                $element.on('dragover', function (event) {
                    event.preventDefault();
                });
            };
        }
    }
}]);