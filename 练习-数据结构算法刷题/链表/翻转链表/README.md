## 出处

[206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

## 描述

反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

## 思路

### 循环

- 构造三根指针，形如 prev -> cur -> post -> .... -> tail -> null 
- 循环检查每个节点，翻转即可。
   - post = cur.next
   - cur.next = prev (翻转操作)
   - prev = cur (移动prev指针)
   - cur = post(移动cur指针)

边界：当cur指针移动到null指针，说明链表全部翻转完毕，此时返回prev指针即可。

### 递归

- 利用分治思想将问题向下进行拆分，抽象成cur.next的翻转问题（如果需要翻转当前链表，我首先要将下一个节点进行翻转，翻转下一个节点，需要将下下个节点翻转...)
- 所有被拆分的小问题处理完毕后（每层的翻转），最终的问题也随之解决（整个链表的翻转）
- 当链表不能再向下分时，此节点就是最终的翻转后的新头部节点
- 在每层翻转时，需要切断链表原来的指针

## 代码

### 循环

```js
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  // 三指针
  let prev = null, cur = head, post;
  while (cur !== null) {
    post = cur.next;
    cur.next = prev;
    prev = cur;
    cur = post;
  }
  // 此时cur 已经到null节点，prev指针刚好是翻转后的头节点
  return prev;
}
```

#### 复杂度

Time: 如果链表长度为n，那么需要有n个节点需要检查翻转 => O(n)

Space: 常量空间消耗，三根指针 => O(1)

### 递归

```js
var reverseList = function(head) {
  /**
   * base case 是 tail指针
   * 这样做的目的：
   * 1. 正确获得新链表的头部 -> tail Node
   * 
   * 2. 直接从 Last but one tail Node 开始翻转
   *   能够做到既控制cur.next节点的指针，以及切断当前节点的指针
   *  */  
  if(head === null || head.next === null) {
    return head
  }
  let newHead = reverseList(head.next);
  // 在当前层做点什么事儿，就能将小问题解决？ 
  /**
   * 1.翻转操作
   * 2.切断原指针
   *  */ 
  head.next.next = head;  
  head.next = null;
  return newHead;
};
```

#### 复杂度

Time: 递归树的高度为 n 层，在每层操作的时间为O(1),所以总时间为 => O(n)

Space: n层递归树 => O(n)