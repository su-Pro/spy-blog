function ajustMaxHeap(array, index, length) {
    // 接受三个参数，当前堆，需要调整的索引，以及堆的长度
    for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        // 
        if (i + 1 < length && array[i + 1] > array[i]) {
            i++;
        }
        if (array[index] >= [array[i]]) {
            break;
        } else {
            [array[index], array[i]] = [array[i], array[index]];
            index = i;
        }
    }
}

/**
 * 创建一个堆
 * @param {*} arr 无序的数组
 * @param {*} length 数组的长度？
 */
function createMaxHeap(arr, length) {
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        ajustMaxHeap(arr, i, length);
    }
    return arr;
}










function Heap(type = 'min') {
    this.type = type;
    this.value = [];
}

Heap.prototype.create = function () {
    const length = this.value.length;
    for (let i = Math.floor((length / 2) - 1); i >= 0; i--) {
        this.ajust(i, length);
    }
}

Heap.prototype.ajust = function (index, length) {
    const array = this.value;
    for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        if (i + 1 < length) {
            if ((this.type === 'max' && array[i + 1] > array[i]) ||
                (this.type === 'min' && array[i + 1] < array[i])) {
                i++;
            }
        }
        if ((this.type === 'max' && array[index] < [array[i]]) ||
            (this.type === 'min' && array[index] > [array[i]])) {
            [array[index], array[i]] = [array[i], array[index]];
            index = i;
        } else {
            break;
        }
    }
}

Heap.prototype.add = function (element) {
    const array = this.value;
    array.push(element);
    if (array.length > 1) {
        let index = array.length - 1;
        let target = Math.floor((index - 1) / 2);
        while (target >= 0) {
            if ((this.type === 'min' && array[index] < array[target]) ||
                (this.type === 'max' && array[index] > array[target])) {
                [array[index], array[target]] = [array[target], array[index]]
                index = target;
                target = Math.floor((index - 1) / 2);
            } else {
                break;
            }
        }
    }
}

Heap.prototype.pop = function () {
    const array = this.value;
    let result = null;
    if (array.length > 1) {
        result = array[0];
        array[0] = array.pop();
        this.ajust(0, array.length);
    } else if (array.length === 1) {
        return array.pop();
    }
    return result;
}