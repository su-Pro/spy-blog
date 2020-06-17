## ES5 - 你说一下你对原型的认识

在解释什么是原型时，我目前的思路是首先讲清楚 构造函数 - 原型对象 - 实例对象 三者之间的关系，也就是大体画出如下关系图：

![20200617215313]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200617215313.png)

紧接着使用手画的图例说一下如下几个关键概念的含义：

### prototype、constructor、[[prototype]]、\__proto__\

prototype：每创建的一个函数都有一个prototype属性，该属性是一个指针，指向该函数的原型对象

constructor：默认情况下，所有的原型对象都会获得一个指向构造函数的 **不可枚举的属性**。

[[prototype]]: ES5标准中，指向原型的指针称之为[[prototype]]

\__proto__\: 在ES5中，没有提供直接访问原型的方法，因此每个浏览器厂商都提供一个访问原型的方法:\__proto\__

> 注意：这个链接是在实例对象和原型之间，而不是 实例对象和构造函数之间。

最后说一下 在原型模型中，通过原型链查找变量时的细节点：

### 细节

**遮蔽效果**：
实例对象可以访问原型的属性/方法，但不能通过实例对象重写原型的方法。如果在实例对象上重写原型属性/方法会发生**遮蔽效果**，除非直接调用xxx.prototype.xxx直接重写，这样是可以的。

**重写原型**：
当原型对象被重写时，他的constructer属性也随之被修改，指向Object的同时该属性描述符中的`[[Enumerable]]`特性会被设置成true（因此可以被枚举出来）

![20200617213135]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200617213135.png)

### new

new操作符的四个过程：

1. 创建一个继承自该构造函数原型的实例对象
2. 将构造函数的作用域赋给新对象并执行（修改this）
3. 如果构造函数返回值位对象，返回这个对象，否则返回新对象

```javascript
function myNew (constructor,…args) {
    let to = {};
    to.__proto__ = constructor.prototype; 
    // 也可以使用Object.setPrototypeof()
    // eg: Object.setPrototypeof(to,constructor.prototype)
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    let result = constructor.apply(to,args); 
    return (typeof result === “object”) ? result : to;
}
```

谈到原型链时，不得不提instanceof 操作符，该操作符用于判断对象是否在指定的原型链上，如果存在即返回true。

### instanceof 原理实现

- 判断实例对象是否存在目标构造函数的原型中
- 移动_proto_指针
- 如果不存在，则最终会遍历完整个原型链（到Null）。

``` javascript
let _instanceof = (child,parent) => {
  if(parent === null) return false;
  let parentPrototype = parent.prototype;
  // 待移动的原型指针
  let childProto = Object.getProptypeOf(child)
  while(true){
    if(childProto === null){// 查找完毕整个原型链
      return false;
    }
    // 找到原型对象
    if(childProto === parentPrototype) {
      return true
    }
   // step by step 
    childProto = Object.getProptypeOf(childProto)
  }
}
```

### 遍历原型链的性能问题

在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。另外，试图访问不存在的属性时会遍历整个原型链。

遍历对象的属性时，原型链上的**每个**可枚举属性都会被枚举出来。要检查对象是否具有自己定义的属性，需要配合`Object.hasOwnProperty`方法。

> hasOwnProperty  是 JavaScript 中唯一一个处理属性并且**不会**遍历原型链的方法。

最后如果有机会，延展一下能过拓展原型链的方法有哪些，以及之间的区别以及性能问题

### 拓展原型链的方法

**new**
* 优点：标准方法，兼容性好
* 缺点：构造函数式初始化可能会给对象带来不必要的方法和属性

**Object.create** （IE9+）
* 优点： 一次性设置 \__proto\__ 属性，以便浏览器能够优化对象
* 缺点： 第二个参数可能会成为一个性能黑洞（属性描述符）

**setPrototypeOf**:（IE9+）
- 允许动态操作对象的原型，甚至能强制给通过 Object.create(null) 创建出来的没有原型的对象添加一个原型。
-  但是该方法的性能不好，因为浏览器无法对动态设置的原型进行性能优化

> 动态设置原型干扰了所有的优化，甚至可能使浏览器为了运行成功，使用完全未经优化的代码进行重编译

\__proto\__ ：
- 各个浏览器封装的方法，兼容性极佳，但并不是标准行为。
- 应该完全将其抛弃因为这个行为完全不具备性能可言，和setPrototypeOf类似的性能问题

### Object.create原理

创建一个对象，该对象的_proto_指针指向指定的原型，同时可以通过第二个参数设置属性描述符/存储描述符

pollfill
```javascript
if (typeof Object.create !== "function") {
  Object.create = function (proto) {
    if ( typeof proto !== "object" &&  typeof proto !== "function") {
      throw new Error('error')
    }
    function F () {}
    F.prototype = proto;
    return new F();
  }
}
```