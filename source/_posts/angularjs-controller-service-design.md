---
title: AngularJS 中 Controller 与 Service 的分层设计编码
date: 2017-12-30
updated: 2017-12-30
tags:
  - AngularJS
  - JavaScript
categories:
---
## 前言

本文主要针对 AngularJS 的初学者而编写的一篇关于如何在 AngularJS 框架下更好的编写代码的一个指南。下文将对 AngularJS 进行简称，替代为 NG。


<!-- more -->

## 初学者的 Controller

在接触 NG 后，如果需要通过访问远程的 API 获取一系列的数据进行显示，通常 Controller 代码会写成下面的样子：

```js
angular.module('demo')
  .controller('myCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get("xxx").success(function (response) {
      $scope.data = response.data;
    });
  }]);
```

这样的在功能上是没有问题的，但是会导致 Controller 除了负担与 View 层的$scope 变量的初始化和防范定义外，还需要额外注入 http 进行远程的数据调用。如果调用 API 的代码会大量被引用、或是 API 变更的时候，就会导致大面积地修改 Controller 代码。

## 分离 Service

### Service 层和 Controller 层的分工

我们将原来全部集中在 Controller 中代码拆分成两个层面：

- service 层：主要负责数据交互和数据处理、处理一些业务领域上的逻辑；
- controller 层：主要负责初始化$scope 的变量用于传递给 view 层，并且处理一些页面交互产生的逻辑；

### 什么情况下需要编写 Service

当一个功能涉及远程 API 调用、数据集、业务领域复杂逻辑、将会大量重复的运算方法时，就可以考虑将代码以 service 形式注入 controller 层。

## 编写 Service

将原先的代码从 Controller 中抽离处理，代码如下：

```js
angular.module('demo')
  .service('myService', ['$http', function ($http) {
    return {
      getData: function () {
        return $http.get("xxx");
      }
    }
  }]);
```

则 Controller 的代码将会被注入 myService 用于获取相关的数据

```js
 angular.module('demo')
   .controller('myCtrl', ['$scope', 'myService', function ($scope, $http, myService) {
     myService.getData().success(function (response) {
       $scope.data = response.data;
     });
   }]);
```

这样的代码看上去是很不错了，但是我们依旧在 Controller 层处理了通讯时的回调函数 success, 这样 controller 虽然直接依赖 http 了，但是还是间接的需要处理 http。

## 在 Service 层处理通讯回调，将业务回调传递给 Controller 层

这里需要引入 deffered 将 http 的通讯级的回调在 Service 层处理完后，再重新交由 controller 去处理其他的问题。

```js
angular.module('demo')
  .service('myService', ['$http', '$q', function ($http, $q) {
    return {
      getData: function () {
        var deferred = $q.defer();
        var promise = $http.get("xxx");
        promise.then(
          // 通讯成功的处理
          function (answer) {
            //在这里可以对返回的数据集做一定的处理，再交由 controller 进行处理
            answer.status = true;
            deferred.resolve(answer);
          },
          // 通讯失败的处理
          function (error) {
            // 可以先对失败的数据集做处理，再交由 controller 进行处理
            error.status = false;
            deferred.reject(error);
          });
        //返回 promise 对象，交由 controller 继续处理成功、失败的业务回调
        return deferred.promise;
      }
    }
  }]);
```

相应的在 controller 中我们也可以进行相关事件的处理，修改代码如下

```js
angular.module('demo')
  .controller('myCtrl', ['$scope', 'myService', function ($scope, myService) {
    myService.getData().then(
      function (answer) {
        $scope.data = answer;
      },
      function (error) {
        $scope.error = error;
      }
    );
  }]);
```

这样 controller 和 service 的职能分离，并且 controller 完全不依赖 http 而只是依赖 service 传递的事件和数据。再编写测试代码时，其逻辑也会变得简单。并且多个 controller 可以调用一个 service 中相同的方法，而不是通过曾经那种复制的方法来解决。

分层编写代码的最终目的无非就是：

1. 增加代码的复用性；
2. 代码责任简单，不会又做保姆又做司机，可读性强容易理解；
3. 编写测试代码的时候容易编写；
4. 减少对一些框架和环境插件的依赖；
5. 修改逻辑时最小幅度的修改代码
6. 数据层发生变更修改 Service,UI 层有变化则修改 Controller。不用担心改 controller 把 service 也一起带到沟里的情况发生。

## 最后

AngularJS 在许多框架的设计方面与 Java 的 Spring 非常类似，如果有一定的 Java 基础应该很能理解并写出分层的代码。

## FROM

作者：AkiraPan
链接：https://www.jianshu.com/p/1e1aaf0fd30a
来源：简书
