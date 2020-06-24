var MinStack = function () {
	this.helperS = [];
	this.OriginStack = [];
	// 保存最大值。
	this.gMin = Number.MAX_VALUE;
};

MinStack.prototype.push = function (x) {
	this.OriginStack.push(x);
	/**
	 * 保证helperS每次加入的元素为最小元素
	 */
	if (this.OriginStack.length === 0) {
		this.helperS.push(x);
		this.gMin = x;
	} else {
		this.gMin = this.gMin > x ? x : this.gMin;
		this.helperS.push(this.gMin);
	}
};

MinStack.prototype.pop = function () {
	this.OriginStack.pop();
	this.helperS.pop();
	this.gMin = this.getMin() ? this.getMin() : Number.MAX_VALUE;
};

MinStack.prototype.top = function () {
	return this.OriginStack[this.OriginStack.length - 1];
};

MinStack.prototype.getMin = function () {
	return this.helperS[this.helperS.length - 1];
};

// fllow up 如何优化helperS中的多余空间？