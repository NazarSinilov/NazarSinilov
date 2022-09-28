/*Реализуйте функцию, которая принимает на вход объект типа { "dog": 6, "cat": 11 } и возвращает массив пар.
Input: { "dog": 6, "cat": 11 }
Output: [ ["dog", 6], ["cat", 11] ]*/

function pairArray(obj) {
    const arr = []

    for (let key in obj) {
            arr.push([key,obj[key]])
    }

    return arr
}

console.log(pairArray({ "dog": 6, "cat": 11, age: 0 } ));
