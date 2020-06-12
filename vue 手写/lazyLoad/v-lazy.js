// 1. 安装插件，并注册全局指令
const VueLazyLoad = {
  install(Vue, options) {
    const LazyClass = Lazy(Vue);
    const lazy = new LazyClass(options);
    Vue.directive('lazy', {
      bind: lazy.addDirective.bind(this)
    })
  }
}
function Lazy(Vue) {
  class ReactiveLazyItem {
    constructor(el, src, options, controllRender) {
      this.el = el;
      this.src = src;
      this.options = options;
      this.controllRender = controllRender;
      this.state = {
        loaded: false
      }
    }
    checkView() {
      let { top } = this.el.getBoundlingClientRect();
      return top < window.innerHeight * (this.options.preload || 1.3);
    }
    load() {
      controllRender(this, 'loading');
      loadImgAsync(this.src, () => {
        this.state.loaded = true;
        this.controllRender(this, 'success')
      }, () => {
        this.controllRender(this, 'error')
      })
    }
  }
  return class LazyClass {
    constructor(options) {
      this.lazyItemQueue = lazyItemQueue;
      this.options = options;
      this.hasBandle = false;
    }
    /**
     * 懒加载逻辑入口
     * 指令绑定函数
     * 1. 找到带有srcoll属性的父元素
     * 2. 向父元素绑定事件
     * 3. 初始化每个绑定的懒加载元素
     */
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
    /**
     * 判断队列中的元素，哪一个是需要开始加载的
     * 需要每一个图片的state状态，
     * 需要判断每一个元素是否可以加载
     * 需要元素的加载函数
     * 
     */
    handleLazyLoad() {
      this.lazyItemQueue.forEach(item => {
        let catIn;
        if (!item.state.loaded) {
          catIn = item.checkView();
        }
        catIn && item.load();
      })
    }
    /**
     * 根据状态的不同，添加src属性
     * 
     */
    controllRender(item, state) {
      // 1. loading 
      // 2. success
      // 3. error
      let el = item.el;
      let src = '';
      switch (state) {
        case 'loading':
          src = this.options.loading || '';
          break;
        case 'success':
          src = this.options.success || '';
          break;
        case 'error':
          src = this.options.error || '';
          break;
        default:
          return
      }
      el.setAttribute('src', src);
    }
  }
}
function getScrollParent(node) {

}