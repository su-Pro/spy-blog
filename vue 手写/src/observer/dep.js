let id = 0;
class Dep{
  constructor(){
    this.id = id++;
    this.subs = [];
  }
  addSub(watcher){
    this.subs.push(watcher); // 观察者模式
  }
  depend(){
    // 让这个watcher记住我当前的dep,如果watcher没存过dep ，dep肯定不能存过watcher
    Dep.target.addDep(this);
  }
  notify(){
    this.subs.forEach(watcher=>watcher.update())
  }
}
let stack = [];
// 目前可以做到 将watcher保留起来 和 移除的功能

// 下面两个方法都是在操作Dep.target
export function pushTarget(watcher){
  Dep.target = watcher;
  stack.push(watcher);
}
export function popTarget(){
  stack.pop();
  Dep.target = stack[stack.length -1];
}


export default Dep
