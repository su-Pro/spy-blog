var MinStack = function() {
    this.temp = [];
    this.Stack = [];
    // 保存最大值。
    this.global_min = Number.MAX_VALUE;
};

MinStack.prototype.push = function(x) {
    this.Stack.push(x);
    if (this.Stack.length === 0) {
        this.temp.push(x);
        this.global_min = x;
    } else {
        this.global_min = this.global_min > x ? x : this.global_min;
        this.temp.push(this.global_min);
    }
};

MinStack.prototype.pop = function() {
    this.Stack.pop();
    this.temp.pop();
    this.global_min = this.getMin() ? this.getMin() : Number.MAX_VALUE; 
};

MinStack.prototype.top = function() {
    return this.Stack[this.Stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.temp[this.temp.length - 1];
};

// fllow up 如何优化temp中的多余空间？