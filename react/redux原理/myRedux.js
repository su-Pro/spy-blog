const createStore = (reducer) => {
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    reducer(state,action);
    listeners.forEach(l => l())
  }
  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }
  return {getState,dispatch,subscribe}
}

const { createStore } = Redux

const store = createStore(reducer,preloadedState,enhancer)
  /****
   *  store 作为一个对象提供了
   *  直接获取页面数据状态的 getState 方法
   *  触发更新 store 的 dispatch 方法
   *  以及订阅 store 状态变化的 subscribe 方法等
   */
store = {
  dispatch,
  getState,
  subscribe,
}
// 订阅 store 状态的变化，适时渲染：
const render = () => {
  document.body.innerText = store.getState()
};
store.subscribe(render);
render();

// 组件交互逻辑：
document.addEventListener('click',() => {
  store.dispatch({type: 'demo'})
})

