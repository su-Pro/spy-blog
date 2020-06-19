/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// 核心：
// - 构建虚拟节点
// - 补0
// - 边界情况
var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(0);
  let _run = dummy, sum = payload = 0;
  while (l1 || l2) {
    let x = l1 ? l1.val : 0;
    let y = l2 ? l2.val : 0;
    sum = x + y + payload;
    payload = parseInt(sum / 10);
    _run.next = new ListNode(sum % 10);
    _run = _run.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  if (payload > 0) {
    _run.next = new ListNode(payload)
  }
  return dummy.next;

};
