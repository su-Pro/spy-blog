/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
 var isOk = (source,isOdd) => {
     console.log(isOdd)
     const step = isOdd ? 0 : 1;
     for(let i = 1;i < source.length;i++) {
	if(<F2><F2>:w)
     }
     return true
 }
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isEvenOddTree = function(root) {
    const q = [root];
    let level = 0;
    while(q.length > 0) {
        const count = q.length;
        const childrens = [];
        for(let i = 0;i < count;i++) {
            const curRoot = q.shift();
            if(cuRoot.left) childrens.push(curRoot.left)
            if(curRoot.right) childrens.push(curRoot.right)
        }
        // check all children is ok
        if(!isOk(childrens,(level % 2 === 0))) {
            return false;
        }
        q.concat(childrens);
        level++;
    }
    return true
};
