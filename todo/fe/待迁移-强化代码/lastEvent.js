
class eventModule {
  constructor () {
    this.events = {}
  }
  $on (type, handle) {
    if(this.events[type]) {
      this.events[type].push(handle)
    } else {
      this.events[type] = [handle]
    }
  }
  $emit(type,callback) {
    const args = arguments.pop().shift();
    // 保证有值，边界处理
    this.events[type] && this.events[type].forEach(listener => {
      listener.apply(this,args)
    });
    callback()
  }
  $once(type,handle) {
    // 当执行回调时，自动删除该监听器
    const wrapper = (...args) => {
      handle.apply(this,args)
      this.$removeListener(type,wrapper)
    }
    this.$on(type,wrapper)
  }
  $removeListener(type,handle) {
    // 如果没有监听器删什么？
    if(this.events[type].length){
      this.events = this.events[type].filter( l  => l !== handle)
      return;
    }
    console.log('没有监听器');
 }
  $getListener(type) {
    if(this.events[type]) {
      return this.events[type]
    }
    console.log('未添加');
  }
  $removeAll() {
    this.events = {}
  }
}
function note () {
  console.log('通知成功！');
}
//  测试用例
const eventModule = new MyEvent();
eventModule.$on('test',note)
eventModule.$once('test',() => {
  console.log('我就执行一次，通知成功！');  
})
eventModule.$emit('test',() => {
  console.log('报告：通知完毕');  
});
eventModule.$getListener('test') // 会发现once 注册的事件函数以消失
eventModule.$removeListener('test', note) 
eventModule.$getListener('test') 
eventModule.$removeAll()




