/**
 * @param {number} n
 * @param {number[]} startPos
 * @param {string} s
 * @return {number[]}
 */
var executeInstructions = function (n, startPos, s) {
  const res = [];
  for (let i = 0; i < s.length; i++) {
    res[i] = dfs(startPos[0], startPos[1], i) - i;
  }
  return res;
  function dfs(x, y, idx) {
    if (x < 0 || y < 0) {
      return idx;
    }
    if (x >= n || y >= n) {
      return idx;
    }
    if (idx >= s.length) {
      return idx;
    }
    const [dx, dy] = comp(idx[s]);
    const res = dfs(x + dx, y + dy, idx + 1);
    console.log(res)
    return res;
  }
};
function comp(char) {
  if (char === "R") {
    return [0, 1];
  }
  if (char === "L") {
    return [0, -1];
  }
  if (char === "D") {
    return [1, 0];
  }
  return [-1, 0]
}
