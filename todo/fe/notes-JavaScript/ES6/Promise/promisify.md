## promisify

例如现在我们有一个异步IO函数，它是基于回调函数的异步编写风格：

```js
let fs = require('fs');

let read = fs.readFile;

read('name.txt', 'utf8',function (err,data){
  if(err) throw new Error('err is:',err);
  console.log(data);
})
```

现在有一个需求是让你将read函数，转化成promise的编程风格，可以这样调用：

```js
let read =  promisify(fs.readFile);
read('name.txt', 'utf8')
.then((data) => {
  console.log(data)
},(err) => {
  console.err(err)
})
```
因此我们根据如下两条线索即可得promisify：

- promisify 接收一个函数，并返回另外一个包裹后的函数
- 通过Promise 对包裹函数进行封装

```js
  function promisify (fn) {
    return function (...args) {
      // 让该函数执行，并根据不同结果将promise推向已决状态
      // 使得可以在then函数中获取异步结果
      new Promise((resolve,rejcet) => {
        fn(...args,function (err,data) => {
          if (err) reject(err)
          resolve(data)
        } )
      })
    }
  }
```

最终简化后的结果如下所示

```js
const promisify = fn => (...args) => new Promise((resolve,reject) => {
  fn(...args,function (err,data) {
    if(err) reject(err)
    resolve(data)
  })
})
```