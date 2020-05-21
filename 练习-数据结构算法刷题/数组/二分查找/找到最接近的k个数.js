function findK (arr,target,k) {
  /**
   * 先找到最接近target的两个数，然后和mergeSort一样，形如中心开花
   */
  let result = [];
  let l = 0,
      r = arr.length - 1,
      mid;
  while(l + 1 < r) {
    mid = l + Math.floor(r - l) / 2;
    if(arr[mid] < target) {
      l =  mid;
    }else {
      r = mid;
    }
  }
  let i = 0; // 目前找到的个数
  let n = arr.length; // 数组右边界
  while (i < k && l >= 0 && r < n) {
    if(Math.abs(arr[l] - target) < Math.abs(arr[r] - target)){
      result[i++] = arr[l--]
    }else {
      result[i++] = arr[r++]
    }
  }
  // 处理剩余情况，如果左边剩余，全部扔进数组，右边同理
  while( i < k && l >= 0) {
    result[i++] = arr[l--]
  }
  while( i < k && r < n) {
    result[i++] = arr[r++]
  }
  return result;
}
