## 数据类型

### 原始值和引用值

#### 区别

在**表现上**有如下几点区别：

1. **复制**

- 原始值复制后处在**不同栈帧**中，**变量互不影响**。
- 引用值复制的是**栈中存储的地址**，会指向堆内存中同一个对象，容易造成影响（一发而动全身）

2. **比较**

- 对于原始类型，比较的是栈帧中的值
- 对于引用类型，比较栈中存储的（地址）指针

3. **值传递**

- 原始类型作为函数参数传递时，这个参数副本就是值本身;
- 引用类型作为参数传递时，这个参数副本是指向堆内存的（地址）指针

请默念：**ECMAScript中所有函数的参数都是按值传递的**

**本质上的区别是由于：堆栈模型（原始值保存在栈内存中，引用值保存在堆内存中）**

#### 堆栈模型

**栈内存特点**：

1. 存储的值**大小固定**
2. 空间较**小**
3. 可以**直接操作变量**，运行效率**高**

**堆内存：**

1. 存储的值**大小不定**，**可动态调整**
2. 空间较**大**
3. 无法直接操作，**需借指针读写内部数据**，运行效率**低**

### 值类型

原始值类型：number、boolean、string、null、undefined、symbol、bigint

#### symbol

- ES6新增的一种原始值类型，通过使用`Symbol()`进行创建。

> 不能通过new的方式调用Symbol，它是原始值不是构造函数

- [ ] 一个symbol值能够作为对象属性的标识符（对象的key都能保存什么变量来的？一个字符串一个数字？：详见map）

> 对象设置键时，只能是 字符串，现在多一个Symbol

- 每一个从Symbol返回的symbol值都是唯一的，除了使用Symbol.for注册的变量。
- 遍历对象key的方法，不会把 Symbol 的 key 遍历出来，需要使用专门遍历方法：`getOwnPropertySymbol()`

> Object.getOwnPropertyNames() Object.keys()

- 不能发生类型转换，例如 字符串拼接，数学运算。

**应用场景**：

- 对象的属性名都是字符串，在Mixin 模式下会有命名冲突的问题。因此我们可以使用Symbol 保存key值，使得唯一有效。

- 为了代码可维护性，我们应该消除**魔术字符串**，解除代码中的强耦合，因此可以使用Symbol进行管理

#### 0.1 + 0.2 !== 0.3

64位浮点数，精度丢失，64位浮点数语言通病。

#### typeof null === "object"

早期实现js时，对于null的存储单元最后三位和object一样都是000，因此会将null检测成为object

- [ ] bigint

### 基本包装类

规定了3种特殊引用类型：Boolean Number String 称为基本类型包装类。使得原始值可以像引用类型一样去处理（添加属性）同时具有相应的特殊行为。

第一步: 创建类Object实例。
第二步: 调用实例方法。
第三步: 执行完方法立即销毁这个实例。  = null 置空

### 类型判断 - typeof

#### 用途

typeof 操作符返回一个字符串，表示未经计算的操作数的类型。

```js
typeof operand
typeof(operand)
```

注意 是有**优先级之分**的，例如这个例子：

```js
var iData = 99;

typeof iData + ' Wisen'; // 'number Wisen'
typeof (iData + ' Wisen'); // 'string'
```

常见示例：

