# TypeScript 入门手册

## 写在前面

`TypeScript`是大势所趋，也是大厂必备技能，作为一名合格的前端开发工程师，此时不学，更待何时。

## 什么是 TypeScript

`TypeScript` 是微软开发的一个开源的编程语言，通过在 `JavaScript` 的基础上添加静态类型定义构建而成。`TypeScript` 可以通过 `TypeScript` 编辑器或 Babel 转译为 `JavaScript` 代码，可以运行在任何浏览器，任何操作系统。

`TypeScript` 起源于使用 `JavaScript` 开发的大型项目 。由于 `JavaScript` 语言本身的局限性，难以胜任和维护大型项目开发，因此微软开发了 `TypeScript` ，使得其能够胜任开发大型项目。

总而言之，`TypeScript` 是 `JavaScript` 的超集，具有类型系统并可以编译为纯 `JavaScript`。

## TypeScript 环境搭建

推荐一个官方的云编辑器 [Playground](https://www.typescriptlang.org/zh/play?#code/Q)

使用 Playground 就无需在本地安装环境，通过浏览器就可以随时学习 TypeScript.

## 基本数据类型

### 八种内置类型

| 数据类型  | 关键字    | 描述                                                                |
| --------- | --------- | ------------------------------------------------------------------- |
| string    | string    | let name:string = 'Bruce'                                           |
| number    | number    | let num:number = 1                                                  |
| boolean   | boolean   | let c:boolean = true                                                |
| null      | null      | 表示对象值缺失<br/> const n: null = null;                           |
| undefined | undefined | 用于初始化变量为一个未定义的值 <br/>const u: undefined = undefined; |
| bigint    | bigint    | const big: bigint = 100n;                                           |
| symbol    | symbol    | const sym: symbol = Symbol('me');                                   |
| object    | object    | const obj: object = {x: 1};                                         |

#### 数字类型 number

```js
let binaryLiteral: number = 0b1010 // 二进制
let octalLiteral: number = 0o744 // 八进制
let decLiteral: number = 6 // 十进制
let hexLiteral: number = 0xf00d // 十六进制
```

## 其他类型

### 任意类型 any

在 TS 中，任何类型都可以被归为 any 类型，any 类型是类型系统的顶级类型。

对于一个普通类型，在赋值过程中改变类型是不被允许的，如下所示：

```js
let str: string = 'string'
str = 1 // 报错，Type 'number' is not assignable to type 'string'.
```

而对于`any`类型，则可以被赋值为任意类型

```js
let str: any = 'string'
str = 1
str = true
str = {}
```

如果变量在声明的时候，未指定其类型，那么它会被识别为 `any` 类型

```js
let str //声明未指定类型将会被识别为any类型
str = 1
str = ''
str = {}
```

:::tip
使用 any 类型虽然可以赋值为任意类型，但是这样就相当于失去了使用 TS 的意义，因此尽量不要使用 any.
:::

### unknown

`unknown`与`any`十分相似，所有类型都可以分配给`unknown`类型.

```js
let a: unknown = 11
a = 'string'
a = true
```

`unknow`与`any`的区别：

- 任何类型的值都可以赋值给 `any`，同时 `any` 类型的值也可以赋值给任何类型（never 除外）。
- 任何类型的值都可以赋值给 `unknown`，但 `unknown` 类型的值只能赋值给 `unknown` 和 `any。`

```js
let a: unknown = 11
// 将unknow赋给any
let b: any = a // OK
// 将unknow赋给number类型
let c: number = a // 报错，Type 'unknown' is not assignable to type 'number'.
// 将any赋给number类型
let d: number = b // OK
```

如果不缩小未知范围无法对 unknown 类型执行任何操作

```js
let a:unknown = {name:'Bruce'}
// 无法对unknown类型执行任何操作
a.name  // 'a' is of type 'unknown'.
// 使用类型断言缩小未知范围
(a as object).name  // OK
```

### never

`never` 类型表示的是那些永不存在的值的类型。

值会永不存在的两种情况：

1. 如果一个函数执行时抛出了异常，那么这个函数就永远不存在返回值；
2. 函数中执行无限循环的代码，也就是死循环。

```js
// 抛出异常
function error(msg: string): never {
  // ok
  throw new Error(msg)
}

// 死循环
function loopForever(): never {
  // ok
  while (true) {}
}
```

`never`类型同 `null`和`undefined`一样，也是任何类型的子类型，也可以赋值给任何类型。

但是没有类型是`never`的子类型或可以赋值给`never`类型（除了 never 本身之外），即使`any`也不可以赋值给`never`.

```js
let a: never
let b: never
let c: any
let d: number

// 将number类型赋给never
a = 200 // Type 'number' is not assignable to type 'never'
// 将any类型赋给never
b = c // Type 'any' is not assignable to type 'never'.

// 将never类型赋给any
c = a //OK
// 将never类型赋给number
d = a //OK
```

### void

用于标识方法返回值类型，表示该方法没有返回值。

声明一个 `void` 类型的变量没有什么意义，一般只有在函数没有返回值时才会使用到它。

```js
function add(a: number, b: number): void {
  const c = a + b
}
```

### 数组 Array

定义数组类型有两种方式，如下所示：

```js
let arr: (string | number)[] = ['a', 'b', 'c', 1, 2, 3]

let arr1: Array<string | number> = ['a', 'b', 'c', 1, 2, 3]

interface arrType {
  name: string;
  age: number;
}
let arr2: Array<arrType> = [{ name: 'Bruce', age: 18 }]
```

### 元组

元组是 TS 特有的类型，跟数组类似。元组最重要的特征是可以限制数组元素的个数和类型。

各元素的类型不必相同，对应位置的类型需要相同。

```js
// [string, number] 就是元组类型。数组 x 的类型必须严格匹配，且个数必须为2
let x: [string, number]
x = ['Hi', 666] // OK
// 对应位置的类型必须相同
x = [666, 'Hi'] // error
//  元素的个数必须相同
x = ['Hi', 666, 888] // Type '[string, number, number]' is not assignable to type '[string, number]'.
```

:::warning 注意点
元组只能表示一个已知元素数量和类型的数组，越界就会报错。

如果一个数组中可能有多种类型，且数量也不确定，那就直接使用 any[]
:::

#### 元组的可选元素

在定义元组类型时，可以通过?来声明元组类型的可选元素。

```js
let arr:[number,string?,boolean?]
arr = [1,'str'] // OK
arr = [1,'str',true] // OK
```

#### 元组的解构赋值

元组同样支持解构赋值，如下所示：

```js
let arr:[number,string?,boolean?] = [1,'Bruce',true]
const [num,str,b,c] = arr
console.log(num,str,b)  // 1,  "Bruce",  true
```

:::warning 注意点
解构数组元素的个数不能超过元组中元素个数。
:::

```js
let arr:[number,string?] = [1,'Bruce']
const [num,str,c] = arr  // Tuple type '[number, (string | undefined)?]' of length '2' has no element at index '2'.
```

#### 元组的剩余元素

元组类型里最后一个元素可以是剩余元素，形式为...x，可以把它当作 ES6 中的剩余参数。剩余元素代表元组类型是开放的，可以有 0 个或者多个额外的元素。

例如，`[number, ...string[]]`表示带有一个 number 类型的元素和任意数量 string 类型的元素的元组类型。

```js
let arr: [number, ...string[]];
arr = [1, '男孩']; // ok
arr = [1, '男孩', '出现又离开', '曾经是情侣']; // ok
```

#### 只读的元组

可以为任何元组类型加上 readonly 关键字前缀，使其成为只读元组。

```js
const arr: readonly [string, number] = ['Bruce', 200];
// 加上readonly关键字后，该元组就成为一个只读元组，任何修改元组的操作都会报错
arr[0] = 'Bruce'  // Cannot assign to '0' because it is a read-only property.
```

### 枚举 enum

`enum`用于定义数组集合

```js
enum Color{_Red_,_Green_,_Blue_}
enum Color{_Red_,_Green_,_Blue_}
let c: Color = Color._Blue
console.log(c) //2
```

## 类型推断

## 类型断言

## 字面量类型

## 联合类型

## 接口

## 泛型

在了解泛型前，请简单思考这个问题：

假如让你实现一个函数，函数的参数可以是任何值，返回值就是将参数原样返回，并且只能接收一个参数，会怎么做？

由于可以接收任意值，因此最先想到的就是使用 any，如下：

```js
const fn = (arg: any) => arg

const result = fn('bruce')
console.log(result) // "bruce"
console.log(result.length) // 5
result.toFixed(2) // OK
```

虽然使用 `any` 是可行的，不会报错，但是这样就失去了类型检查的意义。如上例所示，传入一个`string`,返回值也是`string`类型，但是`string`类型没有 toFixed 方法，因此这里应该报错提示，但是并没有，可见`any`是不符合预期的。

泛型就是解决这个问题而生的。

```js
function fn<T>(arg: T): T {
  return arg
}

console.log(fn(1)) // 1
console.log(fn('Bruce')) // "Bruce"
```

上述代码中，定义了一个类型 T，这个 T 是一个抽象类型，只有在调用的时候才能确定它的值。

当传入 1 或'Bruce'时，T 会自动识别为 number 或 string 类型，然后再将其传给参数类型和返回值类型，这样就实现了传入任何值，返回值也是将参数原样返回。

T 代表 Type，在定义泛型时通常用作第一个类型变量名称，T 并不是固定语法，可以用任何有效名称代替。还有一些常见的泛型变量名：

- K（Key）：表示对象中的键类型
- V（Value）：表示对象中的值类型
- E（Element）：表示元素类型

泛型变量定义多个

```js
function fn<T, U>(message: T, value: U): U {
  console.log(message)
  return value
}

console.log(fn < string, number > ('Burce', 520))
```

### 泛型约束

```js
function fn<T>(arg: T): T {
  console.log(arg.size) // Property 'size' does not exist on type 'T'
  return arg
}
```

上述代码想要打印参数的 size 属性，但是报错了，原因在于 T 理论上可以是任意类型，但无论使用它的什么属性或方法都会报错（除非这个属性和方法是所有集合共有的）。

想要解决这个问题，可以使用泛型约束，限定传入函数的参数具有 size 属性。

```js
interface arrType {
    size:number
}

function fn<T extends arrType>(arg: T): T {
    console.log(arg.size); //OK
    return arg;
}
```

### 泛型工具类型

为了方便开发者，TS 内置了一些常见的工具类型，例如：Partial、Required、Readonly、Record 等等。

#### typeof

`typeof`的主要用途是在类型上下文中获取变量或者属性的类型。

```js
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: 'Meix',
  age: 18
}

// 获取到person变量的类型并赋值给personType类型变量
type personType = typeof person

// 使用personType类型
const bruce: personType = {
  name: 'Bruce',
  age: 18
}
```

`typeof`操作符还可以用来获取函数的类型。

```js
function fn(x: string): string[] {
  return [x]
}

type FnType = typeof fn // (x: string) => string[]
```

#### keyof

`keyof`操作符可以用来获取某种类型的所有键，其返回类型是联合类型

```js
interface Person {
    name: string;
    age: number;
}

type P = keyof Person; // 'name' | 'age'
```

看下面的例子：

```js
function fn(obj, key) {
  return obj[key]
}
```

该函数接收 obj 和 key 两个参数，并返回对应属性的值。对象上的不同属性，可以具有完全不同的类型，甚至都不知道 obj 对象长什么样子。
那么该如何定义 fn 函数的类型呢？
第一版：为 obj 和 key 分别设置 object 和 string 类型。

```js
function fn(obj: object, key: string) {
  return obj[key] //报错  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
}
```

元素隐式地拥有 any 类型，因为 string 类型不能被用于索引类型{}。

第二版：使用 keyof

```js
function fn<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
```

首先定义类型 T，并使用 extends 关键字约束 T 类型必须是 object 类型的子类型，然后使用`keyof`操作符获取 T 类型的所有键(其返回值是联合类型)，最后利用 extends 关键字约束 K 类型必须是`keyof T`联合类型的子类型。这样定义的话就能够正确推导出指定键对应的类型了.

#### in

`in`用来遍历枚举类型

```js
type Keys = 'x' | 'y' | 'z';

type Obj = {
    [k in Keys]: string;
}

const obj:Obj = {x:'',y:'',z:''}
```

#### extends

有时不想定义的泛型过于灵活，可以通过`extends`关键字添加泛型约束。

```js
interface ArgType {
    id: number;
}

function fn<T extends ArgType>(arg: T): T {
    console.log(arg.id);
    return arg;
}
```

### 泛型内置类型

#### Partial

`Partial`用来将类型的属性变成可选。

定义：

```js
type Partial<T> = {
    [P in keyof T]?: T[P];
}
```

首先通过 keyof T 取到 T 的所有属性名，使用 in 进行遍历，将其赋给 P，再通过 T[P]获取相应属性值的类型，?用于将所有属性变为可选的。

示例：

```js

```

#### Required

#### Readonly

#### Record

#### ReturnType

#### Pick

#### Omit

从对象结构的类型中排除掉指定的属性，从而构造一个新类型。

定义：

```js
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

示例：

```js
interface Person {
  name: string;
  age: number;
  sex: string;
}

type NewPerson = Omit<Person, 'sex'>
const ldh: NewPerson = {
  name: 'Meix',
  age: 18
}
// type NewPerson = {
//   name: string,
//   age: number
// }
```

#### Extract

Extract<T, U>，从 T 中提取 U。

定义：

```sh
type Extract<T, U> = T extends U ? T : never;
```

示例：

```js
type A = Extract<'x' | 'y' | 'z', 'y'> // 'y'
type B = Extract<string | number | (() => void), Function> // () => void
```

#### Exclude

Exclude<T, U>，从 T 中移除 U。

定义：

```sh
type Exclude<T, U> = T extends U ? never : T;
```

示例：

```js
type A = Exclude<'x' | 'y' | 'z', 'y'> // 'x' | 'z'
type B = Exclude<string | number | (() => void), Function> // string | number
```

#### NonNullable

过滤掉类型中的 null 和 undefined 类型。

```js
type A = NonNullable<string | null | undefined> // string
```
