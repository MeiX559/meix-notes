# 前端页面截图方案

:::tip 背景
将网页保存为图片（以下简称为快照），是用户记录和分享页面信息的有效手段，在各种兴趣测试和营销推广等形式的活动页面中尤为常见。
快照环节通常处于页面交互流程的末端，汇总了用户最终的参与结果，直接影响到用户对于活动的完整体验。因此，生成高质量的页面快照，对于活动的传播和品牌的转化具有十分重要的意义。
:::

## 适用场景

- 适用于将页面转为图片，特别是对实时性要求较高的场景。
- 希望在快照中展示跨域图片资源的场景。
- 针对生成图片内容不完整、模糊或者转换过程缓慢等问题，寻求有效解决方案的场景。

## 原理简析

:::tip
依据图片是否由设备本地生成，快照可分为前端处理和后端处理两种方式。

由于后端生成的方案依赖于网络通信，不可避免地存在通信开销和等待时延，同时对于模板和数据结构变更也有一定的维护成本。

因此，出于实时性和灵活性等综合考虑，优先选用前端处理的方式。
:::

前端侧对于快照的处理过程，实质上是将 DOM 节点包含的视图信息转换为图片信息的过程。这个过程可以借助 canvas 的原生 API 实现，这也是方案可行性的基础。

具体来说，转换过程是将目标 DOM 节点绘制到 canvas 画布，然后 canvas 画布以图片形式导出。可简单标记为绘制阶段和导出阶段两个步骤：

- **绘制阶段**：选择希望绘制的 DOM 节点，根据 nodeType 调用 canvas 对象的对应 API，将目标 DOM 节点绘制到 canvas 画布（例如对于<img>的绘制使用 drawImage 方法)。
- **导出阶段**：通过 canvas 的 toDataURL 或 getImageData 等对外接口，最终实现画布内容的导出

## 基础方案

### 原生 canvas

```html
<img id="box" src="/vite.svg" className="logo" alt="Vite logo" />
```

```javascript
// 获取目标元素
const target = document.getElementById('box')
// 新建canvas画布
const canvas = document.createElement('canvas')
canvas.width = 100
canvas.height = 100
const ctx = canvas.getContext('2d')
// 导出阶段：从canvas导出新的图片
const exportNewImage = (canvas) => {
  const exportImage = document.createElement('img')
  exportImage.src = canvas.toDataURL()
  document.body.appendChild(exportImage)
}
exportNewImage(canvas)
// 绘制阶段：待图片内容加载完毕后绘制画布
target.onload = () => {
  // 将图片内容绘入画布
  ctx.drawImage(target, 0, 0, 100, 100)
  // 将画布内容导出为新的图片
  exportNewImage(canvas)
}
```

其中，`drawImage`是 canvas 上下文对象的实例方法，提供多种方式将 `CanvasImageSource` 源绘制到 canvas 画布上。`exportNewImage` 用于将 canvas 中的视图信息导出为包含图片展示的 data URI。

从上面 canvas 方案中可以看到基于 canvas 提供的相关基础 API，为前端侧的页面快照处理提供了可能。
然而，具体的业务应用往往更加复杂，上面的「低配版」实例显然未能覆盖多数的实际场景，例如：

- canvas 的 drawImage 方法只接受 CanvasImageSource，而 CanvasImageSource 并不包括文本节点、普通的 div 等，将非<img>的元素绘制到 canvas 需要特定处理。
- 当有多个 DOM 元素需要绘制时，层级优先级处理较为复杂。
- 调用 canvas 绘制：需要进行布局计算，需要关注 float、z-index、position 等布局定位的处理。
- 样式合成绘制计算较为繁琐。绘制起来也很繁琐，造成开发量大。

### html2canvas

