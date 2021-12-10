import {initState} from './state'
import {compileToFunction} from "./compiler";
import {mountComponent} from './lifecycle'
// 在原型上添加一个init方法
export function initMixin(Vue){
  /**
   * TODO：初始化主入口对吧？所做的事情都有哪些？
   * @param options 用户编写的options参数
   * @private
   */
  Vue.prototype._init = function (options) {
    const vm = this; // 对vue实例对象做一层代理，猜测作用：写法更加优雅语义更加明确；
    vm.$options = options; // 对参数进行缓存到vm对象上，方便后续的操作
    initState(vm); // 初始化状态：TODO: vue中initState初始化属性的顺序是什么样的？有什么逻辑关系吗？
    // 挂载流程
    // TODO： 如果options 上没有el 属性，用户需要手动vm.$mount(el) 才会进入挂载流程
    if(vm.$options.el){
      vm.$mount(vm.$options.el);
    }
  }
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    // 查找模板入口的优先级(从高到低)：render () => template => el
    // TODO：如果有render函数会进入到什么流程？
    if(!options.render){
      let template = options.template; // 获取用户编写的template
      if(!template && el){ // 如果没有template 有el元素的话，就会以el元素outerHTML后的字符串作为template
        template = el.outerHTML; // outerHTML输出内容包含描述元素及其后代的序列化HTML片段
      }
      /**
       * 我们需要将template 转化成render方法
       * 之所以需要转换成render函数是为了生成vnode提供给虚拟DOM
       * vue1 使用的是模板解析 vue2 使用的是虚拟DOM
       * 核心面试难点：template -> render
       */
      const render = compileToFunction(template);
      options.render = render;
    }
    // 有render方法会直接进行挂载流程
    mountComponent(vm,el);
  }
}

// TODO:
// 练习写AST结构，以及nodeType类型；
// 栈构建AST层级结构的流程；
// 解析HTMLparse的整体流程，以及代码手敲。
