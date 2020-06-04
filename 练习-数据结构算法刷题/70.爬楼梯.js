/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 *
 * https://leetcode-cn.com/problems/climbing-stairs/description/
 *
 * algorithms
 * Easy (48.70%)
 * Likes:    998
 * Dislikes: 0
 * Total Accepted:    195.4K
 * Total Submissions: 401.3K
 * Testcase Example:  '2'
 *
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 
 * 注意：给定 n 是一个正整数。
 * 
 * 示例 1：
 * 
 * 输入： 2
 * 输出： 2
 * 解释： 有两种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶
 * 2.  2 阶
 * 
 * 示例 2：
 * 
 * 输入： 3
 * 输出： 3
 * 解释： 有三种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶 + 1 阶
 * 2.  1 阶 + 2 阶
 * 3.  2 阶 + 1 阶
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 * 经典一维线性DP
 */
var climbStairs = function (n) {
  const dp = new Array(n + 1).fill(0); // 因为需要遍历到第n个元素，并且我们初始化了第0个台阶，所以是n + 1 长度
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i < dp.length; i++) { // 将所有数据填入表格
    dp[i] = dp[i - 1] + dp[i - 2]; // 状态转移方程
  }
  return dp[n];
};

// 优化 由于我们只需要保存前两个节点即可，可以使用两个指针，将空间降为o(1)
var climbStairs = function (n) {
  let prev = cur = 1;
  let temp = undefined;
  for (let i = 2; i < n + 1; i++) { // 从第二阶开始：0 和 1 都有了
    temp = cur;
    cur = prev + cur; // 向前移动 cur 和 prev
    prev = temp;
  }
  return cur;
}
// @lc code=end

