# 数据类型

`JavaScript`分为基本类型和引用类型两种

## 基本类型

> 注: 基本数据类型也可以叫原始数据类型

在`ES2020`标准下`JavaScript` 有七种基本数据类型:

- 空值(**`null`**)
- 未定义(**`undefined`**)
- 布尔值(**`boolean`**)
- 数字(**`number`**)
- 字符串(**`string`**)
- **`BigInt`** 类型 ([ES2020 引入](https://es6.ruanyifeng.com/#docs/number#BigInt-%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B))
- 符号(**`symbol`**) ([ES6 引入](https://es6.ruanyifeng.com/#docs/symbol))

## 引用类型

除了基本类型以外的都是引用类型，包括 Object，Array，Function，Date 等。

## 判断数据类型的方法

### typeof

| **类型**  | **typeof 检测的结果** |
| :-------: | :-------------------: |
| Undefined |       undefined       |
| **Null**  |      **object**       |
|  String   |        string         |
|  Number   |        number         |
|  Boolean  |        boolean        |
|  Symbol   |        symbol         |
|  BigInt   |        bigint         |
| Function  |       function        |
| 其他对象  |        object         |

1、typeof 运算符总是返回一个字符串

```js
console.log(typeof typeof 42); // string
typeof 42返回的是字符串类型的"number",再typeof "number"，返回的是”string“
```

2、除 null 外，`typeof` 可以判断所有基本类型
为什么 typeof null === 'object' ？
在 `JavaScript` 最初的实现中，`JavaScript` 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"。

3、除了 Function 外，`typeof` 判断的其他引用类型都为"object"，无法区分数组和对象

### instanceof

**`instanceof`** 运算符用于检测构造函数的 **`prototype`** 属性是否出现在某个实例对象的原型链上。
不能判断基本类型，对于引用类型只能判断原型链上的从属关系。

```js
// 基本类型
console.log('str' instanceof String) //false
console.log(1 instanceof Number) //false
console.log(true instanceof Boolean) //false

// 引用类型
const obj = {}
const str = new String()

console.log([] instanceof Array) //true
console.log([] instanceof Object) //true
console.log(obj instanceof Object) //true

// 通过构造函数创建的（new String())包装对象
console.log(str instanceof String) //true
console.log(str instanceof Object) //true
```

### constructor

不能判断 null 和 undefined 类型，null 和 undefined 没有构造函数，不能使用 constructor 判断它的类型。

```js
// 基本类型
true.constructor === Boolean // true
;(1).constructor === Number //true
'1'.constructor === String //true

// 引用类型
;({}.constructor === Object) // true
;[].constructor === Array //true
```

### toString

`toString`是`Object`的原型方法，调用该方法，返回当前对象的内部属性`[[class]]`，如果在自定义的对象中没有覆盖`toString`方法，那么返回的是"**[object,type]**"，其中 type 是对象的类型

<<< @/fe/javascript/types/type.js
