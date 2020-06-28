/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 *
 * https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (40.65%)
 * Likes:    184
 * Dislikes: 0
 * Total Accepted:    41.5K
 * Total Submissions: 102.1K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最小深度。
 * 
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * N
 * 说明: 叶子节点是指没有子节点的节点。
 * 
 * 示例:
 * 
 * 给定二叉树 [3,9,20,null,null,15,7],
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 * 返回它的最小深度  2.
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  var global_min = Number.MAX_SAFE_INTEGER;
  if (root == null) {
    return 0;
  }
  if (root.left == null && root.right == null) {
    return 1;
  }
  if (root.left != null) {
    global_min = Math.min(minDepth(root.left), global_min);
  }
  if (root.right != null) {
    global_min = Math.min(minDepth(root.right), global_min);
  }
  return global_min + 1;

};
// @lc code=end