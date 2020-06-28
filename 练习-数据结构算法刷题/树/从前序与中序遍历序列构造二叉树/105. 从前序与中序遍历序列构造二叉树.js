/**
 * 利用pre 和 in 的特点：
 * pre： 第一个元素是当前序列中的root
 * in：  左子树 | root 右子树
 * 
 * 1. 在前序遍历中找到root, 在中序中找到对应的root 和 左子树节点个数
 * (变量i 的物理意义：标识根节点在中序中的位置，左子树数量)
 * 2. 通过中序遍历划分左子树和右子树
 * 
 * 注意点：slice API： 左包含又不包含，截取时注意边界。
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }
  let curRoot = preorder[0];
  const newRoot = new Tree(curRoot);
  // - 左子树数量 - curRoot 在 inorder中的偏移
  let i = 0;
  for (; i < inorder.length; i++) {
    if (inorder[i] === curRoot) {
      break;
    }
  }
  // preorder 中截取从第1个开始i个元素
  // inorder 中截取从0开始，i - 1个元素，略过curRoot
  newRoot.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  // preorder 中截取从第i+1个元素截取
  // inorder 中从i + 1个元素截取到末尾，略过curRoot
  newRoot.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return newRoot;
};