/*Имеется объект {
 id: 123,
 first_name: ‘Ivan’,
 last_name: ‘Ivanov’,
 password: ’new password’,
 age: 15
}
Используя деструктуризацию, создать новые переменные firstName, lastName, заполнив их значениями из first_name, last_name объектов.*/

const user = {
    id: 123,
    first_name: 'Ivan',
    last_name: 'Ivanov',
    password: 'new password',
    age: 15
}

let {first_name:firstName,last_name:lastName} = user

console.log(firstName,lastName);
