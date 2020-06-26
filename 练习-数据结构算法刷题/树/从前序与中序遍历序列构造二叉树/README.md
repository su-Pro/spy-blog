## 从前序与中序遍历序列构造二叉树

[105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

### 描述

根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

```
    3
   / \
  9  20
    /  \
   15   7
```

### 思路

- 利用前序遍历的特点：队列首个元素为当前树的root节点
- 利用中序遍历的特点：已当前root为分界线，左，右分别是各自的子树

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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null
  }
  const rootVal = preorder[0]
  const resultRoot = new TreeNode(rootVal);
  // 标识在inorder中的位置，以及左子树的个数
  let i = 0;
  for(;i < inorder.length;++i){
    if(inorder[i] === rootVal){
      break
    }
  }
  resultRoot.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i))
  resultRoot.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1))
  return resultRoot
};
```

#### 复杂度

Time: O(n)

Space: O(n)
