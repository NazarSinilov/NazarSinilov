/*
Написать функцию фильтрации коллекции, где у объекта есть свойство с конкретным значением.
Input: [
   {name: "test", age: 45, country: "RF", tel: "+79846466744"},
   {name: "test1", age: 23, country: "RF", tel: "+79464747484"},
   {name: "test2", age: 18, country: "RF", tel: "+376483876346"}
]
Отфильтровать значения, где age равен 23
Output: [
   {name: "test1", age: 23, country: "RF", tel: "+79464747484"}
]
*/

const filterByValue = (arr, value) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        const keys = Object.keys(arr[i])
        let flag = true

        for (let j = 0; j < keys.length; j++) {
            if (arr[i][keys[j]] === value) {
               flag = false
                break
            }
        }

        if (flag){
            arr.splice(i , 1)
        }
    }

    return arr
}

console.log(filterByValue([
    {name: "test", age: 45, country: "RF", tel: "+79846466744"},
    {name: "test1", age: 23, country: "RF", tel: "+79464747484"},
    {name: "test2", age: 18, country: "RF", tel: "+376483876346"}
], 23 ));
