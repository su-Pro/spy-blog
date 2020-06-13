/**输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 * 
 * 定义三个指针 i j cur;
 * 物理意义分别为：
 *  i: nums1中，从i以左是没有进行处理的元素
 *  j： nums2中，从j以左是没有处理的元素
 *  cur：指向nums1中末尾的0，在比较i j 元素后，将最大的元素填充至cur位置。
 * 
 *  1. 利用归并排序思想，谁大移谁即可(比较i 和 j)
 *  2. 当j出界时说明合并完毕退出循环即可
 */
var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    cur = nums1.length - 1;
  //  谁小移动谁
  /** */
  while (j >= 0) {
    // 需要处理当i 一直大，到头后直接把j放入指定位置即可
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[cur--] = nums1[i--]
    } else { // i < 0 || nums1[i] < nums2[j]
      nums1[cur--] = nums2[j--]
    }
  }
  return nums1;
};