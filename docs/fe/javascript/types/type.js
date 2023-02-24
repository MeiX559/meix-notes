console.log(Object.prototype.toString.call(null)); //[object Null]
console.log(Object.prototype.toString.call({})); //[object Object]
console.log(Object.prototype.toString.call(function () {})); //[object Function]
console.log(Object.prototype.toString.call(undefined)); //[object Undefined]
console.log(Object.prototype.toString.call([])); //[object Array]
console.log(Object.prototype.toString.call('str')); //[object String]
console.log(Object.prototype.toString.call(12)); //[object Number]
console.log(Object.prototype.toString.call(true)); //[object Boolean]
console.log(Object.prototype.toString.call(Symbol())); //[object Symbol]
console.log(Object.prototype.toString.call(BigInt(42)); //[object BigInt]