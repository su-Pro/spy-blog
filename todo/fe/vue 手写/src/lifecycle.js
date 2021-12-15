import Watcher from './observer/watcher';
import {patch} from './vdom/patch'
export function lifecycleMixin(Vue) {
  // 创建出真实的DOM而后更新页面
  Vue.prototype._update = function (vnode) {
    const vm  = this;
    // 需要用虚拟节点创建出真实节点 替换掉 上次的真实的DOM元素
    vm.$el = patch(vm.$el,vnode);
  }
}
/**
 *
 * @param {*} vm vm实例，上面保存着上次真实的DOM节点
 * @param {*} el 新的虚拟DOM节点
 */
export function mountComponent(vm,el){
  const options = vm.$options;
  vm.$el = el; // 真实的dom元素
  // Watcher 就是用来渲染的
  // vm._render 通过解析的render方法 渲染出虚拟dom _c _v _s
  // vm._update 通过虚拟dom 创建真实的dom

  // 渲染页面：无论是首次渲染还是页面更新都会调用此方法
  let updateComponent = () =>{
    //vm._render方法生成虚拟DOM？
    //_update方法拿到真实DOM？
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


  }
  // 通过渲染watcher进行模板渲染
  // 每个组件都有一个watcher
  // 渲染相关：每次数据改变，都会重新执行updateComponent
  new Watcher(vm,updateComponent,()=>{},true); // true表示他是一个渲染watcher
}
