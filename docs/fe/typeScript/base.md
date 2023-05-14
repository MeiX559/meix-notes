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

#### bigint

```js
const bin: bigint = 0b1010n // 二进制整数
const oct: bigint = 0o744n // 八进制整数
const integer: bigint = 10n // 十进制整数
const hex: bigint = 0xffffffn // 十六进制整数
```

#### null 和 undefined

默认情况下`null`和`undefined`是所有类型的子类型，可以把`null`和`undefined`赋值给其它任何类型.

```js
let num: number = 1
num = null
num = undefined
```

如果在`tsconfig.json`里配置了"strictNullChecks": true，null 就只能赋值给 any、unknown 和它本身的类型（null），undefined 就只能赋值给 any、unknown、void 和它本身的类型（undefined）。

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

`unknown`与`any`十分相似，也是一种顶端类型，所有类型都可以分配给`unknown`类型.

```js
let a: unknown = 11
a = 'string'
a = true
```

`unknow`与`any`的区别：

- 任何类型的值都可以赋值给 `any`，同时 `any` 类型的值也可以赋值给任何类型（never 除外）。
- 任何类型的值都可以赋值给 `unknown`，但 `unknown` 类型的值只能赋值给 `unknown` 和 `any。`

unknown 类型是比 any 类型更加安全的顶端类型，因为 unknown 类型只允许赋值给 any 类型和 unknown 类型。

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

`never` 类型表示的是那些永不存在的值的类型，是一种尾端类型（不包含任何值）。

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

### 函数

```js
// 函数声明形式
function add(a: number, b: number): number {
  return a + b
}

// 箭头函数形式
const add = (a: number, b: number): number => a + b
```

上述代码 add 函数接受两个 number 类型的参数，并且它的返回值也是 number 类型。

#### 可选参数

```js
const fn = (name: string, age?: number): string => `${name}---`
```

:::warning 注意点
可选参数后面不可再出现必选参数。
:::

#### 参数默认值

可以给参数设置一个默认值，当调用时没有传该参数或者传入了 `undefined` 时，这个默认值就生效了。

```js
const fn = (name: string = 'Meix', age?: number): string => `${name}---`
// 参数未传，将使用默认值
console.log(fn()) // "Meix---"
```

:::warning 注意点
有默认值的参数也可放置在必需参数的前面，如果想要触发这个参数的默认值，必须要主动的传入 `undefined` 才可以。
:::

#### 函数重载

```js
type UnionType = number | string

function sum(x: UnionType, y: UnionType) {
  if (typeof x === 'string' || typeof y === 'string') {
    return x.toString() + y.toString()
  }
  return x + y
}

const res = sum('你', '好')
res.split('') // Property 'split' does not exist on type 'string | number'.
```

上述代码中，自然的会认为 res 变量的类型为 string，可以使用 split 方法，但是 TS 提示报错了，报错显示类型 number 上不存在 split 属性。

问：该如何解决上述问题呢？

答：函数重载隆重登场

```js
type UnionType = number | string;
function sum(x: number, y: number): number;
function sum(x: string, y: string): string;
function sum(x: string, y: number): string;
function sum(x: number, y: string): string;
function sum(x: UnionType, y: UnionType) {
    if (typeof x === 'string' || typeof y === 'string') {
        return x.toString() + y.toString();
    }
    return x + y;
}

const res = sum('你', '好');
res.split('');  //OK
```

### 枚举 enum

`enum`用于定义数组集合

#### 数值型枚举

```js
// 默认从0开始
enum Color{Red,Green,Blue}

// 定义Red从1开始
enum Color1{Red =1,Green,Blue}

let c: Color = Color.Blue
let r:Color = Color.Red

let c1: Color1 = Color1.Blue
let r1:Color1 = Color1.Red

console.log(c,c1) //2,3
console.log(r,r1) // 0,1
```

:::warning 注意点

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
const direction: Direction = Direction.Down // number 类型可以赋值给枚举类型，不会报错
console.log(direction) //1
```

:::

#### 字符串枚举

```ts
enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}
const direction: string = Direction.Down
const direction1: Direction = Direction.up // string类型可以赋值给枚举类型，不会报错

