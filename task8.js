/*Имеется массив пользователей вида [{ name: “Ivan”, age: 24 }]. Вывести суммарный возраст всех пользователей.
Input: [{ name: “Ivan”, age: 24 }, { name: “Oleg”, age: 16}, { name: “Igor”, age: 24}]
Output: 64*/

const people = [{ name: "Ivan", age: 24 }, { name: "Oleg", age: 16}, { name: "Igor", age: 24}]

function trans(people) {
  let sum = 0
  for(let i = 0; i < people.length; i++) {
    sum += people[i].age
  }

  return sum
}

console.log(trans(people)); 