# CSS 相关

## CSS 日常业务总结

### 设置文字渐变

```css
background-image: linear-gradient(270deg, #fa3680, #b41df8);
background-clip: text;
color: transparent;
```

### 设置边框渐变

```css
border: 0.5px solid transparent;
background-image: linear-gradient(#fff, #fff), linear-gradient(270deg, #fa3680, #b41df8);
background-origin: border-box;
background-clip: content-box, border-box;
```

### flex 语法与计算规则

flex 可以说是一次性解决了前端布局的所有的问题（当然，并没有完全解决，要不然也不会有 grid layout 了），以前很难实现的布局效果在 flex 下简直不能更简单，以至于一些其它平台也开始吸纳 flex 的布局思想，也有些开源项目把 flex 的布局方式移植到其它平台。

对于三栏等高布局，且两边的宽度固定，中间的宽度自动撑开，使用 flex 布局非常简单，只需要使用如下代码就可以实现：

```html
<style>
  section {
    display: flex;
  }
  .left-side,
  .right-side {
    width: 200px;
  }
  .content {
    flex-grow: 1;
  }
</style>
<section>
  <div class="left-side"></div>
  <div class="content"></div>
  <div class="right-side"></div>
</section>
```

其中 section 元素的宽度将会像 block 元素一样尽量的宽，对外面的元素来说，它的行为很像一个 block 块。三个元素会从左往右占据父元素的空间。左右侧边栏的宽度都是 200px，中间 .content 元素的宽度将会占据 section 元素的剩余宽度。

另外，section 的高度会自动被最高的一个子元素撑开，同时其它子元素的高度也会被拉到跟 section 元素一样高，而如果给 section 元素设置了高度，而所有子元素的高度设置为 auto ，所有的子元素也都会自动跟父元素一样高.

## CSS 面试总结

### 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？

盒模型由四部分组成，分别是 margin,padding,border,content.

标准盒模型和 IE 盒模型的区别就是 width,height 所对应的范围不一样，标准盒模型的 width,height 只包含 content，而 IE 盒模型的 width,height 包含 content,border,padding.一般来说，可以通过修改 box-sizing 属性来改变元素的盒模型。

### CSS 选择符有哪些？

- id 选择器（#myid）
- 类选择器（.myclassname）
- 标签选择器（div，h1，p）
- 后代选择器（h1 p）
- 相邻后代选择器（子）选择器（ul>li）
- 兄弟选择器（li~a）
- 相邻兄弟选择器（li+a）
- 属性选择器（a[rel="external"]）
- 伪类选择器（a:hover,li:nth-child）
- 伪元素选择器（::before、::after）
- 通配符选择器（\*）

### ::before 和:after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用

在 css3 中使用单冒号来表示伪类，用双冒号来表示伪元素。但是为了兼容已有的伪元素的写法，在一些浏览器中也可以使用单冒号来表示伪元素。
伪类一般匹配的是元素的一些特殊状态，如 hover、link 等，而伪元素一般匹配的特殊的位置，比如 after、before 等。

### 伪类与伪元素的区别

css 引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分。

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，可以通过:hover 来描述这个元素的状态。
伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许为元素的某些部分设置样式。比如说，可以通过::before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

### CSS 中哪些属性可以继承？

每一个属性在定义中都给出了这个属性是否具有继承性，一个具有继承性的属性会在没有指定值的时候，会使用父元素的同属性的值来作为自己的值。

一般具有继承性的属性有，字体相关的属性，font-size 和 font-weight 等。文本相关的属性，color 和 text-align 等。

表格的一些布局属性、列表属性如 list-style 等。还有光标属性 cursor、元素可见性 visibility。

当一个属性不是继承属性的时候，也可以通过将它的值设置为 inherit 来使它从父元素那获取同名的属性值来继承。

### CSS 优先级算法如何计算？

判断优先级时，首先会判断一条属性声明是否有权重，也就是是否在声明后面加上了!important。一条声明如果加上了权重，那么它的优先级就是最高的，前提是它之后不再出现相同权重的声明。如果权重相同，则需要去比较匹配规则的特殊性。

