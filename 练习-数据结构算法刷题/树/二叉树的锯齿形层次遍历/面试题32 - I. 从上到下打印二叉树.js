/**
 * 利用队列的顺序特点，将root放置队列中，一次expend 将generator 的节点append 到队列中
 * 这样既可有序的将节点按层打印
 * @param {*} root 
 */
var levelOrder = function(root) {
  if(!root) {
    return [];
  }
  // 用于保存结果的数组，和内部expend + generator 的队列
  var res = [],_q = [root],curNode;
  // 只要队列还有元素，说明树还没有遍历完毕
  while(_q.length){
    // expend 操作
    curNode = _q.shift();
    res.push(curNode);
    // generator操作
    curNode.left && _q.push(curNode.left);
    curNode.right && _q.push(curNode.right);
  } 
  return res;
};