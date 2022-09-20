/*Заполнить двумерный массив таблицей умножения от 0 до 10 и вывести её в удобочитаемом виде.*/

const tableMult = []

for (let i = 0; i < 11; i++) {
  const row = []

  for (let j = 0; j < 11; j++) {
    row.push(`${j} * ${i} = ${j*i}`)
  }

  tableMult.push(row)

}

console.table(tableMult)

