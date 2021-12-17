/**
 * 兼容IE ActiveXobject()
 */
const XHR = () => {
  let xObj = null;
  if (window.XMLHttpRequest) {
    xObj = new XMLHttpRequest();
  } else {
    xObj = new ActiveXObject();
  }
  return xObj;
};
/**
 * - 过滤操作：过滤掉 不是自己的属性，是函数的数据
 *
 * - encodeURIcomponent 编码数据
 *
 * - 拼接
 *
 * -
 *
 * @param {*} data 不确定的数据格式
 */
const format = (data) => {
  if (!data) return "";
  var pairs = [];
  for (let name in data) {
    // 过滤掉原型上的属性
    if (!data.hasOwnProperty(name)) continue;
    if (typeof name === "function") continue;
    // 编码
    let value = data[name].toString();
    name = encodeURIComponent(name);
    value = encodeURIComponent(value);
    pairs.push(name + "=" + value);
  }
  return pairs.join("&");
};
function XHR() {
  let xobj = null;
  if (window.XMLHttpRequest) {
    xobj = new XMLHttpRequest();
  } else {
    //  IE ActiveXObject
    xobj = new ActiveXObject();
  }
  return xobj;
}

/**
 * @param {Object} 需要被格式化的字符串
 *
 * {
 *  name : spy,
 *  age : 24
 * }
 *        =====>  name=spy&age=24
 *
 * 遍历data
 *    过滤
 *
 * 将 key value 组成一个encodeURLComponent(key)=encodeURLComponent(value) 的字符串 扔到 params中
 *
 *
 * params 再 通过 join进行拼接
 *
 * 边界：
 *  URL中使用，所以需要对特殊字符进行转义
 *
 *
 */
function format(data) {
  if (!data) return "";
  let params = [];
  for (let name in data) {
    if (!data.hasOwnProperty(name)) continue;
    if (typeof data[name] === "function") continue;
    let value = data[name];
    name = encodeURIComponent(name);
    value = encodeURIComponent(value);
    params.push(name + "=" + value);
  }
  return params.join("&");
}
const ajaxPromiseify = (
  method,
  url,
  data,
  responseType = "json",
  header = {}
) => {
  return Promise((resolve, reject) => {
    // 1. 创建一个XHR对象，并注册状态事件处理函数
    let xhr = XHR();
    let params = null;
    xhr.onreadystatechange = handler;
    // 2. 根据当前的method 去 处理data GET / POST
    if (method.toUpperCase() === "GET") {
      url = url + "?" + format(data);
    } else if (method.toUpperCase() === "POST") {
      params = data;
    }
    // 3. 调用xhr.open() 准备一个异步请求
    xhr.open(method, url, true);
    // 4. 处理http 自定义的头部
    for (let name in header) {
      xhr.setRequestHeader(name, header[name]);
    }
    // 5. 补充或添加content-type 类型
    !xhr["Content-Type"] && (xhr["Content-Type"] = "application/json");
    // 6. 发起一个网络请求 xhr.send() 并携带数据（没有就是null）
    xhr.send(params);
    /**
   * 可以使用this 代表xhr对象
     1. readyState 不是4  就返回 
     2. 判断状态码 status
   */
    function handler() {
      if (this.readyState !== 4) return;
      if (this.status === 200) {
        // resolve
        resolve(this.data);
      } else if (this.status === 404) {
        // reject
        reject("404 错误");
      }
    }
  });
};

const method = "GET",
  url = "http://xxx.com:3000/list",
  header = {
    "Content-Type": "application/json",
  },
  data = {
    page: 1,
    pageSize: 8,
  };
ajaxPromiseify(method, url, data, (responseType = "json"), header)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.warn(e);
  });

function getWebData(url) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 0:
        console.log("请求未初始化");
        break;
      case 1:
        console.log("以创建请求");
        break;
      case 2:
        console.log("请求已确认");
        break;
      case 3:
        console.log("正在接受数据");
        break;
      case 4:
        console.log("数据全部接受完毕");
        break;
    }
  };
  xhr.ontimeout = function (e) {
    console.log("ontimeout", e);
  };
  xhr.onerror = function (e) {
    console.log("onerror", e);
  };
  xhr.open("GET", url, true);
  xhr.timeout = 3000; // 设置xhr请求超时事件
  xhr.responseType = "text"; //设置响应返回的数据类型
  // 常见的有 "document" , "json" , "text" "arraybuffer"

  //可以设置额外的请求头
  xhr.setRequestHeader(my_header, "xxx");
  xhr.send(null);
}
