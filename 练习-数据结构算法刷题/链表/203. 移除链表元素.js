/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */


/**
 * 
 * 构造一个新链表，已当前node头结点
 * 
 * 首先处理边界情况：如果链表头部元素值等于val
 * 
 * 随后只需要让node节点扫描链表，当发现节点值等于val后，让当前runPoint 指向 node.next
 * 
 * 如果当前节点值不等于val，只需要让当前runPoint 站在 node 上即可。
 * 
 * 通过runPoint 即可实现操作head 链表移除制定元素。
 * 
 * 
 */
var removeElements = function (node, val) {
  var head = node;
  var runPoint = head;
  while (head != null && head.val === val) {
    head = head.next;
  }
  while (node != null) {
    if (node.val === val) {
      runPoint.next = node.next;
    } else {
      runPoint = node;
    }
    node = node.next;
  }
  return head;
}
