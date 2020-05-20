function binarySearch(arr, target) {
  /**
   * 对于重复元素返回第一个，只需要在处理相等元素时，移动右边边界即可
   * 不能确认mid 是否为最终答案，因此无法跳过mid
   * 需要后续处理返回正确的索引
   */
  if (arr === null || arr.length === 0) {
    return -1;
  }
  let l = 0,
      r = arr.length - 1,
      mid;
  while (l + 1 < r) {
    mid = l + Math.floor((l + r) / 2);
    if (arr[mid] < target) {
      l = mid;
    } else {
      //  处理相等和大于的情况进行合并
      r = mid;
    }
  }
  if (arr[l] === target) {
    return l;
  } else if (arr[r] === target) {
    return r;
  }
  return -1;
}
