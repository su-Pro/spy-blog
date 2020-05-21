// 解决 组合继承的两次调用构造函数
function Parent(name) {
  this.name = ['foo', 'bar'];
}
Parent.prototype.func = function () {
  console.log('继承成功');
}
function Child() {
}

function prototype(child, parent) {
  var _prototype = myCreate(parent.prototype);
  child.prototype = _prototype;
  child.constructor = child;
  function myCreate(o) {
    function F() {};
    F.prototype = o;
    return new F();
  }
}