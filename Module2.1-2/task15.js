/*
Напишите функцию, которая заполнит массив следующим образом: в первый элемент запишите 'x', во второй 'xx', в третий 'xxx' и так далее. Функция параметром принимает длину массива.
Input: 7
Output: [ x, xx, xxx, xxxx, xxxxx, xxxxxx, xxxxxxx ]
*/

const createArrayX = num => {
    let arr = []
    let x = ""
    for (let i = 0; i < num; i++) {
        x += "x"
        arr.push(x)
    }
    return arr
}

console.log(createArrayX(7));
