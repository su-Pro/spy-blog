/**
 * 画图找规律：从上到下，交换root 的左右节点值；可以借助递归来完成该过程
 * @param {*} root 
 */
var mirrorTree = function(root) {
  if(!root) {
    return null;  
  }
  // swap 
  var tempVal = root.left.val;
  root.left.val = root.right.val;
  root.right.val = tempVal;
  // 递归左右子树
  mirrorTree (root.left);
  mirrorTree (root.right);
  return root;
};