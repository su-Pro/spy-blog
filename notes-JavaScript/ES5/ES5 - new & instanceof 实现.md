
## new

new操作符的三个过程：

1. 创建一个继承自该构造函数关联的原型的实例对象
2. 将构造函数的作用域赋给新对象并执行构造函数（修改this）
3. 如果构造函数返回值位对象，返回这个对象，否则返回新对象。

```javascript
function myNew (constructor,…args) {
    let to = {};
    to.__proto__ = constructor.prototype; // 修改原型
    /*
    * let F = function () {}
    * F.prototype = constructor.prototype;
    * to = new F() // 用到了new… 但是性能比__proto__好
    * */
    let result = constructor.apply(to,args); // 尝试执行，并拿到结果
    return (typeof result === 'object') ? result : to;
}
```

谈到原型链时，不得不提instanceof 操作符，该操作符用于判断对象是否在指定的原型链上，如果存在即返回true。

## instanceof 原理实现

- 判断实例对象是否存在目标构造函数的原型中
- 移动_proto_指针
- 如果不存在，则最终会遍历完整个原型链（到Null）。
- 注意类型保护

``` javascript
/*
 @params {Object} child 对象（ES5中）
 @params {Function} parent 构造函数
 - 用于匹配 child 原型链是否存在 与 parent 构造函数 关联的原型对象
*/
function _instanceof (child,parent) {
  // es5
  if(typeof child !== 'object' || child !== null) {
    throw Error('')
  }
  // es6 能够接受原始值的，经过一个包装，类型保护
  child = new Object(child);
  // 防止下面获取parent.xxx出错,做一个类型保护
  if(parent === null) {
    return false;
  }
  let prevPrototype = Object.getPrototypeOf(child)
  let originPrototype = parent.prototype
  while(true) {
    if(prevPrototype === null) return false
    if(prevPrototype === originPrototype) return true
    prevPfrototype = Object.getPrototypeOf(prevPfrototype)
  }  
}
```
