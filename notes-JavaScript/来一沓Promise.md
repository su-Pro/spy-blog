## 来一沓 Promise！

### 简述 Promise 是什么？

它是用来解决形如“回到地狱” 的异步嵌套问题，主要使用方法为：**将一个处理函数传入到 Promise 的 then 方法中从而获得 Promise 的最终结果，并告诉下一个 then 方法如何进行操作。**

> Promise A+ 在社区中诞生，并且在业界有了很多实现方案。例如著名的 Q 和 bluebird，[bluebird](http://bluebirdjs.com/docs/api-reference.html)号称运行最快的类库。

### Promise 的特点有哪些？/如何使用 Promise？

我会从状态机、链式调用以及异常处理来回答 promise 的特点，以及从 promise 的常用 API 和常见场景来回答我是如何使用的 Promise。

#### 状态机

在 Promise 规范中，将 Promise 分为两个阶段和三个状态，每个阶段和状态都一经更改**即为不可变**，并且他们都是**单向操作**。如：

- 状态是从未决状态推向已决状态，到达已决状态后不可变。
- 阶段是从 pending 推向 resolved/rejected ，到达 resolved/rejected 后状态不能变更

#### 链式调用

利用的是这个 API 实现链式调用`Promise.prototype.then()`

在 Promise 的执行流程中，当 promise 获得最终结果后会把它传递给自己的 then 方法中进行指定操作，最后 then 方法会**包装并返回一个 promise2 对象**。

因此可以在返回的 promise2 对象中继续定义 then 方法,形如链式调用的样子，其实这个 then 方法是属于一个新的 promise2 对象,只不过这个 promise2 对象省去了初始化构造器的流程。

事实上，是会将上一次的最终结果（手动 return 的值）传递到新的 promise2 中，不过需要注意有如下几种差异：

- return 结果为原始值，那么任何情况下 promise2 一定变为 resolve，因此会走 then 函数中传入的 resolve 方法
- return 结果为 promise 对象，那么 promise2 会等待结果是 promise 的这个对象，并随他一起变更（promise 为失败，promise2 就会失败，反之亦然）
- 关于 then 异常处理请见下面总结

#### 常用 API

Promise.reslove

Promise.reject

Promise.finally

Promise.race

Promsie.all

#### 异常处理

Promise.catch

#### 常见场景

TODO: 封装异步 AJAX 请求

#### Promise 有哪些缺点？在哪些实现上得以改进？

- 当 Promise 创建后会立即执行，无法取消
- 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
- 没有真正解决异步嵌套编程风格
- 兼容性问题

### Promise 属于哪一个消息队列？

### 按照 PromiseA+ 规范，你认为实现过程中难点是哪里？

#### Pormise 基本结构

1. **三个状态**： 成功态（resolve） 失败态（reject） 等待态（pending） (又不成功又不失败)
2. 由用户自己决定失败/成功(**resolve,reject 函数**)，并附上指定的原因
3. 创建 promise 时，执行器会立即执行
4. promise 的实例都拥有一个 then 方法，成功的函数和失败的函数作为参数进行传递，并在确定的状态下执行回调函数
5. 如果在执行执行器时发生了异常，会执行失败（reject）逻辑
6. 状态一经确认，不能再改变

```js
//1. 实现三个状态
const RESOLVED = "RESOLVED"; // 成功
const REJECTED = "REJECTED"; // 失败
const PENDING = "PENDING"; // 等待态
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    // 调用此方法就是成功
    let resolve = (value) => {
      // 先决条件
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
      }
    };
    // 调用此方法就是失败
    let reject = (reason) => {
      // 先决条件
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    };
    try {
      // 创建 promise 时，执行器会立即执行
      executor(resolve, reject);
    } catch (e) {
      // 捕获错误后，会将状态推向已决失败态
      reject(e);
    }
  }
  // 根据当前promise的状态，判断调用哪个回调函数
  then(onFulfilled, onRejected) {
    if (this.status === RESOLVED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}
```

#### 发布订阅加持

上面实现的基础版 Promise 无法对异步 reject/resolve 处理，如下所示：

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 处理不了
    reject("不成功");
  }, 1000);
});
promise.then(
  (data) => {
    console.log("success1", data);
  },
  (err) => {
    console.log("faild2", err);
  }
);
// 执行到then时，promise的状态为pending，无法进行判断，因此什么也不做
```

因此我们要在发布订阅模式的帮助下，实现能够监听异步情况下的状态改变。

```js
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = []; // 中介，分别存放对应的回调函数
    this.onRejectedCallbacks = []; // 中介，分别存放对应的回调函数
    let resolve = (value) => {
      // 调用此方法就是成功
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        // 发布成功，成功队列的回调函数一一执行
        this.onReslvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        // 发布失败，失败队列的回调函数一一执行
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject); // 立即执行
    } catch (e) {
      // 错误处理 需要直接走错误逻辑
      // console.log(e);
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    // 之所以还保留着这两个判断，是防止在执行执行器中直接将状态淦到已决
    if (this.status === RESOLVED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    // 将等待执行的函数全部订阅，加入到指定的队列中
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        // 之所以包了一层函数是在为以后AOP切片做准备
        // 这样能够使得代码拓展性强（否则直接push进去的话，想在执行前做点什么就非常有难度了）
        // todo...
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        // todo...
        onRejected(this.reason);
      });
    }
  }
}
```

#### 实现 then 的链式调用

链式调用的特点如下：

1. 成功/失败的结果会作为参数传递到下一层 then 函数中

根据上面函数返回结果的类型不同，有如下几种情况：

2. 原始值类型：无论是成功/失败的结果，都会传递到下一层 then 函数 中的成功处理逻辑
3. Promise 对象：会采用这个 promise 的状态，从而决定一下层 then 函数成功还是失败
4. 异常处理：如果在当前函数中执行抛出错误，一定会走到下一层 then 函数 中的错误处理逻辑
5. 异常处理：如果离自己最近的 then 函数 没有错误处理(没有写错误函数) 会向下找
6. 每次执行完 then 函数后返回的都是一个“新的 promise"

then 函数的逻辑修改如下：

```js
then(onFulfilled, onRejected) {
  // 返回一个promise2 作为链式调用的基石
  // 之所以链式调用不选择返回this
  // 是因为promise的特性：一旦成功或者失败就不能修改状态
  // 如果是返回this，那么在后续的then函数中就有可能更改其状态，违背promiseA+规范
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        // 通过setTimeout延迟到下一个队列中执行
        // 这样能够获得正确的promise2对象，因为该逻辑还处在new Promise的构造函数代码中
        // 无法获得当前promise2
        // 需要推迟到同步代码执行完毕后再执行
        setTimeout(() => {
          // 尝试去执行函数并捕获异常
          try {
            let x = onFulfilled(this.value);
            // x可能是一个proimise,也可能是一个原始值
            // 不管怎样，都交给resolvePromise来处理
            // 新的promise2作为被决定对象
            // x作为决定promise2的关键因素
            // XXX: resolve，reject 是初始化时的公共函数，每个promise都会用到。
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 同理
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 同理
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // todo...
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // todo...
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
```

resolvePromise 的实现逻辑如下：

```js
const resolvePromise = (promise2, x, resolve, reject) => {
  // 首先会进行循环引用判断
  if (promise2 === x) {
    return reject(
      // 用一个类型错误结束掉promise
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  let called;
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    // 后续的条件要严格判断，保证代码能和别的库一起使用
    // 只要满足PromiseA+就可以通过检测，但实现上会有差异性
    // 满足逻辑，才有可能是一个promise，要继续判断
    try {
      // 判断x 是否拥有then函数
      // 如果拥有，则认为是一个promise
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            // 根据promise完成后状态决定promise2的状态
            // 避免已经执行过一个处理函数（假设是成功处理函数）
            // 还会执行下一个失败的处理函数（违背PromiseA+）
            if (called) return;
            called = true;
            // 递归解析该过程，防止多个promise嵌套
            // 例如：resolve(new Promise(... => {
            //   resolve(new Promsie(... => {
            //     ...
            //   }))
            // }))
            resolvePromise(promise2, y, resolve, reject);
          },
          (e) => {
            // 如果出错，直接将promise推向失败态即可
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 如果不是一个promise，认为是原始值
        resolve(x);
      }
    } catch (e) {
      // 防止失败了再次进入处理成功 | 失败的函数
      if (called) return;
      called = true;
      reject(e);
    }
  }
  // 如果是普通值，将x的结果作为下一层then的成功结果,并将其状态推向已决成功态。
  else {
    resolve(x);
  }
};
```

#### then 函数穿透

#### catch 方法实现

特殊的 then 方法，将成功方法的位置设置为 null，后面将 reject 替换成错误处理函数即可。

#### defer 函数测试 Promise A+ 以及解决 Promise 包装

### 实现 Promise.resolve 、 Promise.reject 、Promise.all 和 Promise.finally 方法

### 基于 Promise 实现的 API 有哪些？

#### fetch API