```js

// number
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof(42) === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; //！ 因为NaN它是 "Not-A-Number" (非数值) 的缩写
typeof Number(1) === 'number'; //！ Number构造函数 会尝试把参数解析成数值
typeof 42n === 'bigint';

// string
typeof '' === 'string';
typeof 'bla' === 'string';
typeof `template literal` === 'string';
typeof '1' === 'string'; // 注意内容为数字的字符串仍是字符串
typeof (typeof 1) === 'string'; //！ typeof 总是返回一个字符串
typeof String(1) === 'string'; //！ String 将任意值转换为字符串，比 toString 更安全

// boolean
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(1) === 'boolean'; //！ Boolean() 会基于参数是真值还是虚值进行转换
typeof !!(1) === 'boolean'; // 两次调用 ! (逻辑非) 操作符相当于 Boolean()

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined'; // 未声明的变量，或者 发生变量提升的变量（但不存在暂时死区）
typeof undeclaredVariable === 'undefined';

// ！！！
// typeof 总能保证对任何所给的操作数返回一个字符串。即便是没有声明的标识符，typeof 也能返回 'undefined'
// 使用 typeof 永远不会抛出错误
// 但是 在加入了块级作用域的 let 和 const 之后，在其被声明之前对块中的 let 和 const 变量使用 typeof 会抛出一个 ReferenceError。
// 其根本原因是暂时性死区的存在

typeof undeclaredVariable === 'undefined'; // 不存在的

typeof newLetVariable; // ReferenceError
typeof newConstVariable; // ReferenceError
typeof newClass; // ReferenceError

let newLetVariable;
const newConstVariable = 'hello';
class newClass{};

// 对象
typeof {a: 1} === 'object';
// ！！！
// 使用 Array.isArray 或者 Object.prototype.toString.call
// 区分数组和普通对象
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';
typeof /regex/ === 'object';

// ！！！
// 下面的例子令人迷惑，非常危险
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String('abc') === 'object';

// 函数
typeof function() {} === 'function';
typeof class C {} === 'function'
typeof Math.sin === 'function';
```

#### new 操作符

涉及到装箱操作：

```js
// 除 Function 外的所有构造函数的类型都是 'object'
var str = new String('String');
var num = new Number(100);

typeof str; // 返回 'object'
typeof num; // 返回 'object'

var func = new Function();

typeof func; // 返回 'function'
```

### 其他类型判断

#### instanceof

**可以判断当前实例的原型链上是否有 目标构造函数的 prototype 对象**

内部机制是通过**原型链进行判断**，可以判断引用值类型，无法对**原始值**进行判断。

手写：

```js
auto instanceof Car// case

let instanceof = (obj,constructor) => {
  if(constructor === null)  return false;
  // 获取当前对象的原型对象
  let curPrototype = Object.getPrototypeOf(obj);  
  while(true) {
  // - 当obj 原型对象 === null 返回 false
  if(!curPrototype) return null;
  // - 当obj 原型对象 === const 原型对象时，返回 true
  if(curPrototype === constructor.prototype) return true;
  // 移动obj的原型对象
  curPrototype = Object.getPrototypeOf(curPrototype);
  }  
}
```

**!!!细节：Object.getPrototypeOf(Object)  不是  Object.prototype**

```js
JavaScript中的 Object 是构造函数（创建对象的包装器）。
一般用法是：
var obj = new Object();

所以：
Object.getPrototypeOf( Object );               // ƒ () { [native code] }
Object.getPrototypeOf( Function );             // ƒ () { [native code] }

Object.getPrototypeOf( Object ) === Function.prototype;        // true

Object.getPrototypeOf( Object )是把Object这一构造函数看作对象，
返回的当然是函数对象的原型，也就是 Function.prototype。

正确的方法是，Object.prototype是构造出来的对象的原型。
var obj = new Object();
Object.prototype === Object.getPrototypeOf( obj );              // true

Object.prototype === Object.getPrototypeOf( {} );               // true
```

**!!!细节：在 ES5 中，如果参数不是一个对象类型，将抛出一个TypeError异常。在 ES2015 中，参数会被强制转换为一个 Object。**

```js
Object.getPrototypeOf('foo');
// TypeError: "foo" is not an object (ES5 code)
Object.getPrototypeOf('foo');
// String.prototype                  (ES2015 code)
```

#### toString

如果此方法在自定义对象中未被覆盖，toString才会达到预想的效果进行类型判断。

>通常使用Object.toString.call 来保证该方法的纯粹性,即使被覆盖掉也能够获取正确的toString方法

![20200805091504]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200805091504.png)

### 类型转换

因为ECMASciprt是弱语言，所以经常会发生类型转换，类型转换分为两种，**隐式转换**和**强制转换**。

