# DOM

- 桥梁
  - 用于将脚本语言与HTML/XML连接
- 逻辑树
  - 每个节点都是一个对象
  - DOM方法，操作树  
- 事件处理器
  
解释：

- 文档对象模型 (DOM) 将 web 页面与到脚本或编程语言连接起来
- DOM模型用一个逻辑树来表示一个文档，树的每个分支的终点都是一个节点(node)，每个节点都包含着对象
- DOM的方法(methods)让你可以用特定方式操作这个树，用这些方法你可以改变文档的结构、样式或者内容
- 节点可以关联上事件处理器，一旦某一事件被触发了，那些事件处理器就会被执行

## DOM 基础

### 数据类型

- document：抽象逻辑树的root Element

- element：element 是指由 DOM API 返回的类型为 element 的一个元素或节点

- nodeList（类数组）：nodeList 是一个元素的数组，如从 document.getElementsByTagName() 方法返回的就是这种类型

- attribute：DOM中的属性也是节点，就像元素一样，只不过您可能会很少使用它。

**nodeType常见字段：**
element节点（1） attr节点（2） text节点（3）  注释节点（8）  docment节点（9）  

### 常见操作

### 操作

**创建**：
createElement：
cloneNode ：可以克隆节点，默认浅克隆，只对当前节点内容clone。需要克隆子节点需要设置深clone

**查找获取**:
注意返回值为DomList的类数组，除了通过querySelectAll获取的为静态列表，其他都为元素出现在树中的顺序构成的动态的HTML集合（快照）。

**插入**：
innerHTML: 会将设置的字符串解析成HTML 或者XML 从而替换以前容器中的节点。使用该方式需要预防XSS攻击，HTML 5 中指定不执行由 innerHTML插入的  `<script>`  标签。

insertBefore: 可以根据特定参考节点进行插入位置选择，将插入到参照物节点前。
InsertAfter: 同 insertBefore，插入参照物节点后。

**Attribute 和 property**
setAttribute getAttribute 设置的**行间样式**、自定义特性，修改的是标签属性，会改变html结构。

property：能够通过JavaScript来控制css的样式，并没有真正的api接口提供。 **修改对象属性，不会体现在dom结构中**。

### Element 大小

**offset**：不包含外边距（margin），且参照物由父级决定
![5288129A-CE99-4DCF-95D6-6E4567B63F0B](https://user-images.githubusercontent.com/53052047/80281091-5cebd100-873b-11ea-9f3e-cd03ad5776cf.png)

**clinet**：指的是内边距和内容区大小
![5281C87C-979E-4A9A-8E0B-A5FA50A53137](https://user-images.githubusercontent.com/53052047/80281094-62491b80-873b-11ea-9cf1-9c4ccd5311de.png)

**scroll**：指的是包含滚动内容的元素大小

scrollLeft 指的是被隐藏在内容区左侧的像素数，单位为px。同理scrollTop指的是被隐藏在内容区上侧的像素数。
Element.scrollHeight 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。

![20200807163204]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200807163204.png)

## 事件

### DOM事件绑定

绑定的事件梳理函数中this指向DOM元素

- DOM2级可以为元素添加多个事件处理函数
- DOM2级可以指定捕获：true｜冒泡阶段处理 false（默认值）

DOM0定义了HTML和XML文档的底层结构，DOM2 和DOM3在这个结构的基础上引入了更多的交互能力，同时支持更高级的XML特性。

> removeEventListener 无法处理绑定的匿名函数

### 事件模型 & 事件流

**事件流描述了从页面中接受事件的顺序**，其事件模型有：（IE）事件冒泡模型，（网景）事件捕获模型。

事件冒泡：事件由最具体的元素接收，逐级向上传播到不具体的元素。

事件捕获：事件由不具体的文档接收，逐级向下传播至最具体的元素。

DOM标准事件流：包含三个阶段 事件捕获阶段（向下传递） 事件发生阶段（具体元素） 事件冒泡阶段（向上传播）

> window -> document -> html -> body ... -> 目标元素

### 事件对象常见应用

event.preventDefault()

event.stopPropagation()
> 阻止捕获和冒泡阶段中当前事件的进一步传播

event.stopImmediatePropagation()
> 阻止事件冒泡并且阻止相同事件的其他侦听器被调用

event.currentTarget
> 指向事件绑定时的元素

event.target
> 指向事件触发的元素

## 性能优化

频繁的操作DOM 会导致浏览器发生`重排 - 重绘`

### DOM操作性能

- 对DOM查询做缓存（减少多次访问document）
- 频繁操作改为一次性操作(createDocumentFragment)

> Documentfragment：**文档片段**接口，一个没有父对象的最小文档对象。与document相比，最大的区别是DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的 [重新渲染](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow) ，且不会导致性能等问题。

### 事件代理

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

通过事件冒泡实现事件代理，使得代码精简，减少浏览器内存的占用，以及降低内存泄露的可能性

```html
<ul id="parent-list">
 <li id=“post-1”>Item 1</li>
 <li id=“post-2”>Item 2</li>
 <li id=“post-3”>Item 3</li>
 <li id=“post-4”>Item 4</li>
 <li id=“post-5”>Item 5</li>
 <li id=“post-6”>Item 6</li>
</ul>
<script>
document.getElementById("parent-list”).addEventListener(“click”, function(e) {
 // e.target is the clicked element!
 // If it was a list item
 if(e.target && e.target.nodeName == “LI”) {
  // List item found!  Output the ID!
  // 此处没有阻止向下
  console.log(“List item “, e.target.id.replace(“post-“, “”), “ was clicked!”);
 }
});
</script>
```
