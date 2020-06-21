/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  /**
   * base case 是 tail指针
   * 这样做的目的：
   * 1. 正确获得新链表的头部 -> tail Node
   * 
   * 2. 直接从 Last but one tail Node 开始翻转
   *   能够做到既控制cur.next节点的指针，以及切断当前节点的指针
   *  */
  if (head === null || head.next === null) {
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

// ！循环版
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