const data = [
  {
    id: 1,
    subItems: [
      {
        id: 2,
        subItems: [
          {
            id: 3,
            subItems: [],
          },
          {
            id: 4,
            subItems: [],
          },
        ],
      },
      {
        id: 5,
        subItems: [],
      },
    ],
  },
  {
    id: 6,
    subItems: [],
  },
];
const arr = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3, [1, [1, [1, 1]]]]]],
  5,
  "string",
  {
    name: "苏鹏宇",
  },
];

/**
 * 数组拍平这种问题，需要从以下三种方面考虑
 * 1.遍历
 * 2.判断是否是数组
 * 3.展开该数组
 */

/**
 * 1.能够解决arr类型的数据，但是data这样的测试数据处理不了
 * 2.时间复杂度高 for循环套递归 k叉树
 * @param {*} array
 */
// concat + 递归
function flatten(array) {
  let arrayResult = [];
  array.forEach((item) => {
    if (Array.isArray(item)) {
      arrayResult = arrayResult.concat(flatten(item));
    } else {
      arrayResult.push(item);
    }
  });
  return arrayResult;
}
// console.log(flatten(data));

/**
 * 使用reduce改写
 * 和递归执行的次数一样
 * 一样解决不了data这种数据；
 */
const flat = (arr) => {
  return arr.reduce((pre, cur) => {
    console.log(1);
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
  }, []);
};

console.log(flat(data));
