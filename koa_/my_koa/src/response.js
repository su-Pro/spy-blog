let response = {
  _body: undefined,

  get body() {
    return this._body
  },
  set body(val) {
    if(val === undefined || val === this._body) {
      //没有新的资源要发送给浏览器，但是响应已经成功
      return this.res.statusCode = 204
    }
    this._body = val
  }
}
module.exports = response