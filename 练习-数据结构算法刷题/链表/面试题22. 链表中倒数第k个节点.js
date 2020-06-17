/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/** 
 * 翻转链表的变形
 * 
 * 1. 压 到 tail.next (null) 时，初始化n = 0；
 * 2. 每返回经过一个节点，n++
 * 3. 当n === k 时返回此节点
 * 
 */

var getKthFromEnd = function (head, k) {
  let res;
  helper(head, 0);
  function helper(head, index) {
    if (head.next === null) {
      if (k === 1) res = head;
      return 1;
    }
    let num = 1 + helper(head.next, index)
    console.log(num)
    if (num === k) res = head;
    return num;
  }
  return res;
};

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */


/**
 * 双指针走法
 * 
 * 构造两个指针，i 和 j
 * 
 * j 先走，当走了k步后，i走，当j到达尾部时，i的值就是目标。
 * 
 * 
 */
var getKthFromEnd = function (head, k) {
  let i = head, j = head;
  // 让j先走k步
  for (let i = 0; i < k; i++) {
    j = j.next
  }
  // i和j一起走，当j到达尾部null时，返回i
  // 之所以让j 走到null，是因为题目给的hint：最后个非null元素，是倒数第一个。

  while (j) {
    j = j.next;
    i = i.next;
  }
  return i;
};