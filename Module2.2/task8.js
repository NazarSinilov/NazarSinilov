/*Реализовать функцию, которая отсортирует коллекцию по конкретному свойству объекта и переданному параметру (asc, desc).
Если параметр (asc, desc) не передан, по умолчанию сортировка asc.
asc - это сортировка по возрастанию, desc -  сортировка по убыванию.
func (arr, "age", asc);
Input: const arr = [
  {name: "test", age: 34, country: "RF"},
  {name: "test2", age: 12, country: "RF"},
  {name: "test1", age: 54, country: "RF"}
]
Output: [
   {name: "test2", age: 12, country: "RF"},
   {name: "test", age: 34, country: "RF"},
   {name: "test1", age: 54, country: "RF"}
]*/

const arr = [
    {name: "test", age: 34, country: "RF"},
    {name: "test2", age: 12, country: "RF"},
    {name: "test1", age: 54, country: "RF"}
]

const filterArray = (arr, field, filter) => {
    if (filter === "asc") {
        arr.sort((a,b) => typeof a[field] === "number"? a[field] - b[field] : a[field] > b[field])
    } else if (filter === "desc") {
        arr.sort((a,b) =>  typeof a[field] === "number"? b[field] - a[field] : a[field] < b[field])
    }

    return arr
}

console.log(filterArray (arr, "name", "desc"));

