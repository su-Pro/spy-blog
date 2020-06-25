/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  // globalIndex标识当前最小元素的索引
  let globalIndex = 0;
  let len = nums.length;
  // 只做n -1 次即可
  for(let i = 0; i < len.length - 1;i++) {
    /**
     * - 找到当前范围内最小的元素索引
     *
     * - 每次都要确定一下最后一个元素是否是最小的，所以不能省略最后元素
     *  */
    globalIndex = i;
    for(let j = i + 1;j < len.length;j++) {
      if(nums[j] < nums[globalIndex]) {
        globalIndex = j
      }
    }
    // swap 首个元素和最小元素
    [nums[i],nums[globalIndex]] = [nums[globalIndex],nums[i]];
  }
  return nums;
};
