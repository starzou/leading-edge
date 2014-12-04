/**
 *@class app2
 *@description
 *@time 2014-11-25 13:16
 *@author StarZou
 **/

var App = angular.module('App', ['ngAnimate']);

App.run(['$rootScope', function ($rootScope) {
    $rootScope.title = 'Angular 实践2';
    $rootScope.words = 'hello world!';
}]);

App.controller('AppCtrl', ['$scope', function ($scope) {
    /**
     * 监听作用域事件
     */
    $scope.$on('eventTriggered', function (event) {
        console.log('AppCtrl', event);
    });
}]);

App.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.$on('eventTriggered', function (event) {
        console.log('MainCtrl', event);
    });

    /**
     * 向上传播
     */
    $scope.emit = function () {
        $scope.$emit('eventTriggered', {date: Date.now()});
    };

    /**
     * 向下传播
     */
    $scope.broadcast = function () {
        $scope.$parent.$broadcast('eventTriggered', {date: Date.now()});
    };
}]);

App.controller('AnimateCtrl', ['$scope', '$animate', function ($scope, $animate) {

}]);

App.controller('PrincipleCtrl', ['$scope', function ($scope) {
    $scope.$watch('user.name', function (newVal, oldVal, scope) {
        console.log(arguments);
    });
}]);

App.directive('sayHello', [function () {
    return {
        restrict: 'A',
        replace : true,
        scope   : true,
        template: '<div><h1 ng-bind="word"></h1></div>',
        link    : function postLink(scope, element, attrs) {
            scope.word = scope.$eval(attrs.sayHello);
        }
    };
}]);


/**
 * 表单验证指令, 该指令在 form元素上使用
 */
App.directive('validateForm', [function () {
    return {
        restrict: 'A',
        compile : function ($element, $attr) {

            /**
             * 为表单的 添加了ng-model属性的字段 绑定 name,
             * 以便于angular 为其创建 ngModelController, 实现字段校验
             */

            var formElement = $element[0],
                ngModelAttributeName = 'ng-model',
                formFields = formElement.querySelectorAll('[ ' + ngModelAttributeName + ']'),
                formField,
                index;

            for (index = 0; index < formFields.length; index++) {
                formField = formFields[index];
                formField.name = formField.getAttribute(ngModelAttributeName); // 设置 表单字段的name 为 ng-model属性值
            }

            /**
             * 使原生浏览器的校验无效
             */
            formElement.setAttribute('novalidate', 'novalidate');


            return function ($scope, $element, $attr) {
                var formController = $scope[$attr.name]; // 取得ngFormController

                $element.on('submit', function (event) {
                    console.log('submit', formController);
                });

                $element.on('reset', function (event) {
                    console.log('reset', event);
                });

                console.log($scope, formController, $element);
            };
        }
    }
}]);