# 浅谈 Commonjs 和 ES Module

::: tip 说在前面
Commonjs 和 ES Module 出现之前，存在什么问题？Commonjs 和 ES Module 解决了什么问题？

存在的问题：

- 全局污染
- 依赖管理混乱

解决了什么问题：

- 解决全局污染的问题：每个文件都是独立的作用域，不存在全局变量污染的问题。
- 解决了依赖问题：一个文件里可以很清晰的知道依赖了哪些文件。
  :::

## 模块化

### 全局污染

在模块化之前，引入文件一般都是使用 script 进行引入的，而 script 内部的变量是存在全局变量污染的，比如说有两个 js 文件使用了相同的变量名，即：

```js
// 引入a.js和b.js
<body>
  <script src="./index.js"></script>
  <script src="./b.js"></script>
  <script src="./a.js"></script>
</body>
```

```js
// index.js
var name = 'Bruce Lee'
```

```js
// b.js
function name() {
  // ...
}
```

```js
// a.js
console.log(name) // ƒ name() {}
```

对于上述代码会出现问题，即在 a.js 打印 name 属性的时候，打印的是 f name () {}，而不是'Bruce Lee'，因为在声明 name 属性之后，又在 b.js 声明了 name 为一个函数，而当 a.js 使用 name 属性时，取到的是最后一次声明的值,这就是没有模块化导致的全局污染问题，在 script 内部存在全局污染，使得最终打印的变量名不是自己想要的。

### 依赖管理

依赖管理是一个比较难处理的问题，已上述的例子来说，js 正常的执行顺序是 script 引入的顺序，但是如果三个 js 文件之间还有依赖关系，又该如何处理呢？

假设三个 js 文件都有一个方法，分别是 fun1,fun2,fun3,如下所示：

```js
// index.js
var name = 'Bruce Lee'
function fun1() {}
```

```js
// b.js
function name() {}
function fun3() {}
```

```js
// a.js
console.log(name) // f name () {}
function fun2() {}
```

上述代码中下层 js 能调用上层的方法，而上层方法不能调用下层方法，即 a.js 能调用 fun1,index.js 不能调用 fun2.

针对以上问题，就需要模块化来解决，在前端快速发展的时期，先后出现了 Commonjs 和 ES Module 两种前端模块化的方式，以下将对 Commonjs 和 ES Module 详细展开介绍。

## Commonjs

:::tip CommonJS 特点

- 在 commonjs 中每一个 js 文件都是一个单独的模块，我们可以称之为 module；
- 该模块中，包含 CommonJS 规范的核心变量: exports、module.exports、require；
- exports 和 module.exports 可以负责对模块中的内容进行导出；
- require 函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；
  :::

### 导出

#### module.exports 导出

module.exports 既可以导出函数或变量，也可以导出任意类型的值

```js commonjs.js
// 导出一个对象
module.exports = {
  name: 'Bruce',
  age: 32
}

// 导出任意值
module.exports.name = 'Meix'
module.exports.age = undefined
```

#### exports 导出

exports 就是传入到当前模块内的一个对象，本质上就是 module.exports。

```js
exports.name = 'MX'
exports.city = '杭州'
```

````warning 注意点
exports直接导出一个对象值最终得到的结果只是一个空对象，没有任何值，比如说：

```js
exports = {
  name: 'Bruce',
  age: 32
};
打印上述导出的时候，打印的是一个空对象。
```

````

为什么 exports={} 直接赋值一个对象不可以，而使用 exports.name = '\*\*\*'就可以？

理想的情况下，我们可以通过 exports={...}来导出对象，而不用通过 exports.\*\*\*来导出每一个属性，但是上述情况我们也看到了，这种方式导出的是一个空对象，即是无效的，主要原因就是 js 本身的执行特性决定的。

在解释原因之前，先了解一下 CommonJS 的执行原理

##### CommonJS 的执行原理

每个模块文件上存在 module，exports，require 三个变量，这三个变量是没有被定义的，但是在 CommonJS 中我们可以直接使用它，即在编译的过程中，CommonJS 对代码块进行了包装，示例如下：

```js
module.exports = {
  name: 'Bruce',
  age: 32
}

// 上述代码在编译的过程中CommonJS包装之后的代码
;(function (exports, require, module, __filename, __dirname) {
  module.exports = {
    name: 'Bruce',
    age: 32
  }
})
```

