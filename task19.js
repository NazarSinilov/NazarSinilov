/*Написать функцию, которая принимает на вход E-mal в виде строки и возвращает объект вида { username, domain }
Input: “ivanov.oleg@pochta.com”
Output: {
 username: “ivanov.oleg”,
 domain: “pochta.com”
}*/

function getEmail(str){
  const objEmail = {}
  str = str.split("@")
  objEmail.username = str[0]
  objEmail.domain = str[1]

  return objEmail
}

console.log(getEmail("ivanov.oleg@pochta.com"));
