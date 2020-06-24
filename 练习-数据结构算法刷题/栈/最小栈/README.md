## 最小栈

[155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

### 描述

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。

示例:

输入：
["MinStack","push","push","push","getMin","pop","top","getMin"][],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); --> 返回 -3.
minStack.pop();
minStack.top(); --> 返回 0.
minStack.getMin(); --> 返回 -2.

提示：

pop、top 和 getMin 操作总是在 非空栈 上调用。

### 思路

使用辅助栈保存当前 stack 中最小的元素，并与原 stack 保持同步增，同步减。

示例：

```js

[1,5,-1,0,3]

[ 1 ] => min = 1
| 1,
getMin() => 1


[ 1, 5 ] => min = 1
| 1, 1

getMin() => 1, origin.pop() | getMin() ? => 1

[ 1, 5, -1 ] => min = -1
| 1, 1, -1

getMin() => -1, origin.pop() | getMin() ? => 1

[ 1, 5, -1, 0 ...] => min = -1
| 1, 1, -1,-1 ...

```

- 构建 helperS，物理意义为：存储当前 OriginS 中每个长度的最小元素
- 每次向 OriginS 中 push 元素时：
  - 记录当前最小元素:globalMin,加入到 helperS 中
- 每次从 OriginS 中 pop 元素时：
  - 同样对 helperS 进行 pop 操作，保证同步性，并更新当前最小元素
- 每次调用 getMin()时，只需要获取 helperS 栈顶元素即可

### 代码

```js
var MinStack = function () {
  this.helperS = [];
  this.OriginStack = [];
  // 保存最大值。
  this.gMin = Number.MAX_VALUE;
};

MinStack.prototype.push = function (x) {
  this.OriginStack.push(x);
  /**
   * 保证helperS每次加入的元素为最小元素
   */
  if (this.OriginStack.length === 0) {
    this.helperS.push(x);
    this.gMin = x;
  } else {
    this.gMin = this.gMin > x ? x : this.gMin;
    this.helperS.push(this.gMin);
  }
};

MinStack.prototype.pop = function () {
  this.OriginStack.pop();
  this.helperS.pop();
  this.gMin = this.getMin() ? this.getMin() : Number.MAX_VALUE;
};

MinStack.prototype.top = function () {
  return this.OriginStack[this.OriginStack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.helperS[this.helperS.length - 1];
};
```

#### 复杂度

Time: getMin 的时间复杂度为 O（1），push 和 pop 的操作也都是 O（1）

Space: 需要额外 stack 存储 globalMin => O(n)

### !!!FLLOW UP，如何优化 helperS 中的多余空间？
