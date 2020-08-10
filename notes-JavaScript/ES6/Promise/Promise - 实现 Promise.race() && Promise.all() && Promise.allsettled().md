## 手写

### Promise.all()

```js
Promise.myall = (iterators) => {
  let promises = Array.from(iterators);
  let nums = promises.length;
  let resolveRes = new Array(nums)
  let resolveResIndex = 0;
  return new Promise((resolve,reject) => {
    promises.forEach((promise,index) => {
      Promise.resolve(promise)
      .then(value => {
        resolveRes[index] = value
        if(++resolveResIndex === nums) {
          resolve(resolveRes)
        }
      })
      .catch(reject)
    })
  })
}
```

### Promise.race()

```js
Promise.race = iterators => {
  let promises = Array.from(iterators);
  // 谁快就是谁
  retrun new Promise((resolve,reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise)
      .then(resolve)
      .catch(reject)
    })
  })
}
```

### Promise.allSettled

```js
const formate = (success,value) => (
  success
    ? { status: "fulfilled",value }
    : { status: "rejected",reason: value }
)
Promise.allSettled = iteraotrs => {
  let promises = Array.from(iteraotrs);
  let nums = promises.length;
  let settledRes = new Array(nums);
  let settledNums = 0;

  return new Promise((resolve,reject) => {
    promises.forEach((promise,index) => {
      Promise.resolve(promise)
      .then(value => {
        // todo: formate
        settledRes[index] = formate(true,value)
        if(++settledNums === nums) {
          resolve(settledRes)
        }
      })
      .catch(error => {
        // formate
        settledRes[index] = formate(error)
        if(++settledNums === nums) {
          resolve(settledRes)
        }
      })
    })
  })
}
```

### Promise.finally

```js
Promise.prototype.finally = (cb) => {
  let p = this.constructor
  // 调用上一个成功或失败返回的promise的then方法，增加处理函数
  return this.then(
    value => p.resolve(cb()).then(() => value),
    error => p.resolve(cb()).then(() => { throw error })
  )
}
```
