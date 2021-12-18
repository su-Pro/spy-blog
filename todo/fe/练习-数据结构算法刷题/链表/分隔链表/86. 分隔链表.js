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
   *  */
  dummyRun2.next = null
  dummyRun1.next = dummyTwo.next;
  return dummyOne.next
}


