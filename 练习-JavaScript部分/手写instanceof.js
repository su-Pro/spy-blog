function _instanceof(l, r) {
  if (r === null) return false;
  var proto = Object.getPrototypeof(l);
  while (true) {
    // 找到头
    if (proto === null) return false;
    if (proto === r.prototype) return true;
    proto = Object.getPrototypeof(proto);
  }
}


function _instanceof(l, r) {
  if (r === null) return false;
  let origin = Object.getPrototypeOf(l);
  while (true) {
    if (origin === null) return false;
    if (origin === r.prototype) return true;
    origin = Object.getPrototypeOf(origin);
  }
}
__proto__: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
警告: 当Object.prototype.__proto__ 已被大多数浏览器厂商所支持的今天，其存在和确切行为仅在ECMAScript 2015规范中被标准化为传统功能，以确保Web浏览器的兼容性。为了更好的支持，建议只使用 Object.getPrototypeOf() 。

Object.create: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create