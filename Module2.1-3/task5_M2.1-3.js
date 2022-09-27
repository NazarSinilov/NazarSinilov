/*
Дан массив чисел. Каждое число в массиве встречается четное количество раз, кроме одного.
Реализуйте и экспортируйте функцию по умолчанию, которая принимает массив чисел и возвращает число,
которое встречается нечетное количество раз.
Input: [5, 8, 2, 4, 5, 4, 2, 4, 2, 5, 2, 4, 5]
Output: 8
 */

const arr = [5, 8, 2, 4, 5, 4, 2, 4, 2, 5, 2, 4, 5]

const oddNum = arr => {
    let num = 0
    for (let i = 0; i < arr.length; i++) {
        let flag = true
        for (let j = 0; j < arr.length; j++) {
            if (i === j) {
                continue
            }
            if (arr[i] === arr[j]){
                flag = false
                break
            }
        }
        if (flag) {
            num = arr[i]
        }
    }

    return num
}

console.log(oddNum(arr))

