function insertTarget (node,target){
	// 不做处理
	if(node === null || target == null) {
		return;
	}
	// 头部情况
	if(node.val > target) {
		target.next = node;
		return target;
	}
	// 中间情况
	var runNode = node;
	while(runNode.next && runNode.next.val < target) {
		runNode = runNode.next;
	}
	// 找到正确位置，包含了两种情况：在中间 和直接到尾部；
	// 此时情况是：runNode的next节点大于target，需要在runNode和runNode.next切刀
	// 并将target拼接起来
	runNode.next = target;
	if(runNode.next !== null){ // 如果runNode已经到达链表的尾部，不需要拼接
		target.next = runNode.next;
	}
}