/**
 * @param {number[]} nums
 * @return {number}
 */

/**
 *  排序 + diff 时间复杂度：o(logn + n)
 * 1. 对数组进行排序
 * 2. 进行前后diff，如果相同则返回结果即可
 */
// var findRepeatNumber = function(nums) {
//   nums.sort((a,b) => a - b);
//   for(let i = 0;i < nums.length;i++){
//     if(nums[i] === nums[i - 1]) return nums[i];
//   }
// };

/**
 * 额外要求：O(n) 时间复杂度
 * 1. 利用hash表，依次将元素放入hash表中
 * 2. 放入前检查一下是否存存在，如果存在则返回key
 */
// var findRepeatNumber = function(nums) {
//   let hash = {};
//   for(let num of nums) {
//     if(!hash[num]){
//       hash[num] = true
//     }else {
//       return num
//     }
//   }
// };

/**
 * 额外要求：o(n) 的时间复杂度 o(1) 的空间复杂度
 * 利用数组索引和随机访问O(1)的特性，对数组进行排序
 * eg：[2,3,1,3,0]
 * [2,3,1,3,0] => [1,3,2,3,0]
 * [1,3,2,3,0] => [3,1,2,3,0]
 * [3,1,2,3,0] => [3,1,2,3,0] 出现相同元素，退出函数
 * 
 * 总结：
 * 首先遍历数组
 * 如果当前索引和元素的值不相同，则进行swap过程
 * 直到：（1） 到达指定位置 ||（2）出现相同元素
 * 到达指定位置后，进行下一个索引的判断。
 */
var findRepeatNumber = function (nums) {
  const length = nums.length;
  let curItem;
  for (let i = 0; i < length; i++) {
    curItem = nums[i];
    while (curItem !== i) {
      if (nums[curItem] === nums[i]) {
        return curItem;
      }
      [nums[curItem], nums[i]] = [nums[i], nums[curItem]]
    }
  }
};

