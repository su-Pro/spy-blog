## 合并两个有序链表

[21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

### 描述

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4

### 思路

#### 循环版

需要构建一个 dummy 链表还需要一个 runPoint 用来移动 dummy 链表，能够帮助我们避免空指针情况发生。

- dummyNode = new ListNode(-1)
- 对两个链表进行 merge sort，谁小移动谁，将小的内容放入到 dummyNode.next 中
- 当两个链表操作完毕后，返回 dummyNode.next
- 后续处理：如果长度不相等，需要将剩余节点拼接到 dummyNode 尾部

#### 递归

TODO: 图解

### 代码

#### 循环版

```js
var mergeTwoLists = function (l1, l2) {
  if (l1 === null && l2 === null) {
    return null;
  }
  var dummyHead = new ListNode(-1);
  var runPonit = dummyHead;
  while (l1 && l2) {
    var i = l1.val;
    var j = l2.val;
    // 谁小移动谁
    if (i < j) {
      runPonit.next = l1;
      l1 = l1.next;
    } else {
      runPonit.next = l2;
      l2 = l2.next;
    }
    runPonit = runPonit.next;
  }
  // post process
  if (l1 || l2) {
    runPonit.next = l1 ? l1 : l2;
  }
  return dummyHead.next;
};
```

#### 复杂度

Time:遍历两个链表并检查每个节点 => O(2n) => O(n)

Space:一个 dummyNode 一个 runPoint 被创建，因此需要 ⇒ O(1)

#### 递归

```js
var mergeTwoLists = function (l1, l2) {
  //到尾部后，处理两种后续情况
  if (!l1) return l2;

  if (!l2) return l1;

  if (l1.val <= l2.val) {
    // 谁小移谁，并进行拼接返回
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```
