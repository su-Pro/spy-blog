/**
 * 1.新建XHR对象
 * 2.注册相关事件处理回调函数
 * 3.预准备请求
 * 4.配置额外参数
 * 5.发送请求
 */

function getWebData(url) {
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 0:
        console.log('请求未初始化')
        break;
      case 1:
        console.log('以创建请求')
        break;
      case 2:
        console.log('请求已确认')
        break;
      case 3:
        console.log('正在接受数据')
        break;
      case 4:
        console.log('数据全部接受完毕')
        break;
    }
  }
  xhr.ontimeout=function (e) {
    console.log('ontimeout',e);
  }
  xhr.onerror=function (e) {
    console.log('onerror',e)
  }
  xhr.open('GET',url,true);
  xhr.timeout=3000; // 设置xhr请求超时事件
  xhr.responseType='text'; //设置响应返回的数据类型
  // 常见的有 "document" , "json" , "text" "arraybuffer"

  //可以设置额外的请求头
  xhr.setRequestHeader(my_header,'xxx');
  xhr.send(null)
}
