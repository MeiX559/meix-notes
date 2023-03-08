# canvas 指南

:::tip
Canvas API 提供了一个通过`JavaScript` 和 `HTML`的 canvas 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。
:::

Canvas API 主要聚焦于 2D 图形。而同样使用 canvas 元素的 WebGL API 则用于绘制硬件加速的 2D 和 3D 图形。

## 基础实例

```html
<canvas id="canvas"></canvas>
```

[Document.getElementById()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById) 方法获取 HTML canvas 元素的引用

[HTMLCanvasElement.getContext()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext) 方法获取这个元素的 context——图像稍后将在此被渲染。

由 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 接口完成实际的绘制。fillStyle 属性让长方形变成绿色。fillRect() 方法将它的左上角放在 (10, 10)，把它的大小设置成宽 150 高 100。

```js
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'green'
ctx.fillRect(10, 10, 150, 100)
```
