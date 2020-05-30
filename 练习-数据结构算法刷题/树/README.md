# 树

## 二叉树的前、中、后序遍历

### 前序遍历

考察:

- 对 in-order 的遍历顺序
- 对递归理解的程度，注意理解递归树
- 将递归树转化成栈循环

递归写法

```js
function preOrder(root) {
  // base case
  if (root === null) {
    // back track
    return root;
  }
  console.log(root.value);
  preOrder(root.left); // 向下压栈
  preOrder(root.right);
}
```

```js
var preorderTraversal = function (root) {
  if (!root) {
    return [];
  }
  var stack = [root],
    curNode = null,
    res = [];
  // 压栈
  while (stack.length > 0) {
    // 保证每次都是当前树的root
    curNode = stack.pop();
    res.push(curNode.val);
    // 注意和面试官沟通前序的顺序（左？右？）由于栈的特性，是反序的
    curNode.right && stack.push(curNode.right);
    curNode.left && stack.push(curNode.left);
  }
  return res;
};
```

### 中序遍历

中序遍历：

```js
function inOrder(root) {
  if (root === null) {
    return root;
  }
  inOrder(root.left);
  console.log(root.value);
  inOrder(root.right);
}
```

```js
var inorderTraversal = function (root) {
  var _stack = [],
    curNode,
    res = [];
  while (root || _stack.length > 0) {
    // 一路压下去
    while (root) {
      _stack.push(root);
      root = root.left;
    }
    // 到🍃节点,向上backTack后打印节点
    curNode = _stack.pop();
    res.push(curNode.val);
    // 移动到右边
    root = curNode.right;
  }
  return res;
};
```

### 后序遍历

```js
var postorderTraversal = function (root, arr = []) {
  if (!root) {
    return arr;
  }
  postorderTraversal(root.left, arr);
  postorderTraversal(root.right, arr);
  arr.push(root.val);
  return arr;
};
```

需要注意的是每次处理（push 到 res 中）完毕一个节点，需要将他从 root 中剪掉，这样就能够使得他按照后序的顺序进行打印。

```js
var postorderTraversal = function (root) {
  let res = [], stack = [];
  while (root || stack.length > 0) {
    if (root.left) {
      // 一路压下去
      stack.push(root);
      root = root.left;
    } else if (root.right) {
      // 压下去
      stack.push(root);
      root = root.right;
    } else {
      // 到🍃节点层，将当前节点放入res后，需要回到当前root
      res.push(root.val);
      root = stack.pop();
      // 将已经处理过的节点剪掉
      if (root && root.left) {
        root.left = null
      } else if (root && root.right) {
        root.right = null;
      }
    }
  }
  return res
```

### 面试题 32 - I. 从上到下打印二叉树

```js
/**
 * 利用队列的顺序特点，将root放置队列中，一次expend 将generator 的节点append 到队列中
 * 这样既可有序的将节点按层打印
 * @param {*} root
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }
  // 用于保存结果的数组，和内部expend + generator 的队列
  var res = [],
    _q = [root],
    curNode;
  // 只要队列还有元素，说明树还没有遍历完毕
  while (_q.length) {
    // expend 操作
    curNode = _q.shift();
    res.push(curNode);
    // generator操作
    curNode.left && _q.push(curNode.left);
    curNode.right && _q.push(curNode.right);
  }
  return res;
};
```

### 面试题 32 - II. 从上到下打印二叉树 II

```js
/**
 * 额外需要一个变量保存当前队列中需要被expend的个数，当他等于0时说明已经操作完毕
 * @param {*} root
 */
var levelOrder = function (root) {
  let res = [],
    num,
    _q = [root],
    level = 0,
    curNode;
  while (_q.length) {
    // 保存当前队列中的个数
    num = _q.length;
    // 每expand一个元素，就-- 当为0 时退出循环
    while (num--) {
      // 保存到当前层的数组中
      res[level] = [];
      curNode = _q.shift();
      res[level].push(curNode.val);
      // generator 元素
      curNode.left && _q.push(curNode.left);
      curNode.right && _q.push(curNode.right);
    }
    // 每次操作完毕，移动到下一层
    level++;
  }
  return res;
};
```

### 面试题 32 - III. 从上到下打印二叉树 III

```js
/**
 * 根据规律：
 * 奇层 左 -> 右 打印，因此在保存左右节点时需要从 右 -> 左 保存
 * 偶层 右 -> 左 打印，因此在保存左右节点时需要从 左 -> 右 保存
 *
 * 因此定义两个stack，明确其物理意义如上描述
 *
 * 但由于两个stack 代码量比较大，我们可以偷懒利用reverse进行操作。
 *
 * 只需要在存入时 判断当前的level 是否是偶数层，如果是 逆序存储即可。
 * @param {*} root
 */
var levelOrder = function(root) {
  let _q = [root],nums,level = 0,res = [],curNode;

  while (_q.length) {
    res[level] = [];
    nums = _q.length;
    while (nums) {
      curNode = _q.shift();
      res[level].push(curNode.val);
      curNode.left && _q.push(curNode.left)
      curNode.right && _q.push(curNode.rig ht)
    }
    // 逆序
    if(level % 2 === 0) res[level++].reverse();
  }
  return res;
};
```

