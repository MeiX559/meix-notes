# CSS 预处理器

## sass

### 变量

`sass` 声明变量使用$开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号（：）隔开，如下例：

```js
$mainColor:#0982c1;
$siteWidth:1024px;
$borderStyle:dotted;
body{
  color:$mainColor;
  border:1px $borderStyle $mainColor;
  max-width:$siteWidth;
}
```

### 嵌套

可以使用&来引用父选择器；

```js
section{
  margin:10px;
  nav{
    height:25px;
    a{
      color:#0982c1;
      &:hover{
        text-decoration:underline;
      }
    }
  }
}
```

### 混合（mixin）

`Mixins` 是预处器中的函数。平时你在写样式时肯定有碰到过，某段 CSS 样式经常要用到多个元素中，这样你就需要重复的写多次。在 CSS 预处器中，你可以为这些公用的 CSS 样式定义一个 Mixin，然后在你 CSS 需要使用这些样式的地方，直接调用你定义好的 Mixin。这是一个非常有用的特性。

`Mixins` 是一个公认的选择器，还可以在 `Mixins` 中定义变量或者是默认参数。

```js
@mixin error($borderWidth:2px){
  border:$borderWidth solid #F00;
  color:#F00;
}

.generic-error{
  padding:20px;
  margin:4px;
  @include error(); // 调用error mixins
}

.login-error{
  left:2px;
  position:absolute;
  top:20px;
  @include error(5px); // 调用error mixins，并将承诺书$borderWidth的值指定为5px
}
```

:::tip sass
在 sass 定义 Mixins 与 less、stylus 有所不同，在声明 Mixins 时需要使用“@mixin”,然后后面紧跟 Mixins 的名，他也可以定义参数，同时可以给这个参数设置一个默认值，但参数名是使用“$”符号开始，而且和参数值之间需要使用冒号（：）分开。另外在 sass 中调用 Mixins 需要使用“@include”，然后在其后紧跟你要调用的 Mixins 名。
:::

### 继承

往往我们需要给单独元素添加另外的样式，这个时候我们就需要把其中选择器单独出来写样式，这样一回来我们维护样式就相当的麻烦。为了应对这个问题，CSS 预处理器可以从一个选择继承另一个选择器下的所有样式。

```js
.block{
  margin:10px 5px;
  padding:2px;
}
p{
  @entend .block  //继承.block所有样式
  border:1px splid #EEE;
}
ui,ol{
   @entend .block  //继承.block所有样式
   color:#333;
   text-transform:uppercase;
}
```

### 颜色函数

```js
lighten($color, 10%); /* 返回的颜色在$color基础上变亮10% */
darken($color, 10%);  /* 返回的颜色在$color基础上变暗10% */
saturate($color, 10%);   /* 返回的颜色在$color基础上饱和度增加10% */
desaturate($color, 10%); /* 返回的颜色在$color基础上饱和度减少10% */
grayscale($color);  /* 返回$color的灰度色*/
complement($color); /* 返回$color的补色 */
invert($color);     /* 返回$color的反相色 */
mix($color1, $color2, 50%); /* $color1 和 $color2 的 50% 混合色*/
```

使用

```js
$color: #0982C1;
p {
 background: $color;
 border: 3px solid darken($color, 50%);/*边框颜色在$color的基础上变暗50%*/
}

```

### 属性前缀

```js
.border-radius($values){
  -webkit-border-radius:$values;
     -moz-border-radius:$values;
          border-radius:$values;
div{
  .border-radius(10px)
}
}
```

## less

### 变量

less 声明变量使用@开头,后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号（：）隔开，如下例：

```js
@mainColor:#0982c1;
@siteWidth:1024px;
@borderStyle:dotted;
body{
  color:@mainColor;
  border:1px @borderStyle @mainColor;
  max-width:@siteWidth;
}
```

### 嵌套

可以使用&来引用父选择器；

```js
section{
  margin:10px;
  nav{
    height:25px;
    a{
      color:#0982c1;
      &:hover{
        text-decoration:underline;
      }
    }
  }
}
```

### mixin

