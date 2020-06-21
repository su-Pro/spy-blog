/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
  let post;
  if (m === 1) {
    return reverse(head, n)
  }
  head.next = reverseBetween(head.next, m - 1, n - 1);
  return head;
  function reverse(head, n) {
    if (n === 1) {
      post = head.next;
      return head;
    }
    let newHead = reverse(head.next, n - 1);
    head.next.next = head;
    head.next = post;
    return newHead;
  }

};