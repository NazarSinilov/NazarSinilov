/*Отфильтровать коллекцию по нескольким полям. Функция параметрами принимает массив, первое значение -
поле с которым равно, второе значение, больше которого другое поле. Например, в коллекции мне нужно вывести значения,
в которых возраст больше 18, а страна 'RF'.
Input: const arr = [
  {name: "test", age: 34, country: "RF"},
  {name: "test2", age: 12, country: "RF"},
  {name: "test1", age: 54, country: "RF"}
];
Output: [
  {name: "test", age: 34, country: "RF"},
  {name: "test1", age: 54, country: "RF"}
]
Пример вызова функции: func(array, "RF", 18)*/

const arr = [
    {name: "test", age: 34, country: "RF"},
    {name: "test2", age: 12, country: "RF"},
    {name: "test1", age: 54, country: "RF"}
];


function filterFunc(arr, eqField, minAge ) {
    let newArr = []

    for (let i = 0; i < arr.length; i++) {  //  {name: "test", age: 34, country: "RF"}  i = 0
        if (arr[i].country === eqField && arr[i].age > minAge) {
            newArr.push(arr[i])
        }
    }

    return newArr
}

console.log(filterFunc(arr, "RF", 18));

