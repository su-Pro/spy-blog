/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let res = [];
  dfs(0)
  function dfs(index) {
    if (index === nums.length) {
      res.push(nums.slice())
      return;
    }
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