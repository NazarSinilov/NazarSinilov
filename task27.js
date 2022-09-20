/*Имеется двумерный массив. Пользуясь возможностями ES6 синтаксиса объединить его в одномерный массив.
Input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]*/

function uniteArray(arr) {
    arr = [...arr[0],...arr[1],...arr[2]]

    return arr
}

function uniteArray1(arr) {
    return arr.flat()
}


console.log(uniteArray([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
console.log(uniteArray1([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
