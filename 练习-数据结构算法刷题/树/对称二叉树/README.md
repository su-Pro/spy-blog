## 对称二叉树

[101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

### 描述

给定一个二叉树，检查它是否是镜像对称的。

 

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

```
    1
   / \
  2   2
 / \ / \
3  4 4  3
 
```

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

```
    1
   / \
  2   2
   \   \
   3    3
```

### 思路

通过观察可以总结如下规律：

- 如果左子树、右子树同时不存在 => true
- 如果左子树和右子树有一个不存在 => false
- 如果左子树和右子树val值不相同 => false

因此只需要遍历整棵树，保证每层root的：

- 左子树的左子树 和 右子树的右子树满足上述条件
- 左子树的右子树 和 右子树的左子树满足上述条件

使用一个辅助递归函数来帮助我们检查以root为节点的左子树和右子树即可。

### 代码

```js
/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 */
function isSymmetic (root) {
    if(!root) {
        return true;
    }
    return helper(root,root);
}
function helper (left,right) {
    if (!left && !right) {
        return true;
    }
    if (!left || !right) {
        return false;
    }
    if (left.value !== right.value) {
        return false;
    }
    // 必须左边的左 和 右边的右 相等，<且> 左边的右 和 右边的左 相等 才满足。
    return helper(left.left,right.right) && helper(left.right,right.left);
}
// @lc code=end
```

#### 复杂度

Time: 需要检查所有的节点，因此最坏的情况下需要 => O(n)

Space: 递归树的深度为当前树的高度 => O(height)
