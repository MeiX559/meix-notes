# arrify 转数组

## arrify 使用

```js
arrify(null) // []

arrify(undefined) // []

arrify('string~') //  ['string~']

arrify(1) //[1]

arrify([1, 2, 3]) // [1, 2, 3]

const myObj = {
  [Symbol.iterator]() {
    let i = 0
    return {
      next() {
        if (i < 5) {
          return { value: i++, done: false }
        } else {
          return { done: true }
        }
      }
    }
  }
}
arrify(myObj) //[0, 1, 2, 3, 4]
```

## arrify 源码

[arrify github 地址](https://github.com/sindresorhus/arrify/blob/main/index.js)

```js
export default function arrify(value) {
  if (value === null || value === undefined) {
    return []
  }

  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'string') {
    return [value]
  }

  if (typeof value[Symbol.iterator] === 'function') {
    return [...value]
  }

  return [value]
}
```

执行逻辑：

- 如果 value 是 `null` 或 `undefined`，则会返回空数组
- 如果 value 是数组，则返回 value 自身
- 如果 value 是 `string` 类型，则将 `string` 类型的值放在[]里面返回
- 如果 value 的`Symbol.iterator`属性是 `function`，则可进行扩展运算符操作并返回

❓：上述`arrify`对于`string`类型的判断，为什么要单独拿出来作为一个判断条件，会不会有些多余？

要回答这个问题，首先得熟悉`iterator`的知识，看 👇🏻：

## iterator

[iterator 概念](https://meix.netlify.app/fe/es6/#iterator-%E5%92%8C-generator)

`ES6` 的有些数据结构原生具备 `Iterator` 接口（比如数组），即不用任何处理，就可以被 for...of 循环遍历。原因在于，这些数据结构原生部署了 `Symbol.iterator` 属性，另外一些数据结构没有（比如对象）。凡是部署了 `Symbol.iterator` 属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

原生具备 `Iterator` 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

扩展运算符（…）也会调用默认的 Iterator 接口。👇🏻：

```js
let arr = ['a', 'b', 'c']
console.log([1, ...arr, 2]) //[1, 'a', 'b', 'c', 2]

let str = 'string'
console.log([...strIter]) // ['s', 't', 'r', 'i', 'n', 'g']
```

从这里可以知道`arrify`对于`string`类型的判断是必要的，因为`string`类型原生具备`Iterator`接口，会进入`typeof value[Symbol.iterator] === 'function'`这个判断条件里，而这里使用扩展运算符会将一个字符串拆分，造成返回的结果与预期的不一致。
