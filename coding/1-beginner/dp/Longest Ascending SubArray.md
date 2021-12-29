[https://app.laicode.io/app/problem/86](https://app.laicode.io/app/problem/86)

## Description

Given an unsorted array, find the length of the longest subarray in which the numbers are in ascending order.

Assumptions

- The given array is not null

Examples

- {7, 2, 3, 1, 5, 8, 9, 6}, longest ascending subarray is {1, 5, 8, 9}, length is 4.
- {1, 2, 3, 3, 4, 4, 5}, longest ascending subarray is {1, 2, 3}, length is 3.

## solution 

### 1. goal & basic case

- ***goal？***
找到连续且最长的升序子数组
- ***basic case？***
数组中只有一个元素时，对应的结果为1.


### 2. growing & relation 

- ***growing***：

a. 根据basecase 初始化表格

| index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| array  | 7   | 2   | 3   | 1   | 5   | 8   | 9   | 6   |
| dp_map | 1   | 1   | 1   | 1   | 1   | 1   | 1   | 1   |

b. 当元素上升至两个（index -> 1）,检查和前一个元素的值（array[1] -> 7）组合后是否满足要求，该case 不满足条件，则长度保持1.

| index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| array  | 7   | 2   | 3   | 1   | 5   | 8   | 9   | 6   |
| dp_map | 1   | 1   | 1   | 1   | 1   | 1   | 1   | 1   |

c. 当元素上升至两个（index -> 2）,检查和前一个元素的值（array[1] -> 2）组合后是否满足要求，该case满足条件，则长度进行**累加**.

| index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| array  | 7   | 2   | 3   | 1   | 5   | 8   | 9   | 6   |
| dp_map | 1   | 1   | 2   | 1   | 1   | 1   | 1   | 1   |

...

| index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| array  | 7   | 2   | 3   | 1   | 5   | 8   | 9   | 6   |
| dp_map | 1   | 1   | 2   | 1   | 2   | 3   | 4   | 1   |

- ***realtion？***
需要检查前一个元素的值是否是小于当前元素，如果满足，则在此基础上+1；否则以自身为一个整体的开始（保持1）.

### 3. expr

- ***dp_map[i] represent what？***

从[0,i]，包含array[i]这个元素所组成的升序数组的长度.

- ***dp_map[i] = ？***

case 1：array[i] > array[i - 1] --> dp_map[i] = 1

case 2：array[i] < array[i - 1] --> dp_map[i] = dp_map[i - 1] + 1

***code***

```js

function longest(arr) {
  if (arr === null || arr.length <= 0) {
    return 0;
  }

  const dp_map = new Array(arr.length).fill(1);

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      continue;
    }
    dp_map[i] = dp_map[i - 1] + 1;
  }

  return dp_map.reduce((memo, cur) => (memo > cur ? memo : cur), 1);
}

console.log(longest([7, 2, 3, 1, 5, 8, 9, 6])); // 4
console.log(longest([1, 2, 3, 3, 4, 4, 5])); // 3
console.log(longest([1,1,1])); // 1
```