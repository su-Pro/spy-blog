/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (root === null || root.length < 0) {
    return []
  }
  let res = [],
    queue = [root];
  while (queue.length > 0) {
    // 用于存放所有展开的内容
    // 准备打印的每个数组
    let neightBor = [],
      print = [];
    let len = queue.length;
    for (let i = 0; i < queue.length; i++) {
      // expand
      print.push(queue[i].val);
      // generator
      if (queue[i].left) {
        neightBor.push(queue[i].left)
      }
      if (queue[i].right) {
        neightBor.push(queue[i].right)
      }
    }
    queue = neightBor
    if (res.length % 2 !== 0) {
      res.push(print.reverse())
      continue;
    }
    res.push(print)
  }
  return res;
};