/*Написать функцию, которая возвращает отсортированный массив уникальных значений.
Input: [5, 2, 8, 4, 8, 2, 5, 8, 2, 17, 8, 4, 2, 4, 7, 3]
Output: [3, 7, 17]*/

function uniqSort(arr) {
    let newArr = []
    let newObj = {}

    for (let i = 0; i < arr.length; i++) {
        newObj[arr[i]] = (newObj[arr[i]] || 0) + 1
    }

    for (let key in newObj) {
        if (newObj[key] === 1) {
            newArr.push(key)
        }
    }

    return newArr
}

console.log(uniqSort( [5, 2, 8, 4, 8, 2, 5, 8, 2, 17, 8, 4, 2, 4, 7, 3]));
