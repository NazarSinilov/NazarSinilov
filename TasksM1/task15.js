/*Написать функцию, принимающую на вход массив чисел, функцию фильтрации и функцию преобразования,
которая фильтрует массив, преобразует данные, а затем выводит их.
Input: [1, 2, 3, 4], (el) => el %2 == 0, (el) => el * 2
Output:
4
8*/

const array = [1, 2, 3, 4]

function func(array, fltr, conv ) {
  return array.filter(fltr).map(conv)
}

console.log(func(array, (el) => el % 2 === 0, (el) => el * 2));
