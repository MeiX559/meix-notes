# dom-to-image 源码解析

## 原理

[dom-to-image](https://github.com/tsayen/dom-to-image) 主要使用的是 SVG 实现方式，简单来说就是先把 DOM 转换为 SVG 然后再把 SVG 转换为图片。

## SVG 转换

SVG 中有一个[foreignObject](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/foreignObject)，这个元素的作用是可以在其中使用具有其它 XML 命名空间的 XML 元素，支持内嵌 HTML 和 css 样式。利用这个特性，只需要将节点样式转换为内联后，用`foreignObject`包裹即可。举个例子：

```js
<svg xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="120" height="50">
    <body xmlns="http://www.w3.org/1999/xhtml">
      <p>文字。</p>
    </body>
  </foreignObject>
</svg>
```

可以看到`foreignObject`标签里面有一个设置了 xmlns=“<http://www.w3.org/1999/xhtml>”命名空间的 body 标签，此时 body 标签及其子标签都会按照 XHTML 标准渲染，实现了 SVG 和 XHTML 的混合使用。

## 主要方法

- `domtoimage.toPng(…)`：将节点转化为 png 格式的图片
- `domtoimage.toJpeg(…)`：将节点转化为 jpg 格式的图片
- `domtoimage.toSvg(…)`：将节点转化为 svg 格式的图片，生成的图片的格式都是 base64 格式
- `domtoimage.toBlob(…)`：将节点转化为二进制格式，这个可以直接将图片下载
- `domtoimage.toPixelData(…)`：获取原始像素值，以 Uint8Array 数组的形式返回，每 4 个数组元素表示一个像素点，即 rgba 值。这个方法也是挺实用的，可以用于 WebGL 中编写着色器颜色。

## 主要属性

- filter ： 过滤器节点中默写不需要的节点；
- bgcolor ： 图片背景颜色；
- height, width ： 图片宽高；
- style ：传入节点的样式，可以是任何有效的样式；
- quality ： 图片的质量，也就是清晰度；一个介于 0 和 1 之间的数字，表示 JPEG 图像的图像质量（例如 0.92 => 92%）。默认为 1.0 (100%)
- cacheBust ： 将时间戳加入到图片的 url 中，相当于添加新的图片；
- imagePlaceholder ： 图片生成失败时，在图片上面的提示，相当于 img 标签的 alt；

## 使用

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

## 浏览器支持情况

支持 Chrome 和 Firefox，Chrome 在大型 DOM 树上的性能明显更好，这可能是因为它对 SVG 的支持更高效，而且它支持属性`CSSStyleDeclaration.cssText`

不支持（也不会）支持 Internet Explorer，因为它不支持 SVG`foreignObject`标签

不支持 Safari ，因为它在 `foreignObject`标签上使用了更严格的安全模型。toSvg 建议的解决方法是在服务器上使用和呈现。

## 源码分析

核心 API

- toSvg
- toPng
- toJpeg
- toBlob
- toPixelData

上述这几个方法实现方式都差不多，主要实现方式：

1. 递归 clone,处理 dom 节点
2. 将 dom 节点转化为 svg（主要使用 foreignObject 将 dom 包裹，再在 svg 内部嵌入 XHTML）
3. 转换为 svg 后处理为 dataUrl
4. 最后处理为 canvas

以下通过 toPng 展开说明，其他方法的实现与 toPng 类似：

1. toPng(调用 draw，实现 canvas=>png)

```js
function toPng(node, options) {
  return draw(node, options || {}).then(function (canvas) {
    return canvas.toDataURL()
  })
}
```

toPng 是通过 draw 方法将 dom 节点转为 canvas，然后通过 canvas 获取图片资源。

2. draw(调用 toSvg，实现 dom=>canvas)

```js
function draw(domNode, options) {
  // 将DOM节点转换为svg
  return (
    toSvg(domNode, options)
      // 拿到的svg是image data URL,这里进一步通过svg创建图片
      .then(util.makeImage)
      .then(util.delay(100))
      .then(function (image) {
        // 通过图片创建canvas并返回
        var canvas = newCanvas(domNode)
        canvas.getContext('2d').drawImage(image, 0, 0)
        return canvas
      })
  )
  // 新建canvas节点，处理dataUrl资源，和options参数
  function newCanvas(domNode) {
    var canvas = document.createElement('canvas')
    canvas.width = options.width || util.width(domNode)
    canvas.height = options.height || util.height(domNode)

    if (options.bgcolor) {
      var ctx = canvas.getContext('2d')
      ctx.fillStyle = options.bgcolor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    return canvas
  }
}
```

draw 方法调用 toSvg 方法拿到 dataUrl 后，将其转换为 canvas 并返回。

3. toSvg(调用 cloneNode 和 makeSvgDataUri，实现 dom=>svg)

```js
function toSvg(node, options) {
  options = options || {}
  copyOptions(options)
  return (
    Promise.resolve(node)
      .then(function (node) {
        return cloneNode(node, options.filter, true) // 递归克隆dom节点
      })
      // 嵌入字体,找出所有font-face样式,添加入一个新的style里面
      .then(embedFonts)
      // 将图片链接转换为dataUrl形式使用
      .then(inlineImages)
      // 将options里面的一些style放进style里面
      .then(applyOptions)
      .then(function (clone) {
        // 创建svg，将dom节点通过 XMLSerializer().serializeToString() 序列化为字符串
        // 然后用 foreignObject 包裹，就能将dom转为svg。
        return makeSvgDataUri(
          clone,
          options.width || util.width(node),
          options.height || util.height(node)
        )
      })
  )
  function applyOptions(clone) {
    // 处理一些options的样式
    ...
    return clone
  }
}
```

toSvg 方法主要是将 dom 转换为 svg,并将 svg 处理为 dataUrl。

4. cloneNode(克隆处理 dom 和 css)

```js
function cloneNode(node, filter, root) {
  if (!root && filter && !filter(node)) return Promise.resolve()

  return (
    Promise.resolve(node)
      // 克隆第一层
      .then(makeNodeCopy)
      .then(function (clone) {
        // 克隆子节点
        return cloneChildren(node, clone, filter)
      })
      .then(function (clone) {
        // 处理节点样式，伪类样式，输入内容以及处理svg，创建命名空间
        return processClone(node, clone)
      })
  )
}
```

5. makeSvgDataUri(实现 dom=>svg data:url)

```js
function makeSvgDataUri(node, width, height) {
  return (
    Promise.resolve(node)
      .then(function (node) {
        node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
        // 将dom节点通过 XMLSerializer().serializeToString() 序列化为字符串
        return new XMLSerializer().serializeToString(node)
      })
      .then(util.escapeXhtml)
      .then(function (xhtml) {
        return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>'
      })
      // 将foreignObject包裹后的dom转换为svg ,不指定xmlns命名空间是不会渲染的
      .then(function (foreignObject) {
        return (
          '<svg xmlns="http://www.w3.org/2000/svg" width="' +
          width +
          '" height="' +
          height +
          '">' +
          foreignObject +
          '</svg>'
        )
      })
      .then(function (svg) {
        // 将svg处理为dataUrl
        return 'data:image/svg+xml;charset=utf-8,' + svg
      })
  )
}
```

用 foreignObject 包裹将 dom 转换为 svg.
