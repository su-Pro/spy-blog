function Parent(name) {
  this.name = ['foo','bar'];
}
Parent.prototype.func = function () {
  console.log('继承方法成功');
}
function Child(...args) {
  Parent.call(this,args)
}
Child.prototype = new Parent();
// 由于原型对象被重写，需要将constructor指针归位
Child.prototype.constructor = Child;

// 融合原型链继承和组合继承的优点，最常用的继承方式。
// 问题：需要调用两次父类构造函数