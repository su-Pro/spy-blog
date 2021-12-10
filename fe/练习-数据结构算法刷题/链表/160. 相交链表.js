/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

/**
 * 让 l1 和 l2 拼接起来，保证数量上的相等
 * cur1
 * 
 * 4 -> 1 -> 8 -> 4 -> 5 ->Null -> 5 -> 0 -> 1 -> 8 -> 4 -> 5
 * 5 -> 0 -> 1 -> 8 -> 4 ->Null -> 5 -> 4 -> 1 -> 8 -> 4 -> 5
 * 
 * cur2
 * 为了避免成环，我们需要两个移动指针，cur1 cur2
 * 
 * 当cur1 和 cur2 相等时（不是值相同），返回当前cur1（cur2也行）
 * 
 * 
 */
var getIntersectionNode = function (headA, headB) {
  let cur1 = headA, cur2 = headB;

  // 当第一次l1 + l2 遍历完毕后
  // 此时 cur1 为空，本要再指向headA，此时 cur2 也为空，本要再指向headB
  // 但不要忘了循环条件，因此这次循环在判断相等（都为null）后，就已经结束


  while (cur1 !== cur2) {
    cur1 = (cur1 !== null) ? cur1.next : headA;
    cur2 = (cur2 !== null) ? cur2.next : headB;
  }
  // cur1 === cur2 || cur1 === null === cur2
  return cur1;
};