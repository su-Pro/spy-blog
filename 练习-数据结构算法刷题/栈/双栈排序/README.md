## 双栈排序

[912. 排序数组](https://leetcode-cn.com/problems/sort-an-array/)

### 描述
给你一个整数数组 nums，请你将该数组升序排列。

示例 1：

输入：nums = [5,2,3,1]
输出：[1,2,3,5]
示例 2：

输入：nums = [5,1,1,2,0,0]
输出：[0,0,1,1,2,5]
 

提示：

1 <= nums.length <= 50000
-50000 <= nums[i] <= 50000

### 思路

典型的选择排序思路

- stack2的物理意义：保留有序的元素，也能够接受stack1的元素
- 首先将stack1中（给的源数据）全部吐到stack2中，并记录最小值
    - stack2 把最小值留下，其他元素吐回给stack1
- 当stack1为空时，stack2为全部有序

- stack2 在判断是否为最小值时有三种可能
    - 当前top元素是大于最小元素的：直接push回去
    - 当前top元素是等于最小元素的：维护一个count，标识重复（首次排序）的次数，因此进行一个post process既可
        - 当stack2完成回吐操作后，会根据count的数量，将当前的最小元素复制到stack2中  
    - 当前top元素是小于最小元素的：说明已经到达已排序元素的范围内，直接break
### 代码

```js
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

```

#### 复杂度

Time: O(n ^ 2)

Space: O (n)
