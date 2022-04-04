---
title: Observer Pattern （观察者模式）
tags:
  - Design Pattern
  - Observer Pattern
  - JavaScript
abbrlink: beda1d8f
date: 2017-11-03 00:00:00
updated: 2017-11-03 00:00:00
categories:
---
## 模式动机

> 建立一种**对象与对象之间的依赖关系，一个对象发生改变时将自动通知其他对象，其他对象将相应做出反应**。在此，发生改变的对象称为**观察目标**，而被通知的对象称为**观察者**，*一个观察目标可以对应多个观察者*，而且这些观察者之间没有相互联系，*可以根据需要增加和删除观察者，使得系统更易于扩展*，这就是观察者模式的模式动机。
<!-- more -->

## 模式定义

> **观察者模式** (Observer Pattern)：定义对象间的一种一对多依赖关系，使得*每当一个对象状态发生改变*时，其*相关依赖对象皆得到通知并被自动更新*。观察者模式又叫做**发布-订阅**（Publish/Subscribe）模式、模型-视图（Model/View）模式、源-监听器（Source/Listener）模式或从属者（Dependents）模式。观察者模式是一种对象行为型模式。

我们可以使用日常生活中，期刊订阅的例子来形象地解释一下上面的概念。期刊订阅包含两个主要的角色：期刊出版方和订阅者，他们之间的关系如下

* 期刊出版方 - 负责期刊的出版和发行工作

* 订阅者 - 只需执行订阅操作，新版的期刊发布后，就会主动收到通知，如果取消订阅，以后就不会再收到通知

### Def

* Observer Pattern: Define a **one-to-many dependency** between objects so that when **one object changes state, all its dependents are notified and updated automatically**.

* Frequency of use: **high** 5/5

## UML

