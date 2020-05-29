## 基础

### spa 和 router

router的存在，使得SPA成为一种可行的方案；

根据不同的路由匹配渲染不同的组件，实现页面之间的切换。

和传统多页面的区别？ 传统多页面：1html 对应一个 页面；spa：一个页面对应一个组件。

### 浏览器的历史管理
浏览器的历史记录管理是借助两个栈型结构，简称stack1，和stack2.

stack1的物理意义：存放浏览器前进的页面（添加）
stack2的物理意义：存放后退的页面

当浏览器产生后退页面行为时，会将stack1进行pop操作，并将该页面push到stack2中。当浏览器想回到后退前的页面时，只需要将stack2中的页面push到stack1中即可。

当浏览器发生前进行为时，首先会将stack2进行清空，并将该页面push到stack1中。

### hash 和 history模式

#### hash
hash模式是通过在uri的path字段增加形如：#aa #bb，通过#后面路径进行路由切换。

修改hash是通过BOM提供的 `window.location.hash ` 属性进行修改，可以监控`onHashChange`事件对路由变化进行响应处理。  

问题就是 丑！

#### history

history是主流推荐的
内部实现是通过BOM提供的 `window.history.pushState(data)` 实现增添路径，可以监控`window.onpopstate`事件对路由进行处理。

它也能够检测到hash的变化因此在内部实现时，会优先考虑`window.onpopstate`, 否则会使用`onHashChange`事件

存在一个小问题：他的路径是虚拟的，服务端并不是真实存在，因此强制刷新会导致404情况。可以通过SSR来解决该问题。 





### router是如何安装到Vue中的？

首先需要通过`Vue.use(VueRouter)`对router进行注册，VueRouter在使用时需要通过new一个实例，进行配置后传入到new Vue中使用。因此我们知道 VueRouter就是一个类，并且需要提供静态方法`install`

因此我们只需提供install 方法即可

```js
VueRouter.install = install;
```

顺带说一嘴，VueRouter将router属性挂载到Vue实例上和vueX一样，不再赘述。

```js
Vue.mixin({
  beforeCreate() {
      // 如果有router 说明你在根实例上增加了router 当前这个实例是根实例            
      if (this.$options.router) {            
          this._routerRoot = this; // 就是将当前根实例放到了_routerRoot                
          this._router = this.$options.router; // 获取用户传递的router对象                                
      } else {
          this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
      // 这里所有的组件都拥有了 this._routerRoot属性
  }
});
```

### router-link 和 router-view 是如何实现的？

在install方法内部通过`Vue.component` 注册这两个组件，同时配合 `$slot属性` 来实现组件嵌套。 

需要注意的是，这里我们拿不到`<slot></slot>`，因此只能使用默认插槽属性获取内容

* [ ] 插槽类型
* [ ] <slot> 是谁提供的？为什么在vue - router 中获取不到？


### createMatcher

在初始化VueRouter中，该方法主要做三件事儿：

1. 将用户编写的router进行结构处理和关系映射
2. 提供内部match方法，用于匹配当前路由对应的组件
3. 提供内部addRoutes方法，实现对路由的动态添加

```js
class VueRouter{
    constructor(options){
      ...
        // 格式化
        // 提供match方法 将路由和组件进行匹配 
        // 提供addRoutes方法 实现动态路由添加权限（由后端返回的路由表）
        this.matcher = createMatcher(options.routes || []);         
    }
    ...
}
```

createMatcher方法如下所示：
```js

export default function createMatcher(routes){
    /**
     * pathList: 所有的路由组成的数组  ['/','/about','/about/a','/about/b','/xxx]
     * pathMap  {/:{组件},/about:{组件},/about/a:{组件}}
     */
    let {pathList,pathMap} = createRouteMap(routes);

    /**
     * 根据用户输入的路径，进行组件匹配？
     * @param {*} location 
     */
    function match(location){       
    }
    /**
     * 
     * @param {*} routes 动态添加的路由
     */
    function addRoutes(routes) {         
    }
    return {
        match,
        addRoutes
    }
}
```

### 

### 实现