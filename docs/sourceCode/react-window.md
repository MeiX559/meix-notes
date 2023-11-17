# react-window 源码阅读

## github 仓库地址

- [react-window](https://github.com/bvaughn/react-window)
- [react-window 文档](https://react-window.vercel.app/#/examples/list/variable-size)

## react-window 是什么

`react-window` 是一个实现虚拟列表的库，对于一些数据量比较大且没有分页的情况下的渲染使用该库非常的有效。

虚拟列表其实主要分为两种：定高和不定高，在`react-window`中，就是`FixedSizeList`和`VariableSizeList`.

## react-window 源码

`react-window` 是 [flow](https://flow.org/en/docs/getting-started/) 作为类型检查工具，该库类似于 TS。不管是 `FixedSizeList` 还是 `VariableSizeList` 都是在 `createListComponent` 的基础上创建的

```tsx createListComponent
// 定高虚拟列表
const FixedSizeList = createListComponent({
  ...
})

// 不定高虚拟列表
const VariableSizeList = createListComponent({
  ...
})
```

因此，先看一下`createListComponent`的实现，以下所有代码都是简化的代码，想要详细的知道其所有实现可移步[源码](https://github.com/bvaughn/react-window)查看。

### createListComponent

```tsx
import { createElement, PureComponent } from 'react'

export default function createListComponent({
  getItemOffset,
  getEstimatedTotalSize,
  getItemSize,
  getOffsetForIndexAndAlignment,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  initInstanceProps,
  shouldResetStyleCacheOnItemSizeChange,
  validateProps
}) {
  return class List extends PureComponent {
    // 根据scrollOffset更新滚动信息
    scrollTo(scrollOffset) {}
    // 通过传递对应序号滚动至某一item上
    scrollToItem(index, align = 'auto') {
      // ...省略
      // 通过index获取对应item的偏移量，最后通过偏移量滚动至对应的item
      // getOffsetForIndexAndAlignment为List传入过来的参数
      this.scrollTo(
        getOffsetForIndexAndAlignment(
          this.props,
          index,
          align,
          scrollOffset,
          this._instanceProps,
          scrollbarSize
        )
      )
    }
    // 缓存参数，缓存参数时使用的memoize-one库，该库是一个缓存工具库，通过比较上一次和这一次的参数来减少函数的请求次数，从而优化性能
    _callOnItemsRendered = memoizeOne(
      (overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex) =>
        this.props.onItemsRendered({
          overscanStartIndex, //真实起点
          overscanStopIndex, //真实终点
          visibleStartIndex, //视图起点
          visibleStopIndex //视图终点
        })
    )
    // 缓存滚动信息
    _callOnScroll = memoizeOne((scrollDirection, scrollOffset, scrollUpdateWasRequested) =>
      this.props.onScroll({ scrollDirection, scrollOffset, scrollUpdateWasRequested })
    )
    // 通过 index 来获取对应的style, 其中有width, height, left, top 等具体位置属性, 同时这些属性也有缓存
    _getItemStyle = (index) => {}
    // 获取overscanStartIndex，overscanStopIndex，startIndex，stopIndex
    _getRangeToRender() {}
    //监听滚动事件 水平方向
    _onScrollHorizontal = (event) => {}
    //监听滚动事件 垂直方向
    _onScrollVertical = (event) => {}
    // 渲染函数
    render() {}
  }
}
```

在`createListComponent`方法中，使用了 `memoize-one` 库来缓存参数。`memoize-one`库是一种 `JavaScript` 缓存工具，其主要作用是优化性能。它的工作原理是通过比较当前和上一次两者的参数来减少函数的请求次数，从而提高性能。这种优化主要是使用了闭包的工作原理，将内部的函数存在内存中。使用示例如下：

```jsx
import memoizeOne from 'memoize-one'

const add = (a, b) => a + b
const memoizedAdd = memoizeOne(add)

console.log(memoizedAdd(1, 2)) // 输出：3
console.log(memoizedAdd(1, 2)) // 输出：3，此次不会重新计算，而是返回缓存的结果
```

下面将详细讲解一下这些方法

#### `render渲染函数`

render 函数根据 startIndex，stopIndex 调用 createElement，创建 dom 结构，并绑定 onScroll 事件

```tsx
function render() {
  const {
    children,
    className,
    direction,
    height,
    innerRef,
    innerElementType,
    innerTagName,
    itemCount,
    itemData,
    itemKey = defaultItemKey,
    layout,
    outerElementType,
    outerTagName,
    style,
    useIsScrolling,
    width
  } = this.props
  // ...省略
  // 获取起始索引和结束索引
  const [startIndex, stopIndex] = this._getRangeToRender()
  // 根据startIndex，stopIndex调用createElement，创建dom结构
  const items = []
  if (itemCount > 0) {
    for (let index = startIndex; index <= stopIndex; index++) {
      items.push(
        createElement(children, {
          data: itemData,
          key: itemKey(index, itemData),
          index,
          isScrolling: useIsScrolling ? isScrolling : undefined,
          style: this._getItemStyle(index)
        })
      )
    }
  }
  // 获取实际高度
  const estimatedTotalSize = getEstimatedTotalSize(this.props, this._instanceProps)
  return createElement(
    outerElementType || outerTagName || 'div',
    {
      className,
      onScroll, // 绑定onScroll事件
      ref: this._outerRefSetter,
      style: {
        position: 'relative',
        height,
        width,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        willChange: 'transform',
        direction,
        ...style
      }
    },
    createElement(innerElementType || innerTagName || 'div', {
      children: items,
      ref: innerRef,
      style: {
        height: isHorizontal ? '100%' : estimatedTotalSize,
        pointerEvents: isScrolling ? 'none' : undefined,
        width: isHorizontal ? estimatedTotalSize : '100%'
      }
    })
  )
}
```

#### `_getRangeToRender`

`_getRangeToRender`计算需要渲染的起始和结束索引等数据并返回

```tsx
function _getRangeToRender() {
  // itemCount：列表渲染数  overscanCount：缓冲数
  const { itemCount, overscanCount } = this.props
  const { isScrolling, scrollDirection, scrollOffset } = this.state
  // 起始索引——根据offset计算  getStartIndexForOffset为List传入的
  const startIndex = getStartIndexForOffset(this.props, scrollOffset, this._instanceProps)
  // 结束索引 getStopIndexForStartIndex为List传入的
  const stopIndex = getStopIndexForStartIndex(
    this.props,
    startIndex,
    scrollOffset,
    this._instanceProps
  )
  const overscanBackward =
    !isScrolling || scrollDirection === 'backward' ? Math.max(1, overscanCount) : 1
  const overscanForward =
    !isScrolling || scrollDirection === 'forward' ? Math.max(1, overscanCount) : 1

  return [
    Math.max(0, startIndex - overscanBackward),
    Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)),
    startIndex,
    stopIndex
  ]
}
```

#### `_getItemStyle`

`_getItemStyle`通过 index 来获取对应 item 的 style, 其中有 height,width, left, top 等具体位置属性, 同时这些属性也有缓存

```tsx
function _getItemStyle(index) {
  let style
  // 有缓存取缓存
  if (itemStyleCache.hasOwnProperty(index)) {
    style = itemStyleCache[index]
  } else {
    // 根据index计算item的offset
    const offset = getItemOffset(this.props, index, this._instanceProps)
    // 根据index计算每个item的itemSize
    const size = getItemSize(this.props, index, this._instanceProps)

    // 将index的style缓存至itemStyleCache对象中
    itemStyleCache[index] = style = {
      position: 'absolute',
      left: isRtl ? undefined : offsetHorizontal,
      right: isRtl ? offsetHorizontal : undefined,
      top: !isHorizontal ? offset : 0,
      height: !isHorizontal ? size : '100%',
      width: isHorizontal ? size : '100%'
    }
  }
  return style
}
```

#### `_onScrollVertical`

`_onScrollVertical`用于监听滚动事件

```tsx
function _onScrollVertical(event) {
  const { clientHeight, scrollHeight, scrollTop } = event.currentTarget
  this.setState((prevState) => {
    if (prevState.scrollOffset === scrollTop) {
      return null
    }

    // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
    const scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight))

    return {
      isScrolling: true,
      scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
      scrollOffset,
      scrollUpdateWasRequested: false
    }
  }, this._resetIsScrollingDebounced)
}
```

#### `_callPropsCallbacks`

`_callPropsCallbacks`方法用于缓存数据

```tsx
// 缓存节点，滚动状态等数据
function _callPropsCallbacks() {
  // 传递onItemsRendered函数时，更新缓存
  if (typeof this.props.onItemsRendered === 'function') {
    const { itemCount } = this.props
    if (itemCount > 0) {
      const [
        overscanStartIndex, //真实起点
        overscanStopIndex, //真实终点
        visibleStartIndex, //视图起点
        visibleStopIndex //视图终点
      ] = this._getRangeToRender()
      // 更新缓存
      this._callOnItemsRendered(
        overscanStartIndex,
        overscanStopIndex,
        visibleStartIndex,
        visibleStopIndex
      )
    }
  }

  // 传递onScroll时，滚动时缓存滚动信息
  if (typeof this.props.onScroll === 'function') {
    const { scrollDirection, scrollOffset, scrollUpdateWasRequested } = this.state
    // 缓存滚动信息
    this._callOnScroll(scrollDirection, scrollOffset, scrollUpdateWasRequested)
  }
}
```

#### `scrollToItem`

scrollToItem 方法用于快速滚动至某个 item 的位置上，示例如下：

```tsx
const ReactWindow = () => {
  const listRef = useRef<any>(null)

  const handleScrollToRow = (num: number, type: string) => {
    listRef.current.scrollToItem(num, type)
  }
  return (
    <>
      <button className="h-8 border-b-[1px]" onClick={() => handleScrollToRow(200, 'auto')}>
        滚动到item为第200个的位置 (align: auto)
      </button>
      <FixedSizeList ref={listRef} height={800} itemCount={1000} itemSize={35} width="100%">
        ...省略
      </FixedSizeList>
      <button className="h-8 border-b-[1px]" onClick={() => handleScrollToRow(0, 'center')}>
        滚动到起始位置 (align: auto)
      </button>
    </>
  )
}
```

该方法接收两个参数，index 和 align

```tsx
// 根据scrollOffset更新滚动信息
function scrollTo(scrollOffset) {
  // 确保scrollOffset大于0
  scrollOffset = Math.max(0, scrollOffset)
  this.setState((prevState) => {
    if (prevState.scrollOffset === scrollOffset) {
      return null
    }
    return {
      // 滚动方向
      scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
      // 滚动距离
      scrollOffset: scrollOffset,
      scrollUpdateWasRequested: true
    }
  }, this._resetIsScrollingDebounced)
}

function scrollToItem(index, align = 'auto') {
  // itemCount：列表渲染总数，layout：布局
  const { itemCount, layout } = this.props
  // 滚动距离
  const { scrollOffset } = this.state
  // 保证index在0-item最大值之间
  index = Math.max(0, Math.min(index, itemCount - 1))

  // ...省略

  // 通过index获取对应item的偏移量，最后通过偏移量滚动至对应的item
  // getOffsetForIndexAndAlignment为List传入过来的参数
  this.scrollTo(
    getOffsetForIndexAndAlignment(
      this.props,
      index,
      align,
      scrollOffset,
      this._instanceProps,
      scrollbarSize
    )
  )
}
```

#### `createListComponent` 总结

1. 根据 List 传递的 getStartIndexForOffset、getStopIndexForStartIndex 和 scrollOffset 计算 startIndex、stopIndex
2. 根据 startIndex、stopIndex 调用 createElement，创建 dom 结构（创建的外部容器 div 绑定 onScroll 事件）
3. 根据 index 获取每个 item 对应的 style（\_getItemStyle 方法实现的）
4. onScroll 事件监听滚动，更新滚动信息，根据 scrollOffset 计算得到最新的 startIndex、stopIndex，进而更新视图内容

### FixedSizeList

其实 FixedSizeList 就是调用 createListComponent 来创建最终的结果

```tsx
const FixedSizeList = createListComponent({
  // 计算每个item的offset
  getItemOffset: ({ itemSize }, index) => index * itemSize,
  // 计算每个item的itemSize
  getItemSize: ({ itemSize }) => itemSize,
  // 计算列表总的高度
  getEstimatedTotalSize: ({ itemCount, itemSize }) => itemCount * itemSize,
  // 通过index获取对应item的偏移量
  getOffsetForIndexAndAlignment: (
    { direction, height, itemCount, itemSize, layout, width },
    index,
    align,
    scrollOffset,
    instanceProps,
    scrollbarSize
  ) => {
    const isHorizontal = direction === 'horizontal' || layout === 'horizontal'
    const size = isHorizontal ? width : height
    // 最后一个item的offset
    const lastItemOffset = Math.max(0, itemCount * itemSize - size)
    const maxOffset = Math.min(lastItemOffset, index * itemSize)
    const minOffset = Math.max(0, index * itemSize - size + itemSize + scrollbarSize)
    if (align === 'smart') {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        align = 'auto'
      } else {
        align = 'center'
      }
    }
    switch (align) {
      case 'start':
        return maxOffset
      case 'end':
        return minOffset
      case 'center': {
        // "Centered" offset is usually the average of the min and max.
        // But near the edges of the list, this doesn't hold true.
        const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2)
        if (middleOffset < Math.ceil(size / 2)) {
          return 0 // near the beginning
        } else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
          return lastItemOffset // near the end
        } else {
          return middleOffset
        }
      }
      case 'auto':
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset
        } else if (scrollOffset < minOffset) {
          return minOffset
        } else {
          return maxOffset
        }
    }
  },
  // 计算渲染列表的起始索引
  getStartIndexForOffset: ({ itemCount, itemSize }, offset) =>
    Math.max(0, Math.min(itemCount - 1, Math.floor(offset / itemSize))),
  // 计算渲染列表的结束索引
  getStopIndexForStartIndex: (
    { direction, height, itemCount, itemSize, layout, width },
    startIndex,
    scrollOffset
  ) => {
    const isHorizontal = direction === 'horizontal' || layout === 'horizontal'
    const offset = startIndex * itemSize
    const size = isHorizontal ? width : height
    // 可视区显示的列表数
    const numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize)
    return Math.max(0, Math.min(itemCount - 1, startIndex + numVisibleItems - 1))
  }
})
```

`FixedSizeList` 的使用

```tsx
import { FixedSizeList } from 'react-window'

const renderRow = ({ index, style }: any) => {
  return (
    <div
      className={`${
        index % 2
          ? 'flex items-center justify-center border-b-[1px]'
          : 'flex items-center justify-center  border-b-[1px] bg-[#f8f8f0]'
      }`}
      style={style}
    >
      Row-{index}
    </div>
  )
}

const ReactWindow = () => {
  return (
    <FixedSizeList height={800} itemCount={1000} itemSize={35} width="100%">
      {renderRow}
    </FixedSizeList>
  )
}

export default ReactWindow
```

### VariableSizeList

`VariableSizeList` 和 `FixedSizeList` 不同的是每个 item 的高度是不定的，因此需要一个数组存储 item 的 offset 和 size

```tsx
// 根据index获取某个item的offset和size
const getItemMetadata = (props, index, instanceProps) => {
  const { itemSize } = props
  const { itemMetadataMap, lastMeasuredIndex } = instanceProps
  if (index > lastMeasuredIndex) {
    let offset = 0
    if (lastMeasuredIndex >= 0) {
      const itemMetadata = itemMetadataMap[lastMeasuredIndex]
      offset = itemMetadata.offset + itemMetadata.size
    }

    for (let i = lastMeasuredIndex + 1; i <= index; i++) {
      let size = itemSize(i)
      itemMetadataMap[i] = {
        offset,
        size
      }
      offset += size
    }
    instanceProps.lastMeasuredIndex = index
  }

  return itemMetadataMap[index]
}

const getEstimatedTotalSize = (
  { itemCount },
  { itemMetadataMap, estimatedItemSize, lastMeasuredIndex }
) => {
  let totalSizeOfMeasuredItems = 0
  if (lastMeasuredIndex >= itemCount) {
    lastMeasuredIndex = itemCount - 1
  }
  if (lastMeasuredIndex >= 0) {
    const itemMetadata = itemMetadataMap[lastMeasuredIndex]
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size
  }
  const numUnmeasuredItems = itemCount - lastMeasuredIndex - 1
  const totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize

  return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems
}

const VariableSizeList = createListComponent({
  // 计算每个item的offset
  getItemOffset: (props, index, instanceProps) =>
    getItemMetadata(props, index, instanceProps).offset,
  // 计算每个item的itemSize，根据index在itemMetadataMap查找，itemMetadataMap存储的是offset和size
  getItemSize: (props, index, instanceProps) => instanceProps.itemMetadataMap[index].size,
  // 计算列表总的高度
  getEstimatedTotalSize,
  // 通过index获取对应item的偏移量
  getOffsetForIndexAndAlignment: (
    props,
    index,
    align,
    scrollOffset,
    instanceProps,
    scrollbarSize
  ) => {
    const isHorizontal = direction === 'horizontal' || layout === 'horizontal'
    const size = isHorizontal ? width : height
    const itemMetadata = getItemMetadata(props, index, instanceProps)
    const estimatedTotalSize = getEstimatedTotalSize(props, instanceProps)

    const maxOffset = Math.max(0, Math.min(estimatedTotalSize - size, itemMetadata.offset))
    const minOffset = Math.max(0, itemMetadata.offset - size + itemMetadata.size + scrollbarSize)

    if (align === 'smart') {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        align = 'auto'
      } else {
        align = 'center'
      }
    }
    switch (align) {
      case 'start':
        return maxOffset
      case 'end':
        return minOffset
      case 'center':
        return Math.round(minOffset + (maxOffset - minOffset) / 2)
      case 'auto':
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset
        } else if (scrollOffset < minOffset) {
          return minOffset
        } else {
          return maxOffset
        }
    }
  },
  // 计算渲染列表的起始索引
  getStartIndexForOffset: (props, offset, instanceProps) =>
    findNearestItem(props, offset, instanceProps),
  // 计算渲染列表的结束索引
  getStopIndexForStartIndex: (props, startIndex, scrollOffset, instanceProps) => {
    const { direction, height, itemCount, layout, width } = props
    const isHorizontal = direction === 'horizontal' || layout === 'horizontal'
    const itemMetadata = getItemMetadata(props, startIndex, instanceProps)
    const maxOffset = scrollOffset + size

    let offset = itemMetadata.offset + itemMetadata.size
    let stopIndex = startIndex

    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++
      offset += getItemMetadata(props, stopIndex, instanceProps).size
    }

    return stopIndex
  },
  // props初始化
  initInstanceProps: (props, instance) => {
    // 预估高度，默认值为50
    const { estimatedItemSize } = props
    const instanceProps = {
      itemMetadataMap: {},
      estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_ITEM_SIZE,
      lastMeasuredIndex: -1
    }
    instance.resetAfterIndex = (index, shouldForceUpdate = true) => {
      instanceProps.lastMeasuredIndex = Math.min(instanceProps.lastMeasuredIndex, index - 1)
      // 清空缓存
      instance._getItemStyleCache(-1)
      if (shouldForceUpdate) {
        instance.forceUpdate()
      }
    }

    return instanceProps
  }
})
```

`VariableSizeList` 的使用

```tsx
import { VariableSizeList } from 'react-window'

const rowSizes = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 50))

const getItemSize = (index: number) => rowSizes[index]

const renderRow = ({ index, style }: any) => {
  return (
    <div
      className={`${
        index % 2
          ? 'flex items-center justify-center border-b-[1px]'
          : 'flex items-center justify-center  border-b-[1px] bg-[#f8f8f0]'
      }`}
      style={style}
    >
      Row-{index}
    </div>
  )
}

const ReactWindowVisible = () => {
  return (
    <VariableSizeList height={800} itemCount={1000} itemSize={getItemSize} width="100%">
      {renderRow}
    </VariableSizeList>
  )
}

export default ReactWindowVisible
```
