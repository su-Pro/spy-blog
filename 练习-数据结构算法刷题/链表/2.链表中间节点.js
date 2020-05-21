/**
 * 快慢指针，
 * @param node
 * @returns {*}
 * @constructor
 */
function FindMiddleNode (node){
	if(node == null){
		return;
	}
	let slow = node;
	let fast = node.next;
	while(fast && fast.next){
		slow = slow.next;
		fast = fast.next.next;
	}
	return slow;
}
