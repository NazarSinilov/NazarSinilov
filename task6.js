/*Имеется массив пользователей вида [{ name: “Ivan”, age: 24 }]. Вывести имена тех пользователей, возраст которых больше 18 лет.
Input: [{ name: “Ivan”, age: 24 }, { name: “Oleg”, age: 16}, { name: “Igor”, age: 24}]
Output:
Ivan
Igor*/

const people = [{ name: "Ivan", age: 24 }, { name: "Oleg", age: 16}, { name: "Igor", age: 24}]

function age(array) {
  return array.filter(el => el.age > 18 ).forEach(el => console.log(el.name));
}

age(people);