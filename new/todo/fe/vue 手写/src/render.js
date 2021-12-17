import {
  createElement,
  createTextNode
} from './vdom/create-element'
export function renderMixin(Vue) {
  // _c 创建元素的虚拟节点


  Vue.prototype._c = function () {
    return createElement(...arguments); // tag,data,children1,children2
  }

  // _v 创建文本的虚拟节点
  Vue.prototype._v = function (text) {
    return createTextNode(text);
  }

  // _s JSON.stringify
  Vue.prototype._s = function (val) {
    return val == null ? '' : (typeof val === 'object' ? JSON.stringify(val) : val);
  }
  /**
   * 执行生成的render函数，返回vnode
   */
  Vue.prototype._render = function () {
    const vm = this;
    const {
      render
    } = vm.$options;
    // 去实例上 取值
    let vnode = render.call(vm);
    return vnode;
  }
}
