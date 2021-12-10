## set/map

### 特点

- ES6 提供了新的数据结构 Set。它类似于数组，但是**成员唯一，没有重复的值**。
- 可以接受一个数组（或者具有 iterable 接口的其他数据结构）来初始化。
- 向 Set 加入值的时候，**不会发生类型转换，所以5和"5"是两个不同的值**。
- Set 内部判断两个值是否不同，类似于精确的三等运算符，例如两个空对象不相等，但不同的是：认为NaN等于自身。
- Set的遍历顺序就是**插入顺序**

### api

#### 增删查清

- `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为Set的成员。
- `Set.prototype.clear()`: 清除所有成员，没有返回值。

#### 遍历

- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员
- Set 结构的实例默认可遍历,可以直接用for...of循环遍历 Set

> entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

### 数组转换

#### Array.from()

Array.from() 可以接受一个迭代器接口作为参数，创建新的数组。

```js
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```

#### 拓展运算符


```js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6
```

### 应用

#### 数组去重

```js
function unique (arr) {
	return [...new Set(arr)]
}
```

#### 并、交、差集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```
