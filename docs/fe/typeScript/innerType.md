# Typescript内置类型

## Omit<Type, Keys> 移除

从Type中移除指定的几个字段keys

```ts
interface Per{
    name?: string; age?: number
}

// 将Per接口的所有属性定义为必选的
type result = Required<Per>

const person:result = {
    name:'Bruce',
    age:15
}
```
