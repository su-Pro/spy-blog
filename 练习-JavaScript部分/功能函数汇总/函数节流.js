/**
 * 时间戳思路
 * @param {Function} fn 需要节流的函数
 * @param {Number} wait - (ms) 节流的时间间隔
 */
function throttle (fn,wait) {
  let prevTime = 0,
      context = null;
  return function (...args) {
    let curTime = +new Date();
    if(curTime - prevTime > wait) {
      fn.apply(context,args)
      prevTime = curTime;
    }
  }
}

/**
 * 定时器版本
 * @param {*} fn 
 * @param {*} wait 
 */
function throttle (fn,wait) {
  let timer = null,
      context = null;
  return function (...args) {
    context = this;
    if(!timer) {
      timer = setTimeout(function () {
        fn.apply(context,args)
        timer = null;
      },wait) 
    }
  }
} 







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
