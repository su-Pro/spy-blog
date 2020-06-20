
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

// bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

function bind(context, ...args) {
  let fn = this;
  return function () {
    let bindArgs = Array.from(arguments);
    return fn.apply(context, args.concat(bindArgs))
  }
}


// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。


// 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效


function bind(context, ...args) {
  let fn = this;
  let fBound = function () {
    let bindArgs = Array.from(arguments);
    // 判断当前的this指向
    return fn.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
  }
  fBound.prototype = fn.prototype;
  return fBound;
}

// 直接将 fBound.prototype = this.prototype，当修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。




function bind(context, ...args) {
  let fn = this;
  function F() { }
  let fBind = function () {
    let bindArgs = Array.from(arguments);
    // 当做构造函数被调用
    return fn.apply((this instanceof fBind) ? this : context, args.concat(bindArgs))
  }
  F.prototype = fn.prototype;
  fBind.prototype = new F();
  return fBind
}