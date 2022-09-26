/*Написать функцию, которая отфильтрует коллекцию, где у свойства есть хоть какое-то значение.
Input: [
  {name: "test", age: 34, country: "RF"},
  {name: "", age: null, country: ""},
  {name: "test1", age: null, country: ""},
  {name: "", age: 12, country: ""},
  {name: "", age: null, country: "RF"}
]
Output: [
  {name: "test", age: 34, country: "RF"},
  {name: "test1", age: null, country: ""},
  {name: "", age: 12, country: ""},
  {name: "", age: null, country: "RF"}
]*/

const haveField = arr => {
    for (let i = arr.length - 1; i >= 0; i--) {
        let flag = false
        for (let key in arr[i]) {
            if (arr[i][key] !== "" && arr[i][key] !== null) {
                flag = true
            }
        }

        if (!flag) {
            arr.splice(i, 1)
        }
    }

    return arr
}

console.log(haveField(   [
    {name: "test", age: 34, country: "RF"},
    {name: "", age: null, country: ""},
    {name: "test1", age: null, country: ""},
    {name: "", age: 12, country: ""},
    {name: "", age: null, country: "RF"}
]));
