/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
function preOrder (root) {
  // base case 
  if(root === null) {
    // back track
    return root; 
  }
  console.log(root.value);
  preOrder(root.left) // 向下压栈
  preOrder(root.right) 
}


function _preOrder(root) {
  let _stack = [],curNode;
  while(root || _stack.length > 0) {
    // 压栈,并向下移动
    while(root) {
      console.log(root.value);
      _stack.push(root);
      // 向下移动
      root = root.left;
    }
    // backTack 到右边，注意此时_stack的结构以发生改变
    curNode = _stack.pop();
    root = curNode.right;
  }
}















