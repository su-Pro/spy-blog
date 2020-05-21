/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层次遍历
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root || root.length == 0) {
        return [];
    }
    var result = [];
    var queue = [root];
    while (queue.length != 0) {
        var print = [];
        var size = queue.length;
        var neighbour = []; //因为要不断的check 队列中的元素，进行expend。所以要保存当前的expend后的所有节点，方便下一次进行chenk.

        for (var i = 0; i < size; i++) {
            print.push(queue[i].val);
            if (queue[i].left != null) {
                neighbour.push(queue[i].left);
            }
            if (queue[i].right != null) {
                neighbour.push(queue[i].right);
            }
        }
        result.push(print);
        // 实现expend 和generate两个动作
        queue = neighbour;
    }
    return result;
};

// @lc code=end