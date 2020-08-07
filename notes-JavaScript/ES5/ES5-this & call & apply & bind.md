## this

执行上下文中包含了变量环境、词法环境、外部环境，但其实还有一个 this 没有提及，具体你可以参考下图：

![20200806114418]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200806114418.png)

### 本质

由于函数可以在**不同的运行环境执行（一等公民）**，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境

### 能够改变this指向的场景

1. 通过new 关键字调用改变constructer里面的this （构造函数的也一样），指向实例对象
2. 通过call,apply,bind函数进行调用，参数是谁指向谁
3. 对象调用方法，this指向调用的对象
4. 全局作用域下指向window
5. 箭头函数的this由他的外层this决定，本身不存在this
6. 回调函数（对象中方法直接执行，定时器，等等），如果没有强制措施指向window

[JavaScript 的 this 原理 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2018/06/javascript-this.html)

## call、apply、bind

### 区别

三者共同点：

- 改变函数this指向

不同点：

- call & apply 会将函数立即执行，bind 需要手动执行
- call one by one的接受参数， apply 接受的是一个数组作为参数
- bind 返回的函数可以作为构造函数使用

### call、apply

在实现call 和 apply时，需要注意通过向context挂载方法的方式改变其this指向，在执行完毕前需要销毁。

call/apply:

```js

function _call(context = window,...args) {  
  let fn = this;
  context.fn = fn;
  let res = context.fn(args)
  delete context.fn;
  return res;
}

function _apply(context = window,args) {  
  let fn = this;
  context.fn = fn;
  if(!args) {
    context.fn()
  }else {
    context.fn(args)
  }
  delete context.fn;
  return res;
}
```

### bind

在实现bind时候注意三个过程：

* 完成基本功能，改变this并返回新的函数待执行
* 处理两次参数合并
* 当返回的函数被new调用时，实例能够访问调用bind的函数的**原型对象** 同时 this 指向当前**实例对象**

bind:

```js
/**
 *
 * @param {*} context
 * @returns {func} bindedFunc
 */
function bind(context,...args) {
  let oirignfn = this;
  let bindFunc = (...bindArgs) => {
    context = this instanceof bindFunc ? this : context;
    oirignfn.apply(context,args.concat(bindArgs))
  }
  function F () {}
  F.prototype = fn.prototype
  bindFunc.prototype = new F();
  return bindFunc
}
```
