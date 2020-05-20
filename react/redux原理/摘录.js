function createStore (reducer,preloadedState,ehancer) {
	// something
	return enhancer(createStore)(reducer,preloadedState)
}

function applyMiddleware (...middlewares) {
	return (next) => 
		(reducer,initialValue) => {
			var store = next(recucer,initialValue)
			var dispatch = store.dispatch;
			var chain = []

			var middlewareAPI = {
				getState : store.getState,
				dispatch: (next) => dispatch(action)
			}

			chain = middlewares.map(middleware => middleware(middlewareAPI))
			// 重写dispatch
			dispatch = compose(...chain,store.dispatch)
			return {
				...store,
				dispatch
			}
		}
}
const compose = (...funcs) => {
	return funcs.reduce((a,b) => (...args) => a(b(...args)))
}