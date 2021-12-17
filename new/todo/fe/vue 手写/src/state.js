import {observe} from "./observer/index.js"
import {proxy} from './util/index'

/**
 * TODO：初始化中的道道
 * @param vm
 */
export function initState(vm) {
  const opts = vm.$options;

  if (opts.props) {
    initProps(vm);
  }
  if (opts.methods) {
    initMethod(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}

function initProps() {}
function initMethod() {}

/**
 * 重要的事情：
 *  对用户传入的data对象进行处理
 * - 数据劫持
 *
 * @param vm
 */
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data;// 兼容函数和对象的情况，注意函数情况下的this指向，需要手动指向vm实例本身；vm._data挂载是为了后续操作后简便的获取data属性
  for (let key in data) {
    proxy(vm, '_data', key); // 对原_data上所有属性代理到vm对象上，可以通过vm.xxx直接获取
  }
  observe(data);//响应式入口
}
function initComputed() {}
function initWatch() {}
