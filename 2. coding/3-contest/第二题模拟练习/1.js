/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function(n, leftChild, rightChild) {
    let checkPos = new Array(n).fill(0);

    for(let i = 0;i < leftChild.length;i++) {
        let l_v = leftChild[i]
        let r_v = rightChild[i]
        console.log(l_v,r_v)
        // 是否引用0
        if(l_v === 0 || r_v === 0) return false;
        // 是否多边Case
        if(l_v !== -1) checkPos[l_v] ++;
        if(r_v !== -1) checkPos[r_v] ++;
        if(checkPos[l_v] >= 2 || checkPos[r_v] >= 2) return false;
    }
    // 检查是否有0节点，除了0索引外
    for(let i = 1;i < checkPos.length;i++) {
        if(checkPos[i] === 0) return false;
    }
    return true;
};

console.log(validateBinaryTreeNodes(
    4,
    [1,-1,3,-1],
    [2,3,-1,-1]
))