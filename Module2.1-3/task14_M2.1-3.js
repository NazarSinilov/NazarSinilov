/*
Напишите функцию, которая возвращает true, если в массиве есть все значения, которые указаны во втором.
Input: ( [4, 8, 1, 9, -3, 7, 2, 8, 4, -6, 3, 8, 4, 6, 1, 9, -4], [3, 7, -6] )
Output: true
Input: ( [4, 8, 1, 9, -3, 7, 2, 8, 4, -6, 3, 8, 4, 6, 1, 9, -4], [9, 7, -8] )
Output: false
*/

const isValueArr1FromArr2 = (arr1, arr2) => {
    for (let i = 0; i < arr2.length; i++) {
        let flag = true
        for (let j = 0; j < arr1.length; j++){
            if (arr2[i] === arr1[j]) {
                flag = false
                break
            }
        }
        if (flag) {
            return false
        }
    }

    return true
}

console.log(isValueArr1FromArr2([4, 8, 1, 9, -3, 7, 2, 8, 4, -6, 3, 8, 4, 6, 1, 9, -4], [3, 7, -6] ));