console.log(direction) // down
console.log(direction1) //up
```

#### 异构型枚举

TypeScript 允许在一个枚举中同事定义数值型枚举成员和字符串枚举成员，我们将这种类型的枚举称为异构型枚举。

```ts
enum Direction {
  Up,
  Down = 'down',
  Left = 3,
  Right
}
const direction: Direction = Direction.Down
const direction1: Direction = Direction.Up
console.log(direction, direction1) //down,0
```

:::warning 注意点

```ts
enum Direction {
  Down = 'down',
  Up //编译错误 ，Enum member must have initializer.即必须为该成员指定一个初始值
}
```

:::

#### 枚举成员映射

不论那种类型的枚举，都可以通过枚举成员名去访问枚举成员值。不过有一个例外，对于数值型枚举，不仅可以通过枚举成员名来获取枚举成员值，还可以通过枚举成员值去获取枚举成员名。

```ts
enum Bool {
  False = 0,
  True = 1
}
// 通过枚举成员名来获取枚举成员值
console.log(Bool.False) // 0
// 通过枚举成员值去获取枚举成员名
console.log(Bool[Bool.False]) //False
```

#### 计算枚举成员

```ts
enum Foo {
  A = 'Bruce'.length,
  B = Math.pow(2, 3)
}

console.log(Foo.A, Foo.B) //5,8
```

## 类型推断

基于赋值表达式推断类型的能力称为类型推断。

在 TS 中，函数返回值、具有初始化值的变量、有默认值的函数参数的类型都可以根据上下文推断出来。

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断为 any 类型。

```js
let a // let a: any
a = 'Bruce'
a = 666
a = true
```

## 类型断言

```js
const arr: number[] = [1, 2, 3]
const res: number = arr.find((num) => num > 2) // Type 'undefined' is not assignable to type 'number'
```

上例中，res 的值一定是 3，所以它的类型应该是 number。但是 TS 的类型检测无法做到绝对智能，在 TS 看来，res 的类型既可能是 number 也可能是 undefined，所以提示错误信息：不能把 undefined 类型分配给 number 类型。

对于这种情况就可以使用类型断言了。类型断言是一种笃定的方式，它只作用于类型层面的强制类型转换（可以理解成一种暂时的善意的谎言，不会影响运行效果），告诉编译器应该按照我们的方式来做类型检查。

类型断言可以使用以下两种方法：

- as
- 尖括号

### as

```js
const arr: number[] = [1, 2, 3];
const res: number = arr.find(num => num > 2) as number;
```

### 尖括号

```js
const value: any = 'str!';
const valueLength: number = (<string>value).length; //尖括号格式会与 react 中的 JSX 产生语法冲突

```

以上两种语法虽然没有区别，但是尖括号格式会与 react 中的 JSX 产生语法冲突，因此更推荐使用 as 语法。

## 类型拓宽

所有通过 let 和 var 定义的变量、函数的形参、对象的非只读属性，如果满足指定了初始值且未显式添加类型注解的条件，那么它们推断出来的类型就是指定的初始值字面量类型拓宽后的类型，这就是字面量类型拓宽。

```js
let str = 'Bruce' // let str: string

const b = true // const b: true
```

除了字面量类型拓宽之外，TS 对某些特定类型值也有类似类型拓宽的设计。

例如对 `null` 和 `undefined` 的类型进行拓宽，通过 let var 定义的变量如果满足未显式添加类型注解且被赋予了 `null` 或 `undefined` 值，则推断出这些变量的类型为 `any`.

```js
// let定义的变量未显示添加类型注解且被赋予了null或undefined，将被推断为any
let a = null //let a: any
let b = undefined //let b: any

// const 定义的变量不会出现上述let类似的情况
const c = null //const c: null
const d = undefined //const d: undefined
```

再来看一个例子：

```js
type ObjType = {
  a: number,
  b: number,
  c: number
}

type KeysType = 'a' | 'b' | 'c'

function fn(object: ObjType, key: KeysType) {
  return object[key]
}

let object = { a: 123, b: 456, c: 789 }
let key = 'a'
fn(object, key) // Argument of type 'string' is not assignable to parameter of type '"a" | "b" | "c"'
```

问：上述代码提示错误 ❎，为什么呢？

答：这是因为变量 key 的类型被推断成了 string 类型（类型拓宽） ，但是函数期望它的第二个参数是一个更具体的类型，所以报错。

解决：

方案一：使用 TS 提供的控制拓宽的方法，使用 const 定义 key 变量，即：const key = 'a';这样就不会报错了。

方案二：使用 const 断言

```js
let key = 'a' as const;
```

在某个值后面使用 const 断言后，TS 会为这个值推断出最窄的类型，没有拓宽。

## 联合类型

联合类型是多种类型的集合，用来约束取值只能是某几个值中的一个，使用|分隔每个类型。

```js
let a: number | string
a = 12 // OK
a = 'str' // OK
```

## 类型别名

类型别名是给一个类型起个新名字，起别名不会新建一个类型，它是创建了一个新名字来引用那个类型。

```js
type KeysType = number | string
```

## 接口

在 TS 中，使用接口（interfaces）来定义对象的类型，换句话说就是使用接口对「对象的形状」进行描述。

```js
// 定义一个接口，接口首字母通常大写
interface Person {
  name: string;
  age: number;
}

