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

/**
 * - 维护stack：保存当前层的root节点
 * - 将root移动至左子树
 *  -  如果当前层root为null，说明已经需要往回走
 *  -  从stack中取出栈顶元素（往回走的第一层）
 *  -  将root 设置为弹出的栈顶元素的右子树
 * - 当整个stack为空时，并且当前root为null 退出
 */
var inorderTraversal = function (root) {
  var _stack = [], curNode, res = [];
  while (root || _stack.length > 0) {
    // 只往下压栈
    while (root) {
      _stack.push(root);
      root = root.left;
    }
    // 到🍃节点,向上backTack后打印节点
    curNode = _stack.pop();
    res.push(curNode.val);
    // 移动到右边
    root = curNode.right;
  }
  return res;
};