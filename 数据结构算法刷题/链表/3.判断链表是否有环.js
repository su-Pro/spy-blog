function checkLoop(node) {
	if(node === null || node.next === null) {
		return false;
	}
	var fast = node.next.next;
	var slow = node;
	while(fast && fast.next) {
		// 相遇时
		if(slow == fast){
			return true;
		}
		fast = fast.next.next;
		slow = slow.next;
	}
	// 此时快指针已经到尾部或者出链表
	return false;
}