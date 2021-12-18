const url = require('url')
let request = {
  get url () {
    return this.req.url
  },
  get path () {
    return url.parse(this.req.url).pathname
  },
  get query () {
    return url.parse(this.req.url).query
  }
}
module.exports = request