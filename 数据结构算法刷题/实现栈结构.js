function myStack() {
	this.temp = [];
}
myStack.prototype = {
	pop : function () {
		return this.temp.pop();
	},
	push : function (elem) {
		return this.temp.push(elem);
	},
	top : function (){
		return this.temp[temp.length - 1];
	},
	size : function () {
		return this.temp.length;
	},
	clear : function () {
		this.temp = [];
	}
}
