// 输入: [2,0,2,1,1,0]
// 输出: [0,0,1,1,2,2]

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**
 *  挡板思想，需要i j 挡板
 *  物理意义：
 *    i 挡板已左全部为0 
 *    j 挡板已右全部为2
 *    i 挡板 和 j 挡板之间 全部为1
 * 
 *  需要一个遍历指针(cur)进行一趟遍历
 * 
 *  当cur遇到2时：
 *    curVal 和 jVal 进行交换，并且j--,此时curVal结果尚不明确，原地不动
 *  当cur遇到1时：
 *    cur++
 *  当cur遇到0时：
 *    curVal 和 iVal 进行交换，并且i++ cur++，此时cur交换过来的值一定为1，因此可以向前移动
 *  当cur和j指针错过后，说明已排序成功（之所以相等时不退出，是不能确定自己交换后的值是否为1，有可能为0） 
 */

var sortColors = function (nums) {
  let left = 0,
    right = nums.length - 1,
    i = 0;
  while (i <= right) {
    if (nums[i] === 0) {
      swap(arr, left, i);
      left++;
      i++;
    }
    else if (nums[i] === 2) {
      swap(arr, right, i);
      right--;
    }
    else {
      i++;
    }
  }
  function swap(arr, v1, v2) {
    [arr[v1], arr[v2]] = [arr[v2], arr[v1]];
  }
};
