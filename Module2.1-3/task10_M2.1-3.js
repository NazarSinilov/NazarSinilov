/*
Напишите функцию, которая находит наиболее часто встречаемый элемент массива.
Input: [6, 3, 8, 2, 6, 8, 2, 5, 7, 2, 6, 8, 6, 2, 6]
Output: 6
*/

const mostCommonElement = arr => {
    const obj = {}
    let maxRepeatValue = 0;
    let value = 0
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = (obj[arr[i]] || 0) + 1
    }

    for (let key in obj) {
        maxRepeatValue = Math.max(obj[key], maxRepeatValue)
        if (maxRepeatValue === obj[key]) {
            value = key
        }
    }

    return value
}

console.log(mostCommonElement([6, 3, 8, 2, 6, 8, 2, 5, 7, 2, 6, 8, 6, 2, 6]));