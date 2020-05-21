/*
 * @lc app=leetcode.cn id=669 lang=javascript
 *
 * [669] 修剪二叉搜索树
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
 * @param {number} L
 * @param {number} R
 * @return {TreeNode}
 */
var trimBST = function (root, L, R) {
    // 不是很明白返回新的树怎么处理，是让子树为null?
};

// 修改一下题目，返回[k1,k2]之间的升序节点值
// 最笨方法，inorder遍历，然后在k1和k2之间的节点保留，时间复杂度为O(N);
var tirmBST = function (root, k1, k2, arr = []) {
    if (!root) {
        return;
    }
    if (root.value > k1) {
        tirmBST(root.right, k1, k2, arr)
    }
    if (root.value >= k1 && root.value <= k2) {
        arr.push(root.value);
    }
    if (root.value < k2) {
        tirmBST(root.left, k1, k2, arr);
    }
    return arr;
}
// @lc code=end