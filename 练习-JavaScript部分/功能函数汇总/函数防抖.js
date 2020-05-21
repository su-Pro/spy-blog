function debounce (fn,wait,options) {
  let timer = null,context,callNow;
  var _debounce = function (...args) {
    context = this;
    if(options.immediate) {
      // 首次进入时，timer 为false
      callNow = !timer;
      callNow && fn.apply(context,args);
    }
    // 只保留最后一次定时器
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(context,args);
      timer = null;
    },wait)
  }
  return _debounce;
}
// 首次点击有效果，然后开始防抖；

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

// 合并先跳过；