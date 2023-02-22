# 类型转换

`JavaScript` 对待自己所需值的类型非常灵活，
::: tip

- 如果 `JavaScript` 需要一个布尔值，而你可能提供了其他类型的值，`JavaScript` 会根据需要转换这个值，转换的结果要么是 true，要么是 false；
- 如果 `JavaScript` 想要数值，它也会尝试将你提供的值转换为一个数值（如果无法进行有意义的转换就会转换为 NaN）；其他类型也是如此。

:::

`JavaScript` 类型转换表：

| 值                     | 转换为字符串           | 转换为数字         | 转换为布尔值 | 转换为对象                     |
| ---------------------- | ---------------------- | ------------------ | ------------ | ------------------------------ |
| undefined              | ''undefined"           | NaN                | false        |                                |
| null                   | "null"                 | 0                  | false        |                                |
| true                   | "true"                 | 1                  | true         | new Boolean(true)              |
| false                  | "false"                | 0                  | false        | new Boolean(false)             |
| ""(空字符串)           | ""                     | 0                  | false        | new String("")                 |
| 1.2(非空数字)          | "1.2"                  | 1.2                | true         | new String("1.2")              |
| "one"(非空非数字)      | "one"                  | NaN                | true         | new String("one")              |
| 0/-0                   | "0"                    | 0/-0               | false        | new Number(0/-0)               |
| NaN                    | "NaN"                  | NaN                | false        | new Number(NaN)                |
| Infinity/-Infinity     | "Infinity"/"-Infinity" | Infinity/-Infinity | true         | new Number(Infinity/-Infinity) |
| 1(非 0）               | "1"                    | 1                  | true         | new Number(1)                  |
| {}(任意对象)           | "[object Object]"      | NaN                | true         |                                |
| []任意数组             | ""(空字符串)           | 0                  | true         |                                |
| [9](一个数字数组)      | "9"                    | 9                  | true         |                                |
| ['a'](其他数组)        | "a"                    | NaN                | true         |                                |
| function(){}(任意函数) | "function(){}"         | NaN                | true         |                                |

## 抽象操作

在了解类型转换前，我们首先需要介绍一下 `JavaScript` 的四种抽象操作。抽象操作是指仅供内部使用的操作。

### ToPrimitive

`ToPrimitive`处理的是引用类型到基本类型的转换

`JavaScript` 对象到原始值的转换遵循着一种复杂的规则，其复杂性的主要原因在于某些对象类型有不止一种原始值的表示，比如，`Date` 对象可以用字符串表示，也可以使用时间戳表示，`JavaScript` 规范定义了对象到原始值转换的 3 种算法：

- **偏字符串**
  该算法返回原始值，而且只要可能就返回字符串。
- **偏数值**
  该算法返回原始值，而且只要可能就返回数值。
- **无偏好**
  该算法不倾向于返回任何原始值类型，而是由类定义自己的转换规则。

对象在转换为原始值时会调用对象的三个方法，分别是

- Symbol.toPrimitive
- toString，
- valueOf

::: tip
`Symbol.toPrimitive`是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。
`Symbol.toPrimitive`被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式：

- Number：该场合需要转换成数值
- String：该场合需要转换成字符串
- Default：该场合可以转换成数值，也可以转换成字符串
  :::

```javascript
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123
      case 'string':
        return 'str'
      case 'default':
        return 'default'
      default:
        throw new Error()
    }
  }
}

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

`toString()`返回对象的字符串表示。
::: tip toString 返回值

默认情况下，toString()方法返回一个特别的值；如：({a:1}).toString() // '[object Object]'
不过，很多类都定义了自己特有的 toString()方法，比如：

- Array 类的 toString()方法会将数组的每个元素转换为字符串，然后再使用逗号作为分隔符将它们拼接起来；
- Function 类的 toString()方法会将用户定义的函数转换为 JavaScript 源代码的字符串；
- `valueOf()`把对象转换为代表对象的原始值（如果存在这样一个原始值）。
- 对象是复合值，且多数对象不能真正通过一个原始值来表示，因此 valueOf()方法默认情况下只返回对象本身，而非返回原始值。

:::

#### 对象到原始值转换算法

对象在进行类型转换的时候，首先会检查是否存在一个名为 Symbol.toPrimitive 的内建 Symbol，如果存在且返回原始值，则返回该值作为结果，如果返回的是引用类型值，则报 TypeError 错误。
如果不存在 Symbol.toPrimitive，那么就会依赖 toString 和 valueOf 两个方法。
:::tip 转换算法
**以下示例默认不存在 Symbol.toPrimitive()**
偏字符串算法首先尝试 toString()方法:

- 如果这个方法有定义且返回原始值，则 JavaScript 使用该原始值（即使这个值不是字符串）。
- 如果 toString()不存在，或者存在但返回对象，则 JavaScript 尝试 valueOf()方法。
- 如果这个方法存在且返回原始值，则 JavaScript 使用该值，否则，转换失败，报 TypeError 错误。

偏数值算法与偏字符串算法类似，只不过是先尝试 valueOf()方法，再尝试 toString()方法。

无偏好算法取决于被转换对象的类。
:::

![](https://cdn.nlark.com/yuque/0/2022/jpeg/22938772/1664245893256-8bf1d653-3269-4647-9839-a4b6aef8fe33.jpeg)

#### 对象转换为字符串

每个对象都有一个 toString()方法，默认情况下，toString()方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。
对象转换为字符串规则：JavaScript 首先使用偏字符串算法将它转换为原始值，然后再将原始值转换为字符串。

::: warning 注意点
偏字符串算法首先尝试 toString()方法，如果这个方法存在且返回原始值，那就使用该值，否则再尝试 valueOf()方法。
:::

```javascript
//1、在自定义对象中没有重新定义toString()方法
const obj = {}
console.log(obj.toString()) // [object Object]

//2、重新定义了toString()方法和valueOf()方法
//首先尝试toString()方法，其存在且返回原始值，就使用该值将其转换为字符串
const obj = {
  toString() {
    return '42'
  },
  valueOf() {
    return '422'
  }
}
console.log(String(obj)) // 42

//3、toString()方法不返回原始值,尝试valueOf
const obj = {
  toString() {
    return {}
  },
  valueOf() {
    return '422'
  }
}
console.log(String(obj)) // 422
```

#### 对象转换为数值

对象转换为数值：JavaScript 首先使用偏数值算法将它转换为原始值，然后再将其转换为数值。
::: warning 注意点
偏数值算法首先尝试 valueOf()方法，如果这个方法存在且返回原始值，那就使用该值，否则再尝试 toString()方法。
:::

```javascript
//1、在自定义对象中没有重新定义toString()方法和valueOf()方法
//valueOf()方法默认情况下只返回对象本身，而非返回原始值,因此它会再去尝试toString方法
该对象的toString方法返回的是[object Object]，因此再进行Number转换时为NaN
const obj = {}
console.log(Number(obj)) // NaN

//2、偏数值算法首先尝试valueOf()方法，该方法存在且返回422，因此最后转换的值为422
const obj = {
  toString() {
    return '42';
  },
  valueOf() {
    return '422';
  }
};
console.log(Number(obj));  // 422


//3、valueOf()方法不存在，因此再尝试toString方法，该方法返回42，因此最后转换的值为42
const obj = {
  toString() {
    return '42';
  }
};
console.log(Number(obj));  // 42
```

**特殊情况：**

```javascript
console.log(Number([])) // 0
console.log(Number([2])) //2
console.log(Number([1, 2, 3])) //NaN
```

**上述代码为什么空数组会转换为 0，单元数数值被转换为数值，而除了这两个其他对象都转换为 NaN？**

可以用偏数值转换规则解释；偏数值算法首先尝试 valueOf()方法，将 toString()方法作为备用；
对于对象（包括数组），它们内部继承的 valueOf 方法返回的是对象本身，而非原始值，因此它们内部会再次寻找 toString()方法，其中：

- 空数组调用 toString()方法返回的是空字符串，空字符串转换为数值为 0。
  [].toString() ==> '' ==> Number('') ==> 0
- 只有一个元素的数组转换为该元素对应的字符串。
  [2].toString() ==> '2' ==> Number('2') ==> 2
- [1, 2, 3].toString() ==> '1,2,3' ==> Number('1,2,3') ==> NaN

#### 对象转换为布尔值

对象转换为布尔值：所有对象都转换为 true。

:::tip 注意点
这个转换不需要使用对象到原始值的转换算法，而是直接适用于所有对象，包括空数组，new Boolean(false)这样的包装对象。像 new Boolean(false)是一个对象而不是原始值，它将转换为 true。
:::

```javascript
var a = new Boolean(false)
console.log(a) // Boolean {false}
if (!a) {
  console.log('假')
} else {
  console.log('真')
}
//最终执行的结果为"真"
```

上述代码中，为 false 创建了一个封装对象，因为所有对象（包括封装对象）转换为布尔值时都为 true，所以在条件判断的时候永远执行的都是真;

### ToString

`ToString`处理的是非字符串到字符串之间的转换

| 类型        | ToString 转换结果 |
| ----------- | ----------------- |
| null        | "null"            |
| undefined   | "undefined"       |
| true        | "true"            |
| false       | "false"           |
| number 类型 | 数值直接加引号    |

极小极大数字使用指数形式:

0/+0/-0 => "0"

Infinity/-Infinity => "Infinity/-Infinity"

引用类型调用 `ToPrimitive` 转换规则，再根据以上规则进行转换

- null 和 undefined 没有 toString 方法，但可通过显示强制类型转换 String()将 null 转换为'null',undefined 转换为'undefined'，其他基本类型都调用基本类型的包装对象属性 toString()并返回值。

```javascript
const a = null
const b = undefined
const c = new Number(12)
const d = new Boolean(false)

//使用原生函数String()转换
console.log(String(a)) //'null'
console.log(String(b)) //'undefined'

//调用内部属性toString()方法返回值
console.log(c.toString()) //'12'
console.log(d.toString()) // 'false'
```

- 数字的字符串化遵循通用规则，但是极小极大数字使用指数形式。

```javascript
const a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000
console.log(a.toString()) //'1.07e+21'
```

- 对象会首先调用 ToPrimitive 转换规则将对象转换为基本类型，如果返回的结果不是字符串类型，再根据以上规则转换为字符串。
- 数组的默认 toString()方法进行了重新定义，将所有单元字符串化以后再用‘,’连接起来。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22938772/1655103199091-a054f687-7b44-4451-b7ab-64a1207b8b06.png#averageHue=%23fefefe&clientId=u3df98694-3e0a-4&errorMessage=unknown%20error&from=paste&height=43&id=mLs1P&name=image.png&originHeight=37&originWidth=189&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6027&status=error&style=none&taskId=ub40537d9-c5d8-4d03-9a7c-784fa7fdbe5&title=&width=220.5)

- JSON 字符串化
  1. JSON 字符串化和 toString 的效果基本相同，只不过序列化的结果总是字符
  2. undefined，函数，symbol 值被单独转换时，会返回 undefined
  3. NaN，Infinity 格式的数值以及 null 都会被当做 null
  4. Date 日期调用了 toJSON()将其转换为了 string 字符串，因此会被当做字符串处理
  5. 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法会出现错误

```javascript
//布尔值，数字，字符串的包装对象在序列化过程中会自动转换成对应的原始值
console.log(JSON.stringify(new Number('11'))) //11
console.log(JSON.stringify(new String(false))) //"false"
console.log(JSON.stringify(new Boolean([]))) //true

//如果undefined，函数，symbol值被单独转换时，会返回undefined
console.log(JSON.stringify(undefined)) //undefined
console.log(JSON.stringify(function () {})) //undefined
console.log(JSON.stringify(Symbol(''))) //undefined

//NaN，Infinity格式的数值以及null都会被当做null
console.log(JSON.stringify(NaN)) //null
console.log(JSON.stringify(Infinity)) // null

//Date日期调用了toJSON()将其转换为了string字符串，因此会被当做字符串处理
console.log(JSON.stringify(new Date())) //"2022-08-04T12:09:16.131Z"

//对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法会出现错误
let obj = {
  name: 'Bruce'
}
obj.obj1 = obj
console.log(JSON.stringify(obj)) // Converting circular structure to JSON
```

### ToNumber

`ToNumber`处理的是非数值类型到数值类型的转换

| 类型                    | ToNumber 转换的结果                           |
| ----------------------- | --------------------------------------------- |
| false,null,''(空字符串) | 0                                             |
| true                    | 1                                             |
| undefined               | NaN                                           |
| 非数字字符串            | NaN                                           |
| 引用类型                | 调用 ToPrimitive 转换规则，再根据以上规则转换 |

- false,null,''（空字符串）转换为 0，true 转换为 1，undefined 转换为 NaN。
- 对字符串的处理遵循数字常量的相关规定/语法，处理失败时返回 NaN。
- 对象（包括数组）会先调用上面的 ToPrimitive 转换规则将对象转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循上面的转换规则将其转换为数字。

### ToBoolean

JavaScript 中的值可以分为以下两类：

1. 可以被强制类型转换为 false 的值
2. 其他（被强制类型转换为 true 的值）

| 类型      | ToBoolean 转换结果                             |
| --------- | ---------------------------------------------- |
| null      | false                                          |
| undefined | false                                          |
| string    | 空字符串('')转换为 false，其他都为 true        |
| Number    | +0，-0，NaN 转换为 false，其他都为 true        |
| Boolean   | 直接判断，false 转换为 false，true 转换为 true |
| Object    | 转换为 true（包括包装对象）                    |

#### 假值

undefined，null，false，+0，-0 和 NaN，""；

假值的布尔强制类型转换结果为 false；

:::tip 注意点
所有对象（包括包装对象）转换为布尔值时都为 true。
:::

```javascript
var a = new Boolean(false)
var b = new Number(0)
var c = new String('')
var d = Boolean(a && b && c)
console.log(d) // true
console.log(a && b && c) //  String {''}

Boolean({}) // true
```

var a = new Boolean(false);
var b = new Number(0);
var c = new String('');
以上都是封装了假值的**对象**；

通过 Boolean()强制类型转换的时候结果为 true，因为所有对象（包括包装对象）转换为布尔值时都为 true。

#### 真值

假值列表之外的值就是真值；

```javascript
var a = []
var b = {}
var c = function () {}
var d = Boolean(a && b && c)
console.log(d) // true
```

[],{},function(){}都不在假值列表中，因此它们都是真值；

## 显式强制类型转换

### 显示转换为字符串

- 使用内建函数 String 转换

```javascript
基本类型
console.log(String(null));  //'null'
console.log(String(undefined));  //'undefined'
console.log(String(12));         //'12'
console.log(String(true));         //'true'

引用类型   详见上述抽象操作ToPrimitive 对象到字符串的转换
String({})    // '[object Object]'
String([])    // ''
```

- toString()转换

toString()的显示转换过程为：先隐式的将基本类型转换为封装对象，然后对该对象调用 toString()

```javascript
var a = 42
console.log(a.toString()) // "42"
```

### 显示转换为数字

- 使用内建函数 Number 转换

```javascript
//false,null,''（空字符串）转换为0，true转换为1，undefined转换为NaN
console.log(Number(null)); // 0
console.log(Number(false)); //0
console.log(Number(true)); //1
console.log(Number(undefined)); //NaN

//字符串转换为数字，处理失败时转换为NaN
console.log(Number('12')); // 12
console.log(Number('a12')); //NaN
console.log(Number('12a')); //NaN
console.log(Number('0x99f')); //2463  (十六进制转为十进制)
console.log(Number('0b110')); // 6（二进制转十进制）
console.log(Number('0o117')); //79 （八进制转十进制）

引用类型   详见上述抽象操作ToPrimitive 对象到数值的转换
Number({})    // NaN
Number([])    // 0
```

- 一元运算符+转换

```javascript
var a = '3.14'
console.log(+a, typeof +a) // 3.14  number

//获取时间戳
console.log(Date.now()) // 1661496319213
console.log(+new Date()) // 1661496330400
```

- 显示解析数字字符串转换

解析数字字符串转换(如 parseInt)和强制将字符串转换为数字（Number)返回的结果都是数字；但是解析允许字符串中含有非数字，解析按从左到右的顺序，如果遇到非数字就停止解析；而转换不允许出现非数字字符，否则遇到非数字字符会转换失败并返回 NaN。

```javascript
//强制将字符串转换为数字,字符串中含有非数字时返回NaN
console.log(Number('123ab')) //NaN

//解析数字字符串,允许含有非数字
console.log(parseInt('123ab')) //123
```

parseInt()针对的是字符串值，如果 parseInt()传递的是非字符串，则该参数会被强制转换为字符串再进行解析。

```javascript
//数组首先会被隐式转换为字符串'1,2,3'，然后在对其进行解析，遇到非数字字符停止解析
console.log(parseInt([1, 2, 3])) // 1

//布尔值转换为"true"，再对其进行解析，由于解析非数字，则返回NaN
console.log(parseInt(true)) //NaN
```

parseInt()的一些奇怪现象

```javascript
// 1/0首先被隐式转换为字符串'Infinity',然后遇到第一个字符I在十九进制数中为18
console.log(parseInt(1 / 0, 19)) // 18   不是NaN
// 首先字符串转换为'0.00006',再进行解析
console.log(parseInt(0.00006)) // 0  不是0.00006
// 首先字符串转换为'6e-7',再进行解析
console.log(parseInt(0.0000006)) //6  不是0.0000006
```

### 显示转换为布尔值

通过 Boolean 显示转换非布尔值为布尔值。其中 Boolean 是显示的 ToBoolean 强制类型转换

```javascript
基本类型
Boolean(undefined) // false
Boolean(null) // false
Boolean(false) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false

引用类型
Boolean({}) // true
Boolean([]) // true
```

!!进行强制类型转换，它遵循抽象值操作中的 ToBoolean
如果没有 Boolean 和!!进行强制类型转换，就会自动隐式地进行 ToBoolean 转换。

## 隐式强制类型转换

### 隐式转换为字符串

+运算符

1. 如果进行+运算符的某个操作数是字符串或者该操作数是非基本类型值且能够进行 ToPrimitive 抽象操作转换为字符串，那么+将进行字符串拼接操作

```javascript
let a = '12'
let b = '34'
console.log(a + b) //'1234'

//数组首先调用ToPrimitive抽象操作转换为字符串'1,2'和'3,4'
console.log([1, 2] + [3, 4]) //'1,23,4'
```

2. 如果进行+运算符的某个操作数是布尔值，另一个是数字，那么会将布尔值转换为数字

```javascript
console.log(1 + true) // 2
```

3. 如果进行+运算符中的某个操作数是字符串，另一个是非字符串（基本类型值），那么另一项进行 ToString 操作

```javascript
console.log(1 + '1') // '11'
console.log('1' + true) // '1true'
console.log('1' + null) // '1null'
```

### 隐式转换为数字

通过与数字型数字进行加、减、乘、除法运算，可以将其转换为数字型，可以理解为系统自动先使用 Number()，对需要转换的值进行转换后再与数字型运算，Number()中转换为 NaN 的类型，使用隐式转换仍为 NaN

```javascript
console.log([2] - [1]) // 1
console.log('2' - '1') // 1

let a = '18123'
let b = '12dddd'
let c = null
let d = true

a = a * 1
b = b - 1
c = c - 1
d = d / 1

console.log(a) // 18123 a转换为Number为18123
console.log(b) // NaN   b转换为Number为NaN
console.log(c) //-1     c转换为Number为0
console.log(d) // 1     d转换为Number为1
```

### 隐式转换为布尔值

1. if()语句中的条件判断表达式
2. for(...;...;...)语句中的条件判断表达式
3. while()和 do...while()循环中的条件判断表达式
4. ?:中的条件判断表达式
5. 逻辑运算符||和&&左边的操作数（作为条件判断表达式）
   以上情况中非布尔值转换为布尔值都遵循 `ToBoolean` 抽象操作规则。

- 对象都判断为 true，

```javascript
const a = []
a && console.log('真') // 真
!a && console.log('假')

const b = {}
b && console.log('真') // 真
!b && console.log('假')

const c = null
c && console.log('真')
!c && console.log('假') //假
```

- undefined，null，空字符串('')，+0，-0，NaN，false 都判断为 false

# 二、宽松相等和严格相等

宽松相等“==”允许在相等比较时进行强制类型转换，而严格相等“===”不允许；
::: warning
NaN == NaN //false
+0 ==-0 // true
:::

## ==操作符强制类型转换规则

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22938772/1660031868505-69865102-6854-4715-b64c-bd44b61c3dc8.png#averageHue=%23fdfdfa&clientId=uf538b726-f2d0-4&errorMessage=unknown%20error&from=paste&height=363&id=NA4hU&name=image.png&originHeight=726&originWidth=1850&originalType=binary&ratio=1&rotation=0&showTitle=false&size=406109&status=error&style=none&taskId=ua69df60e-3fee-490b-95d0-68ab5819dac&title=&width=925)

### 1、比较两者类型是否相同，如果相同的话则直接比较两者的值

### 2、如果类型不同，首先判断是否是 null 和 undefined 之间的比较

#### null 和 undefined 之间的相等比较

1. 如果 x 为 null，y 为 undefined，则结果为 true。
2. 如果 x 为 undefined，y 为 null，则结果为 true。
   在==中，null 和 undefined 是相等的（它们也与其自身相等）；
   ![image.png](https://cdn.nlark.com/yuque/0/2022/png/22938772/1655186070759-65a275a9-6828-4ba2-ab24-ba6f69c923c6.png#averageHue=%23f1f1f1&clientId=u7d773484-4d59-4&errorMessage=unknown%20error&from=paste&height=224&id=VAW6K&name=image.png&originHeight=448&originWidth=352&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34741&status=error&style=none&taskId=u4bab9ff4-a575-4553-9092-55b13e5e9cf&title=&width=176)

### 3、如果不是 null 和 undefined 之间的比较，就会进行类型转换

#### 字符串和数字之间的相等比较

判断其中一方是否为字符串，如果是字符串先将其转换为 Number 再进行比较

1. 如果 Type(x) 是数字，Type(y) 是字符串，则返回 x == ToNumber(y) 的结果。
2. 如果 Type(x) 是字符串，Type(y) 是数字，则返回 ToNumber(x) == y 的结果。

```javascript
var a = 42;
var b = '42';
console.log(a===b) // false
console.log(a==b) // true
对于严格相等，a===b为false，因为其类型不同
对于非严格相等，a==b为true，这两个值得类型不同，非严格相等会对其中之一或两者进行强制类型转换
比较规则：判断b是字符串，首先将b转换为数值类型，再和a进行比较。
```

#### 布尔类型和其他类型之间的相等比较

判断其中一方是否为布尔类型，如果是布尔类型先将其转换为 Number 类型再进行比较

1. 如果 Type(x) 是布尔类型，则返回 ToNumber(x) == y 的结果;
2. 如果 Type(y) 是布尔类型，则返回 x == ToNumber(y) 的结果。

```javascript
//1、字符串与布尔类型的比较
console.log("42" == true)  //false
比较规则：布尔类型true转换为数值类型为1，字符串'42’转换为数值为42,1和42再进行比较结果不成立，因此为false

//2、数值与布尔类型比较
console.log(1 == true)  //true
比较规则：布尔类型true转换为数值类型为1，1和1比较相等，因此为true
```

#### 对象和非对象之间的相等比较

对象转换为原始值再进行比较，遵循以上的 ToPrimitive 转换规则

```javascript
console.log(42 == [42])  // true
比较规则：[42]转换为原始值--> '42',然后再根据字符串与数值的比较规则进行比较

console.log(0 == []) //true
比较规则：[]转换为原始值--> '',然后再根据字符串与数值的比较规则进行比较
```
