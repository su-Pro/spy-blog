## 二叉树的中序遍历

[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

### 描述

给定一个二叉树，返回它的中序 遍历。

示例:

```
输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]
```

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

### 思路

- 维护stack：保存当前层的root节点
- 将root移动至左子树
  -  如果当前层root为null，说明已经**需要往回走**
  -  从stack中取出栈顶元素（往回走的第一层）
  -  将root 设置为弹出的栈顶元素的右子树
- 当整个stack为空时，并且当前root为null 退出

### 代码

```js
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
```

#### 复杂度

Time: 如果一棵树有n个节点，那么需要入栈、出栈n次，并存储n次。因此 => O(n)

Space: O(n)
