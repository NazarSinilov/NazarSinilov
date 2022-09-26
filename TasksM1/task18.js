/*Написать функцию, принимающую на вход ФИО в виде одной строки. Функция должна возвращать объект вида
{ first_name: “Имя”, last_name: “Фамилия”, patronymic_name: “Отчество”}
Input: “Иванов Пётр Андреевич”
Output: { first_name: “Пётр”, last_name: “Иванов”, patronymic_name: “Андреевич”}*/

function name(str){
  const objName = {}
  str = str.split(" ")
  objName.first_name = str[0]
  objName.last_name = str[2]
  objName.patronymic_name = str[1]

  return objName
}

console.log(name("Иванов Пётр Андреевич"));
