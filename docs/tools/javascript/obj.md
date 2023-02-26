# Object

1. 介绍对象的两种类型
2. 创建对象并添加属性
3. 访问对象属性
4. 删除对象属性
5. 作为函数参数
6. 枚举对象的属性
7. 数据类型检测
8. Object 常用的 API

## 一、JavaScript 对象有两种类型

1. Native：在 ECMAScript 标准中定义和描述，包括 JavaScript 内置对象（数组，日期对象等）和用户自定义对象；
2. Host：在主机环境（如浏览器）中实现并提供给开发者使用，比如 Windows 对象和所有的 DOM 对象；

## 二、创建对象并添加成员

最简单的方法（即 Object Literal，对象字面变量），之后便可以向它添加属性。

字面量：字面量表示如何表达这个值，一般除去表达式，给变量赋值时，等号右边都可以认为是字面量。

```javascript
// 1. 创建空对象后，在添加属性
const obj = { }
obj.uname = 'dengke'
obj.fn = () => {
    console.log('ggg')
}
console.log(obj) // { uname: 'dengke', fn: ƒ }

// 2. 创建对象并且直接添加属性 (常用)
const obj1 = {
    uname：'dengke',
    fn: () => {
        console.log('ggg')
    }
}
console.log(obj1) // { uname: "dengke", fn: ƒ }
```

:::tip 补充

扩展运算符（spread）是三个点（`...`）也可以创建对象（返回一个新对象），注意这是一个浅拷贝
:::

```javascript
const obj = { name: 'dengke' }
const obj1 = {
  age: 18,
  temp: {
    a: 10
  }
}

const obj2 = { ...obj, ...obj1 }
console.log(obj2) // { name: 'dengke', age: 18, temp: { a: 10 } }

obj2.temp.a = 20
console.log(obj2) // { name: 'dengke', age: 18, temp: { a: 20 } }
console.log(obj1) // { name: 'dengke', age: 18, temp: { a: 20 } }
```

## 三、访问对象属性

```javascript
const obj = {
  info: 'wakaka',
  inner: {
    a: 10,
    b: 20
  },
  arr: [1, 2],
  sayHi: (name) => {
    console.log(`hi,${name}`)
  }
}

// 用 dot(点 .) 的方式访问
console.log(obj.info) // wakaka
console.log(obj.inner) // {"a":10,"b":20}
console.log(obj.arr) // [1,2]
obj.sayHi('dengke') // hi,dengke

// 用 [] 的方式访问
console.log(obj['info']) // wakaka
console.log(obj['inner']) // {"a":10,"b":20}
console.log(obj['arr']) // [1,2]
obj['sayHi']('dengke') // hi,dengke
```

补充

- 如果要访问的对象不存在，可以使用 逻辑运算符 || 指定默认值

  - 只要“||”前面为 false,不管“||”后面是 true 还是 false，都返回“||”后面的值。
  - 只要“||”前面为 true,不管“||”后面是 true 还是 false，都返回“||”前面的值。

```javascript
console.log(obj.age || 18) // 18
```

- 很多时候，想根据这个值是否为空来做接下来的操作，可以使用空值运算符 (`??`) （es11）

有一个冷门运算符`??`可以判断 undefined 和 null，这样是比较符合普遍需求的。

```javascript
const age = 0
const a = age ?? 123
console.log(a) // 0
```

- 可选链式操作符（`?.`） （es11）

这是当对象上没有这个键的时候，不会报错，而是赋值`undefined`

```javascript
const foo = { name: 'zengbo' }
let a = foo.name?.toUpperCase() // "ZENGBO"
let b = foo.name?.firstName?.toUpperCase() // "undefined"
```

## 四、删除对象属性

1. 利用关键字 `delete`

```javascript
const o = {
  p: 10,
  m: 20
}

delete o.p
console.log(o) // { m: 20 }
// 删除对象的属性后，在访问返回 undefined
console.log(o.p) // undefined
```

## 五、作为函数参数

```javascript
const displayPerson = (person) => {
  console.log(`name: ${person.name || '无名氏'}`)
  console.log(`age: ${person['age'] || 0}`)
}

displayPerson({ name: 'dengke', age: 18 })
// name: dengke
// age: 18

displayPerson({})
// name: 无名氏
// age: 0
```

## 六、枚举对象的属性

在 JS 里面枚举对象属性一共有三种方法：

1. `for in`: 会遍历对象中所有的可枚举属性（包括自有属性和继承属性）
2. `Object.keys()`: 会返回一个包括所有的可枚举的自有属性的名称组成的数组
3. `Object.getOwnPropertyNames()`: 会返回自有属性的名称 （不管是不是可枚举的）

