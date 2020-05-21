## 基础二分法查找

通过l指针和r指针，夹住target；并进行后续处理：根据target 判断 l | r

```javascript
function binarySearch(arr,target) {
  if(arr === null || arr.length === 0) {
    return -1;
  }
  let left = 0,
      right = arr.length - 1,
      mid;
  // 夹单，注意条件 相邻就退出
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
```

时间复杂度：O(logn) 空间复杂度 O（1）

## matrix 中判断是否存在target

关键点：
- 将二维矩阵拉扯成一维数组，对一维数组进行二分查找。
- 在判断target 和 返回最终的坐标时，需要按照规则映射回矩阵

映射：r = mid / row; l = mid % row;


```javascript

function binarySearch(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return false
  }
  // 初始化矩阵的行 列
  let row = matrix.length,
    col = matrix[0].length,
    // 定义边界指针
    i = 0,
    j = row * col - 1
  while (i <= j) {
    let mid = Math.floor(i + (j - i) / 2)
    // matrix 中的具体位置
    let r = Math.floor(mid / col),
      c = mid % col;
    if (matrix[r][c] === target) {
      return true
    } else if (matrix[r][c] < target) {
      i = mid + 1
    } else {
      j = mid - 1
    }
  }
  return false
}

```
时间复杂度：O(logn) 空间复杂度 O（1）

## 有重复的数组中返回第一个target

关键点：
- 当遇到target时，不能断言是最终的target，需要将r指针移动至target。
- 最终l 和 r指针会夹住target并进行后续处理：如果l指针等于target，返回l指针，否则返回r指针

```javascript
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
```
时间复杂度：O(logn) 空间复杂度 O（1）

## 变种：有重复的数组中返回最后一个target

思路同上，需要注意此时要将l指针移动至target,并在后续处理时先判断r指针

```javascript
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

// 注意移动r时的条件
  while(l + 1 < r) { 
    mid = l + Math.floor((r - l) / 2);
    if(arr[mid] > target) {
      r = mid;
    }else {
      l = mid;
    }
  }
  // 这里不同
  if(arr[r] === target) {
    return r
  }else if(arr[l] === target) {
    return l
  }
  return -1;
}
```

## 找到最接近target的元素

关键点：
- 夹单夹住最接近的元素
- l指针 和 r指针 分别和target 做差取绝对值，返回最小元素
```javascript
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
        return right;
      } else {
        return left;
      }
    }
```
时间复杂度：O(logn) 空间复杂度 O（1）

## 找到最接近target的k个数
关键点：
- 夹单夹住目标元素
- 中心开花，谁小移谁，注意边界判断

```javascript

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
```

时间复杂度：O(logn + k) 空间复杂度 O（1）
