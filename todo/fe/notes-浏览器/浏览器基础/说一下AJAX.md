## 说一下AJAX

异步JavaScript + XML的缩写，通过这种技术方案可以实现向服务器请求数据时不需要卸载（刷新）页面。

并且不会阻塞JavaScript代码的执行，解决“单击 - 等待”的交互模式，将前端推向了新的时代（web2.0），实现异步获取数据。

实现AJAX的核心是XMLHttpRequest对象，最早由微软引入的概念，相继各大浏览器提供了相同的实现（XHR1.0）。

> web 1.0 时代发送网络请求的主要通过form表单提交，web2.0有了ajax？

### XMLHttpRequest

现在使用的XHR对象是经过W3C定制过的标准，简称为XHR2.0，并且是现在主流的XHR规则。主要的方法、属性和事件如下：

#### 方法

**1. XMLHttpRequest.open()** 方法初始化一个请求

语法为：`xhrReq.open(method,url,async,user,password);`

> **method**要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」、等。
> async是一个可选的布尔参数，默认为true，表示要不要异步执行操作。如果值为false，send()方法直到收到答复前不会返回(阻塞代码)。
> 调用该方法并不会真正发送请求， 只是启动一个请求以备发送

**2. XMLHttpRequest.send()** 方法用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即结束；如果是同步请求，则此方法直到响应到达后才会结束。

> 方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。

#### 属性

**1. XHR对象的readState属性拥有如下四个状态码：**

```txt
0:未初始化 ，没有调用oepn()
1:启动，调用open（） 但没有执行send（）
2:发送，但未接收响应
3:接收，收到部分数据
4:完成，收到全部数据响应
```

> 每次readState属性发生改变都会触发readystatechange事件，因此可以使用该事件监听数据的状态，进行后续处理。

 **2. XMLHttpRequest.status** （只读属性）返回了XMLHttpRequest 响应中的状态码

#### XHR2.0的进度事件

* loadstart
* progress
* error
* abort
* load
* loadend

每个网络请求都是从触发loadstart事件开始，紧接着是一个或多个progress事件，最后触发error 、abort、load事件中的一个事件，最后以loadend事件收尾。

> 只要浏览器接收到服务器的响应，都会触发load事件，因此需要进一步进行status属性的检查
