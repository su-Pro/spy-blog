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
 * 
 * 重点：考虑边界情况
 * - 删除元素在头部
 * - 删除元素在尾部？ 
 * 
 * 定义两个指针，i 是 目标节点前一个元素，j 是 目标节点元素
 * 
 * 保存j -> next 的元素为tail
 * 
 * 将i -> 指向 tail
 * 
 */
var deleteNode = function (head, val) {
  if (head === null) {
    return;
  }
  let i = head, j = head.next;
  // case1:
  if (head.val === val) {
    return j;
  }
  while (j.val !== val) {
    i = i.next
    j = j.next
  }
  // 此时j一定是目标节点,切断即可
  let tail = j.next;
  i.next = tail;
  return head;
};