## 子集

[78.子集](https://leetcode-cn.com/problems/subsets/)

### 描述

给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

```
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]

```

### 思路

- 递归树一共多少层？
  - 递归树一共nums.length层,每层用index标识
- 每层的状态是什么？
  - 加nums.length[index]，随后进入下一层递归中
  - 不加nums.length[index],由于该路径是从上一个递归中返回的，且结果是通过一个数组保存（引用值），所以需要pop一下。

TDOO: 图

### 代码

```js
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
```

#### 复杂度

Time: O(2 ^ n) 

Space: O(n)
