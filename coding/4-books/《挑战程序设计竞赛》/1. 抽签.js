function main() {
    let target = 3;

    let k = [1, 3, 5];

    let n = 3;

    for(let i = 0;i < n;i++) {
        for(let j = 0;j < n;j++) {
            for(let l = 0;l < n;l++) {
                for(let m = 0;m < n;m++) {
                    if(k[i] + k[j] + k[l] + k[m] === target) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}