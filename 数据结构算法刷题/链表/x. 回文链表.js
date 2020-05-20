/*
var isPalindrome = function (head) {
  if (head === null || head.next === null) return true;
  // 快指针，慢指针找中点
  let cur = head;
  let reversedHead = null;
  let prev = null;
  while (head !== null && head.next !== null) {
    prev = cur;
    cur = cur.next;
    head = head.next.next;
    prev.next = reversed;
    reversed = prev;
  }
  // 此时的cur即为中点，但是需要处理奇数的情况
  if (head) {
    cur = cur.next
  }
  while (mid) {
    if (reversed.val !== mid.val) return false
    reversed = reversed.next
    mid = mid.next
  }
  return true
}
*/

// 数组做法，只需要将链表存储到数组中，对数组进行出栈 和出队，判断两个元素是否相同。
var arr_isPalindrome = function (head) {
  var arr = [];
  while(head !== null){
    arr.push(head.val);
    head = head.next;
  }
  // 进行出栈出队比较
  while(arr.length > 1) {
    if(arr.pop() !== arr.shift) return false;
  }
  return true;
}