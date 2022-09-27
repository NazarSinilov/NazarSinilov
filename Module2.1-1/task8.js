/*Удалить из массива значения, индексы которых указаны во втором массиве.
Input: ([5, 2, 8, 6, 1, 9, 3, 6, 3, 7, 1], [2, 5, 1])
Output: [5, 6, 1, 3, 6, 3, 7, 1]*/

function deleteIndex(arr, arrIdx) {
    let newArr = []
    for (let i = 0; i < arr.length; i++ ) {
        let flag = true
        for (let j = 0; j < arrIdx.length; j++) {
            if (i === arrIdx[j]) {
                flag = false
                break
            }
        }
        if (flag) {
            newArr.push(arr[i])
        }
    }

    return newArr
}

console.log(deleteIndex([5, 2, 8, 6, 1, 9, 3, 6, 3, 7, 1], [2, 5, 1]));

