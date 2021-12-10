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

var addTwoNumbers = function (l1, l2) {
  let dummyNode = new ListNode(0);
  let _run = dummyNode, sum = payload = 0;
  while (l1 || l2) {
    // 遇null 补 0 操作
    let x = l1 ? l1.val : 0;
    let y = l2 ? l2.val : 0;
    let sum = x + y + payload;
    _run.next = new ListNode(sum % 10);
    _run = _run.next;
    payload = parseInt(sum / 10)

    // 常规操作，保证“一对一对”进行
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  // post process
  if (payload > 0) {
    _run.next = new ListNode(payload)
  }
  return dummyNode.next;
};