## 平衡二叉树检查

```js
function isBalanced(root) {
  if (root === null) {
    return true;
  }
  // 获取高度差并进行判断是否平衡，此时递归计算高度，o(n);
  var hDiff = Math.abs(getHeight(root.left) - getHeight(root.right));
  if (hDiff > 1) {
    return false;
  }
  // 左子树、右子树必须同时满足才能说明是平衡二叉树
  return isBalanced(root.left) && isBalanced(root.right);
}
function getHeight(root) {
  if (root === null) {
    return 0;
  }
  return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
}
```

## 判断是否是对称二叉树

```js
function isSymmetic(root) {
  if (!root) {
    return true;
  }
  return helper(root, root);
}
function helper(left, right) {
  if (!left && !right) {
    return true;
  }
  if (!left || !right) {
    return false;
  }
  if (left.value !== right.value) {
    return false;
  }
  // 必须左边的左 和 右边的右 相等，<且> 左边的右 和 右边的左 相等 才满足。
  return helper(left.left, right.right) && helper(left.right, right.left);
}
```

## 判断是否是完全二叉树

```js
function isCompleteTree(root) {
  var queue = [root],
    flag = false,
    curNode = null;
  while (queue.length > 0) {
    // 取出第一个元素
    curNode = queue.shift();
    if (curNode.left === null) {
      flag = true;
    } else if (flag) {
      // 在下次遍历时
      return false;
    } else {
      // 将他的左节点扔进队列中,以便能够按层打印
      queue.push(curNode.left);
    }
    if (curNode.right === null) {
      flag = true;
    } else if (flag) {
      return false;
    } else {
      queue.push(curNode.right);
    }
  }
  return true;
}
```

## 重建二叉树

```js
/**
 * 利用pre 和 in 的特点：
 * pre： 第一个元素是当前序列中的root
 * in：  左子树 | root 右子树
 *
 * 1. 在前序遍历中找到root, 在中序中找到对应的root 和 左子树节点个数
 * (变量i 的物理意义：标识根节点在中序中的位置，左子树数量)
 * 2. 通过中序遍历划分左子树和右子树
 *
 * 注意点：slice API： 左包含又不包含，截取时注意边界。
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }
  let curRoot = preorder[0];
  const newRoot = new Tree(curRoot);
  // - 左子树数量 - curRoot 在 inorder中的偏移
  let i = 0;
  for (; i < inorder.length; i++) {
    if (inorder[i] === curRoot) {
      break;
    }
  }
  // preorder 中截取从第1个开始i个元素
  // inorder 中截取从0开始，i - 1个元素，略过curRoot
  newRoot.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  // preorder 中截取从第i+1个元素截取
  // inorder 中从i + 1个元素截取到末尾，略过curRoot
  newRoot.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return newRoot;
};
```

## 面试题 26-树的子结构

```js
/**
 * 所谓的子结构是指 对应的左子树、右子树必须节点相同，直觉：递归判断。
 *
 * 1. 找到B的Rroot 在A中的位置
 * 2. 在A中以Rroot 开始 和 B 进行详细比较
 * 比较细节：A到叶子节点还没有完成，返回false | B到叶子节点还没有结束，说明吻合返回true | A 和 B 的值不相同返回false
 * @param {*} A
 * @param {*} B
 */
var isSubStructure = function (A, B) {
  // 规定只要有一个为空 则判断不是子树
  if (!A || !B) {
    return false;
  }
  // 在A 的 左子树、右子树找到Rroot，真正开始判断（走入helper进行判断）
  return (
    hepler(A, B) || isSubStructure(A.left, B) || isSubStructure(B.right, B)
  );
  /**
   * 用于判断r2 是否为r1 的子树
   * @param {*} r1
   * @param {*} r2
   */
  function helper(r1, r2) {
    if (!r2) return true;
    if (!r1) return false;
    if (r1.val !== r2.val) return false;
    // 必须左右同时满足才可以
    return hepler(r1.left, r2.left) && hepler(r1.right, r2.right);
  }
};
```

## 面试题 27. 二叉树的镜像

```js
/**
 * 画图找规律：从上到下，交换root 的左右节点值；可以借助递归来完成该过程
 * @param {*} root
 */
var mirrorTree = function (root) {
  if (!root) {
    return null;
  }
  // swap
  var tempVal = root.left.val;
  root.left.val = root.right.val;
  root.right.val = tempVal;
  // 递归左右子树
  mirrorTree(root.left);
  mirrorTree(root.right);
  return root;
};
```

## 面试题 34. 二叉树中和为某一值的路径

```js
```
