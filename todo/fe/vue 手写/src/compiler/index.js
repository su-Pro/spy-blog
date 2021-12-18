import { parseHTML } from './parser-html';
/**
 * 核心思路就是将模板转化成AST例如：下面这段字符串
 *  <div id="app"><p>hello {{name}}</p> hello</div>  ====> to AST
 *
 *  AST:
 let root = {
    tag:'div',
    attrs:[{name:'id',value:'app'}],
    parent:null,
    type:1,
    children:[{
        tag:'p',
        attrs:[],
        parent:root,
        type:1,
        children:[
            {
                text:'hello',
                type:3
            }
        ]
    }]
}
 * AST 在转成render函数 ====> _c("div",{id:app},_c("p",undefined,_v('hello' + _s(name) )),_v('hello'))
 *
 * 最后将render函数进行字符串包装并返回字符串（模板引擎实现套路） new Function + with(){}
 * TODO: new Function 细节？
 * @param template
 * @returns {Function}
 */
export function compileToFunction (template) {
  let rootAST = parseHTML(template); // 1. html字符串  => AST 语法树
  let code = generator(rootAST); // 2.将AST语法树 => 生成字符串包装的render函数
  // TODO： 这个renderFn到底是个什么？ 模板引擎包装render函数字符串，等待被执行？
  let renderFn = new Function(`with(this){${code}`);
  return renderFn;
}


/**
 * 将AST树 转化成一段字符串形式的函数
 * 主要工作就是拼接字符串...
 * @param {*} el
 */
function generate(el) { // [{name:'id',value:'app'},{}]  {id:app,a:1,b:2}
  let children = genChildren(el); // 生成孩子节点的字符串
  let code = `_c("${el.tag}",${
      el.attrs.length ? genProps(el.attrs) : 'undefined'
  }${
      children ? `,${children}` : ''
  })
    `
  return code;
}
/**
 * 例如考虑style样式的处理
 * style="color: red;fontSize:14px" => {style:{color:'red'},id:name,}
 * @param {*} attrs
 */
function genProps(attrs) { // 处理属性 拼接成属性的字符串
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === 'style') {
      let obj = {};
      attr.value.split(';').forEach(item => {
        let [key, value] = item.split(':');
        obj[key] = value
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}` // 去除最后一个，
}

function genChildren(el) {
  let children = el.children;
  if (children && children.length > 0) {
    return `${children.map(c => gen(c)).join(',')}`
  } else {
    return false;
  }
}
/**
 * 对每一个孩子 生成字符串格式
 * @param {*} node
 * 跳了这个函数
 */
function gen(node) {
  if (node.type == 1) {
    // 元素标签，需要递归处理
    return generate(node);
  } else {
    let text = node.text; //   <div>a {{  name  }} b{{age}} c</div>
    let tokens = [];
    let match, index;
    // 每次的偏移量 buffer.split()
    let lastIndex = defaultTagRE.lastIndex = 0; // 只要是全局匹配 就需要将lastIndex每次匹配的时候调到0处
    while (match = defaultTagRE.exec(text)) {
      index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`;
  }
}
