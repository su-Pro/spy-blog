/**
 * @param {number} mass
 * @param {number[]} asteroids
 * @return {boolean}
 */
var asteroidsDestroyed = function(mass, asteroids) {
    asteroids.sort((a,b) => a - b);
    let m = mass;
    for(let i = 0; i < asteroids.length;i++) {
        if(m < asteroids[i]) return false;
        m += asteroids[i]
    }
    return true
};


// 3