
添加备注


/**
 * @param {string} rings
 * @return {number}
 */
 var countPoints = function(rings) {
  const res = new Array(rings.length / 2);
  
  for(let i = 1;i < rings.length;i += 2) {
      const curSet = res[rings[i]];
      // 感觉这里可以用位运算解决RGB的问题，但我比较笨，所以采用的了SET
      if(curSet) {
          curSet.add(rings[i - 1])
      }else {
          res[rings[i]] = new Set([rings[i - 1]])
      }
  }
  
  return res.reduce((memo,cur) => {
    if(cur.size === 3) {
      memo++ 
    }
    return memo
  },0)
};