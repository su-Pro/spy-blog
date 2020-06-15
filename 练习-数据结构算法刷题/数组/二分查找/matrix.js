var searchMatrix = function (matrix, target) {
  // 左边界是0,右边界是m * n - 1
  // 难点：如何将mid 映射回二维矩阵，从而判断和target的值是否相同？
  // r = (mid / col)
  // c = mid % col
  // matrix[r][c] 即为 target值
  if (matrix == null) {
    return;
  }
  if (matrix.length == 0 || matrix[0].length == 0) {
    return false;
  }
  let row = matrix.length, col = matrix[0].length, mid = 0;
  let leftBaf = 0, rightBaf = row * col - 1;
  // 如果卡在一个元素身上也需要判断一下子
  while (leftBaf <= rightBaf) {
    mid = Math.floor((leftBaf + rightBaf) / 2)
    let r = Math.floor(mid / col);
    let c = mid % col;
    if (matrix[r][c] === target) {
      return true
    } else if (matrix[r][c] < target) {
      leftBaf = mid + 1;
    } else {
      rightBaf = mid - 1;
    }
  }
  return false;
};