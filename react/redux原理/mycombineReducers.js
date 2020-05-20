const { combineReducers } = redux;

const rootReducer = combineReducers({
  reducer1,
  reducer2,
  reducer3,
  ...
})

const combineReducers = (reducers) => {
  return (state = {},action) => {
    // reducers的键名对应的是状态树的名字
    return Object.keys(reducers).reduce(
      (nextState,key) => {
        // reducers[key]对应的是每一个reducer函数 
        nextState[key] = reducers[key](
          state[key], // 对应的state数据
          action
        );
        return nextState;
      },{}
    );
  };
}

const combineReducers = (reducers) => {
  return (state = {},action) => {
    return Object.keys(reducers).reduce((nextState,key) => {
       nextState[key] = reducers[key](state[key],action)
       return nextState;
    },{})
  }
}

const store = createStore(rootReducer,preloadedState,enhancer);
