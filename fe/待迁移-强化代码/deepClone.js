/**
 * 深拷贝
 */

const obj1 = {
    age: 20,
    name: 'xxx',
    address: {
        city: 'beijing'
    },
    arr: ['a', 'b', 'c']
}

const obj2 = deepClone(obj1)
obj2.address.city = 'shanghai'
obj2.arr[0] = 'a1'
console.log(obj1.address.city)
console.log(obj1.arr[0])

function deepClone (target = {}) {
  //递归出口
  if(target == null || typeof target !== 'object') {
    return target
  }
  let result = Array.isArray(target) ? [] : {}
  for(let key in target){
    if(Object.prototype.hasOwnProperty) {
      result[key] = deepClone[target[key]]
    }
  }
  return result
}

