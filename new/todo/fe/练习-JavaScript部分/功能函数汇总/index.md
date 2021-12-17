### 函数节流

```js
function throttle (fn,wait,options) {
  var prevTimeSpan = 0,curTimeSpan,tDiff,context;
  // 最后一次执行
  var _trailing = function () {
    fn.apply(context,args);
    curTimeSpan = + new Date();
    prevTimeSpan = curTimeSpan;
    timer = null;
  }
  var throttled = function (...args) {
    context = this;
    curTimeSpan = + new Date();
    tDiff = wait - (curTimeSpan - prevTimeSpan);
    if(timer) {
      // 有定时器了但是事件又触发了说明不是最后一次，需要清除定时器
      clearTimeout(timer);
      timer = null;
    }
    if(tDiff <= 0) {
      fn.apply(context,args);
      // !timer 是为了避免频繁注册
    }else if(options.trailing !== false && !timer) {
      timer = setTimeout(_trailing,tDiff);
    }
  }
  return throttled;
}
// 5-21 (2)
```

### 函数防抖

```js
function _debounce (fn,wait,options) {
  var timer = null,context,callNow;
  var _ = function (...args) {
    context = this;
    // 如果首次进入就需要执行，使用timer进行辅助判断
    if(options.immediate) {
      callNow = !timer;
      callNow && fn.apply(context,args);
    }
    // 如果存在timer 就清空，以最后一次为主
    if(timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(context,args);
      timer = null;
    },wait)
  }
  return _;
}
// 5-21 (2)
```

### 深度比较

```js
/**
 * 采用递归比较
 */
function isObject(object) {
  return typeof object === 'object' && object !== null;
}
function isEqual(obj1,obj2) {
  if(!isObject(obj1) || !isObject(obj2)){
    return obj1 === obj2
  }
  if(obj1 === obj2) {
    return true;
  }
  // 首先判断数据长度是否相等
  let l1 = Object.keys(obj1);
  let l2 = Object.keys(obj2);
  if(l1 !== l2)  return false 
  // 递归比较,以obj1 为基准
  for (let key in obj1) {
    const res = isObject(obj1[key],obj2[key])
    if(!res) return false
  }
  // 判断完毕，且没有return时，认为相等
  return true;
}
```

### flat数组拍平
```js
var arr1 = [1, 2, [3, 4]]
var arr2 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];
const arr_ = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]
/**
 * 1. 只能处理一层arr
 * @param {}} arr 
 */
function flat(arr) {
  return arr.reduce((prev, cur) => prev.concat(cur), []);
}
/**
 * 2. 对数据进行拉平操作，默认只拉平一层，如果需要全部拉平，需要传递指定的层数.
 * @param {*} arr 
 * @param {*} deep 
 */
function d_flat(arr,deep = 1){
  let _helper = (arr,deep) => arr.reduce((prev,cur) => prev.concat(Array.isArray(cur) ? d_flat(cur,deep - 1) : cur),[])  
  // 如果还有层数没有处理，那么需要继续递归处理，但如果处理完毕，需要浅拷贝一层返回给上一层进行拼接
  return deep > 0 ? _helper(arr,deep) : arr.slice()
}
/**
 * 3. 注意需要用...进行展开，因为得到的是一个遍历器对象
 * @param {*} arr 
 * @param {*} deep 
 * 需要注意yield* 可以将控制权移交给另外一个生成器当他完成后返回回来继续干，
 * 和递归好像啊...
 */
function * gen_flat(arr,deep = 1) {
  // 不要使用for in 遍历数组，那都是索引...
  for(let item of arr) {
    if(Array.isArray(item) && !!deep ) {
      yield* flat(item,deep - 1)
    }else {
      yield item;
    }
  }
}
```

### Object.assign 和 深拷贝

