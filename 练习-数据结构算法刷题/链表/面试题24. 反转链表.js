/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// var reverseList = function(head) {
//   // 最后翻转后的节点，就是base case
//   if(head === null || head.next === null) {
//     return head
//   }
//   let newHead = reverseList(head.next);
//   // 在 head === 4 这个节点层 （也就是base case 返回后的上一层） 
//   // 交换节点 4 -> null 5 -> 4
//   head.next.next = head;
//   head.next = null;
//   return newHead;
// };

/**
 * 循环版本
 *  3个指针， prev = null cur = 1 post = cur的下一个节点
 *  
 *  目的：将 cur 和 prev 进行交换，而后让 prev 站到 cur位置， cur 站到 post的位置上。
 *  
 *  
 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let prev = null, cur = head, post;
  while (cur) {
    post = cur.next;
    cur.next = prev;
    prev = cur;
    cur = post;
  }
  return prev;
}