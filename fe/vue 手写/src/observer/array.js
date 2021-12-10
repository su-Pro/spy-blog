const methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'splice',
    'sort'
]
const _originPrototype = Array.prototype;

// 构造代理原型
export const arrayMethods = Object.create(_originPrototype);
// 向代理原型添加代理后的方法
methods.forEach(method => {
  arrayMethods[method] = function (args) {
    const res = _originPrototype[method].apply(this,args)
    let inserted = null;
    // 重写操作，当数组变化时进行通知
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
      case 'splice':
        inserted = args.slice(2);
    }

    if(inserted) __ob__.observerArray(inserted) // 深度转化inserted属性,为了拿到ob身上的observerArray方法，在这里做一个__ob__ 属性保存当前Observer实例
    return res;
  }
})