### 1. `for...in` 会遍历对象中所有的可枚举属性（包括自有属性和继承属性）

```javascript
const obj = {
  itemA: 'itemA',
  itemB: 'itemB'
}

// 使用Object.create创建一个原型为obj的对象 （模拟继承来的属性）
var newObj = Object.create(obj)

newObj.newItemA = 'newItemA'
newObj.newItemB = 'newItemB'

for (i in newObj) {
  console.log(i)
}
// newItemA
// newItemB
// itemA
// itemB

// 现在我们将其中的一个属性变为不可枚举属性
Object.defineProperty(newObj, 'newItemA', {
  enumerable: false
})

for (i in newObj) {
  console.log(i)
}
// newItemB
// itemA
// itemB
```

:::tip 补充
如果不想让`for...in`枚举继承来的属性可以借助`Object.prototype.hasOwnProperty()`
:::

```javascript
// 接上例
for (i in newObj) {
  if (newObj.hasOwnProperty(i)) console.log(i)
}
// newItemB
```

`Object.prototype.hasOwnProperty()`该方法在下文有更具体的介绍

### 2. `Object.keys()`: 会返回一个包括所有的可枚举的自有属性的名称组成的数组

```javascript
// 接上例
const result = Object.keys(newObj)

console.log(result) // ["newItemB"]
```

`Object.keys()`该方法在下文有更具体的介绍

### 3. `Object.getOwnPropertyNames()` 会返回自有属性的名称 （不管是不是可枚举的）

```javascript
// 接上例
const result = Object.keys(newObj)

console.log(result) // ['newItemA','newItemB']
```

`Object.getOwnPropertyNames()`该方法在下文有更具体的介绍

## 七、数据类型检测

- `typeof` 常用 多用于原始数据类型的判断

```javascript
const fn = function (n) {
  console.log(n)
}
const str = 'string'
const arr = [1, 2, 3]
const obj = {
  a: 123,
  b: 456
}
const num = 1
const b = true
const n = null
const u = undefined

console.log(typeof str) // string
console.log(typeof arr) // object
console.log(typeof obj) // object
console.log(typeof num) // number
console.log(typeof b) // boolean
console.log(typeof n) // object null是一个空的对象
console.log(typeof u) // undefined
console.log(typeof fn) // function
```

通过上面的检测可以发现`typeof`检测的`Array`和`Object`的返回类型都是`Object`，因此用`typeof`是无法检测出来数组和对象的。

- `tostring` 常用 最实用的检测各种类型

经常会把这个封装成一个函数，使用起来更加方便

```javascript
/**
 * @description: 数据类型的检测
 * @param {any} data 要检测数据类型的变量
 * @return {string} type 返回具体的类型名称【小写】
 */
const isTypeOf = (data) => {
  return Object.prototype.toString
    .call(data)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase()
}

console.log(isTypeOf({})) // object
console.log(isTypeOf([])) // array
console.log(isTypeOf('ss')) // string
console.log(isTypeOf(1)) // number
console.log(isTypeOf(false)) // boolean
console.log(isTypeOf(/w+/)) // regexp
console.log(isTypeOf(null)) // null
console.log(isTypeOf(undefined)) // undefined
console.log(isTypeOf(Symbol('id'))) // symbol
console.log(isTypeOf(() => {})) // function
```

## 八、Object 常用的 API

### 1. `Object.assign()`

`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。常用来合并对象。

```javascript
const obj1 = { a: 1, b: 2 }
const obj2 = { b: 4, c: 5 }

const obj3 = Object.assign(obj1, obj2)

const obj4 = Object.assign({}, obj1) // 克隆了obj1对象

console.log(obj1) // { a: 1, b: 4, c: 5 } 对同名属性b进行了替换 obj1发生改变是因为obj2赋给了obj1

console.log(obj2) // { b: 4, c: 5 }

console.log(obj3) // { a: 1, b: 4, c: 5 }

console.log(obj4) // { a: 1, b: 4, c: 5 }
```

#### 语法

```javascript
Object.assign(target, ...sources)
```

- 参数：`target` 目标参数，`sources`源对象
- 返回值：目标对象

:::warning 注意

- 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。
- `Object.assign` 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。
- `assign`其实是浅拷贝而不是深拷贝

也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。同名属性会替换。
:::

```javascript
const obj5 = {
  name: 'dengke',
  a: 10,
  fn: {
    sum: 10
  }
}

