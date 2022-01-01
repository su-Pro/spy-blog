/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */
let m2days = [-1,31,28,31,30,31,30,31,31,30,31,30,31];
var daysBetweenDates = function (date1, date2) {
    return Math.abs(getDayCount(date1) - getDayCount(date2))
};
let isLeap = y => y % 4 == 0 && y % 100 != 0 || y % 400 == 0
let getDayCount = (dateStr) => {
    let [y,m,d] = dateStr.split('-').map(v => parseInt(v,10));
    let cnt = 0;
    for(let i = 1970;i < y;i++) {
        if(isLeap(y)) cnt += 366
        else cnt += 365
    }
    for(let i = 0;i < m;i++) {
        if(i === 2 && isLeap(y)) cnt += 1;
        cnt += m2days[i];
    }
    cnt += d;
    return cnt;
}