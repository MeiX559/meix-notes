# CSS 居中完全指南

`在 CSS 中有哪些方法可以实现元素的居中?`

## 一、水平居中

### 1. 内联元素

```html
<div class="container">
  <span class="content">水平居中</span>
</div>
```

#### （1）`text-align`

`text-align` 一般运用在块级元素中，使其中的文本对齐。实际上，运用在块级元素中的`text-align`会使其包含的内联元素水平对齐。

```css
.container {
  text-align: center;
}
```

### 2. 块级元素

```html
<div class="container">
  <div class="content">水平居中</div>
</div>
```

#### （1）margin

如果块元素的高度和宽度已知，就可以通过将元素的左右`margin`值设置为`auto`将元素水平居中：

```css
.content {
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
}
```

如果有多个块元素，需要将多个元素包裹在一个元素中以使用该方法实现水平居中：

```html
<div class="container">
  <div class="box">
    <div class="content">水平居中</div>
    <div class="content">水平居中</div>
  </div>
</div>
```

```css
.box {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
```

### 3. 通用

#### （1）Flex 布局

在 Flex 布局中，`justify-content`可以用于设置弹性盒子元素在主轴方向上的对齐方式。当其属性值为 center 时，其子元素整体会在主轴的中心位置。

```css
.container {
  display: flex;
  justify-content: center;
}
```

如果弹性盒子的主轴是垂直方向，可以使用`align-items`来代替`justify-content`以实现元素的水平居中：

```css
.container {
 display: flex;
 flex-direction: column
  align-items: center;
}
```

#### （2）Grid 布局

在 Grid 布局中，`justify-content` 属性会沿着行轴线（水平方向） 在网格容器中对齐网格。当属性值为`center`时，就可以将网格对齐到网格容器的水平居中位置。

```css
.container {
  display: grid;
  justify-content: center;
}
```

#### （3）绝对定位

可以通过将使用绝对定位和变换实现元素的水平居中：

```css
.container {
  position: relative;
}

.content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

如果块元素的宽度已知，也可以使用负边距来代替`transform`：

```css
.container {
  position: relative;
}

.content {
  width: 100px;
  position: absolute;
  left: 50%;
  margin-left: -50px;
}
```

## 二、垂直居中

### 1. 块级元素

```html
<div class="container">
  <div class="content">垂直居中</div>
</div>
```

#### （1）绝对定位

可以通过将使用绝对定位和变换实现元素的垂直居中：

```css
.container {
  position: relative;
}

.content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

如果块元素的高度已知，也可以使用负边距来代替`transform`：

```css
.container {
  position: relative;
}

.content {
  height: 100px;
  position: absolute;
  top: 50%;
  margin-top: -50px;
}
```

### 2. 通用

#### （1）Flex 布局

在 Flex 布局中，`align-items` 属性用来定义`flex`子项在`flex`容器的当前行的侧轴（纵轴）方向上的对齐方式。当其属性值为 center 时，元素位于容器的中心。

```css
.container {
  display: flex;
  align-items: center;
}
```

如果将 Flex 的主轴切换为垂直方向，则需要使用`justify-content`来代替`align-items`以实现元素的垂直居中：

```css
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

#### （2）Grid 布局

使用 CSS Grid 布局中，可以使用 `align-content` 属性将项目垂直居中到其网格区域。

```css
.container {
  display: grid;
  align-content: center;
}
```

如果将网格的排列方向更改为水平，垂直居中依旧是生效的：

```css
.container {
  display: flex;
  align-content: center;
  grid-auto-flow: column;
}
```

## 三、水平垂直居中

```html
<div class="container">
  <div class="content">水平垂直居中</div>
</div>
```

#### （1）绝对定位

使元素垂直居中最通用的方法就是使用绝对定位和`transform`：

```css
.container {
  position: relative;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

如果元素的高度和宽度已知，也可以使用`margin`来代替`transform`:

```css
.container {
  position: relative;
}

.content {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
```

#### （2）Flex 布局

在使用 Flex 布局时，可以结合上面的水平和垂直居中来实现水平垂直居中：

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### （3）Grid 布局

在 Grid 布局中，可以使用以下形式来实现元素的水平垂直居中：

```css
.container {
  display: grid;
  place-items: center;
}
```

`place-content` 属性是`align-content`和`justify-content`的简写，当该属性的值为`center`时，所有的子元素堆叠在父元素的中间对齐。
