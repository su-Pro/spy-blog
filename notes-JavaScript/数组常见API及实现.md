## 常见数组API使用

### 创建

#### Array() === new Array()

#### ES6 Array.of()

#### ES6 Arrary.from()

### 改变原数组

#### push
#### pop
#### shift
#### unshift
#### splice
#### sort
#### reverse
#### Array.prototype.fill()

### 数组查找

#### indexOf
#### lastIndexOf
#### includes

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

#### unix pipe

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

#### compose 

TODO: redux 原理
compose和pipe非常的像, pipe是从左到右执行顺序, compose是从右向左的执行顺序, 所以在实现上用了reduceRight这个方法.

```js
const compose = (...functions) => (initialValue) =>
  functions.reduceRight((value, fn) => fn(value), initialValue);
```

#### 去假值

```js
const falseyArray = [0, null, 1, undefined, 2, '', 3, false, 4, NaN]

const compact = (arr) => arr.filter(el => el); // 会转化成boolean，如果为false就会默认筛掉

compact(falseyArray) // [1, 2, 3, 4]

// 利用reduce
const compact = (arr) => arr.reduce((memo,cur) => {
  // cur会被转化为布尔值，如果为真则会加入到原始值中，最后返回memo
  cur && memo.push(cur);
  return memo;
},[])
```


#### 简化条件

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



#### deduplicate

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

#### flatten

正则 + split

傻递归

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
  return memo || cur === memo
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
