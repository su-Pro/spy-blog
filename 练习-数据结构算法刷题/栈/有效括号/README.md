## 有效的括号

[20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

### 描述

给定一个只包括 '('，')'，'{'，'}'，'['，']'  的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:

输入: "()"
输出: true
示例  2:

输入: "()[]{}"
输出: true
示例  3:

输入: "(]"
输出: false
示例  4:

输入: "([)]"
输出: false
示例  5:

输入: "{[]}"
输出: true

### 思路

典型的最近相关性，可以使用 stack 解决。

- 将字符串分为两组：
  - ( { [ 为 A 组
  - ) } ] 为 B 组
- 遍历字符串
  - 遇到 A 组成员将其压入 stack 中
  - 遇到 B 组成员主要做两件事： 1. 获取 stack top 元素 2. 比对 top ele 和 遇到的 B 组成员，如果不相等返回 false
- 如果都没有不相等，则返回 true

边界条件：字符串的长度为奇数情况和`(()`这种 case

### 代码

```js
var isValid = function (s) {
  var len = s.length,
    curS = "",
    stack = [];
  // 防止为奇数元素
  if (len % 2 != 0) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    curS = s[i];
    switch (curS) {
      case "(": {
        stack.push(curS);
        break;
      }
      case "{": {
        stack.push(curS);
        break;
      }
      case "[": {
        stack.push(curS);
        break;
      }
      case ")": {
        if (stack.pop() !== "(") return false;
        break;
      }
      case "}": {
        if (stack.pop() !== "{") return false;
        break;
      }
      case "]": {
        if (stack.pop() !== "[") return false;
        break;
      }
    }
  }
  /**
   * - 如果此时stack没有元素
   * 	- 那么0 发生隐式类型转换 ==> false 取反 ==> true
   * - 如果此时stack有元素，eg：
   * 	- (((()) => ((
   */
  return !stack.length;
};
```

#### 复杂度

Time: 最坏情况下需要遍历整个字符串，同时操作 stack 的时间复杂度为 O(1)，所以最后总的时间为 => O(n)

Space: 需要额外的 stack 保存字符串的每个词符 => O (n)
