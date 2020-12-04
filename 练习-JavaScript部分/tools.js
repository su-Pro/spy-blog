//取消冒泡 兼容W3C和IE
function stopBubble(evnet) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}

//取消默认事件，兼容W3C和IE
function cancelHandler(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}
//获取子元素节点
function retElementChild(node) {
  var temp = {
    length: 0,
    push: Array.prototype.push,
    splice: Array.prototype.splice,
  };
  var child = node.childNodes;
  var len = child.length;
  for (var i = 0; i < len; i++) {
    if (child[i].nodeType === 1) {
      temp.push(child[i]);
    }
  }
  return temp;
}
//返回元素e的第n曾祖先
function retParent(e, n) {
  while (e && n) {
    e = e.parentElement;
    n--;
  }
  return elem;
}
//返回元素e的第n个兄弟节点，n为正，返回后面的兄弟节点，n为负返回前面的，n为0，返回自己
function retSibling(e, n) {
  while (e && n) {
    if (n > 0) {
      if (e.nextElementSibling) {
        e = e.nextElementSibling;
      } else {
        for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
      }
      n--;
    } else {
      if (e.previousElementSibling) {
        e = e.previousElementSibling;
      } else {
        for (
          e = e.previousSibling;
          e && e.nodeType != 1;
          e = e.previousSibling
        );
      }
      n++;
    }
  }
  return e;
}
//封装children函数，解决兼容问题。
Element.prototype.myChildren = function () {
  var child = this.childNodes,
    len = child.length,
    arr = [];
  for (var i = 0; i < len; i++) {
    if (child[i].nodeType === 1) {
      arr.push(child[i]);
    }
  }
  return arr;
};

//封装hasChildren()方法，不可使用children属性
Element.prototype.hasChildren = function () {
  var child = this.childNodes,
    len = child.length;
  for (var i = 0; i < len; i++) {
    if (child[i].nodeType === 1) {
      return ture;
    }
  }
  return false;
};
//数组去重

Array.prototype.unique = function () {
  var temp = {},
    arr = [],
    len = this.length;
  for (var i = 0; i < len; i++) {
    if (!temp[this[i]]) {
      temp[this[i]] = "abc";
      arr.push(this[i]);
    }
  }
  return arr;
};
//圣杯模型
var inherit = (function () {
  function F() {}
  return function (Target, Origin) {
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    Target.prototype.uber = Origin.prototype;
  };
})();
//深度克隆

//insertAfter();功能类似inserBefore();
Element.prototype.insertAfter = function (targetNode, afterNode) {
  var temp = afterNode.nextElementSibling;
  if (temp == null) {
    this.appendChild(targetNode);
  } else {
    this.insertBefore(targetNode, temp);
  }
};
//封装兼容性事件添加函数
function addEvent(elem, type, handle) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, false);
  } else if (elem.attchEvent) {
    elem.attachEvent("on" + type, function () {
      handle.call(elem);
    });
  } else {
    elem["on" + type] = handle;
  }
}
//封装兼容性解除事件函数
function removeEvent(elem, type, handle) {
  if (elem.removeEventListener) {
    elem.removeEventListener(type, handle, false);
  } else if (elem.detachEvent) {
    elem.datchEvent("on" + type, function () {
      handle.call(elem);
    });
  } else {
    elem["on" + type] = null;
  }
}
//封装兼容ie的异步加载JavaScript
//记得定义一个配合库来实现
var tools = {
  test: function () {
    //函数体，当作callback回调用
  },
};
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.style = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "complate" || script.readyState == "loaded") {
        tools[callback]();
      }
    };
  } else {
    script.onload = function () {
      tools[callback]();
    };
  }
  script.src = url; //能这样写吗？
  document.head.appendChlid(script);
}

// 封装type判断对象方法
template = {
  "[object Object]": "object",
  "[object Array]": "object-array",
  "[object String]": "object-string",
  "[object Boolean]": "object-boolean",
  "[object Number]": "object-number",
};
function type(target) {
  var str = Object.prototype.toString.call(target);
  //判断原始值 和 引用值
  if (target === null) {
    return null;
  } else if (typeof target == "object") {
    return template[str];
  } else {
    return typeof target;
  }
}
