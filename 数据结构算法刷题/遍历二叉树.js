function Node(value){
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
c.left = f;
c.right = g;
b.left = d;
b.right = e;

function f1(root){
    if(root == null){
        return;
    }
    console.log(root.value);
    f1(root.left);
    f1(root.right);
}
function f2(root){
    if(root == null) return;
    f1(root.left);
    console.log(root.value);
    f2(root.right)
    
}
function f3(root){
    if(root == null)return;
    f3(root.left);
    f3(root.right);
    console.log(root.value);
}
/**
 * 给出二叉树，写出前序中序后序遍历
 * 写出前中后序遍历的代码
 * 给出前序中序还原二叉树，要求写出后序遍历
 * 给出后续中序还原二叉树，要求写出前序遍历
 * 代码实现前序中序还原二叉树
 * 代码实现中序后序还原二叉树
 */