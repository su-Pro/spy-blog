/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
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



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  //到尾部后，处理两种后续情况
  if (!l1) return l2;

  if (!l2) return l1;

  if (l1.val <= l2.val) { // 谁小移谁，并进行拼接返回
    l1.next = mergeTwoLists(l1.next, l2)
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2;
  }
}

