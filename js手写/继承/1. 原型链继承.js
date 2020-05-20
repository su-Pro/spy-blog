function Parent(name) {
  this.name = ['foo','bar'];
}
Parent.prototype.baz = function logFunc(params) {
  console.log('能够使用');
}
function Child() {
  
}
// Child想要继承Parent 通过原型链继承
Child.prototype = new Parent();
var child1 = new Child()
/**
 * 存在的问题：
 * 
 * - 引用值共享
 * - 创建子类时无法向Parent传递参数
 */

