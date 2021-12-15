const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // abc-aaa
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <aaa:asdads>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >  <div>

let rootAST = null;
let currentParent; // 父节点指针
let stack = []; // 用来维护父子关系的栈，同时能够对标签规范性（是否完全闭合）进行效验。
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;

/**
 * 对字符串进行循环截取，生成rootAST同时处理好层级关系。
 * @param html
 * @returns {*}
 */
export function parseHTML(html) {
  let stringStart, text, startTagMatch, endTagMatch;
  while (html) {
    stringStart = html.indexOf('<');
    // 开始标签和结束标签两种情况
    if (stringStart === 0) {// 如果当前索引为0 肯定是一个标签,但不定就是开始标签因此要兼容结束标签
      startTagMatch = parseStartTag(); // 通过这个方法获取到匹配的结果为：tagName + attrs，或者是 结束标签
      if (startTagMatch) {
        // 调用钩子函数将tagName 和 attrs进行传递
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue; // 如果开始标签匹配完毕后 进入下一次匹配
      }
      endTagMatch = html.match(endTag); // 匹配结束标签
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        // 调用钩子函数将匹配到的结束标签进行传递
        end(endTagMatch[1]);
        continue;
      }
    }
    // 纯文本情况
    if (stringStart >= 0) {
      text = html.substring(0, stringStart); // 获取纯文本内容
    }
    // 截取的纯文本内容
    if (text) {
      advance(text.length);
      // 调用钩子函数将匹配到的文本内容进行传递
      chars(text);
    }
    // 后续的还有DCOTYPE、注释节点等 详情查阅源码
  }

  /**
   * 用于生成匹配到的标签名和属性对象
   */
  function parseStartTag() {
    let start = html.match(startTagOpen), end, attr;
    const match = {
      tagName: start[1],
      attrs: []
    }
    // 匹配到，说明是一个开始标签
    if (start) {
      // 删除已经匹配解析后的标签名
      advance(start[0].length);
      // 一个一个的解析属性，因此使用while循环
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // 删除已经解析后的属性
        advance(attr[0].length);
        match.attrs.push({
          name: attr[1],
          // @puzz 和书上的不太一样，但意思就是说将匹配到的属性扔进attrs数组中
          value: attr[3] || attr[4] || attr[5]
        });
      }
      // 如果是闭合标签，则直接返回。
      if (end) { // 去掉开始标签的 >
        advance(end[0].length);
        return match
      }
    }
  }

  /**
   * 用于删除以匹配到的字符串内容
   * @param {*} n
   */
  function advance(n) {
    html = html.substring(n);
  }
  return rootAST;
}


/**
 * 根据匹配到的内容创建AST节点
 * @param {*} tagName
 * @param {*} attrs
 */
function createASTElement(tagName, attrs) {
  return {
    tag: tagName,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null
  }
}

/**
 * 遇到开始标签 则创建一个AST元素
 * @param {*} tagName
 * @param {*} attrs
 */
function start(tagName, attrs) {
  let element = createASTElement(tagName, attrs);
  if (!root) { // 设置最初的树根节点
    root = element;
  }
  currentParent = element;
  stack.push(element); // 将开始标签存放到栈中，使得能够通过stack维护父子关系
}

function chars(text) {
  // 处理空格内容
  text = text.replace(/\s/g, '');
  if (text) { // 文本内容没有子节点
    currentParent.children.push({
      text,
      type: TEXT_TYPE
    })
  }
}

function end(tagName) {
  let element = stack.pop(); // 拿到当前节点的开始标签
  // TODO: 可以校验当前弹出的ast 和 入参是否相同，如果不同则说明发生问题
  currentParent = stack[stack.length - 1];// 处理节点父子关系;stack.length - 1 =>> stack.top()
  if (currentParent) {//为了兼容root节点，root节点的currentParent 为 null
    element.parent = currentParent;
    currentParent.children.push(element);
  }
}

