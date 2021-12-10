### 初始化指令

指令是通过isntall方法初始化的，因此实现指令第一步就是构造install方法。

[vue-lazyload](https://github.com/sup-fiveyear/vue-lazyload)的源码实现里，对懒加载的代码进行了封装，对外暴露一个函数作为接口，实现了高内聚。

```js
function Lazy(Vue) {
  // dosomethings
  return class LazyClass {
    constructor() {
    }
    // bind指令的初始化逻辑
    add(el,bindings,vnode) { }
  }
}
const vueLazyLoad = {
  install(Vue, options) {
    const LazyClass = Lazy(Vue);
    const lazy = new LazyClass(options);
    Vue.directives('lazy', {
      bind: lazy.add.bind(this)
      // 还可以有4个钩子函数
      // inserted
      // update
      // componentUpdated
      // unbind
    })
  }
}
```

### 找到拥有scroll属性的父级元素,并监听事件

- bind 在生效时，无法拿到其父元素，其原因可以参考bind指令生效时机(patch算法结束后，插入dom前)
- 可以使用 nextTick 将获取父元素延迟到DOM添加完毕后
- 调用getScrollParent(el) 获取真实的 带 “scroll” 属性的父元素
- 监听 其 scroll 事件

> ！ tick：避免重复绑定事件，做一个标志位

```js
    add(el, bindings, vnode) {
      Vue.nextTick(() => {
        let ownScrollParent = getScrollParent(el);
        // bindHandler 标志位，防止多次绑定事件
        if (ownScrollParent && this.bindHandler) {
          this.bindHandler = true;
          ownScrollParent.addEventListener('scroll', this.handleLazyLoad.bind(this))
        }
      })
    }
```

### 处理图片元素

- 先将所有绑定过指令的图片元素通过类构造出一个实例，并存储到一个数组中
- 因此可以判断数组中里面哪些需要显示，哪些不需要显示

```js
    add(el, bindings, vnode) {
      Vue.nextTick(() => {
        //...
        const imgListener = new ReactiveImgListener({
          el,
          src: bindings.value,
          options: this.options,
        })
        this.imgListenerQueue.push(imgListener)
      })
    }
```

```js
  class ReactiveImgListener {
    constructor({ el, src, options }) {
      this.el = el;
      this.src = src;
      this.options = options;
    }
    
    checkInViewPosition() {}
  }
```

### 校验是否显示图片

- 为图片对象增加状态属性，通过该属性能够标识三种状态：是否加载过、正在加载、加载失败
- 提供检测当前图片位置
- 提供对图片src属性处理逻辑的统一方法

```js
    checkInViewPosition() {
      let { top } = this.el.getBoundingClientRect();
      return top < window.innerHeight * (this.options.preLoad || 1.3);
    }
```

```js
    setImgSrctoAttr(imgElement, state) {
      let el = imgElement.el;
      let src = ''
      switch (state) {
        case 'loading':
          src = imgElement.options.loading || ''
          break;
        case 'error':
          src = imgElement.options.error || '';
          break;
        default:
          src = imgElement.src;
          break;
      }
      el.setAttribute('src', src)
    }
```

### 加载图片

- 首先渲染loading态的图片
- 绑定图片onload 以及 onerror 的事件处理函数


```js
function loadImageAsync(src, resolve, reject) {
  let image = new Image();
  image.src = src;
  image.onload = resolve;
  image.onerror = reject;
}
```

```js
  /**
   * 检查 imgListenerQueue 中 是否有需要加载的图片对象
   * 
   */
  handleLazyLoad() {
    this.imgListenerQueue.forEach(imgListener => {
      if (!imgListener.state.loading) {
        let catIn = imgListener.checkInViewPosition();
        catIn && imgListener.loadImg();
      }
    })
  }

```

```js
  loadImg() {
    this.imgAddSrc(this, 'loading');
    loadImageAsync(this.src,
      () => {
        this.state.loading = true;
        this.imgAddSrc(this, 'finish');
      },
      () => {
        this.imgAddSrc(this, 'error');
      });
  }
```

[完整代码请查阅这批文章](./v-lazy.js)
