/**
 * 采用递归比较
 */
function isObject(object) {
  return typeof object === 'object' && object !== null;
}
function isEqual(obj1,obj2) {
  if(!isObject(obj1) || !isObject(obj2)){
    return obj1 === obj2
  }
  if(obj1 === obj2) {
    return true;
  }
  // 首先判断数据长度是否相等
  let l1 = Object.keys(obj1);
  let l2 = Object.keys(obj2);
  if(l1 !== l2)  return false 
  // 递归比较,以obj1 为基准
  for (let key in obj1) {
    const res = isObject(obj1[key],obj2[key])
    if(!res) return false
  }
  // 判断完毕，且没有return时，认为相等
  return true;
}