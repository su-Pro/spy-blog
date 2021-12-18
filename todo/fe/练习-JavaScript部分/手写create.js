if(typeof Object.create !== "function") {
  Object.create = function (proto) {
    if(typeof proto !== "object" && typeof proto !== "function") {
      throw new Error('error')
    }
    function F () {}
    F.prototype = proto.prototype;
    return new F();
  }
}