```js
// LESS 定义了一个名为error的mixin,这个error设置了一个参数@borderWidth，默认值为2px;
.error(@borderWidth:2px){
border:@borderWidth solid #F00;
color:#F00;
}

.generic-error{
padding:20px;
margin:4px;
.error(); // 调用 error mixins
}

.login-error{
left:2px;
position:absolute;
top:20px;
.error(5px); // 调用 error mixins，并将承诺书$borderWidth 的值指定为 5px
}
```

:::tip less
less 中声明 Mixins 和 CSS 定义样式非常类似，可以将 Mixins 看成是一个选择器，当然 Mixins 也可以设置参数，并给参数设置默认值。不过设置参数的变量名是使用“@”开始，同样参数和默认参数值之间需要使用冒号（：）分开。

:::

### 继承

less 支持的继承和 sass 与 stylus 不一样,他不是在选择器上继承，而是将 Mixins 中的样式嵌套到每个选择器里面。这种方法的缺点就是在每个选择器中会有重复的样式产生。

```js
.block{
  margin:10px 5px;
  padding:2px;
}
p{
  .block  //继承.block所有样式
  border:1px splid #EEE;
}
ui,ol{
   .block  //继承.block所有样式
   color:#333;
   text-transform:uppercase;
}
```

### 颜色函数

```js
lighten(@color, 10%); /* 返回的颜色在@color基础上变亮10% */
darken(@color, 10%);  /* 返回的颜色在@color基础上变暗10% */
saturate(@color, 10%);   /* 返回的颜色在@color基础上饱和度增加10% */
desaturate(@color, 10%); /* 返回的颜色在@color基础上饱和度减少10% */
grayscale(@color);  /* 返回@color的灰度色*/
complement(@color); /* 返回@color的补色 */
invert(@color);     /* 返回@color的反相色 */
mix(@color1, @color2, 50%); /* @color1 和 @color2 的 50% 混合色*/
```

使用

```js
@color: #0982C1;
p {
 background: @color;
 border: 3px solid darken(@color, 50%);/*边框颜色在@color的基础上变暗50%*/
}

```

### 属性前缀

```js
.border-radius(@values){
  -webkit-border-radius:@values;
     -moz-border-radius:@values;
          border-radius:@values;
div{
  .border-radius(10px)
}
}
```

## stylus

### 变量

变量名和变量值之间使用=

```js
mainColor = #0982c1;
siteWidth = 1024px;
borderStyle = dotted;
body{
  color:mainColor;
  border:1px borderStyle mainColor;
  max-width:siteWidth;
}
```

### 嵌套

可以使用&来引用父选择器；

```js
section{
  margin:10px;
  nav{
    height:25px;
    a{
      color:#0982c1;
      &:hover{
        text-decoration:underline;
      }
    }
  }
}
```

### mixin

```js
// Stylus 定义了一个名为error的mixin,这个error设置了一个参数@borderWidth，默认值为2px;
error(borderWidth = 2px){
border:borderWidth solid #F00;
color:#F00;
}

.generic-error{
padding:20px;
margin:4px;
error(); // 调用 error mixins
}

.login-error{
left:2px;
position:absolute;
top:20px;
error(5px); // 调用 error mixins，并将承诺书borderWidth 的值指定为 5px
}
```

:::tip stylus
stylus 和前两者也略有不同，他可以不使用任何符号，就是直接定义 Mixins 名，然后在定义参数和默认值之间用等号（=）来连接。
:::

### 继承

同 sass;

### 颜色函数

```js
lighten(color, 10%); /* 返回的颜色在color基础上变亮10% */
darken(color, 10%);  /* 返回的颜色在color基础上变暗10% */
saturate(color, 10%);   /* 返回的颜色在color基础上饱和度增加10% */
desaturate(color, 10%); /* 返回的颜色在color基础上饱和度减少10% */
```

使用

```js
color= #0982C1;
p {
 background: color;
 border: 3px solid darken(color, 50%);/*边框颜色在@color的基础上变暗50%*/
}

```

### 属性前缀

```js
.border-radius(values){
  -webkit-border-radius:values;
     -moz-border-radius:values;
          border-radius:values;
div{
  .border-radius(10px)
}
}
```
