### $watch
$watch 是 watcher的一个实例，不过需要定制化实现三个功能：
- unwatch
- immediate
- deep

### 计算属性

计算属性简单的来说就是定义在vm身上的一个特殊getter方法（方便获取），在这个getter中可以通过wthcer实现缓存和依赖收集功能。

计算属性的结果是会缓存的，只有计算属性依赖的响应式属性发生改变后，才会进行重新求值。内部是通过dirty属性来实现的，当dirty属性为true时，说明需要重新计算。当dirty为false时，走缓存。


当计算属性中内容发生改变后，计算属性的watcher 和 组件的watcher 都会收到通知。对于计算属性的watcher收到通知后，将自己的dirty属性设置为true。这样再次访问计算属性时，会进行重新求值.同时组件的渲染watcher会重新执行render方法,此时就会读取计算属性的值.

由于当前dirty为true,此时读取会触发重新计算过程.当计算完毕后呢，会将自己的dirty属性设置为false，这样在下次读取时会使用缓存。

通过自己模拟实现的代码进行讲解，首先在init时，会对当前每一个计算属性做一个watcher实例。

#### initComputed

```js
// 计算属性 特点 默认不执行，等用户取值的时候在 执行，会缓存取值的结果
// 如果依赖的值变化了 会更新dirty属性，再次取值时 可以重新求新值

// watch方法 不能用在模板里，监控的逻辑都放在watch中即可
// watcher 三类 渲染watcher  用户watcher  计算属性watcher
function initComputed(vm,computed){
    // 将计算属性的配置 放到vm上
    let watchers = vm._watchersComputed =  Object.create(null); // 创建存储计算属性的watcher的对象

    for(let key in computed){ 
      //  userDef就是计算属性对应的函数
        let userDef = computed[key]; 
        // new Watcher此时什么都不会做 配置了lazy dirty = true
        watchers[key] = new Watcher(vm,userDef,()=>{},{lazy:true}); //lazy标识当前为计算属性，初始化（new时）时不会进行求值
    // 做一层代理，将每一个计算属性定义到vm上，方便获取；
    // 获取计算属性时，会触发get方法  
        Object.defineProperty(vm,key,{
            get:createComputedGetter(vm,key)
        }) 
    }
}
```

#### 实例化

watcher实例化时，主要是对dirty进行定制处理，需要注意的是计算属性只有被真正用到时，才会计算，首次初始化时并不会执行get方法。

```js
constructor(vm,exprOrFn,cb=()=>{},opts={}){
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        ...
        this.lazy = opts.lazy; // 如果这个值为true 说明他是计算属性
        this.dirty = this.lazy;
        ...        
        // 如果当前我们是计算属性的话 不会默认调用get方法
        // 只有这个计算属性被使用后，才会执行，否则就是懒加载状态。
        this.value = this.lazy? undefined : this.get();         
    }

```

#### createComputedGetter

createComputedGetter方法是一个高阶函数，执行后会返回一个函数。当执行该方法时，通过dirty属性的判断，是否要执行watcher实例的evalutate方法。

```js
function createComputedGetter(vm,key){
    let watcher = vm._watchersComputed[key]; // 这个watcher 就是我们定义的计算属性watcher
    return function() { 
        if(watcher){
            // 如果dirty 是false的话 不需要重新执行计算属性中的方法
           if(watcher.dirty){ 
             // 如果页面取值 ，而且dirty是true 就会去调用watcher的get方法
            watcher.evaluate();
           } 
           if(Dep.target){ // watcher 就是计算属性watcher dep = [firstName.dep,lastName.Dep]
               watcher.depend();
           }
           return watcher.value
        }
    }
}
```

#### evaluate

evaluate方法执行后，会对当前的计算属性进行求值操作，完毕后会将dirty设置为false，方便下次计算时走缓存。

```js
//...Watcher
    evaluate(){
        this.value = this.get();
        this.dirty = false; // 值求过了 下次渲染走缓存
    }
```