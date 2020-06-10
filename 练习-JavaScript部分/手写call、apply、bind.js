
function myCall(context = window) {
  //  挂载到对象上
  context.fn = this;
  // 收集参数
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    // 能够通过作用域链访问到变量
    args.push(`arguments(${i})`);
  }
  var result = eval(`context.fn(${args})`)
  // 执行该函数
  delete context.fn;
}

function myApply(context, arr) {
  var context = Object(context) || window;
  context.fn = this;
  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push(`arguments(${i})`)
    }
    result = eval(`context.fn(${args})`)
  }
  delete context.fn;
  return result;
}

// 返回一个函数,修改this
function myBind(context) {
  var fn = this;
  return function () {
    fn.apply(context)
  }
}
//处理 内外层参数
function myBind(context) {
  var fn = this;
  var args = Array.prototype.shift.call(arguments);
  return function () {
    // 不就是为了拷贝一份arguments么？用别的api不行吗？
    var bindArgs = Array.prototype.slice.call(arguments)
    fn.apply(context, args.concat(bindArgs))
  }
}
// 处理如果绑定后的函数被当做构造函数调用
// 特点1： this 指向实例自己 特点2： 能够继承绑定函数中原型的方法，例如：
/**
 * function bar () {}
 * bar.prototype.name = 'test'
 * var bindFoo = bar.bind()
 * var obj = new bindFoo()
 * obj.name  === 'test'
 */

function myBind(context) {
  var fn = this;
  var args = [].shift.call(context)
  function F() { }
  var fBound = function () {
    var bindArgs = [].slice.call(arguments);
    var flag = this instanceof fBound;
    fn.apply(flag ? this : context, args.concat(bindArgs))
  }
  F.prototype = this.prototype;
  fBound.prototype = new F();
  return fBound();
}
