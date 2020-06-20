记录前端知识体系的点点滴滴，能力有限，持续更新。

> 自己挖的坑自己填！从2020年4月底开始维护，希望和你一起进步。

## 索引

#### [前端：H5/C3](#html--css)

#### [前端：浏览器原理](#浏览器)

#### [前端：ECMA-script](#es)

#### [前端：编码/组件练习](#编码/组件练习)

<br/>

#### [前端框架：vue](#vue)

#### [前端框架：React](#react)

<br/>

#### [前端工程：Webpack](#webpack)

#### [前端工程：Node.js](#nodejs)

#### [前端工程：性能优化](#性能优化)

<br/>

#### [基础：数据结构和算法](#数据结构算法)

#### [基础：网络](#网络)

#### [基础：正则表达式](#正则)

---


## HTML + CSS

[🛫 ](#索引)

### HTML
[高频知识点](./notes-htmlcss/html汇总.md)

### CSS

[CSS：选择器分类以及权重计算](https://github.com/sup-fiveyear/Notes/issues/14)

[盒模型汇总](https://github.com/sup-fiveyear/Notes/issues/4)

[BFC & IFC](https://github.com/sup-fiveyear/Notes/issues/5)

[请你描述一下 flex 布局](https://github.com/sup-fiveyear/Notes/issues/19)

[Grid 布局有了解吗？说说](https://github.com/sup-fiveyear/Notes/issues/22)

[层叠规则知道吗？](https://github.com/sup-fiveyear/Notes/issues/23)

[常见居中方案](./notes-htmlcss/常见居中.md)

- [ ] 移动端适配汇总
- [ ] 开发经验汇总
- [ ] 雪碧图实现
- [ ] 文本截断
- [ ] 边框画图
- [ ] 常见布局方案

## 浏览器

[🛫 ](#索引)

[了解浏览器吗？请简单描述一下浏览器的架构？](https://github.com/sup-fiveyear/Notes/issues/15)

[输入 URL 后，都发生了什么？请从浏览器的视角分析进行分析?](https://github.com/sup-fiveyear/Notes/issues/16)

[那具体分析一下浏览器在渲染这个环节做了那些事情？](https://github.com/sup-fiveyear/Notes/issues/17)

[了解浏览器是如何执行 js 脚本的吗？其大体流程是怎样的？](https://github.com/sup-fiveyear/Notes/issues/13)

[单线程的 JavaScript，是如何处理复杂的 web 交互的？](https://github.com/sup-fiveyear/Notes/issues/12)

[V8 的 GC 过程有了解吗？说说你的理解](https://github.com/sup-fiveyear/Notes/issues/9)

[DOM 和 事件相关汇总](./notes-浏览器/DOM.md)

[说一下 AJAX 和跨域吧？](./notes-浏览器/说一下AJAX和跨域.md)

## ES

[🛫 ](#索引)


[ES5 - JavaScript：数据类型](https://github.com/sup-fiveyear/Notes/issues/2)

[ES5 - 说一下什么是闭包？](https://github.com/sup-fiveyear/Notes/issues/6)

[ES5 - 原型的理解](./notes-JavaScript/ES5/ES5%20-%20你说一下你对原型的认识.md)

[ES5 - 继承方案](./notes-JavaScript/说说继承.md)

[ES6 - class 原理](./)

[ES6 - extends 原理？](https://github.com/sup-fiveyear/Notes/issues/20)

- [ ] this 指向问题？

[ES6 - 讲讲你理解的Promise](./notes-JavaScript/来一沓Promise.md)

[ES6 - Promise场景题汇总](./notes-JavaScript/promise练习.md)

[ES6 - 即兴一下async？](./notes-JavaScript/说说async的原理.md)

[汇总 - 数组api](./notes-JavaScript/数组常见API及实现.md)

### 编码/组件练习

#### 手写

[🛫 ](#索引)

[高阶函数之-初见AOP](notes-JavaScript/高阶函数之初见AOP.md)

[高阶函数之-函数柯里化](notes-JavaScript/高阶函数之函数柯里化.md)

[高阶函数之-after函数](/notes-JavaScript/高阶函数之after函数.md)

- [ ] 高阶函数之-compose函数

[实现简单：发布订阅模式](/notes-JavaScript/实现极简发布订阅.md)

- [ ] 实现简单：全局单利模式

[Promise - 实现PromiseA+](/notes-JavaScript/实现PromiseA+.md)

[Promise - 实现promisify?](/notes-JavaScript/promisify.md)

- [ ] Promise - 实现各路api

- [ ] async - 原理实现

[Nodejs- 实现eventEmitter](./练习-Nodejs/eventEmitter.js); (待写简要思路)

#### 组件

[vue - 封装懒加载指令](./组件/vue-懒加载/Note.md)

- [ ] 封装一个在线运行组件

- [ ] 封装一个表单验证吧

## vue

[🛫 ](#索引)

[吐血整理重点！](notes-vue/面试题.md)

[vuex：原理总结](notes-vue/vuex.md)

[vue-router：原理总结](notes-vue/vue-router.md)

[实现一个简单的数据侦测？](note-vue/../notes-vue/响应式原理.md)

[\$wtach 和 computed 实现原理？](notes-vue/$watch和computed.md)

[说说你对\$mount 和模板编译的理解？](notes-vue/$mount和模板编译原理.md)

[说一下你对nextTick的理解?](notes-vue/说一下你对$nextTick的理解.md)

- [ ] 详细说说虚拟 DOM？

## react

[🛫 ](#索引)

## webpack

[🛫 ](#索引)

## nodeJS

[🛫 ](#索引)

[NodeJs 有哪些特点？应用场景又有哪些？](notes-nodeJs/1.%20NodeJs有哪些特点？应用场景又有哪些？.md)

[V8、libuv 和 Nodejs 之间的关系？](notes-nodeJs/2.%20V8%20libuv%20和%20Nodejs之间的关系？.md)

[说说你对 global 以及 global.process 的理解？](notes-nodeJs/3.%20说说你对global%20以及global.process的理解？.md.md)

[说一下 Liubv 的事件循环机制？](notes-nodeJs/4.%20说一下Liubv的事件循环机制.md)

[说说你对模块化的理解？](notes-nodeJs/5.%20说说你对模块化的理解？.md)

[说一下Nodejs的异步编程吧？](notes-nodeJs/说一下Nodejs的异步编程吧.md)


## 性能优化

[🛫 ](#索引)

### 网络层面

[常见的图片格式有哪些？他们的区别是什么？](https://github.com/sup-fiveyear/Notes/issues/24)

[浏览器缓存策略有了解吗？](https://github.com/sup-fiveyear/Notes/issues/25)

[CDN 是什么？回源策略了解过吗？](https://github.com/sup-fiveyear/Notes/issues/28)

- [ ] webpack 对静态资源的压缩与合并

### 首次渲染

css 和 js 阻塞页面渲染？你怎么理解？

有了解同构应用吗（SSR）？

- [ ] SSR 项目技术沉淀

### 实际开发

[如何高性能渲染十万条数据？](../Notes/练习-实际开发/虚拟列表/README.md)


> 缓慢更新中

[🛫 ](#索引)
`
## 数据结构算法

### 数组

#### 排序

|                             出处                             |                          Hint + 解                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) |                                                              |
| [插入排序/选择排序/冒泡排序](https://zh.wikipedia.org/wiki/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F) |                       [基础排序汇总]()                       |
| [快速排序](https://zh.wikipedia.org/zh/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F) | [阮一峰老师 / 挡板思想 + swap](./练习-数据结构算法刷题/数组/排序/quickSort.js) |
| [归并排序](https://zh.wikipedia.org/wiki/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F) | [山里有座庙，庙里有个老和尚，旁边有个小和尚](./练习-数据结构算法刷题/数组/排序/merageSort.js) |
|                           三栈排序                           |                                                              |
|                           双栈排序                           |                                                              |
| [88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/) | [归并排序，谁大移谁(三指针)，注意合并逻辑条件](../Notes/练习-数据结构算法刷题/数组/排序/88.%20合并两个有序数组.js) |
| [75. 颜色分类](https://leetcode-cn.com/problems/sort-colors/) | [利用挡板思想进行排序分类，典型🌈问题](./练习-数据结构算法刷题/数组/排序/75.%20颜色分类.js) |
| [面试题 16.16. 部分排序](https://leetcode-cn.com/problems/sub-sort-lcci/) | [两趟，一正一反确定边界](./练习-数据结构算法刷题/数组/排序/面试题%2016.16.%20部分排序.js) |
| [169. 多数元素](https://leetcode-cn.com/problems/majority-element/) | [快速排序返回众数/hash计数](./练习-数据结构算法刷题/数组/排序/169.%20多数元素.js) |
|                            TODO：                            |                                                              |
|              〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️              |              〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️              |

- [ ] 基础排序手写一遍重温思想，mergeSort重温
- [ ] 排序时间复杂度总结
- [ ] 栈排序

#### 查找

| [Array.prototype.find()/findIndex()/indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) |                                                              |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [704. 二分查找](https://leetcode-cn.com/problems/binary-search/) | [相邻退出，进行后续处理](./练习-数据结构算法刷题/数组/二分查找/704.%20二分查找.js) |
|         base-在有重复的数组中返回第一个/最后一个元素         | [移动mid，直到加单退出](./练习-数据结构算法刷题/数组/二分查找/在有重复的数组中返回第一个指定元素.js) |
| [LintCode:460. 在排序数组中找最接近的K个数](https://www.lintcode.com/problem/find-k-closest-elements/description) | [范围所缩小至加单，中心开花](./练习-数据结构算法刷题/数组/二分查找/linkcode.找到最接近的k个数.js) |
| [74. 搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix/) | [map回矩阵：r = mid / col c = mid % col](./练习-数据结构算法刷题/数组/二分查找/704.%20二分查找.js) |
| [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/) | [找到元素，双指针左右移动](./练习-数据结构算法刷题/数组/二分查找/34.%20在排序数组中查找元素的第一个和最后一个位置.js) |
| [33. 搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/) | [分割后，必定一半是有序](练习-数据结构算法刷题/数组/二分查找/33.%20搜索旋转排序数组.js) |
| TODO：[378. 有序矩阵中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/) |                                                              |
|              〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️              |              〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️              |


#### ~

|                             出处                             |                          Hint + 解                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [面试题03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/) | [哈希/quickSort](练习-数据结构算法刷题/数组/217.存在重复元素.js) |
|   [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)   |         [map](./练习-数据结构算法刷题/1.两数之和.js)         |
| [11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/) | [双指针夹逼](./练习-数据结构算法刷题/数组/11.盛最多水的容器.js) |
| [283. 移动零](https://leetcode-cn.com/problems/move-zeroes/) | [双指针 + swap （不为0一起动）](./练习-数据结构算法刷题/数组/283.移动零.js) |
| TODO：[15. 三数之和](https://leetcode-cn.com/problems/3sum/) |                                                              |
|              〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️              |              〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️              |


### 栈 & 队列

|                                 出处                                  |               Hint + 解：                |
| :-------------------------------------------------------------------: | :--------------------------------------: |
| [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/) |  DOM 树如何维护层级关系？这题就怎么做..  |
|                              min stack？                              |                                          |
|                              双栈排序？                               |                                          |
|                              三栈排序？                               |                                          |
|                              实现队列？                               |                                          |
|                              矩形面积？                               |                                          |
|                              滑动窗口？                               |                                          |
|                             队列实现栈？                              |                                          |
|               〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️                | 〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️ |


### 链表

|                             出处                             |               Hint + 解：                |
| :----------------------------------------------------------: | :--------------------------------------: |
| [203. 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/) |           [思路：](./练习-数据结构算法刷题/链表/203.%20移除链表元素.js)                               |
| [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/) |                                          |
| [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/) |                                          |
|                      有序链表插入元素？                      |                                          |
| [86. 分隔链表](https://leetcode-cn.com/problems/partition-list/) |           [思路：](./练习-数据结构算法刷题/链表/86.%20分隔链表.js)                               |
| [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/) |                                          |
|                           重排链表                           |                                          |
| [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/) |                                          |
| [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/) | [思路：](./练习-数据结构算法刷题/链表/2.%20两数相加.js)                                         |
| [445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/) | [思路：](./练习-数据结构算法刷题/链表/445.%20两数相加%20II.js)|
|                     难度中等217merge sort 链表？？               |                                          |
| [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/) |           [思路:](./练习-数据结构算法刷题/链表/92.%20反转链表%20II.js)                               |
| [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/) |              [思路](./练习-数据结构算法刷题/链表/25.%20K%20个一组翻转链表.js)                            |
| [面试题 02.06. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list-lcci/) |                                          |
| [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/) | [思路：](./练习-数据结构算法刷题/链表/160.%20相交链表.js)|
|           〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️           | 〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️ |

### 树（和递归天然结合，因此融合了递归一部分题型，理解就好）

|                             出处                             |                   Hint + 解：                   |
| :----------------------------------------------------------: | :---------------------------------------------: |
| [二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal),(后序,前序) |  在模拟后续实现思路时，注意剪枝这个 hack 操作   |
| [429. N 叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/) | 利用 children 接口很简单，如果限制只能 DFS 呢？ |
| [110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/) |                                                 |
| [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/) |         左左 === 右右 && 左右 == 右左 👊         |
| [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/) |                                                 |
|                       二叉搜索树减枝？                       |                                                 |
|                       二叉树搜索区间？                       |                                                 |
| [958. 二叉树的完全性检验](https://leetcode-cn.com/problems/check-completeness-of-a-binary-tree/) |                                                 |
| [验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree) |                                                 |
| [二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree) |                                                 |
| [有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree) |                                                 |
| [面试题 07. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/) |   inorder\preorder 特点 + 分而治之 + sliceAPI   |
| [面试题 26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/) |          巧妙找到入口 + 精干的条件判断          |
| [面试题 27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/) |            画图找规律：swap 子树的值            |
| [面试题 32 - I. 从上到下打印二叉树](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/) |                      队列                       |
| [面试题 32 - II. 从上到下打印二叉树 II](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/) |                   队列 + 计数                   |
| [面试题 32 - III. 从上到下打印二叉树 III](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/) |        画图找规律：reverse 输出/双栈思想        |
| [面试题 34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/) |                  DFS + 回溯法                   |
|           〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️           |    〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️     |

### String

### Recursion + DFS

|                             出处                             |                         Hint + 解：                          |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/) |                                                              |
| [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/) | [递归穷举后，添加限制条件（括号正确性判断）](./练习-数据结构算法刷题/递归/22.括号生成.js) |
|  [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)   | [快速幂求值（注意数学边界），缩小问题规模（递归](练习-数据结构算法刷题/递归/50.pow-x-n.js) |
|    [78. 子集](https://leetcode-cn.com/problems/subsets/)     | [01 问题，加或者不加，注意引用值问题](练习-数据结构算法刷题/递归/78.子集.js) |
|   [51. N 皇后](https://leetcode-cn.com/problems/n-queens/)   |                                                              |
| [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/) |                                                              |
| [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/) |                                                              |
| [105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) |                                                              |
|           〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️           |           〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️           |

- [ ] [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)
- [ ]
- [ ] [46. 全排列](https://leetcode-cn.com/problems/permutations/) [47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)
- [ ] [17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/) [77. 组合](https://leetcode-cn.com/problems/combinations/)

### BFS

|                             出处                             |               Hint + 解：                |
| :----------------------------------------------------------: | :--------------------------------------: |
| [130. 被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/) |                                          |
| [K Smallest in Unsorted Array](https://github.com/publicclassoverflow/laicode/blob/master/src/G/HeapAndBFS/Medium/KSmallestInUnsortedArray) |                                          |
| [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/) |                                          |
| [127. 单词接龙](https://leetcode-cn.com/problems/word-ladder/) |                                          |
| [126. 单词接龙 II](https://leetcode-cn.com/problems/word-ladder-ii/) |                                          |
| [515. 在每个树行中找最大值](https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/) |                                          |
|           〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️           | 〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️ |

### DP

|                                                出处                                                |               Hint + 解：                |
| :------------------------------------------------------------------------------------------------: | :--------------------------------------: |
|                  [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)                   |     一维 dp，线性回头看（斐波那契）      |
|                    [55. 跳跃游戏](https://leetcode-cn.com/problems/jump-game/)                     |                                          |
|                 [45. 跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/)                  |                                          |
| [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/) |                                          |
|                              〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️                              | 〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️ |

### 箭指offer专题

|                                                              |                                                              |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                           **数组**                           |                                                              |
| [面试题03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/) | [排序 +diff / hash +diff / 索引排序](./练习-数据结构算法刷题/箭指offer/面试题03.%20数组中重复的数字.js) |
| 03-fllow up: [287. 寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/) | [数量二分法](练习-数据结构算法刷题/数组/二分查找/287.%20寻找重复数.js) |
|                           **链表**                           |                                                              |
| [面试题18. 删除链表的节点](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/) |                 [思路：](./练习-数据结构算法刷题/链表/面试题18.%20删除链表的节点.js)                                             |
| [面试题22. 链表中倒数第k个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/) |              [思路：](./练习-数据结构算法刷题/链表/面试题22.%20链表中倒数第k个节点.js)                                                |
| [面试题24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/) |                [思路：](./练习-数据结构算法刷题/链表/面试题24.%20反转链表.js)                                              |
| [面试题35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/) |                                                              |
| [面试题52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/) |                                                              |
|              〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️              |              〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️              |


## 网络

[🛫 ](#索引)

- [ ] 输入一个 url 会发生什么？

#### HTTP1.1

[你是如何理解 HTTP 的？特点有哪些？](/notes-网络/HTTP/你是如何理解HTTP的？特点有哪些？.md)

[你知道 HTTP 都有哪些版本吗？](/notes-网络/HTTP/你知道HTTP都有哪些版本吗？.md)

[说一下你对域名的理解](/notes-网络/HTTP/说一下你对域名的理解？.md)

[描述一下 HTTP 报文结构和常见的头部字段?](/notes-网络/HTTP/描述一下HTTP报文结构.md)

 [说一下 HTTP 的内容协商？](/notes-网络/HTTP/说一下%20HTTP%20的内容协商？.md)

[请求方法都有哪些？GET 和 POST 又有什么区别？](notes-网络/HTTP/请求方法都有哪些？GET和POST又有什么区别？.md)

[常见状态码说一下？](notes-网络/HTTP/常见状态码.md)

[HTTP 重定向有了解吗？](notes-网络/HTTP/HTTP%20重定向有了解吗？.md)

[说一下你了解的缓存策略？](notes-网络/TCP/../HTTP/说下你了解的缓存策略.md)

[HTTP 传输大文件有了解过吗？](notes-网络/HTTP/HTTP传输大文件有了解过吗？.md)

[了解 HTTP 长连接吧？那队头阻塞呢？](/notes-网络/HTTP/了解HTTP长连接吧？那队头阻塞呢？.md)

[描述一下 cookie？](/notes-网络/HTTP/说说你对cookie的理解%20.md)


[HTTP 性能优化方向有哪些？](/notes-网络/HTTP/HTTP%20性能优化方向有哪些？.md)

- [ ] 说说 HTTP 相关的代理有哪些？


- [ ] Restful API 了解吗？你的最佳实践是什么？

#### websocket

- [ ] 说说你对websocket的理解？
- [ ] 他的应用领域有哪些？
- [ ] websocket的长连接知道吗？

#### HTTP2

[HTTP 2/3 有了解吗？](/notes-网络/HTTP/说说HTTP2%20和HTTP3.md)

#### HTTPS

[说一下 HTTP 和 HTTPS 的区别](/notes-网络/HTTPS/说一下HTTP%20和%20HTTPS%20的区别.md)

[说说对称加密和非对称加密的理解？](/notes-网络/HTTPS/说说对称加密和非对称加密的理解？.md)

[摘要算法?和数据签名？](notes-网络/HTTPS/摘要算法?和数据签名？.md)

[说一下 TLS 握手](/notes-网络/HTTPS/说一下TLS%20建立连接过程.md)

[HTTPS优化策略有了解吗？](notes-网络/HTTPS/HTTPS优化策略有了解吗？.md)

#### TCP

[说说你是如何理解 TCP 的？](./notes-网络/TCP/说说你是如何理解TCP的？.md)

[简述一下 TCP 报文结构?](./notes-网络/TCP/简述一下TCP报文结构.md)

[描述一下你理解的TCP握手过程](./notes-网络/TCP/TCP建立连接？.md)

[说一下你对MSS和数据传输的理解？](./notes-网络/TCP/说说你对MSS的理解.md)

[说一下你对超时重传的理解？](./notes-网络/TCP/说说你对超时重传的理解.md)

[说说你对滑动窗口的理解？](./notes-网络/TCP/说说你对滑动窗口的理解.md)

[说说如何减少网络过程中的小报文？](./notes-网络/TCP/说说如何减少网络过程中的小报文？.md)

[知道慢启动、拥塞避免、快速重传和快速恢复吗？](./notes-网络/TCP/知道慢启动、拥塞避免、快速重传和快速恢复吗.md)

[那你知道选择性重传算法吗？（SACK）](./notes-网络/TCP/那你知道SACK和选择性重传算法吗.md)

[说说 TCP 断开的过程](./notes-网络/TCP/说说TCP挥手过程.md)

[知道TCP的keepalive机制吗？](./notes-网络/TCP/知道TCP的keepalive机制吗.md)

#### UDP

- [ ] 和 TCP 的区别？

- [ ] 为什么DNS使用UDP协议？

#### IP

### 正则


[🛫 ](#索引)