选择器的特殊性可以分为四个等级，第一个等级是行内样式，为 1000，第二个等级是 id 选择器，为 0100，第三个等级是类选择器、伪类选择器和属性选择器，为 0010，第四个等级是元素选择器和伪元素选择器，为 0001。规则中每出现一个选择器，就将它的特殊性进行叠加，这个叠加只限于对应的等级的叠加，不会产生进位。

### 关于伪类 LVHA 的解释?

a 标签有四种状态：链接访问前、链接访问后、鼠标滑过、激活，分别对应四种类:link、:visited、:hover、:active；
当链接未访问过时：

1. 当鼠标滑过 a 链接时，满足:link 和:hover 两种状态，要改变 a 标签的颜色，就必须将:hover 伪类在:link 伪类后面声明；
2. 当鼠标点击激活 a 链接时，同时满足:link、:hover、:active 三种状态，要显示 a 标签激活时的样式（:active），必须将:active 声明放到:link 和:hover 之后。

因此得出 LVHA 这个顺序。当链接访问过时，情况基本同上，只不过需要将:link 换成:visited。
这个顺序能不能变？可以，但也只有:link 和:visited 可以交换位置，因为一个链接要么访问过要么没访问过，不可能同时满足，也就不存在覆盖的问题。

超链接访问过后 hover 样式就不出现了，被点击访问过的超链接样式不再具有 hover 和 active 了

解决方法：改变 CSS 属性的排列顺序 L-V-H-A

```css
a:link,
a:visited {
  color: #000;
  text-decoration: none;
}

a:hover {
  color: #f00;
  text-decoration: underline;
}

a:active {
  color: #0f0;
}
```

### CSS3 新增伪类有哪些？

1. elem:nth-child(n)选中父元素下的第 n 个子元素，并且这个子元素的标签名为 elem，n 可以接受具体的数值，也可以接受函数。
2. elem:nth-last-child(n) 作用同上，不过是从后开始查找。
3. elem:last-child 选中最后一个子元素。
4. elem:only-child 如果 elem 是父元素下唯一的子元素，则选中之。
5. elem:nth-of-type(n) 选中父元素下第 n 个 elem 类型元素，n 可以接受具体的数值，也可以接受函数。
6. elem:first-of-type 选中父元素下第一个 elem 类型元素。
7. elem:last-of-type 选中父元素下最后一个 elem 类型元素。
8. elem:only-of-type 如果父元素下的子元素只有一个 elem 类型元素，则选中该元素。
9. elem:empty 选中不包含子元素和内容的 elem 类型元素。
10. elem:target 选择当前活动的 elem 元素。
11. :not(elem) 选择非 elem 元素的每个元素。
12. :enabled 控制表单控件的禁用状态。
13. :disabled 控制表单控件的禁用状态。
14. :checked 单选框或复选框被选中。

### 关于居中

1. 利用 margin:0 auto 实现水平居中（宽高固定）
2. 利用绝对定位+margin:auto 居中（宽高固定）
3. 利用绝对定位+top:50%，left:50%+margin 负值
4. 利用绝对定位+top:50%，left:50%+translate(-50%,-50%)
5. flex 布局+align-items:center + justify-content:center

### display 有哪些值？说明他们的作用

- block 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
- none 元素不显示，并从文档流中移除。
- inline 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
- inline-block 默认宽度为内容宽度，可以设置宽高，同行显示。
- list-item 像块类型元素一样显示，并添加样式列表标记。
- table 此元素会作为块级表格来显示。
- inherit 规定应该从父元素继承 display 属性的值。
- flex

### position 的值 relative 和 absolute 定位原点是？

- static:默认值。没有定位，元素出现在正常的流中（忽略 top,bottom,left,right,z-index 声明）。inherit 规定从父元素继承 position 属性的值。
- relative:生成相对定位的元素，相对于其元素本身所在正常位置进行定位。
- absolute:生成绝对定位的元素，相对于值不为 static 的第一个父元素的 padding box 进行定位，也可以理解为离自己这一级元素最近的一级 position 设置为 absolute 或者 relative 的父元素的 padding box 的左上角为原点的。
- fixed:生成绝对定位的元素，相对于浏览器窗口进行定位。

### 请解释一下 CSS3 的 Flex box（弹性盒布局模型），以及适用场景？

