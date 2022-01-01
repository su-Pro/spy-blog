/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
    let res = false;
    let badCase = false;
    for (let i = 0; i < n; i++) {
        res = true;
        let visted = new Array(n).fill(0);
        lookAround(i, leftChild, rightChild);
        if (badCase) {
            return false;
        }
        // 检查visted的状态
        for (let v of visted) {
            if (v !== 0) {
                continue;
            }
            res = false;
            break;
        }
        if (res) {
            return true;
        }
    }
    return res;
};
function lookAround(idx, l, r) {
    if (badCase || visted[idx] > 1) {
        badCase = true;
        return;
    }
    visted[idx] = 1;
    // 分别以左右子树进行递归检查
    if (l[i] !== -1) {
        lookAround(l[idx], l, r)
    }
    if (r[i] !== -1) {
        lookAround(r[idx], l, r)
    }
}