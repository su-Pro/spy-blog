//  constructor
```javascript
class Person {
  constructor(name) {
      this.name = name;
  }
}
```


// ----------------------------------Babel 
```javascript
"use strict";

function _classCallCheck(instance, Constructor) {
  // 直接调用 instance 指向window
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
};
```
1. 严格模式下运行该语法
2. 只能通过new关键字调用
3. 等同ES5：构造函数体内部代码

```javascript
// 静态属性
class Person {
  // 实例对象属性
  foo = 'foo';
  // 静态属性
  static bar = 'bar';

  constructor(name) {
      this.name = name;
  }
}
```
// ----------------------------------Babel 
```javascript
'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function Person(name) {
    _classCallCheck(this, Person);

    this.foo = 'foo';

    this.name = name;
};

Person.bar = 'bar';
```
1. 直接通过this赋值的变量是一个语法糖，和constructor中的this写法并无差异
2. 静态方法会编译成构造函数的属性
```javascript
// 原型方法 + 静态方法 + get set方法
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
// ----------------------------------Babel 
```javascript
'use strict';
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          // 取出一个需要注入的方法
            var descriptor = props[i];
            // 默认不可以枚举
            descriptor.enumerable = descriptor.enumerable || false;
            // 默认可以配置
            descriptor.configurable = true;
            // 如果是属性访问器，则设置writable属性
            if ("value" in descriptor) descriptor.writable = true;
            // 注入方法
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
      // 向Constructor的原型上 添加方法
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
      // 向Constructor 自身上 添加方法
        if (staticProps) defineProperties(Constructor, staticProps);
      // 返回Constructor本身
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * 重写该方法，返回Constructor本身，但向他的原型和Constructor注入方法
 */
var Person = function() {
    function Person(name) {
        _classCallCheck(this, Person);
        this.name = name;
    }
    // 向Constructor原型和Constructor分别注入方法
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
1. 通过class 添加的原型方法/静态方法 默认不可枚举
2. class语法通过内部的`_createClass`对`Object.defineProperties()`进行封装，实现对原型方法和静态方法的注入。
  - 编译代码时，将原型方法和静态方法做成键值对形式，key 保存为方法名， value 保存为函数。
  - 对于setter 和getter，通过判断是否存在value属性，如果不存在，则设置对应的get 方法 和 set 方法。
  - 将没有static标识符的函数放置一个数组，并作为第二参数传递进`_createClass`方法，将设有static标识符的函数放置一个数组，作为第三个参数进行传递



