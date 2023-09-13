# await-to-js

在使用 `async...await` 的时候，如果要捕获异常(即异步操作结果失败了)，需要通过 `try...catch` 来捕获错误，而`await-to-js`可以优雅的捕获 await 的异常。

## try...catch 捕获错误

```js
const asyncFun = () => {
  return new Promise(() => {
    throw new Error('try-catch-err')
  })
}

const trycatchFun = async () => {
  try {
    const data = await asyncFun()
  } catch (error) {
    console.log(error) //try-catch-err
  }
}
trycatchFun()
```

## await-to-js 捕获错误

```js
import to from 'await-to-js'

const asyncFun = () => {
  return new Promise(() => {
    throw new Error('await-to-js-err')
  })
}

const awaitFun = async () => {
  const [err, data] = await to(asyncFun())
  console.log(err) // await-to-js-err

  // 传递errorExt参数
  const [err, data] = await to(asyncFun(), { errTitle: 'errTitle' })
  console.log(err.message, err.errTitle) //await-to-js-err errTitle
}
awaitFun()
```

## await-to-js 源码

[await-to-js 源码地址](https://github.com/scopsy/await-to-js/blob/master/src/await-to-js.ts)

await-to-js 源码非常简单，就只有 15 行左右的代码：

```ts
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 *
 * 接收两个参数，分别：一个Promise对象和一个可选的errorExt参数(用于扩展错误对象)
 */
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return (
    promise
      // Promise执行成功时，返回包含的data对象
      .then<[null, T]>((data: T) => [null, data])
      // Promise执行失败时
      .catch<[U, undefined]>((err: U) => {
        if (errorExt) {
          // 将入参的错误对象与err合并为一个对象并返回
          const parsedError = Object.assign({}, err, errorExt)
          return [parsedError, undefined]
        }
        // 返回错误对象
        return [err, undefined]
      })
  )
}

export default to
```
