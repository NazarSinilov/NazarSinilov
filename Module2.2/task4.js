/*Напишите функцию, которая возвращает рандомный элемент из массива.
Input: [4, 8, 2, 9, 4, 6, 5, 1, 7, 4]
Output: 9*/

const rand = arr => {
    return arr[Math.floor(Math.random() * arr.length)]
}

console.log(rand([4, 8, 2, 9, 4, 6, 5, 1, 7, 4]))