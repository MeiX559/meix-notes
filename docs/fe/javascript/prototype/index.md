# 原型与原型链

::: tip 背景
原型和原型链是 JavaScript 中非常重要的概念，也是比较难理解和混淆的一个知识点。

不过理解和掌握了它不仅能帮你巩固 JavaScript 知识，还能让你在面试中脱颖而出。如果你有兴趣，就跟着我一起走进原型与原型链的世界吧~
:::

## 前言

::: tip Q1
对于一切皆对象你怎么理解？
:::
关于怎么理解一切皆对象之前，我们先看一下 typeof 这个操作符检测的类型
| **类型** | **typeof 检测的结果** |
| :-------: | :-------------------: |
| Undefined | undefined |
| String | string |
| Number | number |
| Boolean | boolean |
| Symbol | symbol |
| BigInt | bigint |
| Function | function |
| **Null** | **object** |
| 其他对象 | object |

从上面这个表格中我们可以知道，typeof 检测数据类型的时候，对于值类型（undefined，string，number，boolean，symbol，bigint）它不是对象，剩下的（引用类型）都是对象包括 null。
因此对于一切皆对象这句话，我们可以这样理解，一切引用类型都是对象，对象是属性的集合。

要判断一个变量是不是对象，值类型可以直接使用 typeof 操作符判断，引用类型我们可以通过 instanceof 来判断，如下所示：

```js
// 普通函数
const fn = () => {}
// 构造函数
function Fn() {}
// 实例对象
const f1 = new Fn()

console.log(fn instanceof Object) // true
console.log(f1 instanceof Object) // true

console.log(typeof fn, typeof f1) // function object
```

### 构造函数

`疑问❓`：既然函数也是对象，那么为什么在 typeof function 的时候不是 object，而是 function 呢？直接叫 object 不行嘛~

带着这个疑问我们来看下第二个问题

::: tip Q2
函数与对象是什么关系？
:::
对象都是函数创建的，函数也是一种对象。要想真正理解这句话，我们先看一个属性 prototype。

## prototype

在 JavaScript 中，每个函数都有一个属性 prototype，prototype 这个属性的值是一个对象，默认情况下 prototype 这个对象只有一个 constructor 属性，指向这个函数本身。

举个 🌰：

```js
// 定义一个构造函数Person
function Person(name) {
  this.name = name
}
// 创建一个实例
const p1 = new Person('meixiu')
```

![prototype](./images/prototype_img1.png)

如上图所示，Person 这个构造函数有一个 prototype 属性，指向它的原型(Person.prototype),这个原型对象有一个 constructor 属性，指向构造函数 Person 本身。

现在我们给构造函数添加自定义的属性

```js
// 定义一个构造函数Person
function Person(name) {
  this.name = name
}
Person.prototype.city = '杭州'
Person.prototype.age = 18
// 创建一个实例
const p1 = new Person('meixiu')
console.log(p1.name, p1.age, p1.city) //meixiu 18 杭州
```

在 Person 构造函数中，已经有一个 name 属性，同时我们在它的原型上添加了两个属性，分别是 age 和 city，p1 对象是从 Person 构造函数中 new 出来的，此时我们打印 p1 对象的属性，可以看到它能够取到 Person.prototype 对象上的属性，即我们的实例对象可以调用原型对象上的属性（实例对象可以共享原型对象上的属性）。

## constructor

每一个原型对象都有一个 `constructor` 属性，指向函数本身。

```js
function Person(name) {
  this.name = name
}
console.log(Person.prototype) // {constructor: ƒ}
console.log(Person.prototype.constructor === Person) //true
```

## `__proto__`

每个对象都有一个隐藏的属性`__proto__`，成为隐式原型。

```js
function Person(name) {
  this.name = name
}
console.log(Person.prototype) // {constructor: ƒ}
console.log(p1.__proto__) // {constructor: ƒ}
console.log(p1.__proto__ === Person.prototype) //true
```

## instanceof

instanceof

## 原型链

## 参考文档

- [深入理解 JavaScript 原型](https://www.cnblogs.com/wangfupeng1988/p/3977924.html)
