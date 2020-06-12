/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

function moveZ(nums) {
  let i = j = 0;
  while (j < nums.length) {
    if (nums[j] !== 0) {
      if (i < j) {
        // swap 0
        nums[i] = nums[j];
        nums[j] = 0;
      }
      i++
    }
    j++
  }
}

// let nums= [1,2,3,0,0,1,2]
// moveZ(nums)
// console.log(nums)
// @lc code=end
