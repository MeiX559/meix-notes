# 踩坑记录

## 水平滚动使用 justify-content 显示不全问题

一般在写 tab 的时候，我们想要实现的效果是：tab 较少（即只有两个或三个 tab）时，希望可以居中展示（最先考虑到的是 justify-content:center)，当有多个 tab 时，希望实现的效果是可以横向滚动。

一般会想到的就是这么写：

```css
.category {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-x: auto;
  flex-wrap: nowrap;
  padding: 8px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

但是直接这样使用会出现一个问题，即 tab 会有部分被遮挡，第一个元素会被遮挡，如下这种效果：

![多个tab被遮挡](../images/pit1.jpg)

当然也想过不使用 justify-content: center;而是 justify-content: space-between;这样导致的问题是两个 tab 之间的间隔太大了，不是我们想要的效果。想要解决这个问题，暂时是在 category 外面再包一层 div,给这层 div 设置 justify-content: center;另外，需要设置 margin:0 auto;这样可以保证在 tab 较少时也可以保证居中效果。

```css
.category-father {
  display: flex;
  justify-content: center;
}
.category {
  display: flex;
  align-items: center;
  text-align: center;
  overflow-x: auto;
  flex-wrap: nowrap;
  padding: 8px;
  box-sizing: border-box;
  margin: 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

实现的效果如下所示：

![多个tab](../images/pit2.jpg)

![两个tab居中](../images/pit3.jpg)
