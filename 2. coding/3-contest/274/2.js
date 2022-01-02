/**
 * @param {string[]} bank
 * @return {number}
 */
 var numberOfBeams = function(bank) {
     let cnt = 0;
    for(let i = 0;i < bank.length;i++) {
        let upCnt = getCount(bank[i]);
        if(upCnt === 0) continue;

        for(let j = i + 1;j < bank.length;j++) {
            let downCnt = getCount(bank[j]);
            if(downCnt === 0) continue;
            console.log(upCnt,downCnt)
            cnt += upCnt * downCnt;
            break;
        }

    }
    return cnt;
};

function getCount(str) {
    let cnt = 0;
    for(let c of str) {
        if (c === '1') cnt += 1
    }
    return cnt
}

console.log(numberOfBeams(["011001","000000","010100","001000"]))