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
    for (let key in obj) {
        if (typeof obj[key] === "number") {
            obj[key] = obj[key] * 2
        }
    }

    return obj
}

console.log(numFieldX2({
    name: "test",
    age: 25,
    weight: 65,
    height: 165
}));
