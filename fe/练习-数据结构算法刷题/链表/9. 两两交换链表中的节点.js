function swapPairs (head) {
// base case
	if(head.next === null) {
		return head;
	}
	let firstNode = head;
	let secondeNode = head.next;

	firstNode.next = swapPairs(secondeNode.next);
	secondeNode.next = firstNode;
	return secondeNode;
}