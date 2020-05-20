## 为什么需要防抖节流

有些事件的触发是非常频繁的，例如：onscroll oninput onkeyup ，往往有用的都是最终的结果，对于事件触发的`进行时`我们是不需要的。

频繁的事件处理可能会导致浏览器渲染流水线从重排开始。(在进行时中，向页面插入的元素通常并不是最终结果)因此我们使用防抖、节流这种手段，降低事件触发频率。

从注册的回调函数角度来讲，如果频繁触发事件的回调函数，很有可能上一个回调函数更新的视图还没有完成，下一个回调函数就已经执行（大量操作DOM）很容易出现页面的卡顿。


### 函数节流
> 保证一段时间内，核心逻辑只执行一次

```js
function throttle (cb,wait) {
  let context,args,prevTimeSpan = 0;
  let throttled = function () {
    context = this;
    args = arguments;
    let curTimeSpan = + new Date();
    let tDiff = wait - (curTimeSpan - prevTimeSpan);
    // 除满足循环条件外，其他执行都被节流掉
    if(tDiff <= 0) {
    cb.apply(context,args)
    // 移动时间
    prevTimeSpan = curTimeSpan;
    }
  }
  return throttled;
}
```

lodash库中的节流函数存在一个options参数，他能够设置trailing参数,标识在节流操作后
> 点..点..点..点  节流执行 节流执行 trailing执行

```js
    function throttle (fn,wait,options) {
      let content,timer,prevTimeSpan = 0,args;
      var latter = function () {
          prevTimeSpan = + new Date();
          fn.apply(content,args);
      }
      let throttled = function () {
        let curTimeSpan = + new Date();
        let diff = wait - (curTimeSpan - prevTimeSpan);
        content = this;
        args = arguments;
        if(timer) {
          clearTimeout(timer);
          timer = null;
        }
        if(diff <= 0) {
          fn.apply();
          prevTimeSpan = curTimeSpan;
        }else if(!timer && options.trailing !== false) {
          timer = setTimeout(latter,diff);
        }
      }
      return throttled;
    }
```

### 函数防抖
在事件频繁触发过程中，只以最后一次触发的事件为基准进行事件回调处理
> 电梯的例子
```js
// 核心原理是让真正的回调函数延迟执行
function debounce (cb,wait) {
  let context,args;
  let _debounce = function () {
    context = this;
    args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      cb.apply(context,args);
    },wait);
  }
  return _debounce
}
```

需求：第一次点击先执行，而后进行防抖处理(immediate)；
```js
function debounce(cb,wait,options) {
  let context,args,callNow,timer = false;
  let _ = function () {
    context = this;
    args = arguments;
    if(options.immediate) {
      // 如何确定callNow只在第一次执行？ 
      // 利用timer取反，首次加载timer 一定为false
      callNow = !timer;
      if(callNow) cb.apply(context,args)
    }
  if(timer) clearTimeout(timer);
  timer = setTimeout(function () {
    cb.apply(context,args); 
    timer = null;
  },wait);
  }
  return _;
}
```

## 图片懒加载

核心点：
- 临界算法（当视口高度 - 图片距离(0,0)上边距的高度 >= 0）
- 获取图片高度的api

```js
var imgs = doucment.getElementsByTagName('img');
var viewHeight = window.innerHeight || window.doucmentElement.clientHeight;
// 加载一张图片后++
var num = 0;
function lazyLoad () {
  // 避免重头计算产生bug
  for(let i = num;i < imgs.length;i++,num++){
    var heightDiff = viewHeight - imgs[i].getBoundingClientRect().top;
    if(heightDiff >= 0) {
      // 设置图片的src 属性让其显示，假设我们之前设置存在data-src标签属性中。
      imgs[i].src = imgs[i].getAttribute('data-src');
    }
  }
}
// 向window 注册的方法 和 只在冒泡阶段处理
window.addEventListener('scroll',lazyLoad,false);
```