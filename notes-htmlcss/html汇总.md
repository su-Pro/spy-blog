## html常见高频题

### 说说你理解的语义化

所谓 web 语义化，从广义上来说，不仅要使机器（搜索引擎等）易于理解，也要使人易于理解。在团队协作开发中，对人的易于理解显得尤为重要了，一个莫名其妙的 div 会让后续的开发或者维护者一头雾水，增加了协作成本。

### doctype 的作用

DOCTYPE标签是一种标准通用标记语言的文档类型声明，它的目的是要告诉语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档 (是混杂模式还是标准模式，两者在渲染css时呈现出差异性) 

### 常见的块级、行级元素有哪些？特点是什么

常见的块级元素和行内元素

- 块级元素 （block-level） ： div h1~h6 p hr form ul dl ol pre table li dd dt tr td th

- 行内元素 （inline-level）：em strong span a br img button input label select textarea code script

- 块级元素和行内元素的区别

- 块级元素占据的是一整行 ， 而行内元素占据的空间是它自身，多个行内元素可以并排排列；
- 块级元素可以直接设置宽度、高度 ， 而行内元素不能设置宽高（行内元素的高度由line-height决定，宽度由具体的内容来决定）

- 块级元素可以包含块级和行内， 行内只能包含文本和行内
- 块级元素可以设置margin和padding， 而行内元素上下的margin、padding不生效， 只有左右生效（ 此时上下padding虽不会占用空间， 但是会占用背景色）

- 块级元素使用margin: 0 auto;居中，行内元素，设置text-align: center; 达到居中目的（注意：text-align:center;仅作用在块级元素上，所以text-align:center;这个属性应该设置在行内元素的block级父元素上）

- 行内元素可以“感受”到浮动元素的存在

### form常见字段有哪些？

action：
```
一个处理此表单信息的程序所在的URL。此值可以被 <button> 或者 <input> 元素中的 formaction 属性覆盖。
```
method

```
浏览器使用这种 HTTP 方式来提交 表单. 可能的值有：
  post：指的是 HTTP POST 方法；表单数据会包含在表单体内然后发送给服务器.
  get：指的是 HTTP GET 方法；表单数据会附加在 action 属性的URI中，并以 '?' 作为分隔符，然后这样得到的 URI 再发送给服务器。如果这样做（数据暴露在 URI 中）没什么副作用，或者表单仅包含ASCII字符时，再考虑使用这种方法吧。
  dialog：Use when the form is inside a <dialog> element to close the dialog when submitted.

此值可以被 <button>、<input type="submit"> 或 <input type="image"> 元素中的 formmethod 属性覆盖。
```

### h5 新增的标签有哪些？

