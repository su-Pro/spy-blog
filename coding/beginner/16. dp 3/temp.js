/**
 * @param {number[][]} grid
 * @return {number}
 */
var largest1BorderedSquare = function (grid) {
  const y = grid.length;
  const x = grid[0].length;
  // 在矩阵的行和列前初始化一行/列0值

  // 按照垂直方向的dp
  const yDp = Array.from(new Array(y + 1), () => new Array(x + 1).fill(0));
  // 按照水平方向的dp
  const xDp = Array.from(new Array(y + 1), () => new Array(x + 1).fill(0));

  let maxResult = 0;

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      if (grid[i][j] === 1) {
        // 等于相同行， + ← 列的值
        xDp[i + 1][j + 1] = xDp[i + 1][j] + 1;
        // 等于相同列，+ ↑ 行的值
        yDp[i + 1][j + 1] = yDp[i][j + 1] + 1;
      }
      const startEdgeLen = Math.min(xDp[i + 1][j + 1], yDp[i + 1][j + 1]);
      for (let k = startEdgeLen; k > 0; k--) {
        // if (isSquare(xDp, yDp, i + 1, j + 1, k)) {
          maxResult = Math.max(maxResult, k);
        // }
      }
    }
  }
  return maxResult * maxResult;
};
function isSquare(xDp, yDp, xIdx, yIdx, edgeLen) {
  const targetXLen = xDp[xIdx][yIdx - edgeLen + 1];
  const targetYLen = yDp[xIdx - edgeLen + 1][yIdx];
  if (targetXLen >= edgeLen && targetYLen >= edgeLen) {
    return true;
  }
  return false;
}
