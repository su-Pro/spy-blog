/**
 * @param {number} n
 * @param {number[]} startPos
 * @param {string} s
 * @return {number[]}
 */
var executeInstructions = function (n, startPos, s) {
	let dist = {
		"R" : [0,1],
		"L" : [0,-1],
		"D" : [1,0],
		"U" : [-1,0],
	};
	let res = [];
	for (let i = 0; i < s.length; i++) {
		let [curX, curY] = startPos;
		let j = i;
		for (; j < s.length; j++) {
			const [dx, dy] = comp(s[j]);
			curX += dx;
			curY += dy;
			if (curX >= n || curX < 0 || curY >= n || curY < 0) {
				break;
			}
		}
		res[i] = j - i;
	}
	return res;
};
