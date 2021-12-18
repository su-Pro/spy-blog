
var reorderList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let first = head;
  // 1. 找到中点
  let mid = findMiddleNode(first);
  let second = mid.next;
  // 切断first的尾巴
  mid.next = null;
  // 2. 翻转链表
  let reversedSecond = reverseList(second)
  // 3. merge
  let result = merge(first, reversedSecond);
  return result
}

function findMiddleNode(node) {
  if (node === null || node.next === null) {
    return node;
  }
  let slow = node, fast = node;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

function reverseList(node) {
  if (node === null || node.next === null) {
    return node;
  }
  // let newHead = reverseList(node.next);
  // node.next.next = node;
  // node.next = null;
  // return newHead
  let prev = null, cur = node, post;
  while (cur !== null) {
    post = cur.next;
    cur.next = prev;
    prev = cur;
    cur = post;
  }
  return prev;
}

function merge(l1, l2) {
  if (l1 === null) {
    return l2
  } else if (l2 === null) {
    return l1
  }
  let dummyHead = new ListNode(-1);
  let runPoint = dummyHead;
  let runl1 = l1;
  let runl2 = l2;
  while (runl1 !== null && runl2 !== null) {
    runPoint.next = runl1;
    runl1 = runl1.next;
    runPoint = runPoint.next;
    runPoint.next = runl2;
    runl2 = runl2.next;
    runPoint = runPoint.next;
  }
  /**
   * 因为是取中间节点
   * 所以 l1.size >= l2.size     
   * 因此 有剩余一定是l1
   */
  if (runl1 !== null) {
    runPoint.next = runl1;
  }
}