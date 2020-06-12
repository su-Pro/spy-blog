/**
 * @param {number[]} nums
 * @return {number}
 */
// nlogn + n => nlogn
// 1. 排序 
// 2. 从头遍历数组，如果遇到前后相同，则返回相同的元素即可
var findRepeatNumber = function (nums) {
  // quickSort
  function quick(arr, left = 0, right = arr.length - 1) {
    // 1. 选取pivot
    let pivot = Math.floor(left + (right - left) / 2);
    // 2. 划分左右区间
    pivot = partation(arr, pivot, left, right);
    // 3. 排序左、排序右
    quick(arr, left, pivot - 1);
    quick(arr, pivot + 1, right);

    function partation(arr, pivot, left, right) {
      // 左右挡板，向中心移动
      // 1. 明确物理意义
      let pivotVal = arr[pivot];
      // 2. 将pivot 和 尾巴对调，保证满足物理意义
      swap(arr, pivot, right);
      let leftBaf = left, rightBaf = right - 1;
      // FIXME: 条件
      while (leftBaf <= rightBaf) {
        if (arr[leftBaf] < pivotVal) {
          leftBaf++
        } else if (arr[rightBaf] > pivotVal) {
          rightBaf--
        } else {
          swap(arr, leftBaf++, rightBaf--)
        }
      }
      // TODO: 将pivot再换回来
      // 此时的right 就是pivot
      swap(arr, leftBaf, right)
      return leftBaf
      function swap(arr, v1, v2) {
        [arr[v1], arr[v2]] = [arr[v2], arr[v1]]
      }
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) {
      return nums[i];
    }
  }
};

// O(n) 时间，空间O(n)
// var findRepeatNumber = function(nums) {
//     let map = new Map();
//     for(let item of nums) {
//         if(!map[item]){
//             map[item] = true;
//         }else{
//             return item;
//         }
//     }
// };