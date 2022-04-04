---
title: Vue-resource 相关总结
tags:
  - Vue
  - JavaScript
abbrlink: b2e2ddc8
date: 2018-01-08 00:00:00
updated: 2018-01-08 00:00:00
categories:
---

## 概述

在项目中要实现动态数据交互，就要用到接口请求插件 vue-resource，它不是 Vue 官方维护的插件，但是使用是最多的，它可以通过 XMLHttpRequest 或 JSONP 发起请求并处理响应。vue-resource 有非常简洁的 API，还提供了非常有用的 inteceptor（拦截器）功能，使用 inteceptor 可以在请求前和请求后附加一些行为，比如使用 inteceptor 在 ajax 请求时显示 loading 界面。下面我们就要了解一下吧。
项目地址：https://github.com/pagekit/vue-resource

<!-- more -->

## vue-resource 特点

vue-resource 插件具有以下特点：

- 体积小
  vue-resource 非常小巧，在压缩以后只有大约 12KB，服务端启用 gzip 压缩后只有 4.5KB 大小，这远比 jQuery 的体积要小得多。

- 支持主流的浏览器
  和 Vue.js 一样，vue-resource 除了不支持 IE 9 以下的浏览器，其他主流的浏览器都支持。

- 支持 Promise API 和 URI Templates
  Promise 是 ES6 的特性，Promise 的中文含义为“先知”，Promise 对象用于异步计算。 URI Templates 表示 URI 模板，有些类似于 ASP.NET MVC 的路由模板。

- 支持拦截器
  拦截器是全局的，拦截器可以在请求发送前和发送请求后做一些处理。
  拦截器在一些场景下会非常有用，比如请求发送前在 headers 中设置 access_token，或者在请求失败时，提供共通的处理方式。

## vue-resource 基本使用方法

### 1. 安装与引用

NPM：$ npm install vue-resource --save

/*引入 Vue 框架*/

```js
import Vue from 'vue'
```

/*引入资源请求插件*/

```js
import VueResource from 'vue-resource'
```

/*使用 VueResource 插件*/

```js
Vue.use(VueResource)
```

### 2. 语法

引入 vue-resource 后，可以基于全局的 Vue 对象使用 http，也可以基于某个 Vue 实例使用 http。

```js
// 基于全局 Vue 对象使用 http
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
```

```js
// 在一个 Vue 实例内使用$http
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
```

在发送请求后，使用 then 方法来处理响应结果，then 方法有两个参数，第一个参数是响应成功时的回调函数，第二个参数是响应失败时的回调函数。

then 方法的回调函数也有两种写法，第一种是传统的函数写法，第二种是更为简洁的 ES 6 的 Lambda 写法：

```js
// 传统写法
this.$http.get('/someUrl', [options]).then(function(response){
    // 响应成功回调
}, function(response){
    // 响应错误回调
});

// Lambda 写法
this.$http.get('/someUrl', [options]).then((response) => {
    // 响应成功回调
}, (response) => {
    // 响应错误回调
});
```

关于 options 对象和 response 对象的说明可以参见官方文档。

emulateHTTP 的作用
如果 Web 服务器无法处理 PUT, PATCH 和 DELETE 这种 REST 风格的请求，你可以启用 enulateHTTP 现象。启用该选项后，请求会以普通的 POST 方法发出，并且 HTTP 头信息的 X-HTTP-Method-Override 属性会设置为实际的 HTTP 方法。

```js
Vue.http.options.emulateHTTP = true;
```

emulateJSON 的作用
如果 Web 服务器无法处理编码为 application/json 的请求，你可以启用 emulateJSON 选项。启用该选项后，请求会以 application/x-www-form-urlencoded 作为 MIME type，就像普通的 HTML 表单一样。

```js
Vue.http.options.emulateJSON = true;
```

### 3. 使用

我是用传统的函数写法，在各个组件的 Vue 实例中使用$http，然后将成功和错误回掉单独拿出来声明。在 methods 对象中写好函数逻辑处理，然后在 mounted() 函数中调用它，这样渲染这个组件的时候就会发送请求。当然，请求的地址和参数已经在 data() 函数中声明，请求方式根据具体需求来。

在使用的时候遇到一个小坑，这个$http 请求和 jquery 的 ajax 还是有点区别，这里的 post 的 data 默认不是以 form data 的形式，而是 request payload。解决起来也很简单，将 emulateJSON 属性设置为 true 即可。

```js
Vue.http.options.emulateJSON = true
```

按照 API 说明文档，我请求回来的 response 只需要调用 json() 方法就可以返回 JSON 对象，然而返回却是 Promise 对象。看图。我不太了解 Promise，查了资料目前也没整明白，文档上面 type 是 Promise，但是描述里面又说是转化成 JSON 对象。反正最后我的代码里是转化了一下的，拿到 JSON 对象了我们就可以进行其他逻辑处理了。

```js
var data = JSON.parse(response.body);
```

### 4.inteceptor（拦截器）

拦截器可以在请求发送前和发送请求后做一些处理。
在 response 返回给 successCallback 或 errorCallback 之前，你可以修改 response 中的内容，或做一些处理。
例如，响应的状态码如果是 404，你可以显示友好的 404 界面。
比如我们就用拦截器做了登录处理，所以请求发送之前都要通过拦截器验证当前用户是否登陆，否则提示登录页面。

```js
Vue.http.interceptors.push(function(request, next) {
    // ...
    // 请求发送前的处理逻辑
    // ...
    next(function(response) {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response 参数会返回给 successCallback 或 errorCallback
        return response
    })
})
```

### 5.proxy（代理）

场景：在本地 serve 发送 API 接口请求，那我们得用跨域了吧，jsonp，但是我们后端说跨域不安全，接口没有实现跨域请求，就算开发时候跨域请求成功，那上线时不可能去修改所有的请求方式吧。于是就各种搜索解决方案，在打算用 Nginx 代理的时候，发现了 Vue.js 的 webpack 模板中自带了一个代理，泪奔，赶紧修改。
文档地址：https://vuejs-templates.github.io/webpack/proxy.html

## 总结

本文主要分享了 vue-resource 插件的安装与使用，以及在使用的过程中遇到的一些问题及处理方法，其中我认为比较重要的点，也就是在开发过程中可能遇到的坑而且在没人告知的情况下最容易卡住的地方已经在 3. 使用和 5.proxy（代理）巨坑 中说明了，文中若有错误，请大家指出。

整个项目从基本构建到 vue-router 插件到 vue-resource 已经可以实现整个项目的架构了，Vuex 在这里不适用也不做介绍，后期有机会将新增分享。接下来我将就项目中某些具体的功能实现和一些 Vue 的使用技巧上做一些分享。

## REF

参考文章：http://www.cnblogs.com/keepfool/p/5657065.html
————————————————
原文链接：https://blog.csdn.net/u013778905/article/details/54235906
