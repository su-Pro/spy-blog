/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
/**
 * 
 * 最近最小子问题（linear 回头看）
 * 由于只有两种情况：1步 和 2步
 * 假设现在我们站在第三步上，是从第2 和第1 上来的。
 * 之所以需要回头看两个是因为 一次两2步可以上两层台阶
 * 
 */
var climbStairs = function(n) {
	// n=3 :3种
	if(n < 4) {
		return n;
	}
	var dp = [];
	// 由于不存在0台阶，所以0 跳过，以1 和 2 为起点；
	dp[1] = 1;
	dp[2] = 2;
	for(let i = 3;i <= n;i++){
		dp[i] = dp[i - 1] + dp[i - 2];
	}
	return dp[n]
};
// @lc code=end