根据以上 CommonJS 的执行原理我们可以知道，exports，module 和 require 是作为形参的方式传入到 js 模块中的。如果我们直接通过 exports = {} 来修改 exports ，相当于给形参重新赋值了，但是外边获取到的还是原来的值。

举个 🌰：

```js
function wrap(myExports) {
  myExports = {
    name: 'Bruce Lee'
  }
  console.log(myExports) //{ name: 'Bruce Lee' }
}

let myExports = {
  name: 'MX'
}
wrap(myExports)

console.log(myExports) //{ name: 'MX' }
```

上述代码中，wrap 函数接受一个形参 myExports，同时又声明了变量 myExports 并赋值，将其传入 wrap 函数中，想要直接修改 myExports 的值是行不通的，因为形参被重新赋值了与外界断绝了联系，内部直接赋值是没有效果的。

即我们可以把 wrap 当成 CommonJS 的包装器，我们的代码就是包装函数里面的全部代码，exports 只是包装器里面的一个形参，直接把它赋值为一个对象是不能生效的，这也就解释了为什么 exports={} 直接赋值一个对象不可以。

**_解决方案_**：

只需要函数中使用 exports.\*\*\*这种形式的写法就可以了。

```js
function wrap(myExports) {
  myExports.name = 'Bruce Lee'
  console.log(myExports) //{ name: 'Bruce Lee' }
}

let myExports = {
  name: 'MX'
}
wrap(myExports)

console.log(myExports) //{ name: 'Bruce Lee' }
```

### 导入

```js
// commonjs.js
module.exports = {
  name: 'Bruce',
  age: 32
}

// 导入commonjs.js
const data = require('./commonjs')
console.log(data) // { name: 'Bruce', age: 32 }
```

## ES Module

从 ES6 开始，JavaScript 才真正开始有了模块化，ES Module 有以下优点：

- 借助 Es Module 的静态导入导出的优势，实现了 tree shaking。
- Es Module 还可以 import() 懒加载方式实现代码分割。

### 导入和导出

使用 export 导出，import 导入。

#### 正常导入导出

```js
// 导出
const name = 'Bruce Liang'
const author = 'ZMX'
export { name, author }
export const city = '杭州'

export const say = function () {
  console.log('hello , world')
}

// 导入
import { name, author, say, city } from './esModule.js'

console.log(name, author, city) //Bruce Liang ZMX 杭州
say() //hello , world
```

:::warning 关注点

- export { }， 与变量名绑定，命名导出。
- import { } from 'module'， 导入 module 的命名导出。
- import { } 内部的变量名称，要与 export { } 完全匹配。
  :::

#### 默认导入导出

```js
// 导出
const name = 'Bruce Liang'
const author = 'ZMX'
const city = '杭州'
const say = () => {
  console.log('say hello')
}

export default {
  name,
  author,
  city,
  say
}

// 导入
import ems from './esModule.js'

console.log(ems) // {name: 'Bruce Liang',author: 'ZMX',city: '杭州',say: [Function: say]}
```

对于引入默认导出的模块，import anyName from 'module'， anyName 可以是自定义名称。

#### 混合导入导出

```js
// 导出
const name = 'Bruce Liang'
const author = 'ZMX'
export default {
  name,
  author
}

export const city = '杭州'
export const say = () => {
  console.log('say hello')
}

// 导入 方式一
import ems, { city as myCity, say } from './esModule.js'

console.log(ems) //{ name: 'Bruce Liang', author: 'ZMX' }
console.log(myCity) //  杭州
say() //say hello

// 导入 方式二
import ems, * as demo from './esModule.js'

console.log(ems) //{ name: 'Bruce Liang', author: 'ZMX' }
console.log(demo.city) //  杭州
demo.say() // say hello
```

## 总结

:::tip Commonjs 总结：

- CommonJS 模块由 JS 运行时实现。
- CommonJs 是单个值导出，本质上导出的就是 exports 属性。
- CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
- CommonJS 模块同步加载并执行模块文件。
  :::

:::tip ES Module 总结

- ES Module 静态的，不能放在块级作用域内，代码发生在编译时。
- ES Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。
- ES Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
- ES 模块提前加载并执行模块文件。
- ES Module 导入模块在严格模式下。
- ES Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。
  :::