**常见可能性**：

![20200805093100]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200805093100.png)

**整体的判断流程**：

1. 两者类型是否相同，相同的话直接调用 `===`
2. 类型不同，进行类型转换
3. 判断是否是null和undined在进行比较,是的话 -> true
4. 判断两者类型是否为string和number，string会转成number （回到1）
5. 其中一方是否为 `boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断 （回到1）
6. 判断其中一方是否为 `object` 且另一方为`string`、`number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断。（回到1）
7. false

![20200805093124]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200805093124.png)

#### 常见转换

##### boolean

空对象/数组/函数/Symbol 都为真

> 为假的条件：undefined  null false NaN  ''  +-0

##### 四则运算

**+运算符特点：**

- 其中一方为字符串，会把另一方也转换为字符串
- 其中一方不是字符串或者数字，那么会将它转换为数字或者字符串

```javascript
1 + "abc" // "1abc" notice 1
true + true // 2 typeof:number
4 + [1,2,3] // "41,2,3"
```

**+的优先级：**

`"a" + + "b"` 结果为`aNaN`可以理解为`a +（+"b"）`。通常情况下`+ "1"`是用来强制转换。

`*、-、/`运算符就相对简单一些，要其中一方是数字，那么另一方就会被转为数字

```js
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN  [1,2]  Number-> NaN;   [1] Number -> 1
```

##### 对象转原始值(拆箱)

调用内部的 [[ ToPrimitive ]]  该规则总结如下：

0. 如果已经是原始类型了，不需要转换
1. 调用 x.valueOf()，如果转换结果为原始类型，则**返回**.
2. 调用 x.toString()，如果转换为原始类型，则**返回**
3. 没有返回原始值 -> 报错

```javascript
a == 1 && a == 2 && a == 3   如何 ==> true?
答案：
const a = {
   value:[3,2,1],
   valueOf: function () {return this.value.pop(); },
}
```

## 深浅拷贝

### Object.assign 及手写

该方法用于从一个源对象或多个源对象中所有可枚举属性复制到目标对象，最后返回目标对象。

**特点**

- **源对象为原始值时包装成对象**
- **浅拷贝**
- **继承属性**和**不可枚举值**无法拷贝
- **相同属性后者覆盖前者**

**手写**

```javascript
if(typeof Object.assign !== 'function’) {
  Object.defineProperty(Object,'assign',{
    value: function (target,sources) {
      if(target === null) {
        throw Error(‘error’)
      }
    //  包装原始值
      let to = Object(target)
    //  合成sources
      for(let i = 1; i < arguments.length;i++){
        let curSource = arguments[i];
        if(curSource !== null) {
          // in 操作符
          // 筛选不可枚举 & 继承属性
          for(let key in curSource) {
            if(Object.hasOwnProperty.call(curSource,key)){
              to[key] = curSource[key]
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  })
}
```

### 深拷贝

通过JSON.parse 和 JSON.stringfiy 实现深拷贝

```javascript
function hackClone (target) {
  return JSON.parse(JSON.stringify(target));
}
```

该方案存在的问题：

- 抛弃源对象的construct，克隆后变成Object
- 无法解决循环引用问题
- 只能序列化JSON能够处理的数据，无法处理 函数、正则、undefined 以及Symbol

通过递归实现深拷贝

```javascript
function recursionClone(target = {},origin) {
  if (origin === null) {
    return;
  }
  for(let key in origin) {
    if(Object.hasOwnProperty.call(origin,key)) {
      let isObj = typeof (origin[key]) === ‘object’ && origin[key] !== ‘null’
      if(isObj) {
        let isArr = Array.isArray(key);
        isArr ? target[key] = [] : target[key] = {}
        recursionClone(target[key],origin[key])
      }else {
        target[key] = key
      }
    }
  }
  return target
}
```

存在的问题：

- 当clone对象足够大，会stack overflow

- [ ] 深入理解0.1 + 0.2 != 0.3 以及js 中的number bigint
- [ ] 使用循环改写递归clone
