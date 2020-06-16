/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/**
 * logn 级别搜索，首先想到二分法
 * 题目特点：随机将数组分开后，一定有一半是有序的，一半是无序的
 * 
 * 那么可以在这个有序区间进行查找
 * 
 * 判断是否有序：利用 nums[mid] 和 最开始的nums[0] 进行比较
 * 
 * 
 * 
 */
var search = function (nums, target) {
  let lBaf = 0, rBaf = nums.length - 1, mid = 0;
  // 精确查找
  while (lBaf <= rBaf) {
    mid = Math.floor((lBaf + rBaf) / 2)
    if (nums[mid] === target) {
      return mid;
    }
    // 2个元素Debug

    if (nums[mid] >= nums[lBaf]) {
      // case1：左侧有序
      // 根据target值判断范围变化
      if (nums[lBaf] <= target && target < nums[mid]) {
        rBaf = mid - 1;
      } else {
        // target 不在左侧，或者其值是大于mid的。那么一定在右侧部分
        lBaf = mid + 1;
      }
    } else {
      // case2：右侧有序
      if (nums[mid] < target && target <= nums[rBaf]) {
        lBaf = mid + 1;
      } else {
        rBaf = mid - 1;
      }
    }
  }
  return - 1;
};
