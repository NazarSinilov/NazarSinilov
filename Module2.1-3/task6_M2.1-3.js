/*Напишите функцию, которая принимает параметром массив с объектами. Сгруппируйте объекты заказов по имени.
Input: [
  {name: "test", price: 200},
  {name: "test1", price: 300},
  {name: "test", price: 100},
  {name: "test", price: 600}
]
Output: [
  {name: "test", price: 900},
  {name: "test1", price: 300}
]*/

const funcGroup = arr => {
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[i].name === arr[j].name) {
                arr[j].price += arr[i].price
                arr.splice(i , 1)
                break
            }
        }
    }

    return arr
}

console.log(funcGroup([
    {name: "test", price: 200},
    {name: "test1", price: 300},
    {name: "test", price: 100},
    {name: "test", price: 600}
]));