/*Удалить из массива значения, индексы которых указаны во втором массиве.
Input: ([5, 2, 8, 6, 1, 9, 3, 6, 3, 7, 1], [2, 5, 1])
Output: [5, 6, 1, 3, 6, 3, 7, 1]*/

function deleteIndex(arr, arrIdx) {
    for (let j = arrIdx.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arrIdx[i] > arrIdx[i + 1]) {
                let temp = arrIdx[i];
                arrIdx[i] = arrIdx[i + 1];
                arrIdx[i + 1] = temp;
            }
        }
    }

    for (let i = arr.length - 1; i >= 0; i-- ) {
        for (let j = 0; j < arrIdx.length; j++) {
            if (i === arrIdx[j]) {
                arr.splice( i , 1 )
            }
        }
    }

    return arr
}

console.log(deleteIndex([5, 2, 8, 6, 1, 9, 3, 6, 3, 7, 1], [2, 5, 1]));

