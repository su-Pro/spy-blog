function partition (head,x) {
	if(!head || !head.next) {
		return;
	}
	// 用于保存 partition后的节点
	var dummyHeadA = new ListNode(-1);
	var dummyHeadB = new ListNode(-1);

	// 用于run Dummy链表
	var runDummyA = dummyHeadA;
	var runDummyB = dummyHeadB;

	// 遍历 head 链表
	while(head) {
		if(head.val < x) {
			//向 A 插入
			runDummyA.next = x;
			runDummyA = runDummyA.next;
		}else {
			// 向 B 插入
			runDummyB.next = x;
			runDummyB = runDummyB.next;
		}
		head = head.next;
	}
	// 已经 partition 完毕，现在要拼接 + 置空tail指针
	runDummyA.next = dummyHeadB.next; // 注意是dummyB.next;
	// 置空
	runDummyB.next = null;
	return dummyHeadA.next;
}