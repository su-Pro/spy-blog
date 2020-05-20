function EventEmitter() {
  this.events = {}; //会把所有的事件监听函数放在这个对象里保存
  //指定给一个事件类型增加的监听函数数量最多有多少个
  this._maxListeners = 10;
}
EventEmitter.prototype.setMaxListeners = function (maxListeners) {
  this._maxListeners = maxListeners;
}
EventEmitter.prototype.listeners = function (event) {
  return this.events[event];
}
//给指定的事件绑定事件处理函数，1参数是事件类型 2参数是事件监听函数
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (type, listener) {
  if (this.events[type]) {
    this.events[type].push(listener);
    if (this._maxListeners != 0 && this.events[type].length > this._maxListeners) {
      console.error(
        `MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
        ${this.events[type].length} ${type}
        listeners added. Use emitter.setMaxListeners() to increase limit`);
    }
  } else {
    //如果以前没有添加到此事件的监听函数，则赋一个数组
    this.events[type] = [listener];
  }
}
EventEmitter.prototype.once = function (type, listener) {
  //用完即焚
  let wrapper = (...rest) => {
    listener.apply(this,rest); //先让原始的监听函数执行
    this.removeListener(type, wrapper);
  }
  // 会被加入到events对象中，因此使用完毕后进行销毁，达到once效果；
  this.on(type, wrapper);
}
EventEmitter.prototype.removeListener = function (type, listener) {
  /**
   * listener = 3
   * l => [1,2,3,4]
   * l != 1？ true 保留
   * l != 3? false 舍去
   */
  if (this.events[type]) {
    this.events[type] = this.events[type].filter(l => l != listener)
  }
}
//移除某个事件的所有监听函数
EventEmitter.prototype.removeAllListeners = function (type) {
  delete this.events[type];
}
// 事件目标，以及传递的参数；
EventEmitter.prototype.emit = function (type, ...rest) {
  this.events[type] && this.events[type].forEach(listener => listener.apply(this, rest));
}
module.exports = EventEmitter;