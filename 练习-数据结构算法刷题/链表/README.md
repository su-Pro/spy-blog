## 翻转链表，经典的一道题（基础很重要）

思路：
 - 保存当前head（cur） 的后继节点（nextNode）
 - 切断cur和后续节点的指针，并指向prev
 - 移动prev 到 当前head的位置
 - 移动head 到保存好的后继节点


```javascript
function reverse(Linked) {
  if (Linked == null || Linked.next === null) {
    return;
  }
  var prev = null,
      cur = Linked;
  while(cur !== null) {
    var nextNode = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;
  }
  return prev;
}

```

递归做法：
- 通过递归拿到新链表的头部,注意此时应该是倒数第二个节点
- 一步一步翻转，注意需要切断当前节点的指针
- 返回base case 的节点（末尾节点）

```javascript
function reverseLinkList(node) {
  // base case;
  if(node === null || node.next === null) {
    return node;
  }
  // 拿到 newHead 也就是链表的尾巴，需要保存当前的位置指针，作为返回值，使得能够拿到正确的链表头部
  var newHead = reverseLinkList(node.head);
  // 一步一步的翻转
  node.next.next = node;
  // 置空防止循环指向
  node.next = null;
  return newHead
}
```

## 找到链表的中点

快慢指针，当快指针到链表的尾部后，慢指针刚好到链表的中点。

注意：在快指针移动时，应该是两步两步走。

```javascript
function FindMiddleNode (node){
	if(node == null){
		return;
	}
	let slow = node;
	let fast = node.next;
	while(fast && fast.next){
		slow = slow.next;
		fast = fast.next.next;
	}
  //fast到尾部 此时的slow刚好在中间    
	return slow;
}
```

## 判断单链表是否存在环

思路：快慢指针，当快指针能够移动到尾部时（或者走出链表），确定不存在环。
否则当他们相遇时，认为链表必定存在环。

```javascript
function checkLoop(node) {
  if(node === null || node.next === null) {
    return false;
  }
  var fast = node.next.next;
  var slow = node;
  while(fast && fast.next) {
    // 相遇时
    if(slow == fast){
      return true;
    }
    fast = fast.next.next;
    slow = slow.next;
  }
  // 此时快指针已经到尾部或者出链表
  return false;
}
```

## 在有序链表中插入节点

case1: 1 -> 5 -> 9 -> 14  插入元素： 6  ==> 1 -> 5 ->\ 6 -> \9 -> 14

case2: 1 -> 5 -> 9 -> 14  插入元素： 0  ==> \0 -> \ 1 -> 5 -> 9 -> 14

case3: 1 -> 5 -> 9 -> 14  插入元素： 20  ==> 1 -> 5 -> 9 -> 14 -> 20

思路：
- 首先check是否是在链表头部插入元素
- 创建移动指针，找到链表的正确位置（o(n)）
- 一刀两半，将插入的元素拼接在两段链表中，注意兼容case3
- 返回正确的头部节点

```javascript
function insertTarget (node,target){
  // 不做处理
  if(node === null || target == null) {
    return;
  }
  // 头部情况
  if(node.val > target) {
    target.next = node;
    return target;
  }
  // 中间情况
  var runNode = node;
  while(runNode.next && runNode.next.val < target) {
    runNode = runNode.next;
  }
  // 找到正确位置，包含了两种情况：在中间 和直接到尾部；
  // 此时情况是：runNode的next节点大于target，需要在runNode和runNode.next切刀
  // 并将target拼接起来
  runNode.next = target;
  if(runNode.next !== null){ // 如果runNode已经到达链表的尾部，不需要拼接
    target.next = runNode.next;
  }
}
```

## 合并有序链表
例：a:1 -> 4 -> 7  b:2 -> 5 合并 =>  1 -> 2 -> 4 -> 5 -> 7

思路：
- 构造一个dummyNode，用于组装有序处理后的元素，并作为最终结果返回（dummyNode.next）
- 在有序处理过程中，选用双指针思想，谁小移谁
- 后续处理，将剩余的链表补位

```javascript
function merge (l1,l2) {
  // 有空的情况下不做处理
  if(!l1 || !l2){
    return ;
  }
  var dummyHead = new Linkist(-1);
  // 用于遍历dummy的run指针，使得最终能够直接返回正确的dummyHead
  var runDummy = dummyHead;
  // 只要有一个到尽头，结束谁小移谁
  while(l1 && l2) {
    var i = l1.val;
    var j = l2.val;
    if(i < j) { 
    // 移动并且插入到dummy中
    runDummy.next = l1;
    l1 = l1.next; 
    }else {
      runDummy.next = l2;
      l2 = l2.next;
    }
    // 别忘了让dummy也run起来
    runDummy = runDummy.next;
  }
  // post process
  if(l1 || l2) {
    runDummy.next = l1 ? l1 : l2;
  }
  // 注意跨过dummyHead;
  return dummyHead.next;
}
```

