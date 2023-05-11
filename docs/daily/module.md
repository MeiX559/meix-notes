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
  <script src="./a.js"></script>
  <script src="./b.js"></script>
</body>
```

```js
// index.js
console.log(name) // f name () {}
```

```js
// a.js
var name = 'Bruce Lee'
console.log(name)
```

```js
// b.js
function name() {
  // ...
}
```

对于上述代码会出现问题，即在 index.js 打印 name 属性的时候，

### 依赖管理

## Commonjs

:::tip Commonjs 特性：

- CommonJS 模块由 JS 运行时实现。
- CommonJs 是单个值导出，本质上导出的就是 exports 属性。
- CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
- CommonJS 模块同步加载并执行模块文件。
  :::

## ES Module

:::tip ES Module

- ES Module 静态的，不能放在块级作用域内，代码发生在编译时。
- ES Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。
- ES Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
- ES 模块提前加载并执行模块文件。
- ES Module 导入模块在严格模式下。
- ES Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。
  :::