const obj6 = Object.assign(obj1, obj5)
console.log(obj6) // { a: 10, b: 2, name: 'dengke', fn: {…}}
console.log(obj1) // {a: 10, b: 2, name: 'dengke', fn: {…}} 对同名属性a进行了替换
```

- `Object.assign` 不会在那些`source`对象值为 null 或 undefined 的时候抛出错误。

### 2. `Object.keys()`

上边枚举对象属性时有用到了`Object.keys()`，在这里就具体为大家介绍一下它。

`Object.keys()` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致。

与`Object.values()`相似，区别在于这个返回的是数据的属性就是`key`。接下来就会介绍`Object.values()`，不要着急。😊

```javascript
const arr = ['a', 'b', 'c']
console.log(Object.keys(arr)) // ['0', '1', '2']

const obj = { 0: 'a', 1: 'b', 2: 'c' }
console.log(Object.keys(obj)) // ['0', '1', '2']

const obj2 = { 100: 'a', 2: 'b', 7: 'c' }
console.log(Object.keys(obj2)) // ['2', '7', '100']
```

#### 语法

```javascript
Object.keys(obj)
```

- 参数：`obj`要返回其枚举自身属性的对象。
- 返回值：一个表示给定对象的所有可枚举属性的字符串数组。

:::warning 注意

- 在 ES5 里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 TypeError。在 ES2015 中，非对象的参数将被强制转换为一个对象。
  :::

```javascript
Object.keys('foo') // TypeError: "foo" is not an object       (ES5 code)

Object.keys('foo') // ["0", "1", "2"]                         (ES2015 code)
```

### 3. `Object.values()`

`Object.values()` 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用`for...in`循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

与`Object.keys()`相似，区别在于这个返回的是数据的值也就是 value

```javascript
const obj1 = { foo: 'bar', baz: 42 }
console.log(Object.values(obj1)) // ['bar', 42]

const obj2 = { 0: 'a', 1: 'b', 2: 'c' }
console.log(Object.values(obj2)) // ['a', 'b', 'c']
```

#### 语法

```javascript
Object.values(obj)
```

- 参数：`obj`被返回可枚举属性值的对象。
- 返回值：一个包含对象自身的所有可枚举属性值的数组。

:::warning 注意

- 对象`key`为`number`的话，会从升序枚举返回。
  :::

```javascript
const obj3 = { 100: 'a', 2: 'b', 7: 'c' }
console.log(Object.values(obj3)) // ['b', 'c', 'a']
```

### 4. `Object.entries(obj)`

`Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组。

可使用`Object.fromEntries()`方法，相当于反转了`Object.entries()`方法返回的数据结构。接下来也会介绍`Object.fromEntries()`

```javascript
const obj1 = {
  name: 'dengke',
  age: 18
}

for (const [key, value] of Object.entries(obj1)) {
  console.log(`${key}: ${value}`)
}
// "name: dengke"
// "age: 18"

const obj2 = { foo: 'bar', baz: 42 }
console.log(Object.entries(obj2)) // [ ['foo', 'bar'], ['baz', 42] ]

const obj3 = { 0: 'a', 1: 'b', 2: 'c' }
console.log(Object.entries(obj3)) // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
```

#### 语法

```javascript
Object.entries(obj)
```

- 参数：`obj`可以返回其可枚举属性的键值对的对象。
- 返回值：给定对象自身可枚举属性的键值对数组。

:::tip 补充

- 将`Object`转换为`Map`，`new Map()`构造函数接受一个可迭代的`entries`。借助`Object.entries`方法可以很容易的将`Object`转换为`Map`:
  :::

```javascript
const obj = { foo: 'bar', baz: 42 }
const map = new Map(Object.entries(obj))
console.log(map) // Map { foo: "bar", baz: 42 }
```

### 5. `Object.fromEntries()`

`Object.fromEntries()` 方法把键值对列表转换为一个对象。与`Object.entries()`相反。相当于反转了`Object.entries()`方法返回的数据结构。（下面补充里有具体的演示）

```javascript
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
])

const obj = Object.fromEntries(entries)

console.log(obj)
// Object { foo: "bar", baz: 42 }
```

#### 语法

```javascript
Object.fromEntries(iterable)
```

- 参数：`iterable`类似`Array`、`Map`或者其它实现了可迭代协议的可迭代对象。
- 返回值：一个由该迭代对象条目提供对应属性的新对象。

#### 补充

- `Map` 转化为 `Object`

通过 `Object.fromEntries`， 可以将`Map`转换为`Object`:

