## 括号生成

[22.括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

### 描述

数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例：

```
输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]

```

### 思路

是子集问题的升级，在此基础上可以进行优化：什么时候可以接着往下走。




### 代码

不剪枝的代码：

```js
// @lc code=start
/**
 * 首先通过递归穷举所有的可能性,这样就会穷举所有可能
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  // 当前进行到第0层，一共需要2 * n个位置，当前字符是''
  _generator(0, 2 * n, '');
  function _generator(level, max, curString) {
    // base case 
    if (level === max) { // 找到个数达标的情况
      console.log(curString);
      return;
    }
    // proccess ： 得到添加左括 和 右括的情况
    let s1 = s + '(';
    let s2 = s + ')';
    // drill down
    _generator(level + 1, max, s1);
    _generator(level + 1, max, s2);
    // restore
  }
  return res;
};
```

剪枝的代码

```js
/**
 * 1. 首先通过递归穷举所有的可能性,这样就会穷举所有可能
 * 2. 进行限制，将不满足逻辑条件的进行剪枝
 * - 左括号： 数量只要 <= n 就可以继续
 * - 右括号： 数量只要 < 左括号的个数 就可以继续
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n <= 0) {
    return [];
  }
  let res = [];
  _generator(0, 0, '');
  function _generator(left, right, s) {
    // base case;
    if (left + right === 2 * n) {
      res.push(s)
      return
    }
    // proccess : 左括号 小于等于n 右括号 小于左括号
    // drill;
    if (left < n) {
      _generator(left + 1, right, s + '(');
    }
    if (right < left) {
      _generator(left, right + 1, s + ')');
    }
    // restore;
  }
  return res;
};
// @lc code=end

```

#### 复杂度

Time: O(2 ^ n)

Space: O (2n)
