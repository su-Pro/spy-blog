function _instanceof (l,r) {
  if(r === null) return false;
  var proto = Object.getPrototypeof(l);
  while(true) {
    // 找到头
    if(proto === null) return false;
    if(proto === r.prototype) return true;
    proto = Object.getPrototypeof(proto);
  }
}