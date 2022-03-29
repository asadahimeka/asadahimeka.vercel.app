---
title: AngularJs 开发的一些基本准则
date: 2018-01-03
updated: 2018-12-03
tags:
  - AngularJS
  - JavaScript
categories:
---

本文将讨论 angularjs 开发的一些基本准则。

<!-- more -->

1：不要一个 page 一个 God 似无所不能的 controller 包含所有页面逻辑。

Angularjs ng-controller 旨在将业务逻辑的区分，更推荐按照业务逻辑的划分 controller，做到业务功能的高内聚，controller 的单一原则 SRP。

2：View 中包含尽量少的逻辑。
​就像 jsp，asp 这类服务端模板引擎一样，我们应该把尽量少的逻辑放在 view 中，因为这样会导致 view 和逻辑的紧耦合性，view 在软件开发中是最易变化的，而表现层逻辑却相对于 view 是相对稳定的行为。同时也导致的 view 中的逻辑不能被自动化测试，持续集成所覆盖，这将导致以后修改重构和模块的集成的痛苦。很明显的就是太多的 angularjs 的 ng-switch，ng-when 和页面计算表达式等等。

3：注意一些特殊的节点式的 angularjs directive，因为在 IE7 上这是不被认识的，因为 IE 的严格 XML 模式。如果你想 make ie7 happy，

- 请注意导入 json2 或者 json3 的 js

- xmlns:ng 命令空间和节点 element 式 directive。


```
<html xmlns:ng="http://angularjs.org">

<head>

<!--[if lte IE 8]>

<script>

document.createElement('ng-include');

document.createElement('ng-pluralize');

document.createElement('ng-view');



// Optionally these for CSS

document.createElement('ng:include');

document.createElement('ng:pluralize');

document.createElement('ng:view');

</script>

<![endif]-->

</head>
```

-  除官网介绍的几个注意点之外 需要将


```html
<div ng-app="xxx">
<!-- 改为 -->
<div id="ng-app" ng-app="xxx">
```

 另外注意 html 头部要引入（否则会进入坑爹的 quirk 模式）

```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

4：在 controller 和 service 中绝对不能出现 html 的 DOM 和 CSS 代码。

   这会导致逻辑的混杂耦合，对于 angularjs 自身的绑定对 html 操作，很多时候你会分不清是 view 的影响源，导致修复 bug，和新增功能，重构的艰难，常常出现很多的诡异行为。最好的实践模式则是把必须的 dom，css 操作移向 angular 的 Directive，或者 view 中。在 angularjs 模式中只有 directive 和 view 才能出现 dom 和 css 的逻辑操作。

 5：controller 中公用的逻辑推向 service（factory，value，config)，采用 IOC 的注入，提高代码的重用度，修改的单一点，开闭原则。

 6：controller 应该只包含业务逻辑，对于数据模型的格式化过滤尽量交给 angular 框架 filter 等处理。

7：viewmodel 中最好建立一个通用属性比如 vm，它承载 view 渲染的最小量化 model，对于 model 的变形事件则在 vm 之外 scope 之上。这才是 MVVM 推荐方式。事件相当于 WPF 中的 command，负责模型事件的传递修改模型，从而从模型的改变通知 view 的强制更新（WPF 中 model 必须实现 INotifyPropertyChange 接口）。同时这样 vm 属性也便于数据的填充和收集回发服务端。

8：IOC 注入优先，有助于良好的设计，逻辑的可重用和单元模块的可测试性，面向对象的“开闭原则”，修改的单一点。

9：良好的分层设计，对于 view 的交互采用 controller 通过 viewmode（scope）的推送，与服务器的交互推向 service 层次，利用 angularjs 的$resource 或者$http 获取更新数据 model，以及与服务端交互。层次划分属于纵向分割，将相同功能逻辑的接口放在一起，架构层次，而 model 则从业务的逻辑横向分离。

10：服务端的服务的接口需要考虑表现层客户端的应用提供，这是一个良好的 SOA 服务设计的准则，这里不用多余的描述，具体请移步 [架构篇](http://www.cnblogs.com/whitewolf/category/379884.html)。

11：如果你的公司应用了敏捷开发则，TDD 的开发是必备的，angularjs 本也是解决 javascript 测试驱动开发项目。

 12：scope 的纯净性，scope 上的每一个函数和属性必须为 view 所用（事件传递或者属性绑定），不用的可以作为工具函数或者 service 处置。

 13：对 controller 之间如果不是强依赖，只是弱引用则最好用事件$emit,$on,$broadcast, 是的 controller 之间低耦合（[Angularjs Controller 间通信机制](http://www.cnblogs.com/whitewolf/archive/2013/04/16/3024843.html)）。

 14：angularjs 的的模块管理参见 [如何组织大型 JavaScript 应用中的代码？](http://kb.cnblogs.com/page/176541/).

 最后想说说 angularjs 也不是银弹，并不是万能的，不是所有的项目都适合应用，它适用于 CRUD 的应用系统，内置了一些默认规则（惯例优先），对于表现层频繁交互的项目不适用，对于一些特殊的项目比如 spring hdiv 的项目也不是那么友好，或者就是你希望兼容更多的 IE8 一下的版本的应用系统，同样也不实用。


> 作者：[破 狼](http://www.cnblogs.com/whitewolf/)
> 出处：http://www.cnblogs.com/whitewolf/
> 本文版权归作者，欢迎转载，但未经作者同意必须保留此段声明，且在文章页面明显位置给出原文连接，否则保留追究法律责任的权利。该文章也同时发布在我的独立博客中-[个人独立博客](http://greengerong.com/)、[博客园--破狼](http://www.cnblogs.com/whitewolf/) 和 [51CTO--破狼](http://whitewolfblog.blog.51cto.com/)。http://www.cnblogs.com/whitewolf/archive/2013/03/24/2979344.html
