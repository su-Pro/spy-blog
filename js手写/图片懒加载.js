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


