## map

### 特点

- 解决对象的键值对存储，只能用字符串当做键的限制，并且会有隐式类型转换
- Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构
- 除了数组，字符串，其他具有 Iterator 接口的双元素的数组的数据结构可以作为参数构建map
- 对同一个键连续赋值两次，后一次的值覆盖前一次的值
- **顺序存储，遍历时保证有序性**

> 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。

```js
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```

### api

#### 增删改查

和 Set 异曲同工，不过区别在于**set方法返回的是当前的Map对象，因此可以采用链式写法。**

#### 遍历

和 Set基本一样，不同的在于`Map.prototype.entries()` 会返回键值对。

> 本质是set 也是返回键值对，只不过键和值相同而已。

### 转换

#### JSON

#### 对象

### 应用

#### 解决哈希碰撞

#### 模拟 LRU 算法

该算法描述的是当空间不够时，按照最近最少使用的策略进行删除，实现对新元素的缓存。除了LRU（基于时间）策略 还有 先进先出策略 LFU（基于使用次数）

```js
// ES6 Map
// 该数据结构提供了iteraotr接口，遍历该数据的顺序即是插入的顺序，同时拥有map的优势：O（1）时间查找和插入

function LRUcache (capacity) {
  this.capacity = capacity;
  this.map = new Map();
}
/**
 * 
 * 和 set一样，需要移动到最近使用
*/
LRUCache.prototype.get = function (key) {
  let _cacheValue = this.map.get(key)
  if(typeof _cacheValue === 'undefined') return -1;
  this.map.delete(key)
  this.map.set(key,_cacheValue)
  return _cacheValue
}

/**
 * 核心是保证设置一回元素，让其跑到最前面，可以先删除，再添加，即可。
 * 
 * 如果达到上限后，需要把最早加入进来的元素删除，所以只需要拿到最早添加的元素，删除即可
 * 
 * 可以利用this.map.keys() 返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键，也就是上面需要的第一个元素。
 * 
*/
LRUCache.prototype.set = function (key,val) {
  //如果元素在缓存中
  if(this.map.has(key)) {
    this.map.delete(key)
  }else if(this.map.size() >= this.capacity) {
    // 需要删除末尾元素
    let tail = this.map.keys().next().value;
    this.map.delete(tail)
  }
  // 处理完毕后将需要缓存的元素缓存到map中
  this.map.set(key,val);
}
```
