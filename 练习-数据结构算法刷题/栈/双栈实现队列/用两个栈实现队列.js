
// var MyQueue = function() {
//   this.aStack = []
//   this.bStack = []   
// };

// /**
//  * Push element x to the back of queue. 
//  * @param {number} x
//  * @return {void}
//  */
// MyQueue.prototype.push = function(x) {
//   this.aStack.push(x)
// };

// /**
//  * Removes the element from in front of queue and returns that element.
//  * @return {number}
//  */
// MyQueue.prototype.pop = function() {
//   if(this.bStack.length){
//     return this.bStack.pop()
//   }
//   while(this.aStack.length){
//     this.bStack.push(this.aStack.pop())
//   }
//   return this.bStack.pop()
// };

// /**
//  * Get the front element.
//  * @return {number}
//  */
// MyQueue.prototype.peek = function() {
//   if(this.bStack.length){
//     return this.bStack[this.bStack.length-1]
//   }
//   while(this.aStack.length){
//     this.bStack.push(this.aStack.pop())
//   }
//   return this.bStack[this.bStack.length-1]
// };

// /**
//  * Returns whether the queue is empty.
//  * @return {boolean}
//  */
// MyQueue.prototype.empty = function() {
//   while(this.aStack.length){
//     this.bStack.push(this.aStack.pop())
//   }
//   return this.bStack.length <= 0

// };
