// console.log(this === global);
// console.log(this === module.exports)
// console.log(module.exports)
// console.log(global.process)
// console.log(process)


let userOptions = process.argv.slice(2).reduce((memo, current, index, arr) => {
  if (current.startsWith('--')) {
    memo[current.slice(2)] = arr[index + 1]
  }
  return memo;
}, {})

console.log(userOptions)