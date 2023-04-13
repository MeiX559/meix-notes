# 通用方法总结

## 获取 url 中的参数部分 并转化成对象返回

```ts
/**
 * 获取url中的参数部分 并转化成对象返回
 * @param {string} url
 * @returns {object}
 */

export const getQueryStr = (url: string = window.location.href): object => {
  if (typeof url !== 'string') return {}

  // 截取url中?后面部分   使用indexOf方法获取?在url中的下标+1，再使用slice方法获取?后面部分
  if (url.match(/\?/)) url = url.slice(url.indexOf('?') + 1)
  // 截取#前面的部分
  if (url.match(/#/)) url = url.slice(0, url.indexOf('#'))

  return decodeURIComponent(url)
    .split('&')
    .map((item) => {
      let tmp = item.split('=')
      let key = tmp[0]
      let value = tmp[1] || undefined
      return { key, value }
    })
    .reduce((pre: any, cur) => {
      let key = cur.key
      let value = cur.value

      if (typeof pre[key] === 'undefined') {
        pre[key] = value
      } else {
        pre[key] = Array.isArray(pre[key]) ? pre[key] : [pre[key]]
        pre[key].push(value)
      }

      return pre
    }, {})
}
```

使用示例：

```ts
const paramsObj = getQueryStr(
  'http://localhost:5173/index.html?appToken=0af0c773c04ca654f19514fbb51f4352&did=B4B88CE9-F39A-48A6-9DA9-9E2BE8D3CD27&uid=108#/'
)
// {
//   did: "B4B88CE9-F39A-48A6-9DA9-9E2BE8D3CD27",
//   appToken:"0af0c773c04ca654f19514fbb51f4352",
//   uid:"108"
// }
```