flex 布局是 CSS3 新增的一种布局方式，可以通过将一个元素的 display 属性值设置为 flex 从而使它成为一个 flex 容器，它的所有子元素都会成为它的项目。
一个容器默认有两条轴，一个是水平的主轴，一个是与主轴垂直的交叉轴。可以使用 flex-direction 来指定主轴的方向。

可以使用 justify-content 来指定元素在主轴上的排列方式，使用 align-items 来指定元素在交叉轴上的排列方式。还可以使用 flex-wrap 来规定当一行排列不下时的换行方式。
对于容器中的项目，可以使用 order 属性来指定项目的排列顺序，还可以使用 flex-grow 来指定当排列空间有剩余的时候，项目的放大比例。还可以使用 flex-shrink 来指定当排列空间不足时，项目的缩小比例。

以下 6 个属性设置在容器上。

- flex-direction 属性决定主轴的方向（即项目的排列方向）。
- flex-wrap 属性定义，如果一条轴线排不下，如何换行。
- flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。
- justify-content 属性定义了项目在主轴上的对齐方式。
- align-items 属性定义项目在交叉轴上如何对齐。
- align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

以下 6 个属性设置在项目上。

- order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
- flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
- flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
- flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。
- flex 属性是 flex-grow，flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。
- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

### 用纯 CSS 创建一个三角形的原理是什么？

用纯 CSS 创建一个三角形的原理是利用了 border 属性。具体来说，可以设置一个宽高为 0 的 div，假设要创建一个上三角形，那么就可以设置左右边框宽度，让其的 border-color 设置为 transparent，再设置下边框的宽以及 border-color 为三角形的实际背景色，这样就创建了一个上三角形。

```css
/* 上三角形 */
.top-triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid red;
}
/* 下三角形 */
.bottom-triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 50px solid red;
}
/* 左三角形 */
.left-triangle {
  width: 0;
  height: 0;
  border-left: 50px solid red;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}
/* 右三角形 */
.right-triangle {
  width: 0;
  height: 0;
  border-right: 50px solid red;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}
```

### CSS 多列等高如何实现？

### 经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么？

- 按钮文字不居中问题，即使设置 line-height 和 height 一样也不能居中（安卓有问题，识别不了 line-height）

解决：

```markdown
<!-- 项目的 inde.html 中加上 lang="zh-cmn-Hans" -->

<html lang="zh-cmn-Hans">

<!-- 设置 -->

font-family: sans-serif;
line-height: 1.25rem;
```

- 移动端点击 a 链接出现蓝色背景问题

```css
a:link,
a:active,
a:visited,
a:hover {
  background: none;
  color: #333;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
```

### 为什么要初始化 CSS 样式？

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。

### width:auto 和 width:100%的区别

一般而言，width:100%会使元素 box 的宽度等于父元素的 content box 的宽度。
width:auto 会使元素撑满整个父元素，margin、border、padding、content 区域会自动分配水平空间。

### 绝对定位元素与非绝对定位元素的百分比计算的区别

绝对定位元素的宽高百分比是相对于临近的 position 不为 static 的祖先元素的 padding box 来计算的。非绝对定位元素的宽高百分比则是相对于父元素的 content box 来计算的。

### 简单介绍使用图片 base64 编码的优点和缺点

base64 编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，在页面上显示的时候，可以用该字符串来代替图片的 url 属性。

- 优点：减少一个图片的 HTTP 请求
- 缺点：根据 base64 的编码原理，编码后的大小会比原文件大小大 1/3，如果把大图片编码到 html/css 中，不仅会造成文件体积的增加，影响文件的加载速度，还会增加浏览器对 html 或 css 文件解析渲染的时间。

### margin 重叠问题的理解

margin 重叠指的是在垂直方向上，两个相邻元素的 margin 发生重叠的情况。

一般来说可以分为四种情形：

