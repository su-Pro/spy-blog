function Node (value){
    this.value = value;
    this.left = null;
    this.right = null;
}
var a = new Node("a")
var b = new Node("b")
var c = new Node("c")
var d = new Node("d")
var e = new Node("e")
var f = new Node("f")
var g = new Node("g")

a.left = c;
a.right = b;
c.left =f;
c.right = g;
b.left = d;
b.right = e;

function breadthSearch(nodeList,target) {
    if(nodeList== null || nodeList.length == 0) return false;
    var childList = [];
    for(var i = 0;i < nodeList.length;i++){
        if(nodeList[i] != null && nodeList[i].value == target){
            return true;
        }else{
            childList.push(nodeList[i].left);
            childList.push(nodeList[i].right);
        }
    }
    return breadthSearch(childList,target);
}
