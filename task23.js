/*Имеется массив строк. Строки в массиве могут повторяться любое количество раз. Вывести уникальные строки и их количество в массиве.
Input: [“aaa”, “bbb”, “ccc”, “aaa”, “bbb”, “”, aaa“”]
Output:
aaa 3
bbb 2
ccc 1*/

function unique(arr){
  return new Set([...arr])
}

console.log(unique(["aaa", "bbb", "ccc", "aaa", "bbb", "", "aaa"]));