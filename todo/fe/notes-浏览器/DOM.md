## DOM汇总


DOM的本质：树形结构，用于描述xml/html的节点关系，同时提供API进行操作。

### nodeType常见字段

文档节点（9） 	元素节点（1）	text节点（3） 	注释节点（8） 	attr节点（2）	

### DOM操作

#### 创建

createElement：
[cloneNode](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode) ：可以克隆节点，默认浅克隆，只对当前节点内容clone。需要克隆子节点需要设置深clone

#### 查找获取

注意返回值为DomList的类数组，除了通过querySelectAll获取的为静态列表，其他都为元素出现在树中的顺序构成的动态的HTML集合（快照）。

#### 插入
innerHTML: 会将设置的字符串解析成HTML 或者XML 从而替换以前容器中的节点。使用该方式需要预防XSS攻击，HTML 5 中指定不执行由 innerHTML插入的  `<script>`  标签。

insertBefore: 可以根据特定参考节点进行插入位置选择，将插入到参照物节点前。
InsertAfter: 同 insertBefore，插入参照物节点后。

#### Attribute 和 property
setAttribute	getAttribute 设置的行间样式、自定义特性，修改的是标签属性，会改变html结构。

property：能够通过JavaScript来控制css的样式，并没有真正的api接口提供。 修改对象属性，不会体现在dom结构中。

#### DOM操作性能

- 对DOM查询做缓存（减少多次访问document）
- 频繁操作改为一次性操作(createDocumentFragment)

> Documentfragment：**文档片段**接口，一个没有父对象的最小文档对象。与document相比，最大的区别是DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的 [重新渲染](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow) ，且不会导致性能等问题。

### 事件

#### DOM事件绑定

绑定的函数中this指向DOM元素。

* DOM2级可以为元素添加多个事件处理函数
* DOM2级可以指定捕获：true｜冒泡阶段处理 false

DOM0定义了HTML和XML文档的底层结构，DOM2 和DOM3在这个结构的基础上引入了更多的交互能力，同时支持更高级的XML特性。

> removeEventListener 无法处理绑定的匿名函数

### 元素大小

**offset**：不包含外边距（margin），且参照物由父级决定
![20200613171858]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200613171858.png)


**clinet**：指的是内边距和内容区大小
![20200613171908]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200613171908.png)


**scroll**    ：指的是包含滚动内容的元素大小

scrollLeft 指的是被隐藏在内容区左侧的像素数，单位为px。同理scrollTop指的是被隐藏在内容区上侧的像素数。
scrollWidth指的是没有滚动条情况下的元素总高，同理scrollHeight。

![20200613171928]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200613171928.png)


#### 事件模型 & 事件流

**事件流描述了从页面中接受事件的顺序**，其事件模型有：（IE）事件冒泡模型，（网景）事件捕获模型。

事件冒泡：事件由最具体的元素接收，逐级向上传播到不具体的元素。

事件捕获：事件由不具体的文档接收，逐级向下传播至最具体的元素。

DOM标准事件流：包含三个阶段 事件捕获阶段（向下传递） 事件发生阶段（具体元素） 事件冒泡阶段（向上传播）

> window -> document -> html -> body ... -> 目标元素 

#### 事件对象属性


event.currentTarget
> 指向事件绑定的元素

event.target
> 指向事件触发的元素

[event.type](https://developer.mozilla.org/zh-CN/docs/Web/Events)

event.bubbles 只读 

> 一个布尔值，用来表示该事件是否会在 DOM 中冒泡。

Event.cancelBubble

> Event.stopPropagation() 的历史别名。在事件处理器函数返回之前，将此属性的值设置为 true，亦可阻止事件继续冒泡。


#### 事件对象方法



event.preventDefault()

event.stopPropagation()
> 阻止冒泡阶段中当前事件的进一步传播

event.stopImmediatePropagation()
> 阻止事件冒泡并且阻止相同事件的其他侦听器被调用


#### 事件代理

通过事件冒泡实现事件代理，使得代码精简，减少浏览器内存的占用，以及降低内存泄露的可能性
```javascript
<ul id=“parent-list">
	<li id=“post-1”>Item 1</li>
	<li id=“post-2”>Item 2</li>
	<li id=“post-3”>Item 3</li>
	<li id=“post-4”>Item 4</li>
	<li id=“post-5”>Item 5</li>
	<li id=“post-6”>Item 6</li>
</ul>
document.getElementById("parent-list”).addEventListener(“click”, function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.nodeName == “LI”) {
		// List item found!  Output the ID!
		console.log(“List item “, e.target.id.replace(“post-“, “”), “ was clicked!”);
	}
});
```
[JavaScript高级程序设计3]()