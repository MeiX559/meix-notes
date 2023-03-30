# Omit 源码阅读

## 说在前面

::: tip 说在前面
本次源码阅读灵感来源于[若川的源码共读活动](https://juejin.cn/post/7118782469360320542)
:::

## github 仓库地址

[github](https://github.com/benjycui/omit.js.git)

## 源码目录

```text
|____LICENSE
|____src                  源代码
| |____index.js
|____tests                测试代码目录
| |____index.test.js
|____index.js             入口文件
|____README.md
|____yarn.lock
|____.gitignore
|____package.json         项目依赖、启动打包命令
|____.fatherrc.js         father 库的配置
|____.eslintrc.js         eslint 的配置
|____.eslintignore        eslint 的忽略配置
|____index.d.ts           omit 的类型声明文件
|____.travis.yml          github 用于说明持续集成步骤配置文件
```

## package.json

```js
main:项目的主入口文件。即当其他模块引用该模块时，Node.js 会加载该文件作为该模块的默认导出内容；如果该属性值没有设置，默认为项目根目录下的 index.js 文件；
module:用于指定 ES Module 规范的入口文件。它是为了解决在 Node.js 中使用 ES Module 的问题而提出的。默认情况下，Node.js使用的是CommonJS规范。如果需要同时支持CommonJS 和 ES Module 规范的话，就需要在package.json 中同时定义 main 和 module 字段 ，在打包时如果打包工具支持该字段，则会优先使用 ES6 模块规范的版本，这样可以启用 Tree Shaking 的机制，如果不支持就会走 main 字段，这个时候会使用 CommonJS 规范的版本。
types:用于指定 TS 模块的类型定义文件.
files:用于指定 npm 包作为依赖被安装时要包括的文件.
scripts:项目中可执行的命令
```

## 源码解析

源码十分的简单，就是暴露出了一个函数 omit，该函数接收两个参数：

- obj:源数据对象，方法体内部会对该对象进行浅拷贝.
- fields:要删除的属性，该参数是一个字符串数组.

```js
function omit(obj, fields) {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj) // 浅拷贝一份
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i]
    delete shallowCopy[key] // 将fields数组中的字段删除
  }
  return shallowCopy
}

export default omit
```

omit 方法首先对 obj 浅拷贝一份，然后循环一遍 fields 数组，依次删除拷贝对象的属性，最后将该拷贝的数组返回出去。

## TypeScript 重写

## npm 发包
