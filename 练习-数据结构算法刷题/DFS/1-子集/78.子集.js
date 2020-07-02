/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let res = [],
    tempArray = [];
  dfs(0, tempArray)
  /**
   * index 代表当前是第几层
   * 
   * temp：   
   *  - 既作为子结果存入到res中
   *  - 又作为唯一路径去移动（所以需要pop push操作他）
   *  */
  function dfs(index, temp) {
    if (index === nums.length) {
      res.push(temp.slice());
      return
    }
    // 加 当前 x 元素

    temp.push(nums[index])

    dfs(index + 1, temp);

    // 不加 当前 x 元素

    temp.pop()

    dfs(index + 1, temp);
  }
  return res;
};