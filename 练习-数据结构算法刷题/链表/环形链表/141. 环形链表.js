/**
 * Definition for singly-linked list.
 * function Listhead(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {Listhead} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (head === null || head.next === null) {
    return false;
  }
  var fast = head.next.next;
  var slow = head;
  while (fast && fast.next) {
    // meet
    if (slow == fast) {
      return true;
    }
    fast = fast.next.next;
    slow = slow.next;
  }
  // 此时快指针已经到尾部或者出链表
  return false;
};