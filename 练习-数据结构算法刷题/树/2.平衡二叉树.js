/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
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
 *  根据定义获得思路：任意根节点的左子树和右子树高度差不得大于1，每一个节点都要hold。
 *  1. 定义getHeight函数，计算diffHeight 大于1 直接返回false
 *  2. 判断左子树和右子树同时为平衡二叉树，同时满足
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    if (root == null) {
        return true;
    }
    var diff = Math.abs(getHeight(root.left) - getHeight(root.right));
    if (diff > 1) {
        return false;
    }
    return isBalanced(root.left) && isBalanced(root.right);
};
// 叶子节点高度为0 利用递归逐层向上计算累加，获取子节点的最高位置 + 1
var getHeight = (root) => {
    // base case
    if(root === null) {
        return 0;
    }
    let lHeight = getHeight(root.left);
    let rHeight = getHeight(root.right);
    return Math.max(lHeight,rHeight) + 1;
}







// @lc code=end
