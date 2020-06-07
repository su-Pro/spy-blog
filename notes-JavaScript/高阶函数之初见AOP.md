## 高阶函数之初见 AOP

### 高阶函数的定义

满足如下条件即可称之为高阶函数：

1. 函数的参数是一个函数 (回调函数就是一种高阶函数)
2. 函数返回一个函数 当前这个函数也是一个高阶函数

### 初见 AOP

假设现在我们有一个业务逻辑，里面的代码逻辑非常复杂，现在急需让你在执行该业务逻辑前先做点什么，那么我们可以通过如下的方式实现：

业务逻辑函数:

```js
function say(a, b) {
  //...
  console.log("say", a, b);
}
```

```js
Function.prototype.before = function (cb) {
  return function (...args) {
    cb();
    this(...args);
  };
};
let beforeSay = say.before(function () {
  // 这里是你想提前做的事情
  console.log("say before");
});
beforeSay("这里的参数会传递到主业务逻辑中，穿透你自己写的函数");
```
