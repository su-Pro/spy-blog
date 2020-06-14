/**
 * 1. 排序
 * 2. 返回中间元素，一定是众数
 * @param {*} nums 
 */

var majorityElement = function (nums) {
  quickSort(nums);
  let i = Math.floor(nums.length / 2);
  return nums[i];
  /**
   * 1. 找到pivot
   * 2. 分类当前层
   * 3. 左、 右递归
   * @param {*} nums 
   */
  function quickSort(nums, left = 0, right = nums.length) {
    let pivot = Math.floor(nums.length / 2);
    pivot = partition();
    quickSort(nums, left, pivot - 1)// 左
    quickSort(nums, pivot + 1, right)// 右

    /**
     * 1. 定义leftBaf rightBaf挡板
     * 2. swap
     * 3. 比较
     * 4. swap回
     * 5. 返回leftBaf
     * @param {*} nums
     * @param {*} pivot
     */
    function partition(nums, pivot, left, right) {
      let leftBaf = left,
        rightBaf = right - 1;
      let pivotVal = nums[pivot];
      swap(nums, pivot, right);
      // 1. leftBaf < pivotVal leftBaf++ 
      while (leftBaf <= rightBaf) {
        if (nums[leftBaf] < pivotVal) {
          leftBaf++
        } else if (nums[rightBaf] >= pivotVal) {
          rightBaf--
        } esle {
          swap(nums, leftBaf++, rightBaf--)
        }
      }
      swap(arr, leftBaf, right)
      return leftBaf;
    }
  }
};

// hash法
// 1. 构建hash表
// 2. nums中每个元素为key，出现次数为value
// 3. 当遇到出现频率为 length /2 时返回即可

function findNums(nums) {
  let len = nums.elngth;
  let obj = {};
  let i = 0; // 用于返回最后的值
  nums.forEach(item => {
    obj[item] = obj[item] ? obj[itme] + 1 : 1;
    if (obj[item] > len / 2) i = item;
  })
  return i;
}