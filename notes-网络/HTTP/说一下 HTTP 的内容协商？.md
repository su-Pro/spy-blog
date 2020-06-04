## 说一下 HTTP 的内容协商？

HTTP 是应用层的协议，数据到达之后工作只能说是完成了一半，还必须要告诉上层应用（例如浏览器）这是什么数据才行，否则上层应用就会“不知所措”。

XXX:图

### MIME type 和 Encoding type 标识 body 内容

#### MIME type

但 HTTP “顺手牵羊”取了 MIME 其中的一部分，用来标记 body 的数据类型，这就是我们平常总能听到的“MIME type”。

> “多用途互联网邮件扩展”（Multipurpose Internet Mail Extensions），简称为 MIME,可以让电子邮件可以发送 ASCII 码以外的任意数据。

HTTP 里经常遇到的几个类别：

1. text：即文本格式的可读数据，我们最熟悉的应该就是 text/html 了，表示超文本文档，此外还有纯文本 text/plain、样式表 text/css 等。
2. image：即图像文件，有 image/gif、image/jpeg、image/png 等。
3. audio/video：音频和视频数据，例如 audio/mpeg、video/mp4 等。
4. application：数据格式不固定，可能是文本也可能是二进制，必须由上层应用程序来解释。常见的有 application/json，application/javascript、application/pdf 等，另外，如果实在是不知道数据是什么类型，像刚才说的“黑盒”，就会是 application/octet-stream，即不透明的二进制数据。

#### Encoding type

因为 HTTP 在传输时为了节约带宽，有时候还会压缩数据，为了不要让浏览器继续“猜”，还需要有一个“Encoding type”，告诉数据是用的什么编码格式，这样对方才能正确解压缩，还原出原始的数据。

1. gzip：GNU zip 压缩格式，也是互联网上最流行的压缩格式；
2. deflate：zlib（deflate）压缩格式，流行程度仅次于 gzip；
3. br：一种专门为 HTTP 优化的新压缩算法（Brotli）。

### 协商字段

#### 内容格式和压缩方式

Accept 请求头字段 和 Content 实体头字段,用于客户端和服务器进行“内容协商”。

XXX: 图

#### 语言类型使用的头字段

为了解决“国际化”的问题，HTTP 采用了与数据类型相似的解决方案，又引入了两个概念：语言类型与字符集。

所谓的“语言类型”就是人类使用的自然语言，例如英语、汉语、日语等。

所谓的“字符集”是用来处理计算机编码方式的。现在主要是 Unicode 和 UTF-8，它把世界上所有的语言都容纳在一种编码方案里，遵循 UTF-8 字符编码方式的 Unicode 字符集也成为了互联网上的标准字符集。

XXX: 图
