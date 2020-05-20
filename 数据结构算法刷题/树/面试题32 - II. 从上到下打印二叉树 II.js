/**
 * 额外需要一个变量保存当前队列中需要被expend的个数，当他等于0时说明已经操作完毕
 * @param {*} root 
 */
var levelOrder = function(root) {
  let res = [],num,_q = [root],level = 0,curNode;
  while(_q.length) {
    // 保存当前队列中的个数
    num = _q.length;
    // 每expand一个元素，就-- 当为0 时退出循环
    while(num--){
      // 保存到当前层的数组中
      res[level] = [];
      curNode = _q.shift();
      res[level].push(curNode.val);
      // generator 元素
      curNode.left && _q.push(curNode.left)
      curNode.right && _q.push(curNode.right)
    }
    // 每次操作完毕，移动到下一层
    level++
  }
  return res;
};