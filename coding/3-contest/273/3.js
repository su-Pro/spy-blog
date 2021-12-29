/**
 * @param {number[]} arr
 * @return {number[]}
 */
var getDistances = function (arr) {
  const res = [];
  
  for (let i = 0; i < arr.length; i++) {
    let dis = 0;
    for(let j = 0;j < arr.length;j++) {
      if(arr[j] !== arr[i]) continue;
      dis += Math.abs(j - i)
    }
    res[i] = dis;
  }
  return res;
};
