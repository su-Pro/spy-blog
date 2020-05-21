var reverseBetween = function(head, m, n) {
  if( m === 1) {
    // 找到目标元素 进入翻转阶段
    return helper(head,n);
  }
    // 利用题目给定条件的特点
  head.next = reverseBetween(head.next,m - 1,n - 1);
    // 返回原始的head
  return head;

  function helper (head,n) {
//  边界条件
  if(n === 1) {
      // 记录n的下一个tail指针
    var tailNextNode = head.next;  // 反模式
    return head;
  }
//  返回给翻转前的指针进行拼接
  let _head = helper(head.next,n - 1);
  // 完成翻转操作
  _head.next.next = _head;
  _head.next = tailNextNode;
  return _head;
}
};