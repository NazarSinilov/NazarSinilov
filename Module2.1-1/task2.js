/*В функцию передается несколько массивов. Из первого массива, переданного в функцию, вывести элементы, которые имеются во всех других массивах, переданных в функцию.
Input: ([3, 6, 1, 8, 3, 6, 3, 6, 3, 6], [1, 4, 2, 4], [6, 3, 2, 8, 1])
Output: [1]*/

function setArray(arr1, ...arr2) { // arr2 = [ [ 1, 4, 2, 4 ], [ 6, 3, 2, 8, 1 ] ]
    const arr = []
    for (let i = 0; i < arr1.length; i++) {
        let num = 0
        let flag = false

        outer: for (let j = 0; j < arr2.length; j++) {
            flag = false
            for (let k = 0; k < arr2[j].length; k++) {   // k = 0..3   0..4 k   0
                if (arr1[i] === arr2[j][k]) {
                    flag = true
                    num = arr1[i];
                    break
                }
                if (k === arr2[j].length - 1 && flag === false) break outer
            }
        }
        if (flag) arr.push(num)
    }
    return [...new Set(arr)]
}

console.log(setArray([3, 2, 6, 1, 8, 3, 6, 3, 6, 3, 6, 2], [1, 2, 3, 4, 2], [3, 6, 8, 1], [1, 2, 3], [2,3]));
