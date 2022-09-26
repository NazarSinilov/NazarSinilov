/*
Напишите функцию, которая добавит в первый массив только те значения, которые присутствуют во втором, но нет в первом
Input: ( [5, 8, -3, 7, 3, 7, 3, 8, 9, 2, 8, -2], [8, 5, 7, -3, 6, 3, 1, 4, 2] )
Output: [5, 8, -3, 7, 3, 7, 3, 8, 9, 2, 8, -2, 6, 1, 4]
 */

const func = (arr1 , arr2) => {
    let lengthArr1 = arr1.length
    for (let i = 0; i < arr2.length; i++) {
        let flag = true
        for (let j = 0; j < lengthArr1; j++) {
            if (arr2[i] === arr1[j]) {
                flag = false
                break
            }
        }
        if (flag) {
            arr1.push(arr2[i])

        }
    }

    return arr1
}

console.log(func([5, 8, -3, 7, 3, 7, 3, 8, 9, 2, 8, -2], [8, 5, 7, -3, 6, 3, 1, 4, 2]))