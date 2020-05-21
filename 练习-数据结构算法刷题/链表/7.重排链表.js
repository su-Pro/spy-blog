function reorderList (head) {
    if(!head) {
        return;
    }
    var dummyHead = new ListNode(-1);
    dummyHead.next = head;

    var linklistA = head;
    var linklistB = null;
    // 用于查找链表中点
    var fast = head;
    var slow = head;
    // step one; 
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    // 此时的中点是slow指针
    // step two
    linklistB = reverse(slow.next); 
    slow.next = null; // slow无用遂置空

    // step three merge

    while(linklistA && linklistB) {
        // 用于移动链表A 和 B
        var Anext = linklistA.next;
        var Bnext = linklistB.next;

        // one by one 链接，看示例
        linklistB.next = linklistA.next;
        linklistA.next = linklistB;

        // 向前移动
        linklistA = Anext;
        linklistB = Bnext;
    }
    return dummyHead.next;
    function resvse(node) {
        // base case
        if(!node || !node.next) {
            return node;
        }
        var _node = reverse(node.next);
        _node.next.next = _node;
        _node.next = null;
        return _node;
    }
}
