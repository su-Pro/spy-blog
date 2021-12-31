let n = 5;
let a = [2, 3, 4, 5, 10]

// let n = 4;
// let a = [4, 5, 10, 20]

function main(nums) {
    let ans = 0;

    for(let a = 0;a < n;a++) {
        for(let b = a + 1;b < n;b++) {
            for(let c = b + 1;c < n;c++) {
                let len = nums[a] + nums[b] + nums[c];
                let max = Math.max(nums[a],nums[b],nums[c]);
                let rest = len - max;
                if(max < rest) {
                    ans = Math.max(len,ans);
                }
            }
        }
    }
    return ans;
}
console.log(main(a))