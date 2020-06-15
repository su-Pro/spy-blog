function findLeft(arr, target) {
  if (arr === null || arr.length < 0) {
    return -1;
  }
  let leftBaf = 0, rightBaf = arr.length - 1, mid = 0;

  while (leftBaf + 1 < rightBaf) {
    mid = Math.floor((leftBaf + rightBaf) / 2);
    if (arr[mid] === target) {
      // 找到最左的重复元素，那么需要将rightBaf卡在当前mid这里
      // 但是，不能肯定说mid就一定可以略过，不确定左边界是否还存在target
      rightBaf = mid;
    } else if (arr[mid] < target) {
      leftBaf = mid + 1; // 肯定mid不是，因此可以+1
    } else {
      // > target
      rightBaf = mid - 1;
    }
  }
  // 相邻的时候停下，有两种情况
  // 并且此时范围一定是缩小到满足要求的
  // 1. 左右元素，包含target =》 先判断左，在判断右
  // 2. 左右元素，不包含target =》 返回 - 1
  if (arr[leftBaf] === target) {
    return leftBaf;
  }
  if (arr[rightBaf] === target) {
    return rightBaf;
  }
  return -1;
}

const arr = [1, 2, 5, 5, 5]

const res = find(arr, 5); // 1

console.log(res);


/**
 * 如果是找最后一个重复出现的元素，只需要将arr[mid] === target时进行相反操作即可。
 *
 * 同理在后续处理中，需要将先后顺序对调，会找到第一个就会找最后一个。
 */
