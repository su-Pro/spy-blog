/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 *
 * https://leetcode-cn.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (40.22%)
 * Likes:    1572
 * Dislikes: 0
 * Total Accepted:    278.9K
 * Total Submissions: 670.6K
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 * 
 * 
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 
 * 
 * 注意空字符串可被认为是有效字符串。
 * 
 * 示例 1:
 * 
 * 输入: "()"
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: "()[]{}"
 * 输出: true
 * 
 * 
 * 示例 3:
 * 
 * 输入: "(]"
 * 输出: false
 * 
 * 
 * 示例 4:
 * 
 * 输入: "([)]"
 * 输出: false
 * 
 * 
 * 示例 5:
 * 
 * 输入: "{[]}"
 * 输出: true
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 * 
 * 遇到( [ { 就压栈， 遇到 ) ] } 就弹栈，判断是否相等，如果不相等就退出
 */

var isValid = function (s) {
	var len = s.length, curS = '', stack = [];
	// 防止为奇数元素
	if (len % 2 != 0) {
		return false;
	}
	for (let i = 0; i < len; i++) {
		curS = s[i]
		switch (curS) {
			case '(': {
				stack.push(curS)
				break;
			}
			case '{': {
				stack.push(curS)
				break;
			}
			case '[': {
				stack.push(curS)
				break;
			}
			case ')': {
				if (stack.pop() !== '(') return false;
				break;
			}
			case '}': {
				if (stack.pop() !== '{') return false;
				break;
			}
			case ']': {
				if (stack.pop() !== '[') return false;
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
// @lc code=end

