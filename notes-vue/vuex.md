
## Vuex

### 1.简述一下什么是vuex？

- vue 的状态管理模式
- 集中式存储组件间共享的状态
- 保证状态以可预测的方式进行更新  
- 核心理念：单向数据流![image.png](https://cdn.nlark.com/yuque/0/2020/png/481272/1582461839496-77a43f95-f83b-4229-90ea-1350348eacd3.png#align=left&display=inline&height=267&margin=%5Bobject%20Object%5D&name=image.png&originHeight=866&originWidth=1280&size=53747&status=done&style=none&width=394)

当多个组件共享一个状态时存在以下问题：

- 多个视图共享一个状态
- 多个视图存在不同行为更改同一状态

因此通过**全局单例模式**，能够在任何组件中获取共享的状态，并且可以触发指定行为修改状态。

**流程图如下：**
![image.png](https://cdn.nlark.com/yuque/0/2020/png/481272/1581983107677-33fc2639-1cdb-4c86-8022-25bb87505d17.png#align=left&display=inline&height=276&margin=%5Bobject%20Object%5D&name=image.png&originHeight=551&originWidth=701&size=33979&status=done&style=none&width=350.5)

### 2.actions 和 mutations的区别？

你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。mutations 更改状态最好是同步更改，虽然异步更改状态也可以，但是在严格模式下会报错。

> 也好理解：异步操作已经脱离了当前的mutations，属于突变外的状态更改，不可控，因此严格模式下给ban掉

actions 提交的是 mutation 而不是直接进行状态修改，它可以包含任意异步操作。通常以下两种场景使用actions

- 异步操作
- 合并多个mutations

> 可以理解为redux里的中间件

### 3. 如何区分 vuex 和 组件内部状态 的界限？

通常在业务组件中，使用vuex更多一些。这样可以在不同组件中统一操作vuex的状态，使得父子组件通信、兄弟组件通信和隔代组件通信变得清晰明了。

在通用组件中，一般会使用props 和 事件进行父子组件之间的通信（通用组件通常不存在兄弟组件之间通信）。这样做的好处是能和业务进行解耦，方便组件的复用。

> 因此在设计通用组件时，需要将props进行详细的规定（至少给上类型判断）。这样使得使用该组件的同事很舒服，并且在开发环境下能够更好的debug。

### 4. vuex是如何安装到vue中的？

首先在项目中通过`Vue.use( plugin )`将vuex进行安装,通过该api我们知道vuex要么是一个提供了`install `方法的对象，要么是一个函数.总之`install`方法会被vue.js执行。

因此vuex只需要提供`install` 方法作为桥梁接口即可，不过需要注意的是，use方法明确了插件在实现install 方法时需要保证只能被安装一次（也就是**全局单例模式**）。

```js
// STEP 0.插件桥梁方法
// 通过Vue.use(Vuex)即可自动调用install，会将当前的Vue实例作为_Vue传递进来
// 第三方插件必须提供install方法
export function install (_Vue) {
  // 保证全局单例模式
  if (Vue && _Vue === Vue) {
    if (__DEV__) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
	}  
  Vue = _Vue	
  // STEP 1.全体混入$store🤠
  applyMixin(Vue)
}
```

### 5. 如何让所有组件都能够获取$store属性？

vuex给出了两种方案：在vue版本大于等于2时，会采用mixin混入生命周期方案；小于2.0版本时会采用向Vue的原型对象上添加属性这种方案。

> 向原型添加 $store 属性会导致不需要vuex的实例也会拥有$store属性

具体实现是向组件混入`beforeCreate ` hooks，其中包含了`vuexInit`方法，该方法执行后会将$store属性挂载到当前组件上（也就是Vue实例）。

> 需要注意，通过mixin混入的生命周期是要先于组件内的生命周期执行的，是因为mixin的实现是通过`mergeOptions(this.options,mixin)`这种方式进行合并.在该方法的实现中，会维护一个stack来存放「同名生命周期」，因此会先执行mixin中混入的生命周期方法，因为他是最后进stack。

承接上段代码中的`STEP 1`
```js
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    // 全局混入，会影响后面所有的每一个实例对象（组件）
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }
  //  NOTE: 根实例、 子组件实例挂载$store
  function vuexInit() {
    const options = this.$options    
    if (options.store) {
			// 根实例
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
		/**
		 * 通过判断父节点的$store 来实现子组件的挂载
		 *  
		 * $options.parent === this.$parent
		 * */		
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```

### 6. vuex中是如何实现store中的响应式数据的？

借用了`Vue.js`的数据侦测,直接将store属性塞到了一个新的Vue实例的data属性中，间接的对store属性进行了响应式处理。

同时也从侧面印证了为什么vuex只能用于vue.js身上，强依赖vue的响应式处理能力。

> 在源码中用$$store来存储的store，这样是无法在外部拿到store属性的。然后对store属性做了一个存取器，保证了store是只读的。

响应式处理是在Store类的 `constructor方法` 中，主要做了三件事儿：

- 格式化数据，将用户传入的options格式化成便于操作的树状结构
- 递归的安装模块
- 将数据进行**响应式处理**

```js
constructor() {
  ...
  // 此时的state是安装完毕模块后的root.state
  resetStoreVM(this, state)
}
function resetStoreVM (store, state, hot) {
  ...

  store._vm = new Vue({
    data: {
      $$state: state
    }
  })
	// ...  
	get state() {
			return this._vm._data.$$state
	}
}
```

### 7. vuex 中的 getter 是如何处理的？

和store响应式处理异曲同工，借助`Vue.js`中的「计算属性」来实现，这样使得getter 拥有了「缓存」的能力。

但是在实现时，需要注意两个小问题：

- getter 写法是函数，但实际上是对函数返回的对象进行使用，如何处理？
- 如何将所有 getter 挂载到`Vue.js`的计算属性中？

通过以下代码简要说明其实现思路：

```js
export const forEach = (obj = {}, fn) => {
	// getters函数作为第一个参数传递到fn中，对应的名字作为第二个参数传递到fn中。
	Object.keys(obj).forEach((key, index) => fn(obj[key], key))
}
const computed = {};
forEach(options.getters, (fn, key) => {
    computed[key] = () => {
        return fn(this.state)
    }
    Object.defineProperty(this.getters, key, {
      // 代理
        get: () => this._vm[key]
    })
})
this._vm = new Vue({
    data: {
        $$state: state
    },
    // 这里直接以处理好的对象直接挂载
    computed 
```

1. 遍历getters中的entries，将每个key对应的getter函数，挂载到computed对象上。值就是对应的函数执行后返回的属性。并将computed对象挂到`Vue.js`中，通过他的计算属性进行管理。
2. 对getters 进行一层代理，做一个存取器。这样就可以通过$store.getters直接获取`Vue.js`管理的计算属性（getter值）。
 
### 8. vuex：commit 和 mutations 是如何建立联系的？

本质上是通过**发布订阅模式**来实现的，vuex具体的实现过程稍微复杂，我将他抽象成极简的代码，说明意图：

```js
    this._mutations = {};
    forEach(options.mutations, (fn, type) => {
        this._mutations[type] = (payload) => fn.call(this, this.state, payload)
    });
    this._actions = {};
    forEach(options.actions, (fn, type) => {
        this._actions[type] = (payload) => fn.call(this, this, payload)
		});
	commit = (type, payload) => {
		this._mutations[type](payload)
  }
  dispatch = (type, payload) => {
		this._actions[type](payload);
  }
```

1. 对用户传递的mutations对象进行遍历，将每一个type对应的`mutations函数`进行一层包装，使得在执行时能够传递`payload`并且保证this指向。最终保存到当前store实例属性上（**订阅过程**）

2. 在commit 以及 dispatch函数执行时，从当前实例上找到对应的type方法，并将payload作为入参执行该函数（**发布过程**）

### 9. vuex 模块的特点

#### 默认情况

- 默认模块是没有作用域的

模块内部的 action、mutation 和 getter 是注册在全局命名空间上（根模块）的，这样使得多个模块能够对同一 mutation 或 action 作出响应。

例如：

```js
export default new Vuex.Store({
    state: {
        age:0,
    },
    mutations: {
        changeAge(state, payload) {
            state.age += payload
        }
    },
    modules: {
        a: {
            state: {
                c: 100
            },
            mutations: {
                changeAge(state, payload) {
                    console.log('a 更新')
                }
            },
        },
        b: {
            state: {
                d: 100
            },
            mutations: {
                changeAge(state, payload) {
                    console.log('b 更新')
                }
            },
        }
    }
})
// 当commit changeAge 这个mutation时，会把a模块 和 b模块的mutation一起执行
$store.commit('changeAge',1)
```

- 当state 和 modules 重名时，modules 会被state所覆盖

#### namespaced: true

-  如果该模块增加了namespaced: true，会将这个模块所有属性封装到当前作用域下，获取时需要增加模块前缀。

```js
export default new Vuex.Store({
    state: {
      age: 0, 
    },
    mutations: {
        changeAge(state, payload) {
            state.age += payload
        }
    },
    modules: {
        a: {
            namespaced: true,
            state: {
                c: 100
            },
            mutations: {
                changeAge(state, payload) {
                    console.log('a 更新')
                }
            },
            modules: {
                e: {
                    state: {
                        c: 100
                    }
                }
            }
        },
    } 
// 这样获取 a/changeAge

})
```

-  对当前模块设置了命名空间后，在获取时会查看路径上的父级是否有设置namespaced: true，如果有设置需要拼接路径，否则需要将其剪枝。

```js
export default new Vuex.Store({
    state: {
      age: 0,
      },
     mutations: {
      changeAge(state, payload) {
        state.age += payload
      }
    },
    modules: {
        a: {
            namespaced: true,
            state: {
                c: 100
            },
            mutations: {
                changeAge(state, payload) {
                    console.log('a 更新')
                }
            },
            modules: {
                e: {
                    state: {
                        c: 100
                    }
                }
            }
        },
    }
})
```
### 10. 模块是如何收集的？

对用户输入的内容进行处理，转化成一颗树形结构，这样会比直接写modules更好处理。

在初始化store时就会进行模块收集操作，如下：

```js
class Store {
  constructor(options) {        
    // 格式化用户传入的参数,转换成树形结构
    this._modules = new ModuleCollection(options);
    ...
  }
}
```

`ModuleCollection` 会对options进行格式化，最终会成为这样的数据结构：

```js
root : {
    _raw:xxx,
    _children:{
        a:{
            _raw:xxx,
            state:a.state
        },
        b:{
            _raw:xxx,
            _children:{

            },
            state:b.state
        }，
    },
    state:xxx.state
}
```

通过register方法对模块进行递归构建：

```js
export default class ModuleCollection {
    constructor(options) {
        // 首次调用register时,路径设置为空数组
        // 设置为数组的目的是便于后续找父级的操作
        this.register([], options);
    }
    register(path, rootModule) { 
        let newModule = new Module(rootModule);        
        // 找到根模块
        if (path.length === 0) {
            this.root = newModule;
        } else {           
            let parent = path.slice(0, -1).reduce((memo, current) => {
                return memo.getChild(current);
            }, this.root);
        // 找到父级后，需要将当前模块添加到父级身上
            parent.addChild(path[path.length - 1], newModule);
        }
        // 有子模块的情况下，需要将path进行拼接后，以当前子模块再次进行模块注册
        // k 叉树递归
        if (rootModule.modules) {
            forEach(rootModule.modules, (module, moduleName) => {
                this.register([...path, moduleName], module);
            });
        }
    }
}
```

`Module` 只是对模块属性的简单封装，同时提供一些实例方法，便于格式化模块。

```js
export default class Module {
    constructor(rootModule) {
        this._rawModule = rootModule;
        this._children = {};
        this.state = rootModule.state;
    }
    getChild(key) {
        return this._children[key];
    }
    addChild(key, module) {
        this._children[key] = module;
    }    
}
```

### 11. 有了收集的根状态root，那么如何遍历它并安装到最终的store上呢？

```js
function installModule(store, rootState, path, module) {
    console.log(path);

    module.forEachMutation((mutation,type)=>{
        console.log(mutation,type)
    });

    module.forEachAction((action,type)=>{
        console.log(action,type)
    });

    module.forEachGetters((getter,key)=>{
        console.log(getter,key);
    }); 

    module.forEachChild((child,key)=>{
        installModule(store,rootState,path.concat(key),child);
    })
}
```
