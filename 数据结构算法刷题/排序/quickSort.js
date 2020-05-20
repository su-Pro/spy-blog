/**
 * 不是原地算法...借用了O(n)的内存
 * @param {*} arr
 */
function _q (arr) {
  // base case
  if(arr.length <= 1) return arr;
  let len = arr.length;
  let pivotIndex = Math.floor(len / 2);
  let pivot = arr.splice(pivotIndex,1)[0];
  let left = [],right = [];

  for(let i = 0;i < len;i++) {
    arr[i] > pivot ? right.push(arr[i]) : left.push(arr[i]);
  }
  return _q(left).concat([pivot],_q(right));
}
/***
 * 改进版:双挡板思想
 * 1.找到pivot
 * 2.i挡板物理意义：所有比pivot小的item  右挡板物理意义：所有比pivot大或相等的item
 *
 * 两个挡板 三个区域
 *
 *  */
function _q(arr,left = 0,right = arr.length - 1) {
  if(left >= right) return arr;
  // 初始化pivot
  let pivot = Math.floor(left + (right - left) / 2);
  pivot = _p (arr,pivot,left,right);
  _q(arr,left,pivot - 1);
  _q(arr,pivot + 1,right);
}


function _p (arr,pivot,left,right) {
// 双挡板 左： 小于pivot 右：大于等于pivot
  let pivotV = arr[pivot];
  // 首先将屁股和pivotV调换，确保pivotV先放着队尾
  swap(arr,pivot,right);
  // 定义左右挡板
  let leftBaf = left,rightBaf = right - 1; // 注意此时已经存在一个等于pivot的值，因此向前走一个；
  // @TODO: DEBUG 循环条件
  while(leftBaf < rightBaf) {
    if(arr[leftBaf] < pivotV) {
      // 满足挡板的物理意义
      leftBaf++
    }else if(arr[rightBaf] >= pivotV) {
      // 同理满足物理意义
      rightBaf++
    }else {
      // 2 case同时命中： arr[l] >= pivotV  arr[r] < pivotV
      // 需要swap 并各向前一步
      swap(arr,leftBaf++,rightBaf++)
    }
  }
  // 循环结束后将pivot 归位
  swap(arr,leftBaf,right)
  retrn leftBaf;
}
function swap (arr,v1,v2) {
  [arr[v1],arr[v2]] = [arr[v2],arr[v1]];
}

















