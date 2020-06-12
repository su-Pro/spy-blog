// 测试用例
/**
 * 再次手写时，注意返回实例，便于链式调用该特性
 */

class EventEmitter {
  constructor() {
    this.events = {}
    // 最大数量，可更改
    this._max = 10
  }
  $on(type, handle) {
    if (this._events[type]) {
      this.events[type].push(handle)
    }
    // 判断最大长度是否超出
    if (this._max != 0 && this.events[type].length > this._max) {
      console.error('...')
    } else {
      // 注意是数组形式；
      this.events[type] = [handle]
    }
  }
  $emit(type, ...msg) {
    const listeners = this.events[type]
    listeners.length && listeners.forEach(l => l.apply(this, msg));
  }
  $once(type, handle) {
    const wrapper = () => {
      handle.call(this)
      this.removeListener(type, wrapper)
    }
    this.$on(type, wrapper)
  }
  removeAllListeners(type) {
    this.events[type] && delete this.events[type]
  }
  removeListener(type, handle) {
    const listeners = this.events[type]
    listeners ? listeners.filter(
      (l => l != handle)
    )
      : listeners
  }
}

const myEmit = new EventEmitter()
// myEmit.$on('my-click',function () {
//   // dosomething...
// })

myEmit.$emit('my-click', 'hello wrold')
myEmit.$once('my-once', function () {
  // dosomething....
})
// 因此在注册事件时，尽量使用函数名称进行注册，便于销毁时进行匹对
myEmit.removeListener('my-click', function () {
})
myEmit.removeAllListeners('my-click')
myEmit.listeners('my-click')
myEmit.setMaxListeners('')