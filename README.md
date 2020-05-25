
## 概述

以前端面试为契机对已掌握的知识进行重组和复习，持续更新中（最近在重构 有点乱）。

如果觉得对您有用，点个star支持一下哈~

如果你也是校招党，想一起复习交流，可以私信我（我组织了一个突击小组）~


## 索引

点击即可跳转,🖕可以回到索引

#### [前端编码练习](#前端编码练习)
#### [数据结构](#数据结构整理索引)
#### [算法基本功](#算法基本功-索引)
#### [H5/C3](#h5c3-索引)
#### [ECMA-script](#es-索引)
#### [浏览器原理](#浏览器-索引)
#### [网络](#网络-索引)
#### [性能优化](#性能优化-索引)
#### [vue](#vue-索引)
#### [React](#react-索引)
#### [Node.js](#nodejs-索引)
### 前端编码练习 [🖕](#索引)
#### 功能函数手写

| <div style="width: 300pt"> [汇总](./练习-JavaScript部分/功能函数汇总/index.md) |<div style="width: 300pt"> Hint | <div style="width: 50pt">练习次数 |
| :----------: | :----------: | :----------: |
|                     解析url参数                     |      |          |
|                      数组平拍                       |      |          |
|                      数组去重                       |      |          |
|           编写parse函数，实现对象值的访问           |      |          |
|                      防抖节流                       |      |          |
|                    多级函数curry                    |      |          |
|                     图片懒加载                      |      |          |
|                    深对象冻结？                     |      |          |
|             Object.assign？ 和 深拷贝?              |      |          |
|               实现指定数量的并发限制                |      |          |
|                    手写深比较？                     |      |          |
|                                               



#### web原理模拟

- 封装AJAX
- Nodejs-事件系统 


#### 封装组件


### 数据结构整理[🖕](#索引)

### 算法基本功 [🖕](#索引)

#### 数组

