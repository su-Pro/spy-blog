
/**
 * 1.判断是更新还是要渲染
 * 递归创建真实节点 替换掉老的节点
 * @param {*} oldVnode
 * @param {*} vnode
 */
export function patch(oldVnode,vnode){
  const isRealElement = oldVnode.nodeType;
  if(isRealElement){
    const oldElm = oldVnode; // div id="app"
    const parentElm = oldElm.parentNode; // body
    // 将虚拟节点变成真实节点
    let el = createElm(vnode);
    // 插入到正确的位置
    parentElm.insertBefore(el,oldElm.nextSibling)
    // 删除老节点
    parentElm.removeChild(oldElm);

  }
}
/**
 * 创建真实DOM
 * @param {*} vnode
 */
function createElm(vnode){ // 根据虚拟节点创建真实的节点
  let {tag,children,key,data,text} = vnode;
  // 是标签就创建元素
  if(typeof tag === 'string'){
    vnode.el = document.createElement(tag);
    // 更新属性
    updateProperties(vnode);
    children.forEach(child=>{ // 递归创建儿子节点，将儿子节点扔到父节点中
      return vnode.el.appendChild(createElm(child))
    })
  }else{
    // 虚拟dom上映射着真实dom  方便后续更新操作
    vnode.el = document.createTextNode(text)
  }
  // 如果不是标签就是文本
  return vnode.el;
}
// 更新属性
function updateProperties(vnode){
  let newProps = vnode.data;
  let el = vnode.el;
  for(let key in newProps){
    if(key === 'style'){
      for(let styleName in newProps.style){
        el.style[styleName] = newProps.style[styleName];
      }
    }else if(key === 'class'){
      el.className = newProps.class;
    }else{
      el.setAttribute(key,newProps[key]);
    }
  }
}
