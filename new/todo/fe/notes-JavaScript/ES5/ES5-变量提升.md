## JS执行机制 & 预编译

### 变量提升特点

所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。

**表象**

```javascript
showName()
console.log(myname)
var myname = '测试'
function showName() {
console.log('函数 showName 被执行');
}
```

结果： 函数 showName 被执行 myname:undefined

```javascript
console.log(test)
function test () {}
var test = 'test'
```

结果： 打印函数体

**特点：变量提升（默认值会被设置为 undefined），函数声明提升，发生覆盖时函数优先级高**

之所以js需要变量提升，是因为js属于即时编译型语言，为了能够在执行时获得更快的速度，需要进行预编译环节。

“变量提升”并不意味着变量和函数的声明会在物理层面移动到代码的最前面，**实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被 JavaScript 引擎放入内存中**。

## JS执行机制（先编译，再执行）

一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，**编译**完成之后，才会进入**执行**阶段。
![未知](https://user-images.githubusercontent.com/53052047/79989482-79d99780-84e2-11ea-89c4-4c42d7b98bd2.png)

**编译阶段**：

生成两部分内容，执行期上下文 和 可执行代码。

**执行上下文是 JavaScript 执行一段代码时的运行环境**，用于确定在执行期间用到的变量、this、对象等。

对于当前只需要知道：在执行上下文中存在一个**变量环境的对象**（Viriable Environment），该对象中保存了**变量提升的内容**，比如上面代码中的变量 myname 和函数 showName，都保存在该对象中。

执行阶段：在执行阶段会按照顺序执行代码，具体细节参考v8执行js机制；

- [ ] v8

**总结：**

* JavaScript 代码执行过程中，需要先做**变量提升**，而之所以需要实现变量提升，是因为 JavaScript 代码在执行之前需要先**编译**。

* 在**编译阶段**，变量和函数会被存放到**变量环境**中，变量的默认值会被设置为 undefined；在代码**执行阶段**，JavaScript 引擎会从变量环境中去查找自定义的变量和函数。

* 如果在编译阶段，存在两个相同的函数，那后定义的会覆盖掉之前定义的。
