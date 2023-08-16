# JavaScript API

## Page Visibility API

有时候我们需要根据页面的可见性做一些操作以满足需求，而 JavaScript 中的 [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) 就提供了这样一种解决方案，接下来将介绍一下 Page Visibility API 的概念以及使用方法等。

:::tip
页面可见性 API 对于节省资源和提高性能特别有用，它使页面在文档不可见时避免执行不必要的任务。
:::

### Page Visibility API 概念

`Page Visibility API`是一种浏览器 API，它提供了一种检测页面是否可见的方法。通过 `Page Visibility API`，我们可以知道当前页面是否被隐藏或者最小化，从而可以根据页面的可见性来控制页面的行为和资源的使用 。

**属性:**

- `document.hidden`:只读属性，表示页面是否隐藏，如果页面隐藏返回 true，否则返回 false。

- `document.visibilityState`:只读属性，返回 document 的可见性(即当前元素的上下文环境)。

`document.visibilityState`有以下几个取值：

1. **visible**：当前页面可见，即页面是非最小化窗口的前景选项卡。
2. **hidden**：当前页面被隐藏，即页面可以是一个后台标签，或是最小化窗口的一部分，或是在操作系统锁屏的状态下。
3. **prerender**：当前页面正在预加载，不可见。
4. **unloaded**：当前页面正在卸载，部分浏览器不支持。

**方法:**

`visibilitychange`：当页面的可见性状态发生变化时触发该事件。

### Page Visibility API 应用场景

- 视频播放器：使用 Page Visibility API 判断页面是否可见，从而可以在页面隐藏时暂停播放视频。
- 页面跳转切换回来时刷新数据。
- 根据页面可见性控制动画的执行。

### Page Visibility API 的使用

要想使用 Page Visibility API 很简单，只需要在 JavaScript 中监听 visibilitychange 事件。

```js
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 页面被隐藏
  } else {
    // 页面可见
  }
})
```

## Clipboard API

剪贴板 `Clipboard API`提供了响应剪贴板命令（剪切、复制和粘贴）与异步读写系统剪贴板的能力。

**Clipboard API 的方法：**

- `writeText(text: string): Promise<void>`：将文本复制到剪贴板。
- `readText(): Promise<string>`：从剪贴板读取文本。

```jsx
// 复制文本
const handleCopy = async () => {
  await navigator.clipboard.writeText('复制内容')
}

// 获取剪切板内容
const handleGetTxt = () => {
  navigator.clipboard.readText().then((text) => {
    console.log(text)
  })
}

return （
<>
  <button onClick={handleCopy}>复制</button>
  <button onClick={handleGetTxt}>获取剪切板内容</button>
</>
）
```

### 复制文本

```js
navigator.clipboard
  .writeText('Hello, World!')
  .then(() => console.log('Text copied to clipboard'))
  .catch((error) => console.error('Failed to copy text: ', error))
```

### 从剪切板读取数据

```js
navigator.clipboard
  .readText()
  .then((text) => console.log('Text read from clipboard: ', text))
  .catch((error) => console.error('Failed to read text from clipboard: ', error))
```

### Clipboard API 的优缺点

优点：

- 支持在浏览器中操作剪贴板，方便实现复制、剪切和粘贴等功能。
- 支持将文本复制到剪贴板。
- 支持从剪贴板中读取数据。

缺点：

- 兼容性问题可能会导致一些用户无法使用相关功能。
- 操作剪贴板需要获取用户的授权，可能会对用户造成不必要的干扰。
- 在某些情况下，安全性可能存在问题，例如恶意网站可能会获取用户复制到剪贴板中的敏感信息。

第三方库：

- [clipboard.js](https://github.com/zenorocha/clipboard.js/):一个简单的 JavaScript 库，用于操作剪切板
- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard/):一个基于 React 的剪贴板库，用于在 React 应用程序中实现复制和粘贴功能。

:::warning 注意点

- 在使用 Clipboard 接口时，需要获取用户的授权。
- 在处理剪贴板数据时，需要注意数据的类型。
  :::

## Intersection Observer API

