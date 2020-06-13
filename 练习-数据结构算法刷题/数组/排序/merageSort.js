
/**
 * 如果我能把左边排好序，右边也排好序，我就能排好序
 *
 * 先分到不能再分
 *
 *             4 5 2 6 1
 *             /       \
 *          4 5 2     6  1
 *        /     \     /   \
 *    4 5     2     6     1
 *  /     \
 *  4   5
 *
 * 4 和 5 比较，排序后返回，  再和2比较 谁小移谁  ...
 *
 * 时间复杂度：nlogn [logn层递归， 每层需要合并操作，时间为n （移动的次数线性相关arr的长度）]
 * 空间复杂度：n temp数组的锅
 */

function mergeSort(arr) {
  if (arr === null || arr.length === 0) {
    return arr;
  }
  // 用来移动指针时能够正确访问元素
  let temp = [].fill(arr);
  helper(arr, temp, 0, arr.length - 1);
  return arr;
}
/**
 * 向下递归拆分
 * @param arr
 * @param temp
 * @param start
 * @param end
 */
function helper(arr, temp, start, end) {
  //base case
  if (start >= end) {
    return;
  }
  let mid = start + (end - start) / 2;
  helper(arr, temp, start, mid);
  helper(arr, temp, mid + 1, end);
  // 在当前层谁小移动谁进行合并
  merge(arr, temp, start, mid, end);
}
function merge(arr, temp, start, mid, end) {
  //  定义左右移动指针 + 标识排序数组的当前索引index
  let left = start, right = end, index = start;
  // 持续移动的情况，左：没有超过mid 右：没有超出end
  while (left <= mid && right <= end) {
    if (temp[left] <= temp[right]) {
      arr[index++] = temp[left++]
    } else {
      arr[index++] = temp[right++]
    }
  }
  //  处理最后有剩余情况，由于一刀两半，mid划分到左边，因此右边一定不会剩余
  while (left <= mid) {
    arr[index++] = temp[left++]
  }
}
