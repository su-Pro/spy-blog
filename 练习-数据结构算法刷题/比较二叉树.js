function Node (){
    this.value = value;
    this.left = null;
    this.right = null;
}
var a = new Node("a");
var b = new Node("b");
var c = new Node("c");
var d = new Node("d");
var e = new Node("e");
var f = new Node("f");
var f = new Node("f");
var g = new Node("g");

var a2 = new Node("a")
var b2= new Node("b")
var c2 = new Node("c")
var d2 = new Node("d")
var e2 = new Node("e")
var f2 = new Node("f")
var g2 = new Node("g")

a.left = c;
a.right = b;
c.left = f;
c.right = g;
b.left = d;
b.right = e;


a2.left = c;
a2.right = b;
c2.left = f;
c2.right = g;
b2.left = d;
b2.right = e;

function compareTree(root1,root2){
    if(root1 === root2) return true;
    if(root1 == null && root2 != null || root2 == null && root1 != null ) return false;
    if(root1.value != root2.value)return false;
    var leftBool = compareTree(root1.left,root2.left);
    var rightBool = compareTree(root2.right,root2.left);
}