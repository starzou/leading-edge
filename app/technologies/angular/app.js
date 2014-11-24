/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 *@class app
 *@description
 *@time 2014-11-04 22:45
 *@author StarZou
 **/
'use strict';

/**
 * 定义模块
 */
var App = angular.module('App', ['ngRoute', 'ngResource', 'restangular']);

/**
 * App.config 配置块
 * 配置服务
 */
App.config(['$routeProvider', function ($routeProvider) {

    /**
     * 路由服务配置
     */
    $routeProvider
        .when('/users', {templateUrl: 'users.html', controller: 'AppCtrl'})
        .when('/users/:name', {templateUrl: 'users.html', controller: 'AppCtrl'})
        .when('/hi', {templateUrl: 'hiTemplate.html', controller: 'AppCtrl'})
        .otherwise({redirectTo: '/users'});

    console.log('App.config');
}]);

/**
 * App.run 运行块
 * 初始化设置
 */
App.run(['$rootScope', '$interval', function ($rootScope, $interval) {
    $rootScope.app = {
        name: 'Angular Tutorial',
        version: '1.0.0 alpha',
        date: new Date()
    };

    $interval(function () {
        $rootScope.app.date = new Date();
    }, 200);

    /**
     * 监听路由服务改变, 例:可以统计用户打开页面的情况
     */
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        console.log('$routeChangeStart : ', arguments);
    });

    console.log('App.run');
}]);

/**
 * 注册controller
 */
App.controller('AppCtrl', ['$scope', '$filter', '$location', '$route', '$routeParams', function ($scope, $filter, $location, $route, $routeParams) {
    var users = $scope.users || [
            {id: 1, name: 'star1'},
            {id: 2, name: 'star2'},
            {id: 3, name: 'star3'}
        ];

    $scope.word = 'hello ';

    $scope.date = new Date();

    $scope.title = 'Hi Guys!';

    /**
     * 使用$filter 服务
     */
    $scope.name = $filter('lowercase')('StarZou');


    if (Object.keys($routeParams).length) {
        $scope.users = $filter('filter')(users, $routeParams);
    } else {
        $scope.users = users;
    }

    $scope.addUser = function (name) {
        $scope.users.push({id: Date.now(), name: name});
        $scope.name = undefined;
    };

    $scope.removeUser = function (index) {
        $scope.users.splice(index, 1);
    };

    $scope.routeTo = function (path) {
        $location.path(path);
    };

    console.log($location, $route);
}]);

/**
 * 注册自定义过滤器
 */
App.filter('capitalize', function () {
    return function (input) {
        if (input) {
            return input[0].toUpperCase() + input.slice(1);
        }
    };
});

/**
 * 指令注册
 */
App.directive('validateForm', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            var form = scope[attrs.name];
            console.log('validateForm', arguments, form);
        }
    };
});

App.directive('validateField', function () {
    var VALIDATE = {
        required: '必填！',
        number: "必须为数字！",
        minlength: '太短！',
        maxlength: '太长！',
        min: '太小！',
        max: '太大！',
        more: '太多！',
        email: 'Email无效！',
        username: '有效字符为汉字、字母、数字、下划线，以汉字或小写字母开头！',
        minname: '长度应大于5字节，一个汉字3字节！',
        maxname: '长度应小于15字节，一个汉字3字节！',
        repasswd: '密码不一致！',
        url: 'URL无效！',
        tag: '标签错误，不能包含“,”、“，”和“、”'
    };
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            console.log('validateField', arguments);

            var validateFn = function () {
                angular.forEach(ngModel.$error, function (value, key) {
                    console.log(VALIDATE[key]);
                });
            };

            /**
             * ngModel 值改变,进行验证
             */
//            scope.$watch(attrs.ngModel, validateFn);

            element.bind('keyup', validateFn);
        }
    };
});

/**
 * 内部指令 测试控制器
 */
App.controller('InternalDirectiveController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.appUrl = 'app.js';

    $scope.tplUrl = 'hiTemplate.html';

    $scope.loadImage = function () {
        $timeout(function () {
            $scope.imgUrl = '/images/1.jpg';
            console.log($scope);
            $scope.app.date = '加载完成';
        }, 2000);
    };
}]);

