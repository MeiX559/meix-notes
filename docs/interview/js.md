# JS 相关

## 关于 this 指向问题

当一个函数调用时，会创建一个执行上下文，这个上下文包括函数调用的一些信息(调用栈，传入参数，调用方式)，this 就指向这个执行上下文。

this 不是静态的，也并不是在编写的时候绑定的，而是在运行时绑定的。它的绑定和函数声明的位置没有关系，只取决于函数调用的方式。

在 `JavaScript` 中，要想完全理解 this，首先要理解 this 的绑定规则，this 的绑定规则一共有 5 种：

1. 默认绑定
2. 隐式绑定
3. 显式(硬)绑定
4. new 绑定
5. ES6 新增箭头函数绑定

下面来一一介绍一下 this 的绑定规则。

### 默认绑定

默认绑定通常是指函数独立调用，不涉及其他绑定规则。非严格模式下，this 指向 window，严格模式下，this 指向 undefined。

#### 非严格模式

```JS
var foo = 123;
function print() {
  this.foo = 234;
  console.log(this); // window
  console.log(foo); // 234
}
print();
```

在非严格模式下，print() 为默认绑定，this 指向 window。

#### 严格模式

```JS
'use strict';

var foo = 123;
function print() {
  // this.foo = 234;
  console.log('print this is:', this); // print this is: undefined
  console.log(foo); // 123
}
console.log('global this is:', this); // window

print();
```

:::warning 注意点
开启严格模式后，函数内部 this 指向 undefined，但全局对象 window 不会受影响
:::

#### let/const 定义的变量

```JS
let a = 1;
const b = 2;
var c = 3;
function print() {
  console.log(this.a); //undefined
  console.log(this.b); //undefined
  console.log(this.c); //3
}
print();
console.log(this.a); //undefined

```

let 和 const 定义的变量存在暂时性死区，在 print()函数中通过 this 访问其变量是 undefined，而且该变量也不会挂载到全局 window 上。

#### 对象内执行

```JS
a = 1;
function foo() {
    console.log(this.a);
}
const obj = {
    a: 10,
    bar() {
        foo(); // 1
    }
}
obj.bar();
```

foo 虽然在 obj 的 bar 函数中，但 foo 函数仍然是独立运行的，foo 中的 this 依旧指向 window 对象。

#### 函数内执行

```JS
var a = 1
function outer () {
  var a = 2
  function inner () {
    console.log(this.a) // 1
  }
  inner()
}
outer()
```

### 隐式绑定

函数的调用是在某个对象上触发的，即调用位置存在上下文对象，通俗点说就是 XXX.func()这种调用模式，此时 func 的 this 指向 XXX，但如果存在链式调用，例如 XXX.YYY.ZZZ.func，this 永远指向最后调用它的那个对象。

```JS
var a = 1;
function foo() {
    console.log(this.a);
}
// 对象简写，等同于 {a:2, foo: foo}
var obj = {a: 2, foo}
foo(); //1  默认绑定
obj.foo();//2  隐式绑定
```

#### 对象链式调用

```JS
var obj1 = {
    a: 1,
    obj2: {
        a: 2,
        foo(){
            console.log(this.a)
        }
    }
}
obj1.obj2.foo() // 2  隐式绑定
```

### 隐式绑定丢失问题

隐式绑定可是个调皮的东西，一不小心它就会发生绑定的丢失。一般会有两种常见的丢失：

- 使用另一个变量作为函数别名，之后使用别名执行函数
- 将函数作为参数传递时会被隐式赋值

隐式绑定丢失之后，this 的指向会启用默认绑定。

#### 取函数别名执行函数

```JS
a = 1;
var obj = {
  a: 2,
  foo() {
    console.log(this.a);
  }
};
// 将foo指向了obj.foo所指向的堆内存
var foo = obj.foo;
obj.foo(); //2 隐式绑定
// 执行foo,相当于执行了堆内存的函数，与obj无关，foo为默认绑定
foo(); //1  默认绑定

```

#### 函数作为参数传递

```JS
function foo() {
  console.log(this.a); //2
}
function doFoo(fn) {
  console.log(this); //window
  fn();
}
var obj = { a: 1, foo };
var a = 2;
// obj.foo作为参数传递，传递的是obj.foo所指向的堆内存，因此foo为默认绑定
doFoo(obj.foo);
```

虽然将 obj.foo 作为参数传递给 doFoo，但是由于 obj.foo 所指向的是堆内存，最终 foo 为默认绑定，指向的是 window，因此存在隐式绑定缺失的问题

### 显式绑定

显式绑定就是通过 call()、apply()、bind()等方法，强行改变 this 指向。这些方法虽然都可以改变 this 指向，但使用起来略有差别：

- call()和 apply()函数会立即执行
- bind()函数会返回新函数，不会立即执行函数
- call()和 apply()的区别在于 call 接受若干个参数，apply 接受数组。

```JS
function foo() {
  console.log(this.a);
}
var obj = { a: 1 };
var a = 2;

foo(); //2 默认绑定
foo.call(obj); //1 通过call改变this指向，此时this指向obj
foo.apply(obj); //1
foo.bind(obj); //bind不会立即执行，没有返回值
const bindFoo = foo.bind(obj);
bindFoo(); //1
```

#### 通过改变 this 指向解决隐式绑定缺失问题

```JS
function foo() {
  console.log(this.a); //2
}
function doFoo(fn) {
  console.log(this); //{ a: 1, foo }
  // 修改fn的this指向
  fn.call(this); //1
}
var obj = { a: 1, foo };
var a = 2;
// 修改doFoo()函数的this指向
doFoo.call(obj, obj.foo);
```

### new 绑定

### ES6 新增箭头函数绑定

## `if (a == '1' && a == '2' && a == '3')`在什么时候可以为 true

```js
var a = {
  value: 1,
  toString: function () {
    return this.value++
  }
}
// a为一个对象，重定义了toString方法，再进行a == '1'比较的时候，首先会进行类型转换，即将a转换为字符串

if (a == '1' && a == '2' && a == '3') {
  console.log('a的值为：', a) //a的值为：{value:4,toString:f}
}
```

[具体可看对象转换为字符串的转换规则](https://meix.netlify.app/fe/javascript/conversions/#%E5%AF%B9%E8%B1%A1%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%AD%97%E7%AC%A6%E4%B8%B2)
