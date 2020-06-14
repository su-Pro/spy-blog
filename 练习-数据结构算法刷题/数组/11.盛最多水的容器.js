/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
/**
 * 
 * 双指针夹逼法
 * i 和 j 指针顶在两头，此时横轴一定最大，只需要确定纵轴相对初始位置最高即可
 * 
 * 循环比较i 和 j 当前的高度，谁小移动谁（里面有可能存在大的，因此是i++,j--）
 * 当 i 和 j 相遇说明处理完毕，退出即可
 */
var maxArea = function (height) {
  var area = cur = 0,
    i = 0,
    j = height.length - 1;
  // 两个元素Debug循环条件
  while (j - i >= 1) {
    // 循环处理
    if (height[i] > height[j]) {
      // 因为水只能向矮的一侧进行堆积
      cur = height[j--] * (j - i)
    } else {
      cur = height[i++] * (j - i)
    }
    area = Math.max(area, cur)
  }
  return area;

// @lc code=end