/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 *
 * https://leetcode-cn.com/problems/powx-n/description/
 *
 * algorithms
 * Medium (35.84%)
 * Likes:    402
 * Dislikes: 0
 * Total Accepted:    96.2K
 * Total Submissions: 268.4K
 * Testcase Example:  '2.00000\n10'
 *
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数。
 * 
 * 示例 1:
 * 
 * 输入: 2.00000, 10
 * 输出: 1024.00000
 * 
 * 
 * 示例 2:
 * 
 * 输入: 2.10000, 3
 * 输出: 9.26100
 * 
 * 
 * 示例 3:
 * 
 * 输入: 2.00000, -2
 * 输出: 0.25000
 * 解释: 2^-2 = 1/2^2 = 1/4 = 0.25
 * 
 * 说明:
 * 
 * 
 * -100.0 < x < 100.0
 * n 是 32 位有符号整数，其数值范围是 [−2^31, 2^31 − 1] 。
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 * 
 * 思路：
 *  1. 首先处理当指数为负的情况：将n取反为正，将x取到数
 *  2. 将问题进行拆分，只需要求出 x ^ n/2的值 * 自身即可（需要注意n为奇 偶 的两种case；）
 * 
 * 时间复杂度：O(log⁡n) 递归树的高度 
 */
var myPow = function (x, n) {
  // 特殊处理
  if (n >= 0) {
    return quickPow(x, n)
  }
  // 特殊处理n为负
  return 1 / quickPow(x, -n);

  function quickPow(x, n) {
    // base case;
    if (n === 0) return 1;
    // proccess
    let _x = quickPow(x, Math.floor(n / 2));
    // drill down
    return n % 2 === 0 ? _x * _x : _x * _x * x
    // restore
  }
};
// @lc code=end

