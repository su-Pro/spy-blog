## 继承

### 什么是面向对象？JavaScript是面向对象语言吗

面向对象语言都有一个标志就是类的概念，通过类可以**创建多个对象具有相同方法和属性**。JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数。因此他的继承和面向对象语言不太一样，是基于原型对象的一种继承方案。

### 原型链继承

利用原型让一个引用类型"继承"另外一个引用类型的方法和属性，通过让待继承的引用类型的原型对象指向另一个类型的实例。

存在的问题：

- 引用值共享问题
- 创建子类时，无法向其超类进行参数传递
- 不能用对象字面量语法向原型中添加属性（改变原型指针，会切断原型链）

```javascript
function Parent() {
  this.name = ['1','2']
}
function Son () {}
Son.prototype = new Parent();
var son1 = new Son();// 无法向父类传递参数
var son2 = new Son()
son1.name.push('3')
//son2.name 也会跟着改变
```

### 借用构造函数继承

**子类的构造函数内部调用父类的构造函数，能够解决传递参数的问题。**

缺点：

- 不存在原型这层关系后，导致函数无法复用
- 无法关联超类

```javascript
function Parent() {
  this.name = [‘foo’,’bar’];
  this.funcLog = function () {
    console.log(‘能够使用’);
  }
}
//想要继承自Father,通过借用构造函数形式，将this绑定
function Child(...args) {
  Father.apply(this,args)
}
```

### 组合继承

使用原型式继承实现对原型中属性和方法的继承，使用构造函数实现对实例属性的继承。

将原型链继承和借用构造函数融为一体，能够实现向父类传递参数并且避免了引用值的问题，是最常用的一种继承方案。

缺点：

- 由于重写了Child的 prototype，需要手动将constructor归位

```javascript
function Parent(name) {
  this.name = [‘foo’,’bar’];
}
Parent.prototype.func = function () {
  console.log(‘继承方法成功’);
}
function Child(…args) {
  Parent.call(this,args)
}
Child.prototype = new Parent();
// 由于原型对象被重写，需要将constructor指针归位
Child.prototype.constructor = Child;

```

### 原型式继承

借助原型式继承可以对已有的对象创建一个新对象（从而关联两个对象），这种实现继承的方法优点在于**不需要创建构造函数**。

前提是你必须有一个对象作为另外一个对象的继承基础，ES5对该模式封装为：`Object.create(对象,属性描述符)`

问题：

- 引用值的共享

```javascript
var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}
function myCreate (o) {
  // 中转函数
  function F () {}
  F.prototype = o;
  return new F();
}
```

### 圣杯继承

最完美的一种继承方案，需要注意的是重写原型后，需要将constructor 进行归位操作。

优点

- 保持原型链不变
- 避免引用值问题
- 正常使用 `instanceof` & `isPrototypeOf`

instanceof vs isPrototypeof

> isPrototypeOf() 与 instanceof 运算符不同。在表达式 "object instanceof AFunction"中，object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。

```javascript
function _extend (sub,super) {
  var _prototype = _create(super.prototype);
  // 归位
  _prototype.constructor = sub;
  sub.prototype = _prototype;

  function _create(super) {
    function F () {}
    F.prototype = super;
    return new F ()
  }
}
```
