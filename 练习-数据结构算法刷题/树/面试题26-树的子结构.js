/**
 * 所谓的子结构是指 对应的左子树、右子树必须节点相同，直觉：递归判断。
 * 
 * 1. 找到B的Rroot 在A中的位置
 * 2. 在A中以Rroot 开始 和 B 进行详细比较
 * 比较细节：A到叶子节点还没有完成，返回false | B到叶子节点还没有结束，说明吻合返回true | A 和 B 的值不相同返回false
 * @param {*} A 
 * @param {*} B 
 */
var isSubStructure = function(A, B) {
  // 规定只要有一个为空 则判断不是子树
  if(!A || !B) {
    return false;
  }
  // 在A 的 左子树、右子树找到Rroot，真正开始判断（走入helper进行判断）
  return (
    hepler(A,B) ||
    isSubStructure(A.left,B) ||
    isSubStructure(B.right,B) 
  )
    /**
     * 用于判断r2 是否为r1 的子树
     * @param {*} r1 
     * @param {*} r2 
     */
  function helper(r1,r2) {
    if(!r2) return true;
    if(!r1) return false;
    if(r1.val !== r2.val) return false;
    // 必须左右同时满足才可以
    return hepler(r1.left,r2.left) && hepler(r1.right,r2.right)
  }
};