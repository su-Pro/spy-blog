## 验证二叉搜索树

[98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

### 描述

给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。

示例 1:

```
输入:
    2
   / \
  1   3
输出: true
```

示例 2:

```
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
```

解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。

### 思路

  使用一个区间来卡当前节点，举例：

  ```
  输入:
    5
   / \
  1   7
     / \
    6   8

只要当前节点的值在这个区间内我们就认为满足BST的要求，反之不满足要求。

root:5 => (-Infinity,Infinity)

当已节点1为root时，满足条件的区间为：
root:1 => (-Infinity,5]

或者当前已7为root时，需要满足的条件区间为：
root:7 => [5,Infinity)

最后一个例子：已6为root：
root:6 => [5,7]

```

通过上面的归纳，我们可以利用一个辅助函数来递归当前root的左子树、右子树（必须左右都满足才能够满足整棵树），每次更新区间的upperbound和lowerbound
  - base case：
    - 如果 root === null 返回true
    - 如果 root.val 不在返回内，返回false
  - recusion fn:
    - 左子树upperBound变成当前root的值，lowerBound承接上层。
    - 右子树upperBound承接上层，lowerBound变成当前root的值。

当遍历完整棵树后，如果有一个节点不满足，那么最终会返回false。

### 代码

```js
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
 *     this.left = this.right = null
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var isValidBST = function (root) {
  /**
   *  满足如下条件：
   *  - root 为null 返回true
   *  - 当前root.val 超过upperBound,或者 小于lowerBound 返回false
   *  
   *  - 左子树承接upperBound,右子树承接lowerBound
   *  - 最终返回左子树和右子树同时满足的case
   *
   * @param {*} root
   * @param {*} lowerBound
   * @param {*} upperBound
   */
  function helper(root, lowerBound, upperBound) {
    if (root === null) {
      return true;
    }
    if (root.val >= upperBound || root.val <= lowerBound) {
      return false;
    }
    return helper(root.left, lowerBound, root.val) && helper(root.right, root.val, upperBound)
  }
  return helper(root, -Infinity, +Infinity)
};


// @lc code=end
```

#### 复杂度

Time: 遍历整颗树，所以 => O(n)

Space: 递归树的深度为当前树的高度 => O(height)
