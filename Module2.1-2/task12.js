/*
Напишите функцию, которая переставит местами максимальный и минимальный элемент в массиве.
Input: [5, 7, 2, 9, 5, 6, 3, 1, 8]
Output: [5, 7, 2, 1, 5, 6, 3, 9, 8]
*/

const changeIndex = arr => {
    let min = 0
    let minIndex = 0
    let max = 0
    let maxIndex = 0

    for (let i = 0; i < arr.length; i++) {
        if (!min) {
            min = arr[0]
        }

        min = Math.min(arr[i], min)
        max = Math.max(arr[i], max)
        minIndex = arr[i] === min ? i : minIndex
        maxIndex = arr[i] === max ? i : maxIndex
    }

    arr[minIndex] = max
    arr[maxIndex] = min

    return arr
}

console.log(changeIndex( [5, 7, 2, 9, 5, 6, 3, 1, 8]));