```javascript
const map = new Map([
  ['foo', 'bar'],
  ['baz', 42]
])
const obj = Object.fromEntries(map)
console.log(obj)
// { foo: "bar", baz: 42 }
```

- `Array` 转化为 `Object`

通过 `Object.fromEntries`， 可以将`Array`转换为`Object`:

```javascript
const arr = [
  ['0', 'a'],
  ['1', 'b'],
  ['2', 'c']
]
const obj = Object.fromEntries(arr)
console.log(obj)
// { 0: "a", 1: "b", 2: "c" }
```

- 对象转换

`Object.fromEntries` 是与 `Object.entries()`相反的方法，用 数组处理函数 可以像下面这样转换对象：

```javascript
const object1 = { a: 1, b: 2, c: 3 }

const object2 = Object.fromEntries(Object.entries(object1).map(([key, val]) => [key, val * 2]))

// Object.entries(object1) >>> [["a",1],["b",2],["c",3]]

console.log(object2) // { a: 2, b: 4, c: 6 }
```

### 6. `Object.prototype.hasOwnProperty()`

上边枚举对象属性时为了避免`for..in`遍历继承来的属性，给大家补充了可以借助`Object.prototype.hasOwnProperty()`方法进行判断，在这里也具体为大家介绍一下它。
`hasOwnProperty()` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

```javascript
const obj1 = {}
obj1.property1 = 42

console.log(obj1.hasOwnProperty('property1')) // true
console.log(obj1.hasOwnProperty('toString')) // false
console.log(obj1.hasOwnProperty('hasOwnProperty')) // false
```

#### 语法

```javascript
obj.hasOwnProperty(prop)
```

- 参数：`prop` 要检测的属性的`String`字符串形式表示的名称，或者`Symbol`。
- 返回值：用来判断某个对象是否含有指定的属性的布尔值`Boolean`。

::: warning 注意

- 只会对自身属性进行判断，继承来的一律返回`false`。配合`for...in`使用，可以避免其遍历继承来的属性。
  :::

```javascript
const o = new Object()
o.prop = 'exists'

console.log(o.hasOwnProperty('prop')) // true
console.log(o.hasOwnProperty('toString')) // false
console.log(o.hasOwnProperty('hasOwnProperty')) // false
```

- 即使属性的值是 `null`或 `undefined`，只要属性存在，`hasOwnProperty` 依旧会返回 `true`。

```javascript
const o = new Object()
o.propOne = null
o.propTwo = undefined

console.log(o.hasOwnProperty('propOne')) // true
console.log(o.hasOwnProperty('propTwo')) // true
```

### 7. `Object.getOwnPropertyNames()`

上边枚举对象属性时也有用到该方法，在这里也具体为大家介绍一下它。

`Object.getOwnPropertyNames()` 返回一个数组，该数组对元素是 `obj`自身拥有的枚举或不可枚举属性名称字符串。数组中枚举属性的顺序与通过`for...in`循环`Object.keys`迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。

```javascript
const arr = ['a', 'b', 'c']
console.log(Object.getOwnPropertyNames(arr).sort()) // ["0", "1", "2", "length"]

// 类数组对象
const obj = { 0: 'a', 1: 'b', 2: 'c' }
console.log(Object.getOwnPropertyNames(obj).sort()) // ["0", "1", "2"]

// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj).forEach(function (val, idx, array) {
  console.log(val + ' -> ' + obj[val])
})
// 0 -> a
// 1 -> b
// 2 -> c

// 不可枚举属性
const my_obj = Object.create(
  {},
  {
    getFoo: {
      value: function () {
        return this.foo
      },
      enumerable: false
    }
  }
)
my_obj.foo = 1

console.log(Object.getOwnPropertyNames(my_obj).sort())
// ["foo", "getFoo"]
```

#### 语法

```javascript
obj.getOwnPropertyNames(obj)
```

-参数：`obj`一个对象，其自身的可枚举和不可枚举属性的名称被返回。

- 返回值：在给定对象上找到的自身属性对应的字符串数组。

#### 补充

- `Object.getOwnPropertyNames`和`Object.keys`的区别：`Object.keys`只适用于可枚举的属性，而`Object.getOwnPropertyNames`返回对象的全部属性名称(包括不可枚举的)。

