/*
	循环迭代版：三指针 逐一向后移动
	- 为了不失去对链表头的所有权，我需要保存1的next指针，于是使用nextNode变量进行保存

*/
function reverse(Linked) {
  if (Linked == null || Linked.next === null) {
    return;
  }
  var prev = null,
      cur = Linked;
  while(cur !== null) {
    var nextNode = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;
  }
  return prev;
}

// recursion版本
/**
 * 1.通过递归拿到新链表的头部
 * 2.一步一步翻转，注意需要置空一根指针
 * @param node
 * @returns {*}
 */
function reverseLinkList(node) {
  // base case;
  if(node === null || node.next === null) {
    return node;
  }
  // 拿到 newHead 也就是链表的尾巴，需要保存当前的位置指针，作为返回值，使得能够拿到正确的链表头部
  var newHead = reverseLinkList(node.head);
  // 一步一步的翻转
  node.next.next = node;
  // 置空防止循环指向
  node.next = null;
  return newHead
}
