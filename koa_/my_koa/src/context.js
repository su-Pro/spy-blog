//实现ctx能够访问到属性，实际上是一个代理
let proto = {
}

/**
 * 实现代理对象获取时，拿到值
 * ctx.res => this.request.res
 * @param target request or response
 * @param property path/url/...
 */
function defineGetter(target,property) {
  proto.__defineGetter__(property,function () {
    //ctx代理对象
    return this[target][property]
  })
}
function defineSetter(target,property) {
  proto.__defineSetter__(property,function (value) {
    //ctx代理对象
    this[target][property] = value
  })
}
defineGetter('request','url')
defineGetter('response','body')
defineSetter('response','body');

module.exports = proto