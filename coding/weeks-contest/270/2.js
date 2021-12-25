/**
 * @param {number[]} security
 * @param {number} time
 * @return {number[]}
 */
 var goodDaysToRobBank = function(security, time) {
  if(time === 0) {
    return Array.from(security.length,(_,k) => k)
  }
};