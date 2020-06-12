/**
 *实现功能
 * 1. 订阅功能
 * 2. 发布功能 
 *
 * @class EventEmitter
 */
class EventEmitter {
  constructor() {
    // 保存所有事件
    this.events = {};
  }
  /**
   *向 events 对象中保存type 对应的cb
   *注意nodejs中的newListener默认事件机制
   * @param {*} type
   * @param {*} cb
   * @memberof EventEmitter
   */
  $on(type, cb) {
    if (typeof cb !== 'function') {
      throw new Error('xxx');
    }
    if (eventName !== 'newListener') {
      // 如果当前绑定的不是newListener,看一下用户是否绑定过newListener,如果绑定过取出来依次执行
      if (this._events['newListener']) {
        this._events['newListener'].forEach(fn => fn(eventName))
      }
    }
    (this.events[type] || (this.events[type] = [])).push(cb)
  }
  /**
   *找到对应type 并全部执行他
   *
   * @param {*} type
   * @memberof EventEmitter
   */
  $emit(type, ...msg) {
    if (this.events && this.events[type]) {
      this.events[type].forEach(fn => fn.apply(this, msg));
    }
  }
  /**
   *该函数只会绑定一次，执行完毕后自动销毁
   *核心是做一个AOP
   * @param {*} type
   * @param {*} cb
   * @memberof EventEmitter
   */
  $once(type, cb) {
    function once() {
      cb.call(this);
      $off(type, once)
    }
    this.$on(type, once)
  }
  /**   
   * @param {*} type 解绑的事件名称   
   * @param {*} cb 对应的函数   
   * @memberof EventEmitter   
   */
  $off(type, cb) {
    const listeners = this.events[type];
    if (listeners.length > 0) {
      listeners = listeners.filter(l => l !== cb)
    }
  }
}