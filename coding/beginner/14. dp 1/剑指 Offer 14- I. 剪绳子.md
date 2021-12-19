# [剑指 Offer 14- I. 剪绳子](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/)
## solution 

### 1. goal & basic case

- ***goal?***
n米长的绳子剪成 `m` 段，使得各个段相乘是最大
- ***basic case？***
	- 1m: (不存在的输入，却是思路的开始~) --> prod = 1
	- 2m:  case1: （ - | - ） 1 x 1 --> prod = 1  

### 2. growing & relation 

- ***growing***：

a. 根据题意和basecase 初始化表格：

 | n米  | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
 | ---- | --- | --- | --- | --- | --- | --- | --- |
 | prod | 1   | 1   | 1   | 1   | 1   | 1   | 1   |

b. 3m 绳子： - - - 

case1:  - - | -(一刀不切，自成一派)  prod = max(prod[2]m,2m) x 1m  = 2m
case2:  - | - -（一刀不切，自成一派）prod = max(prod[1]m,1m) x 2m = 2m

max(case 1 ~ 2) = 2

 | n米  | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
 | ---- | --- | --- | --- | --- | --- | --- | --- |
 | prod | 1   | 1   | 2   | 1   | 1   | 1   | 1   |

c. 4m 绳子： - - - -

case1:  - - - | -(一刀不切，自成一派)  prod = max(prod[3]m,3m) x 1m  = 3
case2:  - - | - -（一刀不切，自成一派）prod = max(prod[2]m,2m) x 2m = 4
case3:  -  | - - -（一刀不切，自成一派）prod = max(prod[1]m,1m) x 3m = 3

max(case 1 ~ 3) = 4

 | n米  | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
 | ---- | --- | --- | --- | --- | --- | --- | --- |
 | prod | 1   | 1   | 2   | 4   | 1   | 1   | 1   |


d. 5m 绳子： - - - - -

case1:  - - - - | -(一刀不切，自成一派)  prod = max(prod[4]m,4m) x 1m  = 4
case2:  - - - | - -（一刀不切，自成一派）prod = max(prod[3]m,3m) x 2m = 6
case3:  - -  | - - -（一刀不切，自成一派）prod = max(prod[2]m,2m) x 3m = 6
case4:  -   | - - - -（一刀不切，自成一派）prod = max(prod[1]m,1m) x 4m = 4

max(case 1 ~ 4) = 6

 | n米  | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
 | ---- | --- | --- | --- | --- | --- | --- | --- |
 | prod | 1   | 1   | 2   | 4   | 6   | ... | ... |

...

- ***realtion？***（不考虑basecase）当前绳子被分为两部分进行求值：
	- left：从历史上获取prod的最大（不case切多少刀），但要考虑自身一刀不切的长度。
	- right：一刀不切，自成一派。

### 3. expr

- ***dp_map[i] represent what？***

当前绳子被分割m次后prod的最大值

- ***dp_map[i] = ？***

```
k ∈ [1,i - 1]

dp_map[i] = max(
		for(k) {
		 	max(dp[i - k],i - k) x k // k 为当前下刀切完right的长度
		}
	)
```

***code***

```js
var cuttingRope = function(n) {
    const dp = new Array(n + 1)

    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 1;

    for(let i = 3;i <= n;i++) {
        let max = 1;
        for(let k = 1;k < i;k++) {
            max = Math.max(
                max,
                Math.max(dp[i - k],i - k) * k
                );
        }
        dp[i] = max;
    }
    return dp[n];
 };
```
