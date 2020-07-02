/**
 * @param {number} n
 * @return {number}
 */
var waysToChange = function (target) {
  let coins = [25, 10, 5, 1],
    res = 0;
  dfs(target, 0)
  function dfs(target, index) {
    // base case ：一共有四层递归深度
    if (index === coins.length) {
      if (target === 0) {
        res += 1;
      }
      return;
    }
    // k叉树，每层的状态和当前剩余的硬币有关
    let currentCoin = coins[index];
    // 每层动态变化的max值
    let max = target / currentCoin;
    for (let i = 0; i <= max; i++) {
      dfs(target - i * currentCoin, index + 1)
    }
  }
  return res;
};