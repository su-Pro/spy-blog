if(typeof Object.assign !== 'function') {
  Object.defineProperty(Object,'assign',{
    value: function (target,sources) {
      if(target === null) {
        throw Error('error')
      }
    //  包装原始值
      let to = Object(target)
    //  合成sources
      for(let i = 1; i < arguments.length;i++){
        let curSource = arguments[i];
        if(curSource !== null) {
          for(let key in curSource) {
            if(Object.hasOwnProperty.call(curSource,key)){
              to[key] = curSource[key]
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  })
}
