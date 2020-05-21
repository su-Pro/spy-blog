/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/
 *
 * algorithms
 * Hard (69.08%)
 * Likes:    195
 * Dislikes: 0
 * Total Accepted:    42K
 * Total Submissions: 60.7K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 后序 遍历。
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
 * 输出: [3,2,1]
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
var postorderTraversal = function(root,arr = []) {
    if(!root){
        return arr;
    }
    postorderTraversal(root.left,arr);
    postorderTraversal(root.right,arr);
    arr.push(root.val)
    return arr;
};


function _postOrder = function () {
	let _stack = [];
	while(root || _stack.length > 0){
		if(root.left) {
			_stack.push(root);
			root = root.left;
		}else if(root.right) {
			_stack.push(root);
			root = root.right;
		}else {
			console.log(root.value);
			root = _stack.pop();
			// 此时的root是叶子节点的root
			if(root.left) {
				root.left = null
			}else if(root.right){
				root.right = null
			}
		}
	}
}
