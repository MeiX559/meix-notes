# Canvas API

:::tip
Canvas API 提供了一个通过`JavaScript` 和 `HTML`的 canvas 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。
:::

Canvas API 主要聚焦于 2D 图形。而同样使用 canvas 元素的 WebGL API 则用于绘制硬件加速的 2D 和 3D 图形。

## 图像处理相关

### CanvasRenderingContext2D.drawImage()

Canvas API 允许将图像文件写入画布，做法是读取图片后，使用 drawImage()方法将这张图片放上画布。`CanvasRenderingContext2D.drawImage()`有三种使用格式。

```js
ctx.drawImage(image, dx, dy)
ctx.drawImage(image, dx, dy, dWidth, dHeight)
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

参数：

- image：图像元素
- sx：图像内部的横坐标，用于映射到画布的放置点上。
- sy：图像内部的纵坐标，用于映射到画布的放置点上。
- sWidth：图像在画布上的宽度，会产生缩放效果。如果未指定，则图像不会缩放，按照实际大小占据画布的宽度。
- sHeight：图像在画布上的高度，会产生缩放效果。如果未指定，则图像不会缩放，按照实际大小占据画布的高度。
- dx：画布内部的横坐标，用于放置图像的左上角
- dy：画布内部的纵坐标，用于放置图像的右上角
- dWidth：图像在画布内部的宽度，会产生缩放效果。
- dHeight：图像在画布内部的高度，会产生缩放效果。

示例：

下例是一个简单的使用场景，将一个 jpeg 图像放入画布中，图片在画布的左上角对其。

```html
<canvas width="{300}" height="{300}" id="c"></canvas>
```

```js
const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')
// 1. 创建 Image 对象
const img = new Image()
// 2. 引入图片
img.src = '/img1.jpeg'
// 3. 等待图片加载完成
img.onload = () => {
  // 设置canvas的宽高为图像的宽高，保证可以完整显示图片
  canvas.width = img.width
  canvas.height = img.height
  // 4. 使用 drawImage() 方法渲染图片
  ctx.drawImage(img, 0, 0, 300, 300)
}
```

#### 像素读写相关

:::tip 三个鱼像素读写相关的方法

- [CanvasRenderingContext2D.getImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)：将画布读取成一个 ImageData 对象
- [CanvasRenderingContext2D.putImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)：将 ImageData 对象写入画布
- [CanvasRenderingContext2D.createImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createImageData)：生成 ImageData 对象
  :::

##### getImageData()

`getImageData()`方法返回一个 `ImageData` 对象，用了描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为 sw、高为 sh。

**语法**：ctx.getImageData(sx, sy, sw, sh);

**参数**：

- sx:将要被提取的图像数据矩形区域的左上角 x 坐标。
- sy:将要被提取的图像数据矩形区域的左上角 y 坐标。
- sw:将要被提取的图像数据矩形区域的宽度。
- sh:将要被提取的图像数据矩形区域的高度。

**返回值**：一个 [ImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象，包含 canvas 给定的矩形图像数据。

- ImageData.data:Uint8ClampedArray 的实例
- ImageData.width:ImageData 的像素宽度
- ImageData.height:ImageData 的像素高度

##### putImageData()

`putImageData()`方法将 `ImageData` 对象的像素绘制在 canvas 画布上。该方法有两种使用格式:

```js
ctx.putImageData(imagedata, dx, dy)
ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
```

**参数**：

- imagedata：包含像素信息的 ImageData 对象。
- dx：canvas 元素内部的横坐标，用于放置 ImageData 图像的左上角。
- dy：canvas 元素内部的纵坐标，用于放置 ImageData 图像的左上角。
- dirtyX：ImageData 图像内部的横坐标，用于作为放置到 canvas 的矩形区域的左上角的横坐标，默认为 0。
- dirtyY：ImageData 图像内部的纵坐标，用于作为放置到 canvas 的矩形区域的左上角的纵坐标，默认为 0。
- dirtyWidth：放置到 canvas 的矩形区域的宽度，默认为 ImageData 图像的宽度。
- dirtyHeight：放置到 canvas 的矩形区域的高度，默认为 ImageData 图像的高度。

示例：

```js
// 将imageData对象绘制到canvas中
ctx.putImageData(imageData, 0, 0)
```

##### createImageData()

`createImageData()`方法用于生成一个空的 `ImageData` 对象，所有像素都是透明的黑色（即每个值都是 0）。该方法有两种使用格式:

```js
ctx.createImageData(width, height)
ctx.createImageData(imagedata)
```

**参数**：

- width：ImageData 对象的宽度，单位为像素。
- height：ImageData 对象的高度，单位为像素。
- imagedata：一个现有的 ImageData 对象，返回值将是这个对象的拷贝。

示例：

```js
const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')

// 生成一个空的ImageData对象，宽高为100
let imageData = ctx.createImageData(100, 100)
```

### CanvasRenderingContext2D.canvas

[CanvasRenderingContext2D.canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/canvas) 属性是 Canvas API 的一部分，是对与给定上下文关联的 [HTMLCanvasElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement) 对象的只读引用。如果没有 canvas 元素与之对应，对象值为 null 。

```js
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.canvas === canvas // true
```

### 图像变换

:::tip 图像变换方法

- [CanvasRenderingContext2D.rotate()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/rotate)：图像旋转
- [CanvasRenderingContext2D.scale()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/scale)：图像缩放
- [CanvasRenderingContext2D.translate()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/translate)：图像平移
- [CanvasRenderingContext2D.transform()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/transform)：通过一个变换矩阵完成图像变换
- [CanvasRenderingContext2D.setTransform()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setTransform)：取消前面的图像变换
  :::

### HTMLCanvasElement 的方法

#### toDataURL()

[HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL) 方法返回一个包含图片展示的 data URI 。可以使用 type 参数指定其类型，默认为 PNG 格式。

**语法**：canvas.toDataURL(type, encoderOptions);

**参数**：

- type：图片格式，默认为 image/png
- encoderOptions ：在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。

**返回值**：一个 Data URI 格式的字符串

```js
function convertCanvasToImage(canvas) {
  let image = new Image()
  image.src = canvas.toDataURL('image/png')
  return image
}
```

转换为不同质量的 jpeg 图像

```js
let fullQuality = canvas.toDataURL('image/jpeg', 0.9)
let mediumQuality = canvas.toDataURL('image/jpeg', 0.6)
let lowQuality = canvas.toDataURL('image/jpeg', 0.3)
```
