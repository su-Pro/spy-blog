## [数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 创建数组

#### Array() === new Array() 

[stackoverflow上的回答：](https://stackoverflow.com/questions/8205691/array-vs-new-array)

> When Array is called as a function rather than as a constructor, it creates and initialises a new Array object. Thus the function call Array(…) is equivalent to the object creation expression new Array(…) with the same arguments. 

因此从功能和参数的角度来讲，是一样的。


#### [Array.of(7)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of) === Array(7) ?

> Array.of(element0[, element1[, ...[, elementN]]])

Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）。

```js
Array.of(7);       // [7] 
Array(7);          // [ , , , , , , ]
```


#### [ES6 Arrary.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

Array.from() 方法从一个**类似数组**或**可迭代对象**创建一个新的，**浅拷贝**的数组实例。

> Array.from(arrayLike[, mapFn[, thisArg]])

> 可迭代对象：拥有迭代器接口即可，例如字符串、类数组、set、mep

```js

console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

```

`Array.from() `方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。也就是说 `Array.from(obj, mapFn, thisArg)` 就相当于 `Array.from(obj).map(mapFn, thisArg)`

TODO: set map


### 改变原数组

vue 2 中 对数组进行数据劫持就需要监控所有能够改变原数组的api，以及在react 的不可变值思想中，如果对数据进行修改的话，需要首先copy一份。因此还是有必要总结一下能够改变数组的api有哪些。

#### push
#### pop
#### shift
#### unshift
#### splice

可以删除或替换现有的元素，也可以原地添加新的元素。

> array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

start:
指定修改的开始位置（从0计数）。
- 如果超出了数组的长度，则从数组末尾开始添加内容；
- 如果是负值，则表示从数组末位开始的第几位;
- 如果负数的绝对值大于数组的长度，则表示开始位置为第0位。

deleteCount:
- 如果 deleteCount 大于 **start 之后的元素的总数**，则从 start 后面的元素都将被删除
- 如果 deleteCount 被省略了,start之后数组的所有元素都会被删除。
- deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

**返回值**：
由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有**删除元素**，则返回**空数组**。

> 由此可见，对于删除操作的需求首选splice，尽量语义化。


#### [sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

sort() 方法用[原地算法](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)对数组的元素进行排序，并返回数组。

> 不理解，在数据量大的时候V8使用quicksort进行排序，然而quicksort是需要logn的空间复杂度来支持递归的，那么v8是如何做到o(1)空间的呢？

默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的。

**compareFunction：**
用来指定按某种顺序进行排列的函数，数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

- 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
- 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。
- 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
- compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的（**用来数组乱序？**）。

```js

// 升序：
xxx.sort((a,b) => a - b)
// 降序：

xxx.sort((a,b) => b - a)

xxx.sort(() => Math.random() - 0.5)
```

数组乱序进阶：[「前端进阶」数组乱序](https://juejin.im/post/5d004ad95188257c6b518056)


[稳定的排序算法](https://es6.ruanyifeng.com/#docs/array#Array-prototype-sort-%E7%9A%84%E6%8E%92%E5%BA%8F%E7%A8%B3%E5%AE%9A%E6%80%A7)


#### reverse

是可以颠倒类数组的，例如：

```js
const a = {0: 1, 1: 2, 2: 3, length: 3};
console.log(a); // {0: 1, 1: 2, 2: 3, length: 3}
Array.prototype.reverse.call(a); 
console.log(a); // {0: 3, 1: 2, 2: 1, length: 3}
```

#### Array.prototype.fill()

### 对数组查找

#### indexOf
#### lastIndexOf
#### includes

改进后的indexof方法，能够实现对NaN进行判断，并且更加语义化。

#### slice
#### find()& findIndex() 

### 数组拼接

#### concat
#### join

### 遍历

差异：return是否会结束循环

#### reduce
#### forEach/map
#### every/some/filter
#### keys/values/entries

## 实践

### 类数组转换

类数组对象本质特征只有一个，就是拥有length属性。

#### Array.from()

只要是部署了iterator接口的对象，都能将其转化为数组。注意 展开运算符是无法转化**没有部署iterator接口**的类数组对象的。

```js
let obj = {length : 3}

Array.from(obj) // Array(3) [ undefined, undefined, undefined ]


[...obj] // TypeError: obj is not iterable
// 因为obj没有部署iterator接口

```

#### Array.prototype.slice.call()

es5常用的方式，还是拥抱ES6吧~

#### apply + concat

### [unix：pipe](https://zh.wikipedia.org/wiki/%E7%AE%A1%E9%81%93_(Unix))

pipe 管道可能是我们在linux下最常用的操作符之一了, 上一个函数的计算结果传给下一个函数, 就这样一直传递，如下代码：

```js
const calc1 = x => x * 2
const calc2 = x => x - 1
const calc3 = x => x * 3

const sum = calc3(calc2(calc1(10)))
```

如果使用pipe函数后，会使得代码可读性变强，如下所示：

```js
const calc = pipe(calc1, calc2, calc3)
const sum = calc(10)
```

可以使用reduce实现pipe函数，殊途同归。

```js
const pipe = (...functions) => initialVal => functions.reduce((memo,cur) => {
  return cur(memo)
},initialVal)

```

### compose 

TODO: redux 原理
compose和pipe非常的像, pipe是从左到右执行顺序, compose是从右向左的执行顺序, 所以在实现上用了reduceRight这个方法.

```js
const compose = (...functions) => (initialValue) =>
  functions.reduceRight((value, fn) => fn(value), initialValue);
```

### 去假值

```js
const falseyArray = [0, null, 1, undefined, 2, '', 3, false, 4, NaN]

const compact = (arr) => arr.filter(el => el); // 会转化成boolean，如果为false就会默认筛掉

compact(falseyArray) // [1, 2, 3, 4]

// 利用reduce实现
const compact = (arr) => arr.reduce((memo,cur) => {
  // cur会被转化为布尔值，如果为真则会加入到原始值中，最后返回memo
  cur && memo.push(cur);
  return memo;
},[])
```

### 简化条件

```js
const value = 'cat'
if (value === 'cat' || value === 'dog' || value === 'pig'){
    // statement
}

// 可以该写为
if(['cat', 'dog', 'pig'].includes(value)){
    // statement
}
```


### deduplicate

```js

const deduplicate = (items) => {
  const cache = {};
  return items.redcue((memo,cur) => {
    const isIncluded = cache[cur] === true;
    // 如果已经存在，那么不会再加入进去。
    if(!isIncluded) {
      cache[cur] = true;
      memo.push(item);
    }
    return memo
  },[])
}

deduplicate([[1], [1], { hello: 'world' }, { hello: 'world' }]);
```

### flatten

正则 + split

傻递归

```js

let result = [];
function flatten(arr) {
  for(let i = 0; i < arr.length;i ++) {
    let item = arr[item];
    if(Array.isArray(item)){
      flatten(item)
    }else {
      res.push(item);
    }
  }  
}

```

reduce实现

```js

flatten([[1, 2], [3, 4]]);  // [1, 2, 3, 4]

const flatten = (arr) => arr.reduce((memo,cur) => {
  return memo.concat(Array.isArray(cur) ? flatten(cur) : cur)
},[])
```

### 实现 includes

includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

> arr.includes(valueToFind[, fromIndex]) 
> fromIndex 的算法：如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

#### 通过reduce实现

（**不带fromIndex功能**）利用“||” 逻辑判断，最终只要有一个为真，则会返回真，如果全假则返回false。

```js
// item: 搜寻元素，arrlist：原数组
const includes = (item,arrlist) => arrlist.reduce((memo,cur) => {
  return memo || cur === item
},false)
```

#### 实现fromIndex功能

```js
Object.defineProperty(Array.prototype,'includes',{
  value: function (valueToFind,fromIndex = 0) {
    let len = this.length;
    // 对 fromIndex 做负值兼容
    let k = fromIndex >= 0 ? fromIndex : len - Math.abs(fromIndex)
    function sameVal (v1,v2) {
      // 对NaN进行兼容处理
      return v1 === v2 || (typeof v1 === 'number' && typeof v2 === 'number' && isNaN(v1) && isNaN(v2))
    }
    while(k < len) {
      if(sameVal(arr[k],valueToFind)) {
        return true;
      }
      k++
    }
    return fasle;
  }
})
```

### 实现reverse
