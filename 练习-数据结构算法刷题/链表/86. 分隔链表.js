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

/**
 * 构造虚拟链表l1 l2
 * 
 * l1：（获取所有比x小的节点） -> l2
 * l2: （所有大于等于x的节点）
 * 
 * 
 */
var partition = function (head, x) {
  if (head === null || head.next === null) {
    return head;
  }
  let dummyl1 = new ListNode(-1),
    dummyl2 = new ListNode(-1);

  let dummyRun1 = dummyl1,
    dummyRun2 = dummyl2;

  while (head) {
    if (head.val >= x) {
      // dummyl2
      dummyRun2.next = head;
      dummyRun2 = dummyRun2.next
    } else {
      // dummyl1
      dummyRun1.next = head;
      dummyRun1 = dummyRun1.next
    }
    head = head.next
  }
  // post process
  // 首先将dummyRun2的尾巴置空，因为上面是直接拷贝的节点，可能会导致链表出环
  // 将dummyRun1 => !(dummyl2.next)
  // ！返回dummyl1.next
  dummyRun2.next = null
  dummyRun1.next = dummyl2.next;
  return dummyl1.next
}


