// #双指针 #回文字符串判断
var firstPalindrome = function (words) {
  for (let i = 0; i < words.length; i++) {
    const cur = words[i];
    if (judgePal(cur)) {
      return cur;
    }
  }
  return "";
};

const judgePal = (str) => {
  let left = 0,
      right = str.length - 1;

  while(left < right) {
    if(str[left] !== str[right]) {
      return false;
    }
    left++
    right--
  }
  return true;
}

/**
 * @param {string[]} words
 * @return {string}
 */
var firstPalindrome = function (words) {
  for(const word of words) { // 遍历不需要指针的情况下，可以直接用for of
    if(judgePal(word)) return word
  }
  return "";
};
const judgePal = (str) => {
  const len = str.length;
  for (let i = 0; i < Math.floor(len / 2); i++) { // 想清楚指针的物理意义，很明显这里的left 和 right 要联动。没必要声明Left 和 Right的...
    if (str[i] !== str[len - i - 1]) return false;
  }
  return true;
};

words = ["notapalindrome", "racecar"];

console.log(firstPalindrome(words));
