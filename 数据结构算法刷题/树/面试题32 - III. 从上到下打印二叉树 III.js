/**
 * 根据规律：
 * 奇层 左 -> 右 打印，因此在保存左右节点时需要从 右 -> 左 保存
 * 偶层 右 -> 左 打印，因此在保存左右节点时需要从 左 -> 右 保存
 * 
 * 因此定义两个stack，明确其物理意义如上描述
 * 
 * 但由于两个stack 代码量比较大，我们可以偷懒利用reverse进行操作。
 * 
 * 只需要在存入时 判断当前的level 是否是偶数层，如果是 逆序存储即可。
 * @param {*} root 
 */
var levelOrder = function(root) {
  let _q = [root],nums,level = 0,res = [],curNode;

  while (_q.length) {
    res[level] = [];
    nums = _q.length;
    while (nums) {
      curNode = _q.shift();
      res[level].push(curNode.val);
      curNode.left && _q.push(curNode.left)
      curNode.right && _q.push(curNode.rig ht)
    }
    // 逆序
    if(level % 2 === 0) res[level++].reverse();
  }
  return res;
};