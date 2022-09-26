/*Реализуйте функцию, которая принимает на вход массив, состоящий из массивов-пар.
А возвращает объект, полученный из этих пар. Если при конструировании объекта попадаются совпадающие ключи,
 то берётся значение из последнего массива-пары.
Input: [ ["cat", 5], ["dog", 6], ["cat", 11] ]
Output: { "dog": 6, "cat": 11 }
Input: [ ["name", "test"], ["age", 12], ["country", "RF"] ]
Output: { "name": "test", "age": 12, "country": "RF" }*/

const createObject = arr => {
    let newObj = {}
    for (let i = 0; i < arr.length; i++) {
        newObj[arr[i][0]] = arr[i][1]
    }

    return newObj
}

console.log(createObject(   [ ["cat", 5], ["dog", 6], ["cat", 11] ]));