`Intersection Observer API` 提供了一种异步检测目标元素与视窗相交情况变化的方法。它可以告诉开发者一个元素是否进入视窗，以及两者的交叉区域大小和位置。`Intersection Observer API`可以通过回调函数及设定的阈值实时通知开发者目标元素与视窗的交叉状态，从而进行相应的操作。

:::tip Intersection Observer API 特性

- 异步执行：它使用浏览器的内部优化机制，不会阻塞主进程，避免了早期调用 getBoundingClientRect(在主线程上运行)可能会造成的性能问题。
- 节省资源：滚动事件或定时器都需要频繁计算与回调触发，而 IntersectionObserver 可以精确观察元素的视窗的交叉状态，可以节省一定的资源。
- 观察多个目标：IntersectionObserver 可以同时观察多个目标元素。
- 自定义阈值：可设定一个或多个阈值，用来定义元素与视窗的交叉比例。
  :::

### IntersectionObserver 的使用

创建一个 IntersectionObserver 对象，并传入相应参数和回调函数，该回调函数将会在目标元素与根元素的交集大小超过阈值规定的大小时候执行。

```js
let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0 // 阈值为 1.0 意味着目标元素完全出现在 root 选项指定的元素中可见时，回调函数将会被执行
}

let observer = new IntersectionObserver(callback, options)
```

**实例属性：**

- root:测试交叉时，用作边界盒的元素或文档。如果构造函数未传入 root 或其值为 null，则默认使用顶级文档的视口。
- rootMargin：计算交叉时添加到根边界盒的矩形偏移量。
- threshold：阈值，监听对象的交叉区域与边界区域的比率。如果构造器未传入值，则默认值为 0。

**实例方法：**

- disconnect:使 IntersectionObserver 对象停止监听目标。
- observe:使 IntersectionObserver 开始监听一个目标元素。
- takeRecords:返回所有观察目标的 IntersectionObserverEntry 对象数组。
- unobserve:使 IntersectionObserver 停止监听特定目标元素。

### IntersectionObserver 的应用

#### 图片懒加载

通过使用 IntersectionObserver，可以设置只在进入视窗时才开始加载，这样可以减少页面初始化时的加载时间。

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src // 将真实的图片地址赋给 src 属性
      observer.unobserve(img) // 停止观察该图片
    }
  })
})

const lazyImages = document.querySelectorAll('.lazy-image')
lazyImages.forEach((img) => {
  observer.observe(img) // 开始观察每个图片元素
})
```

#### 无限滚动加载

传统的无限滚动加载通常是使用滚动事件来触发数据的加载，但是这种方式需要频繁计算，会导致一定的性能问题，而 IntersectionObserver 可以更加高效地实现无限滚动加载。

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMoreData() // 触发数据加载操作
    }
  })
})

const loader = document.querySelector('.loader')
observer.observe(loader) // 开始观察加载指示器元素
```

#### 曝光埋点

IntersectionObserver 提供了一个可靠且高效的方式来实现有效曝光埋点。通过观察目标元素与视窗的交叉状态，可以确定元素是否在视窗中完全或部分可见，从而进行曝光统计。

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      trackExposure(entry.target) // 记录曝光数据或触发相应操作
      observer.unobserve(entry.target) // 停止观察该目标元素
    }
  })
})

const elements = document.querySelectorAll('.exposure-element')
elements.forEach((element) => {
  observer.observe(element) // 开始观察每个目标元素
})
```

## MutationObserver

`MutationObserver` 接口提供了监视对 DOM 树所做更改的能力.

MutationObserver 构造函数会创建并返回一个新的 MutationObserver 它会在指定的 DOM 发生变化时被调用。

**方法：**

- disconnect():阻止 `MutationObserver` 实例继续接收的通知，直到再次调用其 `observe()` 方法，该观察者对象包含的回调函数都不会再被调用。
- observe():配置 `MutationObserver` 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。
- takeRecords():从 `MutationObserver` 的通知队列中删除所有待处理的通知，并将它们返回到 `MutationRecord` 对象的新 Array 中。

### MutationObserver 的使用

```js
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id')

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true }

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.')
    } else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.')
    }
  }
}

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback)

// 以上述配置开始观察目标节点
observer.observe(targetNode, config)

// 之后，可停止观察
observer.disconnect()
```
