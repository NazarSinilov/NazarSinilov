/*
Реализуйте функцию. На вход функция принимает массив значений из 0 и 1.
Верните объект сгруппированных данных {"0": 10, "1": 5}
Input: [0, 0, 0, 1, 1, 0 , 1, 1, 1, 0, 0, 1, 1, 0, 1]
Output: {
  "0": 7,
  "1": 8
}
*/

const groupValues = arr => {
    const obj = {}

    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = (obj[arr[i]] || 0) + 1
    }

    return obj
}

console.log(groupValues([0, 0, 0, 1, 1, 0 , 1, 1, 1, 0, 0, 1, 1, 0, 1]));
