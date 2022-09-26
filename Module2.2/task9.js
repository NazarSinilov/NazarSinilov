/*Написать функцию, которая принимает параметрами два массива. Вернуть массив тех значений, которые есть и в первом и во втором.
Input: ( [5, 2, 7, 3, 6, 8, 2, 9, 1], [4, 2, 9, 4, 5, 4] )
Output: [2, 9, 5]
*/

const generalMeaning = (arr1, arr2) => {
    let newArr = []
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                newArr.push(arr1[i])
            }
        }
    }

    return [...new Set(newArr)]
}

console.log(generalMeaning([5, 2, 7, 3, 6, 8, 2, 9, 1], [4, 2, 9, 4, 5, 4]));
