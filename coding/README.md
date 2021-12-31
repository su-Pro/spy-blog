# index

## solid skill

### binary search

- [ ] [704. Binary Search](https://leetcode-cn.com/problems/binary-search/)

| 题目                                                                                   | 类型                 | callback   |
| -------------------------------------------------------------------------------------- | -------------------- | ---------- |
| [35. Search Insert Position](https://leetcode-cn.com/problems/search-insert-position/) | #binary-search #细节 | 初始化边界 |
| [278. First Bad Version](https://leetcode-cn.com/problems/first-bad-version/)          | #binary-search       | 后续处理   |
| [278. First Bad Version](https://leetcode-cn.com/problems/first-bad-version/)          | #binary-search       | 后续处理   |



### 回溯/贪心
- 解决一个问题需要多个步骤，每一个步骤有多种选择。
- 可以使用贪心算法解决的问题，每一步只需要解决一个子问题，只做出一种选择，就可以完成任务。

> 关联的：回溯、DP
> 「回溯算法」需要记录每一个步骤、每一个选择，用于回答所有具体解的问题；
> 「动态规划」需要记录的是每一个步骤、所有选择的汇总值（最大、最小或者计数）;
> 「贪心算法」由于适用的问题，每一个步骤只有一种选择，一般而言只需要记录与当前步骤相关的变量的值；

- [x] [[455. assign-cookies]]


| 题目                                                                      | 类型    | callback                |
| ------------------------------------------------------------------------- | ------- | ----------------------- |
| [860. lemonade-change](https://leetcode-cn.com/problems/lemonade-change/) | #greedy | [[455. assign-cookies]] |


### sort
- [ ] [[912. 排序数组#quick_sort|快速排序]]
- [ ] [[912. 排序数组#merge_sort|归并排序]]


| 题目                                                                                          | 类型               | callback |
| --------------------------------------------------------------------------------------------- | ------------------ | -------- |
| [189. Rotate Array](https://leetcode-cn.com/problems/rotate-array/)                           | #技巧 #two-pointer | 反转数组 |
| [977. Squares of a Sorted Array](https://leetcode-cn.com/problems/squares-of-a-sorted-array/) | #two-pointer       | 对向而行 |


### runPointer

包含滑动窗口题型

| 题目                                                                                                                 | 类型                       | callback |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------- |
| [14. Longest Common Prefix](https://leetcode-cn.com/problems/longest-common-prefix/)                                 | #two-pointer #string-match |          |
| [1995. Count Special Quadruplets](https://leetcode-cn.com/problems/count-special-quadruplets/)                       | #two-pointer #hash         |          |
| [643. Maximum Average Subarray I](https://leetcode-cn.com/problems/maximum-average-subarray-i/)                      | #sliding-window            |          |
| [1752. Check if Array Is Sorted and Rotated](https://leetcode-cn.com/problems/check-if-array-is-sorted-and-rotated/) | #技巧                      |          |
| [846. Hand of Straights](https://leetcode-cn.com/problems/hand-of-straights/)                                        | #two-pointer #hash         |          |


### linkList

- [ ] [[206. 反转链表|基本功：单节点反转链表]]

| 题目 | 类型 | callback |
| ---- | ---- | -------- |
|      |      |          |

### string

| 题目 | 类型 | callback |
| ---- | ---- | -------- |
|      |      |          |

### recursion

#### 基本功

- [ ] [[509. 斐波那契数]]
- [ ] [[50. Pow(x, n)]]

 #### 数据结构相结合
 
 ***矩阵 ***
- [x] [[51. N 皇后]]
- [x] [[59. 螺旋矩阵 II]]

---

 ***链表***
- [ ] [[206. 反转链表|callback: 「虚线框递归法」单节点反转]]
- [ ] [[92. 反转链表 II|「虚线框递归法」成对反转]] 
- [ ] [[25. K 个一组翻转链表|「虚线框递归法」k组反转]]

---
 ***字符串***
- [ ] [[344. 反转字符串]]
- [ ] [[408. 有效单词缩写]]

---
 ***树***(二叉树 delay 233s)
Pasted image 20211223102130.png

---

| 题目                                                                                             | 类型        | callback |
| ------------------------------------------------------------------------------------------------ | ----------- | -------- |
| [1361. Validate Binary Tree Nodes](https://leetcode-cn.com/problems/validate-binary-tree-nodes/) | #tree #技巧 |          |
|                                                                                                  |             |          |


### dp
#### dp - 1 
[[Longest Ascending SubArray]]
[[剑指 Offer 14- I. 剪绳子]]
[[55.跳跃游戏]]
#### dp - 2
[[45.跳跃游戏 II]]
[[53.最大子数组和]]
[[139. 单词拆分]]
[[72. 编辑距离]]
[[221. 最大正方形]]
#### dp - 3
[[53.最大子数组和 | callback question0]]
[[485. 最大连续 1 的个数]]
[[764. 最大加号标志]]
[[1139. 最大的以 1 为边界的正方形]]
未知题目（Path-Prefix）：![[Pasted image 20211220104304.png]]
[[面试题 17.24. 最大子矩阵]]

相似问题:
https://leetcode-cn.com/problems/count-square-submatrices-with-all-ones/

| 题目                                                                                                  | 类型                       | callback/note                  |
| ----------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------ |
| [1480. Running Sum of 1d Array](https://leetcode-cn.com/problems/running-sum-of-1d-array/)            | #PrefixSum #线性DP         | [[Longest Ascending SubArray]] |
| [303. Range Sum Query - Immutable](https://leetcode-cn.com/problems/range-sum-query-immutable/)       | #PrefixSum #线性DP #有问题 | 不太懂为什么dp的长度要加+1     |
| [304. Range Sum Query 2D - Immutable](https://leetcode-cn.com/problems/range-sum-query-2d-immutable/) | #PrefixSum #矩阵DP         | [[221. 最大正方形]]            |
| [746. Min Cost Climbing Stairs](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)           | #线性DP                    | [[55.跳跃游戏]]                |
| [70. Climbing Stairs](https://leetcode-cn.com/problems/climbing-stairs/)                              | #线性DP                    | [[Longest Ascending SubArray]] |
| [70. Climbing Stairs](https://leetcode-cn.com/problems/climbing-stairs/)                              | #线性DP                    | [[Longest Ascending SubArray]] |

[[322.Coin Change]]
[[53.最大子数组和]]
[[300.最长递增子序列]]
[[343.整数拆分]]
[[152. 乘积最大子数组]]
[[198.打家劫舍]]
[[213.打家劫舍 II]]
[[55.跳跃游戏]]
[[45.跳跃游戏 II]]
[[1014.最佳观光组合]]

- [256. 粉刷房子](https://leetcode-cn.com/problems/paint-house/)
- [[120. 三角形最小路径和]]

### 数学

| 题目                                                                                                         | 类型     | callback    |
| ------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| [507. Perfect Number](https://leetcode-cn.com/problems/perfect-number/)                                      | #Math    | 完全平方数? |
| [1360. Number of Days Between Two Dates](https://leetcode-cn.com/problems/number-of-days-between-two-dates/) | #Date #Math  ˇ|             |

## contest
[[第 273 场周赛]]

## recursion; functional; scheme

## books

### 《挑战程序设计竞赛》

#### 1. 蓄势待发

- (抽签) [18. 4Sum](https://leetcode-cn.com/problems/4sum/)
- (三角形) [976. Largest Perimeter Triangle](https://leetcode-cn.com/problems/largest-perimeter-triangle/)
- (Ants) [1503. Last Moment Before All Ants Fall Out of a Plank](https://leetcode-cn.com/problems/last-moment-before-all-ants-fall-out-of-a-plank/)


#### 2.《剑指offer》 & 专项练习
- 《编程之美》
- 《编程珠玑》