/*
Напишите функцию, которая удалит из первого массива все значения, которые указаны во втором массиве.
Input: ( [5, 7, 2, -1, 7, 8, 3, 6, 2, 9, 4, -7], [2, -1, 9] )
Output: [5, 7, 7, 8, 3, 6, 4, -7]
*/

const removeValueFromArr1 = (arr1, arr2) => {
    for (let i = arr1.length - 1; i >= 0; i--) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                arr1.splice( i, 1 )
                break
            }
        }
    }

    return arr1
}

console.log(removeValueFromArr1(    [5, 7, 2, -1, 7, 8, 3, 6, 2, 9, 4, -7], [2, -1, 9]));