|                             <div style="width: 300pt">汇总                             |              <div style="width: 300pt">Hint              |<div style="width: 50pt"> 练习次数 |
| :----------------------------------------------------------: | :----------------------------: | :------: |
|   [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)   |              map               |   🇨🇳🇨🇳   |
| [11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/) |           双指针夹逼           |   🇨🇳🇨🇳   |
| [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)（dp） | 一维dp，线性回头看（斐波那契） |   🇨🇳🇨🇳   |
| [283. 移动零](https://leetcode-cn.com/problems/move-zeroes/) |          指针 + swap           |   🇨🇳🇨🇳   |
|                          3数之和？                           |                                |          |
|                          选择排序？                          |                                |          |
|                            快排？                            |                                |          |
|                          归并排序？                          |                                |          |
|                          彩虹排序？                          |                                |          |

#### 二分法

| <div style="width: 300pt">汇总 |<div style="width: 300pt"> Hint | <div style="width: 50pt">练习次数 |
| :--: | :--: | :------: |
|      |      |          |
|      |      |          |
|      |      |          |
|      |      |          |

#### 栈

|     <div style="width: 300pt">                        汇总                             |        <div style="width: 300pt">         Hint                  |<div style="width: 50pt"> 练习次数 |
| :----------------------------------------------------------: | :-----------------------------------: | :------: |
| [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/) | DOM树如何维护层级关系？这题就怎么做.. |   🇨🇳🇨🇳   |
|                         min stack？                          |                                       |          |
|                          双栈排序？                          |                                       |          |
|                          三栈排序？                          |                                       |          |
|                          实现队列？                          |                                       |          |
|                          矩形面积？                          |                                       |          |
|                                                              |                                       |          |
|                                                              |                                       |          |
|                                                              |                                       |          |

#### 队列

|   <div style="width: 300pt">   汇总     | <div style="width: 300pt"> Hint | <div style="width: 50pt"> 练习次数 |
| :----------: | :--: | :------: |
|  滑动窗口？  |      |          |
| 队列实现栈？ |      |          |
|              |      |          |
|              |      |          |

#### 链表

|<div style="width: 300pt">  [链 表解题汇总](https://github.com/sup-fiveyear/interview-code/tree/master/%E7%AE%97%E6%B3%95%2B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/%E9%93%BE%E8%A1%A8) |<div style="width: 300pt">  Hint | <div style="width: 50pt"> 练习次数 |
| :----------------------------------------------------------: | :--: | :------: |
| [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/) |      |    💯     |
| [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/) |      |    🇨🇳    |
| [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/) |      |    🇨🇳    |
|                      有序链表插入元素？                      |      |          |
| [86. 分隔链表](https://leetcode-cn.com/problems/partition-list/) |      |    🇨🇳    |
| [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/) |      |    🇨🇳    |
|                           重排链表                           |      |    🇨🇳    |
| [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/) |      |    🇨🇳    |
| [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/) |      |          |
|                     merge sort 链表？？                      |      |          |
| [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/) |      |    💯     |
| [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/) |      |          |
| [面试题 02.06. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list-lcci/) |      |          |
|                                                              |      |          |
|                                                              |      |          |
|                                                              |      |          |

#### 二叉树



|<div style="width: 300pt">  [树 解题汇总](https://github.com/sup-fiveyear/interview-code/tree/master/%E7%AE%97%E6%B3%95%2B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/%E6%A0%91) |                    <div style="width: 300pt"> Hint                    | <div style="width: 50pt"> 练习次数 |
| :----------------------------------------------------------: | :----------------------------------------: | :------: |
| [二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal),后序,前序 |                                            |    💯     |
| [110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/) |                                            |    🇨🇳    |
| [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/) |      左左 === 右右 && 左右 == 右左 👊       |    🇨🇳    |
| [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/) |                                            |    🇨🇳    |
|                       二叉搜索树减枝？                       |                                            |          |
|                       二叉树搜索区间？                       |                                            |          |
| [958. 二叉树的完全性检验](https://leetcode-cn.com/problems/check-completeness-of-a-binary-tree/) |                                            |          |
| [验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree) |                                            |          |
| [二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree) |                                            |          |
| [有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree) |                                            |          |
| [面试题07. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/) | inorder\preorder特点 + 分而治之 + sliceAPI |    🇨🇳    |
| [面试题26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/) |       巧妙找到入口 + 精干的条件判断        |    🇨🇳    |
| [面试题27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/) |          画图找规律：swap子树的值          |    🇨🇳    |
| [面试题32 - I. 从上到下打印二叉树](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/) |                    队列                    |    🇨🇳    |
| [面试题32 - II. 从上到下打印二叉树 II](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/) |                队列 + 计数                 |    🇨🇳    |
| [面试题32 - III. 从上到下打印二叉树 III](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/) |     画图找规律：reverse 输出/双栈思想      |    🇨🇳    |
| [面试题34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/) |                DFS + 回溯法                |    🇨🇳    |
|                                                              |                                            |          |
|                                                              |                                            |          |
|                                                              |                                            |          |
|                                                              |                                            |          |

#### hashTable

#### String

#### recursion

#### DFS-1

#### DFS-2

#### DP-1

#### DP-2

#### DP-3

####  

### HTML + CSS [🖕](#索引)

- [ ] HTML5汇总

- [ ] WebSocket基础和聊天室实现

  

[CSS：选择器分类以及权重计算](https://github.com/sup-fiveyear/Notes/issues/14)

[盒模型汇总](https://github.com/sup-fiveyear/Notes/issues/4)

[BFC & IFC](https://github.com/sup-fiveyear/Notes/issues/5)

[请你描述一下flex布局](https://github.com/sup-fiveyear/Notes/issues/19)

[Grid布局有了解吗？说说](https://github.com/sup-fiveyear/Notes/issues/22)

[层叠规则知道吗？](https://github.com/sup-fiveyear/Notes/issues/23)

- [ ] 移动端适配汇总

- [ ] 开发经验汇总 
- [ ] 雪碧图实现   
- [ ] 文本截断     
- [ ] 边框画图    
- [ ] 常见布局方案 







### ES [🖕](#索引)

[JavaScript：数据类型](https://github.com/sup-fiveyear/Notes/issues/2)

#### 原型部分

[你说一下你对原型的认识](https://github.com/sup-fiveyear/Notes/issues/3)

* [ ] 继承方案都有哪些？


[ES6 - class原理有了解吗？](https://github.com/sup-fiveyear/Notes/issues/18)

[extends关键字原理？](https://github.com/sup-fiveyear/Notes/issues/20)

#### 闭包：

[说一下什么是闭包？](https://github.com/sup-fiveyear/Notes/issues/6)

* [ ] this指向问题？


### 浏览器 [🖕](#索引)

[了解浏览器吗？请简单描述一下浏览器的架构？](https://github.com/sup-fiveyear/Notes/issues/15)

[输入URL后，都发生了什么？请从浏览器的视角分析进行分析?](https://github.com/sup-fiveyear/Notes/issues/16)

[那具体分析一下浏览器在渲染这个环节做了那些事情？](https://github.com/sup-fiveyear/Notes/issues/17)

[了解浏览器是如何执行js脚本的吗？其大体流程是怎样的？](https://github.com/sup-fiveyear/Notes/issues/13)

[单线程的JavaScript，是如何处理复杂的web交互的？](https://github.com/sup-fiveyear/Notes/issues/12)

[V8 的GC过程有了解吗？说说你的理解](https://github.com/sup-fiveyear/Notes/issues/9)

[DOM篇](https://github.com/sup-fiveyear/Notes/issues/8)

[说一下AJAX和跨域吧？](./notes-浏览器/说一下AJAX和跨域.md)

### 网络 [🖕](#索引)

#### HTTP + s
[你知道HTTP都有哪些版本吗？](/notes-网络/HTTP/你知道HTTP都有哪些版本吗？.md)

[你是如何理解HTTP的？特点有哪些？](/notes-网络/HTTP/你是如何理解HTTP的？特点有哪些？.md)

[描述一下HTTP报文结构?](/notes-网络/HTTP/描述一下HTTP报文结构.md)

[了解HTTP长连接吧？那队头阻塞呢？](/notes-网络/HTTP/了解HTTP长连接吧？那队头阻塞呢？.md)

[说一下HTTP 和HTTPS 的区别](/notes-网络/HTTP/说一下HTTP%20和%20HTTPS%20的区别.md)

[HTTP缓存策略说一下](https://github.com/sup-fiveyear/Notes/issues/25)

[说一下TLS握手](/notes-网络/HTTP/说一下TLS%20建立连接过程.md)

[HTTP 2/3 有了解吗？](/notes-网络/HTTP/说说HTTP2%20和HTTP3.md)

* [ ] 输入一个url会发生什么？


### 性能优化 [🖕](#索引)

#### 网络层面

[常见的图片格式有哪些？他们的区别是什么？](https://github.com/sup-fiveyear/Notes/issues/24)

[浏览器缓存策略有了解吗？](https://github.com/sup-fiveyear/Notes/issues/25)

[CDN是什么？回源策略了解过吗？](https://github.com/sup-fiveyear/Notes/issues/28)

* [ ] webpack 对静态资源的压缩与合并

#### 首次渲染

css 和 js 阻塞页面渲染？你怎么理解？

有了解同构应用吗（SSR）？

* [ ] SSR项目技术沉淀


### vue [🖕](#索引)

#### [吐血自问自答vue面试题](notes-vue/面试题.md)

#### 写一下vue数据侦测？

#### 详细说说虚拟DOM？

#### 模板编译，你能说多少说多少！

#### vuex 源码解读、模仿实现以及难点分析！

#### vue-router 源码解读、模仿实现以及难点分析！

### react [🖕](#索引)

### nodeJS [🖕](#索引)
