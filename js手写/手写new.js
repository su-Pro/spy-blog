/**
 * 测试用例：
 * function Son () {
 *   ...
 * }
 * let son = myNew(Son,name)
 */
function myNew (constructor,...args) {
    let to = {};
    to.__proto__ = constructor.prototype; // 修改原型
    /*
    * let F = function () {}
    * F.prototype = constructor.prototype;
    * to = new F() // 用到了new... 但是性能比__proto__好
    * */
    let result = constructor.apply(to,args); // 尝试执行，并拿到结果
    return (typeof result === "object") ? result : to;
}
