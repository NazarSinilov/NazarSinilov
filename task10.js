/*Имеется массив с финансовыми переводами вида: [ { from: ‘Ivan’, to: ‘Oleg’, amount: 2500}, ...].
Вычислить среднюю сумму всех переводов и рассчитать для каждого объекта отклонение от среднего и записать в поле diff.
Например, при средней сумме перевода в 2000 отклонение для перевода
{ from: ‘Ivan’, to: ‘Oleg’, amount: 2500} будет составлять diff = 2500 - 2000 = 1000;
Input: [{ from: ‘Ivan’, to: ‘Oleg’, amount: 2500}, { from: ‘Ivan’, to: ‘Igor’, amount: 2000}, { from: ‘Oleg’, to: ‘Igor’, amount: 1500}]
Output: 2000, [{ from: ‘Ivan’, to: ‘Oleg’, amount: 2500, diff: 500},
{ from: ‘Ivan’, to: ‘Igor’, amount: 2000, diff: 0}, { from: ‘Oleg’, to: ‘Igor’, amount: 1500, diff: -500}]*/

const people =  [{ from: "Ivan", to: "Oleg", amount: 2500}, { from: "Ivan", to: "Igor", amount: 2000}, { from: "Oleg", to: "Igor", amount: 1500}]

function trans(people) {
  let sum = 0;

  for(let i = 0; i < people.length; i++) {
    sum += people[i].amount
  }

  let average = sum/people.length
  people = people.map(el => ({from: el.from, to: el.to,amount: el.amount ,diff: el.amount - average }))
  people.unshift(average)

  return people
}

console.log(trans(people)); 
