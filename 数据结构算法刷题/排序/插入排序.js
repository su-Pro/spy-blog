// 从小到大
// 注意debug
function insert (arr) {
  let len = arr.length;
  for(let i = 1;i < len;i++){
    let temp = arr[i];
    let j = i - 1;
    while((j <= 0) && arr[j] > temp) { // 向后串1
      arr[j + 1] = arr[j]
      j--
    }
    // 大于 或者 到头
    arr[j + 1] = temp;
  }
}

// 二分插入排序

/**
 * 找到index 要插入的地方
 * @param {*} arr
 */
function binarySearchSort (arr) {
  let length = arr.length;
  for(let i = 1; i < length; i ++) {
    let temp = arr[i]; // 待插入的元素
    // 找到待插入元素的位置
    let index = binarySearch(arr,0,i - 1,temp)
    //  run到 位置上
    let j = i;
    for(;j > index;j--)  {
      // 逐一向后移动
      arr[j] = arr[j - 1]
    }
    // 找到位置 | 队尾
    arr[index] = temp
  }
}
function binarySearch (arr,left,right,value) {
  let target = 0,
      mid;
  // mark 1元素Debug
  while(left < right) {
    mid = Math.floor(left + right) / 2;
    if(arr[mid] === value){
      target = mid;
      return target;
    }
    if(arr[mid] < value) { //left ++
      left = mid + 1;
    }else { // right--
      right = mid -1;
    }
  }
  // 到最后mid 也不是value时，根据大小近似选一个值
  if(value >= arr[mid]) {
    target = mid + 1;
  }else {
    target = mid;
  }
  return target;
}
