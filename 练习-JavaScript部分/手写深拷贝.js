function hackClone(target) {
  return JSON.parse(JSON.stringify(target));
}
function recursionClone(target = {}, origin) {
  if (origin === null) {
    return;
  }
  for (let key in origin) {
    if (Object.hasOwnProperty.call(origin, key)) {
      let isObj = typeof origin[key] === "object" && origin[key] !== "null";
      if (isObj) {
        let isArr = Object.toString.call(origin[key]) === "[object array]";
        isArr ? (target[key] = []) : (target[key] = {});
        recursionClone(target[key], origin[key]);
      } else {
        target[key] = key;
      }
    }
  }
  return target;
}

/**
 * - 何时需要深拷贝？
 *
 * - 如何判断是数组或者其他元素？
 *
 * - 如何遍历目标值
 *
 * - 递归写法，出口在哪里？
 */

const isObject = (target) => typeof target === "object" && target !== null;
const deepClone = (target, map = new Map()) => {
  if (map.get(target)) {
    // 防止循环引用处理
    return;
  }
  map.set(target, true);
  if (isObject(target)) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (const prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};

console.log(true + 1);
