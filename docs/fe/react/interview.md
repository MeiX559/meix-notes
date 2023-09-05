# React 常见面试题

## setState 是同步还是异步的？

`setState` 在 Class 组件中是`this.setState`方法，在函数组件中是`useState`返回值的修改函数。

`setState`用户变更状态，触发组件重新渲染，更新视图。

:::tip
在调用 `setState` 设置值之后，如果能立即拿到最新的值就是同步的，如果不能立即拿到最新的值就是异步的。
:::
`setState`到底是同步还是异步，其实可以分为两种情况来考虑，分别是 React18 之前和 React18 之后。

### React18 之前

在 React18 之前，React 的默认模式是`legacy 模式`(`ReactDOM.render(<App />, rootNode)`)，在这种模式下：

- 只要在 React 可以控制的情况下，合成事件和生命周期事件都会走合并操作，延迟更新的策略，`setState`的执行是异步的。
- 在 React 无法控制的地方，如原生事件(addEventListener)，异步调用的回调函数中(比如 setTimeout、setInterval、Promise、MessageChannel),`setState` 的执行是同步的。

### React18 之后

在 React18 之后，采用了`concurrent 模式`(`ReactDOM.createRoot(rootNode).render(<App />)`),在 concurrent 模式下，由于默认启用了并发更新，所以 `setState` 的执行都是异步的，即不管是合成事件还是原生事件或者 setTimeout 等的回调函数中，默认都会走合并操作，延迟更新的策略。

:::tip 为什么 setState 要延迟批量更新呢？

- 异步更新是为了性能优化，减少渲染次数
- 保持内部一致性。如果将 setState 改为同步更新，那尽管 state 的更新是同步的，但是 props 不是
- 启用并发更新，完成异步渲染。
  :::

## 为什么在 React 17 之前需要`import react from 'react'`,在 React 17 之后不需要？

答：因为在 React 17 之前，JSX 在编译时会被 Babel 编译为`React.createElement`方法，如果不显示声明 `import react from 'react'`，那么在运行时该模块内就会报未定义变量 React 的错误。而在 React17 中，已经不需要显式导入 React 了。详细可以看[JSX 转换](https://zh-hans.legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform)。

## Hooks 为什么不能写在条件判断中？

Hooks 会按顺序存储在链表中，React 需要保证在每次组件渲染时，Hooks 的执行顺序是一样的,如果写在条件判断中，在渲染的时候就没法保持链表的顺序。
