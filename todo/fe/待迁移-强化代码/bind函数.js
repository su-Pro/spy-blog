let slice = Array.prototype.slice,
    concat = Array.prototype.concat;
Function.prototype.myBind = function () {
  let callFunc = this, context = arguments[0],
      outArgs = slice.call(arguments,1);
  return function (...args) {
    let finalArgs = outArgs.concat(args)
    return callFunc.apply(context,finalArgs)
  }
}

function test (sex,age) {
  console.log(this.name,sex,age);
}

name = 'global'

let testObj = {
  name : 'test_object'
}


let testObj2 = {
  name : 'test_object2'
}
let newTest = test.myBind(testObj,'boy')
newTest(24)