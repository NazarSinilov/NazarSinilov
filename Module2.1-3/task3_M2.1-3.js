/*
На вход подается массив со значениями. Нужно вывести массив уникальных элементов (нет повторений в поданном массиве).
Input: [5, 7, 6, 2, 8, 3, 5, 6, 2, 98, 13]
Output: [7, 8, 3, 98, 13]
 */

const unique = arr => {
    const newArr = []

    for (let i = 0; i < arr.length; i++) {
        let flag = true
        for (let j = 0; j < arr.length; j++) {
            if (i === j){
                continue
            }
            if (arr[i] === arr[j]) {
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

console.log(unique([5, 7, 6, 2, 8, 3, 5, 6, 2, 98, 13]))