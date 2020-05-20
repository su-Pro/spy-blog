
const configureStore = () => {
  const middlewares = [];

  return createStore (
    reducer,
    // applyMiddleware 就是对各个需要应用的中间件进行棋合
    applyMiddleware(...middlewares) // 该函数返回的内容称之为enhancer
  )
}

// createStore源码本质上：
createStore(reducer,preloadedState,enhancer) {
  //...

  // enhancer是什么？为什么需要再次传递createStore这个参数？
  return enhancer(createStore)(reducer,preloadedState)
}

function applyMiddleware (...middlewares) {
  return (next) => // next:createStore函数
  (reducer,initialState) => {
    var store = next(reducer,initialState)
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    // chain是保存每一个中间件函数，他们接受一个middleAPI
    dispatch = compose(...chain,store.dispatch)
    // createStore最终返回的对象，也就是store对象
    return {
      ...store,
      dispatch
    };
  };
}





function compose (...func) {
  return func.reduce((a,b) => (...args) => a(b(...args)))
}

function compose (...func) {
  return func.reduce((a,b) => {
    return (...args) => {
      return a(b(...args))
    }
  })
}

// middleA(middleB(middleC(store.dispatch)))