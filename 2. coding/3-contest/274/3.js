/**
 * @param {string} s
 * @return {boolean}
 */
 var checkString = function(s) {

    for(let i = 0;i < s.length;i++) {
        if(s[i] !== 'b') {
            continue;
        }
        // check after
        for(let j = i + 1;j < s.length;j++) {
            if(s[j] === 'a') return false
        }
    }
    return true
};
console.log(checkString("aaabbb"))