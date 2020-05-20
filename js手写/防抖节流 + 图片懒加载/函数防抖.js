function debounce (cb,wait) {
	let timer,context;
	//原理：开启定时器，在回调执行一次清理一次定时器，只以最后一次的定时器为准
	let _debounce = function () {
		if(timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(function () {
			cb.apply(context,this)
		},wait)
	}
}

// 首次点击有效果，然后开始防抖；

function debounce(cb,wait,options){
	let timer,context,args;
	let _debounce = function () {
		context = this;
		args = arguments;
		if(options.immediate) {
			let callNow = !timer;
			if(callNow) cb.apply(context,args);
		}
		if(timer) clearTimeout(timer);
		timer = setTimeout(function () {
			cb.apply(context,args);
			timer = null;
		},wait)
	}
}

// 合并先跳过；