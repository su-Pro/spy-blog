function selection(a) {
  const len = a.length;
  let temp,
      minIndex = -1;
  for(let i = 0;i < len - 1;i++){ // 找到最小每轮最小元素索引
    minIndex = i
    for(let j = i+1;j < len;j++) {
      minIndex = a[j] < a[minIndex] ? j : minIndex
    }
  // swap
    temp = a[i]
    a[i] = a[minIndex]
    a[minIndex] = a[i]
  }
  return a
}
