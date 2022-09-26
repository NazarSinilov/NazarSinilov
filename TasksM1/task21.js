/*Написать функцию, которая принимает на вход объект вида { first_name: ‘Ivan’, last_name: ‘Ivanov’, email: ‘ivanov@pochta.com’ }
 и возвращает строку вида: “Ivanov Ivan E-mail: ivanov@pochta.com”*/

const data = { first_name: "Ivan", last_name: "Ivanov", email: "ivanov@pochta.com" }

function dataToString(obj){
  const {first_name, last_name, email} = obj

  return `${first_name} ${last_name} E-mail ${email}`
}

console.log(dataToString(data));