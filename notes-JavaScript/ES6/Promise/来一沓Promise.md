## Promise

### 产生背景

它是用来解决形如“回调地狱” 的**异步串行**编程风格问题，主要策略：**将一个处理函数传入到 Promise 的 then 方法中，当 Promise 构造函数中获得最终结果后，会将结果传递给此时的then函数并执行他，当then函数完成后会告诉下一个 then 方法如何进行操作。**

### 特性

#### 状态机

在 Promise 规范中，将 Promise 分为两个阶段（未决阶段和已决阶段）和三个状态（挂起状态、成功和失败状态），每个阶段和状态一经更改**即为不可变**并且他们都是**单向操作**。如：

- 状态是从未决状态推向已决状态，到达已决状态后不可变。
- 阶段是从 pending 推向 resolved/rejected ，到达 resolved/rejected 后状态不能变更

#### 链式调用

利用的是这个 API 实现链式调用`Promise.prototype.then()`

在 Promise 的执行流程中，当 promise 获得最终结果后会把它传递给自己的 then 方法中进行指定操作，最后 then 方法会**包装并返回一个 promise2 对象**。

因此可以在返回的 promise2 对象中继续定义 then 方法,形如链式调用的样子。其实这个 then 方法是属于一个新的 promise2 对象,只不过这个 promise2 对象省去了初始化构造器的流程。

事实上，是会将上一次的最终结果（手动 return 的值）传递到新的 promise2 中，不过需要注意根据return的值类型区别，有如下几种差异：

- 结果为原始值，那么任何情况下 promise2 一定变为 resolved
- 结果为 promise 对象，那么 promise2 会根据这个 promise 对象来确定自己的状态（promise 为失败，promise2 就会失败，反之亦然）

#### 微任务

由Promise产生的回调函数，会添加到消息队列中的微任务队列，例如then 方法 和 catch 方法。从微队列产生背景来讲，我认为这样做的好处是：

由于以前网络请求是宏任务，在宏任务队列中存在大量不同消息类型的事件回调，并且不存在“优先级”。假设当前有一个网络请求完成后，不料宏队列前有任务在执行，或者刚好堵塞，那么势必会导致“网络延迟、页面卡顿”的现象发生，导致用户体验下降。

如果将回调函数加入到微队列中，这样就能够尽可能的提高执行速度，毕竟每一次事件循环只会执行一个宏任务，而微任务队列是直接清空的（从队列中阻塞的可能性角度来讲，要低）；并且微任务也是优先于宏任务执行的。

#### 异常处理

- Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

- 跟传统的try/catch代码块不同的是，如果没有使用catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

### 常用 API

#### Promise.prototype.then()

- 它的作用是为 Promise 实例添加状态改变时的回调函数（接收两个参数，但并不是必须的）
- then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，上面已经介绍过。

#### Promise.reslove()

根据参数的不同，该方法时会有不同的处理情况：

1. 参数为Promise时;原封不动的将入参Promise进行返回
2. 参数为thenable对象时;会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

  ```js
  let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };
  let p1 = Promise.resolve(thenable);
  p1.then(function(value) {
    console.log(value);  // 42
  });
  ```
  
3. 参数不是具有then方法的对象，或根本就不是对象;会返回一个变为resolved状态的Promise对象，并将原始值作为成功结果。
4. 无参；会直接返回一个成功态的Promise对象

#### Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

> Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。

#### Promise.prototype.catch()

- Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

- then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获。

- Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
  
- 如果没有使用catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。（俗称吃掉错误信息）

#### Promsie.all()

Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
// p 是一个新的promise
```

p1,p2,p3 都是 Promise 实例，如果不是，会调用Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

> 参数必须提供iterator接口

该promise的状态由参数决定，分为如下两种：

- 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
- 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

#### Promise.race()

和all方法基本类似，但区别在于只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

#### Promise.prototype.finally

用于指定不管 Promise 对象最后状态如何，都会执行的操作。

> finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

#### nodejs：promisify

#### Promise.allsettled（）

[Promise.allsettled](https://es6.ruanyifeng.com/?search=catch&x=0&y=0#docs/promise#Promise-allSettled)

### 基于Promise的产物

#### fetchAPI

#### Vue.js的异步渲染

### Promise的缺点

- 当 Promise 创建后会立即执行，无法取消
- 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
- 如果不设置错误捕获函数，Promise 内部抛出的错误，不会反应到外部
- 代码冗余
- 兼容性问题（IE11及其以下不支持Promise）

### 其他的异步编程方案

### 原理

#### 发布订阅

#### 链式调用then

#### finally方法

finally本质上是then方法的特例，会将上一个then方法传递的参数，原封不动的传递到下一个then方法中，包括上一个抛出错误， 也会原封不动的传递下去。

> 有点中间件的意思？

```js
promise
.finally(() => {
  // 语句
});
// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);

```

```js
Promise._finally = cb =>  (this.then(
  value => Promise.resolve(cb()).then(() => value),
  error => Promise.resolve(cb()).then(() => throw error)
))
```

#### 并发all方法

Promise.all(iterators)返回一个新的 Promise 实例。iterators 中包含外界传入的多个 promise 实例。

对于返回的新的 Promise 实例，有以下两种情况：

- 如果传入的所有 promise 实例的状态均变为fulfilled，那么返回的 promise 实例的状态就是fulfilled，并且其 value 是 传入的所有 promise 的 value 组成的数组。
- 如果有一个 promise 实例状态变为了rejected，那么返回的 promise 实例的状态立即变为rejected。

```js
Promise._all = iterator => {
  // 1. 包装参数
  // 2. 初始化返回结果
  // 3. 初始化并发控制器
  let promises = Array.form(iterator);
  let n = iterator.length;
  let promisesNums = 0;
  let promisesData = new Array(iterator);

  return Promise((resolve,reject) => {
    promises.forEach((promise,index) => {
      // 使用resolve 包装promise
      Promise.resolve(promise).then(data => {
        // 1. 加入到结果中
        // 2. 控制并发数量
        promisesData[idnex] = data;
        if(++promisesNums === n) {
          resolve(promisesData)
        }
      })
      // 3. 如果出错，直接reject
      .catch(reject)
    })  
  })
}
```

#### race方法实现

```js
Promise._race = iterator => {
  let promises = Array.from(iterator);
  
  new Promise((resolve,reject) => {
  //  只要有一个先到达，就返回其结果和他的状态
  promises.forEach(promise => {
    Promise.resolve(promise)
    .then(resolve)
    .catch(reject)
  })
})
}
```

#### Promise.allSettled()

只需要在all实现的基础上， 将结果和状态进行关联，组成一个对象返回即可。

```js
const formatSettledResult = (success, value) =>
    success
        ? { status: "fulfilled", value }
        : { status: "rejected", reason: value };

Promise.allSettled = function(iterators) {
    const promises = Array.from(iterators);
    const num = promises.length;
    const settledList = new Array(num);
    let settledNum = 0;

    return new Promise(resolve => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    settledList[index] = formatSettledResult(true, value);
                    if (++settledNum === num) {
                        resolve(settledList);
                    }
                })
                .catch(error => {
                    settledList[index] = formatSettledResult(false, error);
                    if (++settledNum === num) {
                        resolve(settledList);
                    }
                });
        });
    });
};
```
