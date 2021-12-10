// 把data中的数据 都使用Object.defineProperty重新定义 es5
// Object.defineProperty 不能兼容ie8 及以下 vue2 无法兼容ie8版本
import {arrayMethods} from './array.js'
import {
  isObject,def
} from "../util/index"
import Dep from './dep.js';

/**
 * 核心API defineProperty 兼容IE9+
 * TODO：Vue2 数据响应式存在的问题？
 *  - vue如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法
 * @param data
 */
export function observe(data) {
  let isObj = isObject(data);
  if (!isObj) {
    return
  } //base case，原始值不处理
  return new Observer(data); // 将data转化成响应式data
}

/**
 *
 */
  class Observer{
  constructor(originData){  // 仅仅是初始化的操作
    /**
     * 这样是会 Stack Overflow的  ->> originData.__ob__ = this ->> 对this进行walk 发现 this 里面还有__ob__ 然后就挂掉了
     * 因此需要对__ob__进行配置：不可枚举（防止递归爆栈，以及不可配置防止修改）
     */
    def(originData,'__ob__',this); // 通过__ob__属性可以判断是否已响应式处理
    if(Array.isArray(originData)){ // 并不会对索引进行观测，因为会导致性能问题
      //TODO：数组响应式处理
      originData.__proto__ = arrayMethods;  // 重写数组的原型，采用原型链遮蔽特性
      this.observerArray(originData); // 深度监听数组
    }else{
      this.walk(originData); // 1.遍历对象中的属性，对每一个属性进行检测、响应式转换.
    }
  }
  /**
   * 递归监听数组内容
   * @param {*} originData
   */
  observerArray(originData){
    for(let i = 0; i < originData.length;i++){
      observe(originData[i]);
    }
  }
  /**
   * 遍历对象,进行响应式处理
   * @param {*} data
   */
  walk(data){
    let keys = Object.keys(data);
    // TODO: 如果这个data 不可配置 直接reurn? object.freeze 情况吗？
    keys.forEach((key)=>{
      defineReactive(data,key,data[key]);
    });
  }
}

/**
 * @param data  对象名称
 * @param key 对象中的key值
 * @param originData 对应的originData值
 * @returns {*}
 */
function defineReactive(data,key,originData){
  let dep = new Dep(); // 这个dep 是为了给对象使用的
  observe(originData); // 对象嵌套情况下递归响应式处理，因此采用递归实现
  Object.defineProperty(data,key,{
    configurable:true,
    enumerable:true,
    get(){
      // 每个属性都对应着自己的watcher，依赖收集
      if(Dep.target) { // 如果当前有watcher
        // 建立wather 和 dep 的双向关系
        dep.depend(); // 意味着我要将watcher存起来,在dep内部中右将watcher存入到dep中
        if(childOb){ // *******数组的依赖收集*****
          childOb.dep.depend(); // 收集了数组的相关依赖
          // 如果数组中还有数组
          if(Array.isArray(value)){
            dependArray(value);
          }
        }
      }
      return originData;
    },
    set(newValue){

      if(newValue === originData) return;
      observe(newValue); // 防止newValue是一个对象或者数组
      originData = newValue;
      //TODO: notify to Wather
      dep.notify(); // 通知依赖
    }
  });
}

