## 46. 全排列

[46. 全排列](https://leetcode-cn.com/problems/permutations/)

### 描述

给定一个 没有重复 数字的序列，返回其所有可能的全排列。

示例:

```
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

### 思路

### 代码

```js
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

```

#### 复杂度

Time: O(n!)

Space: O(n)
