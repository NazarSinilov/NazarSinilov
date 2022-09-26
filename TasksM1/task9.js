/*Имеется массив пользователей вида [{ name: “Ivan”, age: 24 }]. Рассчитать минимальный и максимальный возраст всех пользователей.
Результат записать в объект вида { min: …, max: … }
Input: [{ name: “Ivan”, age: 24 }, { name: “Oleg”, age: 16}, { name: “Igor”, age: 24}]
Output: { min: 16, max: 24 }*/

const people = [{ name: "Ivan", age: 24 }, { name: "Oleg", age: 16}, { name: "Igor", age: 24}]

function trans(people) {
  const minMax = {}
  let min = 0
  let max = 0

  for(let i = 0; i < people.length; i++) {
    let p = people[i].age
    if(min === 0) min = p
    min = Math.min(min, p)
    max = Math.max(max, p)
  }

  minMax.min = min
  minMax.max = max

  return minMax
}

console.log(trans(people)); 