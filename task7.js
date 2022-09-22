/*Дана строка. Нужно написать функцию, которая возвращает значение true, если строка является палиндромом, или false если нет.
Input: "testset"
Output: true
Input: "abbcsa"
Output: false*/

function palindrome(str) {
    let arr = str.split("")
    let arr1 = []

    for (let i = arr.length - 1 ; i >= 0; i--) {
        arr1.push(arr[i])
    }

    return arr.join("") === arr1.join("")
}

console.log(palindrome("abbcsa"));

