### 使用Promise实现每隔1秒输出1,2,3

同步累加then函数

```js

const arr = [1,2,3]

arr.reduce((memo,cur) => {
  return memo.then(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(console.log(cur)),1000)
    })
  })
},Promise.resolve())
```

### 使用Promise实现红绿灯交替重复亮

红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

```js
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
```

1. 封装亮灯函数，用于控制不同秒数和颜色
2. 链式调用串起亮灯顺序，最后递归自己


```js
  const light = function (wait,cb) {
    // 需要将其包装成一个Promise 这样方便链式调用
    // 因为只有前一个状态执行，下一个then函数才会执行
    return new Promise(r => {
      setTimeout(() => {
        cb()
        resolve()
      },wait)
    })
  }
  const step = function () {
    Promise.resolve().then(() => {
      return light(3000,red)
    }).then(() => {
      return light(2000,green)
    }).then(() => {
      return light(1000,yellow)
    }).then(() => {
      step()
    }) 
  }
```

### 实现mergePromise函数

### 封装一个异步加载图片的方法

### 限制异步操作的并发个数并尽可能快的完成全部