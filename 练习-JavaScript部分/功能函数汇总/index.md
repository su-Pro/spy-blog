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