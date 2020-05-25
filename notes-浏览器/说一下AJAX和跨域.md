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

### XMLHttpRequest 运作机制 + 封装AJAX方法

1. 新建XHR对象
2. 注册相关事件处理回调函数
3. 预准备请求
4. 配置额外参数
5. 发送请求

具体过程为：

```javascript
function getWebData(url) {
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 0:
        console.log(‘请求未初始化’)
        break;
      case 1:
        console.log(‘以创建请求’)
        break;
      case 2:
        console.log(‘请求已确认’)
        break;
      case 3:
        console.log(‘正在接受数据’)
        break;
      case 4:
        console.log('数据全部接受完毕')
        break;
    }
  }
  xhr.ontimeout=function (e) {
    console.log(‘请求超时’,e);
  }
  xhr.onerror=function (e) {
    console.log(‘请求发生错误’,e)
  }
  xhr.open(‘get’,url,true);
  xhr.timeout=3000; // 设置xhr请求超时事件
  xhr.responseType=‘text’; //设置响应返回的数据类型
  // 常见的有 “document” , “json” , “text” “arraybuffer”
  xhr.send(null)
}
```

**封装ajax方法 promise场景**：

```javascript
function ajax(url) {
    const p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(‘GET’, url, true)
        xhr.onreadystatechange = function (){
            if (xhr.readyState === 4) { // 只要完成后都会返回4 不管成功还是失败
                if (xhr.status === 200) {
                    resolve(
                        JSON.parse(xhr.responseText)
                    )
                } else if (xhr.status === 404 || xhr.status === 500) {
                    reject(new Error(‘404 not found’))
                }
            }
        }
        xhr.send(null)
    })
    return p
}
```

* [ ] async + await封装

## 说一下跨域

产生跨域是由浏览器的**安全策略**所导致的，它是web页面中最基础、最核心的安全策略。

### 同源策略

同源策略主要表现在DOM、数据层面和网络这三个层面：

1. DOM层面：同源策略限制了来自不同源的 Javascript脚本对当前DOM对象读和写的操作。
2. 数据层面：同源策略限制了不同源的站点读取当前站点的 Cookie indexdb、 Localstorage等数据。
3. 网络层面：同源策略限制了通过Xmlhttprequest等方式将站点的数据发送给不同源的站点。

### 跨域通信

分为两个方面：客户端和客户端通信以及客户端和服务端通信

**客户端客户端通信：**

在实际应用中,经常需要两个不同源的DOM之间进行通信,于是浏览器中又引入了跨文档消息机制,可以通过` window. postmessage`的Javascript接口来和不同源的DOM进行通信。

其他方法还有：
- `window.name`
- `document.domian`(二级域名相同)

**客户端和服务端通信：**

- JSONP
- CORS
- WebSocket
- Nginx
- 图像Ping

#### **JSONP跨域**

思路：利用script脚本 src属性 不受同源策略限制的特点，在属性中携带要查询的信息，并和后端约定好回调处理的函数格式，并将数据塞入函数回传回来。

**优点**：简单适用，浏览器兼容性高，服务端改造小。

**缺点**：

* 受限制于后端
* 只能发送get请求
* 污染全局命名空间（手动清除）

```javascript
const JSONP = ({url,params}) => {
  return new Promise((resolve,reject) => {
    // 用于处理params 成字符串格式 a:1,b:2 => a=1&b=2
    const helper = (params) => {
      const keys = Object.keys(params);
      // 用于判断是否加&，在队尾元素不需要&
      const _len = keys.length - 1;
      //  合并成一个字符串
      return keys.reduce((prev,cur,index) =>{
        const value = params[cur];
        const _flag = index === _len ? ‘’ : ‘&’;
        return `${prev}${cur}=${value}${_flag}`
      },’’)
    }
    const _script = document.createElement(‘script’);
    const cbFunc = data => {
      console.log(`data is ${data}`)
      resolve(data);
      //  手动删除window属性
      delete window.cb;
      //  手动删除js脚本
      document.body.removeChild(_script);
    }
    window.cb = cbFunc;
    _script.src = `url?${helper(params)}&cb=cbFunc`;
    document.body.appendChild(_script);
  });
}
```

#### **CORS通信**

**特点**:

- 所有浏览器都支持该功能，IE浏览器不能低于IE10。
- 整个CORS通信过程，都是浏览器自动完成，和AJAX请求方式无差异。
- 浏览器一旦发现AJAX请求跨域，就会**自动添加一些附加的头信息**，有时还会多出一次附加的请求，但用户不会有感觉。
- 实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

**简单请求**同时满足如下两大条件:

```js
请求方法：HEAD GET POST

HTTP头部字段不包含：
1. Accept
2. Accept-Language
3. Content-Language
4. Content-Type: 只限于如下字段，其余均不可
 	Application/x-www-from-urlencoded  	
	multipart-form-data 	
	text/plain
```
**非简单请求**不满足以上一条则判定为非简单请求。


