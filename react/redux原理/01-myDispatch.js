// 函数劫持，最基础的dispatch 中间件
const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  // 保证行为一致,该函数是添加更新日志后的全新dispatch
  return (action) => {
    console.log('action.type:',action.type);
    console.log('prev state:',store.getState());
    console.log('action:',action);
    const returnValue = rawDispatch(action)
    // ... dosomething
    return  returnValue
  }
}

const addPromiseToDispatch = (store) => {
  const rawDispatch = store.dispatch;

  return (action) => {
    if( typeof action.then === 'function' ){
      return action.then(rawDispatch);
    }
    // 否则是对象，直接执行
    return rawDispatch(action);
  }
}
