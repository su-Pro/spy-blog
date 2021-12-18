## 重排链表

[143. 重排链表](https://leetcode-cn.com/problems/reorder-list/)

### 描述

给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例 1:

给定链表 1->2->3->4, 重新排列为 1->4->2->3.

示例 2:

给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.

### 思路

整个问题可以分解为三步：

- 找到链表的中间节点 （[快慢指针找中点](new/todo/fe/练习-数据结构算法刷题/链表/链表的中间结点/README.md)）
  - 链表最终会分为两部分：
  - head -> ... -> mid -> null
  - mid.next -> ... -> tail -> null
- 对后一部分进行链表翻转([翻转链表](new/todo/fe/练习-数据结构算法刷题/链表/翻转链表/README.md))
  - 后一部分链表变为：
  - tail -> ... -> mid.next -> null
- 将两个链表进行合并操作([合并链表](new/todo/fe/练习-数据结构算法刷题/链表/合并两个有序链表/README.md))
  - head -> tail -> ... -> null

### 代码

```js
var reorderList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let first = head;
  // 1. 找到中点
  let mid = findMiddleNode(first);
  let second = mid.next;
  // 切断first的尾巴
  mid.next = null;
  // 2. 翻转链表
  let reversedSecond = reverseList(second);
  // 3. merge
  let result = merge(first, reversedSecond);
  return result;
};

function findMiddleNode(node) {
  if (node === null || node.next === null) {
    return node;
  }
  let slow = node,
    fast = node;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

function reverseList(node) {
  if (node === null || node.next === null) {
    return node;
  }
  // let newHead = reverseList(node.next);
  // node.next.next = node;
  // node.next = null;
  // return newHead
  let prev = null,
    cur = node,
    post;
  while (cur !== null) {
    post = cur.next;
    cur.next = prev;
    prev = cur;
    cur = post;
  }
  return prev;
}

function merge(l1, l2) {
  if (l1 === null) {
    return l2;
  } else if (l2 === null) {
    return l1;
  }
  let dummyHead = new ListNode(-1);
  let runPoint = dummyHead;
  let runl1 = l1;
  let runl2 = l2;
  while (runl1 !== null && runl2 !== null) {
    runPoint.next = runl1;
    runl1 = runl1.next;
    runPoint = runPoint.next;
    runPoint.next = runl2;
    runl2 = runl2.next;
    runPoint = runPoint.next;
  }
  /**
   * 因为是取中间节点
   * 所以 l1.size >= l2.size
   * 因此 有剩余一定是l1
   */
  if (runl1 !== null) {
    runPoint.next = runl1;
  }
}
```

Time:三步都是处理链表中的每一个节点，因此 => O(n)

Space: 翻转递归 => O(n) || 翻转循环 => O(1)
