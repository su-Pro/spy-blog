function binarySearch(arr,target) {
  if(arr === null || arr.length === 0) {
    return -1;
  }
  let left = 0,
      right = arr.length - 1,
      mid;
  // 夹单
  while(left + 1 < right) {
    mid = left + Math.floor((right - left) / 2);
    if(arr[mid] === target) {
      return mid;
    }else if(arr[mid] > target) {
      right = mid;
    }else {
      left = mid;
    }
  }
// 后续处理
  if(arr[left] === target) {
    return left;
  }else if(arr[right] === target) {
    return right;
  }
  return -1;
}


