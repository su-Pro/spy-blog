const RESOLVED = "RESOLVED"

const REJECTED = "REJECTED"

const PENDING = "PENDING"

/**
1. 判断 promise === x  ？ reject(一个错误信息) : 向下执行

2. 判断 x  === 原始值 ？ resolve（x） ： 向下执行

3. 判断 x拥有then函数 ？ 递归处理 promise ：resolve（x）




@params {Promise} promise 需要被决定状态的promise实例
@params {any} x 决定pormise状态的数据  原始值 | promise对象 | then函数
@params {Function} resovle promise的状态更改函数 - 成功
@params {Function} reject promise的状态更改函数 - 失败
*/
const resolvePromise = (promise,x,resovle,reject) => {
	if(promise === x) {
		reject(new Error(`xxx`));
	}
	let called = false;
	if((typeof x === 'object' && x !== null) || typeof x === 'function') {
		try {
			let then = x.then;
			if(typeof then === 'function') {
				then.call(x,(y) => {
					if(called) return;
					called = true;				
					resolvePromise(promise,y,resovle,reject)
				},(e) => {
					if(called) return;
					called = true;
					reject(e);
				})
			}else {
				resovle(x)
			}
		}catch(e) {
			if(called) return;
			called = true;							
			reject(e)
		}	
	}else {
		resovle(x)
	}
}

class Promise {
	constructor(executor) {
		this.status = PENDING;
		this.value = undefined;
		this.reason = undefined;
		this.fulfilledCBS = [];
		this.rejectCBS = [];
		let resolve = (value) => {
			if(this.status === PENDING) {
				this.status = RESOLVED
				this.value = value
				fulfilledCBS.forEach(cb => cb())
			}
		}
		let reject = (reason) => {
			if(this.status === PENDING) {
				this.status = PENDING
				this.reason = reason
				rejectCBS.forEach(cb => cb())
			}
		}
		// 让excutor执行
		try {
			executor(resolve,reject) 
		}catch(e) {
			reject(e)
		}
	}
	then(onfulfilled,onrejected) {
		let promise2 = new Promise((resolve,reject) => {
			if(this.status === RESOLVED) {
				setTimeout(() => {
					try {
						let x = onfulfilled(this.value);
						resolvePromise(promise2,x,resolve,reject)
					}catch(e) {
						reject(e)
					}
				},0)
			}
			if(this.status === REJECTED) {
				setTimeout(() => {
					try {
						let x = onrejected(this.reason);
						resolvePromise(promise2,x,resolve,reject)
					}catch(e) {
						reject(e)
					}
				},0)
			}
			if(this.status === PENDING) {
				// 订阅事件
				this.fulfilledCBS.push(() => {
					setTimeout(() => {
					try {
						let x = onfulfilled(this.value);
						resolvePromise(promise2,x,resolve,reject)
					}catch(e) {
						reject(e)
					}
					},0)
				})
				this.rejectCBS.push(() => {
					setTimeout(() => {
					try {
						let x = onrejected(this.reason);
						resolvePromise(promise2,x,resolve,reject)
					}catch(e) {
						reject(e)
					}
					},0)
				})
			}
		})
		return promise2;
	}
}