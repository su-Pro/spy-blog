### 语法糖

#### class

ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

#### constructor

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

```javascript
class Person {
  constructor(name) {
      this.name = name;
  }
}
```

**Babel：ES5**

```javascript

"use strict";
// 检查如何调用
function _classCallCheck(instance, Constructor) {
  // 直接调用 this 指向window
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Person = function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
};
```

- class运行在严格模式下
- 只能通过new关键字调用
- constructer等同ES5：构造函数体内部代码

#### 原型方法，静态方法，get set属性

> 通过class 添加的原型方法/静态方法 默认不可枚举（ES5添加的方法可以枚举）

```javascript
class Person {
  constructor(name) {
      this.name = name;
  }
  sayHello() {
      return 'hello, I am ' + this.name;
  }
  static onlySayHello() {
      return 'hello'
  }
  get name() {
      return 'kevin';
  }
  set name(newName) {
      console.log('new name 为：' + newName)
  }
}
```

**Babel：ES5**

```javascript
'use strict';
var _createClass = function() {
  /**
 * _createClass私有化的函数
 * 
 *  提供两个功能：
 *  1. 向原型上注入属性
 *  2. 注入静态方法
 * 
 *  思路：
 *  循环拿到每个通过AST编译后的descriptors
 *  在这里需要区分存取器和属性访问器，因为他们有不同的字段：writable
 *  编译后的descriptors如下所示：
 * 
  sayHello() {
      return 'hello, I am ' + this.name;
  }
  =>>>>
  {
      key: 'sayHello',
      value: function sayHello() {
          return 'hello, I am ' + this.name;
      }
  }
 */ 
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          // 取出一个需要注入的方法
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            // 区分存取器、属性访问器
            if ("value" in descriptor) descriptor.writable = true;
            // 注入方法
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    /**
     * _createClass向外暴露的入口函数
     * 
     * 需要注意参数顺序：添加到哪里、添加的属性（方法）、添加的静态属性
     * 
     * 核心是调用劫持后的defineProperties方法
     * 
    */
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * 函数劫持，对构造函数Person进行属性、方法注入
 * 
 * 1. 在构造函数内部进行调用检查
 * 2. 通过_createClass注入属性和方法
 * 
 */
var Person = function() {
    function Person(name) {
        _classCallCheck(this, Person);
        this.name = name;
    }
    
    _createClass(Person, [
    {
        key: 'sayHello',
        value: function sayHello() {
            return 'hello, I am ' + this.name;
        }
    },
    {
        key: 'name',
        get: function get() {
            return 'kevin';
        },
        set: function set(newName) {
            console.log('new name 为：' + newName);
        }
    }],
    // 静态方法
    [{
        key: 'onlySayHello',
        value: function onlySayHello() {
            return 'hello';
        }
    }]);
    return Person;
}();
```

### class 

#### 不存在变量提升

类不存在变量提升（hoist），这一点与 ES5 完全不同。

```js
new Foo(); // ReferenceError
class Foo {}
```

```js
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
```

如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。

#### 如何私有化方法

#### 私有化属性：# 

```js
class IncreasingCounter {
  #count = 0;
}
```

精简后：
```js
var Test = function Test() {
  _classCallCheck(this, Test);

  _count.set(this, {
    writable: true,
    value: 0
  });
};

var _count = new WeakMap();
```

- [ ] 和 WeakMap 有什么关系？

#### this指向问题

#### 静态方法和属性

箭头函数

bind函数

Symbol

#### new.target 强制继承

ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。

可以用于生成只能被继承的类：

```js
class Father {
  constructor(length, width) {
    console.log(new.target === Father);
    // ...
  }
}
```
