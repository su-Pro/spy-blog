function binarySearch(arr,target) {
  if (arr === null || arr.length === 0) {
    return -1;
  }
  /***
   * 只需要处理当相同时，缩小左边界即可,在post procession 先判断右
   */
  let l = 0,
      r = arr.length - 1,
      mid;

  while(l + 1 < r) { // 夹住
    mid = l + Math.floor((r - l) / 2);
    if(arr[mid] > target) {
      r = mid;
    }else {
      l = mid;
    }
  }
  if(arr[r] === target) {
    return r
  }else if(arr[l] === target) {
    return l
  }
  //没找到
  return -1;
}
