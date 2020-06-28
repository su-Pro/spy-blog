/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N叉树的层序遍历
 *
 * https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (65.54%)
 * Likes:    84
 * Dislikes: 0
 * Total Accepted:    20.9K
 * Total Submissions: 31.9K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。
 * 
 * 例如，给定一个 3叉树 :
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 返回其层序遍历:
 * 
 * [
 * ⁠    [1],
 * ⁠    [3,2,4],
 * ⁠    [5,6]
 * ]
 * 
 * 
 * 
 * 
 * 说明:
 * 
 * 
 * 树的深度不会超过 1000。
 * 树的节点总数不会超过 5000。
 * 
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 * 
 */

//  XXX: 如果不给children 接口，怎么办？
// DFS解法？

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  var res = [], _q = [root], len = 0, temp, cur = null;
  while (_q.length > 0) {
    // 获取当前层的节点个数，方便控制循环
    len = _q.length;
    // 初始化当前层的数组
    temp = [];
    // generator操作
    for (let i = 0; i < len; i++) {
      // 从左按顺序取，如果是从右到左打印，则pop
      cur = _q.shift();
      temp.push(cur.val)
      // expand操作
      _q.push(...cur.children);
    }
    // 把当前层push到数组中
    res.push(temp);
  }
  return res;
};
// @lc code=end

