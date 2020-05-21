function Parent(name) {
  this.name = ['foo','bar'];
}
Parent.prototype.func = function () {
  console.log('继承成功');
}
function myCreate (o) {
  function F () {}
  F.prototype = o;
  return new F();
}
// 缺点： 和 原型链继承一样的问题，对引用值的共享

