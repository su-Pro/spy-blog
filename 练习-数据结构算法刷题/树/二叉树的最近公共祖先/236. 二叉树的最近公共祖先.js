/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // base case
  if (root === null || root === p || root === q) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  // recusion rule
  // case 1: 都没有命中
  if (left === null && right === null) return null;
  // case 3: 右无，左命中其中一个节点
  if (left === null) return right;
  // case 4: 左无，右命中其中一个节点
  if (right === null) return left;
  // case 2: 左右都有值，当前root就是最近公共祖先
  return root;
};