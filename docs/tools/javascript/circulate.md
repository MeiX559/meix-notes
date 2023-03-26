# 循环方法

## 数组遍历方法

- forEach
- map
- for of
- filter
- reduce,reduceRight
- some,every
- find,findIndex
- keys,values,entries

### forEach()

`forEach()`方法对数组的每个元素执行一次给定的函数。这个方法即使指定了 return 值，它的返回值也是 undefined。

**语法**：arr.forEach(callback[currentValue[,index[,array]]] (,thisArg))

**参数**：**callback**：为数组中每个元素执行的函数，该函数接收一至三个参数：

- **currentValue**：数组中正在处理的**当前元素**
- **index**：数组中正在处理的当前元素的**索引**
- **array**：forEach()方法**正在操作的数组**
- **thisArg**：可选参数，当执行回调函数 callback 时，用作**this**的值

**返回值**：undefined

```js
const arr = [
  { name: 'Bruce', num: 1 },
  { name: 'Li', num: 3 },
  { name: 'Liang', num: 10 },
  { name: 'Lee', num: 20 }
]
arr.forEach((item, index, arr) => {
  console.log(`${item.name} ---- ${index}`)
  if (item.name === 'Bruce') return
})
// Bruce ---- 0
// Li ---- 1
// Liang ---- 2
// Lee ---- 3
```

:::warning 注意点

1. 无法中途退出循环，只能通过 return 退出本次回调，进入下一次回调。使用 break 语句中断循环会报错。
2. 空元素不会遍历，但是 undefined，null 会遍历。
3. 即使 return 了一个值它也总是返回 undefined 值。
   :::

```js
let arr = [1, 2, , 3] //arr[2]元素是空的，不会遍历(undefined，null会遍历)
let obj = { name: 'Bruce' }
let result = arr.forEach(function (item, index, arr) {
  arr[3] = '改变元素'
  arr.push('添加到数组末尾')
  console.log(item, index) // 分别打印1,2,改变元素，arr[2]元素是空的，不会遍历
  console.log(this.name) //打印三次
  // break   //break会报错
  return item //return 只会结束本次回调，下次回调依然会继续执行
  console.log(item)
}, obj)
console.log(result) //undefined   即使有return值，返回的依然是undefined
```

### map()

map()方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

