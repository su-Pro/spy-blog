/**
 * @param {number[]} arr
 * @return {number[]}
 */
 var getDistances = function(arr) {
  const map = new Map();
  for(let i = 0;i < arr.length;i++) {
    if(!map.has(arr[i])) {
      map.set(arr[i],[])
    }
      map.get(arr[i]).push(i);
  }
  let res = [];
  for(let i = 0;i < arr.length;i++) {
    res[i] = findSum(arr[i],i)
  }
  return res;

  function findSum(num,idx) {
    const res = map.get(num);
    let count = 0;
    for(const n of res) {
      if(n === idx) {
        continue;
      }
      count += Math.abs(n - idx)
    }
  return count;
  }
};