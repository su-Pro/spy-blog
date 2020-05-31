## （前置知识）浏览器渲染机制

浏览器渲染进程中分为：GUI 线程、V8 线程、事件处理线程、定时器线程、ajax 线程...

GUI 线程和 V8 线程是互斥关系的，在 js 脚本时会阻塞页面的渲染。

## 傻循环

一次性将所有节点插入到页面中，关键代码如下：

```html
<script>
  let totalData = 100000;
  let sTime = Date.now(); // 用于标识开始时间
  let spanTime = null; // 标识结束时间
  let container = document.getElementsByClassName("container")[0];
  for (let i = 0; i < totalData; i++) {
    let li = document.createElement("li");
    li.innerHTML = `我是第${i}条数据`;
    container.appendChild(li);
  }
  setTimeout(() => {
    spanTime = Date.now() - sTime;
    console.log(`js计算和页面渲染一共花费了${spanTime}毫秒`);
  }, 0);
</script>
```

通过下面对比 firFox 和 chrome 渲染花费的时间可以看出，一次性插入 10W 节点还是比较耗费时间的，非常影响用户体验。

> 由于浏览器的渲染优化，会一次性计算好，然后将所有缓存在 xxx 队列的节点一次性插入到页面中；但对于老浏览器就不存在这种优化。

## 时间分片

可以利用浏览器的事件循环，每次只渲染“一部分”元素，将所有 js 计算好的内容（通过消息队列）缓存起来，当前 GUI 操作后会 loop 消息队列，取出一块渲染到页面上。递归该过程，即可完成 10W 节点的插入，这种思路简称**时间分片**。

> 实现采用的是 requestAnimationFrame，而非定时器。意图是一样的，都是将 DOM 操作拆分到小的时间节点，尽量不阻塞 DOM 渲染。但性能上还是有区别的。

```html
<script>
  let totalData = 100000;
  let sTime = Date.now(); // 用于标识开始时间
  let spanTime = null; // 标识结束时间
  let container = document.getElementsByClassName("container")[0];
  let DataSums = 0; // 标识当前已经渲染多少元素
  let stamp = 50; // 用于标识每次渲染的数量
  function _append() {
    // base case;
    if (DataSums < totalData) {
      requestAnimationFrame(() => {
        for (let i = 0; i < stamp; i++, DataSums++) {
          // 每次只循环创建stamp的数量
          let li = document.createElement("li");
          li.innerHTML = `当前是第${DataSums}条数据`;
          container.appendChild(li);
        }
        _append();
      });
    }
  }
  _append();
  setTimeout(() => {
    spanTime = Date.now() - sTime;
    console.log(`js计算和页面渲染一共花费了${spanTime}毫秒`);
  }, 0);
</script>
```

通过浏览器控制台可以发现首次渲染时间明显缩短，需要强调一下：打印出的时间是 js 将所有任务计算完毕后推入消息队列中 + 第一次 GUI 渲染（也就是首个 requestAnimationFrame）所用的时间。

但是这种方案存在的问题就是会导致页面中存在大量的 DOM 元素，一旦发生重绘重排，会对性能有很大的影响。

## 虚拟列表

可以采用虚拟列表优化性能，例如

- [ ] 浏览器渲染机制？
- [ ] 浏览器事件循环和渲染的关系？
- [ ] requestAnimationFrame 和 定时器性能上的区别
