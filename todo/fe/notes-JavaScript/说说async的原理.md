## async

### 本质

async 函数是 Generator 函数的语法糖（内置了执行器）。体现在写法的差异：async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await。

### 特点（相比于generator的优势）

#### 内置执行器

Generator 函数的执行必须靠执行器，所以才有了co模块，实现了自执行。而async函数自带执行器，他的执行与普通函数一模一样直接调用即可。

#### 语义化

async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

#### 广泛用途

co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

#### 返回Promise对象

async函数的返回值是 Promise 对象，可以用then方法指定下一步的操作。

### 返回值

async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变

遇到return语句或者抛出错误（或者reject），会直接返回错误或者return后的内容。

### await

- 后面是一个 Promise 对象，返回该对象的结果
- 不是 Promise 对象，就直接返回对应的值

> 「紧跟着await后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then中」

#### 1

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log('start')


'async start'
'promise'
'async1 end'
'start'
```

#### 2

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log('timer1')
  }, 0)
}
async function async2() {
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log('timer3')
}, 0)
console.log("start")



'async1 start'
'async2'
'start'
'async1 end'
'timer2'
'timer3'
'timer1'
```


#### 3

```js
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')


// pending 会一直await的
'script start'
'async1 start'
'promise1'
'script end'
```

### 错误处理

当 await语句后跟随的promise rejected后（或者抛出错误），会直接结束函数的执行。有时为了能够前一个异步操作失败，也不要中断后面的异步操作，可以有如下两种方案：

1. 尾随catch函数
2. try catch 捕获异常

```js
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world

```

```js
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
```
#### 1. 

```js
async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))


// 'async2'
// Uncaught (in promise) error
```

#### 2. 

```js
async function async1 () {
  try {
    await Promise.reject('error!!!')
  } catch(e) {
    console.log(e)
  }
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res => console.log(res))
console.log('script start')

'script start'
'error!!!'
'async1'
'async1 success'
```

### 并发和继发

多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。例如下面的代码，不存在关系，还使用了异步串行，浪费时间。

```js
let foo = await getFoo();
let bar = await getBar();
```

可以改写如下：

```js
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

### 实现原理

是如何做到的next中参数传递给下一个参数？
```js
var nums1 = await test();
// 是如何做到的呢？
var nums2 = await test(nums1);

```

```js
function co (generator) {
  var g = generator();
  function next (val) {
    var res = g.next(val);
    if(res.done) return res.value;
    res.value.then(val => {
      next(val);
    })
  }
  next()
}
```

```js
function co (gen) {
  return new Promise((resovle,reject ) => {
    var g = gen();
    function next(val) {
      try{
        var res = g.next(val)
      } catch(e) {
        return reject(e);
      }
      if(res.done)  {
        return resolve(res.value);
      }
    }
    // 包装原始值
    Promise.resolve(res.value).then(
      val => {
        next(val);
      }
    )
    .catch(e => g.throw(err))
    next();
  })
}
```