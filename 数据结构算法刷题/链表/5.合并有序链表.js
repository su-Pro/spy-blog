function merge (l1,l2) {
	// 有空的情况下不做处理
	if(!l1 || !l2){
		return ;
	}
	var dummyHead = new Linkist(-1);
	// 用于遍历dummy的run指针，使得最终能够直接返回正确的dummyHead
	var runDummy = dummyHead;
	// 只要有一个到尽头，结束谁小移谁
	while(l1 && l2) {
		var i = l1.val;
		var j = l2.val;
		if(i < j) { 
		// 移动并且插入到dummy中
		runDummy.next = l1;
		l1 = l1.next;	
		}else {
			runDummy.next = l2;
			l2 = l2.next;
		}
		// 别忘了让dummy也run起来
		runDummy = runDummy.next;
	}
	// post process
	if(l1 || l2) {
		runDummy.next = l1 ? l1 : l2;
	}
	// 注意跨过dummyHead;
	return dummyHead.next;
}

function _merge (l1,l2) {
	//到尾部后，处理两种后续情况
	if(!l1) return l2;

	if(!l2) return l1;

	if(l1.val <= l2.val) { // 谁小移谁，并进行拼接返回
		l1.next = _merge(l1.next,l2)
		return l1;
	}else {
		l2.next = _merge(l1,l2.next)
		return l2;
	}
}

