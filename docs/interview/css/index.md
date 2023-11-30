# CSS 相关

## 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？

盒模型由四部分组成，分别是 margin,padding,border,content.

标准盒模型和 IE 盒模型的区别就是 width,height 所对应的范围不一样，标准盒模型的 width,height 只包含 content，而 IE 盒模型的 width,height 包含 content,border,padding.一般来说，可以通过修改 box-sizing 属性来改变元素的盒模型。

## CSS 选择符有哪些？

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

## ::before 和:after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用

在 css3 中使用单冒号来表示伪类，用双冒号来表示伪元素。但是为了兼容已有的伪元素的写法，在一些浏览器中也可以使用单冒号来表示伪元素。
伪类一般匹配的是元素的一些特殊状态，如 hover、link 等，而伪元素一般匹配的特殊的位置，比如 after、before 等。

## 伪类与伪元素的区别

css 引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分。

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，可以通过:hover 来描述这个元素的状态。
伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许为元素的某些部分设置样式。比如说，可以通过::before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

## CSS 中哪些属性可以继承？

每一个属性在定义中都给出了这个属性是否具有继承性，一个具有继承性的属性会在没有指定值的时候，会使用父元素的同属性的值来作为自己的值。

一般具有继承性的属性有，字体相关的属性，font-size 和 font-weight 等。文本相关的属性，color 和 text-align 等。

表格的一些布局属性、列表属性如 list-style 等。还有光标属性 cursor、元素可见性 visibility。

当一个属性不是继承属性的时候，也可以通过将它的值设置为 inherit 来使它从父元素那获取同名的属性值来继承。

## CSS 优先级算法如何计算？

判断优先级时，首先会判断一条属性声明是否有权重，也就是是否在声明后面加上了!important。一条声明如果加上了权重，那么它的优先级就是最高的，前提是它之后不再出现相同权重的声明。如果权重相同，则需要去比较匹配规则的特殊性。

选择器的特殊性可以分为四个等级，第一个等级是行内样式，为 1000，第二个等级是 id 选择器，为 0100，第三个等级是类选择器、伪类选择器和属性选择器，为 0010，第四个等级是元素选择器和伪元素选择器，为 0001。规则中每出现一个选择器，就将它的特殊性进行叠加，这个叠加只限于对应的等级的叠加，不会产生进位。

## 关于伪类 LVHA 的解释?

a 标签有四种状态：链接访问前、链接访问后、鼠标滑过、激活，分别对应四种类:link、:visited、:hover、:active；
当链接未访问过时：

1. 当鼠标滑过 a 链接时，满足:link 和:hover 两种状态，要改变 a 标签的颜色，就必须将:hover 伪类在:link 伪类后面声明；
2. 当鼠标点击激活 a 链接时，同时满足:link、:hover、:active 三种状态，要显示 a 标签激活时的样式（:active），必须将:active 声明放到:link 和:hover 之后。

因此得出 LVHA 这个顺序。当链接访问过时，情况基本同上，只不过需要将:link 换成:visited。
这个顺序能不能变？可以，但也只有:link 和:visited 可以交换位置，因为一个链接要么访问过要么没访问过，不可能同时满足，也就不存在覆盖的问题。

## CSS3 新增伪类有哪些？

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

## 关于居中

1. 利用 margin:0 auto 实现水平居中（宽高固定）
2. 利用绝对定位+margin:auto 居中（宽高固定）
3. 利用绝对定位+top:50%，left:50%+margin 负值
4. 利用绝对定位+top:50%，left:50%+translate(-50%,-50%)
5. flex 布局+align-items:center + justify-content:center

## display 有哪些值？说明他们的作用

- block 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
- none 元素不显示，并从文档流中移除。
- inline 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
- inline-block 默认宽度为内容宽度，可以设置宽高，同行显示。
- list-item 像块类型元素一样显示，并添加样式列表标记。
- table 此元素会作为块级表格来显示。
- inherit 规定应该从父元素继承 display 属性的值。
- flex

## position 的值 relative 和 absolute 定位原点是？

- static:默认值。没有定位，元素出现在正常的流中（忽略 top,bottom,left,right,z-index 声明）。inherit 规定从父元素继承 position 属性的值。
- relative:生成相对定位的元素，相对于其元素本身所在正常位置进行定位。
- absolute:生成绝对定位的元素，相对于值不为 static 的第一个父元素的 padding box 进行定位，也可以理解为离自己这一级元素最近的一级 position 设置为 absolute 或者 relative 的父元素的 padding box 的左上角为原点的。
- fixed:生成绝对定位的元素，相对于浏览器窗口进行定位。

## 请解释一下 CSS3 的 Flex box（弹性盒布局模型），以及适用场景？

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