App.directive('sayHello', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            title: '=',
            text: '@'
        },
        template: '<div><h3 title="{{title}}">{{text}}</h3><label>title:</label><input type="text" ng-model="title" /></div>'
    };
}]);

App.directive('one', [function () {
    return {
        restrict: 'A',
        replace: true,
        priority: -1,
        template: '<div ng-bind="$id"></div>'
    };
}]);

App.directive('two', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope: true,
        terminal: true,
        template: '<div ng-bind="$id"></div>'
    };
}]);

App.directive('userList', [function () {
    return {
        scope: {
            users: '=',
            remove: '&'
        },
        templateUrl: 'users.html',
        link: function (scope, element, attrs) {
            console.log(arguments);
            element.on('mouseover', function () {
                element.css('backgroundColor', 'green');
            });
            element.on('mouseout', function () {
                element.css('backgroundColor', 'white');
            });
        }
    };
}]);

/**
 * Service 使用案例
 */
App.controller('ServiceController', ['$scope', '$timeout', 'AppService', 'GitHubService', 'MyService', 'MyService2', 'MyService3', 'MyService5', 'MyService6', 'MyService7', function ($scope, $timeout, AppService, GitHubService, MyService, MyService2, MyService3, MyService5, MyService6, MyService7) {
    console.log('AppService : ', AppService);
    console.log('GitHubService : ', GitHubService);
    console.log('MyService : ', MyService);
    console.log('MyService2 : ', MyService2);
    console.log('MyService3 : ', MyService3);
    console.log('MyService5 : ', MyService5);
    console.log('MyService6 : ', MyService6);
    console.log('MyService7 : ', MyService7);

    $scope.userName = 'starzou';
    $scope.queryEvents = function (userName) {
        GitHubService.events(userName).success(function (response) {
            $scope.events = response.data;
        });
    };

    var timeout, pending = false, enable = false;
    if (enable) {
        $scope.$watch('userName', function (newUserName) {
            if (newUserName) {
                if (!timeout && !pending) {
                    pending = true;
                    timeout = $timeout(function () {
                        GitHubService.events(newUserName).success(function (response) {
                            $scope.events = response.data;
                        });
                        pending = false;
                        timeout = null;
                    }, 500);
                }
            }
        });
    }
}]);

/**
 * factory : 返回对象作为一个服务
 */
App.factory('AppService', [function () {
    var version = {
        full: "1.0.0",
        major: 1,
        dot: 0,
        minor: 0
    };
    return {
        version: version,
        date: Date.now()
    };
}]);

App.factory('GitHubService', ['$http', function ($http) {
    var Resources = {
        events: {
            url: 'https://api.github.com/users/:user/events?callback=JSON_CALLBACK',
            method: function (userName) {
                return $http({method: 'JSONP', url: this.url.replace(':user', userName)});
            }
        },
        repos: {
            url: 'https://api.github.com/users/:user/repos?callback=JSON_CALLBACK',
            method: function (userName) {
                return $http({method: 'JSONP', url: this.url.replace(':user', userName)});
            }
        }
    };

    return {
        events: function (userName) {
            return Resources.events.method(userName);
        },

        repos: function (userName) {
            return Resources.repos.method(userName);
        }
    };
}]);

/**
 * provider, 可配置的服务.
 * provider : 为参数
 * service实例 : provider.$get 方法返回的对象
 */
App.provider('MyService', {
    $get: ['AppService', function () {
        return this;
    }]
});

/**
 * 推荐.
 * provider : 为参数 函数的实例化对象
 * service实例 : provider.$get 方法返回的对象
 */
App.provider('MyService2', function () {
    var obj = {
        date: Date.now()
    };

    this.setName = function (name) {
        obj.name = name;
    };

    this.$get = ['AppService', function () {
        return obj;
    }];
});

/**
 * provider : 为参数 函数的返回值
 * service实例 : provider.$get 方法返回的对象
 */
App.provider('MyService3', ['$httpProvider', function () {
    var service = {
        date: Date.now()
    };

    return {
        $get: ['AppService', function () {
            return service;
        }],
        setName: function (name) {
            service.name = name;
        }
    };
}]);