![ObserverPattern UML](https://asadahimeka.github.io/test/b/observer/img/obuml.png "ObserverPattern UML")

## 模式分析

* 观察者模式描述了如何建立对象与对象之间的依赖关系，如何构造满足这种需求的系统。

* 这一模式中的关键对象是观察目标和观察者，一个目标可以有任意数目的与之相依赖的观察者，**一旦目标的状态发生改变，所有的观察者都将得到通知。**

* 作为对这个通知的响应，每个观察者都将即时更新自己的状态，以与目标状态同步，这种交互也称为**发布-订阅** (publish-subscribe)。目标是通知的发布者，它发出通知时并不需要知道谁是它的观察者，可以有任意数目的观察者订阅它并接收通知。

### 在观察者模式中也有两个主要角色：**Subject （主题）** 和 **Observer （观察者）** 。它们分别对应上边例子中的期刊出版方和订阅者。

![relationship](https://asadahimeka.github.io/test/b/observer/img/x.png)

## 模式优缺点

### 观察者模式的优点

* 观察者模式可以**实现表示层和数据逻辑层的分离**，并定义了稳定的消息更新传递机制，抽象了更新接口，使得可以有各种各样不同的表示层作为具体观察者角色。

* 观察者模式在观察目标和观察者之间**建立一个抽象的耦合**。

* 观察者模式支持广播通信。

* 观察者模式符合“开闭原则”的要求。

### 观察者模式的缺点

* 如果一个观察目标对象有很多直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。

* 如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。

* 观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

## 模式应用 (FE)

在前端领域，观察者模式被广泛地使用。最常见的例子就是为 DOM 对象添加事件监听，具体示例如下：

```html
<button id="btn">确认</button>
```

```javascript
function clickHandler(event) {
    console.log('用户已点击确认按钮！');
}

document.getElementById("btn").addEventListener('click', clickHandler);
```

上面代码中，我们通过 [addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) API 监听 button 对象上的点击事件，当用户点击按钮时，会自动执行我们的 `clickHandler` 函数。

## 模式例子

e.g 1

### Subject 类定义：

```javascript
class Subject {
    constructor() {
        this.observerCollection = [];
    }

    registerObserver(observer) {
        this.observerCollection.push(observer);
    }

    unregisterObserver(observer) {
        let index = this.observerCollection.indexOf(observer);
        if(index >= 0) this.observerCollection.splice(index, 1);
    }

    notifyObservers() {
        this.observerCollection.forEach((observer)=>observer.notify());
    }
}
```

### Observer 类定义：

```javascript
class Observer {

    constructor(name) {
        this.name = name;
    }

    notify() {
        console.log(`${this.name} has been notified.`);
    }
}
```

### Client

```javascript
let subject = new Subject(); // 创建主题对象

let observer1 = new Observer('semlinker'); // 创建观察者 A - 'semlinker'
let observer2 = new Observer('lolo'); // 创建观察者 B - 'lolo'

subject.registerObserver(observer1); // 注册观察者 A
subject.registerObserver(observer2); // 注册观察者 B

subject.notifyObservers(); // 通知观察者

subject.unregisterObserver(observer1); // 移除观察者 A

subject.notifyObservers(); // 验证是否成功移除
```

### 以上代码成功运行后控制台的输出结果：

```bash
semlinker has been notified. # 输出一次
lolo has been notified. # 输出两次
lolo has been notified.
```

e.g 2

### 猫、狗与老鼠

> 假设猫是老鼠和狗的观察目标，老鼠和狗是观察者，猫叫老鼠跑，狗也跟着叫，使用观察者模式描述该过程。

* UML

![Cat](https://asadahimeka.github.io/test/b/observer/img/cat.png)

#### Subject

```typescript
abstract class MySubject {
    protected observerCollection: Array<any>;//存放觀察者
    constructor() {
        this.observerCollection = [];
    }
    //注册方法
    public attach(observer: MyObserver): void {
        this.observerCollection.push(observer);
    }
    //注销方法
    public detach(observer: MyObserver): void {
        let index = this.observerCollection.indexOf(observer);
        if (index >= 0) this.observerCollection.splice(index, 1);
    }
    public abstract cry(): void;//抽象通知方法
}
```

#### Observer

```typescript
interface MyObserver {
    response(): void; //抽象响应方法
}
```

#### Cat

```typescript
class Cat extends MySubject {
    public cry(): void {
        console.log("------");
        console.log("猫叫！");
        console.log("------");
        this.observerCollection.forEach((obs: MyObserver) => obs.response());
    }
}
```

#### Dog

```typescript
class Dog implements MyObserver {
    public response(): void {
        console.log("狗跟着叫！");
    }
}
```

#### Mouse

```typescript
class Mouse implements MyObserver {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    }
    public response(): void {
        console.log(`老鼠${this.name}努力逃跑！`);
    }
}
```

#### Pig

```typescript
class Pig implements MyObserver {
    public response(): void {
        console.log("猪没有反应！");
    }
}
```

#### client

```typescript
let cat = new Cat();

let mouse1 = new Mouse('m1');
let mouse2 = new Mouse('m2');
let dog = new Dog();

cat.attach(mouse1);
cat.attach(mouse2);
cat.attach(dog);

let pig = new Pig();
cat.attach(pig);

cat.cry();

cat.detach(mouse2);
cat.cry();
```

#### 控制台输出

```bash
------
猫叫！
------
老鼠 m1 努力逃跑！
老鼠 m2 努力逃跑！
狗跟着叫！
猪没有反应！
------
猫叫！
------
老鼠 m1 努力逃跑！
狗跟着叫！
猪没有反应！
```

## **Observable(RxJS)**

RxJS 是基于观察者模式和迭代器模式以函数式编程思维来实现的。RxJS 中含有两个基本概念：Observables 与 Observer。Observables 作为被观察者，是一个值或事件的流集合；而 Observer 则作为观察者，根据 Observables 进行处理。

Observables 与 Observer 之间的订阅发布关系（观察者模式） 如下：

* **订阅** ：Observer 通过 Observable 提供的 subscribe() 方法订阅 Observable。

* __发布__ ：Observable 通过回调 next 方法向 Observer 发布事件。

### Observer （观察者） 是一个包含三个方法的对象，每当 Observable 触发事件时，便会自动调用观察者的对应方法。

[Observer 接口定义](http://reactivex.io/rxjs/class/es6/MiscJSDoc.js~ObserverDoc.html):

```typescript
interface Observer<T> {
  closed?: boolean; // 标识是否已经取消对 Observable 对象的订阅
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}
```

Observer 中的三个方法的作用：

* next - 每当 Observable 发送新值的时候，next 方法会被调用

* error - 当 Observable 内发生错误时，error 方法就会被调用

* complete - 当 Observable 数据终止后，complete 方法会被调用。在调用 complete 方法之后，next 方法就不会再次被调用

> **complete 方法执行后，next 就会失效，所以不会输出 not work。**

另外观察者可以不用同时包含 next、complete、error 三种方法，它可以只包含一个 next 方法。

可以在调用 Observable 对象的 subscribe 方法时，依次传入 next、error、complete 三个函数，来创建观察者：

```javascript
observable.subscribe(
    value => { console.log(value); },
    error => { console.log('Error: ', error); },
    () => { console.log('complete'); }
);
```

Angular 中接收 URL 查询参数

```javascript
class ComComponent implements OnInit, OnDestroy {

  private sub : Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    //监听变化
    this.sub = this.activatedRoute.queryParamMap
        .subscribe(p => {
            console.log(p.get('url'))
        })
    //只用一次的话用快照
    console.log(this.route.snapshot.queryParamMap.get('url'));
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
    //销毁之后要取消订阅防止内存泄露
    //不过 ActivatedRoute 可以不需要 unsubscribe，ng 会智能处理
  }
}
```

## **推数据与拉数据**

Pull 和 Push 是数据生产者和数据的消费者两种不同的交流方式。

**什么是 Pull?**

在 "拉" 体系中，数据的消费者决定何时从数据生产者那里获取数据，而生产者自身并不会意识到什么时候数据将会被发送给消费者。

每一个 JavaScript 函数都是一个 "拉" 体系，函数是数据的生产者，调用函数的代码通过 ''拉出" 一个单一的返回值来消费该数据。

```javascript
const add = (a, b) => a + b;
let sum = add(3, 4);
```

ES6 介绍了 [iterator 迭代器](http://es6.ruanyifeng.com/#docs/iterator) 和 [Generator](http://es6.ruanyifeng.com/#docs/generator) 生成器 — 另一种 "拉" 体系，调用 iterator.next() 的代码是消费者，可从中拉取多个值。

**什么是 Push?**

在 "推" 体系中，数据的生产者决定何时发送数据给消费者，消费者不会在接收数据之前意识到它将要接收这个数据。

[Promise（承诺）](http://es6.ruanyifeng.com/#docs/promise) 是当今 JS 中最常见的 "推" 体系，一个 Promise （数据的生产者）发送一个 resolved value （成功状态的值）来执行一个回调（数据消费者），但是不同于函数的地方的是：Promise 决定着何时数据才被推送至这个回调函数。

RxJS 引入了 Observables （可观察对象），一个全新的 "推" 体系。一个可观察对象是一个产生多值的生产者，当产生新数据的时候，会主动 "推送给" Observer （观察者）。

### Promise

* 返回单个值
* 不可取消的

### Observable

* 随着时间的推移发出多个值
* 可以取消的
* 支持 map、filter、reduce 等操作符
* 延迟执行，当订阅的时候才会开始执行

![PullPush](https://asadahimeka.github.io/test/b/observer/img/pp.jpg)

## REF

[Observer Pattern 课件 - 刘伟 (CSU)](http://blog.csdn.net/lovelion/article/details/7862349)

[Observable 详解](https://segmentfault.com/a/1190000008809168)
