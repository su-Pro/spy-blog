function binarySearch(arr,target) {
  if (arr === null || arr.length === 0) {
    return -1;
  }
//  要么是左边，要么是右边，只要将范围缩小到相邻即可
  let left = 0,
      right = arr.length - 1,
      mid;
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
  if(Math.abs(arr[left] - target)
    > Math.abs(arr[right] - target)) {
    return left;
  } else {
    return right;
  }
}
