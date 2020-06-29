/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */


/**
 * case 1: root === null => 0
 * 
 * case 2: root.val < L  => root.right
 * 
 * case 3: root.val > R  => root.left;
 * 
 */
var rangeSumBST = function (root, L, R) {
  let sum = 0;
  function _helper(root) {
    if (root === null) return;
    if (root.val >= L && root.val <= R) {
      // 不剪枝
      sum += root.val;
      _helper(root.left)
      _helper(root.right)
    } else if (root.val < L) {
      // 走向另外一条枝，相当于剪掉当前枝
      _helper(root.right)
    } else if (root.val > R) {
      _helper(root.left)
    }
  }
  _helper(root)
  return sum;
};