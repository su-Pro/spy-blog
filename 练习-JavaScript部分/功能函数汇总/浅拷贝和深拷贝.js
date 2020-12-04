// 浅拷贝 Object.assign实现

// 需要注意两点
// 1. 原始类型会被包装为对象
// 2. 继承属性和不可枚举属性是不能拷贝的

// 做一个属性描述符
Object.defineProperty(Object, "assign", {
  value: function (target, Args) {
    let to = Object(target);
    for (let i = 1; i < arguments.length; i++) {
      let next = arguments[i];
      if (next !== null) {
        for (let item in next) {
          if (Object.prototype.hasOwnProperty.call(next, item)) {
            to[item] = next[item];
          }
        }
      }
    }
    return to;
  },
  writable: true,
  configurable: true,
  // enumerable :false;
});

// 深拷贝 + 递归写法 + 循环写法解决递归爆栈
