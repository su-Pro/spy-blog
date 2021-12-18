## 环形链表

[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

### 描述

给定一个链表，判断链表中是否有环。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

示例 1：

输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。

![20200621102738](https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200621102738.png)

示例 2：

输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。

![20200621102747](https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200621102747.png)

示例 3：

输入：head = [1], pos = -1
输出：false
解释：链表中没有环。

![20200621102754](https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200621102754.png)

进阶：

你能用 O(1)（即，常量）内存解决此问题吗？

### 思路

快慢指针问题

- 快指针每次移动两步，慢指针每次移动一步
- 如果链表不存在环，那么这个问题就和链表的中间节点一样，只不过返回 true 而已
- 如果链表存在环那么在某一时刻，快指针和慢指针一定会相遇。

### 代码

```js
var hasCycle = function (head) {
  if (head === null || head.next === null) {
    return false;
  }
  var fast = head.next.next;
  var slow = head;
  while (fast && fast.next) {
    // meet
    if (slow == fast) {
      return true;
    }
    fast = fast.next.next;
    slow = slow.next;
  }
  // 此时快指针已经到尾部或者出链表
  return false;
};
```

Time:链表中有 n 个节点，我们需要遍历整个列表。最坏情况下需要检查每一个节点（环出现在尾部） => O(n)

Space: 两个指针变量 => O(1)
