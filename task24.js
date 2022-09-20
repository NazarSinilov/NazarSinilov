/*Написать функцию, которая принимает массив целых чисел и строку, которая может иметь одно из трёх значений: ‘ASC’, ’DESC’, ‘NOT SORT’.
 Функция должна сортировать массив числе и возвращать его. Если строковый параметр равен ‘ASC’, то сортировать в порядке возрастания,
 если - ’DESC’, то в порядке убывания. В остальных случаях возвращать отсортированный массив.
Input: [4, 5, 2, 4, 1, 5, 3], ‘ASC’
Output: [1, 2, 3, 4, 4, 5, 5]*/

function sortArray(arr, methodSort) {
    switch (methodSort) {
        case "ASC":
            arr.sort((a, b) => a - b)
            break
        case "DESC":
            arr.sort((a, b) => b - a)
            break
        default:
            return arr
    }

    return arr
}

console.log(sortArray([4, 5, 2, 4, 1, 5, 3], "NOT SORT"));