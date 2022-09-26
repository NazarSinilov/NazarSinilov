/*Написать функцию, принимающую массив строк и выводящих их на экран, используя цикл while. Элементы из массива извлекать с помощью оператора .pop()*/

const arrayStr = ["One", "Two", "Three"];

function showStr(arrayStr) {
  while (arrayStr.length) {
    let el = arrayStr.pop()
    console.log(el)
  }
}

showStr(arrayStr)