// 定义一个变量person，这个变量的类型是Person，这样就约束了person的形状必须与接口Person一致
const person: Person = {
  name: 'Bruce',
  age: 18
}
```

有时候希望对象中的一些字段只能在创建的时候被赋值，那么可以用`readonly`定义只读属性

```js
interface Person {
    name: string;
    readonly age: number;
}

const person:Person = {
    name:'Meix',
    age:18
}
person.age = 20  //Cannot assign to 'age' because it is a read-only property.
```

:::warning 注意点
只读的约束作用于第一次给对象赋值的时候，而非第一次给只读属性赋值的时候
:::

可选属性

```js
interface Person {
  name: string;
  age?: number; //age属性是可选的
}

const person: Person = {
  name: 'Meix'
}
```

### 类型断言

类型断言的意义就等同于在告诉程序，你很清楚自己在做什么，此时程序就不会再进行额外的属性检查了

```js
interface Person {
    name: string;
    age?: number;
}

const person: Person = {
    name: 'Bruce',
    age: 18,
    sex: '男',
} as Person; // ok
```

### 接口与类型别名的区别

类型别名是给一个类型起个新名字，起别名不会新建一个类型，它是创建了一个新名字来引用那个类型。

- 与接口不同的是，类型别名可以作用于基本类型、联合类型、元组以及其它任何需要手写的类型。
- 接口可以定义多次，类型别名不可以。

```js
// 接口
interface Person {
  name: string;
  age: number;
  sex: string;
}

// 类型别名
type Person = {
  name: string,
  age: number,
  sex: string
}
type Name = string // 基本类型
type Sex = '男' | '女' | '不详' // 联合类型
type PersonTuple = [string, number, string] // 元组
type ComputeAge = () => number // 函数
```

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
interface Person {
  name: string;
  age: number;
  sex: string;
}

type NewPerson = Partial<Person>

const person: NewPerson = {
  name: 'Bruce',
  sex: 'man'
}
```

#### Required

`Required`用于将类型的属性变成必选。

定义：

```js
type Required<T> = {
    [K in keyof T]-?: T[K];
}
// -?代表移除可选特性
```

示例：

```js
interface Person {
  name?: string;
  age?: number;
}

type NewPerson = Required<Person> //Required将移出可选属性

const person: NewPerson = {
  //Property 'age' is missing in type '{ name: string; }' but required in type 'Required<Person>'.
  name: 'Bruce'
}
```

#### Readonly

`Readonly`将类型的属性变成只读。

定义：

```js
type Readonly<T> = {
    readonly [K in keyof T]: T[K];
}
```

示例：

```js
interface Person {
  name: string;
  age: number;
}

type NewPerson = Readonly<Person>
const person: NewPerson = {
  name: 'Meix',
  age: 18
}

// 尝试修改属性值会报错
person.age = 20 // Cannot assign to 'age' because it is a read-only property
```

#### Record

Record<K extends keyof any, T>将 K 中所有属性的值转化为 T 类型。

定义：

```js
type Record<K extends keyof any, T> = {
    [P in K]: T;
}
```

示例：

```js
interface PersonInfo {
  name: string;
  age: number;
}

type Person = 'Meix' | 'Bruce' | 'LiangBo'

const ny: Record<Person, PersonInfo> = {
  Meix: { name: 'Meix', age: 18 },
  Bruce: { name: 'Bruce', age: 20 },
  LiangBo: { name: 'LiangBo', age: 20 }
}
```

#### ReturnType

用来获取一个函数的返回值类型。

定义：

```js
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
```

示例：

```js
type Fn = (v: string) => number

// x的类型为Fn函数的返回值类型
let x: ReturnType<Fn> = 888
x = '888' // Type 'string' is not assignable to type 'number'
```

#### Pick

从对象结构的类型中挑出一些指定的属性，来构造一个新类型。

定义：

```js
type Pick<T, U extends keyof T> = {
    [P in U]: T[P];
}
```

示例：

```js
interface Person {
  name: string;
  age: number;
  sex: string;
}

type NewPerson = Pick<Person, 'name' | 'sex'>

const person: NewPerson = {
  name: 'Bruce',
  sex: 'man',
  age: 1 //Type '{ name: string; sex: string; age: number; }' is not assignable to type 'NewPerson'.
}
```

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
