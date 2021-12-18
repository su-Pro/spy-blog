## 链表的中间结点

[876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

### 描述

给定一个带有头结点 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

示例 1：

输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.

示例 2：

输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。

### 思路

典型的快慢指针问题

- 慢指针、快指针都初始化为 head 节点
- 快指针每次走两步
- 慢指针每次走一步
- 当快指针刚好走到 null 节点时，慢指针刚好为中间节点

### 代码

题目要求在偶数情况下，返回第二个中间节点，因此我们需要将快指针初始化至 head 节点。

```js
var middleNode = function (head) {
  if (head == null) {
    return;
  }
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
```

如果要求返回第一个中间节点，需要将快指针初始化至 head.next 节点

```js
var middleNode = function (head) {
  if (head == null) {
    return;
  }
  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
```

Time:链表中有 n 个节点，我们需要遍历整个列表。快指针每次移动两步，时间为 O(n/2), 因此总时间为 => O(n)

Space: 两个指针变量 => O(1)
