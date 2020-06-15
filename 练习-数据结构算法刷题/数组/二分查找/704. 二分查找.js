/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (nums === null || nums.length < 0) {
    return - 1;
  }
  let leftBaf = 0, rightBaf = nums.length - 1, mid;
  while (leftBaf + 1 < rightBaf) {
    mid = Math.floor((leftBaf + rightBaf) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      // 说明值一定在”小“范围 移动rightBaf
      rightBaf = mid - 1;
    } else {
      // 说明值一定在”大“范围 移动leftBaf
      leftBaf = mid + 1;
    }
  }
  // 如果还没有找到，那么需要对leftBaf & rightBaf 进行取值判断
  if (nums[leftBaf] === target) {
    return leftBaf
  }
  if (nums[rightBaf] === target) {
    return rightBaf
  }
  return - 1
};