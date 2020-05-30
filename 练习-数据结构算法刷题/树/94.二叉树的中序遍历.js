/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/
 *
 * algorithms
 * Medium (69.21%)
 * Likes:    342
 * Dislikes: 0
 * Total Accepted:    85.2K
 * Total Submissions: 123.1K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的中序 遍历。
 * 
 * 示例:
 * 
 * 输入: [1,null,2,3]
 * ⁠  1
 * ⁠   \
 * ⁠    2
 * ⁠   /
 * ⁠  3
 * 
 * 输出: [1,3,2]
 * 
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  var _stack = [], curNode, res = [];
  while (root || _stack.length > 0) {
    // 只往下压栈
    while (root) {
      _stack.push(root);
      root = root.left;
    }
    // 到🍃节点,向上backTack后打印节点
    curNode = _stack.pop();
    res.push(curNode.val);
    // 移动到右边
    root = curNode.right;
  }
  return res;
};



// @lc code=end

