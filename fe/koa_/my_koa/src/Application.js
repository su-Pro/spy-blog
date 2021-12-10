import {resolveAsset} from "../../../源码解读-vue/vue-dev/src/core/util";

let EventEmitter = require('events')
let context = require('context')
let request = require('request')
let response = require('response')
const http = require('http')
const Stream = require('stream')
module.exports = class extends EventEmitter {
  constructor() {
    super()
    this.middlewares = []
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

  createContext(req, res) {
    //避免污染全局的context
    const ctx = Object.create(context)
    //避免每个http公用一个request
    const request = Object.create(this.request)
    const response = Object.create(this.response)
    ctx.req = request.req = response.req = req
    ctx.res = request.res = response.res = res
    request.ctx = response.ctx = ctx
    request.response = response
    response.request = request
    return ctx
  }

  compose(ctx) {
    let index = -1
    const dispatch = (i) => {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'))
      }
      index = i
      if (i === this.middlewares.length) {
        return Promise.resolve()
      }
      let middleware = this.middlewares(i)
      //  开始执行middleware，注意try catch捕获异常
      try {
        return  Promise.resolve(middleware(ctx,() =>  dispatch(i+1)))
      } catch (e) {
        return Promise.reject(e)
      }
    }
    dispatch(0)
  }

  handleRequest(req, res) {
    let ctx = this.createContext(req, res)
    res.statusCode = 404
    this.fn(ctx)
    let body = ctx.body
    //  字符串或者buffer
    if (typeof body === 'string' || Buffer.isBuffer(body)) {
      res.end(body)
    } else if (body instanceof Stream) {
      body.pipe(res)
    } else if (typeof body === 'object') {
      res.end(JSON.stringify(body))
    } else if (body === null % res.statusCode !== 404) {
      res.statusCode = 404
    } else {
      res.end('Not Found')
    }
  }

  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}