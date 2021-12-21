var getDescentPeriods = function(prices) {
  let res = prices.length;
 for(let i = 0;i < prices.length;i++) {
   for(let j = i +1,begin = i;j < prices.length;j++) {
     if(prices[begin] - prices[j] !== 1) {
       break;
     }
     res++
     begin++
   }
 }
 return res;
};

// https://leetcode-cn.com/problems/number-of-smooth-descent-periods-of-a-stock/solution/jsdong-tai-gui-hua-by-half2half-gqdq2110. 股票平滑下跌阶段的数目/