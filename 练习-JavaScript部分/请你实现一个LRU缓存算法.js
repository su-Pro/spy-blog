//该算法描述的是当空间不够时，按照最近最少使用的策略进行删除，实现对新元素的缓存
// 除了LRU（基于时间）策略 还有 先进先出策略 LFU（基于使用次数）

/**
 * 纯单链表：
 *  维护一个有序的单链表，越靠近链表尾部的元素是越早之前访问的元素(随时可能被更新掉)。
 *  当有一个新的元素被get时，从链表的头部开始按顺序遍历链表
 *   - 如果此数据以及存在于链表中，我们遍历到该数据对应的具体节点，将其从该位置删除，并插入到链表的头部（最新）
 *  当在缓冲区设置一个新的值时，有如下两种情况：
 *    - 如果缓存未满，直接插入到链表的头部
 *    - 如果缓存已满，将链表的尾部删除，将新的节点插入到链表的头部。 
 *
 * 觉得怪怪的，在设置新值这里
 */


function LinkList (node) {
  this.node = node;
  this.next = null;
}

class LRU {
  constructor (size) {
    this._linkSize = size;
  }
  set () {
  
  }
  get () {

  }

}


// ES6 Map
// 该数据结构提供了iteraotr接口，遍历该数据的顺序即是插入的顺序，同时拥有map的优势：O（1）时间查找和插入

function LRUcache (capacity) {
  this.capacity = capacity;
  this.map = new Map();
}
LRUCache.prototype.get = function (key) {
  let _cacheValue = this.map.get(key)
  if(typeof _cacheValue === 'undefined') return -1;
  //使得让该key跑到最map的头部
  this.map.delete(key)
  this.map.set(key,_cacheValue)
  return _cacheValue
}

LRUCache.prototype.set = function (key,val) {
  //如果元素在缓存中
  if(this.map.has(key)) {
    this.map.delete(key)
  }else if(this.map.size() >= this.capacity) {
    // 需要删除末尾元素
    let tail = this.map.keys.next().value;
    this.map.delete(tail)
  }
  // 处理完毕后将需要缓存的元素缓存到map中
  this.map.set(key,val);
}