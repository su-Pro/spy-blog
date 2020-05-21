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
// i 和 j 挡板
// j 挡板 的物理意义：以左是非0 元素
// i 挡板 的物理意义：遍历数组，遇到非0元素停下，和 j 当前元素swap 保证j 非0 同时j向前一步走
// 当i 挡板遇到0时，只需要让j按兵不动即可，当i出界说明处理完毕

var moveZeroes = function(nums) {
	var i = j = 0;
	for(;i < nums.length;i ++){
		if(nums[i] !== 0) {
			// nums头部时不做处理
			if(j < i){
				nums[j] = nums[i];
				nums[i] = 0;
			}
			j++
		}
		// 等于0的情况 让i++即可
	}
};
// @lc code=end
