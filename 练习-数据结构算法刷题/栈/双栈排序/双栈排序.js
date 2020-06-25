/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(s1) {
  if(s1 === null || s1.length <= 1 ) {
    return s1;
  }
  let s2 = [];
  // 排序每一个元素,如果动态获取s1的长度，会导致意外发生
  let n = s1.length
  for(let i = 0; i < n;i++) {
    // step1：将stack1的元素全部吐到stack2中，并记录最小的元素
    let globalMin = Infinity;
    while(s1.length > 0 ) {
      let current = s1.pop();
      globalMin = Math.min(globalMin,current);
      s2.push(current);
    }
    // step2：把stack2中未排序的元素吐回stack1
    /**
     * 三种情况：
     * 1. top元素大于最小元素，直接push回即可
     * 2. top元素小于最小元素, 说明进入了已经排好序的元素中，直接break
     * 3. top元素等于最小元素，为了保证能够处理重复元素，同样会pop出去，但是要维护一个count，让count + 1即可
     */
    let count = 0;
    while(s2.length > 0) {
      let top = s2[s2.length - 1];
      if(top > globalMin) {
        s1.push(s2.pop());
      }else if (top < globalMin) {
        break;
      }else {
        // 需要记重
        s2.pop();
        count++
      }
    }
    /**
     * post process
     *
     *
     * - 如果count 大于1，需要把重复的元素也放入已排序的屁股后
     *
     * - 清空count？不需要，每次循环维护一个新的count即可。
     *
     *  */
    for(let i = 0;i < count;i++) {
      s2.push(globalMin)
    }
  }
  return s2
};
