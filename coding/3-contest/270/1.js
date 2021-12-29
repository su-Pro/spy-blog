/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
//  [-1,-2,3,4]
//           ^
var maxSubsequence = function (nums, k) {
  let res = new Array();
  const maxSum = 0;
  for (let i = 0; i < nums.length - k; i++) {
    let curMin = Number.MIN_SAFE_INTEGER;
    let innerNums = [];
    while (innerNums.length < k) {
      if (nums[i + innerNums.length] < curMin) {
        continue;
      }
      innerNums.push(nums[i + innerNums.length]);
      curMin = Math.min(curMin, nums[i + innerNums.length]);
    }
    const curSum = innerNums.reduce((memo, cur) => memo + cur, 0);
    if (curSum > maxSum) {
      res = innerNums;
    }
  }
  return res;
};
// var maxSubsequence = function (nums, k) {
//   let start = 0,
//     end = 0 + k;
//   let max = 0;
//   for (let i = 0; i < nums.length; i++) {
//     let loopStep = 0;
//     let loopSum = 0;
//     while (loopStep < k) {
//       loopSum += nums[i +loopStep];
//       loopStep++
//     }
//     if (loopSum > max) {
//       start = i;
//       end = i + k;
//       max = loopSum;
//     }
//   }
//   return nums.slice(start, end + 1);
// };
// console.log(maxSubsequence([2, 1, 3, 3], 2));
