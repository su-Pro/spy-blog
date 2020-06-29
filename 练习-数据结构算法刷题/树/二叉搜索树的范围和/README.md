## 二叉搜索树的范围和

[938. 二叉搜索树的范围和](https://leetcode-cn.com/problems/range-sum-of-bst/)

### 描述

给定二叉搜索树的根结点 root，返回 L 和 R（含）之间的所有结点的值的和。

二叉搜索树保证具有唯一的值。

 

示例 1：

```js
输入：root = [10,5,15,3,7,null,18], L = 7, R = 15
输出：32
```

示例 2：

```js
输入：root = [10,5,15,3,7,13,18,1,null,6], L = 6, R = 10
输出：23
```

提示：

树中的结点数量最多为 10000 个。
最终的答案保证小于 2^31。


### 思路

最笨的方法：对树进行前序遍历，如果当前节点满足要求（L R）之间，加上即可，不满足什么都不做。

优化：利用BST的特性：

- 如果当前节点已经小于L,那么他的所有左子树都不是满足要求的，直接走向右子树即可。（剪枝）
- 如果当前节点已经大于R，那么他的所有右子树都不是满足要求的，直接走向左子树即可。（剪枝）

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
 * @param {number} L
 * @param {number} R
 * @return {number}
 */

/**
 * case 1: root.val 满足条件 => 累加
 * 
 * case 2: root.val < L  => root.right
 * 
 * case 3: root.val > R  => root.left;
 * 
 */
var rangeSumBST = function(root, L, R) {
  let sum = 0;
  function _helper (root) {
    if(root === null) return;
    if(root.val >= L && root.val <= R) {
      // 不剪枝
      sum += root.val;
      _helper(root.left)
      _helper(root.right)
    }else if(root.val < L) {
      _helper(root.right)
    }else if(root.val > R) {
      _helper(root.left)
    }
  }
  _helper(root)
  return sum;
};
```


#### 复杂度

Time: 最坏情况要遍历所有的节点，因此时间复杂度为 => O(n)

Space: O(height)
