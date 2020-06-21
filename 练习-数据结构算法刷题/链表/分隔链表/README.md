## 面试题 02.04. 分割链表

[面试题 02.04. 分割链表](https://leetcode-cn.com/problems/partition-list-lcci/)

## 描述

编写程序以 x 为基准分割链表，使得所有小于 x 的节点排在大于或等于 x 的节点之前。如果链表中包含 x，x 只需出现在小于 x 的元素之后(如下所示)。分割元素 x 只需处于“右半部分”即可，其不需要被置于左右两部分之间。

示例:

输入: head = 3->5->8->5->10->2->1, x = 5
输出: 3->1->2->10->5->5->8


## 思路

关键点：虚拟链表

- 构造两个虚拟节点（dummy head）
- 比较链表中每个节点和x的关系，将链表中小的值加入到ListOne，大的值加入到listTwo
  - if current.value < target : listOne.append(current)
  - else current.value > target : listTwo.append(current)
- 合并两个链表，同时cut掉listTwo的尾结点，防止成环
- listTwo.next = null

## 代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */

var partition = function (head, x) {
  if (head === null || head.next === null) {
    return head;
  }
  let dummyOne = new ListNode(-1), dummyTwo = new ListNode(-1);

  let dummyRun1 = dummyOne, dummyRun2 = dummyTwo;

  while (head !== null) {
    if (head.val >= x) {
      // append to 2
      dummyRun2.next = head;
      dummyRun2 = dummyRun2.next
    } else {
      dummyRun1.next = head;
      dummyRun1 = dummyRun1.next
    }
    head = head.next
  }
  /**
   * post process
   * 1. 首先将dummyRun2的尾巴置空
   * 2. 合并两个链表，注意是 dummyRun -> "dummyTwo.next"
   * 3. "返回dummyOne.next"
   */ 
  
  dummyRun2.next = null
  dummyRun1.next = dummyTwo.next;
  return dummyOne.next
}

```

Time:链表中有n个节点需要compare => O(n)

Space: 只有两个dummyHead，没有动用其他空间 => O(1)