**简单基本流程**

1. 浏览器直接发出CORS请求，自动在头部信息中，增加`Origin`字段

> 该字段用于描述本次请求属于哪个源（协议 + 域名 + 端口），服务器根据该字段的值判断是否允许本次请求

如果`Origin` 不在服务器允许的范围，服务器会返回一个正常的HTTP请求，大多数为200状态码，浏览器发现没有`Access-Control-Allow-Origin`字段就会抛出错误，被XHR对象的onerror事件捕获

2. 如果`Origin`可以访问，服务器会响应如下字段
```
Access-Control-Allow-Origin:请求的原地址 
Access-Control-Allow-Credentials:true
Acceps-Control-Expose-Headers:FooBar
Content-Type:text/html;charset=utf-8
```

> Access-Control-Allow-Origin字段是必须的，值要么是Origin字段，要么是*（表示接受任意域名请求）

> Access-Control-Allow-Credentials 可选的字段，表示允许发送Cookie。如果不允许发送Cookie，删除该字段即可。

> CORS请求时，XHR对象的getResponseHeader方法只能获得6个基本字段：Cache-Control \  Content-Language \ Content-Type \ Expires\ Last-Modified \ Pragma，如果想到拿到其他字段，必须在Access-Control-Expose-Headers字段中指定，这样就可以通过getResponseHeader(‘FooBar’)获取允许的字段值

**携带Cookie进行请求**

- XHR对象的withCredentials属性设置为true
- 服务器Access-Control-Allow-Origin不能设置为*
- 受限浏览器限制，只能发送该服务器Domain下的Cookie

**非简单请求基本流程**

1. 发起预检请求

> 非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为”预检”请求（preflight）。浏览器先询问服务器，当前网页所在的域名是否在服务器白名单中，以及可以使用哪些HTTP方法和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错（处理方法和简单请求相同）。

> 使用OPTIONS请求方法，必须写Access-Control-Request-Method字段，表示请求需要用到哪些HTTP方法

> Access-Control-Request-Headers 字段表示额外要发送的头部信息字段，有就写没有就算了

2. 服务器响应预检请求

> 如果不包含CORS相关字段，浏览器会判断为不同意预检请求
 
```
 CORS相关字段：
  Access-Control-Allow-Origin: 
  Access-Control-Allow-Methods:
  Access-Control-Allow-Headers:
  Access-Control-Allow-Credentials:
  Access-Control-Max-Age:xxx
```

3. 此后和正常的CORS请求就和简单请求一样，在Max-Age时间内不再发送预检请求

**CORS优点：**
- 支持所有类型的HTTP请求

**缺点：**
- 服务器改造
- 不支持IE10以下及老版本浏览器

#### **WebSocket通信**

HTTP协议的问题：

- 只能由客户端发起
- 服务器连续状态变化只能通过“轮询方式”，浪费资源（不停连接，或者HTTP连接不能关闭）

![](../img/浏览器/跨域-websocket%20vs%20HTTP.png)

H5 的 WebSocket通信使得服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。

![](../img/浏览器/跨域-websocket%20.jpg)

特点：
- 建立在TCP协议基础上
- 与HTTP协议有良好的兼容性，握手阶段采用HTTP协议
- 通信高效，数据格式轻量，性能开销小
- 没有同源限制
- 协议：ws 加密协议为 wss



用法和XHR类似：
```javascript
// 可以直接跨域请求
var ws = new WebSocket("wss://echo.websocket.org”);

//用于指定连接成功后的回调函数，可以使用addEventListener指定多个回调函数
ws.onopen = function(evt) { 
  console.log(“Connection open …”); 
  ws.send(“Hello WebSockets!”);
};

//用于指定收到服务器数据后的回调函数
ws.onmessage = function(evt) {
  console.log( “Received Message: “ + evt.data);
  ws.close();
};
//用于指定连接关闭的回调函数
ws.onclose = function(evt) {
  console.log(“Connection closed.”);
}; 

ws.send(data) // 发送网络请求
ws.close()
```

状态码：

```
	•	CONNECTING：值为0，表示正在连接。
	•	OPEN：值为1，表示连接成功，可以通信了。
	•	CLOSING：值为2，表示连接正在关闭。
	•	CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```

**缺点**：技术还不是很成熟相比于HTTP，并且服务端维护相对复杂，浏览器支持度各不相同。

#### **图像Ping**

加载图片不用担心跨域不跨越，因此可以设置图片的src属性用来和服务器进行**单向通信**。动态创建图片经常用于与服务器进行简单的、单向的跨域通信的一种方式。

思路：
通过动态增加图片元素，并设置src请求路径并跟上相应字段，注册图片的onerror和onload事件，从而知道服务器何时响应的。

通常用于跟踪用户点击页面或者动态曝光次数，缺点是只能发送GET请求，并无法访问服务器的响应文本。
