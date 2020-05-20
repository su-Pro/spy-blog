const arr = [
  [0, 1],
  [3, 4],
  [5, 6]
]
console.log(arr.length) // 行
console.log(arr[0].length); // 列

console.log(binarySearch(arr, 8));

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