App.config(['MyServiceProvider', function (MyServiceProvider) {
    MyServiceProvider.name = 'MyService';
}]);

App.config(['MyService2Provider', function (MyService2Provider) {
    MyService2Provider.setName('MyService2');
}]);

App.config(['MyService3Provider', function (MyService3Provider) {
    MyService3Provider.setName('MyService3');
}]);

/**
 * constant
 * service实例 : 为参数
 */
App.constant('MyService5', {date: Date.now()});

App.config(['MyService5', function (MyService5) {
    MyService5.name = 'MyService5';
}]);

/**
 * value
 * service实例 : 为参数
 */
App.value('MyService6', {date: Date.now()});

/**
 * service
 * service实例 : 为参数 函数的实例化对象
 */
App.service('MyService7', ['AppService', function (AppService) {
    this.AppService = AppService;
    this.name = 'MyService7';
}]);

/**
 * HttpController
 */
App.controller('HttpController', ['$scope', '$http', '$resource', 'appContext', function ($scope, $http, $resource, appContext) {
    /**
     * User资源
     */
    var User = $resource('/rest/users', null, {
        queryUsers: {
            method: 'GET',
            isArray: true
        }
    });


    $scope.httpGet = function () {
        //$http.get('/rest/users', {params: $scope.param}).success(function (data) {
        //    $scope.data = data;
        //});

        $scope.data = User.query($scope.param);
    };

    $scope.httpPost = function () {
        //$http.post('/rest/users', $scope.param).success(function (data) {
        //    $scope.httpGet();
        //});

        User.save($scope.param, function () {
            $scope.param = {};
            $scope.httpGet();
        });
    };

    $scope.viewStatus = function () {
        console.log(appContext);
    };
}]);


/**
 * 应用配置服务
 */
App.constant('appContext', {
    headers: {
        common: {
            token: 'token123456'
        }
    },
    status: {
        request: 0,
        requestError: 0,
        response: 0,
        responseError: 0
    },
    baseUrl: '/rest/'
});


/**
 * 请求配置示例
 */
App.config(['$httpProvider', '$cacheFactoryProvider', 'appContext', function ($httpProvider, $cacheFactoryProvider, appContext) {
    //var cacheFactory = $cacheFactoryProvider.$get();
    //$httpProvider.defaults.cache = cacheFactory('cacheRequests', {capacity: 5});

    $httpProvider.interceptors.push('appInterceptor'); // 添加拦截器

    angular.extend($httpProvider.defaults.headers.common, appContext.headers.common); // 设置公共请求头, 比如可以设置Token, 实现校验
}]);

/**
 * http 拦截器
 */
App.factory('appInterceptor', ['$q', 'appContext', function ($q, appContext) {
    return {
        'request': function (config) {
            console.log('request...', config);
            appContext.status.request++;
            return config;
        },

        'requestError': function (rejection) {
            appContext.status.requestError++;
            return $q.reject(rejection);
        },

        'response': function (response) {
            console.log('response...', response);
            appContext.status.response++;
            return response;
        },
        'responseError': function (rejection) {
            appContext.status.responseError++;
            return $q.reject(rejection);
        }
    };
}]);

App.controller('RestController', ['$scope', 'Restangular', function ($scope, Restangular) {
    var Users = Restangular.all('rest/users');
    console.log(Users);
    $scope.data = Users.getList();
}]);

App.controller('qController', ['$scope', '$q', '$timeout', function ($scope, $q, $timeout) {

    $scope.log = function (data) {
        console.log(data);
    };

    $scope.asyncRequest = function (options) {
        var deferred = $q.defer();

        console.log('请求之前...', options);

        $timeout(function () {
            deferred.notify('正在执行 ' + options.name + ' 请求...');

            if (options.status) {
                deferred.resolve(options.name + ' 请求完毕...');
            } else {
                deferred.reject(options.name + ' 请求拒绝...');
            }
        }, 2000);

        return deferred.promise

    };

    $scope.req = function () {
        var promise = $scope.asyncRequest({name: '登录', status: false});
        promise.then($scope.log, $scope.log, $scope.log);
    };


}]);