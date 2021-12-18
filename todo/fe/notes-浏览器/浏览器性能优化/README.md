
### 题外话：重排，重绘，合成

**重排需要更新完整的渲染流水线，所以开销是最大的**。

![未知](https://user-images.githubusercontent.com/53052047/80616165-2253a280-8a73-11ea-8c5b-3e770b433803.png)

**重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些**

![未知](https://user-images.githubusercontent.com/53052047/80616148-1c5dc180-8a73-11ea-9ffb-e960b04d5a32.png)

既不要布局也不要绘制的属性，渲染引擎将跳过布局和绘制。只执行后续的合成操作，我们把这个过程叫做**合成**。

![未知](https://user-images.githubusercontent.com/53052047/80616170-25e72980-8a73-11ea-819f-2b9e65c58f12.png)

> 具体细节查看浏览器性能优化部分