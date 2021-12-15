export function createElement(tag, data = {}, ...children) {
  let key = data.key;
  if(key){
    delete data.key;
  }
  return vnode(tag,data,key,children,undefined);
}
export function createTextNode(text) {
  return vnode(undefined,undefined,undefined,undefined,text);
}

function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text
  }
}
// 虚拟节点 就是通过_c _v 实现用对象来描述dom的操作 （对象）

// 1) 将template转换成ast语法树-> 生成render方法 -> 生成虚拟dom -> 真实的dom
//  重新生成虚拟dom -> 更新dom

