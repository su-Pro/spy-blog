/**
 *
 * @param {*} data  当前数据是不是对象
 */
export function isObject(data) {
  return typeof data === 'object' && data !== null;
}
export function def(data,key,value){
  Object.defineProperty(data,key,{
    enumerable:false,
    configurable:false, // 其实偷懒的话可以不写 默认值为fasle
    value,
  //  还有一个属性是 writable 标识是否可写
  })
}
/**
 *  对target做存取器，使得获取属性时进行拦截代理
 * @param target 代理到x上，通过x进行访问
 * @param source 被代理的y对象
 * @param key y对象上的属性
 */
export function proxy (target,source,key) {
  Object.defineProperty(target,key,{
    get() {
      return target[source][key]
    },
    set(v) {
      target[source][key] = v;
    }
  })
}
