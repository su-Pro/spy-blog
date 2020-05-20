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
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 *  min = Number.MIN_VALUE, max = Number.MAX_VALUE
 * 逻辑都hold但是代码实现出现了巨大问题
 * 1.如何能够传递参数，并且不影响递归?函数套递归函数。
 * 2.注意在BST树中，如果出现相同节点判断为false
 * 3.正无穷 和 MIN,MAX的区别？？？ 为什么换成MIN和MAX我就ac不了[0]了呢？
 * 
 */

var isValidBST = function (root) {
    var helper = function (root, min, max) {
        if (!root) {
            return true;
        }
        if (root.val >= max || root.val <= min) {
            return false;
        }
        return helper(root.left, min, root.val) && helper(root.right, root.val, max);
    }
    return helper(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
};


// @lc code=end