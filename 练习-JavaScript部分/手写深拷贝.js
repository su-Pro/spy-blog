function hackClone (target) {
  return JSON.parse(JSON.stringify(target));
}
function recursionClone(target = {},origin) {
  if (origin === null) {
    return;
  }
  for(let key in origin) {
    if(Object.hasOwnProperty.call(origin,key)) {
      let isObj = typeof (origin[key]) === 'object' && origin[key] !== 'null'
      if(isObj) {
        let isArr = Object.toString.call(origin[key]) === '[object array]'
        isArr ? target[key] = [] : target[key] = {}
        recursionClone(target[key],origin[key])
      }else {
        target[key] = key
      }
    }
  }
  return target
}
