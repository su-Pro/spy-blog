/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
 */
function isSymmetic (root) {
    if(!root) {
        return true;
    }
    return helper(root,root);
}
function helper (left,right) {
    if (!left && !right) {
        return true;
    }
    if (!left || !right) {
        return false;
    }
    if (left.value !== right.value) {
        return false;
    }
    // 必须左边的左 和 右边的右 相等，<且> 左边的右 和 右边的左 相等 才满足。
    return helper(left.left,right.right) && helper(left.right,right.left);
}
// @lc code=end