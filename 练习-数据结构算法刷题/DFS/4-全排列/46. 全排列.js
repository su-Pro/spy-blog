/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let res = [];
  dfs(0)
  // index : 当前所在的层数
  function dfs(index) {
    if (index === nums.length) {
      res.push(nums.slice())
      return;
    }
    // 每层的状态是动态变化的
    for (let i = index; i < nums.length; i++) {
      swap(nums, index, i);
      dfs(index + 1);
      swap(nums, index, i);
    }
  }
  function swap(arr, l, r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
  }
  return res;
};
