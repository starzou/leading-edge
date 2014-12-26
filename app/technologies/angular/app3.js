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

    App.directive('animateIt', [function () {
        return {
            restrict   : 'EAC',
            scope      : true,
            templateUrl: 'animate-dropdown.html',
            compile    : function compile($element, $attr) {
                return function postLink($scope, $element, $attr) {
                    var selector = $attr['animateIt'],
                        targetElement = selector ? document.querySelector(selector) : document.body,
                        $targetElement = angular.element(targetElement);

                    $targetElement.addClass('animated');

                    $scope.$watch('animations', function (newValue, oldValue) {
                        if (newValue === oldValue && newValue === undefined) {
                            return;
                        }
                        if (oldValue) {
                            $targetElement.removeClass(oldValue);
                        }
                        if (newValue) {
                            $targetElement.addClass(newValue);
                        }
                    });
                }
            }
        };
    }]);

    App.directive('z1', [function () {
        return {
            restrict  : 'EA',
            template  : '<div><h1 style="color: red;">hello z1</h1><div ng-transclude></div></div>',
            transclude: true,
            replace   : true,
            link      : function ($scope, $element, $attr) {
                console.log('z1 link...');
                console.log($element);
            }
        };
    }]);

    App.directive('z2', [function () {
        return {
            restrict: 'EA',
            template: '<div><h1 style="color: red;">hello z2</h1></div>',
            replace : true,
            link    : function ($scope, $element, $attr) {
                console.log('z2 link...');
                console.log($element);
            }
        };
    }]);

    App.directive('boy', [function () {
        return {
            scope     : {},
            replace   : true,
            template  : '<div><pre ng-bind="boy | json"></pre></div>',
            controller: ['$scope', function ($scope) {
                var boy = {
                    hobbies: []
                };

                this.addHobbies = function (name) {
                    boy.hobbies.splice(boy.hobbies.length - 1, 0, name.split(','));
                };

                $scope.boy = boy;
            }],
            link      : function ($scope, $element, $attr) {
                $scope.boy.name = $attr.boy;
            }
        };
    }]);

    App.directive('hobby', [function () {
        return {
            require: 'boy',
            link   : function ($scope, $element, $attr, $ctrl) {
                $ctrl.addHobbies($attr.hobby);
            }
        };
    }]);

})(window, document);