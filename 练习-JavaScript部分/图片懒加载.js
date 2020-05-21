// 获取图片集合
const imgs = doucment.getElementsByTagName('img');
// 获取视口高度
const viewHeight = window.innerHeight || window.doucmentElement.clientHeight;
// 图片编号
let num = 0;

function lazyLoad() {
	for(let i = num;i < imgs.length;i ++) {
		let distance = viewHeight - imgs[i].getBoundingClientRect().top;
		if(distance >= 0) {
			// 加载图片
			imgs[i].src = imgs[i].getAttribute('data-src');
			num = i + 1;
		}
	}
}

window.addEventListener('scroll',lazyLoad,false)











const _imgs = doucment.getElementsByTagName('img');
// domList;

const viewHeight = window.innerHeight || window.doucmentElement.clientHeight;
todo: 浏览器距离获取

let _id = 0;

for(let i = _id,len = _imgs.length;i < len;i++) {
  let distance = viewHeight - _imgs[0].getBoundingClientRect.top();
  if(distance >= 0 ) {
    // 取attribute 并设置
    imgs[i].src = imgs[i].getAttribute('data-src');
    _id = _id + 1;
  }
}

