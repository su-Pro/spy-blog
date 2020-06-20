/**
 * 作为入口函数，执行后得到一个LazyClass实例对象
 * @param {*} Vue 
 */
function Lazy(Vue) {

  class ReactiveImgListener {
    constructor({ el, src, options }) {
      this.el = el;
      this.src = src;
      this.options = options;
      this.state = { loading: false }
      this.imgAddSrc = imgAddSrc
    }
    checkInViewPosition() {
      let { top } = this.el.getBoundingClientRect();
      return top < window.innerHeight * (this.options.preLoad || 1.3);
    }
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
  }
  // dosomethings
  return class LazyClass {
    constructor(options) {
      this.options = options;
      this.bindHandler = false;
      this.imgListenerQueue = [];
    }
    // TODO: 指令原理，以及钩子生效时机
    /**
     * 1. 找到拥有scroll属性的父级元素
     *  - bind 在生效时，无法拿到其父亲元素，其原因可以参考生效时机
     *  - nextTick 延迟到DOM添加完毕后，再去获取其父元素
     *  - 调用getScrollParent(el) 获取真实的 带 “scroll” 属性的父级元素
     *  - 向真实父级元素 监听 scroll 事件
     *  ！ tick：避免重复绑定事件，做一个标志位
     * 
     * 2. ? 判断当前元素是否在容器 “可视窗口” 中
     * 
     * 3. 存储所有绑定过指令的图片元素，将每个图片元素对应的对象，通过类进行生成一下
     *  - 有了存储结构后，可以判断里面哪些需要显示，哪些不需要显示
     * 
     * 4. 校验是否显示图片逻辑
     *  - 为图片对象增加状态属性，可以标识：是否加载过、正在加载、加载失败
     *  - 提供检测当前图片位置，判断是否需要加载图片
     *  - 提供渲染逻辑的统一方法，在构造图片对象时，挂在到对象身上。
     * 
     * 5. 加载图片
     *  - 通过提供的统一渲染逻辑方法，先渲染loading态的图片
     *  - 而后根据当前图片加载状态进行判断，是渲染正确图片还是错误图片
     * 
     * @param {*} el 
     * @param {*} bindings 
     * @param {*} vnode 
     */
    add(el, bindings, vnode) {
      Vue.nextTick(() => {
        let ownScrollParent = getScrollParent(el);
        if (ownScrollParent && this.bindHandler) {
          this.bindHandler = true;
          ownScrollParent.addEventListener('scroll', this.handleLazyLoad.bind(this))
        }
        const imgListener = new ReactiveImgListener({
          el,
          src: bindings.value,
          options: this.options,
          imgAddSrc: this.setImgSrctoAttr.bind(this)
        })
        this.imgListenerQueue.push(imgListener)
        // 在没有触发滚动事件时，会进行一次检查
        this.handleLazyLoad()
      })
    }
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
    /**
     * 根据state 的不同，将图片对象的src属性进行设置
     * @param {*} imgElement 
     * @param {*} state 
     */
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
  }
}
/**
 * - 提供install方法
 * 
 * - 注册lazy指令钩子函数
 */
const vueLazyLoad = {
  install(Vue, options) {
    const LazyClass = Lazy(Vue);
    // lazy指令的核心逻辑封装在此
    const lazy = new LazyClass(options);
    Vue.directives('lazy', {
      bind: lazy.add.bind(lazy)
      // inserted:
      // update:
      // componentUpdated:
      // unbind:
    })
  }
}

function getScrollParent(el) {
  let parent = el.parentNode;
  while (parent) {
    if (/(?:scroll)|(?:auto)/.test(getComputedStyle(parent)['overflow'])) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return parent;
}
function loadImageAsync(src, resolve, reject) {
  let image = new Image();
  image.src = src;
  image.onload = resolve;
  image.onerror = reject;
}