/* Напишите функцию range(), принимающую два аргумента: начало и конец диапазона. Функция возвращает массив,
который содержит все числа из диапазона, включая начальное и конечное. Третий необязательный аргумент функции range() –
шаг для построения массива. Убедитесь, что функция range() работает с отрицательным шагом.
Input: range(5, 2, -1)
Output: [5, 4, 3, 2]
Input: range(4, 16, 2)
Output: [4, 6, 8, 10, 12, 14, 16]*/

function range(start, end, step) {
    const arr = []
    if (start < end) {
        for (let i = start; i <= end ; i += step) {
            arr.push(i)
        }
    } else {
        for (let i = start; i >= end ; i += step) {
            arr.push(i)
        }
    }

    return arr
}

console.log(range(4, 16, 2));