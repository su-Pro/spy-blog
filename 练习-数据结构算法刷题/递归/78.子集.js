/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 *
 * https://leetcode-cn.com/problems/subsets/description/
 *
 * algorithms
 * Medium (77.30%)
 * Likes:    580
 * Dislikes: 0
 * Total Accepted:    91.6K
 * Total Submissions: 118.5K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
 * 
 * 说明：解集不能包含重复的子集。
 * 
 * 示例:
 * 
 * 输入: nums = [1,2,3]
 * 输出:
 * [
 * ⁠ [3],
 * [1],
 * [2],
 * [1,2,3],
 * [1,3],
 * [2,3],
 * [1,2],
 * []
 * ]
 * 
 */

// @lc code=start
/**
 * 思路：DFS + 逻辑（加 或者 不加）
 * 两种解法都可，但个人更偏向第一种
 * @param {number[]} nums
 * @return {number[][]}
 */

var subsets = function (nums) {
  let res = [];
  let tempList = [];
  dfs(tempList, 0);
  /**
   * 
   * @param {*} temp 
   * @param {*} index 当前第几位 
   */
  function dfs(temp, index) {
    // base case;
    if (index === nums.length) {
      res.push(temp.slice());
      return
    }
    // proccess : 不加 当前元素 ；加 当前元素 ;    
    // drill down;
    dfs(temp, index + 1);
    temp.push(nums[index]);
    console.log(temp);
    dfs(temp, index + 1);
    // restore;
    temp.pop()
  }
  return res;
};

var subsets = function (nums) {
  let n = nums.length;
  let res = [];
  let temp = [];
  function backTack(tempPath, index) {
    res.push(tempPath)
    // 站在上一次的情况下，加或者不加
    // base case : i < n 时退出
    for (let i = index; i < n; i++) {
      // proccess: 加入一个元素
      tempPath.push(nums[i]);
      // drill down 
      backTack(tempPath.slice(), i + 1);
      // restore
      tempPath.pop();
    }
  }
  backTack(temp, 0);
  return res;
}
// @lc code=end

