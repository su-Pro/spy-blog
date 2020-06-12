### 注册指令

```js
// 1. 安装插件，并注册全局指令
const VueLazyLoad = {
install (Vue,options) {
    const LazyClass = Lazy(Vue);
    const lazy = new LazyClass(options);
    Vue.directive('lazy',{
      bind: lazy.addDirective.bind(this);
    })
  }
}
```

### 初始化懒加载逻辑

```js
    addDirective(el, bindings) {
      // 此时el还没有添加到真实DOM中，无法获取到父元素
      // 需要使用nextTick推迟到下一个事件循环中
      Vue.nextTick(() => {
        let scrollParent = getScrollParent(el);
        // 只有父元素存在，且父元素没有被绑定过才绑定，避免重复绑定事件
        if (scrollParent && !this.hasBandle) {
          this.hasBandle = true;
          scrollParent.addEventListener('scroll', this.handleLazyLoad.bind(this))
        }
        const lazyItem = new ReactiveLazyItem(
          {
            el,
            src: bindings.value,
            options: this.options,
            controllRender: this.controllRender.bind(this)
          }
        )
        this.lazyItemQueue.push(lazyItem);
        this.handleLazyLoad();
      })
    }
```