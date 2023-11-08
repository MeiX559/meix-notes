# 时间日期相关

## 时间处理相关库

- [moment](https://github.com/moment/moment) JavaScript 日期处理类库

  - [moment 文档](http://momentjs.cn/docs/)

- [dayjs](https://github.com/iamkun/dayjs) 轻量级的处理时间和日期的 JavaScript 库

  - [dayjs 文档](https://dayjs.fenxianglu.cn/)

- [date-fns](https://github.com/date-fns/date-fns) 轻量级的 JavaScript 日期库，纯函数实现支持模块化

## Date 相关

`ECMAScript` 的`Date`类型参考了 Java 早期版本中的 java.util.Date。为此，`Date`类型将日期保存为自协调世界时（UTC, Universal Time Coordinated）时间 1970 年 1 月 1 日午夜（零时）至今所经过的毫秒数。使用这种存储格式，`Date` 类型可以精确表示 1970 年 1 月 1 日之前及之后 285616 年的日期。

要创建日期对象，可以使用 new 操作符调用`Date`构造函数：

```javascript
new Date() //Thu Dec 08 2022 10:27:45 GMT+0800 (中国标准时间)
// 传入一个参数
new Date(0) // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
// 传入多个参数
new Date(2023, 2, 12, 8, 8, 8) // Sun Mar 12 2023 08:08:08 GMT+0800 (中国标准时间)
```

在不给`Date`构造函数传递参数的时候，创建的对象将保存当前日期和时间。

`ECMAScript` 提供了`Date.parse()`方法，该方法接收一个表示日期的字符串参数，尝试将这个字符串转换为表示该日期的毫秒数。ECMA-262 第 5 版定义了 `Date.parse()`应该支持的日期格式，填充了第 3 版遗留的空白。所有实现都必须支持下列日期格式：

- “月/日/年”，如"5/23/2019"；
- “月名日，年”，如"May 23, 2019"；
- “周几 月名 日 年 时：分：秒 时区”，如"Tue May 232019 00:00:00GMT-0700"；
- ISO 8601 扩展格式“YYYY-MM-DDTHH:mm:ss.sssZ”，如 2019-05-23T00:00:00（只适用于兼容 ES5 的实现）。

```javascript
//创建一个表示“2019年5月23日”的日期对象
let someDate = new Date(Date.parse('May 23, 2019')) // Thu May 23 2019 00:00:00 GMT+0800 (中国标准时间)

//创建一个表示“2022年12月08日”的日期对象
new Date(Date.parse('2022/12/08')) //Thu Dec 08 2022 00:00:00 GMT+0800 (中国标准时间)

Date.parse() //没有传入字符串或传入的字符串不表示日期，返回NaN
```

如果传给`Date.parse()`的字符串并不表示日期，则该方法会返回 NaN。
`ECMAScript` 还提供了`Date.now()`方法，返回表示方法执行时日期和时间的毫秒数。

```javascript
Date.now() //1670467176542
```

### 继承的方法

与其他类型一样，`Date`类型重写了`toLocaleString`()、`toString`()和`valueOf`()方法。但与其他类型不同，重写后这些方法的返回值不一样。

### toLocaleString 和 toString

`Date`类型的`toLocaleString`()方法返回与浏览器运行的本地环境一致的日期和时间。这通常意味着格式中包含针对时间的 AM（上午）或 PM（下午），但不包含时区信息（具体格式可能因浏览器而不同）。`toString`()方法通常返回带时区信息的日期和时间，而时间也是以 24 小时制（0~23）表示的。

```javascript
new Date().toLocaleString() // '2022/12/8 10:44:51'

// 通常返回带时区信息的日期和时间
new Date().toString() //'Thu Dec 08 2022 10:45:01 GMT+0800 (中国标准时间)'
```

#### valueOf

`Date`类型的`valueOf`()方法根本就不返回字符串，这个方法被重写后返回的是日期的毫秒表示。

```javascript
//返回日期的毫秒表示
new Date().valueOf() //1670467662820

let date1 = new Date(2022, 0, 1) // 2022年1月1日
let date2 = new Date(2022, 1, 1) // 2022年2月1日
console.log(date1 < date2) // true
console.log(date1 > date2) // false
```

### 日期格式化方法

`Date`类型有几个专门用于格式化日期的方法，它们都会返回字符串：

- `toDateString`()显示日期中的周几、月、日、年（格式特定于实现）；
- `toTimeString`()显示日期中的时、分、秒和时区（格式特定于实现）；
- `toLocaleDateString`()显示日期中的周几、月、日、年（格式特定于实现和地区）；
- `toLocaleTimeString`()显示日期中的时、分、秒（格式特定于实现和地区）；
- `toUTCString`()显示完整的 UTC 日期（格式特定于实现）。

这些方法的输出与 `toLocaleString()`和 `toString()`一样，会因浏览器而异。因此不能用于在用户界面上一致地显示日期。

```javascript
//显示日期中的周几、月、日、年（格式特定于实现）
new Date().toDateString()  // 'Thu Dec 08 2022'

//显示日期中的时、分、秒和时区（格式特定于实现）
new Date().toTimeString() //'10:52:41 GMT+0800 (中国标准时间)'

//显示日期中的年、月、日（格式特定于实现和地区）
new Date().toLocaleDateString()  // '2022/12/8'

//显示日期中的时、分、秒（格式特定于实现和地区）
new Date().toLocaleTimeString()  '10:53:08'
```

### 日期/时间组件方法

- `Date()`: 返回当日的日期和时间；
- `getDate()`: 从 Date 对象返回一个月中的某一天（1 ～ 31）；
- `getDay()`:从 Date 对象返回一周中的某一天（0 ～ 6）；
- `getMonth()`: 从 Date 对象返回月份（0 ～ 11）；
- `getFullYear()`: 从 Date 对象以四位数字返回年份；
- `getYear()`：可以使用`getFullYear()`代替；
- `getHours()`: 返回 Date()对象的小时（0 ～ 23）;
- `getMinutes()`: 返回 Date()对象的分钟（0 ～ 59）;
- `getSeconds()`: 返回 Date()对象的分钟（0 ～ 59）;
- `getMillseconds()`: 返回 Date()对象的毫秒（0 ～ 999）;
- `getTime()`: 返回 1970 年 1 月 1 日至今的时间；
- `getTimezoneOffset()`: 返回本地时间与格林威治标准时间（GMT）的分钟差；
- `getUTCDate()`: 根据世界时从 Date 对象返回月中的一天（1 ～ 31）；
- `getUTCDay()`: 根据世界时从 Date 对象返回周中的一天（1 ～ 6）；
- `getUTCMonth()`: 根据世界时从 Date 对象返回月份（0 ～ 11）；
- `getUTCFullYear()`: 根据世界时从 Date 对象返回四位数的年份；
- `getUTCHours()`: 根据世界时从 Date 对象返回对象的小时（0 ～ 23）；
- `getUTCMinutes()`: 根据世界时从 Date 对象返回对象的分钟（0 ～ 59）；
- `getUTCSeconds()`: 根据世界时从 Date 对象返回对象的秒钟（0 ～ 59）；
- `getUTCMillseconds()`: 根据世界时从 Date 对象返回对象的毫秒（0 ～ 999）；
- `parse()`: 返回 1970 年 1 月 1 日午夜到指定日期（字符串）的毫秒数；
- `setDate()`: 设置 Date 对象中月的某一天（1 ～ 31）；
- `setMonth()`: 设置 Date 对象中月份（0 ～ 11）；
- `setFullYear()`: 设置 Date 对象中的年份（四位数字）；

```javascript
const d = new Date() //Sun Feb 05 2023 16:07:29 GMT+0800 (中国标准时间)
d.setMonth(d.getMonth() + 11) //Fri Jan 05 2024 16:07:29 GMT+0800 (中国标准时间)
```

## 时间相关方法

### 计算两个日期之间以天为单位的差值

```javascript
const getDayDiff = (date1, date2) => (date2 - date1) / (1000 * 3600 * 24)
let diff = getDayDiff(new Date('2020-04-01'), new Date('2020-08-15')) // 136
```

### 以日期对象的字符串形式返回时间

```javascript
const getTimeFromDate = (date) => date.toTimeString().slice(0, 8)
let time = getTimeFromDate(new Date()) // 09:46:08
```

### 生成一周时间

new Array 创建的数组只是添加了 length 属性，并没有实际的内容。通过扩展后，变为可用数组用于循环

```javascript
function getWeekTime() {
  return [...new Array(7)].map((j, i) => new Date(Date.now() + i * 8.64e7).toLocaleDateString())
}
```

使用

```javascript
getWeekTime()
// ["2020/2/26", "2020/2/27", "2020/2/28", "2020/2/29", "2020/3/1", "2020/3/2", "2020/3/3"]
```

### 日期格式化

一个很灵活的日期格式化函数，可以根据使用者给定的格式进行格式化，能应对大部分场景。

```javascript
/**
 * @param {string} format
 * @param {number} timestamp - 时间戳
 * @return {string}
 */
function formatDate(format = 'Y-M-D h:m', timestamp = Date.now()) {
  let date = new Date(timestamp)
  let dateInfo = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  }
  let formatNumber = (n) => (n > 9 ? n : '0' + n)
  let res = format
    .replace('Y', dateInfo.Y)
    .replace('M', dateInfo.M)
    .replace('D', dateInfo.D)
    .replace('h', formatNumber(dateInfo.h))
    .replace('m', formatNumber(dateInfo.m))
    .replace('s', formatNumber(dateInfo.s))
  return res
}
```

使用

```javascript
formatDate() // "2020-2-24 13:44"
formatDate('M月D日 h:m') // "2月24日 13:45"
formatDate('h:m Y-M-D', 1582526221604) // "14:37 2020-2-24"
```

```javascript
/* eslint-disable */
export default {
  formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
      }
    }
    return fmt
  },

  formatArrayDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date[0] + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date[1],
      'd+': date[2],
      'h+': date[3],
      'm+': date[4],
      's+': date[5]
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
      }
    }
    return fmt
  },

  padLeftZero(str) {
    return ('00' + str).substr(str.length)
  },

  isBefore(d1, d2) {
    return new Date(d1.replace(/-/g, '/')) < new Date(d2.replace(/-/g, '/'))
  },

  isEquals(d1, d2) {
    return new Date(d1.replace(/-/g, '/')) === new Date(d2.replace(/-/g, '/'))
  },

  getDateBySelect(date, day, zf) {
    let oneDayLong = 24 * 60 * 60 * 1000
    let dayObj = {
      startDate: undefined,
      endDate: undefined
    }
    // 获取前day天的时间
    if (zf === 1) {
      let preDay = new Date(date.getTime() - day * oneDayLong)
      dayObj.startDate = preDay
      dayObj.endDate = new Date(date.getTime())
    } else if (zf === 2) {
      // 获取后day天的数据
      dayObj.startDate = new Date(date.getTime() + 1 * 1000)
      dayObj.endDate = new Date(date.getTime() + day * oneDayLong)
    }
    return dayObj
  },

  getDateFromString(str) {
    return new Date(Date.parse(str.replace(/-/g, '/')))
  },

  //两个时间相差天数 兼容firefox chrome
  dateDifference(sDate1, sDate2) {
    //sDate1和sDate2是2006-12-18格式
    let dateSpan, tempDate, iDays
    sDate1 = Date.parse(sDate1)
    sDate2 = Date.parse(sDate2)
    dateSpan = sDate2 - sDate1
    // dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
    return iDays
  }
}
```

```javascript
function formatDate(t, str) {
  var obj = {
    yyyy: t.getFullYear(),
    yy: ('' + t.getFullYear()).slice(-2),
    M: t.getMonth() + 1,
    MM: ('0' + (t.getMonth() + 1)).slice(-2),
    d: t.getDate(),
    dd: ('0' + t.getDate()).slice(-2),
    H: t.getHours(),
    HH: ('0' + t.getHours()).slice(-2),
    h: t.getHours() % 12,
    hh: ('0' + (t.getHours() % 12)).slice(-2),
    m: t.getMinutes(),
    mm: ('0' + t.getMinutes()).slice(-2),
    s: t.getSeconds(),
    ss: ('0' + t.getSeconds()).slice(-2),
    w: ['日', '一', '二', '三', '四', '五', '六'][t.getDay()]
  }
  return str.replace(/([a-z]+)/gi, function ($1) {
    return obj[$1]
  })
}
```

### 将指定格式的字符串解析为日期字符串

```javascript
const dataPattern = (str, format = '-') => {
  if (!str) {
    return new Date()
  }
  const dateReg = new RegExp(`^(\\d{2})${format}(\\d{2})${format}(\\d{4})$`)
  const [, month, day, year] = dateReg.exec(str)
  return new Date(`${month}, ${day} ${year}`)
}

console.log(dataPattern('12-25-1995')) // Mon Dec 25 1995 00:00:00 GMT+0800 (中国标准时间)
```

### 计算时间差

```javascript
var date1 = new Date() //开始时间，当前时间
var date2 = new Date() //结束时间，需传入时间参数
var date3 = date2.getTime() - date1.getTime() //时间差的毫秒数
//计算出相差天数
var days = Math.floor(date3 / (24 * 3600 * 1000))
//计算出小时数
var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
var hours = Math.floor(leave1 / (3600 * 1000))
//计算相差分钟数
var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
var minutes = Math.floor(leave2 / (60 * 1000))
//计算相差秒数
var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
var seconds = Math.round(leave3 / 1000)
console.log(' 相差 ' + days + '天 ' + hours + '小时 ' + minutes + ' 分钟' + seconds + ' 秒')
```

### 返回当前的时间（年月日时分秒）

```javascript
function getDateTime() {
  var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours() + 1,
    minute = date.getMinutes(),
    second = date.getSeconds()
  month = checkTime(month)
  day = checkTime(day)
  hour = checkTime(hour)
  minute = checkTime(minute)
  second = checkTime(second)
  function checkTime(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  return '' + year + '年' + month + '月' + day + '日' + hour + '时' + minute + '分' + second + '秒'
}
```

### 是否今天

日期是不是今天，只需要判断 日期的 年月日 是否与 当前日期的 年月日一致即可，所以常规代码片段如下：

```javascript
function isToday(dt = new Date()) {
  let curDate = new Date() // 当前日期
  let comparedDate = new Date(
    typeof dt === 'string' && dt.includes('-') ? dt.replace(/-/g, '/') : dt
  ) // 传入日期
  return (
    curDate.getFullYear() === comparedDate.getFullYear() && // 年相等
    curDate.getMonth() === comparedDate.getMonth() && // 月相等
    curDate.getDate() === comparedDate.getDate() // 日相等
  )
}
```

`isToday`极短代码片段如下

```javascript
// isToday 极短代码片段
const isToday = (dt = new Date()) =>
  ['getFullYear', 'getMonth', 'getDate'].every(
    (i) =>
      new Date()[i]() ===
      new Date(typeof dt === 'string' && dt.includes('-') ? dt.replace(/-/g, '/') : dt)[i]()
  )
```

使用了提取公因式，把 重复出现的 `getFullYear`, `getMonth`,`getDate` 给提取出来用`every`结合而成

### 是否昨天

是否昨天，只需把当前日期减一天，再做比较即可，所以常规代码片段如下：

```javascript
function isYesterday(dt = new Date()) {
  let curDate = new Date() // 当前日期
  curDate.setDate(curDate.getDate() - 1) // 当前日期减一天
  let comparedDate = new Date(
    typeof dt === 'string' && dt.includes('-') ? dt.replace(/-/g, '/') : dt
  ) // 传入日期
  return (
    curDate.getFullYear() === comparedDate.getFullYear() && // 年相等
    curDate.getMonth() === comparedDate.getMonth() && // 月相等
    curDate.getDate() === comparedDate.getDate()
  ) // 日相等
}
```

是否昨天极短代码片段的实现大致和是否今天一样，不同的是，首先要定义出昨天具体是哪一天的标准，才能使用传入的日期和标准日期做比较，具体操作 是 当前时间戳 减去一天的时间戳即`new Date() \- 24*60*60*1000`，得到一个昨天的标准日期时间戳，然后再做比较

```javascript
// isYesterday 极短代码片段
const isYesterday = (dt = new Date()) =>
  ['getFullYear', 'getMonth', 'getDate'].every(
    (i) =>
      new Date(new Date() - 24 * 60 * 60 * 1000)[i]() ===
      new Date(typeof dt === 'string' && dt.includes('-') ? dt.replace(/-/g, '/') : dt)[i]()
  )
```

### 是否明天

是否明天，只需把当前日期加一天，再做比较即可，所以常规代码片段如下：

```javascript
function isTomorrow(dt = new Date()) {
  let curDate = new Date() // 当前日期
  curDate.setDate(curDate.getDate() + 1) // 当前日期加一天
  let comparedDate = new Date(
    typeof dt === 'string' && dt.includes('-') ? dt.replace(/-/g, '/') : dt
  ) // 传入日期
  return (
    curDate.getFullYear() === comparedDate.getFullYear() && // 年相等
    curDate.getMonth() === comparedDate.getMonth() && // 月相等
    curDate.getDate() === comparedDate.getDate()
  ) // 日相等
}
```

是否明天极短代码片段的实现和是否昨天相反，是 当前时间戳 加上一天的时间戳即`+new Date() + 24*60*60*1000`，得到一个昨天的标准日期时间戳，然后再做比较

```javascript
// isTomorrow 极短代码片段
const isTomorrow = (dt = new Date()) =>
  ['getFullYear', 'getMonth', 'getDate'].every(
    (i) =>
      new Date(+new Date() + 86400000)[i]() ===
      new Date(typeof dt === 'string' && dt.includes('-') ? dt.replace(/-/g, '/') : dt)[i]()
  )
```

### 月天数

关于月天数需求，大致有：

- 获取当前日期所属月份天数，简称获取当月天数
- 获取当前日期所在年中的任一月份天数，简称获取今年任一月天数
- 获取给定日期所属月份天数，简称获取指定日期的所属月天数
- 获取给定日期所在年中任一月天数，简称获取指定日期的所属年任一月天数
- 获取年任一月天数

```css
//获取给定月份天数
new Date(2022,2,0).getDate()  //28
```

需要两个参数来完成这个功能函数，所以常规代码片段是：

```javascript
function daysInMonth(month = new Date().getMonth() + 1, dt = new Date()) {
  let is = month >= 1 && month <= 12
  dt = is ? dt : month
  month = is ? month : new Date(month).getMonth() + 1
  //解析传入的日期 dt
  const d = new Date(
    typeof dt === 'string' && dt.includes('-') ? dt.replace(/-/g, '/') : dt.toString()
  )
  // 设置月份
  d.setMonth(month) // 因为月份是按索引 0-11，索引这里没有进行 - 1
  // 设置日期为0，那么日期就会被设置为上个月的最后一天
  d.setDate(0)
  // 返回上月最后一天日期，因为月份是按索引 0-11
  return d.getDate()
}

/**
 * @description: 获取某月的天数
 * @param
 *  month:指定月份,默认当前月份（1-12）
 *  dt:指定日期,默认当前日期（格式：yyyy-mm-dd）
 */
function getMonthDays(month = new Date().getMonth() + 1, dt = new Date()) {
  // 是否传第一个参数month
  let isMonth = month >= 1 && month <= 12
  dt = isMonth ? dt : month // 指定日期，第一个参数不传或不在1-12之间
  month = isMonth ? month : new Date(month).getMonth() + 1 //不传month，则month为当前日期所在的月份
  // 解析传入的日期
  const d = new Date(
    typeof dt === 'string' && dt.includes('-') ? dt.replace(/-/g, '/') : dt.toString()
  )
  // 设置月份
  d.setMonth(month)
  // 设置日期为0，返回当月的天数
  d.setDate(0)
  console.log(dt, month, d.getDate())
  return d.getDate()
}
```

具体使用：

```javascript
// 获取当前月份天数  -- 获取当月天数
daysInMonth()
// 获取今年2月份天数 -- 获取今年任一月天数
daysInMonth(2)
// 获取2000年2月份天数
daysInMonth(2, 2000)
// 获取指定时间（2000-01-01 12:23:59）指定月份（2）的天数 -- 获取指定日期的所属年任一月天数
daysInMonth(2, '2000-01-01 12:23:59')
// 获取指定时间（2000-01-01 12:23:59）所属月天数   -- 获取指定日期的所属月天数
daysInMonth('2000-01-01 12:23:59')

getMonthDays() //当前日期所在月份的天数  Wed Dec 07 2022 16:46:27 GMT+0800 (中国标准时间) 12 31
getMonthDays(2) //当年2月的天数  Wed Dec 07 2022 16:46:27 GMT+0800 (中国标准时间) 2 28
getMonthDays(2, '2100-02-01') //获取指定日期所在年2月的天数  2100-02-01 2 28
getMonthDays('2100') //指定年份1月所在天数   2100 1 31
getMonthDays(2100) //指定年份1月所在天数    2100 1 31
getMonthDays('2100-03-01') //指定日期（年月日）所在月的天数  2100-03-01 3 31
```

`setDate(0)`那么日期就会被设置为上个月的最后一天，具体更多可以看 MDN `Date.prototype.setDate`的描述
月天数如何个极短法呢，可读性可能要牺牲点了，不过也还好，借助`new Date(year,month,0).getDate()`进行实现，具体如下：

```javascript
const daysInMonth = function (month = new Date().getMonth() + 1, dt = new Date()) {
  let is = month >= 1 && month <= 12
  dt = is ? dt : month
  month = is ? month : new Date(month).getMonth() + 1
  let date = new Date(
    typeof dt === 'string' && dt.includes('-') ? dt.replace(/-/g, '/') : dt.toString()
  )
  const year = date.getFullYear()
  return new Date(year, month, 0).getDate()
}
```

### 格式化

在前端项目中，使用日期时间相关的方法，格式化方法频率比较高，那么自己实现一个 `format`方法吧，在实现之前 依然保留传统的使用方法，因为没有是单个方法，实现单兵作战高效强悍，实现的时候有些地方会做些改变，具体哪些改变请往下看

```javascript
/**
 * @description: 日期时间格式化函数
 * @param  { Array } args :形参数组，生效的最多为前两个参数
 * 1个参数情况：
 *      1.1 参数为格式，则默认格式化当前时间
 *      1.2 参数为时间戳或字符串时间，则使用默认格式去格式化化给定的 时间戳或字符串时间
 * 2个参数情况：
 * 第一个参数表示格式化的日期，可以是时间戳或字符串时间
 * 第二个参数表示格式
 */
const format = function (...args) {
  try {
    // 参数解构
    const [a, b] = args
    // 默认值
    let dt = new Date(), //默认当前时间
      ft = 'YYYY-MM-DD HH:mm:ss' // 默认格式
    //如果参数只传入了一个的情况，我们认为用户用户传入的是格式，需要格式化的是当前时间
    if (args.length == 1) {
      if (isNaN(new Date(a).valueOf())) {
        ft = a
      } else {
        dt = new Date(typeof a == 'string' && a.includes('-') ? a.replace(/-/g, '/') : a)
      }
    } else if (args.length >= 2) {
      dt = new Date(typeof a == 'string' && a.includes('-') ? a.replace(/-/g, '/') : a)
      ft = b
    }
    const map = {
      Y: String(dt.getFullYear()), //4位数 年份
      M: String(dt.getMonth() + 1).padStart(2, 0), // 2位数 月份
      D: String(dt.getDate()).padStart(2, 0), // 2位数 日期
      H: String(dt.getHours()).padStart(2, 0), // 2位数 时
      m: String(dt.getMinutes()).padStart(2, 0), // 2位数 分
      s: String(dt.getSeconds()).padStart(2, 0), //2位数 秒
      S: String(dt.getMilliseconds()).padStart(3, 0), // 3位数 毫秒
      Q: Math.floor((dt.getMonth() + 3) / 3) + '' //季度
    }
    return ft.replace(
      /\[([^\]]+)]|y{1,4}|Y{1,4}|M{1,2}|d{1,2}|D{1,2}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|q|t|S{1,3}/g,
      (match) => {
        // 匹配中的首字符
        let k = match[0]
        // 匹配到的字符串长度
        let len = match.length
        switch (k) {
          case 'y':
          case 'Y':
            return match.replace(new RegExp('((' + k + ')+)', 'g'), (a) =>
              map.Y.substr(4 - a.length)
            )
          case 'M':
            return len == 1 ? Number(map.M) : map.M
          case 'D':
          case 'd':
            return len == 1 ? Number(map.D) : map.D
          case 'H':
          case 'h':
            return len == 1 ? Number(map.H) : map.H
          case 'm':
            return len == 1 ? Number(map.m) : map.m
          case 's':
            return len == 1 ? Number(map.s) : map.s
          case 'S':
            return match.replace(new RegExp('((' + k + ')+)', 'g'), (a) =>
              map.S.substr(3 - a.length)
            )
          case '[':
            return match.replace(/\[|\]/g, '')
          case 'q':
            return map.Q
          default:
            return match
        }
      }
    )
  } catch (e) {
    return new Date('') // Invalid Date
  }
}
```

实现完了，到底具有那些能力，测试下，大致罗列如下：

```javascript
// 使用默认格式格式化当前日期
format()

// 指定格式来格式化当前日期
format('yyyy-MM-dd')

// 使用默认格式来格式化指定日期
format('2021/1/1')
// => "2021-01-01 00:00:00"

// 指定格式来格式化指定日期
format('2021/1/1', 'yy-MM-dd hh:mm:ss S')
// => "21-01-01 00:00:00 000"

// 模板处理特殊字符
format('2021/1/1', 'yyyy-MM-dd [yyyy]')
// => "2021-01-01 yyyy"

format('2021/1/1', '2021/1/1是属于第q季度')
// => "2021/1/1是属于第1季度"

format('当前时间是属于第q季度')
```

所有可用解析标记的列表，如果又其他需求，可自行扩展即可

| 标识      | 示例    | 描述               |
| --------- | ------- | ------------------ |
| YY/yy     | 18      | 年，两位数         |
| YYYY/yyyy | 2018    | 年，四位数         |
| M         | 1-12    | 月，从 1 开始      |
| MM        | 01-12   | 月，两位数字       |
| D/d       | 1-31    | 日                 |
| DD/dd     | 01-31   | 日，两位数         |
| H/h       | 0-23    | 24 小时            |
| HH/hh     | 00-23   | 24 小时，两位数    |
| h         | 1-12    | 12 小时            |
| hh        | 01-12   | 12 小时，两位数    |
| m         | 0-59    | 分钟               |
| mm        | 00-59   | 分钟，两位数       |
| s         | 0-59    | 秒                 |
| ss        | 00-59   | 秒，两位数         |
| S         | 0-9     | 毫秒（百），一位数 |
| SS        | 00-99   | 毫秒（十），两位数 |
| SSS       | 000-999 | 毫秒，三位数       |
| q         | 季度    | 返回 1 ~ 4         |

## 使用 Dayjs 实现倒计时

### react 格式化实现

```js
import { useState, useRef, useCallback, useEffect } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const CountDown = ({ remainTime = 0 }) => {
  const [timer, setTimer] = useState(['0', '00', '00', '00'])
  const timerRef = useRef<any>()

  const initTimer = useCallback((t: number) => {
    setTimer(calcMS(t).split('-'))
    timerRef.current = setInterval(() => {
      t -= 1000
      if (t > 0) {
        setTimer(calcMS(t).split('-'))
      } else {
        setTimer(['0', '00', '00', '00'])
        clearInterval(timerRef.current)
      }
    }, 1000)
  }, [])

  useEffect(() => {
    if (remainTime) {
      initTimer(remainTime)
    } else {
      setTimer(['0', '00', '00', '00'])
    }
    return () => {
      clearInterval(timerRef.current)
    }
  }, [initTimer, remainTime])

  // const calcMS = (t: number) => {
  //   // 手动格式化
  //   // const days = Math.floor(t / (1000 * 60 * 60 * 24)).toString();
  //   // let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
  //   // let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString();
  //   // let seconds = Math.floor((t % (1000 * 60)) / 1000).toString();
  //   // hours = hours.length < 2 ? `0${hours}` : hours;
  //   // minutes = minutes.length < 2 ? `0${minutes}` : minutes;
  //   // seconds = seconds.length < 2 ? `0${seconds}` : seconds;

  //   // 使用dayjs格式化
  //   const days = dayjs.duration(t).format('D')
  //   const hours = dayjs.duration(t).format('HH')
  //   const minutes = dayjs.duration(t).format('mm')
  //   const seconds = dayjs.duration(t).format('ss')
  //   return [days, hours, minutes, seconds]
  // }

  // 传入的t如果是截止时间，使用dayjs.duration(dayjs(t).diff())计算时间差
  const calcMS = (t: number) => dayjs.duration(t).format('D-HH-mm-ss')

  return (
    <div>
      距活动结束<span className="countdown-num">{timer[0]}</span>天
      <span className="countdown-num">{timer[1]}</span>时
      <span className="countdown-num">{timer[2]}</span>分
      <span className="countdown-num">{timer[3]}</span>秒
    </div>
  )
}

export default CountDown
```

```tsx
<CountDown remainTime={89098909} />
```

### vue 格式化实现

```html
<div class="countdown" v-html="state.count.format(format)"></div>

<p>{{ state.count.format('D 天 HH 时 mm 分 ss 秒') }}</p>
<p>{{ state.count.format('DD : HH : mm : ss') }}</p>
<p>{{ state.count.format('HH-mm-ss') }}</p>

<div class="countdown">
  使用取值方法：
  <span>{{ state.count.hours() }}</span>
  时
  <span>{{ state.count.minutes() }}</span>
  分
  <span>{{ state.count.seconds() }}</span>
  秒
  <span>{{ state.count.milliseconds() }}</span>
</div>

<div>
  距活动结束：<span className="countdown-num">{{ state.timer[0] }}</span>天
  <span className="countdown-num">{{ state.timer[1] }}</span>时
  <span className="countdown-num">{{ state.timer[2] }}</span>分
  <span className="countdown-num">{{ state.timer[3] }}</span>秒
</div>
```

<script setup>
  import CountDown from './countDown.vue'
</script>

<CountDown :timer="890989099" />
