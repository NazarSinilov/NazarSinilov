/*Написать функцию, принимающую число N, и возвращающую массив длиной N, заполненный числами Фибоначчи.
Числа Фибоначчи - элементы числовой последовательности, в которой первые два числа равны 0 и 1,
а каждое последующее число равно сумме двух предыдущих чисел (пример, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233).
Input: 7
Output: [0, 1, 1, 2, 3, 5, 6]*/

const arrFib = [];

function fib(N) {
  let first = 0;
  let second = 1;
  let nextTurn;

  for (let i = 0; i < N; i++) {       
    arrFib.push(first);
    nextTurn = first + second;
    first = second
    second = nextTurn
  }

  return arrFib;
}

console.log(fib(7));