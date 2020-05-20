/**
 * 
 * @param {object} obj 待转化响应式的对象
 * @param {键} key 
 * @param {值} val 
 */
function defineReactive(obj, key, val) {
  Observer(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val
    },
    set(newVal) {
      if (newVal === val) {
        return newVal
      }
      Observer(newVal)
      val = newVal
      console.log('update');
    }
  })
}

function Observer(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if(Array.isArray(target)) {
    target.__proto__ = arrProto
    ArrayObserver(target)
  }
  for (const key in target) {
    defineReactive(target, key, target[key])
  }
}

let arrProto = Array.prototype
let proto = Object.create(arrProto)[
  'push',
  'unshift',
  'splice',
  'reverse',
  'sort',
  'shift',
  'pop'
].forEach(method => {
  proto[method] = function (...args) {
    let inserted
    switch (inserted) {
      case 'push':
      case 'unshift':
        inserted = args
      case 'splice':
        inserted = args.slice(2)
      default:
        break;
    }
    ArrayObserver(inserted)
    arrProto[method].call(this,...args)
  }
});

/**
 * 将目标转化为响应式
 * @param {object} target 
 */
function ArrayObserver(target) {
  for (let i = 0; i < target.length; i++) {
    let item = target[i]
    Observer(item)
  }
}