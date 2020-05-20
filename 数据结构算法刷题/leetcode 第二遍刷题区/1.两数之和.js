/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/**
 * 
 * num1 和  num2 的 关系: num1 = target - num2
 * 只需要将“目标获取的值：target - num2” 的结果存入map中，“目标值”:i
 * 当能够找到这个目标值时，取出他当时存的索引即可
 */
var twoSum = function(nums, target) {
		var map = new Map();
		for(let i = 0;i < nums.length;i++){
			var num1 = nums[i];
			if(map.get(num1) === undefined) map.set(target - num1,i);
			else return [map.get(num1),i]
		}
		
};
// @lc code=end

