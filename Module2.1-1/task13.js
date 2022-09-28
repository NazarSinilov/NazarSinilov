/*Создайте функцию, которая параметром принимает объект. Функция умножает все числовые свойства объекта на 2.
Input: {
  name: "test",
  age: 25,
  weight: 65,
  height: 165
}
Output: {
  name: "test",
  age: 50,
  weight: 130,
  height: 330
}*/

function numFieldX2(obj) {
    const keys = Object.keys(obj)

    for (let i = 0 ; i < keys.length; i++ ) {
        if (typeof obj[keys[i]] === "number") {
            obj[keys[i]]  = obj[keys[i]]  * 2
        }
    }

    return obj
}

console.log(numFieldX2({
    name: "test",
    age: 25,
    weight: 65,
    height: 165
}))