- 第一种是相邻兄弟元素的 marin-bottom 和 margin-top 的值发生重叠。这种情况下可以通过设置其中一个元素为 BFC 来解决。
- 第二种是父元素的 margin-top 和子元素的 margin-top 发生重叠。它们发生重叠是因为它们是相邻的，所以可以通过这一点来解决这个问题。可以为父元素设置 border-top、padding-top 值来分隔它们，当然也可以将父元素设置为 BFC 来解决。
- 第三种是高度为 auto 的父元素的 margin-bottom 和子元素的 margin-bottom 发生重叠。它们发生重叠一个是因为它们相邻，一个是因为父元素的高度不固定。因此可以为父元素设置 border-bottom、padding-bottom 来分隔它们，也可以为父元素设置一个高度，max-height 和 min-height 也能解决这个问题。当然将父元素设置为 BFC 是最简单的方法。
- 第四种情况，是没有内容的元素，自身的 margin-top 和 margin-bottom 发生的重叠。可以通过为其设置 border、padding 或者高度来解决这个问题。

### 对 BFC 规范（块级格式化上下文：block formatting context）的理解？

BFC 指的是块级格式化上下文，一个元素形成了 BFC 之后，那么它内部元素产生的布局不会影响到外部元素，外部元素的布局也不会影响到 BFC 中的内部元素。一个 BFC 就像是一个隔离区域，和其他区域互不影响。

哪些元素可以形成 BFC：

1. 一般来说根元素是一个 BFC 区域
2. 浮动元素(float)和定位元素(absolute,relative)
3. display 属性的值为 inline-block、flex
4. overflow 的值不为 visible

### 请解释一下为什么需要清除浮动？清除浮动的方式

清除浮动的主要原因是为了解决父元素因为子元素的浮动而引起的内部高度为 0 的问题。浮动的元素会导致高度塌陷，使得页面后面的布局不能正常显示。例如，如果对父级设置了背景属性，高度塌陷将导致父级不能撑开，进而影响到背景图片的正常显示。

清除浮动的方式：

1. 通过设置父元素的 overflow 属性为 hidden 或 auto，这样可以清除其子元素的浮动效果。
2. 使用 clear:both、clear:left 或 clear:right 指令来清除浮动。这些指令可以将之前的浮动清除掉，但要注意这种方式应仅用于最后一个浮动元素后面，否则可能会影响布局。
3. 定义一个特殊的类（如.clearfix），并利用该类的：:before 和：:after 伪元素来清除浮动。
4. 采用额外标签法：给需要清除浮动的元素之后添加一个空的标签。这种方法可以在不影响页面布局的情况下清除浮动。
5. 使用 BFC 块级格式化上下文来清除浮动。因为 BFC 元素不会影响外部元素的特点，所以 BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。

### CSS 优化、提高性能的方法有哪些？

- css 压缩：将写好的 css 进行打包压缩，可以减少很多的体积。
- 尽量减少页面重排、重绘。
- 尽量少使用高性能属性：浮动、定位。
- 属性值为 0 时，不加单位。

### 怎么让 Chrome 支持小于 12px 的文字？

使用 css3 的 transform 缩放属性-webkit-transform:scale(0.5);注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用 display:block/inline-block/...;

### 设备像素、css 像素、设备独立像素、dpr、ppi 之间的区别

- 设备像素指的是物理像素，一般手机的分辨率指的就是设备像素，一个设备的设备像素是不可变的。
- css 像素和设备独立像素是等价的，不管在何种分辨率的设备上，css 像素的大小应该是一致的，css 像素是一个相对单位，它是相对于设备像素的，一个 css 像素的大小取决于页面缩放程度和 dpr 的大小。
- dpr 指的是设备像素和设备独立像素的比值，一般的 pc 屏幕，dpr=1。在 iphone4 时，苹果推出了 retina 屏幕，它的 dpr 为 2。屏幕的缩放会改变 dpr 的值。
- ppi 指的是每英寸的物理像素的密度，ppi 越大，屏幕的分辨率越大。

### overflow:scroll 时不能平滑滚动的问题怎么处理？

以下代码可解决这种卡顿的问题：-webkit-overflow-scrolling:touch;是因为这行代码启用了硬件加速特性，所以滑动很流畅。

### 有一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度

使用 flex 布局，第二个 div 的 flex-grow 为 1。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>自适应高度</title>
    <style>
      .container {
        display: flex;
      }
      .box1 {
        height: 100px;
        background-color: red;
      }
      .box2 {
        flex-grow: 1;
        background-color: blue;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box1"></div>
      <div class="box2"></div>
    </div>
  </body>
</html>
```