递归思路
* [ ] 需要借助递归树来解释，暂时摆在这里

（其实也好理解，利用递归去帮你做循环操作的事情，只是在链表拼接的时候不太好理解，画画递归树，核心在于递归压下去的那行代码，已经解决谁小移动谁并拼接）
```javascript

function _merge (l1,l2) {
  //到尾部后，处理两种后续情况
  if(!l1) return l2;

  if(!l2) return l1;

  if(l1.val <= l2.val) { // 谁小移谁，并进行拼接返回
    l1.next = _merge(l1.next,l2)
    return l1;
  }else {
    l2.next = _merge(l1,l2.next)
    return l2;
  }
}
```

## 分隔链表

给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

示例:

输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5

思路：（承接合并有序链表，额外需要tail指针处理）
- 构造两个dummyNode,a链表保存小于x的节点，b链表保存大于等于x的节点。
- run 一遍给定的head链表，将节点置于a链表和b链表
- 合并a链表和b链表（注意dummy的处理）
- 处理最后一个tail指针，防止成环

```javascript
function partition (head,x) {
  if(!head || !head.next) {
    return;
  }
  // 用于保存 partition后的节点
  var dummyHeadA = new ListNode(-1);
  var dummyHeadB = new ListNode(-1);

  // 用于run Dummy链表
  var runDummyA = dummyHeadA;
  var runDummyB = dummyHeadB;

  // 遍历 head 链表
  while(head) {
    if(head.val < x) {
      //向 A 插入
      runDummyA.next = x;
      runDummyA = runDummyA.next;
    }else {
      // 向 B 插入
      runDummyB.next = x;
      runDummyB = runDummyB.next;
    }
    head = head.next;
  }
  // 已经 partition 完毕，现在要拼接 + 置空tail指针
  runDummyA.next = dummyHeadB.next; // 注意是dummyB.next;
  // 置空
  runDummyB.next = null;
  return dummyHeadA.next;
}
```
## 重排链表

给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例 1:

给定链表 1->2->3->4, 重新排列为 1->4->2->3.

示例 2:

给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.


思路：（接着承接上面的题...找到规律一点不复杂）
- 找到链表的中点，将其拆分为链表a 和链表b
- 翻转链表b
- merge 链表a 和链表b one by one 

```javascript

function reorderList (head) {
    if(!head) {
        return;
    }
    var dummyHead = new ListNode(-1);
    dummyHead.next = head;

    var linklistA = head;
    var linklistB = null;
    // 用于查找链表中点
    var fast = head;
    var slow = head;
    // step one; 
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    // 此时的中点是slow指针
    // step two
    linklistB = reverse(slow.next); 
    slow.next = null; // slow无用遂置空

    // step three merge

    while(linklistA && linklistB) {
        // 用于移动链表A 和 B
        var Anext = linklistA.next;
        var Bnext = linklistB.next;

        // one by one 链接，看示例
        linklistB.next = linklistA.next;
        linklistA.next = linklistB;

        // 向前移动
        linklistA = Anext;
        linklistB = Bnext;
    }
    return dummyHead.next;
    function resvse(node) {
        // base case
        if(!node || !node.next) {
            return node;
        }
        var _node = reverse(node.next);
        _node.next.next = _node;
        _node.next = null;
        return _node;
    }
}
```
## 两两交换链表的节点

* [ ] 循环解法

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

 

示例:

给定 1->2->3->4, 你应该返回 2->1->4->3.

* [] 补思路图

思路：（典型的递归翻转链表）
- 两两一组翻转链表
- 注意理解虚线框 在谁头上的问题
- 需要画图理解


```javascript
function swapPairs (head) {
// base case
  if(head.next === null) {
    return head;
  }
  let firstNode = head;
  let secondeNode = head.next;

  firstNode.next = swapPairs(secondeNode.next);
  secondeNode.next = firstNode;
  return secondeNode;
}
```

##反转链表（2）

反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

示例:

输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL

思路：
- 利用题目给定条件m 和 n 找到 需要翻转的个数x，以及开始的位置
- 翻转 从开始位置的 x 个链表
- 翻转过程中需要注意：base case 以及 记录tail指针
```javascript
var reverseBetween = function(head, m, n) {
  if( m === 1) {
    // 找到目标元素 进入翻转阶段
    return helper(head,n);
  }
    // 利用题目给定条件的特点
  head.next = reverseBetween(head.next,m - 1,n - 1);
    // 返回原始的head
  return head;

  function helper (head,n) {
//  边界条件
  if(n === 1) {
      // 记录n的下一个tail指针
    var tailNextNode = head.next;  // 反模式
    return head;
  }
//  返回给翻转前的指针进行拼接
  let _head = helper(head.next,n - 1);
  // 完成翻转操作
  _head.next.next = _head;
  _head.next = tailNextNode;
  return _head;
}
};
```

## 回文链表

