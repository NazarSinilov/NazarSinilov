/*Написать функцию, принимающую два числа и любую операцию над этими числами (сложение, вычитание или др.).
В функции выполнить эту операцию и вернуть результат.*/

function typeElem(a, b, oper) {
  switch (oper) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "/":
      return a / b;
    case "*":
      return a * b;
    case "%":
      return a % b;
    case "**":
      return a ** b;
  }
}

console.log(typeElem(30, 7, "*"));