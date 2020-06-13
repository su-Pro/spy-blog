/**
 * @param {number[]} array
 * @return {number[]}
 */


/**
 * 
 * @param {*} array 
 * 
 * 
 * 思路： 找到两个逆序对边界
 * 
 * 从头到尾扫描，按常理来说应该线性递增，如果发现逆反的元素，则记录其索引，当扫描结束后最后一次的索引即为右边界
 * 
 * 同理可以获得左边界
 * 
 * 最后返回即可。
 */
var subSort = function (array) {
  if (array.length === 0) return [-1, -1]
  let max = array[0];
  let r = -1;
  for (let i = 1; i < array.length; i++) {
    let v = array[i];
    if (v >= max) {
      max = v;
    } else {
      r = i;
    }
  }

  let min = array[array.length - 1];
  let l = -1;
  for (let i = array.length - 2; i >= 0; i--) {
    let v = array[i];
    if (v <= min) {
      min = v;
    } else {
      l = i;
    }
  }
  return [l, r]
};