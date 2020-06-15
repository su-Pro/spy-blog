/**
 * @param A: an integer array
 * @param target: An integer
 * @param k: An integer
 * @return: an integer array
 */
const kClosestNumbers = function (A, target, k) {
  let leftBaf = 0, rightBaf = A.length - 1, mid = 0;
  let res = new Array(k);
  let n = 0;// 标识当前已经找到的元素数量，只有他小于k的时候呢，我们才会继续中心开花移动
  let leng = A.length; // 用来标识右边界的，在中心开花时，有出界的可能性

  while (leftBaf + 1 < rightBaf) {
    mid = Math.floor((leftBaf + rightBaf) / 2);
    // 只需要移动边界，模糊定位最接近的两个值即可
    if (A[mid] < target) {
      leftBaf = mid;
    } else {
      rightBaf = mid;
    }
  }
  // leftBaf 和 rightBaf 是最接近target的两个数
  // 后续处理： 
  // 判断leftBaf 以及rightBaf 谁更接近target，将其加入结果中，并向左（向右） 移动
  while (n < k && leftBaf >= 0 && rightBaf < leng) {
    if (Math.abs(target - A[leftBaf]) <= Math.abs(target - A[rightBaf])) {
      res[n++] = A[leftBaf--]
    } else {
      res[n++] = A[rightBaf++]
    }
  }
  // 如果n没达到k上限，且退出了循环，说明一定左 | 右 出界
  // 此时需要将没有出界的元素加入到数组中

  while (n < k && leftBaf >= 0) {
    res[n++] = A[leftBaf--]
  }
  while (n < k && rightBaf < leng) {
    // 处理右边
    res[n++] = A[rightBaf++]
  }
  return res;
}