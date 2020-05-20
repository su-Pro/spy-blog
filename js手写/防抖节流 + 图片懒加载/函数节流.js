function throttle (fn,wait) {
	let prevTimeSpan = 0,tDiff,context,args;
	let throttled = function () {
		context = this;
		args = arguments;
		let curTimeSpan = + new Date();
		tDiff = wait - (curTimeSpan - prevTimeSpan)
		// 执行节流的那次操作
		if(tDiff <= 0) {
			fn.apply(context,args)
			// 移动时间戳
			prevTimeSpan = curTimeSpan;
		}
	}
	return throttled
}

// 能够处理在节流操作后，再执行一次函数 options.trailing

function throttle (cb,wait) {
	let timer,context,args,tDiff,curTimeSpan,prevTimeSpan = 0;
	let _trailing = function () {
		cb.apply(context,args);
		// 将时间归位
		curTimeSpan = + new Date();
		// 是否需要这一步操作
		prevTimeSpan = curTimeSpan;
	}
	let throttled = function () {
		context = this;
		args = arguments;
		// 说明触发了事件响应，要清除_trailing操作，也就是清理定时器
		if(timer) {
			clearTimeout(timer);
			timer = null;
		}
		curTimeSpan = + new Date ();
		tDiff = wait - (curTimeSpan - prevTimeSpan);
		if(tDiff <=0) {
			cb.apply(context,args);
			prevTimeSpan = curTimeSpan;
			// 条件限制：timer只有不存在时才会注册定时器
		}else if (!timer && options.trailing !== false) {
			timer = setTimeout(timer,tDiff);
		}
	}
	return throttled;
}


