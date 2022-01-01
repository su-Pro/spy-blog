/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
 var isNStraightHand = function(hand, groupSize) {
    hand.sort((a,b) => a - b);
    let hash = new Map();
    // 统计hash
    for(let v of hand) {
        hash.set((hash.get(v) || 0) + 1);
    }
    // 抽牌
    for(let i = 0;i < hash.length;i++) {
        if(!hash.has(hand[i])) continue;
        // 一组拿
        for(let j = 0;j < groupSize;j++) {
            let curNum = hand[i] + hand[j];
            if(!hash.has(curNum)) return false;
            let curCnt = hash.get(curNum) - 1;
            if(curCnt === 0) hash.delete(curNum);
            else hash.set(curCnt);
        }
    }
    return true;
}