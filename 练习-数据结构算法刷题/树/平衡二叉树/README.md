## 平衡二叉树

[110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

### 描述

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

**一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。**

示例 1:

```
给定二叉树 [3,9,20,null,null,15,7]

    3
   / \
  9  20
    /  \
   15   7

返回 true 。
```

示例 2:

```
给定二叉树 [1,2,2,3,3,null,null,4,4]

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4

返回 false 。
```

### 思路

考察平衡二叉树的定义：
  - 每个左子树和右子树的高度差小于等于1
  - 递归计算每个节点的高度（保证每个子树满足规则）
  - 比较左子树和右子树的高度差

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
 * @return {boolean}
 */

function isBalanced(root) {
  if (root === null) {
    return true;
  }
  // 获取高度差并进行判断是否平衡，此时递归计算高度，o(n);
  var hDiff = Math.abs(getHeight(root.left) - getHeight(root.right));
  if (hDiff > 1) { return false };
  // 左子树、右子树必须同时满足才能说明是平衡二叉树
  return isBalanced(root.left) && isBalanced(root.right);
}
function getHeight(root) {
  if (root === null) {
    return 0;
  }
  return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
}

```

#### 复杂度

Time: 递归树一共是logn层，在每层需要进行计算高度O(n),因此 => O(nlogn)

Space: 一共需要logn层的递归，所以 => O(height)
