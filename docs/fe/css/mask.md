# mask 简介

CSS 的 `mask` 属性允许使用者通过部分或者完全隐藏一个元素的可见区域。这种效果可以通过遮罩或者裁切特定区域的图片。mask 和 background 用法是相仿的，`mask` 的值有这些：

- mask-clip
- mask-composite
- mask-image
- mask-mode
- mask-origin
- mask-position
- mask-repeat
- mask-size
- mask-type

下面具体介绍每一个值的意义。

### 1、mask-clip

| 值          | 含义                                                                                                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content-box | 将绘制的内容剪切到内容框中。                                                                                                                                                      |
| padding-box | 将绘制的内容剪切到 padding 框中。                                                                                                                                                 |
| border-box  | 将绘制的内容剪切到 border 框中。                                                                                                                                                  |
| margin-box  | 将绘制的内容剪切到 margin 框中。                                                                                                                                                  |
| fill-box    | 将绘制的内容剪切到对象边界框中。                                                                                                                                                  |
| stroke-box  | 将绘制的内容剪切到 stroke 边界框中。                                                                                                                                              |
| view-box    | 使用最近的 SVG 视口作为参考框。如果为创建 SVG 视口的元素指定了 viewBox 属性，则参考框位于由 viewBox 属性建立的坐标系的原点，并且参考框的尺寸被设置为 viewBox 属性的宽度和高度值。 |
| no-clip     | 没有被剪切。                                                                                                                                                                      |

`mask-clip` 的默认值是 `border-box`，而且支持多属性值，例如：

```css
mask-clip: content-box, border-box;
```

虽然支持的属性值挺多，但是对于普通元素而言，生效的其实就前面 4 个，Firefox 浏览器还支持 no-clip。

::: tip
fill-box，stroke-box，view-box 要与 SVG 元素关联才有效果，目前还没有任何浏览器对其进行支持。
:::

### 2、mask-composite

| 值        | 含义                                                       |
| --------- | ---------------------------------------------------------- |
| add       | 遮罩累加。                                                 |
| subtract  | 遮罩相减。也就是遮罩图片重合的地方不显示。                 |
| intersect | 遮罩相交。也就是遮罩图片重合的地方才显示遮罩。             |
| exclude   | 遮罩排除。也就是后面遮罩图片重合的地方排除，当作透明处理。 |

::: tip 属性值支持情况
目前仅 Firefox 浏览器支持，Chrome 默认 mask-composite 计算值是 source-over，和标准默认值 add 有些差异，作用是一样的，表示多个图片遮罩效果是累加。
:::

### 3、mask-image

`mask-image` 指遮罩使用的图片资源，默认值是 none，也就是无遮罩图片。所谓遮罩，就是原始图片只显示遮罩图片非透明的部分。
`mask-image` 也支持多属性值，例如：

```css
mask-image: url(...), url(...);
```

### 4、mask-mode

`mask-mode` 属性的默认值是 `match-source`，意思是根据资源的类型自动采用合适的遮罩模式。
例如，如果遮罩使用的是 SVG 中的`<defs>`中的`<mask>`元素，则此时的 mask-mode 属性的计算值是 luminance，表示基于亮度遮罩。如果是其他场景，则计算值是 alpha，表示基于透明度遮罩。

| 值           | 含义                                 |
| ------------ | ------------------------------------ |
| alpha        | 基于透明度遮罩                       |
| luminance    | 基于亮度遮罩                         |
| match-source | 根据资源的类型自动采用合适的遮罩模式 |

`mask-mode` 也支持多属性值，例如：

```css
mask-mode: alpha, match-source;
```

::: tip
目前，mask-mode 仅 Firefox 浏览器支持，因此，Chrome 浏览器是看到的依然是基于 alpha 遮罩的效果，颜色不像上图那样淡。
:::

### 5、mask-repeat

| 值        | 含义                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------- |
| repeat-x  | 水平 x 平铺                                                                                    |
| repeat-y  | 垂直 y 平铺                                                                                    |
| repeat    | 默认值，水平和垂直平铺                                                                         |
| no-repeat | 不平铺                                                                                         |
| space     | 表示遮罩图片尽可能的平铺同时不发生任何剪裁                                                     |
| round     | 表示遮罩图片尽可能靠在一起没有任何间隙，同时不发生任何剪裁。这就意味着图片可能会有比例的缩放。 |

`mask-repeat` 也支持多属性值，例如：

```css
mask-repeat: space round, no-repeat;
```

### 6、 mask-position

- 支持单个关键字，如 top，bottom，left，right，center（缺省关键字的解析为 center）
- 支持各类数值（百分数或数值），例如：`mask-position: 30% 50%;`
- mask-position 也支持多属性值，例如：`mask-position: 0 0, center;`
- Chrome 和 Firefox 浏览器都支持 mask-position 属性，Chrome 还需要-webkit-私有前缀，Firefox 浏览器现在已经不需要了。

### 7、mask-origin

| 值          | 含义                                                                                                                                                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content-box | 位置相对于内容框。                                                                                                                                                               |
| padding-box | 位置相对于 padding 框。                                                                                                                                                          |
| border-box  | 位置相对于 border 框。                                                                                                                                                           |
| margin-box  | 位置相对于 margin 框。                                                                                                                                                           |
| fill-box    | 位置相对于对象边界框。                                                                                                                                                           |
| stroke-box  | 位置相对于 stroke 边界框。                                                                                                                                                       |
| view-box    | 使用最近的 SVG 视口作为参考框.如果为创建 SVG 视口的元素指定了 viewBox 属性，则参考框位于由 viewBox 属性建立的坐标系的原点，并且参考框的尺寸被设置为 viewBox 属性的宽度和高度值。 |

`mask-origin` 的默认值是 `border-box`，而且支持多属性值，例如：

```css
mask-origin: content-box, border-box;
```

虽然支持的属性值挺多，但是对于普通元素而言，生效的其实就前面 4 个。`fill-box`，`stroke-box`，`view-box` 要与 SVG 元素关联才有效果，目前还没有任何浏览器对其进行支持。

### 8、mask-size

mask-size 作用是控制遮罩图片尺寸，默认值是 auto。
支持 contain 和 cover 这两个关键字
支持各类数值（缺省高度会自动计算为 auto），例如：`mask-size: auto 6px;`
同样支持多属性值，例如：`mask-size: 50%, 25%, 25%;`

### 9、mask-type

mask-type 属性功能上和 mask-mode 类似，都是设置不同的遮罩模式。
但还是有个很大的区别，那就是 mask-type 只能作用在 SVG 元素上，本质上是由 SVG 属性演变而来，因此，Chrome 等浏览器都是支持的。

::: tip
mask-mode 是一个针对所有元素的 CSS3 属性，Chrome 等浏览器并不支持，目前仅 Firefox 浏览器支持。
由于只能作用在 SVG 元素上，因此默认值表现为 SVG 元素默认遮罩模式，也就是默认值是 luminance，亮度遮罩模式。
如果需要支持透明度遮罩模式，可以这么设置：`mask-type: alpha;`
:::

到这里，CSS mask 的 9 个值的属性就全部介绍完毕了。
