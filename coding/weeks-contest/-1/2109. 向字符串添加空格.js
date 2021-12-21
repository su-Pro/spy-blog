// /**
//  * @param {string} s
//  * @param {number[]} spaces
//  * @return {string}
//  */
// var addSpaces = function (s, spaces) {
//   const res = new Array(s.length + spaces.length);
//   const set = new Set(spaces);
//   for (let i = 0; i < s.length; i++) {
//     if(!set.has(i)) {
//       res.push(s[i]);
//       continue;
//     }
//     res.push(" ");
//     res.push(s[i]);
//   }
//   return res.join("");
// };

var addSpaces = (s,spaces) => {
  const res = new Array(s.length +spaces.length);
  let sIdx = 0;
  for(let i = 0;i < s.length;i++) {
    if(i === spaces[sIdx]) {
      res.push(" ")
      sIdx++
    }
    res.push(s[i]);
  }
  return res.join("")
}
(s = "LeetcodeHelpsMeLearn"), (spaces = [8, 13, 15]);

console.log(addSpaces(s, spaces));