```javascript
'use strict'(function () {
  // 人类的构造函数
  const person = function (name, age, sex) {
    this.name = name
    this.age = age
    this.sex = sex
    this.sing = () => {
      console.log('sing')
    }
  }

  // new 一个ladygaga
  const gaga = new person('ladygaga', 26, 'girl')

  // 给嘎嘎发放一个不可枚举的身份证
  Object.defineProperty(gaga, 'id', {
    value: '1234567890',
    enumerable: false
  })

  //查看gaga的个人信息
  const arr = Object.getOwnPropertyNames(gaga)
  console.log(arr) // name, age, sex, sing, id

  // 注意和getOwnPropertyNames的区别，不可枚举的id没有输出
  const arr1 = Object.keys(gaga)
  console.log(arr1) // name, age, sex, sing
})()
```

- 如果只要获取到可枚举属性，可以用`Object.keys`或用`for...in`循环（`for...in`会获取到原型链上的可枚举属性，可以使用`hasOwnProperty()`方法过滤掉）。
  - 获取不可枚举的属性，可以使用`Array.prototype.filter()`方法，从所有的属性名数组（使用`Object.getOwnPropertyNames()`方法获得）中去除可枚举的属性（使用`Object.keys()`方法获得），剩余的属性便是不可枚举的属性了：

```javascript
const target = myObject
const enum_and_nonenum = Object.getOwnPropertyNames(target)
const enum_only = Object.keys(target)
const nonenum_only = enum_and_nonenum.filter(function (key) {
  const indexInEnum = enum_only.indexOf(key)
  if (indexInEnum == -1) {
    // 没有发现在enum_only健集中意味着这个健是不可枚举的,
    // 因此返回true 以便让它保持在过滤结果中
    return true
  } else {
    return false
  }
})

console.log(nonenum_only)
```

::: warning 注意

- 在 ES5 中，如果参数不是一个原始对象类型，将抛出一个 TypeError 异常。在 ES2015 中，非对象参数被强制转换为对象。
  :::

```javascript
Object.getOwnPropertyNames('foo') // TypeError: "foo" is not an object     (ES5 code)

Object.getOwnPropertyNames('foo') // ['length', '0', '1', '2']             (ES2015 code)
```

### 8. `Object.freeze()`

`Object.freeze()` 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。`freeze()` 返回和传入的参数相同的对象。

```javascript
const obj = {
  prop: 42
}

Object.freeze(obj)

obj.prop = 33

console.log(obj.prop)
//  42
```

#### 语法

```javascript
obj.freeze(obj)
```

- 参数：`obj`要被冻结的对象。
- 返回值：被冻结的对象。

#### 补充

- 被冻结的对象是不可变的。但也不总是这样。下例展示了冻结对象不是常量对象（浅冻结）。

```javascript
const obj1 = {
  internal: {}
}
Object.freeze(obj1)

obj1.internal.a = 'aValue'
console.log(obj1.internal.a) // 'aValue'
```

- 要使对象不可变，需要递归冻结每个类型为对象的属性（深冻结）。

```javascript
// 深冻结函数.
function deepFreeze(obj) {
  // 取回定义在obj上的属性名
  const propNames = Object.getOwnPropertyNames(obj)

  // 在冻结自身之前冻结属性
  propNames.forEach(function (name) {
    const prop = obj[name]

    // 如果prop是个对象，冻结它
    if (typeof prop == 'object' && prop !== null) deepFreeze(prop)
  })

  // 冻结自身
  return Object.freeze(obj)
}

const obj2 = {
  internal: {}
}

deepFreeze(obj2)
obj2.internal.a = 'anotherValue'
obj2.internal.a // undefined
```

### 9. `Object.isFrozen()`

`Object.isFrozen()` 方法判断一个对象是否被冻结。

```javascript
// 一个对象默认是可扩展的, 所以它也是非冻结的。
Object.isFrozen({}) // false

// 一个不可扩展的空对象同时也是一个冻结对象。
var vacuouslyFrozen = Object.preventExtensions({})
Object.isFrozen(vacuouslyFrozen) // true

var frozen = { 1: 81 }
Object.isFrozen(frozen) // false

// 使用Object.freeze是冻结一个对象最方便的方法.
Object.freeze(frozen)
Object.isFrozen(frozen) // true
```

#### 语法

```javascript
obj.isFrozen(obj)
```

- 参数：`obj`被检测的对象。
- 返回值：表示给定对象是否被冻结的`Boolean`。

:::warning 注意

- 在 ES5 中，如果参数不是一个对象类型，将抛出一个`TypeError`异常。在 ES2015 中，非对象参数将被视为一个冻结的普通对象，因此会返回`true`。
  :::

```javascript
Object.isFrozen(1) // (ES5 code)
// TypeError: 1 is not an object

Object.isFrozen(1) // (ES2015 code)
// true
```
