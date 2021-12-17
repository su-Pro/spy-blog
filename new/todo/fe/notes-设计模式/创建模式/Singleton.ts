/**
 * 1. 声明静态私有成员保存当前实例
 * 2. 提供公共静态方法获取当前实例
 * 3. getInstance方法首次执行会创建一个实例，存储到静态私有成员上，以后再执行会直接返回静态私有成员
 * 4. 将构造函数私有化，保证外界不能new，只允许类的静态方法调用
 * 5. 修改调用时的代码
 */

class Singleton {
  private static instance: Singleton;
  
  private constructor() {
    // init...
  }
  public static getInstance() {
    if(!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance
  }
}
// 单例类是无法继承的，因为constructor 已经私有化
// class test extends Singleton {

// }
let x = Singleton.getInstance();