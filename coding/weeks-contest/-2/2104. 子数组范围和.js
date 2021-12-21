/**
 * @param {number[]} nums
 * @return {number}
 */
 var subArrayRanges = function (nums) {
  let cnt = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      // 寻找历史最大最小值
      cnt += Math.abs(findMin(nums,i,j) - findMax(nums,i,j))
    }
    // console.log(loopMax)
    // d+= loopMax
  }
  return cnt;
};
function findMin(source,start,end) {
  let min = source[start];
  for(let i = start;i <= end;i++) {
    if(source[i] > min) {
      continue;
    }
    min = source[i];
  }
  return min;
}
function findMax(source,start,end) {
  let max = source[start];
  for(let i = start;i <= end;i++) {
    if(source[i] < max) {
      continue;
    }
    max = source[i];
  }
  return max;
}
