/*Вернуть массив тех значений, которые есть в первом, но нет во втором.*/

function restNum(arr, shortArr ) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        let flag = false
        for (let j = 0; j < shortArr.length; j++) {
            if (arr[i] === shortArr[j]) {
                flag = true
                break
            }
        }
        if (!flag) newArr.push(arr[i])
    }

    return newArr
}

console.log(restNum([4, 7, 2, 9, 3, 5, 6, 4, 5, 1, 4], [4, 5, 6, 7, 8]));

