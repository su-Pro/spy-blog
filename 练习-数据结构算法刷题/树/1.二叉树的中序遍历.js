/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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

function inOrder(root) {
  if (root === null) {
    return root;
  }
  inOrder(root.left)
  console.log(root.value)
  inOrder(root.right)
}


function _inOrder (root) {
  var _stack = [],curNode;
  while(root || _stack.length > 0){
    // 只往下压栈
    while(root) {
      _stack.push(root);
      root = root.left;
    }
    // 到🍃节点,向上backTack后打印节点
    curNode = _stack.pop();
    console.log(curNode);
    // 移动到右边
    root = curNode.right;
  }
}





