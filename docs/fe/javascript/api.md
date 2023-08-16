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
