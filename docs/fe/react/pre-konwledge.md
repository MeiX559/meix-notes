# React 前置知识

## Virtual DOM

:::tip Virtual DOM 是什么？
`Virtual DOM` 是一种编程方式，它以对象的形式保存在内存中，在 React 中其实是以一颗 fiber 树的形式来描述 DOM 树的信息。
:::

### 为什么使用 Virtual DOM

Virtual DOM 其实就是以 js 对象来表示 DOM 的结构和信息的，由于大量的操作 DOM 很慢，即使是一个很小的改动也可能导致页面的重绘和重排，而虚拟 DOM 树是存在内存中的，当发生更新的时候，通过比较虚拟 DOM 树的差异来决定是否需要更新，并且是批量、异步、最小化的执行 DOM 的变更（（即 diff 算法）），然后再渲染真实 DOM，这样可以提升性能。

另外，使用虚拟 DOM 可以实现跨平台，`jsx --> ReactElement对象 --> 真实节点`，将 jsx 到渲染为真实 DOM 的过程中存在一个中间层，通过这个中间层可以在渲染为真实 DOM 前进行操作，从而具有跨平台的能力。

## JSX

JSX 作为描述组件内容的数据结构，为 JS 赋予了更多视觉表现力。

### JSX 的转换

在浏览器中是无法直接使用 JSX，所以在 React 开发中一般都会选择 Bable 或 TypeScript 来将 JSX 转换为 JavaScript。而 JSX 在编译的时候会被编译为`React.createElement`方法。这也是为什么要引入 React 的原因，如果不引入，那么在编译运行的时候就会出现 React 未定义的错误，导致编译失败。

```jsx
// jsx 语法 代码
import React from 'react'

function App() {
  return <h1>Hello World</h1>
}

// 通过React.createElement转换
import React from 'react'

function App() {
  return React.createElement('h1', null, 'Hello world')
}
```

JSX 最终会调用`React.createElement`方法，那么看一下`React.createElement`内部是怎样实现的

### React.createElement 方法

```js
export function createElement(type, config, children) {
  let propName // 用于存储遍历时的属性名
  const props = {} // 创建一个用于存储属性的空对象 props

  // key、ref、self、source 均为 React 元素的属性
  let key = null
  let ref = null
  let self = null
  let source = null

  if (config != null) {
    // 依次对 ref、key、self 和 source 属性赋值
    if (hasValidRef(config)) {
      ref = config.ref
    }
    // 将 key 转换为字符串
    if (hasValidKey(config)) {
      key = '' + config.key
    }

    self = config.__self === undefined ? null : config.__self
    source = config.__source === undefined ? null : config.__source

    // 将 config 对象中剩余属性添加到新的 props 对象中
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName]
      }
    }
  }
  // 计算子元素的个数（去除 type 和 config 剩余的参数都是 children）
  const childrenLength = arguments.length - 2

  // 根据剩余的参数的长度分别处理 children 并赋值给 props.children
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2]
    }
    props.children = childArray
  }

  // 处理 defaultProps
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}
```

`React.createElement`方法接收三个参数：

- type：元素的类型
- config：元素的属性
- children：元素的子元素

该方法会将 config 中的 ref、key、self、source 等属性提取出来，剩余的属性放到 props 对象中，最终会调用`ReactElement`方法返回一个包含组件数据的对象。

```js
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // 标识是一个 React Element 元素
    $$typeof: REACT_ELEMENT_TYPE,

    // 元素的内置属性
    type: type,
    key: key,
    ref: ref,
    props: props,

    // 记录创建此元素的组件
    _owner: owner
  }

  return element
}
```

该对象有一个参数`$$typeof: REACT_ELEMENT_TYPE`标记了该对象是个 React Element。

:::tip
疑问 ❓：调用`React.createElement`返回的对象就是`React Element`吗？

答：React 提供了`isValidElement`方法用于判断一个对象是否是`React Element`对象

```js
export function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE
}
```

只要满足条件`$$typeof === REACT_ELEMENT_TYPE`的非 null 对象就是一个`React Element`，因此在 React 中，所有 JSX 在运行时的返回结果(即`React.createElement`的返回值)都是`React Element`。
:::

### 全新的 JSX 转换

旧的 JSX 转换会把 JSX 转换为 `React.createElement(...)` 调用，然而这种转换并不完美，如果需要使用 JSX，那么需要在 React 环境下，另外也有一些`React.createElement`无法做到的性能优化和简化。

在[全新的 JSX 转换](https://zh-hans.legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)中，不会将 JSX 转换为`React.createElement`，而是自动从 React 的 package 中引入新的入口函数并调用。

```jsx
// jsx 语法代码
function App() {
  return <h1>Hello World</h1>
}

// 新的jsx转换
// 由编译器引入（禁止自己引入！）
import { jsx as _jsx } from 'react/jsx-runtime'

function App() {
  return _jsx('h1', { children: 'Hello world' })
}
```

新的 JSX 转换无需引入 React 就可以使用 JSX.

## React 启动模式

React 共有三种启动模式：

- `legacy 模式`：`ReactDOM.render(<App />, document.getElementById('root'))` 这个模式是 react 17 之前默认使用的模式。但是这个模式有些新功能不支持(即 concurrent 模式支持的一些功能)。
- `blocking 模式`：`ReactDOM.createBlockingRoot(rootNode).render(<App />)` 在 react 17 中引入了一种中间模式，主要是作为迁移到 concurrent 模式的第一个步骤,在 react 18 中已经被移除。
- `concurrent 模式`：`ReactDOM.createRoot(rootNode).render(<App />)` 这个模式在 react 18 成为默认模式，并且在 react 18 中也同时支持 legacy 模式和 concurrent 模式这两种模式。

:::tip

- legacy 模式在合成事件中有自动批处理的功能，但仅限于一个浏览器任务。非 React 事件想使用这个功能必须使用 unstable_batchedUpdates。
- 在 blocking 模式和 concurrent 模式下，所有的 setState 在默认情况下都是批处理的。
  :::

在 react 17 之前，**legacy 模式**是 React 的默认模式，它构建 DOM 的过程是同步的，且它的 Reconciler 是递归更新的，当层级比较深的时候，可能 diff 的过程会比较长，导致的结果就是 JS 会阻塞高优先级的任务，页面卡顿。

而 **concurrent 模式**它采用了时间片调度实现了异步中断更新，如果任务到了过期时间或者有更高优先级的任务时会主动让出线程执行高优先级的任务。

React 18 保留了这两种模式，通过不同的入口函数开启不同的模式，且模式的变化影响的是整个应用的工作方式，所以无法只针对某个组件开启不同的模式。

## 参考文档

- [React 技术揭秘](https://react.iamkasong.com/preparation/idea.html)
