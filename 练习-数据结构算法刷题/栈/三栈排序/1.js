/**
 * @param {number[]} nums
 * @return {number[]}
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  let stack1 = [],
    stack2 = [],
    globalMin,
    el = null;
  while(nums.length > 0) {
    globalMin = Infinity;
    // push到 stack2 中，并且记住最小的元素值
    while(nums.length > 0) {
      el = nums.pop()
      if(el < globalMin) {
        globalMin = el;
      }
      stack2.push(el);
    }
    // stack2往回吐，但是把globalMin留下
    while(stack2.length > 0) {
      el = stack2.pop()
      if(el == globalMin) {
        console.log(`找到globalMin 对应的 el`,globalMin,el,)
        stack1.push(el);
        continue;
        console.log('没有执行对应的那条');
      }
    }
  }
  return stack1;
};
let nums = [5,2,3,1]

sortArray(nums);
