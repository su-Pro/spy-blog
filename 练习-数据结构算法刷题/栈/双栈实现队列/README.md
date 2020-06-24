## 用两个栈实现队列

[232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

### 描述

使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。
 
示例:

MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);  
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false
 
说明:

你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。

### 思路

- 构造stack1 和 stack2
  - stack1的物理意义：每次增加元素时，会将元素加入到stack1中进行保存
  - stack2的物理意义：每次peek或者pop时，都会查看或者弹出stack2栈顶元素
    - 如果栈顶元素不存在，此时会将stack1中的元素全部吐到stack2中
  - empty方法只需要判断 stack1 和 stack2 的长度即可

### 代码

#### 复杂度

Time:

Space:
