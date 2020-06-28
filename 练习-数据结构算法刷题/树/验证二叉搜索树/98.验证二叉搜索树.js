/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var isValidBST = function (root) {
  /**
   *  满足如下条件：
   *  - root 为null 返回true
   *  - 当前root.val 超过upperBound,或者 小于lowerBound 返回false
   *  
   *  - 左子树承接upperBound,右子树承接lowerBound
   *  - 最终返回左子树和右子树同时满足的case
   *
   * @param {*} root
   * @param {*} lowerBound
   * @param {*} upperBound
   */
  function helper(root, lowerBound, upperBound) {
    if (root === null) {
      return true;
    }
    if (root.val >= upperBound || root.val <= lowerBound) {
      return false;
    }
    return helper(root.left, lowerBound, root.val) && helper(root.right, root.val, upperBound)
  }
  return helper(root, -Infinity, +Infinity)
};


// @lc code=end