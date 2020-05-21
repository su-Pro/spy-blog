function Parent() {
  this.name = ['foo','bar'];
  this.funcLog = function () {
    console.log('能够使用');
  }
}
//想要继承自Father,通过借用构造函数形式，将this绑定到
function Child(...args) {
  Father.apply(this,args)
}
/**
 * 解决：原型继承中无法向Parent传递参数的问题
 * 
 * 缺点：公共方法全部定义在构造函数中，会导致每个实例对象内存浪费
 */
