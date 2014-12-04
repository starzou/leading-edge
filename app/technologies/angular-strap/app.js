/**
 *@class app
 *@description
 *@time 2014-12-01 16:24
 *@author StarZou
 **/

(function (window, document, undefined) {
    'use strict';

    var App = angular.module('App', ['ngAnimate', 'mgcrea.ngStrap']);

    App.run(['$rootScope', function ($rootScope) {
        $rootScope.title = 'angular-strap 研究';
    }]);

    App.controller('AppCtrl', ['$scope', '$modal', '$alert', '$aside', '$tooltip', function ($scope, $modal, $alert, $aside, $tooltip) {

        var model = $modal({
            title    : 'hello',
            content  : 'Hello angular-strap!',
            animation: 'am-fade-and-scale',
            placement: 'center',
            show     : false
        });

        $scope.showModal = function () {
            model.$promise.then(model.show);
        };

        var myAlert = $alert({
            title    : 'Holy guacamole!',
            content  : 'Best check yo self, you\'re not looking too good.',
            placement: 'top-right',
            type     : 'info',
            show     : false,
            animation: 'am-fade-and-slide-top',
            duration : 3
        });

        $scope.showAlert = function () {
            console.log('show alert...');
            myAlert.show();
        };

        var myAside = $aside({title: 'My Title', content: 'My Content', show: false});

        $scope.showAside = function () {
            myAside.show();
        };

        var tooltips = [];
        angular.forEach(document.querySelectorAll('button'), function (button) {
            var tooltip = $tooltip(angular.element(button), {
                title  : button.innerHTML,
                trigger: 'manual'
            });
            tooltips.push(tooltip);
        });

        $scope.showTooltip = function () {
            angular.forEach(tooltips, function (tooltip) {
                tooltip.show();
            })
        };

        $scope.hideTooltip = function () {
            angular.forEach(tooltips, function (tooltip) {
                tooltip.hide();
            })
        };
    }]);


    App.constant('VALIDATE', {
        required : '必填！',
        number   : "必须为数字！",
        minlength: '太短！',
        maxlength: '太长！',
        min      : '太小！',
        max      : '太大！',
        more     : '太多！',
        email    : 'Email无效！',
        username : '有效字符为汉字、字母、数字、下划线，以汉字或小写字母开头！',
        minname  : '长度应大于5字节，一个汉字3字节！',
        maxname  : '长度应小于15字节，一个汉字3字节！',
        repasswd : '密码不一致！',
        url      : 'URL无效！',
        tag      : '标签错误，不能包含“,”、“，”和“、”'
    });

    /**
     * 表单验证指令, 该指令在 form元素上使用
     */
    App.directive('validateForm', ['$tooltip', 'VALIDATE', function ($tooltip, VALIDATE) {
        var me = {
            lastTooltips: [],
            validateFn  : function ($element, ngFormController) {
                var me = this,
                    formElement = $element[0], // form元素
                    formField,
                    tooltip,
                    name;

                /**
                 * 先移除上次的提示
                 */
                angular.forEach(me.lastTooltips, function (tooltip) {
                    tooltip.hide();
                })

                /**
                 * 进行验证, 显示错误提示
                 */
                angular.forEach(ngFormController.$error, function (ngModelControllers, type) {

                    angular.forEach(ngModelControllers, function (ngModelController) {
                        name = ngModelController.$name;
                        formField = formElement.querySelector('[name="' + name + '"]');

                        /**
                         * 显示提示
                         */
                        tooltip = $tooltip(angular.element(formField), {
                            title    : VALIDATE[type],
                            trigger  : 'manual',
                            placement: 'right',
                            show     : true
                        });

                        me.lastTooltips.push(tooltip);
                    });

                });
            },

            initValidate: function ($element, ngFormController) {
                var formFields = $element[0].querySelectorAll('[ng-model]'),
                    me = this;

                angular.forEach(formFields, function (formField) {
                    formField.addEventListener('blur', function (event) {
                        me.validateFn($element, ngFormController);
                        event.stopPropagation();
                    }, false);
                });
            }
        };

        return {
            restrict: 'A',
            compile : function ($element, $attr) {

                /**
                 * 为表单添加了ng-model属性的字段 绑定 name,
                 * 以便于angular 为其创建 ngModelController, 实现字段校验
                 */

                var formElement = $element[0],
                    ngModelAttributeName = 'ng-model',
                    formFields = formElement.querySelectorAll('[' + ngModelAttributeName + ']'),
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
                    var ngFormController = $scope[$attr.name]; // 取得ngFormController

                    $element.on('submit', function (event) {
                        me.validateFn($element, ngFormController);
                    });

                    $element.on('reset', function (event) {

                    });

                    me.initValidate($element, ngFormController);
                };
            }
        }
    }
    ])
    ;

})
(window, document);