**语法**：let new_array = arr.map(function callback(currentValue[, index[, array]])

:::tip 参数
**callback**：生成新数组元素的函数，接收三个参数：

- **currentValue**：数组中正在处理的**当前元素**
- **index**：（可选）数组中正在处理的当前元素的**索引**
- **array**：（可选）map()方法**正在操作的数组**
- **thisArg**：可选参数，当执行回调函数 callback 时，用作**this**的值
  :::

**返回值**：一个由原数组每个元素执行回调函数的结果组成的新数组。

```js
let arr = [1, 2, 3, '4']
let result = arr.map((item, index, array) => {
  return item * 2
})
console.log(result) // [2, 4, 6, 8]
console.log(arr) //[1, 2, 3, '4']

let arr = [1, 2, , 3, undefined, null]
let result = arr.map((item, index, array) => {
  return item * 2
})
console.log(result) // [2, 4, 空, 6, NaN, 0]
console.log(arr) //[1, 2, 空, 3, undefined, null]
```

:::warning 注意点
空值会直接忽略，不会进行遍历
:::

### for of

:::tip
一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 for...of 循环遍历它的成员。也就是说，for...of 循环内部调用的是数据结构的 Symbol.iterator 方法。
:::

原生具备 Iterator 接口的数据结构如下：

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

### filter()

filter()方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。

**语法**：let new_array = arr.filter(function callback(currentValue[, index[, array]])

:::tip 参数
**callback**：用来测试数组的每个元素的函数，返回 true 表示该元素通过测试，保留该元素，false 则不保留，它接收三个参数：

- **currentValue**：数组中正在处理的**当前元素**
- **index**：（可选）数组中正在处理的当前元素的**索引**
- **array**：（可选）调用了 filter 的数组本身
- **thisArg**：可选参数，当执行回调函数 callback 时，用作**this**的值
  :::

**返回值**：一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

```js
let arr = [1, 2, , 3, undefined, null, 66, 33]
let result = arr.filter((item, index, array) => {
  return item > 10 //返回所有大于10的元素组成的数组
})
console.log(result) //  [66, 33]
console.log(arr) //[1, 2, 空, 3, undefined, null, 66, 33]
```

### reduce()

`reduce()`方法对数组中的每个元素按序执行一个由您提供的 **reducer** 函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

**语法**： array.reduce(function(previousValue, currentValue, currentIndex, array), initialValue)

:::tip **参数**

- previousValue：上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 initialValue，其值则为 initialValue，否则为数组索引为 0 的元素 array[0]。
- currentValue：数组中正在处理的元素。在第一次调用时，若指定了初始值 initialValue，其值则为数组索引为 0 的元素 array[0]，否则为 array[1]。
- currentIndex：（可选）数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，否则从索引 1 起始。
- array:（可选）用于遍历的数组

- initialValue:(可选）
  作为第一次调用 callback 函数时参数 previousValue 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。

:::

**返回值**：使用 reducer 回调函数遍历整个数组后的结果。

```js
let arr = [1, 2, 3, 4, 5]
const callbackFun = (pre, cur, curIndex, array) => {
  return pre + cur
}
let result = arr.reduce(callbackFun, 0) //指定初始值为0
let result1 = arr.reduce(callbackFun, 2) //指定初始值为2
let result2 = arr.reduce(callbackFun) //不指定初始值
console.log(result) // 15
console.log(result1) // 17
console.log(result2) // 15
```

### reduceRight()

从右往左累加，其他的和 reduce 类似。

### some()

some()方法测试数组中是不是至少有一个元素通过了被提供的函数测试，它返回的是一个 Boolean 类型的值。

**语法**：arr.some(callback[element[, index[, array]]] (, thisArg))

:::tip 参数
**callback**：用来测试每个元素的函数，它接收三个参数：

- **currentValue**：数组中正在处理的**当前元素**
- **index**：（可选）数组中正在处理的当前元素的**索引**
- **array**：（可选）调用了 some()的数组本身
- **thisArg**：可选参数，当执行回调函数 callback 时，用作**this**的值
  :::

**返回值**：数组中有至少一个元素通过回调函数的测试就会返回**true**；所有元素都没有通过回调函数的测试返回值才会为 false。

:::warning 注意点
如果用一个空数组进行测试，那么在任何情况下它返回的都是 false
返回规则：

1. 如果有一个元素满足条件，则表达式返回 true，剩余的元素不会再执行检测。
2. 如果没有满足条件的元素，就返回 false。

:::

```js
let arr = [1, 2, 3, 4, 5]
let result = arr.some((item, index, array) => {
  return item > 5
})
let result1 = arr.some((item, index, array) => {
  return item > 2
})
console.log(result) // false
console.log(result1) // true

//如果用一个空数组进行测试，那么在任何情况下它返回的都是false
let a = []
let noElement = a.some((item) => {
  item > 3
})
console.log(noElement) // false
```

### every()

every()方法用于测试一个数组内的所有元素是否都能通过指定函数的测试，它返回一个布尔值。

**语法**：arr.every(callback[element[, index[, array]]] (, thisArg))
参数与 some 方法类似。

**返回值**：如果回调函数的每一次返回都为 true，则返回 true，否则返回 false。

:::warning 注意点
若收到一个空数组，此方法在任何情况下都返回 true
:::

```js
let arr = [1, 2, 3, 4, 5]
let result = arr.every((item, index, array) => {
  return item > 5
})
let result1 = arr.every((item, index, array) => {
  return item < 10
})
console.log(result) // false
console.log(result1) // true

//若收到一个空数组，此方法在任何情况下都返回true
let a = []
let noElement = a.every((item) => {
  item > 3
})
console.log(noElement) // true
```

### find()

find()方法返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined。

**语法**：arr.find()(callback[,thisArg])

**返回值**：数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。

```js
let arr = [1, 2, 3, 4, 5]
let result = arr.find((item) => item > 3) //返回第一个满足条件的元素的值
console.log(result) // 4
```

### findIndex()

findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引，若没有找到对应元素则返回-1。

**语法**：arr.findIndex()(callback[,thisArg])

:::tip 参数
**callback**：针对数组中的每个元素，都会执行该回调函数，执行时会自动传入下面三个参数：

- **currentValue**：数组中正在处理的**当前元素**
- **index**：数组中正在处理的当前元素的**索引**
- **array**：（可选）调用了 findIndex()的数组本身
- **thisArg**：可选参数，当执行回调函数 callback 时，用作**this**的值
  :::
  **返回值**：数组中通过提供测试函数的第一个元素的索引，否则返回-1.

```js
let arr = [1, 2, 3, 4, 5]
let result = arr.findIndex((item) => item > 3) //返回第一个满足条件元素的索引
console.log(result) // 3
```

### entries(),keys(),values()

这三个方法都返回一个新的 Array Iterator 对象，对象根据方法不同包含不同的值；

entries()方法返回的对象中包含数组中每个索引的键/值对，keys()方法返回的对象中包含数组中每个索引的键，values()方法返回的对象中包含数组中每个索引的值。

```js
let arr = ['a', 'b', 'c']
for (let [key, value] of arr.entries()) {
  console.log(key, value)
  // 0 'a'
  // 1 'b'
  // 2 'c'
}

for (let key of arr.keys()) {
  console.log(key)
  // 0
  // 1
  // 2
}

for (let value of arr.values()) {
  console.log(value)
  // a
  // b
  // c
}
```

如果不使用 for...of 循环，可以手动调用遍历器对象的 next 方法进行遍历

entries()方法返回值：一个新的 Array Iterator 对象。

Array Iterator 是对象，它的原型上有一个 next 方法，可用于变量迭代器取得原数组的[key,value]

```js
let arr = ['a', 'b', 'c', 1, 2, 3]
console.log(arr.entries())
console.log(arr.entries().next())
```

```js
let arr = ['a', 'b', 'c']
let entries = arr.entries()
console.log(entries.next().value) //  [0, 'a']
console.log(entries.next().value) // [1, 'b']
console.log(entries.next().value) //[2, 'c']
```

## 对象遍历方法

- for in
- Object.keys(),Object.values(),Object.entries()
- Object.getOwnPropertyNames()
- Object.getOwnPropertySymbols()
- Reflect.ownKeys()

### for in

:::tip
for/in 语句用于循环对象属性。

循环中的代码每执行一次，就会对数组的元素或者对象的属性进行一次操作。
:::

for…in 主要用于循环对象属性。循环中的代码每执行一次，就会对对象的属性进行一次操作。

其语法如下：

```js
for (const i in object) {
  执行的代码块
}
```

示例：

```js
const obj = { a: 1, b: 2, c: 3 }

for (const i in obj) {
  console.log('键名：', i, '键值：', obj[i])
}
// 键名： a 键值： 1
// 键名： b 键值： 2
// 键名： c 键值： 3
```

:::warning 注意点
for in 方法不仅会遍历当前的对象所有的可枚举属性，还会遍历其原型链上的属性。
:::

### Object.keys(),Object.values(),Object.entries()

#### Object.keys()

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

语法：

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

#### `Object.values()`

`Object.values()` 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用`for...in`循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

与`Object.keys()`相似，区别在于这个返回的是数据的值也就是 value

```javascript
const obj1 = { foo: 'bar', baz: 42 }
console.log(Object.values(obj1)) // ['bar', 42]

const obj2 = { 0: 'a', 1: 'b', 2: 'c' }
console.log(Object.values(obj2)) // ['a', 'b', 'c']
```

语法：

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

#### `Object.entries(obj)`

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

语法：

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

### Object.getOwnPropertyNames()

`Object.getOwnPropertyNames()`方法与 `Object.keys()`类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。但它能返回不可枚举的属性。

```js
let a = ['Hello', 'World']

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

### Object.getOwnPropertySymbols()

`Object.getOwnPropertySymbols()` 方法返回对象自身的 `Symbol` 属性组成的数组，不包括字符串属性：

```js
let obj = { a: 1 }

// 给对象添加一个不可枚举的 Symbol 属性
Object.defineProperties(obj, {
  [Symbol('baz')]: {
    value: 'Symbol baz',
    enumerable: false
  }
})

// 给对象添加一个可枚举的 Symbol 属性
obj[Symbol('foo')] = 'Symbol foo'

Object.getOwnPropertySymbols(obj).forEach((key) => {
  console.log(obj[key])
})

// 输出结果：Symbol baz Symbol foo
```

### Reflect.ownKeys()

`Reflect.ownKeys()` 返回一个数组，包含对象自身的所有属性。它和 `Object.keys()`类似，`Object.keys()`返回属性 key，但不包括不可枚举的属性，而 `Reflect.ownKeys()`会返回所有属性 key：

```js
var obj = {
  a: 1,
  b: 2
}
Object.defineProperty(obj, 'method', {
  value: function () {
    alert('Non enumerable property')
  },
  enumerable: false
})

console.log(Object.keys(obj))
// ["a", "b"]
console.log(Reflect.ownKeys(obj))
// ["a", "b", "method"]
```

### 总结

| 对象方法                       | 遍历基本属性 | 遍历原型链 | 遍历不可枚举属性 | 遍历 Symbol |
| ------------------------------ | ------------ | ---------- | ---------------- | ----------- |
| for in                         | 是           | 是         | 否               | 否          |
| Object.keys()                  | 是           | 否         | 否               | 否          |
| Object.getOwnPropertyNames()   | 是           | 否         | 是               | 否          |
| Object.getOwnPropertySymbols() | 否           | 否         | 是               | 是          |
| Reflect.ownKeys()              | 是           | 否         | 是               | 是          |

## 其他遍历方法

- for
- while
- do while

### for

```js
const arr = [1, 2, 3, 4, 5]
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(arr[i])
}
```

在执行的时候，会先判断执行条件，再执行。for 循环可以用来遍历数组，字符串，类数组，DOM 节点等。可以改变原数组。

### while

```js
let num = 1

while (num < 10) {
  console.log(num)
  num++
}
```

### do while

```js
let num = 10

do {
  console.log(num)
  num--
} while (num >= 0)

console.log(num) //-1
```

## for in 和 for of 的区别

- 循环数组：for in 遍历的是数组的属性名，for of 遍历的是数组的属性值

```js
const arr = [1, 2, 3, 4]
// for in 遍历的是数组的属性名
for (const key in arr) {
  console.log(key) // 0,1,2,3
}
// for of 遍历的是数组的属性值
for (const item of arr) {
  console.log(item) // 1,2,3,4
}
```

- 循环对象：for of 只能遍历部署了 Symbol.iterator 属性的对象，for in 可以遍历对象

```js
const obj = { a: 1, b: 2, c: 3 }
// for in 可以正常遍历一个普通对象
for (const key in obj) {
  console.log(key) // a,b,c
}
// for of 遍历一个普通对象会报错
for (const item of obj) {
  console.log(item) //Uncaught TypeError: obj is not iterable
}
```

- 数组对象：都可遍历

```js
const arrObj = [
  { name: 'bruce', age: 18 },
  { name: 'Lee', age: 18 }
]
// for in 遍历一个数组对象
for (const key in arrObj) {
  console.log(key) // 0,1
}
// for of 遍历一个数组对象
for (const item of arrObj) {
  console.log(item) // {name: 'bruce', age: 18}，{name: 'Lee', age: 18}
}
```
