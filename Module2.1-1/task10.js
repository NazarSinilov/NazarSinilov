/*Вернуть массив тех значений, которые есть в первом, но нет во втором.
Input: ([4, 7, 2, 9, 3, 5, 6, 4, 5, 1, 4], [4, 5, 6, 7, 8])
Output: [2, 9, 3, 1]
*/

function restNum(arr, shortArr) {
    const newArr = []
    const obj = {}

    for (let i = 0; i < shortArr.length; i++) {
        obj[shortArr[i]] = true
    }

    for (let i = 0; i < arr.length; i++){
        if (!obj[arr[i]]) {
            newArr.push(arr[i])
        }
    }

    return newArr
}

console.log(restNum([4, 7, 2, 9, 3, 5, 6, 4, 5, 1, 4], [4, 5, 6, 7, 8]));