[html2canvas](https://github.com/niklasvh/html2canvas)

[html2canvas 文档](http://html2canvas.hertzen.com/)

`html2canvas`库主要使用的是 Canvas 实现方式，主要过程是手动将 dom 重新绘制成 canvas，因此，它只能正确渲染可以理解的属性，有许多 CSS 属性无法正确渲染。

#### 使用

`html2canvas`对外暴露了一个可执行函数，它的第一个参数用于接收待绘制的目标节点(必选)；第二个参数是可选的配置项，用于设置涉及 canvas 导出的各个参数:

```js
// element 为目标绘制节点，options为可选参数
html2canvas(element[,options]);
```

调用示例：

```js
import html2canvas from 'html2canvas'

const options = {}

// 输入dom节点，返回包含dom视图内容的canvas对象
html2canvas(dom, options).then(function (canvas) {
  document.body.appendChild(canvas)
})
```

### canvas2image

[canvas2image](https://github.com/hongru/canvas2image) 将 canvas 保存或转换为图像的工具

`canvas2image`仅用于将输入的 canvas 对象按特定格式转换和存储操作，其中这两类操作均支持 PNG，JPEG，GIF，BMP 四种图片类型：

```js
// 格式转换
Canvas2Image.convertToPNG(canvasObj, width, height)
Canvas2Image.convertToJPEG(canvasObj, width, height)
Canvas2Image.convertToGIF(canvasObj, width, height)
Canvas2Image.convertToBMP(canvasObj, width, height)

// 另存为指定格式图片
Canvas2Image.saveAsPNG(canvasObj, width, height)
Canvas2Image.saveAsJPEG(canvasObj, width, height)
Canvas2Image.saveAsGIF(canvasObj, width, height)
Canvas2Image.saveAsBMP(canvasObj, width, height)
```

实质上，`canvas2image`只是提供了针对 canvas 基础 API 的二次封装（例如 getImageData、toDataURL），而本身并不依赖`html2canvas`。

调用示例：

```html
<img id="box" src="/vite.svg" className="logo" alt="Vite logo" />

<div onClick="{handleCanvas2Image}">canvas2Image</div>
```

```js
const handleCanvas2Image = () => {
  const box = document.getElementById('box')
  const imageEl = Canvas2Image.convertToPNG(box, 100, 100)
  document.body.appendChild(imageEl)
}
```

### html2canvas & canvas2image

调用示例：

```html
<img id="box" src="/vite.svg" className="logo" alt="Vite logo" />

<div onClick="{handleToImage}">html2canvas & canvas</div>
```

```js
function convertToImage(container: HTMLElement | null, options = {}) {
  return html2canvas(container, options).then((canvas) => {
    const imageEl = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height)
    return imageEl
  })
}

// html2canvas和Canvas2Image结合
const handleToImage = () => {
  const canvas = document.getElementById('box')
  convertToImage(canvas).then((path) => {
    document.body.appendChild(path)
  })
}
```

### 优化

基于 `html2canvas` 和 `canvas2image`，实现了相比原生方案通用性更佳的基础页面快照方案。然而面对实际复杂的应用场景，以上基础方案生成的快照效果往往不尽如人意。
快照效果的差异性，一方面是由于 `html2canvas` 导出的视图信息是通过各种 DOM 和 canvas 的 API 复合计算二次绘制的结果（并非一键栅格化）。因此不同宿主环境的相关 API 实现差异，可能导致生成的图片效果存在多端不一致性或者显示异常的情况。

另一方面，业务层面的因素，例如对于开发者 `html2canvas` 的配置有误或者是页面布局不当等原因，也会对生成快照的结果带来偏差。
社区中也可以常见到一些对于生成快照质量的讨论，例如：

- 为什么有些内容显示不完整、残缺、白屏或黑屏？
- 明明原页面清晰可辨，为什么生成的图片模糊如毛玻璃？
- 将页面转换为图片的过程十分缓慢，影响后续相关操作，有什么好办法么？

下面从内容完整性、清晰度优化和转换效率，进一步探究高质量的快照解决方案。

#### 内容完整性

首要问题：保证目标节点视图信息完整导出

由于真机环境的兼容性和业务实现方式的不同，在一些使用 html2canvas 过程中常会出现快照内容与原视图不一致的情况。内容不完整的常见自检 checklist 如下：

- 跨域问题：存在跨域图片污染 canvas 画布。
- 资源加载：生成快照时，相关资源还未加载完毕。
- 滚动问题：页面中滚动元素存在偏移量，导致生成的快照顶部出现空白。

:::tip 跨域问题
由于 `canvas` 对于图片资源的同源限制，如果画布中包含跨域的图片资源则会污染画布( Tainted canvases )，造成生成图片内容混乱或者`html2canvas`方法不执行等异常问题。
:::

解决方案：

- useCORS 配置

```js
// 开启html2canvas 的 useCORS 配置
const options = {
  useCORS: true, // 允许使用跨域图片
  allowTaint: false // 不允许跨域图片污染画布
}

html2canvas(element, options)
```

- CORS 配置
  上一步的 useCORS 的配置，只是允许<img>接收跨域的图片资源，而对于解锁跨域图片在 canvas 上的绘制并导出，需要图片资源本身需要提供 CORS 支持。

:::warning 跨域图片使用 CDN 资源时的注意事项

验证图片资源是否支持 CORS 跨域，通过 Chrome 开发者工具可以看到图片请求响应头中应含有 Access-Control-Allow-Origin 的字段，即坊间常提到的跨域头。

不同的 CDN 服务商配置资源跨域头的方式不同，具体应咨询 CDN 服务商。

特殊情况下，部分 CDN 提供方可能会存在图片缓存不含 CORS 跨域头的情况。为保证快照显示正常，建议优先联系 CDN 寻求技术支持，不推荐通过图片链接后缀时间戳等方式强制回源，避免影响源站性能和 CDN 计费。
:::

- 服务端转发

:::tip 资源加载
资源加载不全，是造成快照不完整的一个常见因素。在生成快照时，如果部分资源没有加载完毕，那么生成的内容自然也谈不上完整。
:::

:::tip 滚动问题
典型特征：生成快照的顶部存在空白区域。

原因：一般是保存长图（超过一屏），并且滚动条不在顶部时导致（常见于 SPA 类应用）。
:::

解决方案：
在调用`html2canvas`之前，先记录此时的 scrollTop，然后调用 window.scroll(0, 0)将页面移动至顶部。待快照生成后，再调用 window.scroll(0, scrollTop)恢复原有纵向偏移量。

```js
<div className="page-home" id="page-home">
  <div id="home-box">
    <img src="/img2.jpeg" />
    <p>---------HTMLTOCANVAS---------</p>
    <div onClick="{handleGeneraterImg}">生成海报图</div>
    <div onClick="{handleSaveImg}">保存海报图</div>
    <img src="/img1.jpeg" />
  </div>
</div>
```

```js
let scrollTop = 0
const generaterCanvas = (target: HTMLElement) => {
  // 实际的滚动元素（按实际修改👇）
  const scrollElement = document.documentElement
  // 记录滚动元素纵向偏移量
  scrollTop = scrollElement.scrollTop
  let imgHeight = target.offsetHeight // 获取DOM高度
  let imgWidth = target.offsetWidth // 获取DOM宽度
  const options = {
    useCORS: true, // 允许使用跨域图片
    allowTaint: false, // 不允许跨域图片污染画布
    backgroundColor: 'black', //画布背景色
    width: imgWidth,
    height: imgHeight,
    scale: window.devicePixelRatio, // 处理模糊问题
    dpi: 300 // 处理模糊问题
  }
  // 针对滚动元素是 body 先作置顶
  window.scroll(0, 0)
  return new Promise((resolve, reject) => {
    html2canvas(target, options).then((canvas) => {
      resolve(canvas)
    })
  })
}

// 生成海报图
const handleGeneraterImg = () => {
  const box = document.getElementById('page-home')
  const target = document.getElementById('home-box')
  generaterCanvas(target)
    .then((canvas) => {
      const imgUrl = canvas.toDataURL('image/png')
      const img = new Image()
      img.src = imgUrl
      box.appendChild(img)
    })
    .finally(() => {
      // 恢复偏移量
      window.scroll(0, scrollTop)
    })
}
```

#### 清晰度优化

最终生成快照的清晰度，源头上取决于第一步中 DOM 转换成的 canvas 的清晰度。

以下介绍 5 种行之有效的清晰度优化方法。

- 使用 px 单位
  为了给到`html2canvas`明确的整数计算值，避免因小数舍入而导致的拉伸模糊，建议将布局中使用中使用%、vw、vh 或 rem 等单位的元素样式，统一改为使用 px。

#### 转换效率

### dom-to-image

[dom-to-image](https://github.com/tsayen/dom-to-image) 主要使用的是 SVG 实现方式，简单来说就是先把 DOM 转换为 SVG 然后再把 SVG 转换为图片。

#### SVG 转换

SVG 中有一个[foreignObject](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/foreignObject)，它允许包含来自不同的 XML 命名空间的元素（即 xhtml/html），支持内嵌 HTML 和 css 样式。利用这个特性，只需要将节点样式转换为内联后，用`foreignObject`包裹即可。

#### 主要方法

- `domtoimage.toPng(…)`：将节点转化为 png 格式的图片
- `domtoimage.toJpeg(…)`：将节点转化为 jpg 格式的图片
- `domtoimage.toSvg(…)`：将节点转化为 svg 格式的图片，生成的图片的格式都是 base64 格式
- `domtoimage.toBlob(…)`：将节点转化为二进制格式，这个可以直接将图片下载
- `domtoimage.toPixelData(…)`：获取原始像素值，以 Uint8Array 数组的形式返回，每 4 个数组元素表示一个像素点，即 rgba 值。这个方法也是挺实用的，可以用于 WebGL 中编写着色器颜色。

#### 主要属性

- filter ： 过滤器节点中默写不需要的节点；
- bgcolor ： 图片背景颜色；
- height, width ： 图片宽高；
- style ：传入节点的样式，可以是任何有效的样式；
- quality ： 图片的质量，也就是清晰度；一个介于 0 和 1 之间的数字，表示 JPEG 图像的图像质量（例如 0.92 => 92%）。默认为 1.0 (100%)
- cacheBust ： 将时间戳加入到图片的 url 中，相当于添加新的图片；
- imagePlaceholder ： 图片生成失败时，在图片上面的提示，相当于 img 标签的 alt；

#### 使用

```html
<div id="home-box" className="home-box">
  <img className="img2" src="/img2.jpeg" />
  <button onClick="{handleToImage}">Dom to Image</button>
  <button onClick="{handleSaveImg}">保存图片</button>
</div>
<img src="{imgUrl}" alt="" />
```

```js
const [imgUrl, setImgUrl] = useState()

/**
 *
 * @param target DOM
 * @param type 转换的图片格式，主要有 toPng，toJpeg，toSvg，toBlob，toPixelData
 * @param options 属性
 */
const convertToImg = (target: HTMLElement, type: string, options: {}) => {
  domtoimage[type](target)
    .then((dataUrl: SetStateAction<undefined>) => {
      setImgUrl(dataUrl)
    })
    .catch((err: any) => {
      console.log('转换失败', err)
    })
}

const handleToImage = () => {
  const target = document.getElementById('home-box')
  const options = { bgcolor: 'blue', width: 100, height: 100, imagePlaceholder: '图片' }
  convertToImg(target, 'toSvg', options)
}

// 保存图片
const handleSaveImg = () => {
  let link = document.createElement('a')
  link.download = 'my-image-name.png'
  link.href = imgUrl
  imgUrl && link.click()
}
```

#### 浏览器支持情况

支持 Chrome 和 Firefox，Chrome 在大型 DOM 树上的性能明显更好，这可能是因为它对 SVG 的支持更高效，而且它支持属性`CSSStyleDeclaration.cssText`

不支持（也不会）支持 Internet Explorer，因为它不支持 SVG`foreignObject`标签

不支持 Safari ，因为它在 `foreignObject`标签上使用了更严格的安全模型。toSvg 建议的解决方法是在服务器上使用和呈现。

#### 源码解析
