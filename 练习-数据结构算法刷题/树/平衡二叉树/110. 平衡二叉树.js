/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

function isBalanced(root) {
  if (root === null) {
    return true;
  }
  // 获取高度差并进行判断是否平衡，此时递归计算高度，o(n);
  var hDiff = Math.abs(getHeight(root.left) - getHeight(root.right));
  if (hDiff > 1) { return false };
  // 左子树、右子树必须同时满足才能说明是平衡二叉树
  return isBalanced(root.left) && isBalanced(root.right);
}
function getHeight(root) {
  if (root === null) {
    return 0;
  }
  return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
}
