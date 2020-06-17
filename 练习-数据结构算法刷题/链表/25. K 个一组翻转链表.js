/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (head === null || head.next === null) {
    return head;
  }
  let tail = head;
  // 1. 找到tail指针，如果数量不足，则直接返回当前组的head也就是5(第三组的开始)
  for (let i = 0; i < k; i++) {
    if (tail === null) {
      return head;
    }
    tail = tail.next;
  }
  // 此时的tail指针在3，需要将[head：1,tail：3)区间元素进行翻转
  let newHead = reverse(head, tail);
  // 此时的head指针在1，需要将1指向第二组翻转完毕的内容
  head.next = reverseKGroup(tail, k);
  return newHead;
  function reverse(head, tail) {
    let post = null;
    let prev = null;
    // 左开右闭，到tail就可以停下了
    while (head != tail) {
      post = head.next;
      head.next = prev;
      prev = head;
      head = post;
    }
    return prev;
  }
}
