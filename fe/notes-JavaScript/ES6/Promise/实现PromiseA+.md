## 实现PromiseA+ 规范

### promise

它是是一个拥有 then 方法的对象或函数，其行为符合本规范；

> 因此我选择实现一个Promise类

### Promise 的状态

一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。

#### 等待态（Pending）

处于等待态时，promise 需满足以下条件：`可以迁移至执行态或拒绝态`

#### 执行态（Fulfilled）

处于执行态时，promise 需满足以下条件：`不能迁移至其他任何状态 + 必须拥有一个不可变的终值`

#### 拒绝态（Rejected）

处于拒绝态时，promise 需满足以下条件：：`不能迁移至其他任何状态 + 必须拥有一个不可变的终值`

### Then 方法

一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因。

promise 的 then 方法接受两个参数：`promise.then(onFulfilled, onRejected)`

#### 参数可选

onFulfilled 和 onRejected 都是可选参数。

- 如果 onFulfilled 不是函数，其必须被忽略
- 如果 onRejected 不是函数，其必须被忽略

#### onFulfilled 和 onRejected 特性

onFulfilled 特性，如果 onFulfilled 是函数：

- 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值
- 在 promise 执行结束前其不可被调用
- 其调用次数不可超过一次

onRejected 特性，如果 onRejected 是函数：

- 当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的据因
- 在 promise 被拒绝执行前其不可被调用
- 其调用次数不可超过一次

#### 多次调用

then 方法可以被同一个 promise 调用多次

- 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
- 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调

#### 返回（链式调用）

then 方法必须返回一个 promise 对象

`promise2 = promise1.then(onFulfilled, onRejected);`

- 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
- 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
- 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
- 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因

> 总结来说，如果返回一个promise或原始值，那么promise2的状态会由该值决定。
> 如果在promise1的then函数执行时出错，那么promise2 状态会推向失败态，并返回错误信息
> 如果then函数没有两个fn参数，那么会出现穿透现象

#### Promise 解决过程

Promise 解决过程是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 `[[Resolve]](promise, x)`，如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise 。

这种 thenable 的特性使得 Promise 的实现更具有通用性：只要其暴露出一个遵循 Promise/A+ 协议的 then 方法即可；这同时也使遵循 Promise/A+ 规范的实现可以与那些不太规范但可用的实现能良好共存。

运行 `[[Resolve]](promise, x)` 需遵循以下步骤：

- x 与 promise 相等
  如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise

- x 为 Promise
  如果 x 为 Promise ，则使 promise 接受 x 的状态

```
    如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
    如果 x 处于执行态，用相同的值执行 promise
    如果 x 处于拒绝态，用相同的据因拒绝 promise
```

- x 为对象或函数

```
如果 x 为对象或者函数：
- 把 x.then 赋值给 then
- 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
- 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
  传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
  - 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
  - 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
  - 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
  - 如果调用 then 方法抛出了异常 e：
   - 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
   - 否则以 e 为据因拒绝 promise
  - 如果 then 不是函数，以 x 为参数执行 promise
如果 x 不为对象或者函数，以 x 为参数执行 promise

```

### 模仿实现

#### 基础版

根据以上规范部分实现如下：

```js
//1. 实现三个状态
const RESOLVED = "RESOLVED"; // 成功
const REJECTED = "REJECTED"; // 失败
const PENDING = "PENDING"; // 等待态
// 2. 初始化Promise构造器
class Promise {
  constructor(executor) {
    this.status = PENDING; // 初始化Promise状态为PENDING
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
// 3. resolve 和 reject 并不属于规范，但是ES6实现中有
// 根据其用意，我们可以写出如下代码

    let resolve = (value) => {
      // 先决条件，必须是PENDING才可以将状态推向RESOLVED
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
      }
    };
    let reject = (reason) => {
      // 先决条件，必须是PENDING才可以将状态推向REJECTED
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    };
// 3. 这里需要捕获excutor在执行过程中可能出现的错误，规范中没有明确规范
// 但是在ES6实现中是这样的逻辑，代码如下

    try {
      executor(resolve, reject);
    } catch (e) {
      // 捕获错误后，会将状态推向已决失败态
      reject(e);
    }
  }

// 4. 根据Promise规范，实现原型then方法，具体要求部分参照如上规范

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

#### 发布订阅处理异步和一个promise注册多个then函数

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
// 执行到then时，promise的状态为pending，无法进行判断，因此什么也不做然后结束执行。
```

因此我们要在发布订阅模式的帮助下，实现能够监听异步情况下的状态改变，对代码修改如下：

```js
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = []; // 中介，按顺序存放对应的回调函数
    this.onRejectedCallbacks = []; // 中介，按顺序存存放对应的回调函数
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        // 发布
        this.onReslvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        // 发布
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === RESOLVED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    // 订阅异步事件
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        // XXX: 立场站不住脚？
        // 之所以包了一层函数是在为以后可能的AOP切片做准备
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

成功/失败的结果会作为参数传递到下一层 then 函数中，每次执行完 then 函数后返回的都是一个“新的 promise"。

根据上面函数返回结果的类型不同，有如下几种情况：

1. 原始值类型：无论是成功/失败的结果，都会传递到下一层 then 函数 中的**成功处理逻辑**
2. Promise 对象：会采用这个 promise 的状态，从而决定一下层 then 函数成功还是失败
3. 异常处理：如果在当前函数中执行抛出错误，一定会走到下一层 then 函数 中的错误处理逻辑
4. 异常处理：如果离自己最近的 then 函数 没有错误处理(没有写错误函数) 会向下找

此处有一个问题，在jQuery中的链式调用实现是通过返回this，那么 then的 链式调用可以返回this实现吗？

> 此时的this 是当前promise 实例，如果在当前已经变为成功态，而后在其他的then函数中，不料更改为失败态，会违背promise的设计初衷，因此选择每次then函数返回一个promise实现链式调用。

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
            // x 是当前promise状态变更后所返回的内容
            // 可能是一个proimise,也可能是一个原始值
            // 不管怎样，都交给resolvePromise来处理
            // 新的promise2作为被决定对象，x作为决定promise2的关键因素
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
      // 只需要将当前参数缓存起来即可
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
  // 1. 判断是否相等
  if (promise2 === x) {
    return reject(
      // 用一个类型错误结束掉promise
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  let called;
  // 2. 判断是否为promise
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    // 后续的条件要严格判断，保证代码能和别的库一起使用
    // 只要满足PromiseA+就可以通过检测，但实现上会有差异性
    // 满足逻辑，才有可能是一个promise，要继续判断
    try {
      // 判断x 是否拥有then函数，如果拥有，则认为是一个promise
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
            // 如果出错，直接将promise推向失败态即可,不需要递归解析
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 如果当前刚好返回值是一个普通值
        resolve(x);
      }
    } catch (e) {
      // 防止失败了再次进入处理成功 / 失败的函数
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

[完整的代码](./promiseA+.js)
