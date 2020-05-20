const configureStore = () => {
  const store = createStore(App);
  const middlewares = [];
  middlewares.push(addPromiseToDispatch)
  //...
  // 经过增强后的dispatch，可以通过store.dispatch调用
  wrapDispatchWithMiddlewares(store,middlewares)
  return store
}

const wrapDispatchWithMiddlewares = (store,middlewares) => {
  middlewares.forEach(middleware => 
    // 第二次执行时为什么需要传递store.dispatch?
    store.dispatch = middleware(store)(store.dispatch)
    )
}

const logger = (store) => (next) => {
  if(!console.group) {
    return next;
  }
  return (action) => {
    //...
    const returnValue = next(action); // next:增强后的dispatch
    return returnValue;
  }
}

const promise = (store) => (next) => (action) => {
  if(typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action)
}

