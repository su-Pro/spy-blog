## 高阶函数之 after 函数

### 异步并发控制

如何在多个异步函数中进行并发控制？例如现在有这样一个需求,希望在两个异步函数都完成后，才进行一些操作。

```js
let temp = {};
fs.readFile("./name.txt", "utf8", function (err, data) {
  tmep.name = data;
});

fs.readFile("./age.txt", "utf8", function (err, data) {
  tmep.age = data;
});
```

可以在回调函数中通过一个高阶函数来控制当前完成的并发数量，当到达上限后说明已经全部完成。

比如 name 文件和 age 文件各读取完毕后，会执行自己的回调函数，在回调函数中调用并发控制函数。

```js
function after(num, cb) {
  // 保证this指向，虽然用不到this
  return () => {
    // 函数执行后，会先将num减一，在进行判断
    // 如果当前num === 0  说明已经满足了要求，可以执行cb
    if (--num === 0) {
      cb();
    }
  };
}
let controller = after(2, function () {
  console.log("并发完成数量以达到预期");
});
let temp = {};
fs.readFile("./name.txt", "utf8", function (err, data) {
  tmep.name = data;
  controller();
});

fs.readFile("./age.txt", "utf8", function (err, data) {
  tmep.age = data;
  controller();
});
```
