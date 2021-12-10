var arr1 = [1, 2, [3, 4]]
var arr2 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];
const arr_ = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]
/**
 * 1. 只能处理一层arr
 * @param {}} arr 
 */
function flat(arr) {
  return arr.reduce((prev, cur) => prev.concat(cur), []);
}
/**
 * 2. 对数据进行拉平操作，默认只拉平一层，如果需要全部拉平，需要传递指定的层数.
 * @param {*} arr 
 * @param {*} deep 
 */
function d_flat(arr,deep = 1){
  let _helper = (arr,deep) => arr.reduce((prev,cur) => prev.concat(Array.isArray(cur) ? d_flat(cur,deep - 1) : cur),[])  
  // 如果还有层数没有处理，那么需要继续递归处理，但如果处理完毕，需要浅拷贝一层返回给上一层进行拼接
  return deep > 0 ? _helper(arr,deep) : arr.slice()
}
/**
 * 3. 注意需要用...进行展开，因为得到的是一个遍历器对象
 * @param {*} arr 
 * @param {*} deep 
 * 需要注意yield* 可以将控制权移交给另外一个生成器当他完成后返回回来继续干，
 * 和递归好像啊...
 */
function * gen_flat(arr,deep = 1) {
  // 不要使用for in 遍历数组，那都是索引...
  for(let item of arr) {
    if(Array.isArray(item) && !!deep ) {
      yield* flat(item,deep - 1)
    }else {
      yield item;
    }
  }
}
